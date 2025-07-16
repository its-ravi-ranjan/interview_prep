/**
 * LRU Cache Implementation
 * 
 * Problem:
 * Design and implement a data structure for Least Recently Used (LRU) cache.
 * The cache should support the following operations:
 * 1. get(key): Get the value of the key if it exists in the cache, otherwise return -1
 * 2. put(key, value): Set or insert the value if the key is not already present
 *    When the cache reaches its capacity, it should invalidate the least recently used item
 * 
 * Example:
 * Input:
 * ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
 * [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
 * Output: [null, null, null, 1, null, -1, null, -1, 3, 4]
 * 
 * Approach:
 * 1. Use a doubly linked list to maintain the order of usage
 * 2. Use a hash map for O(1) access to nodes
 * 3. Most recently used items are at the front (head)
 * 4. Least recently used items are at the back (tail)
 * 5. When capacity is reached, remove the tail node
 * 
 * Time Complexity:
 * - get: O(1)
 * - put: O(1)
 * Space Complexity: O(capacity)
 */

class ListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // key -> node
        this.head = new ListNode(0, 0); // dummy head
        this.tail = new ListNode(0, 0); // dummy tail
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if (!this.cache.has(key)) return -1;

        // Move the accessed node to the front
        const node = this.cache.get(key);
        this.moveToFront(node);
        return node.value;
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        if (this.cache.has(key)) {
            // Update existing node
            const node = this.cache.get(key);
            node.value = value;
            this.moveToFront(node);
        } else {
            // Create new node
            const node = new ListNode(key, value);
            this.cache.set(key, node);
            this.addToFront(node);

            // Remove least recently used if capacity is exceeded
            if (this.cache.size > this.capacity) {
                this.removeLRU();
            }
        }
    }

    // Helper method to move a node to the front
    moveToFront(node) {
        // Remove from current position
        node.prev.next = node.next;
        node.next.prev = node.prev;

        // Add to front
        this.addToFront(node);
    }

    // Helper method to add a node to the front
    addToFront(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    // Helper method to remove the least recently used node
    removeLRU() {
        const lru = this.tail.prev;
        this.cache.delete(lru.key);
        lru.prev.next = this.tail;
        this.tail.prev = lru.prev;
    }

    // Helper method to print the cache state
    printCache() {
        console.log("Cache state:");
        console.log("Capacity:", this.capacity);
        console.log("Size:", this.cache.size);
        console.log("Items (most recent to least recent):");
        
        let current = this.head.next;
        while (current !== this.tail) {
            console.log(`Key: ${current.key}, Value: ${current.value}`);
            current = current.next;
        }
        console.log("---");
    }
}

// Test cases
function runTests() {
    // Test case 1: Basic operations
    console.log("Test case 1: Basic operations");
    const cache1 = new LRUCache(2);
    cache1.put(1, 1);
    cache1.put(2, 2);
    console.log("get(1):", cache1.get(1)); // returns 1
    cache1.put(3, 3); // evicts key 2
    console.log("get(2):", cache1.get(2)); // returns -1 (not found)
    cache1.put(4, 4); // evicts key 1
    console.log("get(1):", cache1.get(1)); // returns -1 (not found)
    console.log("get(3):", cache1.get(3)); // returns 3
    console.log("get(4):", cache1.get(4)); // returns 4
    cache1.printCache();

    // Test case 2: Empty cache
    console.log("\nTest case 2: Empty cache");
    const cache2 = new LRUCache(1);
    console.log("get(1):", cache2.get(1)); // returns -1
    cache2.printCache();

    // Test case 3: Single capacity
    console.log("\nTest case 3: Single capacity");
    const cache3 = new LRUCache(1);
    cache3.put(1, 1);
    console.log("get(1):", cache3.get(1)); // returns 1
    cache3.put(2, 2); // evicts key 1
    console.log("get(1):", cache3.get(1)); // returns -1
    console.log("get(2):", cache3.get(2)); // returns 2
    cache3.printCache();

    // Test case 4: Update existing key
    console.log("\nTest case 4: Update existing key");
    const cache4 = new LRUCache(2);
    cache4.put(1, 1);
    cache4.put(2, 2);
    cache4.put(1, 10); // update existing key
    console.log("get(1):", cache4.get(1)); // returns 10
    cache4.printCache();

    // Test case 5: Large capacity
    console.log("\nTest case 5: Large capacity");
    const cache5 = new LRUCache(5);
    for (let i = 1; i <= 5; i++) {
        cache5.put(i, i * 10);
    }
    console.log("get(3):", cache5.get(3)); // returns 30
    cache5.put(6, 60); // evicts key 1
    console.log("get(1):", cache5.get(1)); // returns -1
    console.log("get(6):", cache5.get(6)); // returns 60
    cache5.printCache();
}

// Run the tests
runTests(); 