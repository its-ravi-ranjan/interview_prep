/**
 * Caching with Eviction Strategies - Amazon Interview Focus
 * 
 * Key Eviction Strategies:
 * 1. LRU (Least Recently Used)
 * 2. LFU (Least Frequently Used) 
 * 3. TTL (Time To Live)
 * 4. Combined Strategies
 * 
 * Real-world Applications:
 * - Redis caching policies
 * - In-memory caches
 * - CDN edge caching
 * - Database query caching
 */

// ==================== 1. LRU (LEAST RECENTLY USED) ====================
/**
 * LRU EVICTION: Removes least recently accessed items first
 * 
 * Implementation: Map (maintains insertion order in modern JS)
 * - O(1) get and put operations
 * - Maintains access order
 * - Perfect for temporal locality patterns
 * 
 * Use Cases:
 * - Web page caching
 * - Database query results
 * - Session storage
 */

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    
    get(key) {
        if (!this.cache.has(key)) {
            return null;
        }
        
        // Move to end (most recently used)
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }
    
    put(key, value) {
        if (this.cache.has(key)) {
            // Update existing - remove and re-add to end
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // Evict least recently used (first key)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, value);
    }
    
    size() {
        return this.cache.size;
    }
    
    printCache() {
        const entries = Array.from(this.cache.entries());
        const cacheStr = entries.map(([key, value]) => `${key}:${value}`).join(' -> ');
        console.log(`LRU Cache [${cacheStr}]`);
    }
}

// ==================== 2. LFU (LEAST FREQUENTLY USED) ====================
/**
 * LFU EVICTION: Removes items with lowest access frequency
 * 
 * Implementation: Map + Map + Set
 * - O(log n) operations for frequency tracking
 * - Tracks access frequency
 * - Better for stable access patterns
 * 
 * Use Cases:
 * - Content recommendation systems
 * - API response caching
 * - Static asset caching
 */

class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // key -> value
        this.frequency = new Map(); // key -> frequency
        this.frequencyMap = new Map(); // frequency -> Set of keys
    }
    
    get(key) {
        if (!this.cache.has(key)) {
            return null;
        }
        
        // Increment frequency
        this.incrementFrequency(key);
        return this.cache.get(key);
    }
    
    put(key, value) {
        if (this.capacity === 0) return;
        
        if (this.cache.has(key)) {
            // Update existing
            this.cache.set(key, value);
            this.incrementFrequency(key);
        } else {
            // Add new item
            if (this.cache.size >= this.capacity) {
                this.evictLFU();
            }
            
            this.cache.set(key, value);
            this.frequency.set(key, 1);
            
            if (!this.frequencyMap.has(1)) {
                this.frequencyMap.set(1, new Set());
            }
            this.frequencyMap.get(1).add(key);
        }
    }
    
    incrementFrequency(key) {
        const currentFreq = this.frequency.get(key);
        const newFreq = currentFreq + 1;
        
        // Remove from current frequency
        this.frequencyMap.get(currentFreq).delete(key);
        if (this.frequencyMap.get(currentFreq).size === 0) {
            this.frequencyMap.delete(currentFreq);
        }
        
        // Add to new frequency
        this.frequency.set(key, newFreq);
        if (!this.frequencyMap.has(newFreq)) {
            this.frequencyMap.set(newFreq, new Set());
        }
        this.frequencyMap.get(newFreq).add(key);
    }
    
    evictLFU() {
        // Get the lowest frequency
        const lowestFreq = Math.min(...this.frequencyMap.keys());
        const keys = this.frequencyMap.get(lowestFreq);
        
        // Remove the first key (oldest in that frequency)
        const keyToEvict = keys.values().next().value;
        keys.delete(keyToEvict);
        
        if (keys.size === 0) {
            this.frequencyMap.delete(lowestFreq);
        }
        
        this.cache.delete(keyToEvict);
        this.frequency.delete(keyToEvict);
    }
    
    printCache() {
        console.log('LFU Cache:', Object.fromEntries(this.cache));
        console.log('Frequency Map:', Object.fromEntries(
            Array.from(this.frequencyMap.entries()).map(([freq, keys]) => 
                [freq, Array.from(keys)]
            )
        ));
    }
}

