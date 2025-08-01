/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Top K Frequent Words problem
 * 
 * Problem: Top K Frequent Words
 * ------------------------------
 * Given an array of strings words and an integer k, return the k most frequent strings.
 * Return the answer sorted by the frequency from highest to lowest. 
 * Sort the words with the same frequency by their lexicographical order.
 * 
 * Example 1:
 * Input: words = ["i","love","leetcode","i","love","coding"], k = 2
 * Output: ["i","love"]
 * Explanation: "i" and "love" are the two most frequent words.
 * Note that "i" comes before "love" due to a lower alphabetical order.
 * 
 * Example 2:
 * Input: words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4
 * Output: ["the","is","sunny","day"]
 */

import java.util.*;

public class TopKFrequentWord {
    
    /**
     * Approach 1: Min Heap with Custom Comparator - Most Efficient
     * 
     * Algorithm:
     * 1. Count frequency of each word using HashMap
     * 2. Use min heap with custom comparator:
     *    - Primary: frequency (ascending)
     *    - Secondary: lexicographical order (descending for same frequency)
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
    public static List<String> topKFrequent(String[] words, int k) {
        // Count frequency of each word
        Map<String, Integer> frequencyMap = new HashMap<>();
        for (String word : words) {
            frequencyMap.put(word, frequencyMap.getOrDefault(word, 0) + 1);
        }
        
        // Min heap with custom comparator
        PriorityQueue<Map.Entry<String, Integer>> minHeap = 
            new PriorityQueue<>((a, b) -> {
                // Primary: frequency (ascending)
                if (!a.getValue().equals(b.getValue())) {
                    return a.getValue() - b.getValue();
                }
                // Secondary: lexicographical order (descending for same frequency)
                return b.getKey().compareTo(a.getKey());
            });
        
        // Add entries to heap, maintain size k
        for (Map.Entry<String, Integer> entry : frequencyMap.entrySet()) {
            minHeap.add(entry);
            if (minHeap.size() > k) {
                minHeap.poll(); // Remove least frequent (or lexicographically larger)
            }
        }
        
        // Extract elements in reverse order (most frequent first)
        List<String> result = new ArrayList<>();
        for (int i = k - 1; i >= 0; i--) {
            result.add(0, minHeap.poll().getKey());
        }
        
        return result;
    }
    
    /**
     * Approach 2: Max Heap with Custom Comparator (Alternative)
     * 
     * Algorithm:
     * 1. Count frequency of each word
     * 2. Build max heap with custom comparator:
     *    - Primary: frequency (descending)
     *    - Secondary: lexicographical order (ascending for same frequency)
     * 3. Extract top k elements
     * 
     * Time Complexity: O(n + k log n)
     * - Counting frequencies: O(n)
     * - Building max heap: O(n)
     * - Extracting k elements: O(k log n)
     * 
     * Space Complexity: O(n) - HashMap + MaxHeap
     */
    public static List<String> topKFrequentMaxHeap(String[] words, int k) {
        // Count frequency of each word
        Map<String, Integer> frequencyMap = new HashMap<>();
        for (String word : words) {
            frequencyMap.put(word, frequencyMap.getOrDefault(word, 0) + 1);
        }
        
        // Max heap with custom comparator
        PriorityQueue<Map.Entry<String, Integer>> maxHeap = 
            new PriorityQueue<>((a, b) -> {
                // Primary: frequency (descending)
                if (!a.getValue().equals(b.getValue())) {
                    return b.getValue() - a.getValue();
                }
                // Secondary: lexicographical order (ascending for same frequency)
                return a.getKey().compareTo(b.getKey());
            });
        
        // Add all entries to max heap
        for (Map.Entry<String, Integer> entry : frequencyMap.entrySet()) {
            maxHeap.add(entry);
        }
        
        // Extract top k elements
        List<String> result = new ArrayList<>();
        for (int i = 0; i < k; i++) {
            result.add(maxHeap.poll().getKey());
        }
        
        return result;
    }
    
    /**
     * Approach 3: Bucket Sort with Sorting (Most Efficient for Small Range)
     * 
     * Algorithm:
     * 1. Count frequency of each word
     * 2. Create buckets based on frequency
     * 3. Sort each bucket lexicographically
     * 4. Extract elements from highest frequency buckets
     * 
     * Time Complexity: O(n + m log m) where m is number of unique words
     * Space Complexity: O(n)
     */
    public static List<String> topKFrequentBucketSort(String[] words, int k) {
        // Count frequency of each word
        Map<String, Integer> frequencyMap = new HashMap<>();
        for (String word : words) {
            frequencyMap.put(word, frequencyMap.getOrDefault(word, 0) + 1);
        }
        
        // Create buckets: index = frequency, value = list of words
        List<String>[] buckets = new List[words.length + 1];
        for (int i = 0; i < buckets.length; i++) {
            buckets[i] = new ArrayList<>();
        }
        
        // Add words to buckets based on frequency
        for (Map.Entry<String, Integer> entry : frequencyMap.entrySet()) {
            int frequency = entry.getValue();
            buckets[frequency].add(entry.getKey());
        }
        
        // Extract elements from highest frequency buckets
        List<String> result = new ArrayList<>();
        for (int i = buckets.length - 1; i >= 0 && result.size() < k; i--) {
            // Sort words in current bucket lexicographically
            Collections.sort(buckets[i]);
            for (String word : buckets[i]) {
                if (result.size() < k) {
                    result.add(word);
                }
            }
        }
        
        return result;
    }
    
