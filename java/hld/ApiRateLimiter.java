import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

/**
 * API RATE LIMITER - AMAZON INTERVIEW ESSENTIALS
 * 
 * 🎯 WHAT TO REMEMBER FOR INTERVIEWS:
 * 1. Token Bucket: Most popular, allows burst traffic
 * 2. Leaky Bucket: Smooths traffic, no burst allowed
 * 3. Fixed Window: Simple but has boundary issues
 * 4. Sliding Window: Most accurate but complex
 * 
 * 🔑 KEY CONCEPTS:
 * - Rate limiting prevents API abuse
 * - Different algorithms for different use cases
 * - In distributed systems, we use Redis to store the rate limiter state because it use in memory data structure.
 * - in single server or normal rate limiter no need to use database or redis only use in memory
 * - Handle edge cases (burst traffic, time zones)
 * 
 * 📊 ALGORITHM COMPARISON:
 * Token Bucket: ✅ Burst allowed, ✅ Simple, ✅ Memory efficient
 * Leaky Bucket: ❌ No burst, ✅ Smooth traffic, ✅ Memory efficient
 * Fixed Window: ✅ Simple, ❌ Boundary issues, ✅ Easy to implement
 * Sliding Window: ✅ Accurate, ❌ Complex, ❌ More memory
 */

public class ApiRateLimiter {
    
    // ==================== TOKEN BUCKET ALGORITHM ====================
    /**
     * TOKEN BUCKET - MOST POPULAR FOR INTERVIEWS
     * 
     * How it works:
     * 1. Bucket has capacity (max tokens)
     * 2. Tokens refill at fixed rate
     * 3. Request consumes 1 token
     * 4. If bucket empty, request rejected
     * 
     * Use cases: API rate limiting, burst traffic handling
     * Time: O(1), Space: O(1) per user
     */
    /*
    ✅ Token Bucket Behavior – Confirming Your Understanding
     “Bucket can have 10 requests per second”
    → ✅ That means:
    Max capacity = 10 tokens

    Refill rate = 1 token every 100 ms

    📌 Now, your statements:
    🧠 "Once you consume it, it will not refill 10 tokens at a time, but 1 token every 100 ms."

    ✅ Correct

    The refill is gradual, not instant.

    So after you use a token, the next one appears after 100ms, not all at once.

    🧠 "If you wait for 1 second, you will have 10 tokens."

    ✅ Correct

    Assuming you didn’t make any requests during that second.

    1 token is added every 100ms → 10 tokens in 1000ms = 1 second.

    🧠 "If you wait half a second, you will have only 5 tokens."

    ✅ Exactly right

    500ms = 5 tokens refilled (if any were consumed before).

    🧠 "After 1 second, if token count is already 10, it will not refill until you consume some."

    ✅ Perfectly accurate

    The bucket has a max capacity.

    If it’s already full (10 tokens), the refill logic does nothing—tokens are not overfilled.

    Only when you use tokens (i.e., make requests), the refill process will start filling again up to the limit.

    🎯 Quick Analogy:
    It’s like a phone battery that charges 10% every minute, but stops charging once it hits 100%. It only starts charging again when you use it.
    */

    static class TokenBucketRateLimiter {
        private final int capacity;
        private final double refillRate; // tokens per second
        private double tokens;
        private long lastRefillTime;
        
        public TokenBucketRateLimiter(int capacity, double refillRate) {
            this.capacity = capacity;
            this.refillRate = refillRate;
            this.tokens = capacity;
            this.lastRefillTime = System.currentTimeMillis();
        }
        
        public synchronized boolean allowRequest() {
            refillTokens();
            
            if (tokens >= 1) {
                tokens -= 1;
                return true;
            }
            return false;
        }
        
        private void refillTokens() {
            long now = System.currentTimeMillis();
            double timePassed = (now - lastRefillTime) / 1000.0;
            double tokensToAdd = timePassed * refillRate;
            
            tokens = Math.min(capacity, tokens + tokensToAdd);
            lastRefillTime = now;
        }
    }
    
