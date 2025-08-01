/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Top K Frequent Elements problem
 * 
 * Problem: Top K Frequent Elements
 * --------------------------------
 * Given an integer array nums and an integer k, return the k most frequent elements. 
 * You may return the answer in any order.
 * 
 * Example 1:
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 * 
 * Example 2:
 * Input: nums = [1], k = 1
 * Output: [1]
 */

import java.util.*;

public class TopKFrequent {
    
    /**
     * Approach 1: Min Heap (Priority Queue) - Most Efficient
     * 
     * Algorithm:
     * 1. Count frequency of each element using HashMap
     * 2. Use min heap to keep top k frequent elements
     * 3. Add entries to heap, remove smallest if size > k
     * 4. Extract elements from heap in reverse order
     * 
     * Time Complexity: O(n log k)
     * - Counting frequencies: O(n)
     * - Building heap: O(n log k)
     * - Extracting result: O(k log k)
     * 
     * Space Complexity: O(n) - HashMap + Heap
     */
    public static int[] topKFrequent(int[] nums, int k) {
        // Count frequency of each element
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        for (int num : nums) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }
        
        // Min heap to keep top k frequent elements
        PriorityQueue<Map.Entry<Integer, Integer>> minHeap = 
            new PriorityQueue<>((a, b) -> a.getValue() - b.getValue());
        
        // Add entries to heap, maintain size k
        for (Map.Entry<Integer, Integer> entry : frequencyMap.entrySet()) {
            minHeap.add(entry);
            if (minHeap.size() > k) {
                minHeap.poll(); // Remove least frequent
            }
        }
        
        // Extract elements in reverse order (most frequent first)
        int[] result = new int[k];
        for (int i = k - 1; i >= 0; i--) {
            result[i] = minHeap.poll().getKey();
        }
        
