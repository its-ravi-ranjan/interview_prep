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

import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

// ==================== 1. LRU (LEAST RECENTLY USED) ====================
/**
 * LRU EVICTION: Removes least recently accessed items first
 * 
 * Implementation: HashMap + Doubly Linked List
 * - O(1) get and put operations
 * - Maintains access order
 * - Perfect for temporal locality patterns
 * 
 * Use Cases:
 * - Web page caching
 * - Database query results
 * - Session storage
 */

class LRUCache<K, V> {
    private final int capacity;
    private final Map<K, Node<K, V>> cache;
    private final Node<K, V> head, tail;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new HashMap<>();
        this.head = new Node<>(null, null);
        this.tail = new Node<>(null, null);
        head.next = tail;
        tail.prev = head;
    }
    
    public V get(K key) {
        Node<K, V> node = cache.get(key);
        if (node == null) {
            return null;
        }
        
        // Move to front (most recently used)
        moveToFront(node);
        return node.value;
    }
    
    public void put(K key, V value) {
        Node<K, V> node = cache.get(key);
        
        if (node != null) {
            // Update existing node
            node.value = value;
            moveToFront(node);
        } else {
            // Create new node
            node = new Node<>(key, value);
            cache.put(key, node);
            addToFront(node);
            
            // Evict if capacity exceeded
            if (cache.size() > capacity) {
                evictLRU();
            }
        }
    }
    
    private void moveToFront(Node<K, V> node) {
        // Remove from current position
        node.prev.next = node.next;
        node.next.prev = node.prev;
        
        // Add to front
        addToFront(node);
    }
    
    private void addToFront(Node<K, V> node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }
    
    private void evictLRU() {
        Node<K, V> lru = tail.prev;
        cache.remove(lru.key);
        lru.prev.next = tail;
        tail.prev = lru.prev;
    }
    
    public int size() {
        return cache.size();
    }
    
    public void printCache() {
        System.out.print("LRU Cache [");
        Node<K, V> current = head.next;
        while (current != tail) {
            System.out.print(current.key + ":" + current.value);
            current = current.next;
            if (current != tail) System.out.print(" -> ");
        }
        System.out.println("]");
    }
    
    private static class Node<K, V> {
        K key;
        V value;
        Node<K, V> prev, next;
        
        Node(K key, V value) {
            this.key = key;
            this.value = value;
        }
    }
}

// ==================== 2. LFU (LEAST FREQUENTLY USED) ====================
/**
 * LFU EVICTION: Removes items with lowest access frequency
 * 
 * Implementation: HashMap + TreeMap + LinkedHashSet
 * - O(log n) operations due to TreeMap
 * - Tracks access frequency
 * - Better for stable access patterns
 * 
 * Use Cases:
 * - Content recommendation systems
 * - API response caching
 * - Static asset caching
 */

class LFUCache<K, V> {
    private final int capacity;
    private final Map<K, V> cache;
    private final Map<K, Integer> frequency;
    private final TreeMap<Integer, LinkedHashSet<K>> frequencyMap;
    
