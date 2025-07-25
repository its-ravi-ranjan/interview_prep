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
 * 
 * 
 * 🛒 E-commerce Product Lifecycle & Search Flow
 *  ✅ 1. Product & Variant Creation
 *  Admin adds product:
 *  - Stored in products collection (or table)
 *  - Then adds variants (size, color, etc.):
 *  - Stored in variants collection
 *  - Each variant contains:
 *  - SKU, price, dimensions, etc.
 * 
 *  ✅ 2. Inventory Update
 *  - For each variant:
 *  - Inventory is stored per location/warehouse in inventory collection
 *  - Example:
    {
    "variantId": "V123",
    "location": "Delhi",
    "quantity": 10
    }
 *  ✅ 3. ElasticSearch Sync (for Search Use Cases)
 *  - When a product or variant is added/updated:
 *  - A message is sent to Kafka queue (e.g., product_updates)
 *  - A sync service listens and updates a combined doc in Elasticsearch:
    {
    "productId": "P001",
    "variantId": "V123",
    "title": "Samsung S23 Ultra",
    "description": "Latest model...",
    "category": "Smartphones",
    "location_stock": [
        { "location": "Delhi", "stock": 10, "geo": { "lat": 28.6, "lon": 77.2 } },
        { "location": "Mumbai", "stock": 0 }
    ]
    }
 * ✅ 4. Search Flow (User Side)
 *  - User types a query and selects their location/pincode
 *  - Frontend sends request → Backend queries Elasticsearch
 *  - Elasticsearch filters:
 *  - Text match (title, brand, description, etc.)
 *  - Optional location-based stock filter (location_stock.stock > 0)
 *  - Results are returned ranked by relevance + availability
 *  - UI displays availability (based on ES data)

 * ✅ 5. At Checkout: Real-Time Stock Check
 *  - Before placing order, backend:
 *  - Validates real-time quantity from inventory DB
 *  - Optionally locks or reserves stock
 *  - ❌ Never rely on ES for real-time quantity
 * 
 * ✅ 6. Post-order Inventory Update
 *  - Once order is placed:
 *  - Inventory DB is decremented
 *  - A stock_updated event is pushed to Kafka
 *  - ElasticSearch is updated asynchronously via consumer
 */

