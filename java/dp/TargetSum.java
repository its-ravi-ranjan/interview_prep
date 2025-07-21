/**
 * TARGET SUM - DYNAMIC PROGRAMMING PROBLEM
 * 
 * 🎯 PROBLEM STATEMENT:
 * You are given an integer array nums and an integer target. You want to build 
 * an expression out of nums by adding one of the symbols '+' and '-' before 
 * each integer in nums and then concatenate all the integers.
 * 
 * Return the number of different expressions that you can build, which evaluates to target.
 * 
 * 📝 EXAMPLES:
 * Input: nums = [1,1,1,1,1], target = 3
 * Output: 5
 * Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
 * -1 + 1 + 1 + 1 + 1 = 3
 * +1 - 1 + 1 + 1 + 1 = 3
 * +1 + 1 - 1 + 1 + 1 = 3
 * +1 + 1 + 1 - 1 + 1 = 3
 * +1 + 1 + 1 + 1 - 1 = 3
 * 
 * 🔍 PATTERN RECOGNITION:
 * This is a 0/1 Knapsack problem with counting!
 * - Let S be the sum of positive numbers, P be the sum of negative numbers
 * - S - P = target and S + P = totalSum
 * - Solving: S = (totalSum + target) / 2
 * - Find number of ways to select elements that sum to S
 * 
 * 🎯 KEY INSIGHT:
 * Convert to subset sum problem: find ways to select elements that sum to (totalSum + target) / 2
 */

public class TargetSum {
    
    public static void main(String[] args) {
        System.out.println("=== TARGET SUM ===");
        
        int[][][] testCases = {
            {{1, 1, 1, 1, 1}, {3}},      // Expected: 5
            {{1}, {1}},                   // Expected: 1
            {{1, 0}, {1}},                // Expected: 2
            {{1, 2, 3, 4, 5}, {3}},      // Expected: 3
            {{1, 2, 3, 4, 5}, {15}},     // Expected: 1
            {{1, 2, 3, 4, 5}, {20}},     // Expected: 0
            {{0, 0, 0, 0, 0, 0, 0, 0, 1}, {1}} // Expected: 256
        };
        
        for (int i = 0; i < testCases.length; i++) {
            int[] nums = testCases[i][0];
            int target = testCases[i][1][0];
            System.out.println("\n--- Test Case " + (i + 1) + " ---");
            System.out.println("Input: nums = " + arrayToString(nums) + ", target = " + target);
            
            // Approach 1: Iterative (Space Optimized)
            long startTime = System.nanoTime();
            int result1 = findTargetSumWaysIterative(nums, target);
            long endTime = System.nanoTime();
            System.out.println("Iterative: " + result1 + " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            // Approach 2: Recursive with Memoization
            startTime = System.nanoTime();
            int result2 = findTargetSumWaysMemoization(nums, target);
            endTime = System.nanoTime();
            System.out.println("Memoization: " + result2 + " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            // Approach 3: Tabulation
            startTime = System.nanoTime();
            int result3 = findTargetSumWaysTabulation(nums, target);
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
     * 🎯 APPROACH: Iterative with Integer Array
     * 
     * 💡 IDEA: 
     * - Calculate total sum and check feasibility
     * - Convert to subset sum problem: find ways to sum to (totalSum + target) / 2
     * - Use integer array to count ways for each sum
     * 
     * ⏰ TIME COMPLEXITY: O(n * sum)
     * 🏠 SPACE COMPLEXITY: O(sum)
     */
    public static int findTargetSumWaysIterative(int[] nums, int target) {
        int totalSum = 0;
        for (int num : nums) totalSum += num;
        
        // Early exit conditions
        if ((totalSum + target) % 2 != 0 || totalSum < Math.abs(target)) return 0;
        
        int sum = (totalSum + target) / 2;
        int[] dp = new int[sum + 1];
        dp[0] = 1;  // Base case: one way to achieve sum 0 (empty subset)
        
        for (int num : nums) {
            for (int i = sum; i >= num; i--) {
                dp[i] += dp[i - num];  // Add ways to achieve current sum
            }
        }
        
        return dp[sum];
    }
    
    // ==================== APPROACH 2: RECURSIVE WITH MEMOIZATION ====================
    /**
     * 🎯 APPROACH: Recursive with Memoization
     * 
     * 💡 IDEA:
     * - Use recursion to try + and - for each element
     * - Cache results to avoid recalculating
     * - Track current sum and remaining elements
     * 
     * ⏰ TIME COMPLEXITY: O(n * sum)
     * 🏠 SPACE COMPLEXITY: O(n * sum)
     */
    public static int findTargetSumWaysMemoization(int[] nums, int target) {
        int totalSum = 0;
        for (int num : nums) totalSum += num;
        
        if ((totalSum + target) % 2 != 0 || totalSum < Math.abs(target)) return 0;
        
        int sum = (totalSum + target) / 2;
        Integer[][] memo = new Integer[nums.length][sum + 1];
        
        return helper(nums, 0, sum, memo);
    }
    
    private static int helper(int[] nums, int index, int target, Integer[][] memo) {
        if (index >= nums.length) return target == 0 ? 1 : 0;
        if (target < 0) return 0;
        
        if (memo[index][target] != null) return memo[index][target];
        
        // Try including current number (positive)
        int include = helper(nums, index + 1, target - nums[index], memo);
        // Try excluding current number (negative)
        int exclude = helper(nums, index + 1, target, memo);
        
        memo[index][target] = include + exclude;
        return memo[index][target];
    }
    
    // ==================== APPROACH 3: TABULATION ====================
    /**
     * 🎯 APPROACH: Tabulation (Bottom-up DP)
     * 
     * 💡 IDEA:
     * - Build solution from base cases up to target
     * - Use 2D array to track ways for each state
     * - Count ways to achieve each sum
     * 
     * ⏰ TIME COMPLEXITY: O(n * sum)
     * 🏠 SPACE COMPLEXITY: O(n * sum)
     */
    public static int findTargetSumWaysTabulation(int[] nums, int target) {
        int totalSum = 0;
        for (int num : nums) totalSum += num;
        
        if ((totalSum + target) % 2 != 0 || totalSum < Math.abs(target)) return 0;
        
        int sum = (totalSum + target) / 2;
        int[][] dp = new int[nums.length + 1][sum + 1];
        
        // Base case: one way to achieve sum 0 with empty subset
        dp[0][0] = 1;
        
        for (int i = 1; i <= nums.length; i++) {
            for (int j = 0; j <= sum; j++) {
                dp[i][j] = dp[i - 1][j];  // Don't include current element
                if (j >= nums[i - 1]) {
                    dp[i][j] += dp[i - 1][j - nums[i - 1]];  // Include current element
                }
            }
        }
        
        return dp[nums.length][sum];
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
     *    ✅ Time: O(n * sum), Space: O(sum)
     *    ✅ Most space efficient
     *    ✅ Simple to understand
     * 
     * 2. MEMOIZATION:
     *    ✅ Time: O(n * sum), Space: O(n * sum)
     *    ✅ Good for understanding recursion
     *    ❌ More space usage
     * 
     * 3. TABULATION:
     *    ✅ Time: O(n * sum), Space: O(n * sum)
     *    ✅ Good for understanding DP
     *    ❌ More space usage
     * 
     * 🎯 INTERVIEW ANSWER: "This is a 0/1 Knapsack counting problem. We convert 
     * it to subset sum: find ways to select elements that sum to (totalSum + target) / 2. 
     * Use DP with O(n * sum) time and O(sum) space."
     */
} 