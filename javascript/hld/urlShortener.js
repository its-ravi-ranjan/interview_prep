/**
 * URL SHORTENER SYSTEM DESIGN - AMAZON INTERVIEW ESSENTIALS
 * 
 * 🎯 WHAT TO REMEMBER FOR INTERVIEWS:
 * 1. Base62 Encoding: Converts numeric IDs to short URLs (0-9, A-Z, a-z)
 * 2. NoSQL Database: DynamoDB/Cassandra for high availability and scalability
 * 3. Redis Caching: LRU eviction for frequently accessed URLs
 * 4. Rate Limiting: Token bucket to prevent abuse
 * 5. Load Balancing: Distribute traffic across multiple servers
 * 
 * 🔑 KEY CONCEPTS:
 * - URL shortening converts long URLs to short, memorable links
 * - Base62 encoding provides 62^6 = 56 billion unique combinations
 * - NoSQL databases handle high write/read throughput
 * - Caching reduces database load for popular URLs
 * - Rate limiting prevents API abuse
 * 
 * 📊 SYSTEM COMPONENTS:
 * Base62 Encoding: ✅ URL safe, ✅ Short, ✅ Case sensitive
 * NoSQL Database: ✅ High availability, ✅ Auto-scaling, ✅ Global distribution
 * Redis Cache: ✅ Fast access, ✅ LRU eviction, ✅ TTL support
 * Rate Limiting: ✅ Token bucket, ✅ Per-user limits, ✅ Abuse prevention
 * Load Balancer: ✅ Traffic distribution, ✅ Health checks, ✅ Failover
 * 
 * 🔄 STEP-BY-STEP EXAMPLE OF HOW IT WORKS:
 * 
 * ✅ Step 1: Save the Long URL & Generate a Unique ID
 * Let's say a user wants to shorten:
 * https://example.com/my-very-long-url
 * You store it in a database.
 * It gets a unique auto-increment ID, like 125.
 * 
 * ✅ Step 2: Encode the ID into Base62
 * Now, convert that 125 into Base62:
 * 125 in decimal => "cb" in Base62
 * So the short URL becomes:
 * https://short.ly/cb
 * (You now associate the short string "cb" with ID 125 in the DB)
 * 
 * ✅ Step 3: Redirection (Retrieve Long URL)
 * When someone hits:
 * https://short.ly/cb
 * You:
 * - Decode "cb" back to Base10 = 125
 * - Look up ID 125 in the database
 * - Get the original long URL: https://example.com/my-very-long-url
 * - Redirect user to it (HTTP 301/302)
 * 
 * 📦 Why Use Base62?
 * - Shorter strings (more compact than base10 or base16)
 * - URL-safe (no special chars like /, +, =)
 * - Easy to generate and decode
 * - Human-readable (vs UUIDs or hash)
 */

// ==================== 1. BASE62 ENCODING ====================
/**
 * BASE62 ENCODING: Converts numeric IDs to short, URL-safe strings
 * 
 * Characters: 0-9, A-Z, a-z (62 characters total)
 * Example: 123456789 -> "8M0kX" (5 characters)
 * 
 * Benefits:
 * - URL safe (no special characters)
 * - Shorter than Base64
 * - Case-sensitive for more combinations
 */

class Base62Encoder {
    static ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    static BASE = Base62Encoder.ALPHABET.length;
    
    static encode(id) {
        if (id === 0) return Base62Encoder.ALPHABET[0];
        
        let result = '';
        while (id > 0) {
            result = Base62Encoder.ALPHABET[id % Base62Encoder.BASE] + result;
            id = Math.floor(id / Base62Encoder.BASE);
        }
        return result;
    }
    
    static decode(shortUrl) {
        let id = 0;
        for (let char of shortUrl) {
            id = id * Base62Encoder.BASE + Base62Encoder.ALPHABET.indexOf(char);
        }
        return id;
    }
    
    // Generate 6-character short URL (62^6 = 56 billion combinations)
    static generateShortUrl(id) {
        let encoded = Base62Encoder.encode(id);
        // Pad with zeros to ensure 6 characters
        while (encoded.length < 6) {
            encoded = '0' + encoded;
        }
        return encoded;
    }
}

