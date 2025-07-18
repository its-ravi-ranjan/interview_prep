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

import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

// ==================== 1. CAP THEOREM ====================
/**
 * CAP THEOREM: In a distributed system, you can only guarantee 2 out of 3:
 * 
 * C - Consistency: All nodes see the same data at the same time
 * A - Availability: Every request receives a response (no timeout)
 * P - Partition Tolerance: System continues despite network failures
 * 
 * Real-world example: Amazon's DynamoDB
 * - AP: Eventually consistent (better availability)
 */

class CAPTheoremExample {
    
    // CP System (Consistency + Partition Tolerance)
    class CPDatabase {
        private Map<String, String> data = new HashMap<>();
        private boolean isPartitioned = false;
        
        public synchronized String read(String key) {
            if (isPartitioned) {
                throw new RuntimeException("System unavailable during partition");
            }
            return data.get(key);
        }
        
        public synchronized void write(String key, String value) {
            if (isPartitioned) {
                throw new RuntimeException("System unavailable during partition");
            }
            data.put(key, value);
        }
        
        // Always consistent, but unavailable during partitions
    }
    
    // AP System (Availability + Partition Tolerance)
    class APDatabase {
        private Map<String, String> data = new HashMap<>();
        private boolean isPartitioned = false;
        
        public String read(String key) {
            // Always available, but might return stale data
            return data.getOrDefault(key, "default_value");
        }
        
        public void write(String key, String value) {
            // Always available, but might not be immediately consistent
            data.put(key, value);
            // In real system, would replicate asynchronously
        }
        
        // Always available, but eventually consistent
    }
    
    // CA System (Consistency + Availability) - Not partition tolerant
    class CADatabase {
        private Map<String, String> data = new HashMap<>();
        
        public synchronized String read(String key) {
            return data.get(key);
        }
        
        public synchronized void write(String key, String value) {
            data.put(key, value);
        }
        
        // Consistent and available, but fails during network partitions
    }
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
 * 
 * The choice between low latency and high throughput depends on your application needs:
 * Latency is the delay between a request and response. 
 * It’s critical for real-time apps like online gaming or stock trading,
 * where speed matters.
 * Throughput is the amount of data transferred per unit time. 
 * It’s vital for data-heavy tasks like file downloads, backups, or HD video streaming.
 * 
 * Example Scenarios:
 * Online Gaming: Prioritize low latency (low ping) for a smooth and responsive gaming experience. 
 * File Downloads: Focus on high throughput for faster download speeds. 
 * Video Streaming: A balance between latency and throughput is needed; while low latency is desirable for smooth playback, high throughput ensures you can stream at higher resolutions. 
 * Real-time stock trading: Low latency is critical for timely execution of trades. 
 * Database backups: High throughput is essential for completing backups quickly. 
 * Note: While some applications can benefit from both low latency and high throughput, it's often a trade-off. Optimizing for one often comes at the expense of the other. 
 */

class LatencyVsThroughputExample {
    
