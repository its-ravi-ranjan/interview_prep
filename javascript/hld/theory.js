/**
 * High-Level Design (HLD) Theory - Amazon Interview Focus
 * 
 * This covers three critical concepts for system design interviews:
 * 1. CAP Theorem
 * 2. Latency vs Throughput
 * 3. Caching Strategies
 * 
 * Each concept includes:
 * - Definition and explanation
 * - Real-world examples
 * - Trade-offs and decision factors
 * - Amazon-specific considerations
 */

// ==================== 1. CAP THEOREM ====================
/**
 * CAP THEOREM: In a distributed system, you can only guarantee 2 out of 3:
 * 
 * C - Consistency: All nodes see the same data at the same time
 * A - Availability: Every request receives a response (no timeout)
 * P - Partition Tolerance: System continues despite network failures
 * 
 * Real-world example: Amazon's DynamoDB
 * - CP: Strong consistency (reads are always consistent)
 * - AP: Eventually consistent (better availability)
 */

class CAPTheoremExample {
    
    // CP System (Consistency + Partition Tolerance)
    constructor() {
        this.data = new Map();
        this.isPartitioned = false;
    }
    
    read(key) {
        if (this.isPartitioned) {
            throw new Error('System unavailable during partition');
        }
        return this.data.get(key);
    }
    
    write(key, value) {
        if (this.isPartitioned) {
            throw new Error('System unavailable during partition');
        }
        this.data.set(key, value);
    }
    
    // Always consistent, but unavailable during partitions
}

class APDatabase {
    constructor() {
        this.data = new Map();
        this.isPartitioned = false;
    }
    
    read(key) {
        // Always available, but might return stale data
        return this.data.get(key) || 'default_value';
    }
    
    write(key, value) {
        // Always available, but might not be immediately consistent
        this.data.set(key, value);
        // In real system, would replicate asynchronously
    }
    
    // Always available, but eventually consistent
}

class CADatabase {
    constructor() {
        this.data = new Map();
    }
    
    read(key) {
        return this.data.get(key);
    }
    
    write(key, value) {
        this.data.set(key, value);
    }
    
    // Consistent and available, but fails during network partitions
}

// ==================== 2. LATENCY vs THROUGHPUT ====================
/**
 * LATENCY: Time to complete one operation (e.g., 100ms per request)
 * THROUGHPUT: Number of operations per unit time (e.g., 1000 requests/second)
 * 
 * Key Insight: They're often inversely related
 * 
 * Amazon Example: 
 * - Prime Video: Low latency (streaming), moderate throughput
 * - S3: High throughput (bulk storage), moderate latency
 */

class BadSystem {
    async processRequest() {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second latency
        // Process one request at a time
        return 'processed';
    }
}

class GoodSystem {
    constructor() {
        this.requestCount = 0;
        this.maxConcurrent = 10;
        this.activeRequests = 0;
    }
    
    async processRequestAsync() {
        if (this.activeRequests >= this.maxConcurrent) {
            throw new Error('Too many concurrent requests');
        }
        
        this.activeRequests++;
        try {
            await new Promise(resolve => setTimeout(resolve, 10)); // 10ms latency
            this.requestCount++;
            return `Processed request ${this.requestCount}`;
        } finally {
            this.activeRequests--;
        }
    }
    
    // Can handle 1000 requests/second with 10ms latency each
}

class BatchProcessor {
    constructor() {
        this.batch = [];
        this.BATCH_SIZE = 100;
    }
    
    addToBatch(item) {
        this.batch.push(item);
        if (this.batch.length >= this.BATCH_SIZE) {
            this.processBatch();
        }
    }
    
    processBatch() {
        // Higher latency (wait for batch), but higher throughput
        console.log(`Processing batch of ${this.batch.length} items`);
        this.batch = [];
    }
}

