/**
 * Q19. LRU Cache
 * 
 * Problem:
 * Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
 * Implement the LRUCache class:
 * - LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
 * - int get(int key) Return the value of the key if the key exists, otherwise return -1.
 * - void put(int key, int value) Update the value of the key if the key exists.
 *   Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity,
 *   evict the least recently used key.
 * 
 * Example:
 * Input:
 * ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
 * [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
 * Output: [null, null, null, 1, null, -1, null, -1, 3, 4]
 * 
 * Approach:
 * 1. Use a HashMap for O(1) lookups
 * 2. Use a Doubly Linked List to maintain order
 * 3. For get: move accessed node to front
 * 4. For put: add new node to front, remove from end if capacity exceeded
 * 
 * Time Complexity: O(1) for both get and put operations
 * Space Complexity: O(capacity) for storing the cache
 */

import java.util.HashMap;

class LRUCache {
    // Node class for doubly linked list
    class Node {
        int key;
        int value;
        Node prev;
        Node next;
        
        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private int capacity;
    private HashMap<Integer, Node> cache;
    private Node head;
    private Node tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new HashMap<>();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (cache.containsKey(key)) {
            Node node = cache.get(key);
            // Move to front (most recently used)
            removeNode(node);
            addToFront(node);
            return node.value;
        }
        return -1;
    }

    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            // Update existing node
            Node node = cache.get(key);
            node.value = value;
            removeNode(node);
            addToFront(node);
        } else {
            // Create new node
            Node node = new Node(key, value);
            cache.put(key, node);
            addToFront(node);
            
            // Remove least recently used if capacity exceeded
            if (cache.size() > capacity) {
                Node lru = tail.prev;
                removeNode(lru);
                cache.remove(lru.key);
            }
        }
    }

    // Helper method to remove node from list
    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    // Helper method to add node to front
    private void addToFront(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Create cache with capacity 2
        LRUCache cache = new LRUCache(2);

        // Test operations
        System.out.println("Cache operations:");
        
        cache.put(1, 1);
        System.out.println("put(1, 1)");
        
        cache.put(2, 2);
        System.out.println("put(2, 2)");
        
        System.out.println("get(1) = " + cache.get(1));  // returns 1
        
        cache.put(3, 3);
        System.out.println("put(3, 3)");
        
        System.out.println("get(2) = " + cache.get(2));  // returns -1 (not found)
        
        cache.put(4, 4);
        System.out.println("put(4, 4)");
        
        System.out.println("get(1) = " + cache.get(1));  // returns -1 (not found)
        System.out.println("get(3) = " + cache.get(3));  // returns 3
        System.out.println("get(4) = " + cache.get(4));  // returns 4
    }
} 