        return result;
    }
    
    /**
     * Approach 2: Max Heap (Alternative)
     * 
     * Algorithm:
     * 1. Count frequency of each element
     * 2. Build max heap with all entries
     * 3. Extract top k elements
     * 
     * Time Complexity: O(n + k log n)
     * - Counting frequencies: O(n)
     * - Building max heap: O(n)
     * - Extracting k elements: O(k log n)
     * 
     * Space Complexity: O(n) - HashMap + MaxHeap
     */
    public static int[] topKFrequentMaxHeap(int[] nums, int k) {
        // Count frequency of each element
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        for (int num : nums) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }
        
        // Max heap to get most frequent elements
        PriorityQueue<Map.Entry<Integer, Integer>> maxHeap = 
            new PriorityQueue<>((a, b) -> b.getValue() - a.getValue());
        
        // Add all entries to max heap
        for (Map.Entry<Integer, Integer> entry : frequencyMap.entrySet()) {
            maxHeap.add(entry);
        }
        
        // Extract top k elements
        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = maxHeap.poll().getKey();
        }
        
        return result;
    }
    
    /**
     * Approach 3: Bucket Sort (Most Efficient for Small Range)
     * 
     * Algorithm:
     * 1. Count frequency of each element
     * 2. Create buckets based on frequency
     * 3. Extract elements from highest frequency buckets
     * 
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    public static int[] topKFrequentBucketSort(int[] nums, int k) {
        // Count frequency of each element
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        for (int num : nums) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }
        
        // Create buckets: index = frequency, value = list of elements
        List<Integer>[] buckets = new List[nums.length + 1];
        for (int i = 0; i < buckets.length; i++) {
            buckets[i] = new ArrayList<>();
        }
        
        // Add elements to buckets based on frequency
        for (Map.Entry<Integer, Integer> entry : frequencyMap.entrySet()) {
            int frequency = entry.getValue();
            buckets[frequency].add(entry.getKey());
        }
        
        // Extract elements from highest frequency buckets
        int[] result = new int[k];
        int index = 0;
        
        for (int i = buckets.length - 1; i >= 0 && index < k; i--) {
            for (int num : buckets[i]) {
                if (index < k) {
                    result[index++] = num;
                }
            }
        }
        
        return result;
    }
    
    /**
     * Approach 4: Using Arrays.sort() (Simple but less efficient)
     * 
     * Time Complexity: O(n log n)
     * Space Complexity: O(n)
     */
    public static int[] topKFrequentSort(int[] nums, int k) {
        // Count frequency of each element
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        for (int num : nums) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }
        
        // Convert to list and sort by frequency
        List<Map.Entry<Integer, Integer>> entries = new ArrayList<>(frequencyMap.entrySet());
        entries.sort((a, b) -> b.getValue() - a.getValue());
        
        // Extract top k elements
        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = entries.get(i).getKey();
        }
        
        return result;
    }
    
    /**
     * Visualize the frequency counting and heap operations
     */
    public static void visualizeTopK(int[] nums, int k) {
        System.out.println("Original array: " + Arrays.toString(nums));
        System.out.println("k: " + k);
        
        // Count frequencies
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        for (int num : nums) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }
        
        System.out.println("Frequency map: " + frequencyMap);
        
        // Min heap approach
        PriorityQueue<Map.Entry<Integer, Integer>> minHeap = 
            new PriorityQueue<>((a, b) -> a.getValue() - b.getValue());
        
        for (Map.Entry<Integer, Integer> entry : frequencyMap.entrySet()) {
            minHeap.add(entry);
            if (minHeap.size() > k) {
                Map.Entry<Integer, Integer> removed = minHeap.poll();
                System.out.println("Removed: " + removed.getKey() + " (freq: " + removed.getValue() + ")");
            }
        }
        
        System.out.println("Final heap size: " + minHeap.size());
        
        // Extract result
        int[] result = new int[k];
        for (int i = k - 1; i >= 0; i--) {
            result[i] = minHeap.poll().getKey();
        }
        
        System.out.println("Result: " + Arrays.toString(result));
    }
    
    // Test cases
    public static void main(String[] args) {
        System.out.println("=== Top K Frequent Elements Problem ===\n");
        
        // Test case 1
        int[] nums1 = {1, 1, 1, 2, 2, 3};
        int k1 = 2;
        System.out.println("Test Case 1:");
        System.out.println("Input: nums = " + Arrays.toString(nums1) + ", k = " + k1);
        System.out.println("Expected: [1, 2]");
        System.out.println("Min Heap Output: " + Arrays.toString(topKFrequent(nums1, k1)));
        System.out.println("Max Heap Output: " + Arrays.toString(topKFrequentMaxHeap(nums1, k1)));
        System.out.println("Bucket Sort Output: " + Arrays.toString(topKFrequentBucketSort(nums1, k1)));
        System.out.println("Sort Output: " + Arrays.toString(topKFrequentSort(nums1, k1)));
        System.out.println();
        
        // Test case 2
        int[] nums2 = {1};
        int k2 = 1;
        System.out.println("Test Case 2:");
        System.out.println("Input: nums = " + Arrays.toString(nums2) + ", k = " + k2);
        System.out.println("Expected: [1]");
        System.out.println("Min Heap Output: " + Arrays.toString(topKFrequent(nums2, k2)));
        System.out.println("Max Heap Output: " + Arrays.toString(topKFrequentMaxHeap(nums2, k2)));
        System.out.println("Bucket Sort Output: " + Arrays.toString(topKFrequentBucketSort(nums2, k2)));
        System.out.println("Sort Output: " + Arrays.toString(topKFrequentSort(nums2, k2)));
        System.out.println();
        
        // Test case 3
        int[] nums3 = {1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4};
        int k3 = 3;
        System.out.println("Test Case 3:");
        System.out.println("Input: nums = " + Arrays.toString(nums3) + ", k = " + k3);
        System.out.println("Expected: [4, 3, 1] (or any order)");
        System.out.println("Min Heap Output: " + Arrays.toString(topKFrequent(nums3, k3)));
        System.out.println("Max Heap Output: " + Arrays.toString(topKFrequentMaxHeap(nums3, k3)));
        System.out.println("Bucket Sort Output: " + Arrays.toString(topKFrequentBucketSort(nums3, k3)));
        System.out.println("Sort Output: " + Arrays.toString(topKFrequentSort(nums3, k3)));
        System.out.println();
        
        // Visualization
        System.out.println("=== Visualization ===");
        visualizeTopK(nums1, k1);
    }
} 