// ==================== 3. CACHING STRATEGIES ====================
/**
 * CACHING: Storing frequently accessed data in fast memory
 * 
 * Types:
 * 1. Application Cache (Redis, Memcached)
 * 2. CDN Cache (CloudFront)
 * 3. Database Cache (Query cache)
 * 4. Browser Cache
 * 
 * Amazon Examples:
 * - CloudFront: CDN caching
 * - ElastiCache: Redis/Memcached
 * - DynamoDB DAX: Database accelerator
 */

class SimpleCache {
    constructor() {
        this.cache = new Map();
        this.timestamps = new Map();
        this.TTL = 60000; // 1 minute TTL
    }
    
    get(key) {
        const value = this.cache.get(key);
        if (value && !this.isExpired(key)) {
            return value;
        }
        return null;
    }
    
    put(key, value) {
        this.cache.set(key, value);
        this.timestamps.set(key, Date.now());
    }
    
    isExpired(key) {
        const timestamp = this.timestamps.get(key);
        return !timestamp || (Date.now() - timestamp) > this.TTL;
    }
}

class CacheAsidePattern {
    constructor() {
        this.cache = new SimpleCache();
        this.database = new Map();
    }
    
    getUser(userId) {
        // 1. Check cache first
        let user = this.cache.get(userId);
        if (user) {
            console.log(`Cache hit for user: ${userId}`);
            return user;
        }
        
        // 2. Cache miss - get from database
        console.log(`Cache miss for user: ${userId}`);
        user = this.database.get(userId);
        if (user) {
            // 3. Store in cache for next time
            this.cache.put(userId, user);
        }
        
        return user;
    }
}

class WriteThroughCache {
    constructor() {
        this.cache = new SimpleCache();
        this.database = new Map();
    }
    
    updateUser(userId, userData) {
        // 1. Update database
        this.database.set(userId, userData);
        
        // 2. Update cache immediately
        this.cache.put(userId, userData);
        
        console.log(`Updated user in both DB and cache: ${userId}`);
    }
}

class WriteBehindCache {
    constructor() {
        this.cache = new SimpleCache();
        this.database = new Map();
        this.writeQueue = [];
    }
    
    updateUser(userId, userData) {
        // 1. Update cache immediately (fast)
        this.cache.put(userId, userData);
        
        // 2. Queue for database update (async)
        this.writeQueue.push({ userId, userData });
        
        console.log(`Updated cache immediately, queued for DB: ${userId}`);
    }
    
    // Background process to handle queue
    processWriteQueue() {
        while (this.writeQueue.length > 0) {
            const item = this.writeQueue.shift();
            this.database.set(item.userId, item.userData);
            console.log(`Processed DB write for: ${item.userId}`);
        }
    }
}

// ==================== PRACTICAL EXAMPLES ====================
class AmazonInterviewExamples {
    
    /**
     * CAP Theorem Decision Making:
     * 
     * Q: "Design a shopping cart system"
     * 
     * A: "For shopping cart, I'd choose AP (Availability + Partition Tolerance):
     * - Users can always add items to cart (Availability)
     * - Cart syncs across devices eventually (Eventually Consistent)
     * - Works even if some servers are down (Partition Tolerant)
     * 
     * But for payment processing, I'd choose CP (Consistency + Partition Tolerance):
     * - Must ensure no double-charging (Consistency)
     * - Can tolerate temporary unavailability during network issues"
     */
    
    /**
     * Q: "Design a social media feed system"
     * 
     * A: "I'd choose AP (Availability + Partition Tolerance):
     * - Users can always post and view feeds (Availability)
     * - Feed updates propagate eventually (Eventually Consistent)
     * - System works even if some data centers are down
     * - Missing a few posts temporarily is acceptable
     * 
     * Exception: For direct messages, I'd choose CP (Consistency + Partition Tolerance):
     * - Must ensure consistent access control"
     */
    
