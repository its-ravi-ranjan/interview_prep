/**
 * E-COMMERCE/BOOKING SYSTEM DESIGN - AMAZON INTERVIEW ESSENTIALS
 * 
 * 🎯 WHAT TO REMEMBER FOR INTERVIEWS:
 * 1. Cart System: Redis-based with TTL, guest cart merging
 * 2. Inventory Locking: Optimistic vs Pessimistic for overselling prevention
 * 3. Flash Sales: Caching, queueing, rate limiting, auto-scaling
 * 4. Booking Systems: Version-based locking, retry mechanisms
 * 5. Payment Flow: Idempotent operations, saga pattern for rollbacks
 * 
 * 🔑 KEY CONCEPTS:
 * - Cart: Fast Redis-based operations with auto-expiry
 * - Inventory: Optimistic locking prevents overselling during high concurrency
 * - Flash Sales: Multi-layer caching + queueing handles traffic spikes
 * - Booking: Version-based validation ensures consistency
 * - Payment: Idempotent operations with distributed rollback
 * 
 * 📊 SYSTEM COMPONENTS:
 * Cart Service: ✅ Redis cache, ✅ TTL expiry, ✅ Guest cart merge
 * Inventory Service: ✅ Optimistic/Pessimistic locking, ✅ Version control
 * Payment Service: ✅ Idempotent operations, ✅ Webhook handling
 * Order Service: ✅ Saga pattern, ✅ Event-driven architecture
 * Notification Service: ✅ Async processing, ✅ Retry mechanisms
 * 
 * 🔄 STEP-BY-STEP FLOW:
 * 
 * ✅ Step 1: User Adds to Cart
 * - CartService stores in Redis (key: cart:userId)
 * - TTL set for auto-expiry (30 mins)
 * - Guest cart merged on login
 * 
 * ✅ Step 2: Checkout Process
 * - Validate cart against inventory (Redis cache first)
 * - Lock inventory using optimistic/pessimistic locking
 * - Process payment with idempotent operations
 * - Update order status and trigger fulfillment
 * 
 * ✅ Step 3: Inventory Management
 * - Optimistic: Version check before update
 * - Pessimistic: Row-level locking
 * - Retry logic for version conflicts
 * - Rollback on payment failure
 * 
 * ✅ Step 4: Flash Sale Handling
 * - Pre-warm Redis cache with product data
 * - Rate limiting per user/IP
 * - Queue-based processing for spikes
 * - Auto-scaling for traffic bursts
 * 
 * 📦 Why This Architecture?
 * - Scalable: Horizontal scaling for stateless services
 * - Reliable: Retry mechanisms and circuit breakers
 * - Fast: Redis caching and CDN for static content
 * - Consistent: Optimistic locking prevents overselling
 */

// ==================== 1. CART SERVICE ====================
/**
 * CART SERVICE: Fast, scalable cart operations with Redis
 * 
 * Features:
 * - Redis-based storage with TTL
 * - Guest cart merging on login
 * - Auto-expiry of abandoned carts
 * - Real-time price and availability updates
 */

class CartService {
    constructor() {
        this.redisCache = new Map();
        this.CART_TTL = 30 * 60 * 1000; // 30 minutes
    }
    
    addToCart(userId, productId, quantity) {
        let cart = this.redisCache.get(userId);
        if (!cart) {
            cart = new Cart(userId);
            this.redisCache.set(userId, cart);
        }
        
        cart.lastAccessed = Date.now();
        cart.expiresAt = cart.lastAccessed + this.CART_TTL;
        
        const item = cart.items.get(productId);
        if (item) {
            item.quantity += quantity;
        } else {
            cart.items.set(productId, new CartItem(productId, quantity, this.getProductPrice(productId)));
        }
    }
    
    removeFromCart(userId, productId) {
        const cart = this.redisCache.get(userId);
        if (cart) {
            cart.items.delete(productId);
            cart.lastAccessed = Date.now();
        }
    }
    
    getCart(userId) {
        const cart = this.redisCache.get(userId);
        if (cart && Date.now() < cart.expiresAt) {
            cart.lastAccessed = Date.now();
            return cart;
        }
        return null;
    }
    