    /**
     * Approach 4: Using Collections.sort() (Simple but less efficient)
     * 
     * Time Complexity: O(n log n)
     * Space Complexity: O(n)
     */
    public static List<String> topKFrequentSort(String[] words, int k) {
        // Count frequency of each word
        Map<String, Integer> frequencyMap = new HashMap<>();
        for (String word : words) {
            frequencyMap.put(word, frequencyMap.getOrDefault(word, 0) + 1);
        }
        
        // Convert to list and sort by frequency and lexicographical order
        List<Map.Entry<String, Integer>> entries = new ArrayList<>(frequencyMap.entrySet());
        entries.sort((a, b) -> {
            // Primary: frequency (descending)
            if (!a.getValue().equals(b.getValue())) {
                return b.getValue() - a.getValue();
            }
            // Secondary: lexicographical order (ascending for same frequency)
            return a.getKey().compareTo(b.getKey());
        });
        
        // Extract top k elements
        List<String> result = new ArrayList<>();
        for (int i = 0; i < k; i++) {
            result.add(entries.get(i).getKey());
        }
        
        return result;
    }
    
    /**
     * Visualize the frequency counting and heap operations
     */
    public static void visualizeTopK(String[] words, int k) {
        System.out.println("Original words: " + Arrays.toString(words));
        System.out.println("k: " + k);
        
        // Count frequencies
        Map<String, Integer> frequencyMap = new HashMap<>();
        for (String word : words) {
            frequencyMap.put(word, frequencyMap.getOrDefault(word, 0) + 1);
        }
        
        System.out.println("Frequency map: " + frequencyMap);
        
        // Min heap approach
        PriorityQueue<Map.Entry<String, Integer>> minHeap = 
            new PriorityQueue<>((a, b) -> {
                if (!a.getValue().equals(b.getValue())) {
                    return a.getValue() - b.getValue();
                }
                return b.getKey().compareTo(a.getKey());
            });
        
        for (Map.Entry<String, Integer> entry : frequencyMap.entrySet()) {
            minHeap.add(entry);
            if (minHeap.size() > k) {
                Map.Entry<String, Integer> removed = minHeap.poll();
                System.out.println("Removed: " + removed.getKey() + " (freq: " + removed.getValue() + ")");
            }
        }
        
        System.out.println("Final heap size: " + minHeap.size());
        
        // Extract result
        List<String> result = new ArrayList<>();
        for (int i = k - 1; i >= 0; i--) {
            result.add(0, minHeap.poll().getKey());
        }
        
        System.out.println("Result: " + result);
    }
    
    // Test cases
    public static void main(String[] args) {
        System.out.println("=== Top K Frequent Words Problem ===\n");
        
        // Test case 1
        String[] words1 = {"i", "love", "leetcode", "i", "love", "coding"};
        int k1 = 2;
        System.out.println("Test Case 1:");
        System.out.println("Input: words = " + Arrays.toString(words1) + ", k = " + k1);
        System.out.println("Expected: [i, love]");
        System.out.println("Min Heap Output: " + topKFrequent(words1, k1));
        System.out.println("Max Heap Output: " + topKFrequentMaxHeap(words1, k1));
        System.out.println("Bucket Sort Output: " + topKFrequentBucketSort(words1, k1));
        System.out.println("Sort Output: " + topKFrequentSort(words1, k1));
        System.out.println();
        
        // Test case 2
        String[] words2 = {"the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"};
        int k2 = 4;
        System.out.println("Test Case 2:");
        System.out.println("Input: words = " + Arrays.toString(words2) + ", k = " + k2);
        System.out.println("Expected: [the, is, sunny, day]");
        System.out.println("Min Heap Output: " + topKFrequent(words2, k2));
        System.out.println("Max Heap Output: " + topKFrequentMaxHeap(words2, k2));
        System.out.println("Bucket Sort Output: " + topKFrequentBucketSort(words2, k2));
        System.out.println("Sort Output: " + topKFrequentSort(words2, k2));
        System.out.println();
        
        // Test case 3
        String[] words3 = {"a", "b", "c", "a", "b", "a"};
        int k3 = 3;
        System.out.println("Test Case 3:");
        System.out.println("Input: words = " + Arrays.toString(words3) + ", k = " + k3);
        System.out.println("Expected: [a, b, c]");
        System.out.println("Min Heap Output: " + topKFrequent(words3, k3));
        System.out.println("Max Heap Output: " + topKFrequentMaxHeap(words3, k3));
        System.out.println("Bucket Sort Output: " + topKFrequentBucketSort(words3, k3));
        System.out.println("Sort Output: " + topKFrequentSort(words3, k3));
        System.out.println();
        
        // Visualization
        System.out.println("=== Visualization ===");
        visualizeTopK(words1, k1);
    }
} 