    /**
     * Q: "Design a user authentication system"
     * 
     * A: "I'd choose CP (Consistency + Partition Tolerance):
     * - Must ensure user credentials are always consistent
     * - Can't have different passwords on different servers
     * - Can tolerate temporary login unavailability during network issues
     * - Security is more important than 100% availability"
     */
    
    /**
     * Q: "Design a product inventory system"
     * 
     * A: "I'd choose CP (Consistency + Partition Tolerance):
     * - Must prevent overselling (Consistency)
     * - Inventory counts must be accurate across all nodes
     * - Can tolerate temporary unavailability during updates
     * - Better to be unavailable than sell non-existent items"
     */
    
    /**
     * Q: "Design a recommendation engine"
     * 
     * A: "I'd choose AP (Availability + Partition Tolerance):
     * - Users should always get recommendations (Availability)
     * - Recommendations can be slightly stale (Eventually Consistent)
     * - System works even if some recommendation servers are down
     * - Better to show old recommendations than no recommendations"
     */
    
    /**
     * Q: "Design a real-time chat application"
     * 
     * A: "I'd choose AP (Availability + Partition Tolerance):
     * - Users can always send messages (Availability)
     * - Messages may arrive out of order temporarily (Eventually Consistent)
     * - System works even if some chat servers are down
     * - Missing a few messages temporarily is acceptable
     * 
     * Exception: For group chat permissions, I'd choose CP:
     * - Must ensure consistent access control"
     */
    
    /**
     * Q: "Design a content delivery network (CDN)"
     * 
     * A: "I'd choose AP (Availability + Partition Tolerance):
     * - Users can always access content (Availability)
     * - Content may be slightly outdated (Eventually Consistent)
     * - System works even if some edge servers are down
     * - Better to serve cached content than no content"
     */
    
    /**
     * Q: "Design a financial transaction system"
     * 
     * A: "I'd choose CP (Consistency + Partition Tolerance):
     * - Must ensure no double-spending (Consistency)
     * - Account balances must be accurate across all nodes
     * - Can tolerate temporary unavailability during transactions
     * - Financial accuracy is more important than availability"
     */
    
    /**
     * Q: "Design a notification system"
     * 
     * A: "I'd choose AP (Availability + Partition Tolerance):
     * - Users should always receive notifications (Availability)
     * - Notifications can be slightly delayed (Eventually Consistent)
     * - System works even if some notification servers are down
     * - Better to send delayed notifications than none"
     */
    
    /**
     * Q: "Design a search engine"
     * 
     * A: "I'd choose AP (Availability + Partition Tolerance):
     * - Users can always search (Availability)
     * - Search results may be slightly outdated (Eventually Consistent)
     * - System works even if some search servers are down
     * - Better to show slightly old results than no results"
     */
    
    /**
     * Q: "Design a seat/ticket booking system"
     * 
     * A: "I'd choose CP (Consistency + Partition Tolerance):
     * - Must prevent double-booking (Consistency)
     * - Seat availability must be accurate across all nodes
     * - Can tolerate temporary unavailability during booking
     * - Better to be unavailable than oversell seats
     * 
     * Database: PostgreSQL with ACID transactions
     * - Strong consistency for seat inventory
     * - Row-level locking for concurrent bookings
     * - Master-slave replication for read scaling"
     */
    