import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

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
    private Map<String, Cart> redisCache = new ConcurrentHashMap<>();
    private static final long CART_TTL = 30 * 60 * 1000L; // 30 minutes
    
    static class Cart {
        String userId;
        Map<String, CartItem> items = new HashMap<>();
        long lastAccessed;
        long expiresAt;
        
        public Cart(String userId) {
            this.userId = userId;
            this.lastAccessed = System.currentTimeMillis();
            this.expiresAt = lastAccessed + CART_TTL;
        }
    }
    
    static class CartItem {
        String productId;
        int quantity;
        double price;
        long addedAt;
        
        public CartItem(String productId, int quantity, double price) {
            this.productId = productId;
            this.quantity = quantity;
            this.price = price;
            this.addedAt = System.currentTimeMillis();
        }
    }
    
    public void addToCart(String userId, String productId, int quantity) {
        Cart cart = redisCache.computeIfAbsent(userId, Cart::new);
        cart.lastAccessed = System.currentTimeMillis();
        cart.expiresAt = cart.lastAccessed + CART_TTL;
        
        CartItem item = cart.items.get(productId);
        if (item != null) {
            item.quantity += quantity;
        } else {
            cart.items.put(productId, new CartItem(productId, quantity, getProductPrice(productId)));
        }
    }
    
    public void removeFromCart(String userId, String productId) {
        Cart cart = redisCache.get(userId);
        if (cart != null) {
            cart.items.remove(productId);
            cart.lastAccessed = System.currentTimeMillis();
        }
    }
    
    public Cart getCart(String userId) {
        Cart cart = redisCache.get(userId);
        if (cart != null && System.currentTimeMillis() < cart.expiresAt) {
            cart.lastAccessed = System.currentTimeMillis();
            return cart;
        }
        return null;
    }
    
    public void mergeGuestCart(String guestId, String userId) {
        Cart guestCart = redisCache.get(guestId);
        Cart userCart = redisCache.get(userId);
        
        if (guestCart != null) {
            if (userCart == null) {
                userCart = new Cart(userId);
                redisCache.put(userId, userCart);
            }
            
            for (CartItem item : guestCart.items.values()) {
                CartItem existingItem = userCart.items.get(item.productId);
                if (existingItem != null) {
                    existingItem.quantity += item.quantity;
                } else {
                    userCart.items.put(item.productId, item);
                }
            }
            
            redisCache.remove(guestId);
        }
    }
    
    private double getProductPrice(String productId) {
        // Simulate product service call
        return Math.random() * 1000;
    }
    
    // Cleanup expired carts
    public void cleanupExpiredCarts() {
        long now = System.currentTimeMillis();
        redisCache.entrySet().removeIf(entry -> entry.getValue().expiresAt < now);
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
    private Map<String, InventoryItem> inventory = new ConcurrentHashMap<>();
    private Map<String, String> locks = new ConcurrentHashMap<>();
    
    static class InventoryItem {
        String productId;
        int quantity;
        int version;
        long lastUpdated;
        
        public InventoryItem(String productId, int quantity) {
            this.productId = productId;
            this.quantity = quantity;
            this.version = 1;
            this.lastUpdated = System.currentTimeMillis();
        }
    }
    
    // Optimistic Locking Implementation
    public boolean reserveInventoryOptimistic(String productId, int quantity, int expectedVersion) {
        InventoryItem item = inventory.get(productId);
        if (item == null || item.quantity < quantity) {
            return false;
        }
        
        // Simulate atomic update with version check
        synchronized (item) {
            if (item.version != expectedVersion) {
                return false; // Version mismatch, retry needed
            }
            
            if (item.quantity >= quantity) {
                item.quantity -= quantity;
                item.version++;
                item.lastUpdated = System.currentTimeMillis();
                return true;
            }
        }
        
        return false;
    }
    
    // Pessimistic Locking Implementation
    public boolean reserveInventoryPessimistic(String productId, int quantity, String lockId) {
        // Acquire lock
        String existingLock = locks.putIfAbsent(productId, lockId);
        if (existingLock != null && !existingLock.equals(lockId)) {
            return false; // Locked by another request
        }
        
        try {
            InventoryItem item = inventory.get(productId);
            if (item != null && item.quantity >= quantity) {
                item.quantity -= quantity;
                item.lastUpdated = System.currentTimeMillis();
                return true;
            }
            return false;
        } finally {
            // Release lock
            locks.remove(productId, lockId);
        }
    }
    
    public InventoryItem getInventory(String productId) {
        return inventory.get(productId);
    }
    
    public void addInventory(String productId, int quantity) {
        inventory.computeIfAbsent(productId, k -> new InventoryItem(k, 0)).quantity += quantity;
    }
    
    // Retry mechanism for optimistic locking
    public boolean reserveInventoryWithRetry(String productId, int quantity, int maxRetries) {
        for (int i = 0; i < maxRetries; i++) {
            InventoryItem item = inventory.get(productId);
            if (item == null) return false;
            
            if (reserveInventoryOptimistic(productId, quantity, item.version)) {
                return true;
            }
            
            // Wait before retry
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return false;
            }
        }
        return false;
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
    private Map<String, PaymentRecord> payments = new ConcurrentHashMap<>();
    private Map<String, String> idempotencyKeys = new ConcurrentHashMap<>();
    
    static class PaymentRecord {
        String paymentId;
        String orderId;
        double amount;
        String status; // PENDING, SUCCESS, FAILED
        long createdAt;
        int retryCount;
        
        public PaymentRecord(String paymentId, String orderId, double amount) {
            this.paymentId = paymentId;
            this.orderId = orderId;
            this.amount = amount;
            this.status = "PENDING";
            this.createdAt = System.currentTimeMillis();
            this.retryCount = 0;
        }
    }
    
    public String processPayment(String orderId, double amount, String idempotencyKey) {
        // Check idempotency
        if (idempotencyKeys.containsKey(idempotencyKey)) {
            return idempotencyKeys.get(idempotencyKey);
        }
        
        String paymentId = generatePaymentId();
        PaymentRecord record = new PaymentRecord(paymentId, orderId, amount);
        payments.put(paymentId, record);
        idempotencyKeys.put(idempotencyKey, paymentId);
        
        // Simulate payment processing
        boolean success = processPaymentWithGateway(amount);
        
        if (success) {
            record.status = "SUCCESS";
        } else {
            record.status = "FAILED";
        }
        
        return paymentId;
    }
    
    public void handleWebhook(String paymentId, String status) {
        PaymentRecord record = payments.get(paymentId);
        if (record != null) {
            record.status = status;
            
            // Trigger order status update
            if ("SUCCESS".equals(status)) {
                // Update order to PAID
                updateOrderStatus(record.orderId, "PAID");
            } else {
                // Trigger rollback
                rollbackOrder(record.orderId);
            }
        }
    }
    
    private String generatePaymentId() {
        return "PAY_" + System.currentTimeMillis() + "_" + ThreadLocalRandom.current().nextInt(1000);
    }
    
    private boolean processPaymentWithGateway(double amount) {
        // Simulate external payment gateway
        return Math.random() > 0.1; // 90% success rate
    }
    
    private void updateOrderStatus(String orderId, String status) {
        // Simulate order service call
        System.out.println("Order " + orderId + " status updated to " + status);
    }
    
    private void rollbackOrder(String orderId) {
        // Simulate inventory rollback
        System.out.println("Rolling back order " + orderId);
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
    private Map<String, SaleItem> saleItems = new ConcurrentHashMap<>();
    private Map<String, RateLimiter> userRateLimiters = new ConcurrentHashMap<>();
    private Queue<SaleRequest> requestQueue = new ConcurrentLinkedQueue<>();
    
    static class SaleItem {
        String productId;
        int totalQuantity;
        int availableQuantity;
        double salePrice;
        long saleStartTime;
        long saleEndTime;
        
        public SaleItem(String productId, int quantity, double price, long duration) {
            this.productId = productId;
            this.totalQuantity = quantity;
            this.availableQuantity = quantity;
            this.salePrice = price;
            this.saleStartTime = System.currentTimeMillis();
            this.saleEndTime = saleStartTime + duration;
        }
    }
    
    static class SaleRequest {
        String userId;
        String productId;
        int quantity;
        long requestTime;
        
        public SaleRequest(String userId, String productId, int quantity) {
            this.userId = userId;
            this.productId = productId;
            this.quantity = quantity;
            this.requestTime = System.currentTimeMillis();
        }
    }
    
    public boolean joinFlashSale(String userId, String productId, int quantity) {
        // Rate limiting
        if (!checkRateLimit(userId)) {
            return false;
        }
        
        // Check if sale is active
        SaleItem item = saleItems.get(productId);
        if (item == null || System.currentTimeMillis() > item.saleEndTime) {
            return false;
        }
        
        // Add to queue for processing
        requestQueue.offer(new SaleRequest(userId, productId, quantity));
        return true;
    }
    
    public void processSaleQueue() {
        while (!requestQueue.isEmpty()) {
            SaleRequest request = requestQueue.poll();
            if (request != null) {
                processSaleRequest(request);
            }
        }
    }
    
    private void processSaleRequest(SaleRequest request) {
        SaleItem item = saleItems.get(request.productId);
        if (item != null && item.availableQuantity >= request.quantity) {
            // Use optimistic locking for inventory
            synchronized (item) {
                if (item.availableQuantity >= request.quantity) {
                    item.availableQuantity -= request.quantity;
                    // Create order
                    createOrder(request.userId, request.productId, request.quantity, item.salePrice);
                }
            }
        }
    }
    
    private boolean checkRateLimit(String userId) {
        RateLimiter limiter = userRateLimiters.computeIfAbsent(userId, k -> new RateLimiter(5, 60000)); // 5 requests per minute
        return limiter.allowRequest();
    }
    
    private void createOrder(String userId, String productId, int quantity, double price) {
        // Simulate order creation
        System.out.println("Flash sale order created: " + userId + " - " + productId + " x" + quantity);
    }
    
    // Pre-warm cache for flash sale
    public void preWarmCache() {
        // Load product data into Redis
        // Pre-calculate prices and availability
        System.out.println("Cache pre-warmed for flash sale");
    }
}

// ==================== 5. RATE LIMITER ====================
/**
 * RATE LIMITER: Token bucket algorithm for traffic control
 */

class RateLimiter {
    private final int maxTokens;
    private final long windowMs;
    private AtomicInteger tokens;
    private volatile long lastRefillTime;
    
    public RateLimiter(int maxTokens, long windowMs) {
        this.maxTokens = maxTokens;
        this.windowMs = windowMs;
        this.tokens = new AtomicInteger(maxTokens);
        this.lastRefillTime = System.currentTimeMillis();
    }
    
    public boolean allowRequest() {
        refillTokens();
        return tokens.getAndDecrement() > 0;
    }
    
    private void refillTokens() {
        long now = System.currentTimeMillis();
        long timePassed = now - lastRefillTime;
        
        if (timePassed >= windowMs) {
            int refillAmount = (int) (timePassed / windowMs) * maxTokens;
            tokens.set(Math.min(maxTokens, tokens.get() + refillAmount));
            lastRefillTime = now;
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
    private Map<String, BookingItem> bookings = new ConcurrentHashMap<>();
    private Map<String, String> temporaryHolds = new ConcurrentHashMap<>();
    
    static class BookingItem {
        String itemId;
        int totalSeats;
        int availableSeats;
        int version;
        Map<String, String> reservedSeats = new HashMap<>();
        
        public BookingItem(String itemId, int totalSeats) {
            this.itemId = itemId;
            this.totalSeats = totalSeats;
            this.availableSeats = totalSeats;
            this.version = 1;
        }
    }
    
    public String holdSeat(String itemId, String userId, int seatNumber) {
        BookingItem item = bookings.get(itemId);
        if (item == null) return null;
        
        synchronized (item) {
            if (item.availableSeats > 0 && !item.reservedSeats.containsKey(String.valueOf(seatNumber))) {
                String holdId = generateHoldId();
                item.reservedSeats.put(String.valueOf(seatNumber), userId);
                item.availableSeats--;
                item.version++;
                
                // Set temporary hold (5 minutes)
                temporaryHolds.put(holdId, itemId + ":" + seatNumber);
                
                // Schedule hold expiry
                scheduleHoldExpiry(holdId, 5 * 60 * 1000L);
                
                return holdId;
            }
        }
        
        return null;
    }
    
    public boolean confirmBooking(String holdId, String userId) {
        String holdInfo = temporaryHolds.remove(holdId);
        if (holdInfo == null) return false;
        
        String[] parts = holdInfo.split(":");
        String itemId = parts[0];
        int seatNumber = Integer.parseInt(parts[1]);
        
        BookingItem item = bookings.get(itemId);
        if (item == null) return false;
        
        synchronized (item) {
            String reservedUser = item.reservedSeats.get(String.valueOf(seatNumber));
            if (userId.equals(reservedUser)) {
                // Convert hold to confirmed booking
                item.reservedSeats.put(String.valueOf(seatNumber), "CONFIRMED_" + userId);
                return true;
            }
        }
        
        return false;
    }
    
    private String generateHoldId() {
        return "HOLD_" + System.currentTimeMillis() + "_" + ThreadLocalRandom.current().nextInt(1000);
    }
    
    private void scheduleHoldExpiry(String holdId, long delay) {
        ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
        executor.schedule(() -> {
            String holdInfo = temporaryHolds.remove(holdId);
            if (holdInfo != null) {
                releaseHold(holdInfo);
            }
        }, delay, TimeUnit.MILLISECONDS);
        executor.shutdown();
    }
    
    private void releaseHold(String holdInfo) {
        String[] parts = holdInfo.split(":");
        String itemId = parts[0];
        int seatNumber = Integer.parseInt(parts[1]);
        
        BookingItem item = bookings.get(itemId);
        if (item != null) {
            synchronized (item) {
                item.reservedSeats.remove(String.valueOf(seatNumber));
                item.availableSeats++;
                item.version++;
            }
        }
    }
}

// ==================== 7. MAIN SERVICE ====================
/**
 * MAIN SERVICE: Orchestrates the entire e-commerce flow
 */

class EcommerceService {
    private CartService cartService;
    private InventoryService inventoryService;
    private PaymentService paymentService;
    private FlashSaleService flashSaleService;
    private BookingService bookingService;
    
    public EcommerceService() {
        this.cartService = new CartService();
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.flashSaleService = new FlashSaleService();
        this.bookingService = new BookingService();
    }
    
    public String placeOrder(String userId, String productId, int quantity) {
        // 1. Validate cart
        CartService.Cart cart = cartService.getCart(userId);
        if (cart == null || !cart.items.containsKey(productId)) {
            return null;
        }
        
        // 2. Check and reserve inventory
        if (!inventoryService.reserveInventoryWithRetry(productId, quantity, 3)) {
            return null;
        }
        
        // 3. Process payment
        String orderId = generateOrderId();
        String paymentId = paymentService.processPayment(orderId, 
            cart.items.get(productId).price * quantity, 
            orderId + "_payment");
        
        // 4. Clear cart
        cartService.removeFromCart(userId, productId);
        
        return orderId;
    }
    
    private String generateOrderId() {
        return "ORDER_" + System.currentTimeMillis() + "_" + ThreadLocalRandom.current().nextInt(1000);
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

// ==================== 10. MAIN CLASS ====================
public class EcommerceBookingSystem {
    
    public static void main(String[] args) {
        EcommerceService service = new EcommerceService();
        
        // Example usage
        System.out.println("=== E-commerce/Booking System Demo ===");
        
        // Cart operations
        service.cartService.addToCart("user123", "product456", 2);
        CartService.Cart cart = service.cartService.getCart("user123");
        System.out.println("Cart items: " + (cart != null ? cart.items.size() : 0));
        
        // Inventory operations
        service.inventoryService.addInventory("product456", 10);
        boolean reserved = service.inventoryService.reserveInventoryWithRetry("product456", 1, 3);
        System.out.println("Inventory reserved: " + reserved);
        
        // Payment operations
        String paymentId = service.paymentService.processPayment("order789", 99.99, "order789_payment");
        System.out.println("Payment processed: " + paymentId);
        
        System.out.println("=== Demo Complete ===");
    }
} 