// ==================== 2. DATABASE DESIGN ====================
/**
 * DATABASE CHOICE: PostgreSQL vs NoSQL for High Availability
 * 
 * PostgreSQL (ACID Focus):
 * - ACID transactions for data integrity
 * - Handles high write throughput
 * - Good for analytics and reporting
 * - Complex queries and joins
 * - CONS: Single point of failure, harder to scale horizontally
 * 
 * NoSQL (High Availability Focus):
 * - DynamoDB (Amazon): Auto-scaling, multi-region, 99.999% availability
 * - Cassandra: Linear scalability, fault tolerance
 * - MongoDB: Document-based, horizontal scaling
 * - PROS: Built-in replication, automatic failover, global distribution
 * 
 * For URL Shortener: NoSQL is often better for high availability
 */

class URLDatabase {
    constructor() {
        this.database = new Map();
        this.idGenerator = 1;
    }
    
    createShortUrl(originalUrl, userId) {
        const id = this.idGenerator++;
        const shortUrl = Base62Encoder.generateShortUrl(id);
        
        const record = {
            id: id,
            originalUrl: originalUrl,
            shortUrl: shortUrl,
            createdAt: Date.now(),
            expiresAt: Date.now() + (365 * 24 * 60 * 60 * 1000), // 1 year
            clickCount: 0,
            userId: userId
        };
        
        this.database.set(shortUrl, record);
        return shortUrl;
    }
    
    getOriginalUrl(shortUrl) {
        const record = this.database.get(shortUrl);
        if (!record || Date.now() > record.expiresAt) {
            return null;
        }
        record.clickCount++;
        return record.originalUrl;
    }
    
    getRecord(shortUrl) {
        return this.database.get(shortUrl);
    }
}

// ==================== 2.1. NOSQL DATABASE IMPLEMENTATION ====================
/**
 * NOSQL APPROACH: DynamoDB for High Availability
 * 
 * Benefits:
 * - 99.999% availability SLA
 * - Multi-region replication
 * - Auto-scaling
 * - Built-in backup and recovery
 * - No single point of failure
 */

class DynamoDBURLDatabase {
    constructor() {
        this.tables = new Map();
    }
    
    /**
     * DynamoDB Table Schema:
     * 
     * Table: urls
     * Primary Key: short_url (String)
     * Attributes:
     * - original_url (String)
     * - user_id (String)
     * - created_at (Number)
     * - expires_at (Number)
     * - click_count (Number)
     * 
     * Global Secondary Index:
     * - user_id-index: user_id as partition key
     */
    
    createShortUrl(originalUrl, userId) {
        const id = Date.now(); // Use timestamp for unique ID
        const shortUrl = Base62Encoder.generateShortUrl(id);
        
        const item = {
            short_url: shortUrl,
            original_url: originalUrl,
            user_id: userId,
            created_at: Date.now(),
            expires_at: Date.now() + (365 * 24 * 60 * 60 * 1000),
            click_count: 0
        };
        
        // Simulate DynamoDB put operation
        if (!this.tables.has('urls')) {
            this.tables.set('urls', new Map());
        }
        this.tables.get('urls').set(shortUrl, item);
        
        return shortUrl;
    }
    
    getOriginalUrl(shortUrl) {
        const item = this.tables.get('urls')?.get(shortUrl);
        if (!item || Date.now() > item.expires_at) {
            return null;
        }
        
        // Increment click count atomically
        item.click_count++;
        
        return item.original_url;
    }
    
    getUrlsByUser(userId) {
        // Simulate GSI query
        const urls = this.tables.get('urls');
        if (!urls) return [];
        
        return Array.from(urls.values()).filter(item => item.user_id === userId);
    }
    
    /**
     * DynamoDB High Availability Features:
     * 
     * 1. Multi-Region Replication:
     *    - Global Tables for cross-region replication
     *    - Automatic failover between regions
     *    - < 1 second replication lag
     * 
     * 2. Auto-Scaling:
     *    - Automatically scales read/write capacity
     *    - Handles traffic spikes without manual intervention
     *    - Cost optimization during low traffic
     * 
     * 3. Built-in Backup:
     *    - Point-in-time recovery
     *    - On-demand backups
     *    - Cross-region backup replication
     * 
     * 4. Consistency Models:
     *    - Strong consistency for critical reads
     *    - Eventually consistent for better performance
     *    - Configurable per request
     */
}

// ==================== 2.2. CASSANDRA IMPLEMENTATION ====================
/**
 * CASSANDRA APPROACH: For Extreme Scalability
 * 
 * Benefits:
 * - Linear scalability
 * - Multi-datacenter support
 * - No single point of failure
 * - Tunable consistency
 */