    // ==================== LEAKY BUCKET ALGORITHM ====================
    /**
     * LEAKY BUCKET - SMOOTHS TRAFFIC
     * 
     * How it works:
     * 1. Bucket has fixed capacity
     * 2. Requests queue in bucket
     * 3. Bucket leaks at fixed rate
     * 4. If bucket full, request rejected
     * 
     * Use cases: Traffic shaping, smooth processing
     * Time: O(1), Space: O(n) where n is queue size
     */
    /*
    * "In Leaky Bucket, we will have a consistent output rate."
     ✅ Yes, 100% correct.
    The system "leaks" (processes) requests at a fixed rate, say 1
    request every 100ms, regardless of how many requests are waiting.

    * "If user sends 100 requests at a time, those will be put in a queue (if enough space), and processed in FIFO."
    ✅ Yes, absolutely right.
    Incoming requests are queued.
    The system processes them one by one in FIFO order.
    If the queue is full, new requests are dropped (or rejected).

    * What is the size of the queue? Who decides it?
    Answer:
    The queue size (bucket capacity) is a design decision made by you or your system architect.
    Common choices:
    Fixed size (e.g., 100 or 1000 requests max)
    Based on memory/latency tradeoffs
    Based on SLA requirements (e.g., how much delay can be tolerated)

    *Is this queue per user or shared among all users?
    Answer:
   ✅ Typically, the queue is per user / per API key / per client.
    Why?
    Because you want fairness:
    User A sending 100 requests shouldn't delay or block User B.
    Each user should have their own rate limit and queue.
    🔸 But you can have a shared/global queue, if:
    */

    static class LeakyBucketRateLimiter {
        private final int capacity;
        private final double leakRate; // requests per second
        private final Queue<Long> queue;
        private long lastLeakTime;
        
        public LeakyBucketRateLimiter(int capacity, double leakRate) {
            this.capacity = capacity;
            this.leakRate = leakRate;
            this.queue = new LinkedList<>();
            this.lastLeakTime = System.currentTimeMillis();
        }
        
        public synchronized boolean allowRequest() {
            leakRequests();
            
            if (queue.size() < capacity) {
                queue.offer(System.currentTimeMillis());
                return true;
            }
            return false;
        }
        
        private void leakRequests() {
            long now = System.currentTimeMillis();
            double timePassed = (now - lastLeakTime) / 1000.0;
            int requestsToLeak = (int) (timePassed * leakRate);
            
            for (int i = 0; i < requestsToLeak && !queue.isEmpty(); i++) {
                queue.poll();
            }
            
            lastLeakTime = now;
        }
    }
    
    // ==================== FIXED WINDOW ALGORITHM ====================
    /**
     * FIXED WINDOW - SIMPLE BUT HAS BOUNDARY ISSUES
     * 
     * How it works:
     * 1. Count requests in fixed time window
     * 2. Reset counter at window boundary
     * 3. Reject if limit exceeded
     * 
     * Problem: Burst at window boundaries
     * Use cases: Simple rate limiting, when accuracy not critical
     * Time: O(1), Space: O(1)
     */

    /*

                      Core Concepts of Fixed Window Counter

    💡 In Fixed Window Counter:

    You define a time window (e.g., 1 minute)

    You allow up to N requests in that window (e.g., N = 4)

    The counter resets only when the window ends (not gradually like Token Bucket)

    Your Example:
    Window size = 1 minute
    Limit = 4 requests per user per window
    First, user sends 2 requests
    Then, later (within same minute), sends 3 more
    ❓ What happens?
    First 2 requests: ✅ accepted
    Next 3 requests:
    First 2 (i.e., request #3 and #4): ✅ accepted
    Request #5: ❌ rejected (limit exceeded)
    So within one 1-minute window, only 4 are allowed total.

    🚫 No refill happens during the window. Refill happens only at the start of the next window.

    Edge Case: Fixed Window Weakness
    Suppose:

    1-minute window from 12:00:00 → 12:00:59

    User sends 4 requests at 12:00:58

    Then sends 4 more at 12:01:01

    All 8 requests are accepted because they fall into two different windows, even though they are only 3 seconds apart.

    This is why many systems prefer Sliding Window Log or Token Bucket for smoother control.
    */
    static class FixedWindowRateLimiter {
        private final int maxRequests;
        private final long windowSize; // milliseconds
        private int requestCount;
        private long windowStart;
        
        public FixedWindowRateLimiter(int maxRequests, long windowSize) {
            this.maxRequests = maxRequests;
            this.windowSize = windowSize;
            this.requestCount = 0;
            this.windowStart = System.currentTimeMillis();
        }
        