    public LFUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new HashMap<>();
        this.frequency = new HashMap<>();
        this.frequencyMap = new TreeMap<>();
    }
    
    public V get(K key) {
        V value = cache.get(key);
        if (value == null) {
            return null;
        }
        
        // Increment frequency
        incrementFrequency(key);
        return value;
    }
    
    public void put(K key, V value) {
        if (capacity == 0) return;
        
        if (cache.containsKey(key)) {
            // Update existing
            cache.put(key, value);
            incrementFrequency(key);
        } else {
            // Add new item
            if (cache.size() >= capacity) {
                evictLFU();
            }
            
            cache.put(key, value);
            frequency.put(key, 1);
            frequencyMap.computeIfAbsent(1, k -> new LinkedHashSet<>()).add(key);
        }
    }
    
    private void incrementFrequency(K key) {
        int currentFreq = frequency.get(key);
        int newFreq = currentFreq + 1;
        
        // Remove from current frequency
        frequencyMap.get(currentFreq).remove(key);
        if (frequencyMap.get(currentFreq).isEmpty()) {
            frequencyMap.remove(currentFreq);
        }
        
        // Add to new frequency
        frequency.put(key, newFreq);
        frequencyMap.computeIfAbsent(newFreq, k -> new LinkedHashSet<>()).add(key);
    }
    
    private void evictLFU() {
        // Get the lowest frequency
        int lowestFreq = frequencyMap.firstKey();
        LinkedHashSet<K> keys = frequencyMap.get(lowestFreq);
        
        // Remove the first key (oldest in that frequency)
        K keyToEvict = keys.iterator().next();
        keys.remove(keyToEvict);
        
        if (keys.isEmpty()) {
            frequencyMap.remove(lowestFreq);
        }
        
        cache.remove(keyToEvict);
        frequency.remove(keyToEvict);
    }
    
    public void printCache() {
        System.out.println("LFU Cache: " + cache);
        System.out.println("Frequency Map: " + frequencyMap);
    }
}