class CassandraURLDatabase {
    constructor() {
        this.urlsTable = new Map();
        this.userUrlsTable = new Map();
    }
    
    /**
     * Cassandra Table Schema:
     * 
     * CREATE TABLE urls (
     *     short_url text PRIMARY KEY,
     *     original_url text,
     *     user_id text,
     *     created_at timestamp,
     *     expires_at timestamp,
     *     click_count counter
     * );
     * 
     * CREATE TABLE user_urls (
     *     user_id text,
     *     created_at timestamp,
     *     short_url text,
     *     original_url text,
     *     PRIMARY KEY (user_id, created_at)
     * ) WITH CLUSTERING ORDER BY (created_at DESC);
     */
    
    createShortUrl(originalUrl, userId) {
        const id = Date.now();
        const shortUrl = Base62Encoder.generateShortUrl(id);
        const createdAt = Date.now();
        
        // Insert into urls table
        const urlRecord = {
            short_url: shortUrl,
            original_url: originalUrl,
            user_id: userId,
            created_at: createdAt,
            expires_at: createdAt + (365 * 24 * 60 * 60 * 1000),
            click_count: 0
        };
        
        this.urlsTable.set(shortUrl, urlRecord);
        
        // Insert into user_urls table for user queries
        const userUrlRecord = {
            user_id: userId,
            created_at: createdAt,
            short_url: shortUrl,
            original_url: originalUrl
        };
        
        if (!this.userUrlsTable.has(userId)) {
            this.userUrlsTable.set(userId, []);
        }
        this.userUrlsTable.get(userId).push(userUrlRecord);
        
        return shortUrl;
    }
    
    getOriginalUrl(shortUrl) {
        const record = this.urlsTable.get(shortUrl);
        if (!record || Date.now() > record.expires_at) {
            return null;
        }
        
        // Increment counter (Cassandra counter column)
        record.click_count++;
        
        return record.original_url;
    }
    
    getUrlsByUser(userId) {
        return this.userUrlsTable.get(userId) || [];
    }
    
    /**
     * Cassandra High Availability Features:
     * 
     * 1. Multi-Datacenter:
     *    - Replication across multiple datacenters
     *    - Local reads for better performance
     *    - Automatic failover
     * 
     * 2. Tunable Consistency:
     *    - ONE: Fast reads/writes
     *    - QUORUM: Balanced consistency/performance
     *    - ALL: Strong consistency
     * 
     * 3. Linear Scalability:
     *    - Add nodes to increase capacity
     *    - No performance degradation
     *    - Automatic data distribution
     */
}

// ==================== 3. CACHING STRATEGY ====================
/**
 * CACHING STRATEGY: Multi-level caching with eviction
 * 
 * L1 Cache (In-Memory): Hot URLs
 * L2 Cache (Redis): Frequently accessed URLs
 * Database: All URLs with persistence
 * 
 * Eviction Policies:
 * - LRU (Least Recently Used)
 * - TTL (Time To Live)
 * - LFU (Least Frequently Used)
 */

class URLCache {
    constructor() {
        this.l1Cache = new Map();
        this.accessTimes = new Map();
        this.MAX_CACHE_SIZE = 10000;
        this.CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
    }
    
    get(shortUrl) {
        // Check L1 cache first
        const originalUrl = this.l1Cache.get(shortUrl);
        if (originalUrl) {
            this.accessTimes.set(shortUrl, Date.now());
            return originalUrl;
        }
        return null;
    }
    
    put(shortUrl, originalUrl) {
        // Implement LRU eviction if cache is full
        if (this.l1Cache.size >= this.MAX_CACHE_SIZE) {
            this.evictLRU();
        }
        
        this.l1Cache.set(shortUrl, originalUrl);
        this.accessTimes.set(shortUrl, Date.now());
    }
    
    evictLRU() {
        let oldestKey = null;
        let oldestTime = Infinity;
        
        for (const [key, time] of this.accessTimes) {
            if (time < oldestTime) {
                oldestTime = time;
                oldestKey = key;
            }
        }
        
        if (oldestKey) {
            this.l1Cache.delete(oldestKey);
            this.accessTimes.delete(oldestKey);
        }
    }
    
    evictExpired() {
        const currentTime = Date.now();
        for (const [key, time] of this.accessTimes) {
            if (currentTime - time > this.CACHE_TTL) {
                this.l1Cache.delete(key);
                this.accessTimes.delete(key);
            }
        }
    }
}