        public synchronized boolean allowRequest() {
            long now = System.currentTimeMillis();
            
            // Check if window has expired
            if (now - windowStart >= windowSize) {
                requestCount = 0;
                windowStart = now;
            }
            
            if (requestCount < maxRequests) {
                requestCount++;
                return true;
            }
            return false;
        }
    }
    
    // ==================== SLIDING WINDOW ALGORITHM ====================
    /**
     * SLIDING WINDOW - MOST ACCURATE
     * 
     * How it works:
     * 1. Track timestamps of requests
     * 2. Remove expired timestamps
     * 3. Count requests in current window
     * 
     * Use cases: High accuracy required, distributed systems
     * Time: O(n) where n is requests in window, Space: O(n)
     */
    /*
    In Sliding Window Log, we store timestamps (in ms) of each request in a queue or list. For every incoming request:
    * We remove old timestamps where now - timestamp >= windowSize (e.g., 1000 ms).
    * If the number of remaining timestamps < limit (e.g., 4), we allow the request and add current timestamp to log.
    Else, we reject the request.
    */
    static class SlidingWindowRateLimiter {
        private final int maxRequests;
        private final long windowSize; // milliseconds
        private final Queue<Long> requestTimestamps;
        
        public SlidingWindowRateLimiter(int maxRequests, long windowSize) {
            this.maxRequests = maxRequests;
            this.windowSize = windowSize;
            this.requestTimestamps = new LinkedList<>();
        }
        
        public synchronized boolean allowRequest() {
            long now = System.currentTimeMillis();
            
            // Remove expired timestamps
            while (!requestTimestamps.isEmpty() && 
                   now - requestTimestamps.peek() >= windowSize) {
                requestTimestamps.poll();
            }
            
            if (requestTimestamps.size() < maxRequests) {
                requestTimestamps.offer(now);
                return true;
            }
            return false;
        }
    }
    
    // ==================== DISTRIBUTED RATE LIMITER ====================
    /**
     * DISTRIBUTED RATE LIMITER - FOR MICROSERVICES
     * 
     * How it works:
     * 1. Use Redis/database for shared state
     * 2. Atomic operations for consistency
     * 3. Handle network failures gracefully
     * 
     * Use cases: Multiple servers, microservices
     */
    static class DistributedRateLimiter {
        private final int maxRequests;
        private final long windowSize;
        private final Map<String, AtomicInteger> userCounters;
        private final Map<String, Long> userWindowStart;
        
        public DistributedRateLimiter(int maxRequests, long windowSize) {
            this.maxRequests = maxRequests;
            this.windowSize = windowSize;
            this.userCounters = new ConcurrentHashMap<>();
            this.userWindowStart = new ConcurrentHashMap<>();
        }
        
        public boolean allowRequest(String userId) {
            long now = System.currentTimeMillis();
            
            // Get or create counter for user
            AtomicInteger counter = userCounters.computeIfAbsent(userId, k -> new AtomicInteger(0));
            Long windowStart = userWindowStart.computeIfAbsent(userId, k -> now);
            
            // Check if window has expired
            if (now - windowStart >= windowSize) {
                counter.set(0);
                userWindowStart.put(userId, now);
            }
            
            // Check if request allowed
            if (counter.get() < maxRequests) {
                counter.incrementAndGet();
                return true;
            }
            return false;
        }
    }
    
    // ==================== RATE LIMITER FACTORY ====================
    /**
     * FACTORY PATTERN - CHOOSE ALGORITHM BASED ON REQUIREMENTS
     */
    static class RateLimiterFactory {
        public static RateLimiter createRateLimiter(String type, int capacity, double rate) {
            switch (type.toLowerCase()) {
                case "token_bucket":
                    return new TokenBucketRateLimiter(capacity, rate);
                case "leaky_bucket":
                    return new LeakyBucketRateLimiter(capacity, rate);
                case "fixed_window":
                    return new FixedWindowRateLimiter(capacity, (long)(1000/rate));
                case "sliding_window":
                    return new SlidingWindowRateLimiter(capacity, (long)(1000/rate));
                default:
                    throw new IllegalArgumentException("Unknown rate limiter type: " + type);
            }
        }
    }
    
