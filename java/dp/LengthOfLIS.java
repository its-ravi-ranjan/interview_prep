/**
 * LONGEST INCREASING SUBSEQUENCE (LIS) - DYNAMIC PROGRAMMING PROBLEM
 * 
 * 🎯 PROBLEM STATEMENT:
 * Given an integer array nums, return the length of the longest strictly 
 * increasing subsequence.
 * 
 * 📝 EXAMPLES:
 * Input: nums = [10,9,2,5,3,7,101,18]
 * Output: 4
 * Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
 * 
 * Input: nums = [0,1,0,3,2,3]
 * Output: 4
 * Explanation: The longest increasing subsequence is [0,1,2,3].
 * 
 * 🔍 PATTERN RECOGNITION:
 * This is a classic Dynamic Programming problem!
 * - For each element, check all previous elements
 * - If current element is greater, extend the subsequence
 * - Track maximum length ending at each position
 * 
 * 🎯 KEY INSIGHT:
 * dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]
 * Final answer is max(dp[0...n-1])
 */

import java.util.Arrays;

public class LengthOfLIS {
    
    public static void main(String[] args) {
        System.out.println("=== LONGEST INCREASING SUBSEQUENCE ===");
        
        int[][] testCases = {
            {10, 9, 2, 5, 3, 7, 101, 18},  // Expected: 4
            {0, 1, 0, 3, 2, 3},            // Expected: 4
            {7, 7, 7, 7, 7, 7, 7},         // Expected: 1
            {1},                           // Expected: 1
            {3, 1, 4, 1, 5, 9, 2, 6},      // Expected: 4
            {1, 2, 3, 4, 5},               // Expected: 5
            {5, 4, 3, 2, 1},               // Expected: 1
            {}                             // Expected: 0
        };
        
        for (int i = 0; i < testCases.length; i++) {
            int[] nums = testCases[i];
            System.out.println("\n--- Test Case " + (i + 1) + " ---");
            System.out.println("Input: " + arrayToString(nums));
            
            // Approach 1: Iterative (Standard DP)
            long startTime = System.nanoTime();
            int result1 = lengthOfLISIterative(nums);
            long endTime = System.nanoTime();
            System.out.println("Iterative: " + result1 + " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            // Approach 2: Recursive with Memoization
            startTime = System.nanoTime();
            int result2 = lengthOfLISMemoization(nums);
            endTime = System.nanoTime();
            System.out.println("Memoization: " + result2 + " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            // Approach 3: Binary Search (Optimized)
            startTime = System.nanoTime();
            int result3 = lengthOfLISBinarySearch(nums);
            endTime = System.nanoTime();
            System.out.println("Binary Search: " + result3 + " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            if (result1 == result2 && result2 == result3) {
                System.out.println("✅ All approaches agree!");
            } else {
                System.out.println("❌ Results don't match!");
            }
        }
    }
    
    // ==================== APPROACH 1: ITERATIVE (STANDARD DP) ====================
    /**
     * 🎯 APPROACH: Iterative with DP Array
     * 
     * 💡 IDEA: 
     * - Initialize dp array with 1 (each element is a subsequence of length 1)
     * - For each element, check all previous elements
     * - If current element is greater, extend the subsequence
     * - Take maximum of all possible extensions
     * 
     * ⏰ TIME COMPLEXITY: O(n²)
     * 🏠 SPACE COMPLEXITY: O(n)
     */
    public static int lengthOfLISIterative(int[] nums) {
        if (nums.length == 0) return 0;
        
        int n = nums.length;
        int[] dp = new int[n];
        Arrays.fill(dp, 1);  // Each element is a subsequence of length 1
        
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
        }
        
        // Find maximum value in dp array
        int maxCount = 0;
        for (int d : dp) {
            maxCount = Math.max(maxCount, d);
        }
        
        return maxCount;
    }
    
    // ==================== APPROACH 2: RECURSIVE WITH MEMOIZATION ====================
    /**
     * 🎯 APPROACH: Recursive with Memoization
     * 
     * 💡 IDEA:
     * - Use recursion to find LIS ending at each position
     * - Cache results to avoid recalculating
     * - Try all possible previous elements
     * 
     * ⏰ TIME COMPLEXITY: O(n²)
     * 🏠 SPACE COMPLEXITY: O(n)
     */
    public static int lengthOfLISMemoization(int[] nums) {
        if (nums.length == 0) return 0;
        
        int n = nums.length;
        Integer[] memo = new Integer[n];
        
        int maxLength = 0;
        for (int i = 0; i < n; i++) {
            maxLength = Math.max(maxLength, helper(nums, i, memo));
        }
        
        return maxLength;
    }
    
    private static int helper(int[] nums, int index, Integer[] memo) {
        if (memo[index] != null) return memo[index];
        
        int maxLength = 1;  // Current element is a subsequence of length 1
        
        for (int i = 0; i < index; i++) {
            if (nums[i] < nums[index]) {
                maxLength = Math.max(maxLength, helper(nums, i, memo) + 1);
            }
        }
        
        memo[index] = maxLength;
        return maxLength;
    }
    
    // ==================== APPROACH 3: BINARY SEARCH (OPTIMIZED) ====================
    /**
     * 🎯 APPROACH: Binary Search with Patience Sorting
     * 
     * 💡 IDEA:
     * - Use binary search to find insertion position
     * - Maintain array of smallest tail values for each length
     * - Replace or append based on binary search result
     * 
     * ⏰ TIME COMPLEXITY: O(n log n)
     * 🏠 SPACE COMPLEXITY: O(n)
     */
    public static int lengthOfLISBinarySearch(int[] nums) {
        if (nums.length == 0) return 0;
        
        int n = nums.length;
        int[] tails = new int[n];
        int length = 0;
        
        for (int num : nums) {
            int index = binarySearch(tails, 0, length, num);
            tails[index] = num;
            if (index == length) {
                length++;
            }
        }
        
        return length;
    }
    
    private static int binarySearch(int[] tails, int left, int right, int target) {
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (tails[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
    
    // ==================== UTILITY METHODS ====================
    private static String arrayToString(int[] nums) {
        if (nums.length == 0) return "[]";
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < nums.length; i++) {
            sb.append(nums[i]);
            if (i < nums.length - 1) sb.append(", ");
        }
        sb.append("]");
        return sb.toString();
    }
    
    /**
     * 📊 COMPARISON OF APPROACHES:
     * 
     * 1. ITERATIVE (STANDARD):
     *    ✅ Time: O(n²), Space: O(n)
     *    ✅ Simple to understand and implement
     *    ✅ Good for interviews
     * 
     * 2. MEMOIZATION:
     *    ✅ Time: O(n²), Space: O(n)
     *    ✅ Good for understanding recursion
     *    ✅ Same complexity as iterative
     * 
     * 3. BINARY SEARCH (OPTIMIZED):
     *    ✅ Time: O(n log n), Space: O(n)
     *    ✅ Most efficient for large inputs
     *    ✅ Uses patience sorting concept
     * 
     * 🎯 INTERVIEW ANSWER: "This is a classic DP problem. For each element, 
     * check all previous elements and extend the subsequence if possible. 
     * Standard approach has O(n²) time and O(n) space. Binary search 
     * optimization gives O(n log n) time."
     */
} 