    mergeGuestCart(guestId, userId) {
        const guestCart = this.redisCache.get(guestId);
        let userCart = this.redisCache.get(userId);
        
        if (guestCart) {
            if (!userCart) {
                userCart = new Cart(userId);
                this.redisCache.set(userId, userCart);
            }
            
            for (const [productId, item] of guestCart.items) {
                const existingItem = userCart.items.get(productId);
                if (existingItem) {
                    existingItem.quantity += item.quantity;
                } else {
                    userCart.items.set(productId, item);
                }
            }
            
            this.redisCache.delete(guestId);
        }
    }
    
    getProductPrice(productId) {
        // Simulate product service call
        return Math.random() * 1000;
    }
    
    cleanupExpiredCarts() {
        const now = Date.now();
        for (const [userId, cart] of this.redisCache) {
            if (cart.expiresAt < now) {
                this.redisCache.delete(userId);
            }
        }
    }
}

class Cart {
    constructor(userId) {
        this.userId = userId;
        this.items = new Map();
        this.lastAccessed = Date.now();
        this.expiresAt = this.lastAccessed + 30 * 60 * 1000;
    }
}

class CartItem {
    constructor(productId, quantity, price) {
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
        this.addedAt = Date.now();
    }
}

// ==================== 2. INVENTORY SERVICE ====================
/**
 * INVENTORY SERVICE: Prevents overselling with locking mechanisms
 * 
 * Optimistic Locking:
 * - Version-based validation
 * - Retry on conflicts
 * - Better for low contention
 * 
 * Pessimistic Locking:
 * - Row-level locking
 * - Immediate consistency
 * - Better for high contention (flash sales)
 */

class InventoryService {
    constructor() {
        this.inventory = new Map();
        this.locks = new Map();
    }
    
    reserveInventoryOptimistic(productId, quantity, expectedVersion) {
        const item = this.inventory.get(productId);
        if (!item || item.quantity < quantity) {
            return false;
        }
        
        // Simulate atomic update with version check
        if (item.version !== expectedVersion) {
            return false; // Version mismatch, retry needed
        }
        
        if (item.quantity >= quantity) {
            item.quantity -= quantity;
            item.version++;
            item.lastUpdated = Date.now();
            return true;
        }
        
        return false;
    }
    
    reserveInventoryPessimistic(productId, quantity, lockId) {
        // Acquire lock
        const existingLock = this.locks.get(productId);
        if (existingLock && existingLock !== lockId) {
            return false; // Locked by another request
        }
        
        this.locks.set(productId, lockId);
        
        try {
            const item = this.inventory.get(productId);
            if (item && item.quantity >= quantity) {
                item.quantity -= quantity;
                item.lastUpdated = Date.now();
                return true;
            }
            return false;
        } finally {
            // Release lock
            if (this.locks.get(productId) === lockId) {
                this.locks.delete(productId);
            }
        }
    }
    
    getInventory(productId) {
        return this.inventory.get(productId);
    }
    
    addInventory(productId, quantity) {
        if (!this.inventory.has(productId)) {
            this.inventory.set(productId, new InventoryItem(productId, 0));
        }
        this.inventory.get(productId).quantity += quantity;
    }
    