// ==================== 3. TTL (TIME TO LIVE) ====================
/**
 * TTL EVICTION: Automatically expires items after time duration
 * 
 * Implementation: Map + setTimeout/setInterval
 * - Automatic cleanup
 * - Time-based expiration
 * - Perfect for temporary data
 * 
 * Use Cases:
 * - Session tokens
 * - API rate limiting
 * - Temporary data storage
 * - Cache warming
 */

class TTLCache {
    constructor(defaultTTL = 1000) {
        this.cache = new Map();
        this.defaultTTL = defaultTTL;
        this.cleanupInterval = null;
        this.startCleanupTask();
    }
    
    get(key) {
        const entry = this.cache.get(key);
        if (!entry || entry.isExpired()) {
            this.cache.delete(key);
            return null;
        }
        return entry.value;
    }
    
    put(key, value, ttl = this.defaultTTL) {
        const expiryTime = Date.now() + ttl;
        this.cache.set(key, new CacheEntry(value, expiryTime));
    }
    
    startCleanupTask() {
        this.cleanupInterval = setInterval(() => {
            const now = Date.now();
            for (const [key, entry] of this.cache.entries()) {
                if (entry.isExpired(now)) {
                    this.cache.delete(key);
                }
            }
        }, 1000); // Cleanup every second
    }
    
    shutdown() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
    }
    
    printCache() {
        console.log('TTL Cache:');
        for (const [key, entry] of this.cache.entries()) {
            const timeLeft = entry.expiryTime - Date.now();
            console.log(`  ${key}: ${entry.value} (expires in ${timeLeft} ms)`);
        }
    }
}

class CacheEntry {
    constructor(value, expiryTime) {
        this.value = value;
        this.expiryTime = expiryTime;
    }
    
    isExpired(currentTime = Date.now()) {
        return currentTime > this.expiryTime;
    }
}

// ==================== 4. COMBINED CACHE (LRU + TTL) ====================
/**
 * COMBINED STRATEGY: LRU with TTL expiration
 * 
 * Benefits:
 * - Temporal locality (LRU)
 * - Automatic cleanup (TTL)
 * - Best of both worlds
 * 
 * Real-world: Redis maxmemory-policy with EXPIRE
 */

class CombinedCache {
    constructor(capacity) {
        this.lruCache = new LRUCache(capacity);
        this.cleanupInterval = null;
        this.startCleanupTask();
    }
    
    get(key) {
        const entry = this.lruCache.get(key);
        if (!entry || entry.isExpired()) {
            return null;
        }
        return entry.value;
    }
    
    put(key, value, ttl) {
        const expiryTime = Date.now() + ttl;
        this.lruCache.put(key, new CacheEntry(value, expiryTime));
    }
    
    startCleanupTask() {
        this.cleanupInterval = setInterval(() => {
            // Cleanup expired entries
            // In real implementation, would iterate and remove expired
        }, 1000);
    }
    
    shutdown() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
    }
}

// ==================== 5. REDIS-STYLE CACHE POLICIES ====================
/**
 * REDIS EVICTION POLICIES SIMULATION
 * 
 * Redis maxmemory-policy options:
 * - allkeys-lru: Remove any key using LRU
 * - volatile-lru: Remove expired keys using LRU
 * - allkeys-lfu: Remove any key using LFU
 * - volatile-lfu: Remove expired keys using LFU
 * - volatile-ttl: Remove expired keys with shortest TTL
 * - volatile-random: Remove random expired keys
 * - allkeys-random: Remove random keys
 * - noeviction: Return error when memory is full
 */

class RedisStyleCache {
    constructor(maxSize, evictionPolicy) {
        this.cache = new Map();
        this.maxSize = maxSize;
        this.evictionPolicy = evictionPolicy;
    }
    
    get(key) {
        const entry = this.cache.get(key);
        if (!entry || entry.isExpired()) {
            this.cache.delete(key);
            return null;
        }
        return entry.value;
    }
    
    put(key, value, ttl) {
        // Check if we need to evict
        if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
            this.evict();
        }
        