    // ==================== INTERFACE ====================
    interface RateLimiter {
        boolean allowRequest();
    }
    
    // ==================== TESTING ====================
    public static void main(String[] args) {
        System.out.println("🚀 API RATE LIMITER - AMAZON INTERVIEW DEMO\n");
        
        // Test Token Bucket
        System.out.println("=== TOKEN BUCKET RATE LIMITER ===");
        TokenBucketRateLimiter tokenBucket = new TokenBucketRateLimiter(5, 2.0); // 5 tokens, 2 per second
        testRateLimiter("Token Bucket", tokenBucket, 10);
        
        // Test Leaky Bucket
        System.out.println("\n=== LEAKY BUCKET RATE LIMITER ===");
        LeakyBucketRateLimiter leakyBucket = new LeakyBucketRateLimiter(5, 2.0); // 5 capacity, 2 per second
        testRateLimiter("Leaky Bucket", leakyBucket, 10);
        
        // Test Fixed Window
        System.out.println("\n=== FIXED WINDOW RATE LIMITER ===");
        FixedWindowRateLimiter fixedWindow = new FixedWindowRateLimiter(5, 1000); // 5 requests per second
        testRateLimiter("Fixed Window", fixedWindow, 10);
        
        // Test Sliding Window
        System.out.println("\n=== SLIDING WINDOW RATE LIMITER ===");
        SlidingWindowRateLimiter slidingWindow = new SlidingWindowRateLimiter(5, 1000); // 5 requests per second
        testRateLimiter("Sliding Window", slidingWindow, 10);
        
        // Test Distributed Rate Limiter
        System.out.println("\n=== DISTRIBUTED RATE LIMITER ===");
        DistributedRateLimiter distributed = new DistributedRateLimiter(3, 1000); // 3 requests per second
        testDistributedRateLimiter(distributed);
        
        // Performance comparison
        System.out.println("\n=== PERFORMANCE COMPARISON ===");
        performanceComparison();
        
        // Interview tips
        System.out.println("\n🎯 AMAZON INTERVIEW TIPS:");
        System.out.println("1. Start with Token Bucket - most popular");
        System.out.println("2. Mention distributed considerations (Redis)");
        System.out.println("3. Discuss trade-offs between algorithms");
        System.out.println("4. Consider edge cases (burst traffic, time zones)");
        System.out.println("5. Mention monitoring and alerting");
    }
    
    private static void testRateLimiter(String name, RateLimiter rateLimiter, int requests) {
        System.out.println("Testing " + name + " with " + requests + " requests:");
        
        for (int i = 0; i < requests; i++) {
            boolean allowed = rateLimiter.allowRequest();
            System.out.printf("Request %d: %s%n", i + 1, allowed ? "✅ ALLOWED" : "❌ REJECTED");
            
            if (i < requests - 1) {
                try {
                    Thread.sleep(200); // 200ms between requests
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
    }
    
    private static void testDistributedRateLimiter(DistributedRateLimiter rateLimiter) {
        String[] users = {"user1", "user2", "user1", "user3", "user1"};
        
        for (int i = 0; i < users.length; i++) {
            boolean allowed = rateLimiter.allowRequest(users[i]);
            System.out.printf("User %s, Request %d: %s%n", 
                users[i], i + 1, allowed ? "✅ ALLOWED" : "❌ REJECTED");
        }
    }
    
    private static void performanceComparison() {
        int iterations = 100000;
        
        // Token Bucket
        long start = System.currentTimeMillis();
        TokenBucketRateLimiter tokenBucket = new TokenBucketRateLimiter(100, 10.0);
        for (int i = 0; i < iterations; i++) {
            tokenBucket.allowRequest();
        }
        long tokenBucketTime = System.currentTimeMillis() - start;
        
        // Fixed Window
        start = System.currentTimeMillis();
        FixedWindowRateLimiter fixedWindow = new FixedWindowRateLimiter(100, 1000);
        for (int i = 0; i < iterations; i++) {
            fixedWindow.allowRequest();
        }
        long fixedWindowTime = System.currentTimeMillis() - start;
        
        System.out.printf("Token Bucket: %dms for %d requests%n", tokenBucketTime, iterations);
        System.out.printf("Fixed Window: %dms for %d requests%n", fixedWindowTime, iterations);
    }
} 