// ==================== 4. RATE LIMITING ====================
/**
 * RATE LIMITING: Prevents abuse and ensures fair usage
 * 
 * Implementation: Token bucket algorithm
 * - Each user gets tokens per time window
 * - Tokens are consumed for each request
 * - Tokens are refilled over time
 */

class RateLimiter {
    constructor(maxTokens) {
        this.maxTokens = maxTokens;
        this.buckets = new Map();
    }
    
    allowRequest(userId) {
        if (!this.buckets.has(userId)) {
            this.buckets.set(userId, new TokenBucket(this.maxTokens));
        }
        return this.buckets.get(userId).tryConsume();
    }
}

class TokenBucket {
    constructor(maxTokens) {
        this.maxTokens = maxTokens;
        this.tokens = maxTokens;
        this.lastRefillTime = Date.now();
    }
    
    tryConsume() {
        this.refill();
        if (this.tokens > 0) {
            this.tokens--;
            return true;
        }
        return false;
    }
    
    refill() {
        const now = Date.now();
        const timePassed = now - this.lastRefillTime;
        const tokensToAdd = Math.floor(timePassed / 60000); // 1 token per minute
        
        if (tokensToAdd > 0) {
            this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
            this.lastRefillTime = now;
        }
    }
}

// ==================== 5. URL SHORTENER SERVICE ====================
/**
 * MAIN SERVICE: Orchestrates all components
 * 
 * Features:
 * - URL validation and sanitization
 * - Rate limiting
 * - Analytics tracking
 * - Custom short URLs
 * - Bulk URL shortening
 */

class URLShortenerService {
    constructor() {
        this.database = new URLDatabase();
        this.cache = new URLCache();
        this.rateLimiter = new RateLimiter(100); // 100 requests per minute
    }
    
    shortenUrl(originalUrl, userId) {
        // Rate limiting
        if (!this.rateLimiter.allowRequest(userId)) {
            throw new Error('Rate limit exceeded');
        }
        
        // Validate URL
        if (!this.isValidUrl(originalUrl)) {
            throw new Error('Invalid URL');
        }
        
        // Check cache first
        const existingShortUrl = this.findExistingShortUrl(originalUrl, userId);
        if (existingShortUrl) {
            return existingShortUrl;
        }
        
        // Create new short URL
        const shortUrl = this.database.createShortUrl(originalUrl, userId);
        
        // Cache the result
        this.cache.put(shortUrl, originalUrl);
        
        return shortUrl;
    }
    
    getOriginalUrl(shortUrl) {
        // Check L1 cache first
        let originalUrl = this.cache.get(shortUrl);
        if (originalUrl) {
            return originalUrl;
        }
        
        // Check database
        originalUrl = this.database.getOriginalUrl(shortUrl);
        if (originalUrl) {
            // Cache for future requests
            this.cache.put(shortUrl, originalUrl);
        }
        
        return originalUrl;
    }
    
    getAnalytics(shortUrl) {
        return this.database.getRecord(shortUrl);
    }
    
    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    findExistingShortUrl(originalUrl, userId) {
        // In real implementation, would query database for existing URLs
        // For simplicity, returning null here
        return null;
    }
}

// ==================== 6. SCALABILITY CONSIDERATIONS ====================
/**
 * SCALABILITY FEATURES:
 * 
 * 1. Horizontal Scaling:
 *    - Stateless services
 *    - Load balancer distribution
 *    - Database sharding by user ID
 * 
 * 2. Performance:
 *    - CDN for static assets
 *    - Database read replicas
 *    - Redis cluster for caching
 * 
 * 3. High Availability:
 *    - Multi-region deployment
 *    - Database failover
 *    - Circuit breakers
 */

class ScalabilityFeatures {
    
    /**
     * Database Sharding Strategy
     */
    static getShardKey(userId) {
        // Simple hash-based sharding
        return Math.abs(userId.hashCode() % 10).toString();
    }
    
    /**
     * Load Balancer Health Check
     */
    static healthCheck() {
        // Check database connectivity
        // Check cache connectivity
        // Check external dependencies
        return true;
    }
    