        const expiryTime = Date.now() + ttl;
        this.cache.set(key, new CacheEntry(value, expiryTime));
    }
    
    evict() {
        switch (this.evictionPolicy) {
            case 'allkeys-lru':
                this.evictLRU();
                break;
            case 'volatile-lru':
                this.evictExpiredLRU();
                break;
            case 'volatile-ttl':
                this.evictShortestTTL();
                break;
            case 'volatile-random':
                this.evictRandomExpired();
                break;
            default:
                throw new Error('Memory limit exceeded');
        }
    }
    
    evictLRU() {
        // Remove oldest entry (first key in Map)
        const oldestKey = this.cache.keys().next().value;
        this.cache.delete(oldestKey);
    }
    
    evictExpiredLRU() {
        // Find and remove oldest expired key
        for (const [key, entry] of this.cache.entries()) {
            if (entry.isExpired()) {
                this.cache.delete(key);
                return;
            }
        }
        // If no expired keys, remove oldest
        this.evictLRU();
    }
    
    evictShortestTTL() {
        let shortestTTLKey = null;
        let shortestTTL = Infinity;
        
        for (const [key, entry] of this.cache.entries()) {
            if (entry.isExpired()) {
                const ttl = entry.expiryTime - Date.now();
                if (ttl < shortestTTL) {
                    shortestTTL = ttl;
                    shortestTTLKey = key;
                }
            }
        }
        
        if (shortestTTLKey) {
            this.cache.delete(shortestTTLKey);
        } else {
            this.evictLRU();
        }
    }
    
    evictRandomExpired() {
        const expiredKeys = [];
        for (const [key, entry] of this.cache.entries()) {
            if (entry.isExpired()) {
                expiredKeys.push(key);
            }
        }
        
        if (expiredKeys.length > 0) {
            const randomKey = expiredKeys[Math.floor(Math.random() * expiredKeys.length)];
            this.cache.delete(randomKey);
        } else {
            this.evictLRU();
        }
    }
}

// ==================== 6. PRACTICAL EXAMPLES ====================
/**
 * REAL-WORLD CACHING SCENARIOS
 */

class WebPageCache {
    constructor() {
        this.cache = new LRUCache(100); // Cache 100 pages
    }
    
    getPage(url) {
        let content = this.cache.get(url);
        if (!content) {
            // Simulate fetching from database/CDN
            content = this.fetchFromDatabase(url);
            this.cache.put(url, content);
        }
        return content;
    }
    
    fetchFromDatabase(url) {
        // Simulate database fetch
        return `Content for ${url}`;
    }
}

class SessionCache {
    constructor() {
        this.cache = new TTLCache(30 * 60 * 1000); // 30 minutes default
    }
    
    setSession(sessionId, userData, ttl = 30 * 60 * 1000) {
        this.cache.put(sessionId, userData, ttl);
    }
    
    getSession(sessionId) {
        return this.cache.get(sessionId);
    }
}

class APICache {
    constructor() {
        this.cache = new LFUCache(1000); // Cache 1000 API responses
    }
    
    getAPIResponse(endpoint, params) {
        const key = `${endpoint}?${JSON.stringify(params)}`;
        let response = this.cache.get(key);
        
        if (!response) {
            // Simulate API call
            response = this.callAPI(endpoint, params);
            this.cache.put(key, response);
        }
        
        return response;
    }
    
    callAPI(endpoint, params) {
        // Simulate API call
        return `Response for ${endpoint} with ${JSON.stringify(params)}`;
    }
}

