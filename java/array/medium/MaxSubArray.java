/**
 * Maximum Subarray (Kadane's Algorithm)
 * 
 * Problem: Given an integer array nums, find the subarray with the largest sum, and return its sum.
 * 
 * Example 1:
 * Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 * Explanation: The subarray [4,-1,2,1] has the largest sum 6.
 * 
 * Example 2:
 * Input: nums = [1]
 * Output: 1
 * 
 * Example 3:
 * Input: nums = [5,4,-1,7,8]
 * Output: 23
 * 
 * Approach (Kadane's Algorithm):
 * 1. Initialize maxSum and currentSum to the first element
 * 2. Iterate through the array starting from index 1
 * 3. For each element, decide whether to:
 *    - Start a new subarray from current element (nums[i])
 *    - Extend the existing subarray (currentSum + nums[i])
 * 4. Update maxSum if currentSum becomes larger
 * 5. Return maxSum
 * 
 * Key Insight: At each step, we decide whether to continue the current subarray
 * or start a new one from the current element.
 * 
 * Time Complexity: O(n), where n is the length of the array
 * Space Complexity: O(1), only using a constant amount of extra space
 */

import java.util.*;

public class MaxSubArray {
    
    /**
     * Find the maximum subarray sum using Kadane's Algorithm
     * @param nums Array of integers
     * @return Maximum subarray sum
     */
    public static int maxSubArray(int[] nums) {
        if (nums.length == 0) return 0;
        
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            // Decide whether to start a new subarray or extend the current one
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            // Update the maximum sum found so far
            maxSum = Math.max(maxSum, currentSum);
        }
        
