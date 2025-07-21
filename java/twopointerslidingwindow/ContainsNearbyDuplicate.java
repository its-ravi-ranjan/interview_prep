import java.util.*;

/**
 * Contains Duplicate II
 * 
 * Problem: Given an integer array nums and an integer k, return true if there are 
 * two distinct indices i and j in the array such that nums[i] == nums[j] and 
 * abs(i - j) <= k.
 * 
 * Example 1:
 * Input: nums = [1,2,3,1], k = 3
 * Output: true
 * Explanation: nums[0] == nums[3] and abs(0 - 3) = 3 <= k
 * 
 * Approach: Sliding Window with HashSet
 * 1. Use a HashSet to maintain a sliding window of size k+1
 * 2. For each element, check if it already exists in the window
 * 3. If found, return true (duplicate within k distance)
 * 4. Add current element to window and remove oldest if window size exceeds k+1
 * 5. If no duplicates found, return false
 * 
 * Time Complexity: O(n) where n is the length of array nums
 * Space Complexity: O(min(k, n)) since we store at most k+1 elements in the set
 */
public class ContainsNearbyDuplicate {
    
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        Set<Integer> window = new HashSet<>();
        
        for (int i = 0; i < nums.length; i++) {
            // Check if current element already exists in window
            if (window.contains(nums[i])) {
                return true;
            }
            
            // Add current element to window
            window.add(nums[i]);
            
            // Remove oldest element if window size exceeds k+1
            if (window.size() > k) {
                window.remove(nums[i - k]);
            }
        }
        