    /**
     * DATABASE RECOMMENDATIONS FOR CAP EXAMPLES:
     * 
     * AP Systems (Eventually Consistent):
     * - Shopping Cart: DynamoDB (Amazon) - NoSQL, auto-scaling
     * - Social Media Feed: Cassandra - Wide-column, high write throughput
     * - Recommendation Engine: Redis + MongoDB - Fast cache + flexible schema
     * - Real-time Chat: DynamoDB + SQS - NoSQL + message queuing
     * - CDN: CloudFront + S3 - Edge caching + object storage
     * - Notification System: SQS + DynamoDB - Queue + NoSQL
     * - Search Engine: Elasticsearch - Distributed search index
     * 
     * CP Systems (Strongly Consistent):
     * - User Authentication: PostgreSQL - ACID transactions, security
     * - Product Inventory: PostgreSQL - ACID, row-level locking
     * - Financial Transaction: PostgreSQL - ACID, data integrity
     * - Payment Processing: PostgreSQL - ACID, audit trail
     * - Seat/Ticket Booking: PostgreSQL - ACID, concurrent access control
     * 
     * Hybrid Approaches:
     * - Use CP database for critical data (payments, inventory)
     * - Use AP database for user-facing features (cart, recommendations)
     * - Implement eventual consistency through message queues
     */
    
    /**
     * Latency vs Throughput Optimization:
     * 
     * Q: "How would you optimize an e-commerce product catalog?"
     * 
     * A: "I'd optimize for both:
     * - Low Latency: Use CDN for product images, cache product details
     * - High Throughput: Use read replicas, implement pagination
     * - Trade-off: Batch product updates during off-peak hours"
     */
    
    /**
     * Caching Strategy:
     * 
     * Q: "Design a recommendation system"
     * 
     * A: "Multi-layer caching:
     * - L1: User session cache (Redis) - personalized recommendations
     * - L2: CDN cache - popular product recommendations
     * - L3: Database cache - user behavior patterns
     * - Cache invalidation: TTL + event-driven updates"
     */
}

// ==================== MAIN FUNCTION WITH EXAMPLES ====================
async function runTheoryExamples() {
    console.log('=== HLD Theory Examples ===\n');
    
    // CAP Theorem Examples
    console.log('1. CAP THEOREM EXAMPLES:');
    const cpDB = new CAPTheoremExample();
    cpDB.write('user1', 'data1');
    console.log('CP System:', cpDB.read('user1'));
    
    const apDB = new APDatabase();
    apDB.write('user1', 'data1');
    console.log('AP System:', apDB.read('user1'));
    console.log();
    
    // Latency vs Throughput Examples
    console.log('2. LATENCY vs THROUGHPUT EXAMPLES:');
    const goodSystem = new GoodSystem();
    
    // Process multiple requests concurrently
    const promises = [
        goodSystem.processRequestAsync(),
        goodSystem.processRequestAsync(),
        goodSystem.processRequestAsync()
    ];
    
    const results = await Promise.all(promises);
    console.log('Async processing:', results);
    console.log();
    
    // Caching Examples
    console.log('3. CACHING EXAMPLES:');
    
    // Cache-Aside Pattern
    const cacheAside = new CacheAsidePattern();
    cacheAside.getUser('user1'); // Cache miss
    cacheAside.getUser('user1'); // Cache hit
    console.log();
    
    // Write-Through Cache
    const writeThrough = new WriteThroughCache();
    writeThrough.updateUser('user1', 'new data');
    console.log();
    
    // Write-Behind Cache
    const writeBehind = new WriteBehindCache();
    writeBehind.updateUser('user1', 'new data');
    writeBehind.processWriteQueue();
    console.log();
    
    console.log('=== KEY TAKEAWAYS ===');
    console.log('CAP: Choose 2 out of 3 based on business requirements');
    console.log('Latency vs Throughput: Often trade-offs, optimize based on use case');
    console.log('Caching: Multi-layer approach with appropriate invalidation strategy');
}

// Run examples if this file is executed directly
if (require.main === module) {
    runTheoryExamples();
}

module.exports = {
    // CAP Theorem
    CAPTheoremExample,
    APDatabase,
    CADatabase,
    
    // Latency vs Throughput
    BadSystem,
    GoodSystem,
    BatchProcessor,
    
    // Caching
    SimpleCache,
    CacheAsidePattern,
    WriteThroughCache,
    WriteBehindCache,
    
    // Examples
    AmazonInterviewExamples,
    
    // Main function
    runTheoryExamples
}; 