    // High Latency, Low Throughput (Bad)
    class BadSystem {
        public void processRequest() {
            try {
                Thread.sleep(1000); // 1 second latency
                // Process one request at a time
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
    
    // Low Latency, High Throughput (Good)
    class GoodSystem {
        private ExecutorService executor = Executors.newFixedThreadPool(10);
        private AtomicInteger requestCount = new AtomicInteger(0);
        
        public CompletableFuture<String> processRequestAsync() {
            return CompletableFuture.supplyAsync(() -> {
                try {
                    Thread.sleep(10); // 10ms latency
                    return "Processed request " + requestCount.incrementAndGet();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return "Error";
                }
            }, executor);
        }
        
        // Can handle 1000 requests/second with 10ms latency each
    }
    
    // Trade-off Example: Batch Processing
    class BatchProcessor {
        private List<String> batch = new ArrayList<>();
        private final int BATCH_SIZE = 100;
        
        public void addToBatch(String item) {
            batch.add(item);
            if (batch.size() >= BATCH_SIZE) {
                processBatch();
            }
        }
        
        private void processBatch() {
            // Higher latency (wait for batch), but higher throughput
            System.out.println("Processing batch of " + batch.size() + " items");
            batch.clear();
        }
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

class CachingExample {
    
    // Simple In-Memory Cache
    class SimpleCache<K, V> {
        private Map<K, V> cache = new ConcurrentHashMap<>();
        private Map<K, Long> timestamps = new ConcurrentHashMap<>();
        private final long TTL = 60000; // 1 minute TTL
        
        public V get(K key) {
            V value = cache.get(key);
            if (value != null && !isExpired(key)) {
                return value;
            }
            return null;
        }
        
        public void put(K key, V value) {
            cache.put(key, value);
            timestamps.put(key, System.currentTimeMillis());
        }
        
        private boolean isExpired(K key) {
            Long timestamp = timestamps.get(key);
            return timestamp == null || 
                   (System.currentTimeMillis() - timestamp) > TTL;
        }
    }
    
    // Cache-Aside Pattern
    class CacheAsidePattern {
        private SimpleCache<String, String> cache = new SimpleCache<>();
        private Map<String, String> database = new HashMap<>();
        
        public String getUser(String userId) {
            // 1. Check cache first
            String user = cache.get(userId);
            if (user != null) {
                System.out.println("Cache hit for user: " + userId);
                return user;
            }
            
            // 2. Cache miss - get from database
            System.out.println("Cache miss for user: " + userId);
            user = database.get(userId);
            if (user != null) {
                // 3. Store in cache for next time
                cache.put(userId, user);
            }
            
            return user;
        }
    }
    
    // Write-Through Cache
    class WriteThroughCache {
        private SimpleCache<String, String> cache = new SimpleCache<>();
        private Map<String, String> database = new HashMap<>();
        
        public void updateUser(String userId, String userData) {
            // 1. Update database
            database.put(userId, userData);
            
            // 2. Update cache immediately
            cache.put(userId, userData);
            
            System.out.println("Updated user in both DB and cache: " + userId);
        }
    }
    
    // Write-Behind Cache
    class WriteBehindCache {
        private SimpleCache<String, String> cache = new SimpleCache<>();
        private Map<String, String> database = new HashMap<>();
        private Queue<String> writeQueue = new ConcurrentLinkedQueue<>();
        
        public void updateUser(String userId, String userData) {
            // 1. Update cache immediately (fast)
            cache.put(userId, userData);
            
            // 2. Queue for database update (async)
            writeQueue.offer(userId + ":" + userData);
            
            System.out.println("Updated cache immediately, queued for DB: " + userId);
        }
        
        // Background thread to process queue
        public void processWriteQueue() {
            while (!writeQueue.isEmpty()) {
                String item = writeQueue.poll();
                if (item != null) {
                    String[] parts = item.split(":");
                    database.put(parts[0], parts[1]);
                    System.out.println("Processed DB write for: " + parts[0]);
                }
            }
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

// ==================== MAIN CLASS WITH EXAMPLES ====================
public class Theory {
    public static void main(String[] args) {
        System.out.println("=== HLD Theory Examples ===\n");
        
        // CAP Theorem Examples
        System.out.println("1. CAP THEOREM EXAMPLES:");
        CAPTheoremExample capExample = new CAPTheoremExample();
        
        // CP System
        CAPTheoremExample.CPDatabase cpDB = capExample.new CPDatabase();
        cpDB.write("user1", "data1");
        System.out.println("CP System: " + cpDB.read("user1"));
        
        // AP System
        CAPTheoremExample.APDatabase apDB = capExample.new APDatabase();
        apDB.write("user1", "data1");
        System.out.println("AP System: " + apDB.read("user1"));
        System.out.println();
        
        // Latency vs Throughput Examples
        System.out.println("2. LATENCY vs THROUGHPUT EXAMPLES:");
        LatencyVsThroughputExample ltExample = new LatencyVsThroughputExample();
        
        // Good System
        LatencyVsThroughputExample.GoodSystem goodSystem = ltExample.new GoodSystem();
        CompletableFuture<String> future1 = goodSystem.processRequestAsync();
        CompletableFuture<String> future2 = goodSystem.processRequestAsync();
        
        CompletableFuture.allOf(future1, future2).join();
        System.out.println("Async processing: " + future1.join() + ", " + future2.join());
        System.out.println();
        
        // Caching Examples
        System.out.println("3. CACHING EXAMPLES:");
        CachingExample cacheExample = new CachingExample();
        
        // Cache-Aside Pattern
        CachingExample.CacheAsidePattern cacheAside = cacheExample.new CacheAsidePattern();
        cacheAside.getUser("user1"); // Cache miss
        cacheAside.getUser("user1"); // Cache hit
        System.out.println();
        
        // Write-Through Cache
        CachingExample.WriteThroughCache writeThrough = cacheExample.new WriteThroughCache();
        writeThrough.updateUser("user1", "new data");
        System.out.println();
        
        // Write-Behind Cache
        CachingExample.WriteBehindCache writeBehind = cacheExample.new WriteBehindCache();
        writeBehind.updateUser("user1", "new data");
        writeBehind.processWriteQueue();
        System.out.println();
        
        System.out.println("=== KEY TAKEAWAYS ===");
        System.out.println("CAP: Choose 2 out of 3 based on business requirements");
        System.out.println("Latency vs Throughput: Often trade-offs, optimize based on use case");
        System.out.println("Caching: Multi-layer approach with appropriate invalidation strategy");
    }
} 