// ==================== MAIN FUNCTION WITH EXAMPLES ====================
async function runCachingExamples() {
    console.log('=== Caching with Eviction Strategies ===\n');
    
    // 1. LRU Cache Example
    console.log('1. LRU CACHE EXAMPLE:');
    const lruCache = new LRUCache(3);
    lruCache.put('A', 'Apple');
    lruCache.put('B', 'Banana');
    lruCache.put('C', 'Cherry');
    lruCache.printCache();
    
    lruCache.get('A'); // Move A to front
    lruCache.put('D', 'Date'); // Evict B (least recently used)
    lruCache.printCache();
    console.log();
    
    // 2. LFU Cache Example
    console.log('2. LFU CACHE EXAMPLE:');
    const lfuCache = new LFUCache(3);
    lfuCache.put('A', 'Apple');
    lfuCache.put('B', 'Banana');
    lfuCache.put('C', 'Cherry');
    
    lfuCache.get('A'); lfuCache.get('A'); // A: frequency 2
    lfuCache.get('B'); // B: frequency 1
    lfuCache.get('C'); lfuCache.get('C'); lfuCache.get('C'); // C: frequency 3
    
    lfuCache.put('D', 'Date'); // Evict B (lowest frequency)
    lfuCache.printCache();
    console.log();
    
    // 3. TTL Cache Example
    console.log('3. TTL CACHE EXAMPLE:');
    const ttlCache = new TTLCache(1000); // 1 second default
    ttlCache.put('A', 'Apple', 2000); // 2 seconds
    ttlCache.put('B', 'Banana', 500);  // 0.5 seconds
    ttlCache.put('C', 'Cherry', 1000); // 1 second
    
    console.log('Initial cache:');
    ttlCache.printCache();
    
    // Wait and check cache
    await new Promise(resolve => setTimeout(resolve, 600));
    console.log('\nAfter 0.6 seconds:');
    ttlCache.printCache();
    
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('\nAfter 1.1 seconds:');
    ttlCache.printCache();
    
    ttlCache.shutdown();
    console.log();
    
    // 4. Redis-Style Cache Example
    console.log('4. REDIS-STYLE CACHE EXAMPLE:');
    const redisCache = new RedisStyleCache(3, 'allkeys-lru');
    redisCache.put('A', 'Apple', 5000);
    redisCache.put('B', 'Banana', 5000);
    redisCache.put('C', 'Cherry', 5000);
    
    redisCache.get('A'); // Access A
    redisCache.put('D', 'Date', 5000); // Should evict B (least recently used)
    
    console.log('Redis-style cache after eviction:');
    console.log('A:', redisCache.get('A'));
    console.log('B:', redisCache.get('B'));
    console.log('C:', redisCache.get('C'));
    console.log('D:', redisCache.get('D'));
    console.log();
    
    // 5. Practical Examples
    console.log('5. PRACTICAL EXAMPLES:');
    
    // Web page caching
    const webCache = new WebPageCache();
    console.log('Web page cache:', webCache.getPage('/home'));
    console.log('Web page cache (cached):', webCache.getPage('/home'));
    
    // Session caching
    const sessionCache = new SessionCache();
    sessionCache.setSession('session123', { userId: 123, name: 'John' });
    console.log('Session cache:', sessionCache.getSession('session123'));
    
    // API caching
    const apiCache = new APICache();
    console.log('API cache:', apiCache.getAPIResponse('/users', { id: 1 }));
    console.log('API cache (cached):', apiCache.getAPIResponse('/users', { id: 1 }));
    console.log();
    
    console.log('=== EVICTION STRATEGY COMPARISON ===');
    console.log('LRU: Best for temporal locality patterns');
    console.log('LFU: Best for stable access patterns');
    console.log('TTL: Best for time-sensitive data');
    console.log('Combined: Best for complex caching needs');
    console.log();
    
    console.log('=== REDIS POLICIES ===');
    console.log('allkeys-lru: Remove any key using LRU');
    console.log('volatile-lru: Remove expired keys using LRU');
    console.log('allkeys-lfu: Remove any key using LFU');
    console.log('volatile-lfu: Remove expired keys using LFU');
    console.log('volatile-ttl: Remove expired keys with shortest TTL');
    console.log('volatile-random: Remove random expired keys');
    console.log('allkeys-random: Remove random keys');
    console.log('noeviction: Return error when memory is full');
    console.log();
    
    console.log('=== INTERVIEW TIPS ===');
    console.log('• Always mention trade-offs between strategies');
    console.log('• Discuss memory vs CPU trade-offs');
    console.log('• Consider access patterns when choosing strategy');
    console.log('• Mention Redis policies for production systems');
    console.log('• Discuss distributed caching considerations');
}

// Run examples if this file is executed directly
if (require.main === module) {
    runCachingExamples();
}

module.exports = {
    LRUCache,
    LFUCache,
    TTLCache,
    CombinedCache,
    RedisStyleCache,
    WebPageCache,
    SessionCache,
    APICache,
    runCachingExamples
}; 