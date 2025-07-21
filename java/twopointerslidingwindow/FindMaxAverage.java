/**
 * Maximum Average Subarray I
 * 
 * Problem: You are given an integer array nums consisting of n elements, and an integer k.
 * Find a contiguous subarray whose length is equal to k that has the maximum average 
 * value and return this value. Any answer with a calculation error less than 10^-5 
 * will be accepted.
 * 
 * Example 1:
 * Input: nums = [1,12,-5,-6,50,3], k = 4
 * Output: 12.75000
 * Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
 * 
 * Approach: Sliding Window with Sum Tracking
 * 1. Calculate the sum of the first k elements
 * 2. Slide the window by adding the next element and removing the first element
 * 3. Calculate average for each window and track the maximum
 * 4. Return the maximum average found
 * 
 * Time Complexity: O(n) where n is the length of array nums
 * Space Complexity: O(1) since we only use a few variables
 */
public class FindMaxAverage {
    
    public double findMaxAverage(int[] nums, int k) {
        double maxAvg = Integer.MIN_VALUE;
        int windowSum = 0;

        for (int i = 0; i < nums.length; i++) {
            if (i <= k - 1) {
                windowSum += nums[i];
            } else {
                double avg = (double) windowSum / k;
                maxAvg = Math.max(maxAvg, avg);
                windowSum -= nums[i - k];
                windowSum += nums[i];
            }
        }
        
        double avg = (double) windowSum / k;
        return Math.max(maxAvg, avg);
    }
    
    // Alternative approach using explicit sliding window
    public double findMaxAverageSlidingWindow(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0 || k > nums.length) {
            return 0.0;
        }
        