    reserveInventoryWithRetry(productId, quantity, maxRetries) {
        for (let i = 0; i < maxRetries; i++) {
            const item = this.inventory.get(productId);
            if (!item) return false;
            
            if (this.reserveInventoryOptimistic(productId, quantity, item.version)) {
                return true;
            }
            
            // Wait before retry
            this.sleep(10);
        }
        return false;
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class InventoryItem {
    constructor(productId, quantity) {
        this.productId = productId;
        this.quantity = quantity;
        this.version = 1;
        this.lastUpdated = Date.now();
    }
}

// ==================== 3. PAYMENT SERVICE ====================
/**
 * PAYMENT SERVICE: Idempotent operations with webhook handling
 * 
 * Features:
 * - Idempotent payment processing
 * - Webhook handling for external gateways
 * - Retry mechanisms with exponential backoff
 * - Distributed rollback using saga pattern
 */

class PaymentService {
    constructor() {
        this.payments = new Map();
        this.idempotencyKeys = new Map();
    }
    
    processPayment(orderId, amount, idempotencyKey) {
        // Check idempotency
        if (this.idempotencyKeys.has(idempotencyKey)) {
            return this.idempotencyKeys.get(idempotencyKey);
        }
        
        const paymentId = this.generatePaymentId();
        const record = new PaymentRecord(paymentId, orderId, amount);
        this.payments.set(paymentId, record);
        this.idempotencyKeys.set(idempotencyKey, paymentId);
        
        // Simulate payment processing
        const success = this.processPaymentWithGateway(amount);
        
        if (success) {
            record.status = "SUCCESS";
        } else {
            record.status = "FAILED";
        }
        
        return paymentId;
    }
    
    handleWebhook(paymentId, status) {
        const record = this.payments.get(paymentId);
        if (record) {
            record.status = status;
            
            // Trigger order status update
            if (status === "SUCCESS") {
                // Update order to PAID
                this.updateOrderStatus(record.orderId, "PAID");
            } else {
                // Trigger rollback
                this.rollbackOrder(record.orderId);
            }
        }
    }
    
    generatePaymentId() {
        return `PAY_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    }
    
    processPaymentWithGateway(amount) {
        // Simulate external payment gateway
        return Math.random() > 0.1; // 90% success rate
    }
    
    updateOrderStatus(orderId, status) {
        // Simulate order service call
        console.log(`Order ${orderId} status updated to ${status}`);
    }
    
    rollbackOrder(orderId) {
        // Simulate inventory rollback
        console.log(`Rolling back order ${orderId}`);
    }
}

class PaymentRecord {
    constructor(paymentId, orderId, amount) {
        this.paymentId = paymentId;
        this.orderId = orderId;
        this.amount = amount;
        this.status = "PENDING";
        this.createdAt = Date.now();
        this.retryCount = 0;
    }
}

// ==================== 4. FLASH SALE HANDLING ====================
/**
 * FLASH SALE HANDLING: High-traffic event management
 * 
 * Components:
 * - Pre-warmed Redis cache
 * - Rate limiting per user/IP
 * - Queue-based processing
 * - Auto-scaling infrastructure
 */

class FlashSaleService {
    constructor() {
        this.saleItems = new Map();
        this.userRateLimiters = new Map();
        this.requestQueue = [];
    }
    
    joinFlashSale(userId, productId, quantity) {
        // Rate limiting
        if (!this.checkRateLimit(userId)) {
            return false;
        }
        
        // Check if sale is active
        const item = this.saleItems.get(productId);
        if (!item || Date.now() > item.saleEndTime) {
            return false;
        }
        
        // Add to queue for processing
        this.requestQueue.push(new SaleRequest(userId, productId, quantity));
        return true;
    }
    
    processSaleQueue() {
        while (this.requestQueue.length > 0) {
            const request = this.requestQueue.shift();
            if (request) {
                this.processSaleRequest(request);
            }
        }
    }
    
    processSaleRequest(request) {
        const item = this.saleItems.get(request.productId);
        if (item && item.availableQuantity >= request.quantity) {
            // Use optimistic locking for inventory
            if (item.availableQuantity >= request.quantity) {
                item.availableQuantity -= request.quantity;
                // Create order
                this.createOrder(request.userId, request.productId, request.quantity, item.salePrice);
            }
        }
    }
    
    checkRateLimit(userId) {
        if (!this.userRateLimiters.has(userId)) {
            this.userRateLimiters.set(userId, new RateLimiter(5, 60000)); // 5 requests per minute
        }
        return this.userRateLimiters.get(userId).allowRequest();
    }
    
    createOrder(userId, productId, quantity, price) {
        // Simulate order creation
        console.log(`Flash sale order created: ${userId} - ${productId} x${quantity}`);
    }
    
    preWarmCache() {
        // Load product data into Redis
        // Pre-calculate prices and availability
        console.log("Cache pre-warmed for flash sale");
    }
}

class SaleItem {
    constructor(productId, quantity, price, duration) {
        this.productId = productId;
        this.totalQuantity = quantity;
        this.availableQuantity = quantity;
        this.salePrice = price;
        this.saleStartTime = Date.now();
        this.saleEndTime = this.saleStartTime + duration;
    }
}

class SaleRequest {
    constructor(userId, productId, quantity) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.requestTime = Date.now();
    }
}

// ==================== 5. RATE LIMITER ====================
/**
 * RATE LIMITER: Token bucket algorithm for traffic control
 */

class RateLimiter {
    constructor(maxTokens, windowMs) {
        this.maxTokens = maxTokens;
        this.windowMs = windowMs;
        this.tokens = maxTokens;
        this.lastRefillTime = Date.now();
    }
    
    allowRequest() {
        this.refillTokens();
        if (this.tokens > 0) {
            this.tokens--;
            return true;
        }
        return false;
    }
    
    refillTokens() {
        const now = Date.now();
        const timePassed = now - this.lastRefillTime;
        
        if (timePassed >= this.windowMs) {
            const refillAmount = Math.floor(timePassed / this.windowMs) * this.maxTokens;
            this.tokens = Math.min(this.maxTokens, this.tokens + refillAmount);
            this.lastRefillTime = now;
        }
    }
}

// ==================== 6. BOOKING SYSTEM ====================
/**
 * BOOKING SYSTEM: Version-based locking for consistency
 * 
 * Used for:
 * - Movie ticket booking
 * - Hotel reservations
 * - Flight seat booking
 * - Concert tickets
 */

class BookingService {
    constructor() {
        this.bookings = new Map();
        this.temporaryHolds = new Map();
    }
    
    holdSeat(itemId, userId, seatNumber) {
        const item = this.bookings.get(itemId);
        if (!item) return null;
        
        if (item.availableSeats > 0 && !item.reservedSeats.has(seatNumber.toString())) {
            const holdId = this.generateHoldId();
            item.reservedSeats.set(seatNumber.toString(), userId);
            item.availableSeats--;
            item.version++;
            
            // Set temporary hold (5 minutes)
            this.temporaryHolds.set(holdId, `${itemId}:${seatNumber}`);
            
            // Schedule hold expiry
            this.scheduleHoldExpiry(holdId, 5 * 60 * 1000);
            
            return holdId;
        }
        
        return null;
    }
    
    confirmBooking(holdId, userId) {
        const holdInfo = this.temporaryHolds.get(holdId);
        if (!holdInfo) return false;
        
        const [itemId, seatNumber] = holdInfo.split(':');
        
        const item = this.bookings.get(itemId);
        if (!item) return false;
        
        const reservedUser = item.reservedSeats.get(seatNumber);
        if (userId === reservedUser) {
            // Convert hold to confirmed booking
            item.reservedSeats.set(seatNumber, `CONFIRMED_${userId}`);
            this.temporaryHolds.delete(holdId);
            return true;
        }
        
        return false;
    }
    
    generateHoldId() {
        return `HOLD_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    }
    
    scheduleHoldExpiry(holdId, delay) {
        setTimeout(() => {
            const holdInfo = this.temporaryHolds.get(holdId);
            if (holdInfo) {
                this.releaseHold(holdInfo);
                this.temporaryHolds.delete(holdId);
            }
        }, delay);
    }
    
    releaseHold(holdInfo) {
        const [itemId, seatNumber] = holdInfo.split(':');
        
        const item = this.bookings.get(itemId);
        if (item) {
            item.reservedSeats.delete(seatNumber);
            item.availableSeats++;
            item.version++;
        }
    }
}

class BookingItem {
    constructor(itemId, totalSeats) {
        this.itemId = itemId;
        this.totalSeats = totalSeats;
        this.availableSeats = totalSeats;
        this.version = 1;
        this.reservedSeats = new Map();
    }
}

// ==================== 7. MAIN SERVICE ====================
/**
 * MAIN SERVICE: Orchestrates the entire e-commerce flow
 */

class EcommerceService {
    constructor() {
        this.cartService = new CartService();
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.flashSaleService = new FlashSaleService();
        this.bookingService = new BookingService();
    }
    
    placeOrder(userId, productId, quantity) {
        // 1. Validate cart
        const cart = this.cartService.getCart(userId);
        if (!cart || !cart.items.has(productId)) {
            return null;
        }
        
        // 2. Check and reserve inventory
        if (!this.inventoryService.reserveInventoryWithRetry(productId, quantity, 3)) {
            return null;
        }
        
        // 3. Process payment
        const orderId = this.generateOrderId();
        const paymentId = this.paymentService.processPayment(orderId, 
            cart.items.get(productId).price * quantity, 
            `${orderId}_payment`);
        
        // 4. Clear cart
        this.cartService.removeFromCart(userId, productId);
        
        return orderId;
    }
    
    generateOrderId() {
        return `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    }
}

// ==================== 8. INTERVIEW EXAMPLES ====================
/**
 * INTERVIEW EXAMPLES: Real-world scenarios to discuss
 */

class InterviewExamples {
    
    /**
     * Example 1: Flash Sale Scenario
     * 
     * Problem: 10,000 users trying to buy 100 iPhones in 1 minute
     * 
     * Solution:
     * 1. Pre-warm Redis with product data
     * 2. Rate limit: 1 request per user per 30 seconds
     * 3. Queue-based processing to handle spikes
     * 4. Optimistic locking for inventory
     * 5. Auto-scaling for compute resources
     */
    
    /**
     * Example 2: Booking System Scenario
     * 
     * Problem: Multiple users trying to book the same seat
     * 
     * Solution:
     * 1. Temporary hold for 5 minutes
     * 2. Version-based optimistic locking
     * 3. Atomic seat reservation
     * 4. Automatic hold expiry
     * 5. Payment confirmation required
     */
    
    /**
     * Example 3: Cart Abandonment
     * 
     * Problem: Users abandon carts, need to recover
     * 
     * Solution:
     * 1. Redis TTL for cart expiry
     * 2. Email reminders for abandoned carts
     * 3. Guest cart merging on login
     * 4. Price lock for limited time
     */
}

// ==================== 9. SCALABILITY PATTERNS ====================
/**
 * SCALABILITY PATTERNS: Key patterns for high-scale systems
 */

class ScalabilityPatterns {
    
    /**
     * 1. CACHE-ASIDE PATTERN
     * - Read from cache first
     * - Fallback to database
     * - Update cache after write
     */
    
    /**
     * 2. SAGA PATTERN
     * - Distributed transactions
     * - Compensating actions for rollback
     * - Event-driven coordination
     */
    
    /**
     * 3. CQRS (Command Query Responsibility Segregation)
     * - Separate read and write models
     * - Optimized for different use cases
     * - Event sourcing for consistency
     */
    
    /**
     * 4. CIRCUIT BREAKER PATTERN
     * - Prevent cascade failures
     * - Graceful degradation
     * - Automatic recovery
     */
    
    /**
     * 5. EVENT-DRIVEN ARCHITECTURE
     * - Loose coupling between services
     * - Asynchronous processing
     * - Scalable message handling
     */
}

// ==================== 10. MAIN EXECUTION ====================
async function runEcommerceDemo() {
    console.log("=== E-commerce/Booking System Demo ===");
    
    const service = new EcommerceService();
    
    // Cart operations
    service.cartService.addToCart("user123", "product456", 2);
    const cart = service.cartService.getCart("user123");
    console.log(`Cart items: ${cart ? cart.items.size : 0}`);
    
    // Inventory operations
    service.inventoryService.addInventory("product456", 10);
    const reserved = service.inventoryService.reserveInventoryWithRetry("product456", 1, 3);
    console.log(`Inventory reserved: ${reserved}`);
    
    // Payment operations
    const paymentId = service.paymentService.processPayment("order789", 99.99, "order789_payment");
    console.log(`Payment processed: ${paymentId}`);
    
    console.log("=== Demo Complete ===");
}

// Run the demo
runEcommerceDemo(); 