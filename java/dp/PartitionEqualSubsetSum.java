/**
 * PARTITION EQUAL SUBSET SUM - DYNAMIC PROGRAMMING PROBLEM
 * 
 * 🎯 PROBLEM STATEMENT:
 * Given an integer array nums, return true if you can partition the array into 
 * two subsets such that the sum of the elements in both subsets is equal.
 * 
 * 📝 EXAMPLES:
 * Input: nums = [1,5,11,5]
 * Output: true
 * Explanation: The array can be partitioned as [1, 5, 5] and [11].
 * 
 * Input: nums = [1,2,3,5]
 * Output: false
 * Explanation: The array cannot be partitioned into equal sum subsets.
 * 
 * 🔍 PATTERN RECOGNITION:
 * This is a 0/1 Knapsack problem in disguise!
 * - Find if we can select some elements that sum to totalSum/2
 * - If totalSum is odd, return false immediately
 * - Use DP to check if target sum is achievable
 * 
 * 🎯 KEY INSIGHT:
 * If we can find a subset that sums to totalSum/2, the remaining elements 
 * will also sum to totalSum/2, giving us equal partitions.
 */

public class PartitionEqualSubsetSum {
    
    public static void main(String[] args) {
        System.out.println("=== PARTITION EQUAL SUBSET SUM ===");
        
        int[][] testCases = {
            {1, 5, 11, 5},     // Expected: true
            {1, 2, 3, 5},      // Expected: false
            {1, 2, 3, 4, 5, 6, 7}, // Expected: true
            {1, 1, 1, 1},      // Expected: true
            {1, 2},            // Expected: false
            {1, 1},            // Expected: true
            {1},               // Expected: false
            {}                 // Expected: false
        };
        
        for (int i = 0; i < testCases.length; i++) {
            int[] nums = testCases[i];
            System.out.println("\n--- Test Case " + (i + 1) + " ---");
            System.out.println("Input: " + arrayToString(nums));
            
            // Approach 1: Iterative (Space Optimized)
            long startTime = System.nanoTime();
            boolean result1 = canPartitionIterative(nums);
            long endTime = System.nanoTime();
            System.out.println("Iterative: " + result1 + " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            // Approach 2: Recursive with Memoization
            startTime = System.nanoTime();
            boolean result2 = canPartitionMemoization(nums);
            endTime = System.nanoTime();
            System.out.println("Memoization: " + result2 + " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            // Approach 3: Tabulation
            startTime = System.nanoTime();
            boolean result3 = canPartitionTabulation(nums);
            endTime = System.nanoTime();
            System.out.println("Tabulation: " + result3 + " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            if (result1 == result2 && result2 == result3) {
                System.out.println("✅ All approaches agree!");
            } else {
                System.out.println("❌ Results don't match!");
            }
        }
    }
    
    // ==================== APPROACH 1: ITERATIVE (SPACE OPTIMIZED) ====================
    /**
     * 🎯 APPROACH: Iterative with Boolean Array
     * 
     * 💡 IDEA: 
     * - Calculate total sum, if odd return false
     * - Use boolean array to track achievable sums
     * - For each number, update all achievable sums
     * 
     * ⏰ TIME COMPLEXITY: O(n * target)
     * 🏠 SPACE COMPLEXITY: O(target)
     */
    public static boolean canPartitionIterative(int[] nums) {
        int totalSum = 0;
        for (int num : nums) totalSum += num;
        
        if (totalSum % 2 != 0) return false;
        
        int target = totalSum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        
        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }
        
        return dp[target];
    }
    
    // ==================== APPROACH 2: RECURSIVE WITH MEMOIZATION ====================
    /**
     * 🎯 APPROACH: Recursive with Memoization
     * 
     * 💡 IDEA:
     * - Use recursion to try including/excluding each element
     * - Cache results to avoid recalculating
     * 
     * ⏰ TIME COMPLEXITY: O(n * target)
     * 🏠 SPACE COMPLEXITY: O(n * target)
     */
    public static boolean canPartitionMemoization(int[] nums) {
        int totalSum = 0;
        for (int num : nums) totalSum += num;
        
        if (totalSum % 2 != 0) return false;
        
        int target = totalSum / 2;
        Boolean[][] memo = new Boolean[nums.length][target + 1];
        
        return helper(nums, 0, target, memo);
    }
    
    private static boolean helper(int[] nums, int index, int target, Boolean[][] memo) {
        if (target == 0) return true;
        if (index >= nums.length || target < 0) return false;
        
        if (memo[index][target] != null) return memo[index][target];
        
        memo[index][target] = helper(nums, index + 1, target, memo) || 
                              helper(nums, index + 1, target - nums[index], memo);
        
        return memo[index][target];
    }
    
    // ==================== APPROACH 3: TABULATION ====================
    /**
     * 🎯 APPROACH: Tabulation (Bottom-up DP)
     * 
     * 💡 IDEA:
     * - Build solution from base cases up to target
     * - Use 2D array to track all possible states
     * 
     * ⏰ TIME COMPLEXITY: O(n * target)
     * 🏠 SPACE COMPLEXITY: O(n * target)
     */
    public static boolean canPartitionTabulation(int[] nums) {
        int totalSum = 0;
        for (int num : nums) totalSum += num;
        
        if (totalSum % 2 != 0) return false;
        
        int target = totalSum / 2;
        boolean[][] dp = new boolean[nums.length + 1][target + 1];
        
        // Base case: empty subset can achieve sum 0
        for (int i = 0; i <= nums.length; i++) {
            dp[i][0] = true;
        }
        
        for (int i = 1; i <= nums.length; i++) {
            for (int j = 1; j <= target; j++) {
                dp[i][j] = dp[i - 1][j];  // Don't include current element
                if (j >= nums[i - 1]) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j - nums[i - 1]];  // Include current element
                }
            }
        }
        
        return dp[nums.length][target];
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
     * 1. ITERATIVE (RECOMMENDED):
     *    ✅ Time: O(n * target), Space: O(target)
     *    ✅ Most space efficient
     *    ✅ Simple to understand
     * 
     * 2. MEMOIZATION:
     *    ✅ Time: O(n * target), Space: O(n * target)
     *    ✅ Good for understanding recursion
     *    ❌ More space usage
     * 
     * 3. TABULATION:
     *    ✅ Time: O(n * target), Space: O(n * target)
     *    ✅ Good for understanding DP
     *    ❌ More space usage
     * 
     * 🎯 INTERVIEW ANSWER: "This is a 0/1 Knapsack problem. We check if we can 
     * find a subset that sums to totalSum/2. If totalSum is odd, return false. 
     * Use DP with O(n * target) time and O(target) space."
     */
} 