        return false;
    }
    
    // Alternative approach using HashMap to track indices
    public boolean containsNearbyDuplicateWithMap(int[] nums, int k) {
        Map<Integer, Integer> numToIndex = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            // Check if we've seen this number before
            if (numToIndex.containsKey(nums[i])) {
                int prevIndex = numToIndex.get(nums[i]);
                // Check if the distance is within k
                if (i - prevIndex <= k) {
                    return true;
                }
            }
            
            // Update the index for current number
            numToIndex.put(nums[i], i);
        }
        
        return false;
    }
    
    // Alternative approach using sliding window with explicit window management
    public boolean containsNearbyDuplicateSlidingWindow(int[] nums, int k) {
        if (nums == null || nums.length <= 1 || k < 0) {
            return false;
        }
        
        Set<Integer> window = new HashSet<>();
        int left = 0;
        
        for (int right = 0; right < nums.length; right++) {
            // Check if current element exists in window
            if (window.contains(nums[right])) {
                return true;
            }
            
            // Add current element to window
            window.add(nums[right]);
            
            // Maintain window size of k+1
            if (right - left >= k) {
                window.remove(nums[left]);
                left++;
            }
        }
        
        return false;
    }
    
    // Alternative approach using array for small k values (optimization)
    public boolean containsNearbyDuplicateOptimized(int[] nums, int k) {
        if (nums == null || nums.length <= 1 || k < 0) {
            return false;
        }
        
        // For very small k, we can use a simple array approach
        if (k <= 10) {
            return containsNearbyDuplicateSmallK(nums, k);
        }
        
        // For larger k, use HashSet approach
        return containsNearbyDuplicate(nums, k);
    }
    
    private boolean containsNearbyDuplicateSmallK(int[] nums, int k) {
        for (int i = 0; i < nums.length; i++) {
            // Check elements within k distance
            for (int j = Math.max(0, i - k); j < i; j++) {
                if (nums[i] == nums[j]) {
                    return true;
                }
            }
        }
        return false;
    }
    
    public static void main(String[] args) {
        ContainsNearbyDuplicate solution = new ContainsNearbyDuplicate();
        
        // Test Case 1
        System.out.println("Test Case 1:");
        int[] nums1 = {1, 2, 3, 1};
        int k1 = 3;
        boolean result1 = solution.containsNearbyDuplicate(nums1, k1);
        System.out.println("Input: nums = " + Arrays.toString(nums1) + ", k = " + k1);
        System.out.println("Output: " + result1);
        System.out.println("Expected: true");
        System.out.println();
        
        // Test Case 2
        System.out.println("Test Case 2:");
        int[] nums2 = {1, 0, 1, 1};
        int k2 = 1;
        boolean result2 = solution.containsNearbyDuplicate(nums2, k2);
        System.out.println("Input: nums = " + Arrays.toString(nums2) + ", k = " + k2);
        System.out.println("Output: " + result2);
        System.out.println("Expected: true");
        System.out.println();
        
        // Test Case 3
        System.out.println("Test Case 3:");
        int[] nums3 = {1, 2, 3, 1, 2, 3};
        int k3 = 2;
        boolean result3 = solution.containsNearbyDuplicate(nums3, k3);
        System.out.println("Input: nums = " + Arrays.toString(nums3) + ", k = " + k3);
        System.out.println("Output: " + result3);
        System.out.println("Expected: false");
        System.out.println();
        
        // Test Case 4 - Single element
        System.out.println("Test Case 4:");
        int[] nums4 = {1};
        int k4 = 1;
        boolean result4 = solution.containsNearbyDuplicate(nums4, k4);
        System.out.println("Input: nums = " + Arrays.toString(nums4) + ", k = " + k4);
        System.out.println("Output: " + result4);
        System.out.println("Expected: false");
        System.out.println();
        
        // Test Case 5 - k = 0
        System.out.println("Test Case 5:");
        int[] nums5 = {1, 2, 3, 1};
        int k5 = 0;
        boolean result5 = solution.containsNearbyDuplicate(nums5, k5);
        System.out.println("Input: nums = " + Arrays.toString(nums5) + ", k = " + k5);
        System.out.println("Output: " + result5);
        System.out.println("Expected: false");
        System.out.println();
        
        // Test Case 6 - Large k
        System.out.println("Test Case 6:");
        int[] nums6 = {1, 2, 3, 4, 5, 6, 7, 8, 9, 1};
        int k6 = 10;
        boolean result6 = solution.containsNearbyDuplicate(nums6, k6);
        System.out.println("Input: nums = " + Arrays.toString(nums6) + ", k = " + k6);
        System.out.println("Output: " + result6);
        System.out.println("Expected: true");
        System.out.println();
        
        // Test Case 7 - All same elements
        System.out.println("Test Case 7:");
        int[] nums7 = {1, 1, 1, 1};
        int k7 = 2;
        boolean result7 = solution.containsNearbyDuplicate(nums7, k7);
        System.out.println("Input: nums = " + Arrays.toString(nums7) + ", k = " + k7);
        System.out.println("Output: " + result7);
        System.out.println("Expected: true");
        System.out.println();
        
        // Test Case 8 - Edge case with k larger than array length
        System.out.println("Test Case 8:");
        int[] nums8 = {1, 2, 3};
        int k8 = 5;
        boolean result8 = solution.containsNearbyDuplicate(nums8, k8);
        System.out.println("Input: nums = " + Arrays.toString(nums8) + ", k = " + k8);
        System.out.println("Output: " + result8);
        System.out.println("Expected: false");
        System.out.println();
        
        // Performance comparison
        System.out.println("Performance Comparison:");
        int[] largeNums = new int[10000];
        for (int i = 0; i < largeNums.length; i++) {
            largeNums[i] = i % 100; // Creates some duplicates
        }
        int largeK = 100;
        
        long startTime = System.currentTimeMillis();
        boolean result9 = solution.containsNearbyDuplicate(largeNums, largeK);
        long endTime = System.currentTimeMillis();
        System.out.println("HashSet approach time: " + (endTime - startTime) + "ms, Result: " + result9);
        
        startTime = System.currentTimeMillis();
        boolean result10 = solution.containsNearbyDuplicateWithMap(largeNums, largeK);
        endTime = System.currentTimeMillis();
        System.out.println("HashMap approach time: " + (endTime - startTime) + "ms, Result: " + result10);
        
        startTime = System.currentTimeMillis();
        boolean result11 = solution.containsNearbyDuplicateSlidingWindow(largeNums, largeK);
        endTime = System.currentTimeMillis();
        System.out.println("Sliding window approach time: " + (endTime - startTime) + "ms, Result: " + result11);
        
        startTime = System.currentTimeMillis();
        boolean result12 = solution.containsNearbyDuplicateOptimized(largeNums, largeK);
        endTime = System.currentTimeMillis();
        System.out.println("Optimized approach time: " + (endTime - startTime) + "ms, Result: " + result12);
        
        // Verify all approaches give same result
        System.out.println("\nVerification:");
        System.out.println("All approaches give same result: " + 
            (result9 == result10 && result10 == result11 && result11 == result12));
        
        // Test with small k for optimized approach
        System.out.println("\nTesting optimized approach with small k:");
        int[] smallKNums = {1, 2, 3, 1, 2, 3};
        int smallK = 2;
        boolean result13 = solution.containsNearbyDuplicateOptimized(smallKNums, smallK);
        System.out.println("Small k test: " + result13 + " (Expected: false)");
    }
} 