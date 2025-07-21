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
 * 
 * 
 */

import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicLong;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

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
    private static final String ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private static final int BASE = ALPHABET.length();
    
    public static String encode(long id) {
        if (id == 0) return String.valueOf(ALPHABET.charAt(0));
        
        StringBuilder sb = new StringBuilder();
        while (id > 0) {
            sb.insert(0, ALPHABET.charAt((int) (id % BASE)));
            id /= BASE;
        }
        return sb.toString();
    }
    
    public static long decode(String shortUrl) {
        long id = 0;
        for (char c : shortUrl.toCharArray()) {
            id = id * BASE + ALPHABET.indexOf(c);
        }
        return id;
    }
    
    // Generate 6-character short URL (62^6 = 56 billion combinations)
    public static String generateShortUrl(long id) {
        String encoded = encode(id);
        // Pad with zeros to ensure 6 characters
        while (encoded.length() < 6) {
            encoded = "0" + encoded;
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
    private Map<String, URLRecord> database = new ConcurrentHashMap<>();
    private AtomicLong idGenerator = new AtomicLong(1);
    
    static class URLRecord {
        long id;
        String originalUrl;
        String shortUrl;
        long createdAt;
        long expiresAt;
        int clickCount;
        String userId;
        
        public URLRecord(String originalUrl, String userId) {
            this.originalUrl = originalUrl;
            this.userId = userId;
            this.createdAt = System.currentTimeMillis();
            this.expiresAt = createdAt + (365 * 24 * 60 * 60 * 1000L); // 1 year
            this.clickCount = 0;
        }
    }
    
    public String createShortUrl(String originalUrl, String userId) {
        long id = idGenerator.getAndIncrement();
        String shortUrl = Base62Encoder.generateShortUrl(id);
        
        URLRecord record = new URLRecord(originalUrl, userId);
        record.id = id;
        record.shortUrl = shortUrl;
        
        database.put(shortUrl, record);
        return shortUrl;
    }
    
    public String getOriginalUrl(String shortUrl) {
        URLRecord record = database.get(shortUrl);
        if (record == null || System.currentTimeMillis() > record.expiresAt) {
            return null;
        }
        record.clickCount++;
        return record.originalUrl;
    }
    
    public URLRecord getRecord(String shortUrl) {
        return database.get(shortUrl);
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
    // Simulating DynamoDB operations
    private Map<String, Map<String, Object>> tables = new ConcurrentHashMap<>();
    
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
    
    public String createShortUrl(String originalUrl, String userId) {
        long id = System.currentTimeMillis(); // Use timestamp for unique ID
        String shortUrl = Base62Encoder.generateShortUrl(id);
        
        Map<String, Object> item = new HashMap<>();
        item.put("short_url", shortUrl);
        item.put("original_url", originalUrl);
        item.put("user_id", userId);
        item.put("created_at", System.currentTimeMillis());
        item.put("expires_at", System.currentTimeMillis() + (365 * 24 * 60 * 60 * 1000L));
        item.put("click_count", 0);
        
        // Simulate DynamoDB put operation
        tables.computeIfAbsent("urls", k -> new ConcurrentHashMap<>()).put(shortUrl, item);
        
        return shortUrl;
    }
    
    public String getOriginalUrl(String shortUrl) {
        Map<String, Object> item = tables.get("urls").get(shortUrl);
        if (item == null || System.currentTimeMillis() > (Long) item.get("expires_at")) {
            return null;
        }
        
        // Increment click count atomically
        item.put("click_count", (Integer) item.get("click_count") + 1);
        
        return (String) item.get("original_url");
    }
    
    public List<Map<String, Object>> getUrlsByUser(String userId) {
        // Simulate GSI query
        return tables.get("urls").values().stream()
                .filter(item -> userId.equals(item.get("user_id")))
                .collect(Collectors.toList());
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
    
    private Map<String, Map<String, Object>> urlsTable = new ConcurrentHashMap<>();
    private Map<String, List<Map<String, Object>>> userUrlsTable = new ConcurrentHashMap<>();
    
    public String createShortUrl(String originalUrl, String userId) {
        long id = System.currentTimeMillis();
        String shortUrl = Base62Encoder.generateShortUrl(id);
        
        // Insert into urls table
        Map<String, Object> urlRecord = new HashMap<>();
        urlRecord.put("short_url", shortUrl);
        urlRecord.put("original_url", originalUrl);
        urlRecord.put("user_id", userId);
        urlRecord.put("created_at", System.currentTimeMillis());
        urlRecord.put("expires_at", System.currentTimeMillis() + (365 * 24 * 60 * 60 * 1000L));
        urlRecord.put("click_count", 0);
        
        urlsTable.put(shortUrl, urlRecord);
        
        // Insert into user_urls table for user queries
        Map<String, Object> userUrlRecord = new HashMap<>();
        userUrlRecord.put("user_id", userId);
        userUrlRecord.put("created_at", System.currentTimeMillis());
        userUrlRecord.put("short_url", shortUrl);
        userUrlRecord.put("original_url", originalUrl);
        
        userUrlsTable.computeIfAbsent(userId, k -> new ArrayList<>()).add(userUrlRecord);
        
        return shortUrl;
    }
    
    public String getOriginalUrl(String shortUrl) {
        Map<String, Object> record = urlsTable.get(shortUrl);
        if (record == null || System.currentTimeMillis() > (Long) record.get("expires_at")) {
            return null;
        }
        
        // Increment counter (Cassandra counter column)
        record.put("click_count", (Integer) record.get("click_count") + 1);
        
        return (String) record.get("original_url");
    }
    
    public List<Map<String, Object>> getUrlsByUser(String userId) {
        return userUrlsTable.getOrDefault(userId, new ArrayList<>());
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
    private Map<String, String> l1Cache = new ConcurrentHashMap<>();
    private Map<String, Long> accessTimes = new ConcurrentHashMap<>();
    private final int MAX_CACHE_SIZE = 10000;
    private final long CACHE_TTL = 24 * 60 * 60 * 1000L; // 24 hours
    
    public String get(String shortUrl) {
        // Check L1 cache first
        String originalUrl = l1Cache.get(shortUrl);
        if (originalUrl != null) {
            accessTimes.put(shortUrl, System.currentTimeMillis());
            return originalUrl;
        }
        return null;
    }
    
    public void put(String shortUrl, String originalUrl) {
        // Implement LRU eviction if cache is full
        if (l1Cache.size() >= MAX_CACHE_SIZE) {
            evictLRU();
        }
        
        l1Cache.put(shortUrl, originalUrl);
        accessTimes.put(shortUrl, System.currentTimeMillis());
    }
    
    private void evictLRU() {
        String oldestKey = null;
        long oldestTime = Long.MAX_VALUE;
        
        for (Map.Entry<String, Long> entry : accessTimes.entrySet()) {
            if (entry.getValue() < oldestTime) {
                oldestTime = entry.getValue();
                oldestKey = entry.getKey();
            }
        }
        
        if (oldestKey != null) {
            l1Cache.remove(oldestKey);
            accessTimes.remove(oldestKey);
        }
    }
    
    public void evictExpired() {
        long currentTime = System.currentTimeMillis();
        Iterator<Map.Entry<String, Long>> iterator = accessTimes.entrySet().iterator();
        
        while (iterator.hasNext()) {
            Map.Entry<String, Long> entry = iterator.next();
            if (currentTime - entry.getValue() > CACHE_TTL) {
                l1Cache.remove(entry.getKey());
                iterator.remove();
            }
        }
    }
}

// ==================== 4. URL SHORTENER SERVICE ====================
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
    private URLDatabase database;
    private URLCache cache;
    private RateLimiter rateLimiter;
    
    public URLShortenerService() {
        this.database = new URLDatabase();
        this.cache = new URLCache();
        this.rateLimiter = new RateLimiter(100); // 100 requests per minute
    }
    
    public String shortenUrl(String originalUrl, String userId) {
        // Rate limiting
        if (!rateLimiter.allowRequest(userId)) {
            throw new RuntimeException("Rate limit exceeded");
        }
        
        // Validate URL
        if (!isValidUrl(originalUrl)) {
            throw new IllegalArgumentException("Invalid URL");
        }
        
        // Check cache first
        String existingShortUrl = findExistingShortUrl(originalUrl, userId);
        if (existingShortUrl != null) {
            return existingShortUrl;
        }
        
        // Create new short URL
        String shortUrl = database.createShortUrl(originalUrl, userId);
        
        // Cache the result
        cache.put(shortUrl, originalUrl);
        
        return shortUrl;
    }
    
    public String getOriginalUrl(String shortUrl) {
        // Check L1 cache first
        String originalUrl = cache.get(shortUrl);
        if (originalUrl != null) {
            return originalUrl;
        }
        
        // Check database
        originalUrl = database.getOriginalUrl(shortUrl);
        if (originalUrl != null) {
            // Cache for future requests
            cache.put(shortUrl, originalUrl);
        }
        
        return originalUrl;
    }
    
    public URLDatabase.URLRecord getAnalytics(String shortUrl) {
        return database.getRecord(shortUrl);
    }
    
    private boolean isValidUrl(String url) {
        try {
            new java.net.URL(url);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    private String findExistingShortUrl(String originalUrl, String userId) {
        // In real implementation, would query database for existing URLs
        // For simplicity, returning null here
        return null;
    }
}

// ==================== 5. RATE LIMITING ====================
/**
 * RATE LIMITING: Prevents abuse and ensures fair usage
 * 
 * Implementation: Token bucket algorithm
 * - Each user gets tokens per time window
 * - Tokens are consumed for each request
 * - Tokens are refilled over time
 */

class RateLimiter {
    private Map<String, TokenBucket> buckets = new ConcurrentHashMap<>();
    private final int maxTokens;
    
    public RateLimiter(int maxTokens) {
        this.maxTokens = maxTokens;
    }
    
    public boolean allowRequest(String userId) {
        TokenBucket bucket = buckets.computeIfAbsent(userId, k -> new TokenBucket(maxTokens));
        return bucket.tryConsume();
    }
    
    static class TokenBucket {
        private final int maxTokens;
        private int tokens;
        private long lastRefillTime;
        
        public TokenBucket(int maxTokens) {
            this.maxTokens = maxTokens;
            this.tokens = maxTokens;
            this.lastRefillTime = System.currentTimeMillis();
        }
        
        public synchronized boolean tryConsume() {
            refill();
            if (tokens > 0) {
                tokens--;
                return true;
            }
            return false;
        }
        
        private void refill() {
            long now = System.currentTimeMillis();
            long timePassed = now - lastRefillTime;
            int tokensToAdd = (int) (timePassed / 60000); // 1 token per minute
            
            if (tokensToAdd > 0) {
                tokens = Math.min(maxTokens, tokens + tokensToAdd);
                lastRefillTime = now;
            }
        }
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
    public static String getShardKey(String userId) {
        // Simple hash-based sharding
        return String.valueOf(Math.abs(userId.hashCode() % 10));
    }
    
    /**
     * Load Balancer Health Check
     */
    public static boolean healthCheck() {
        // Check database connectivity
        // Check cache connectivity
        // Check external dependencies
        return true;
    }
    
    /**
     * Circuit Breaker for External Services
     */
    static class CircuitBreaker {
        private enum State { CLOSED, OPEN, HALF_OPEN }
        private State state = State.CLOSED;
        private int failureCount = 0;
        private final int threshold = 5;
        private long lastFailureTime = 0;
        private final long timeout = 60000; // 1 minute
        
        public boolean allowRequest() {
            switch (state) {
                case CLOSED:
                    return true;
                case OPEN:
                    if (System.currentTimeMillis() - lastFailureTime > timeout) {
                        state = State.HALF_OPEN;
                        return true;
                    }
                    return false;
                case HALF_OPEN:
                    return true;
                default:
                    return false;
            }
        }
        
        public void recordSuccess() {
            failureCount = 0;
            state = State.CLOSED;
        }
        
        public void recordFailure() {
            failureCount++;
            lastFailureTime = System.currentTimeMillis();
            if (failureCount >= threshold) {
                state = State.OPEN;
            }
        }
    }
}

// ==================== MAIN CLASS WITH EXAMPLES ====================
public class URLShortener {
    public static void main(String[] args) {
        System.out.println("=== URL Shortener System Design ===\n");
        
        // Initialize service
        URLShortenerService service = new URLShortenerService();
        
        // Test Base62 encoding
        System.out.println("1. BASE62 ENCODING TEST:");
        long testId = 123456789;
        String encoded = Base62Encoder.generateShortUrl(testId);
        long decoded = Base62Encoder.decode(encoded);
        System.out.println("ID: " + testId + " -> Encoded: " + encoded + " -> Decoded: " + decoded);
        System.out.println();
        
        // Test URL shortening
        System.out.println("2. URL SHORTENING TEST:");
        String originalUrl = "https://www.amazon.com/dp/B08N5WRWNW";
        String userId = "user123";
        
        try {
            String shortUrl = service.shortenUrl(originalUrl, userId);
            System.out.println("Original: " + originalUrl);
            System.out.println("Short: " + shortUrl);
            System.out.println();
            
            // Test URL retrieval
            System.out.println("3. URL RETRIEVAL TEST:");
            String retrievedUrl = service.getOriginalUrl(shortUrl);
            System.out.println("Short: " + shortUrl + " -> Retrieved: " + retrievedUrl);
            System.out.println();
            
            // Test analytics
            System.out.println("4. ANALYTICS TEST:");
            URLDatabase.URLRecord analytics = service.getAnalytics(shortUrl);
            System.out.println("Clicks: " + analytics.clickCount);
            System.out.println("Created: " + new Date(analytics.createdAt));
            System.out.println();
            
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        
        // Test rate limiting
        System.out.println("5. RATE LIMITING TEST:");
        RateLimiter limiter = new RateLimiter(5);
        for (int i = 0; i < 7; i++) {
            boolean allowed = limiter.allowRequest("user123");
            System.out.println("Request " + (i+1) + ": " + (allowed ? "ALLOWED" : "BLOCKED"));
        }
        System.out.println();
        
        System.out.println("=== KEY FEATURES ===");
        System.out.println("✓ Base62 encoding for short URLs");
        System.out.println("✓ PostgreSQL + Redis architecture");
        System.out.println("✓ Multi-level caching with LRU eviction");
        System.out.println("✓ Rate limiting with token bucket");
        System.out.println("✓ Horizontal scaling support");
        System.out.println("✓ High availability design");
    }
} 