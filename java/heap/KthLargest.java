/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Kth Largest Element in a Stream problem
 * 
 * Problem: Kth Largest Element in a Stream
 * -----------------------------------------
 * You are part of a university admissions office and need to keep track of the kth highest 
 * test score from applicants in real-time. This helps to determine cut-off marks for 
 * interviews and admissions dynamically as new applicants submit their scores.
 * 
 * You are tasked to implement a class which, for a given integer k, maintains a stream of 
 * test scores and continuously returns the kth highest test score after a new score has 
 * been submitted. More specifically, we are looking for the kth highest score in the 
 * sorted list of all scores.
 * 
 * Implement the KthLargest class:
 * - KthLargest(int k, int[] nums) - Initializes the object with the integer k and the 
 *   stream of test scores nums.
 * - int add(int val) - Adds a new test score val to the stream and returns the element 
 *   representing the kth largest element in the pool of test scores so far.
 * 
 * Example:
 * Input: ["KthLargest", "add", "add", "add", "add", "add"]
 *        [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
 * Output: [null, 4, 5, 5, 8, 8]
 * 
 * Explanation:
 * KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
 * kthLargest.add(3); // return 4
 * kthLargest.add(5); // return 5
 * kthLargest.add(10); // return 5
 * kthLargest.add(9); // return 8
 * kthLargest.add(4); // return 8
 */

import java.util.*;

public class KthLargest {
    
    private PriorityQueue<Integer> minHeap;
    private int k;
    
    /**
     * Approach: Min Heap (Priority Queue)
     * 
     * Key Insight: To find the kth largest element, we maintain a min heap of size k
     * containing the k largest elements. The root of this heap will always be the kth largest.
     * 
     * Algorithm:
     * 1. Initialize a min heap of size k
     * 2. For each new element:
     *    - Add it to the heap
     *    - If heap size exceeds k, remove the smallest element (root)
     *    - Return the root (kth largest)
     * 
     * Why Min Heap of size k?
     * - We only need to track the k largest elements
     * - Min heap root is the smallest among k largest = kth largest overall
     * - Efficient O(log k) operations for add/remove
     * 
     * Time Complexity:
     * - Constructor: O(n log k) where n is the length of nums
     * - add(): O(log k) for heap operations
     * 
     * Space Complexity: O(k) - heap stores at most k elements
     */
    public KthLargest(int k, int[] nums) {
        this.k = k;
        this.minHeap = new PriorityQueue<>();
        
        // Add all initial numbers to the heap
        for (int num : nums) {
            add(num);
        }
    }
    
    /**
     * Adds a new value to the stream and returns the kth largest element
     * 
     * @param val The new value to add
     * @return The kth largest element in the stream
     */
    public int add(int val) {
        // Add the new value to the heap
        minHeap.add(val);
        
        // If heap size exceeds k, remove the smallest element
        if (minHeap.size() > k) {
            minHeap.poll();
        }
        
        // Return the root (kth largest element)
        return minHeap.peek();
    }
    
    /**
     * Alternative Approach: Using Max Heap (Less efficient)
     * 
     * This approach uses a max heap and removes elements until we have k elements left.
     * It's less efficient because we need to remove (n-k) elements for each add operation.
     * 
     * Time Complexity: O(n log n) for add operations
     * Space Complexity: O(n) - stores all elements
     */
    public static class KthLargestMaxHeap {
        private PriorityQueue<Integer> maxHeap;
        private int k;
        
        public KthLargestMaxHeap(int k, int[] nums) {
            this.k = k;
            this.maxHeap = new PriorityQueue<>(Collections.reverseOrder());
            
            // Add all initial numbers
            for (int num : nums) {
                maxHeap.add(num);
            }
        }
        
        public int add(int val) {
            maxHeap.add(val);
            
            // Remove elements until we have exactly k elements
            while (maxHeap.size() > k) {
                maxHeap.poll();
            }
            
            return maxHeap.peek();
        }
    }
    
    /**
     * Visualize the heap state for debugging
     */
    public void visualizeHeap() {
        System.out.println("Current heap size: " + minHeap.size());
        System.out.println("k: " + k);
        System.out.println("Heap elements: " + minHeap);
        System.out.println("kth largest: " + (minHeap.isEmpty() ? "N/A" : minHeap.peek()));
        System.out.println();
    }
    
    /**
     * Get current heap state as a list (for debugging)
     */
    public List<Integer> getHeapElements() {
        return new ArrayList<>(minHeap);
    }
    
    // Test cases
    public static void main(String[] args) {
        System.out.println("=== Kth Largest Element in a Stream Problem ===\n");
        
        // Test case 1: Example from problem
        System.out.println("Test Case 1:");
        int[] nums1 = {4, 5, 8, 2};
        KthLargest kthLargest1 = new KthLargest(3, nums1);
        
        System.out.println("Initial heap: " + kthLargest1.getHeapElements());
        System.out.println("kth largest: " + kthLargest1.minHeap.peek());
        
        int[] additions1 = {3, 5, 10, 9, 4};
        for (int val : additions1) {
            int result = kthLargest1.add(val);
            System.out.println("Add " + val + " -> kth largest: " + result);
            System.out.println("Heap: " + kthLargest1.getHeapElements());
        }
        System.out.println();
        
        // Test case 2: Single element
        System.out.println("Test Case 2:");
        int[] nums2 = {1};
        KthLargest kthLargest2 = new KthLargest(1, nums2);
        System.out.println("Initial: " + kthLargest2.add(2));
        System.out.println("Add 3: " + kthLargest2.add(3));
        System.out.println();
        
        // Test case 3: Empty initial array
        System.out.println("Test Case 3:");
        int[] nums3 = {};
        KthLargest kthLargest3 = new KthLargest(2, nums3);
        System.out.println("Add 1: " + kthLargest3.add(1));
        System.out.println("Add 2: " + kthLargest3.add(2));
        System.out.println("Add 3: " + kthLargest3.add(3));
        System.out.println();
        
        // Performance comparison
        System.out.println("=== Performance Comparison ===");
        int[] largeNums = new int[1000];
        for (int i = 0; i < largeNums.length; i++) {
            largeNums[i] = (int) (Math.random() * 1000);
        }
        
        long startTime = System.nanoTime();
        KthLargest efficient = new KthLargest(10, largeNums);
        long endTime = System.nanoTime();
        System.out.println("Min Heap approach time: " + (endTime - startTime) / 1000000 + " ms");
        
        startTime = System.nanoTime();
        KthLargestMaxHeap inefficient = new KthLargestMaxHeap(10, largeNums);
        endTime = System.nanoTime();
        System.out.println("Max Heap approach time: " + (endTime - startTime) / 1000000 + " ms");
    }
} 