        // Calculate sum of first window
        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += nums[i];
        }
        
        double maxAvg = (double) windowSum / k;
        
        // Slide the window
        for (int i = k; i < nums.length; i++) {
            windowSum = windowSum - nums[i - k] + nums[i];
            double currentAvg = (double) windowSum / k;
            maxAvg = Math.max(maxAvg, currentAvg);
        }
        
        return maxAvg;
    }
    
    // Alternative approach using two pointers
    public double findMaxAverageTwoPointers(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0 || k > nums.length) {
            return 0.0;
        }
        
        int left = 0;
        int right = 0;
        int windowSum = 0;
        double maxAvg = Integer.MIN_VALUE;
        
        while (right < nums.length) {
            windowSum += nums[right];
            
            // When window size reaches k
            if (right - left + 1 == k) {
                double currentAvg = (double) windowSum / k;
                maxAvg = Math.max(maxAvg, currentAvg);
                windowSum -= nums[left];
                left++;
            }
            
            right++;
        }
        
        return maxAvg;
    }
    
    // Alternative approach using prefix sum (for educational purposes)
    public double findMaxAveragePrefixSum(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0 || k > nums.length) {
            return 0.0;
        }
        
        // Calculate prefix sum
        int[] prefixSum = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }
        
        double maxAvg = Integer.MIN_VALUE;
        
        // Find maximum average using prefix sum
        for (int i = k; i <= nums.length; i++) {
            int sum = prefixSum[i] - prefixSum[i - k];
            double avg = (double) sum / k;
            maxAvg = Math.max(maxAvg, avg);
        }
        
        return maxAvg;
    }
    
    // Alternative approach optimized for large numbers
    public double findMaxAverageOptimized(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0 || k > nums.length) {
            return 0.0;
        }
        
        // Use long to avoid integer overflow for large sums
        long windowSum = 0;
        
        // Calculate sum of first window
        for (int i = 0; i < k; i++) {
            windowSum += nums[i];
        }
        
        double maxAvg = (double) windowSum / k;
        
        // Slide the window
        for (int i = k; i < nums.length; i++) {
            windowSum = windowSum - nums[i - k] + nums[i];
            double currentAvg = (double) windowSum / k;
            maxAvg = Math.max(maxAvg, currentAvg);
        }
        
        return maxAvg;
    }
    
    public static void main(String[] args) {
        FindMaxAverage solution = new FindMaxAverage();
        
        // Test Case 1
        System.out.println("Test Case 1:");
        int[] nums1 = {1, 12, -5, -6, 50, 3};
        int k1 = 4;
        double result1 = solution.findMaxAverage(nums1, k1);
        System.out.println("Input: nums = [" + java.util.Arrays.toString(nums1).replace("[", "").replace("]", "") + "], k = " + k1);
        System.out.println("Output: " + result1);
        System.out.println("Expected: 12.75");
        System.out.println();
        
        // Test Case 2
        System.out.println("Test Case 2:");
        int[] nums2 = {5};
        int k2 = 1;
        double result2 = solution.findMaxAverage(nums2, k2);
        System.out.println("Input: nums = [" + java.util.Arrays.toString(nums2).replace("[", "").replace("]", "") + "], k = " + k2);
        System.out.println("Output: " + result2);
        System.out.println("Expected: 5.0");
        System.out.println();
        
        // Test Case 3
        System.out.println("Test Case 3:");
        int[] nums3 = {0, 1, 1, 3, 3};
        int k3 = 4;
        double result3 = solution.findMaxAverage(nums3, k3);
        System.out.println("Input: nums = [" + java.util.Arrays.toString(nums3).replace("[", "").replace("]", "") + "], k = " + k3);
        System.out.println("Output: " + result3);
        System.out.println("Expected: 2.0");
        System.out.println();
        
        // Test Case 4 - All negative numbers
        System.out.println("Test Case 4:");
        int[] nums4 = {-1, -2, -3, -4, -5};
        int k4 = 3;
        double result4 = solution.findMaxAverage(nums4, k4);
        System.out.println("Input: nums = [" + java.util.Arrays.toString(nums4).replace("[", "").replace("]", "") + "], k = " + k4);
        System.out.println("Output: " + result4);
        System.out.println("Expected: -2.0");
        System.out.println();
        
        // Test Case 5 - k equals array length
        System.out.println("Test Case 5:");
        int[] nums5 = {1, 2, 3, 4, 5};
        int k5 = 5;
        double result5 = solution.findMaxAverage(nums5, k5);
        System.out.println("Input: nums = [" + java.util.Arrays.toString(nums5).replace("[", "").replace("]", "") + "], k = " + k5);
        System.out.println("Output: " + result5);
        System.out.println("Expected: 3.0");
        System.out.println();
        
        // Test Case 6 - Large numbers
        System.out.println("Test Case 6:");
        int[] nums6 = {1000000, 2000000, 3000000, 4000000};
        int k6 = 2;
        double result6 = solution.findMaxAverage(nums6, k6);
        System.out.println("Input: nums = [" + java.util.Arrays.toString(nums6).replace("[", "").replace("]", "") + "], k = " + k6);
        System.out.println("Output: " + result6);
        System.out.println("Expected: 3500000.0");
        System.out.println();
        
        // Test Case 7 - Mixed positive and negative
        System.out.println("Test Case 7:");
        int[] nums7 = {-1, 5, -3, 10, -2, 8};
        int k7 = 3;
        double result7 = solution.findMaxAverage(nums7, k7);
        System.out.println("Input: nums = [" + java.util.Arrays.toString(nums7).replace("[", "").replace("]", "") + "], k = " + k7);
        System.out.println("Output: " + result7);
        System.out.println("Expected: 4.0");
        System.out.println();
        
        // Test Case 8 - All same numbers
        System.out.println("Test Case 8:");
        int[] nums8 = {3, 3, 3, 3, 3};
        int k8 = 3;
        double result8 = solution.findMaxAverage(nums8, k8);
        System.out.println("Input: nums = [" + java.util.Arrays.toString(nums8).replace("[", "").replace("]", "") + "], k = " + k8);
        System.out.println("Output: " + result8);
        System.out.println("Expected: 3.0");
        System.out.println();
        
        // Performance comparison
        System.out.println("Performance Comparison:");
        int[] largeNums = new int[100000];
        for (int i = 0; i < largeNums.length; i++) {
            largeNums[i] = (int) (Math.random() * 10000) - 5000; // Random numbers between -5000 and 5000
        }
        int largeK = 1000;
        
        long startTime = System.currentTimeMillis();
        double result9 = solution.findMaxAverage(largeNums, largeK);
        long endTime = System.currentTimeMillis();
        System.out.println("Basic approach time: " + (endTime - startTime) + "ms, Result: " + result9);
        
        startTime = System.currentTimeMillis();
        double result10 = solution.findMaxAverageSlidingWindow(largeNums, largeK);
        endTime = System.currentTimeMillis();
        System.out.println("Sliding window approach time: " + (endTime - startTime) + "ms, Result: " + result10);
        
        startTime = System.currentTimeMillis();
        double result11 = solution.findMaxAverageTwoPointers(largeNums, largeK);
        endTime = System.currentTimeMillis();
        System.out.println("Two pointers approach time: " + (endTime - startTime) + "ms, Result: " + result11);
        
        startTime = System.currentTimeMillis();
        double result12 = solution.findMaxAveragePrefixSum(largeNums, largeK);
        endTime = System.currentTimeMillis();
        System.out.println("Prefix sum approach time: " + (endTime - startTime) + "ms, Result: " + result12);
        
        startTime = System.currentTimeMillis();
        double result13 = solution.findMaxAverageOptimized(largeNums, largeK);
        endTime = System.currentTimeMillis();
        System.out.println("Optimized approach time: " + (endTime - startTime) + "ms, Result: " + result13);
        
        // Verify all approaches give same result (within precision)
        System.out.println("\nVerification:");
        boolean allSame = Math.abs(result9 - result10) < 1e-10 && 
                         Math.abs(result10 - result11) < 1e-10 && 
                         Math.abs(result11 - result12) < 1e-10 &&
                         Math.abs(result12 - result13) < 1e-10;
        System.out.println("All approaches give same result: " + allSame);
        
        // Test edge cases
        System.out.println("\nEdge Cases:");
        
        // Empty array
        System.out.println("Empty array: " + solution.findMaxAverage(new int[]{}, 1));
        
        // Null array
        System.out.println("Null array: " + solution.findMaxAverage(null, 1));
        
        // k larger than array length
        System.out.println("k larger than array length: " + solution.findMaxAverage(new int[]{1, 2, 3}, 5));
        
        // k = 0
        System.out.println("k = 0: " + solution.findMaxAverage(new int[]{1, 2, 3}, 0));
    }
} 