        return maxSum;
    }
    
    /**
     * Alternative approach: More explicit version for better understanding
     * @param nums Array of integers
     * @return Maximum subarray sum
     */
    public static int maxSubArrayAlternative(int[] nums) {
        if (nums.length == 0) return 0;
        
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            // If currentSum becomes negative, start fresh from current element
            if (currentSum < 0) {
                currentSum = nums[i];
            } else {
                // Otherwise, extend the current subarray
                currentSum += nums[i];
            }
            
            // Update maxSum if we found a better sum
            if (currentSum > maxSum) {
                maxSum = currentSum;
            }
        }
        
        return maxSum;
    }
    
    /**
     * Brute Force Approach (for comparison)
     * Time Complexity: O(n²)
     * Space Complexity: O(1)
     * @param nums Array of integers
     * @return Maximum subarray sum
     */
    public static int maxSubArrayBruteForce(int[] nums) {
        if (nums.length == 0) return 0;
        
        int maxSum = nums[0];
        
        // Try all possible subarrays
        for (int start = 0; start < nums.length; start++) {
            int currentSum = 0;
            for (int end = start; end < nums.length; end++) {
                currentSum += nums[end];
                maxSum = Math.max(maxSum, currentSum);
            }
        }
        
        return maxSum;
    }
    
    /**
     * Find maximum subarray with indices (returns both sum and subarray)
     * @param nums Array of integers
     * @return Array containing [maxSum, startIndex, endIndex]
     */
    public static int[] maxSubArrayWithIndices(int[] nums) {
        if (nums.length == 0) return new int[]{0, -1, -1};
        
        int maxSum = nums[0];
        int currentSum = nums[0];
        int start = 0;
        int end = 0;
        int currentStart = 0;
        
        for (int i = 1; i < nums.length; i++) {
            if (currentSum < 0) {
                currentSum = nums[i];
                currentStart = i;
            } else {
                currentSum += nums[i];
            }
            
            if (currentSum > maxSum) {
                maxSum = currentSum;
                start = currentStart;
                end = i;
            }
        }
        
        return new int[]{maxSum, start, end};
    }
    
    // Test cases
    public static void runTests() {
        System.out.println("=== Maximum Subarray Tests ===");
        
        int[][][] testCases = {
            {
                {-2, 1, -3, 4, -1, 2, 1, -5, 4},
                {6},
                {"Standard case with positive and negative numbers"}
            },
            {
                {1},
                {1},
                {"Single element array"}
            },
            {
                {5, 4, -1, 7, 8},
                {23},
                {"All positive numbers"}
            },
            {
                {-1, -2, -3, -4},
                {-1},
                {"All negative numbers"}
            },
            {
                {0, 0, 0, 0},
                {0},
                {"All zeros"}
            },
            {
                {1, 2, 3, 4, 5},
                {15},
                {"Increasing positive numbers"}
            },
            {
                {-5, -4, -3, -2, -1},
                {-1},
                {"Increasing negative numbers"}
            },
            {
                {2, -1, 3, -2, 4, -3},
                {6},
                {"Alternating positive and negative"}
            }
        };
        
        for (int i = 0; i < testCases.length; i++) {
            int[] input = testCases[i][0];
            int expected = testCases[i][1][0];
            String description = testCases[i][2][0];
            
            int result = maxSubArray(input);
            String status = result == expected ? "PASS" : "FAIL";
            
            System.out.println("Test " + (i + 1) + ": " + status + " - " + description);
            System.out.println("  Input: " + Arrays.toString(input));
            System.out.println("  Expected: " + expected + ", Got: " + result);
            System.out.println();
        }
    }
    
    // Performance comparison
    public static void performanceTest() {
        System.out.println("=== Performance Comparison ===");
        
        // Create a large array for testing
        int[] largeArray = new int[10000];
        Random random = new Random();
        for (int i = 0; i < largeArray.length; i++) {
            largeArray[i] = random.nextInt(201) - 100; // Random numbers between -100 and 100
        }
        
        System.out.println("Testing with array of size: " + largeArray.length);
        
        // Test Kadane's Algorithm
        long start1 = System.nanoTime();
        int result1 = maxSubArray(largeArray);
        long end1 = System.nanoTime();
        System.out.println("Kadane's Algorithm: " + result1 + " (" + (end1 - start1) / 1000000.0 + "ms)");
        
        // Test Alternative Approach
        long start2 = System.nanoTime();
        int result2 = maxSubArrayAlternative(largeArray);
        long end2 = System.nanoTime();
        System.out.println("Alternative Approach: " + result2 + " (" + (end2 - start2) / 1000000.0 + "ms)");
        
        // Test Brute Force (only for small arrays due to O(n²) complexity)
        int[] smallArray = Arrays.copyOf(largeArray, 100);
        long start3 = System.nanoTime();
        int result3 = maxSubArrayBruteForce(smallArray);
        long end3 = System.nanoTime();
        System.out.println("Brute Force (100 elements): " + result3 + " (" + (end3 - start3) / 1000000.0 + "ms)");
    }
    
    // Dry run demonstration
    public static void dryRun() {
        System.out.println("=== Dry Run Demonstration ===");
        
        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println("Input array: " + Arrays.toString(nums));
        System.out.println();
        
        int maxSum = nums[0]; // -2
        int currentSum = nums[0]; // -2
        
        System.out.println("Initial: maxSum = " + maxSum + ", currentSum = " + currentSum);
        
        for (int i = 1; i < nums.length; i++) {
            int num = nums[i];
            int oldCurrentSum = currentSum;
            
            currentSum = Math.max(num, currentSum + num);
            maxSum = Math.max(currentSum, maxSum);
            
            System.out.println("Step " + i + ": num = " + num);
            System.out.println("  currentSum = max(" + num + ", " + oldCurrentSum + " + " + num + ") = max(" + num + ", " + (oldCurrentSum + num) + ") = " + currentSum);
            System.out.println("  maxSum = max(" + currentSum + ", " + maxSum + ") = " + maxSum);
            System.out.println();
        }
        
        System.out.println("Final result: " + maxSum);
    }
    
    // Edge cases demonstration
    public static void edgeCases() {
        System.out.println("=== Edge Cases ===");
        
        int[][][] edgeCases = {
            {{}, {0}, {"Empty array"}},
            {{5}, {5}, {"Single positive"}},
            {{-3}, {-3}, {"Single negative"}},
            {{1, -2}, {1}, {"Two elements"}},
            {{2, 2, 2, 2}, {8}, {"All same positive"}},
            {{-1, -1, -1, -1}, {-1}, {"All same negative"}}
        };
        
        for (int[][] testCase : edgeCases) {
            int[] input = testCase[0];
            int expected = testCase[1][0];
            String name = testCase[2][0];
            
            int result = maxSubArray(input);
            System.out.println(name + ": " + Arrays.toString(input) + " → " + result);
        }
    }
    
    // Demonstrate finding subarray with indices
    public static void demonstrateWithIndices() {
        System.out.println("\n=== Finding Subarray with Indices ===");
        
        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println("Input array: " + Arrays.toString(nums));
        
        int[] result = maxSubArrayWithIndices(nums);
        int maxSum = result[0];
        int start = result[1];
        int end = result[2];
        
        System.out.println("Maximum sum: " + maxSum);
        System.out.println("Subarray indices: [" + start + ", " + end + "]");
        
        // Extract and display the subarray
        System.out.print("Subarray: [");
        for (int i = start; i <= end; i++) {
            System.out.print(nums[i]);
            if (i < end) System.out.print(", ");
        }
        System.out.println("]");
        
        // Verify the sum
        int sum = 0;
        for (int i = start; i <= end; i++) {
            sum += nums[i];
        }
        System.out.println("Verification: sum of subarray = " + sum);
    }
    
    public static void main(String[] args) {
        runTests();
        performanceTest();
        System.out.println();
        dryRun();
        System.out.println();
        edgeCases();
        demonstrateWithIndices();
    }
} 