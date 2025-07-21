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
 * - Consider distributed systems (Redis, database)
 * - Handle edge cases (burst traffic, time zones)
 * 
 * 📊 ALGORITHM COMPARISON:
 * Token Bucket: ✅ Burst allowed, ✅ Simple, ✅ Memory efficient
 * Leaky Bucket: ❌ No burst, ✅ Smooth traffic, ✅ Memory efficient
 * Fixed Window: ✅ Simple, ❌ Boundary issues, ✅ Easy to implement
 * Sliding Window: ✅ Accurate, ❌ Complex, ❌ More memory
 */

class ApiRateLimiter {
    
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

    static TokenBucketRateLimiter = class {
        constructor(capacity, refillRate) {
            this.capacity = capacity;
            this.refillRate = refillRate; // tokens per second
            this.tokens = capacity;
            this.lastRefillTime = Date.now();
        }
        
        allowRequest() {
            this.refillTokens();
            
            if (this.tokens >= 1) {
                this.tokens -= 1;
                return true;
            }
            return false;
        }
        
        refillTokens() {
            const now = Date.now();
            const timePassed = (now - this.lastRefillTime) / 1000.0;
            const tokensToAdd = timePassed * this.refillRate;
            
            this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
            this.lastRefillTime = now;
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

    static LeakyBucketRateLimiter = class {
        constructor(capacity, leakRate) {
            this.capacity = capacity;
            this.leakRate = leakRate; // requests per second
            this.queue = [];
            this.lastLeakTime = Date.now();
        }
        
        allowRequest() {
            this.leakRequests();
            
            if (this.queue.length < this.capacity) {
                this.queue.push(Date.now());
                return true;
            }
            return false;
        }
        
        leakRequests() {
            const now = Date.now();
            const timePassed = (now - this.lastLeakTime) / 1000.0;
            const requestsToLeak = Math.floor(timePassed * this.leakRate);
            
            for (let i = 0; i < requestsToLeak && this.queue.length > 0; i++) {
                this.queue.shift();
            }
            
            this.lastLeakTime = now;
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
    static FixedWindowRateLimiter = class {
        constructor(maxRequests, windowSize) {
            this.maxRequests = maxRequests;
            this.windowSize = windowSize; // milliseconds
            this.requestCount = 0;
            this.windowStart = Date.now();
        }
        
        allowRequest() {
            const now = Date.now();
            
            // Check if window has expired
            if (now - this.windowStart >= this.windowSize) {
                this.requestCount = 0;
                this.windowStart = now;
            }
            
            if (this.requestCount < this.maxRequests) {
                this.requestCount++;
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
   
    static SlidingWindowRateLimiter = class {
        constructor(maxRequests, windowSize) {
            this.maxRequests = maxRequests;
            this.windowSize = windowSize; // milliseconds
            this.requestTimestamps = [];
        }
        
        allowRequest() {
            const now = Date.now();
            
            // Remove expired timestamps
            while (this.requestTimestamps.length > 0 && 
                   now - this.requestTimestamps[0] >= this.windowSize) {
                this.requestTimestamps.shift();
            }
            
            if (this.requestTimestamps.length < this.maxRequests) {
                this.requestTimestamps.push(now);
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
    static DistributedRateLimiter = class {
        constructor(maxRequests, windowSize) {
            this.maxRequests = maxRequests;
            this.windowSize = windowSize;
            this.userCounters = new Map();
            this.userWindowStart = new Map();
        }
        
        allowRequest(userId) {
            const now = Date.now();
            
            // Get or create counter for user
            if (!this.userCounters.has(userId)) {
                this.userCounters.set(userId, 0);
                this.userWindowStart.set(userId, now);
            }
            
            const counter = this.userCounters.get(userId);
            const windowStart = this.userWindowStart.get(userId);
            
            // Check if window has expired
            if (now - windowStart >= this.windowSize) {
                this.userCounters.set(userId, 0);
                this.userWindowStart.set(userId, now);
            }
            
            // Check if request allowed
            if (counter < this.maxRequests) {
                this.userCounters.set(userId, counter + 1);
                return true;
            }
            return false;
        }
    }
    
    // ==================== RATE LIMITER FACTORY ====================
    /**
     * FACTORY PATTERN - CHOOSE ALGORITHM BASED ON REQUIREMENTS
     */
    static RateLimiterFactory = {
        createRateLimiter(type, capacity, rate) {
            switch (type.toLowerCase()) {
                case 'token_bucket':
                    return new ApiRateLimiter.TokenBucketRateLimiter(capacity, rate);
                case 'leaky_bucket':
                    return new ApiRateLimiter.LeakyBucketRateLimiter(capacity, rate);
                case 'fixed_window':
                    return new ApiRateLimiter.FixedWindowRateLimiter(capacity, 1000/rate);
                case 'sliding_window':
                    return new ApiRateLimiter.SlidingWindowRateLimiter(capacity, 1000/rate);
                default:
                    throw new Error(`Unknown rate limiter type: ${type}`);
            }
        }
    }
    
    // ==================== REDIS-BASED RATE LIMITER ====================
    /**
     * REDIS-BASED RATE LIMITER - FOR DISTRIBUTED SYSTEMS
     * 
     * How it works:
     * 1. Use Redis for shared state across servers
     * 2. Atomic operations with Lua scripts
     * 3. Automatic expiration for cleanup
     * 
     * Use cases: Microservices, multiple servers
     */
    static RedisRateLimiter = class {
        constructor(redisClient, maxRequests, windowSize) {
            this.redis = redisClient;
            this.maxRequests = maxRequests;
            this.windowSize = windowSize;
        }
        
        async allowRequest(userId) {
            const key = `rate_limit:${userId}`;
            const now = Date.now();
            
            // Lua script for atomic operation
            const luaScript = `
                local key = KEYS[1]
                local now = tonumber(ARGV[1])
                local window = tonumber(ARGV[2])
                local limit = tonumber(ARGV[3])
                
                -- Remove expired entries
                redis.call('ZREMRANGEBYSCORE', key, 0, now - window)
                
                -- Count current requests
                local count = redis.call('ZCARD', key)
                
                if count < limit then
                    -- Add current request
                    redis.call('ZADD', key, now, now .. ':' .. math.random())
                    redis.call('EXPIRE', key, window / 1000)
                    return 1
                else
                    return 0
                end
            `;
            
            try {
                const result = await this.redis.eval(luaScript, 1, key, now, this.windowSize, this.maxRequests);
                return result === 1;
            } catch (error) {
                console.error('Redis rate limiter error:', error);
                return true; // Allow request on error (fail open)
            }
        }
    }
    
    // ==================== ADAPTIVE RATE LIMITER ====================
    /**
     * ADAPTIVE RATE LIMITER - DYNAMIC THROTTLING
     * 
     * How it works:
     * 1. Monitor system load and response times
     * 2. Adjust rate limits dynamically
     * 3. Implement circuit breaker pattern
     * 
     * Use cases: Auto-scaling systems, load balancing
     */
    static AdaptiveRateLimiter = class {
        constructor(baseLimit, minLimit, maxLimit) {
            this.baseLimit = baseLimit;
            this.minLimit = minLimit;
            this.maxLimit = maxLimit;
            this.currentLimit = baseLimit;
            this.responseTimes = [];
            this.errorRates = [];
        }
        
        allowRequest() {
            // Simple adaptive logic
            const avgResponseTime = this.getAverageResponseTime();
            const errorRate = this.getErrorRate();
            
            // Adjust limit based on performance
            if (avgResponseTime > 1000 || errorRate > 0.1) {
                this.currentLimit = Math.max(this.minLimit, this.currentLimit * 0.8);
            } else if (avgResponseTime < 100 && errorRate < 0.01) {
                this.currentLimit = Math.min(this.maxLimit, this.currentLimit * 1.1);
            }
            
            // Use token bucket with current limit
            return this.tokenBucket.allowRequest();
        }
        
        getAverageResponseTime() {
            if (this.responseTimes.length === 0) return 0;
            return this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length;
        }
        
        getErrorRate() {
            if (this.errorRates.length === 0) return 0;
            return this.errorRates.reduce((a, b) => a + b, 0) / this.errorRates.length;
        }
    }
}

// ==================== TESTING FUNCTIONS ====================
function testRateLimiter(name, rateLimiter, requests) {
    console.log(`Testing ${name} with ${requests} requests:`);
    
    for (let i = 0; i < requests; i++) {
        const allowed = rateLimiter.allowRequest();
        console.log(`Request ${i + 1}: ${allowed ? '✅ ALLOWED' : '❌ REJECTED'}`);
        
        if (i < requests - 1) {
            // Simulate delay
            const start = Date.now();
            while (Date.now() - start < 200) {} // 200ms delay
        }
    }
}

function testDistributedRateLimiter(rateLimiter) {
    const users = ['user1', 'user2', 'user1', 'user3', 'user1'];
    
    for (let i = 0; i < users.length; i++) {
        const allowed = rateLimiter.allowRequest(users[i]);
        console.log(`User ${users[i]}, Request ${i + 1}: ${allowed ? '✅ ALLOWED' : '❌ REJECTED'}`);
    }
}

function performanceComparison() {
    const iterations = 100000;
    
    // Token Bucket
    const start1 = Date.now();
    const tokenBucket = new ApiRateLimiter.TokenBucketRateLimiter(100, 10.0);
    for (let i = 0; i < iterations; i++) {
        tokenBucket.allowRequest();
    }
    const tokenBucketTime = Date.now() - start1;
    
    // Fixed Window
    const start2 = Date.now();
    const fixedWindow = new ApiRateLimiter.FixedWindowRateLimiter(100, 1000);
    for (let i = 0; i < iterations; i++) {
        fixedWindow.allowRequest();
    }
    const fixedWindowTime = Date.now() - start2;
    
    console.log(`Token Bucket: ${tokenBucketTime}ms for ${iterations} requests`);
    console.log(`Fixed Window: ${fixedWindowTime}ms for ${iterations} requests`);
}

// ==================== MAIN TEST FUNCTION ====================
function runTests() {
    console.log('🚀 API RATE LIMITER - AMAZON INTERVIEW DEMO\n');
    
    // Test Token Bucket
    console.log('=== TOKEN BUCKET RATE LIMITER ===');
    const tokenBucket = new ApiRateLimiter.TokenBucketRateLimiter(5, 2.0); // 5 tokens, 2 per second
    testRateLimiter('Token Bucket', tokenBucket, 10);
    
    // Test Leaky Bucket
    console.log('\n=== LEAKY BUCKET RATE LIMITER ===');
    const leakyBucket = new ApiRateLimiter.LeakyBucketRateLimiter(5, 2.0); // 5 capacity, 2 per second
    testRateLimiter('Leaky Bucket', leakyBucket, 10);
    
    // Test Fixed Window
    console.log('\n=== FIXED WINDOW RATE LIMITER ===');
    const fixedWindow = new ApiRateLimiter.FixedWindowRateLimiter(5, 1000); // 5 requests per second
    testRateLimiter('Fixed Window', fixedWindow, 10);
    
    // Test Sliding Window
    console.log('\n=== SLIDING WINDOW RATE LIMITER ===');
    const slidingWindow = new ApiRateLimiter.SlidingWindowRateLimiter(5, 1000); // 5 requests per second
    testRateLimiter('Sliding Window', slidingWindow, 10);
    
    // Test Distributed Rate Limiter
    console.log('\n=== DISTRIBUTED RATE LIMITER ===');
    const distributed = new ApiRateLimiter.DistributedRateLimiter(3, 1000); // 3 requests per second
    testDistributedRateLimiter(distributed);
    
    // Performance comparison
    console.log('\n=== PERFORMANCE COMPARISON ===');
    performanceComparison();
    
    // Interview tips
    console.log('\n🎯 AMAZON INTERVIEW TIPS:');
    console.log('1. Start with Token Bucket - most popular');
    console.log('2. Mention distributed considerations (Redis)');
    console.log('3. Discuss trade-offs between algorithms');
    console.log('4. Consider edge cases (burst traffic, time zones)');
    console.log('5. Mention monitoring and alerting');
    console.log('6. Discuss adaptive rate limiting');
    console.log('7. Consider circuit breaker patterns');
}

// ==================== EXPORT FOR USE ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ApiRateLimiter;
}

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runTests();
} 