// ==================== 3. TTL (TIME TO LIVE) ====================
/**
 * TTL EVICTION: Automatically expires items after time duration
 * 
 * Implementation: HashMap + ScheduledExecutorService
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

class TTLCache<K, V> {
    private final Map<K, CacheEntry<V>> cache;
    private final ScheduledExecutorService scheduler;
    private final long defaultTTL;
    
    public TTLCache(long defaultTTLMillis) {
        this.cache = new ConcurrentHashMap<>();
        this.scheduler = Executors.newScheduledThreadPool(1);
        this.defaultTTL = defaultTTLMillis;
        
        // Start cleanup task
        startCleanupTask();
    }
    
    public V get(K key) {
        CacheEntry<V> entry = cache.get(key);
        if (entry == null || entry.isExpired()) {
            cache.remove(key);
            return null;
        }
        return entry.value;
    }
    
    public void put(K key, V value) {
        put(key, value, defaultTTL);
    }
    
    public void put(K key, V value, long ttlMillis) {
        long expiryTime = System.currentTimeMillis() + ttlMillis;
        cache.put(key, new CacheEntry<>(value, expiryTime));
    }
    
    private void startCleanupTask() {
        scheduler.scheduleAtFixedRate(() -> {
            long now = System.currentTimeMillis();
            cache.entrySet().removeIf(entry -> entry.getValue().isExpired(now));
        }, 1, 1, TimeUnit.SECONDS);
    }
    
    public void shutdown() {
        scheduler.shutdown();
    }
    
    public void printCache() {
        System.out.println("TTL Cache:");
        for (Map.Entry<K, CacheEntry<V>> entry : cache.entrySet()) {
            long timeLeft = entry.getValue().expiryTime - System.currentTimeMillis();
            System.out.printf("  %s: %s (expires in %d ms)%n", 
                entry.getKey(), entry.getValue().value, timeLeft);
        }
    }
    
    private static class CacheEntry<V> {
        final V value;
        final long expiryTime;
        
        CacheEntry(V value, long expiryTime) {
            this.value = value;
            this.expiryTime = expiryTime;
        }
        
        boolean isExpired() {
            return isExpired(System.currentTimeMillis());
        }
        
        boolean isExpired(long currentTime) {
            return currentTime > expiryTime;
        }
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

class CombinedCache<K, V> {
    private final LRUCache<K, CacheEntry<V>> lruCache;
    private final ScheduledExecutorService scheduler;
    
    public CombinedCache(int capacity) {
        this.lruCache = new LRUCache<>(capacity);
        this.scheduler = Executors.newScheduledThreadPool(1);
        startCleanupTask();
    }
    
    public V get(K key) {
        CacheEntry<V> entry = lruCache.get(key);
        if (entry == null || entry.isExpired()) {
            return null;
        }
        return entry.value;
    }
    
    public void put(K key, V value, long ttlMillis) {
        long expiryTime = System.currentTimeMillis() + ttlMillis;
        lruCache.put(key, new CacheEntry<>(value, expiryTime));
    }
    
    private void startCleanupTask() {
        scheduler.scheduleAtFixedRate(() -> {
            // Cleanup expired entries
            // In real implementation, would iterate and remove expired
        }, 1, 1, TimeUnit.SECONDS);
    }
    
    public void shutdown() {
        scheduler.shutdown();
    }
    
    private static class CacheEntry<V> {
        final V value;
        final long expiryTime;
        
        CacheEntry(V value, long expiryTime) {
            this.value = value;
            this.expiryTime = expiryTime;
        }
        
        boolean isExpired() {
            return System.currentTimeMillis() > expiryTime;
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

class RedisStyleCache<K, V> {
    private final Map<K, CacheEntry<V>> cache;
    private final int maxSize;
    private final String evictionPolicy;
    
    public RedisStyleCache(int maxSize, String evictionPolicy) {
        this.cache = new LinkedHashMap<>(maxSize, 0.75f, true); // Access order
        this.maxSize = maxSize;
        this.evictionPolicy = evictionPolicy;
    }
    
    public V get(K key) {
        CacheEntry<V> entry = cache.get(key);
        if (entry == null || entry.isExpired()) {
            cache.remove(key);
            return null;
        }
        return entry.value;
    }
    
    public void put(K key, V value, long ttlMillis) {
        // Check if we need to evict
        if (cache.size() >= maxSize && !cache.containsKey(key)) {
            evict();
        }
        
        long expiryTime = System.currentTimeMillis() + ttlMillis;
        cache.put(key, new CacheEntry<>(value, expiryTime));
    }
    
    private void evict() {
        switch (evictionPolicy) {
            case "allkeys-lru":
                evictLRU();
                break;
            case "volatile-lru":
                evictExpiredLRU();
                break;
            case "volatile-ttl":
                evictShortestTTL();
                break;
            case "volatile-random":
                evictRandomExpired();
                break;
            default:
                throw new RuntimeException("Memory limit exceeded");
        }
    }
    
    private void evictLRU() {
        // Remove oldest entry (first in LinkedHashMap)
        K oldestKey = cache.keySet().iterator().next();
        cache.remove(oldestKey);
    }
    
    private void evictExpiredLRU() {
        // Find and remove oldest expired key
        for (K key : cache.keySet()) {
            if (cache.get(key).isExpired()) {
                cache.remove(key);
                return;
            }
        }
        // If no expired keys, remove oldest
        evictLRU();
    }
    
    private void evictShortestTTL() {
        K shortestTTLKey = null;
        long shortestTTL = Long.MAX_VALUE;
        
        for (Map.Entry<K, CacheEntry<V>> entry : cache.entrySet()) {
            if (entry.getValue().isExpired()) {
                long ttl = entry.getValue().expiryTime - System.currentTimeMillis();
                if (ttl < shortestTTL) {
                    shortestTTL = ttl;
                    shortestTTLKey = entry.getKey();
                }
            }
        }
        
        if (shortestTTLKey != null) {
            cache.remove(shortestTTLKey);
        } else {
            evictLRU();
        }
    }
    
    private void evictRandomExpired() {
        List<K> expiredKeys = new ArrayList<>();
        for (Map.Entry<K, CacheEntry<V>> entry : cache.entrySet()) {
            if (entry.getValue().isExpired()) {
                expiredKeys.add(entry.getKey());
            }
        }
        
        if (!expiredKeys.isEmpty()) {
            K randomKey = expiredKeys.get(new Random().nextInt(expiredKeys.size()));
            cache.remove(randomKey);
        } else {
            evictLRU();
        }
    }
    
    private static class CacheEntry<V> {
        final V value;
        final long expiryTime;
        
        CacheEntry(V value, long expiryTime) {
            this.value = value;
            this.expiryTime = expiryTime;
        }
        
        boolean isExpired() {
            return System.currentTimeMillis() > expiryTime;
        }
    }
}

// ==================== MAIN CLASS WITH EXAMPLES ====================
public class CachingWithEviction {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== Caching with Eviction Strategies ===\n");
        
        // 1. LRU Cache Example
        System.out.println("1. LRU CACHE EXAMPLE:");
        LRUCache<String, String> lruCache = new LRUCache<>(3);
        lruCache.put("A", "Apple");
        lruCache.put("B", "Banana");
        lruCache.put("C", "Cherry");
        lruCache.printCache();
        
        lruCache.get("A"); // Move A to front
        lruCache.put("D", "Date"); // Evict B (least recently used)
        lruCache.printCache();
        System.out.println();
        
        // 2. LFU Cache Example
        System.out.println("2. LFU CACHE EXAMPLE:");
        LFUCache<String, String> lfuCache = new LFUCache<>(3);
        lfuCache.put("A", "Apple");
        lfuCache.put("B", "Banana");
        lfuCache.put("C", "Cherry");
        
        lfuCache.get("A"); lfuCache.get("A"); // A: frequency 2
        lfuCache.get("B"); // B: frequency 1
        lfuCache.get("C"); lfuCache.get("C"); lfuCache.get("C"); // C: frequency 3
        
        lfuCache.put("D", "Date"); // Evict B (lowest frequency)
        lfuCache.printCache();
        System.out.println();
        
        // 3. TTL Cache Example
        System.out.println("3. TTL CACHE EXAMPLE:");
        TTLCache<String, String> ttlCache = new TTLCache<>(1000); // 1 second default
        ttlCache.put("A", "Apple", 2000); // 2 seconds
        ttlCache.put("B", "Banana", 500);  // 0.5 seconds
        ttlCache.put("C", "Cherry", 1000); // 1 second
        
        System.out.println("Initial cache:");
        ttlCache.printCache();
        
        Thread.sleep(600); // Wait 0.6 seconds
        System.out.println("\nAfter 0.6 seconds:");
        ttlCache.printCache();
        
        Thread.sleep(500); // Wait another 0.5 seconds
        System.out.println("\nAfter 1.1 seconds:");
        ttlCache.printCache();
        
        ttlCache.shutdown();
        System.out.println();
        
        // 4. Redis-Style Cache Example
        System.out.println("4. REDIS-STYLE CACHE EXAMPLE:");
        RedisStyleCache<String, String> redisCache = new RedisStyleCache<>(3, "allkeys-lru");
        redisCache.put("A", "Apple", 5000);
        redisCache.put("B", "Banana", 5000);
        redisCache.put("C", "Cherry", 5000);
        
        redisCache.get("A"); // Access A
        redisCache.put("D", "Date", 5000); // Should evict B (least recently used)
        
        System.out.println("Redis-style cache after eviction:");
        System.out.println("A: " + redisCache.get("A"));
        System.out.println("B: " + redisCache.get("B"));
        System.out.println("C: " + redisCache.get("C"));
        System.out.println("D: " + redisCache.get("D"));
        System.out.println();
        
        System.out.println("=== EVICTION STRATEGY COMPARISON ===");
        System.out.println("LRU: Best for temporal locality patterns");
        System.out.println("LFU: Best for stable access patterns");
        System.out.println("TTL: Best for time-sensitive data");
        System.out.println("Combined: Best for complex caching needs");
        System.out.println();
        
        System.out.println("=== REDIS POLICIES ===");
        System.out.println("allkeys-lru: Remove any key using LRU");
        System.out.println("volatile-lru: Remove expired keys using LRU");
        System.out.println("allkeys-lfu: Remove any key using LFU");
        System.out.println("volatile-lfu: Remove expired keys using LFU");
        System.out.println("volatile-ttl: Remove expired keys with shortest TTL");
        System.out.println("volatile-random: Remove random expired keys");
        System.out.println("allkeys-random: Remove random keys");
        System.out.println("noeviction: Return error when memory is full");
    }
} 