    /**
     * Circuit Breaker for External Services
     */
    static CircuitBreaker = class {
        constructor() {
            this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
            this.failureCount = 0;
            this.threshold = 5;
            this.lastFailureTime = 0;
            this.timeout = 60000; // 1 minute
        }
        
        allowRequest() {
            switch (this.state) {
                case 'CLOSED':
                    return true;
                case 'OPEN':
                    if (Date.now() - this.lastFailureTime > this.timeout) {
                        this.state = 'HALF_OPEN';
                        return true;
                    }
                    return false;
                case 'HALF_OPEN':
                    return true;
                default:
                    return false;
            }
        }
        
        recordSuccess() {
            this.failureCount = 0;
            this.state = 'CLOSED';
        }
        
        recordFailure() {
            this.failureCount++;
            this.lastFailureTime = Date.now();
            if (this.failureCount >= this.threshold) {
                this.state = 'OPEN';
            }
        }
    }
}

// ==================== 7. SYSTEM DESIGN CONSIDERATIONS ====================
/**
 * INTERVIEW TALKING POINTS:
 * 
 * 1. Capacity Planning:
 *    - 100M URLs per day = ~1,200 URLs/second
 *    - Read:Write ratio = 100:1 (10B reads/day)
 *    - Storage: ~500 bytes per URL = 50GB/year
 * 
 * 2. Database Schema:
 *    - URLs table: id, original_url, short_url, user_id, created_at, expires_at
 *    - Analytics table: short_url, click_count, last_clicked, geo_data
 * 
 * 3. Caching Strategy:
 *    - L1: In-memory cache (10K entries)
 *    - L2: Redis cluster (1M entries)
 *    - CDN: For static assets and popular URLs
 * 
 * 4. High Availability:
 *    - Multi-region deployment
 *    - Database replication
 *    - Load balancer with health checks
 *    - Circuit breakers for external services
 */

// ==================== MAIN FUNCTION WITH EXAMPLES ====================
async function runURLShortenerExamples() {
    console.log('=== URL Shortener System Design ===\n');
    
    // Initialize service
    const service = new URLShortenerService();
    
    // Test Base62 encoding
    console.log('1. BASE62 ENCODING TEST:');
    const testId = 123456789;
    const encoded = Base62Encoder.generateShortUrl(testId);
    const decoded = Base62Encoder.decode(encoded);
    console.log(`ID: ${testId} -> Encoded: ${encoded} -> Decoded: ${decoded}`);
    console.log();
    
    // Test URL shortening
    console.log('2. URL SHORTENING TEST:');
    const originalUrl = 'https://www.amazon.com/dp/B08N5WRWNW';
    const userId = 'user123';
    
    try {
        const shortUrl = service.shortenUrl(originalUrl, userId);
        console.log(`Original: ${originalUrl}`);
        console.log(`Short: ${shortUrl}`);
        console.log();
        
        // Test URL retrieval
        console.log('3. URL RETRIEVAL TEST:');
        const retrievedUrl = service.getOriginalUrl(shortUrl);
        console.log(`Short: ${shortUrl} -> Retrieved: ${retrievedUrl}`);
        console.log();
        
        // Test analytics
        console.log('4. ANALYTICS TEST:');
        const analytics = service.getAnalytics(shortUrl);
        console.log(`Clicks: ${analytics.clickCount}`);
        console.log(`Created: ${new Date(analytics.createdAt)}`);
        console.log();
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
    
    // Test rate limiting
    console.log('5. RATE LIMITING TEST:');
    const limiter = new RateLimiter(5);
    for (let i = 0; i < 7; i++) {
        const allowed = limiter.allowRequest('user123');
        console.log(`Request ${i+1}: ${allowed ? 'ALLOWED' : 'BLOCKED'}`);
    }
    console.log();
    
    // Test caching
    console.log('6. CACHING TEST:');
    const cache = new URLCache();
    cache.put('abc123', 'https://example.com');
    console.log(`Cached URL: ${cache.get('abc123')}`);
    console.log(`Non-cached URL: ${cache.get('xyz789')}`);
    console.log();
    
    console.log('=== KEY FEATURES ===');
    console.log('✓ Base62 encoding for short URLs');
    console.log('✓ PostgreSQL + Redis architecture');
    console.log('✓ Multi-level caching with LRU eviction');
    console.log('✓ Rate limiting with token bucket');
    console.log('✓ Horizontal scaling support');
    console.log('✓ High availability design');
    console.log('✓ Circuit breaker pattern');
    console.log('✓ Database sharding strategy');
}

// Run examples if this file is executed directly
if (require.main === module) {
    runURLShortenerExamples();
}

module.exports = {
    Base62Encoder,
    URLDatabase,
    URLCache,
    RateLimiter,
    URLShortenerService,
    ScalabilityFeatures,
    runURLShortenerExamples
}; 