/**
 * COIN CHANGE - DYNAMIC PROGRAMMING PROBLEM
 * 
 * 🎯 PROBLEM STATEMENT:
 * You are given an integer array coins representing coins of different denominations 
 * and an integer amount representing a total amount of money.
 * 
 * Return the fewest number of coins that you need to make up that amount. 
 * If that amount of money cannot be made up by any combination of the coins, return -1.
 * 
 * 📝 EXAMPLES:
 * Input: coins = [1,2,5], amount = 11
 * Output: 3
 * Explanation: 11 = 5 + 5 + 1
 * 
 * Input: coins = [2], amount = 3
 * Output: -1
 * Explanation: Cannot make amount 3 with only coin denomination 2.
 * 
 * 🔍 PATTERN RECOGNITION:
 * This is an Unbounded Knapsack problem!
 * - Each coin can be used multiple times (unbounded)
 * - Find minimum number of coins to achieve target amount
 * - Use DP to track minimum coins for each amount
 * 
 * 🎯 KEY INSIGHT:
 * For each amount, try using each coin and take the minimum.
 * dp[i] = min(dp[i], dp[i - coin] + 1) for all coins
 */

import java.util.Arrays;

public class CoinChange {
    
    public static void main(String[] args) {
        System.out.println("=== COIN CHANGE ===");
        
        int[][][] testCases = {
            {{1, 2, 5}, {11}},      // Expected: 3
            {{2}, {3}},             // Expected: -1
            {{1}, {0}},             // Expected: 0
            {{1}, {1}},             // Expected: 1
            {{1}, {2}},             // Expected: 2
            {{1, 3, 4}, {6}},       // Expected: 2
            {{2, 5, 10, 1}, {27}},  // Expected: 4
            {{186, 419, 83, 408}, {6249}} // Expected: 20
        };
        
        for (int i = 0; i < testCases.length; i++) {
            int[] coins = testCases[i][0];
            int amount = testCases[i][1][0];
            System.out.println("\n--- Test Case " + (i + 1) + " ---");
            System.out.println("Input: coins = " + arrayToString(coins) + ", amount = " + amount);
            
            // Approach 1: Iterative (Space Optimized)
            long startTime = System.nanoTime();
            int result1 = coinChangeIterative(coins, amount);
            long endTime = System.nanoTime();
            System.out.println("Iterative: " + result1 + " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            // Approach 2: Recursive with Memoization
            startTime = System.nanoTime();
            int result2 = coinChangeMemoization(coins, amount);
            endTime = System.nanoTime();
            System.out.println("Memoization: " + result2 + " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            // Approach 3: Tabulation
            startTime = System.nanoTime();
            int result3 = coinChangeTabulation(coins, amount);
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
     * - Initialize DP array with max value (impossible)
     * - For each coin, try using it for all amounts
     * - Take minimum of current value and using current coin
     * 
     * ⏰ TIME COMPLEXITY: O(amount * n)
     * 🏠 SPACE COMPLEXITY: O(amount)
     */
    public static int coinChangeIterative(int[] coins, int amount) {
        int max = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, max);
        dp[0] = 0;  // Base case: 0 coins needed for amount 0
        
        for (int coin : coins) {
            for (int j = coin; j <= amount; j++) {
                dp[j] = Math.min(dp[j], dp[j - coin] + 1);
            }
        }
        
        return dp[amount] == max ? -1 : dp[amount];
    }
    
    // ==================== APPROACH 2: RECURSIVE WITH MEMOIZATION ====================
    /**
     * 🎯 APPROACH: Recursive with Memoization
     * 
     * 💡 IDEA:
     * - Use recursion to try each coin
     * - Cache results to avoid recalculating
     * - Track remaining amount and find minimum
     * 
     * ⏰ TIME COMPLEXITY: O(amount * n)
     * 🏠 SPACE COMPLEXITY: O(amount)
     */
    public static int coinChangeMemoization(int[] coins, int amount) {
        Integer[] memo = new Integer[amount + 1];
        int result = helper(coins, amount, memo);
        return result == Integer.MAX_VALUE ? -1 : result;
    }
    
    private static int helper(int[] coins, int amount, Integer[] memo) {
        if (amount == 0) return 0;
        if (amount < 0) return Integer.MAX_VALUE;
        
        if (memo[amount] != null) return memo[amount];
        
        int minCoins = Integer.MAX_VALUE;
        for (int coin : coins) {
            int result = helper(coins, amount - coin, memo);
            if (result != Integer.MAX_VALUE) {
                minCoins = Math.min(minCoins, result + 1);
            }
        }
        
        memo[amount] = minCoins;
        return minCoins;
    }
    
    // ==================== APPROACH 3: TABULATION ====================
    /**
     * 🎯 APPROACH: Tabulation (Bottom-up DP)
     * 
     * 💡 IDEA:
     * - Build solution from base cases up to target
     * - Use 2D array to track minimum coins for each state
     * - Fill DP table systematically
     * 
     * ⏰ TIME COMPLEXITY: O(amount * n)
     * 🏠 SPACE COMPLEXITY: O(amount * n)
     */
    public static int coinChangeTabulation(int[] coins, int amount) {
        int max = amount + 1;
        int[][] dp = new int[coins.length + 1][amount + 1];
        
        // Initialize with max values
        for (int i = 0; i <= coins.length; i++) {
            Arrays.fill(dp[i], max);
        }
        
        // Base case: 0 coins needed for amount 0
        for (int i = 0; i <= coins.length; i++) {
            dp[i][0] = 0;
        }
        
        for (int i = 1; i <= coins.length; i++) {
            for (int j = 1; j <= amount; j++) {
                dp[i][j] = dp[i - 1][j];  // Don't use current coin
                if (j >= coins[i - 1]) {
                    dp[i][j] = Math.min(dp[i][j], dp[i][j - coins[i - 1]] + 1);  // Use current coin
                }
            }
        }
        
        return dp[coins.length][amount] == max ? -1 : dp[coins.length][amount];
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
     *    ✅ Time: O(amount * n), Space: O(amount)
     *    ✅ Most space efficient
     *    ✅ Simple to understand
     * 
     * 2. MEMOIZATION:
     *    ✅ Time: O(amount * n), Space: O(amount)
     *    ✅ Good for understanding recursion
     *    ✅ Same space as iterative
     * 
     * 3. TABULATION:
     *    ✅ Time: O(amount * n), Space: O(amount * n)
     *    ✅ Good for understanding DP
     *    ❌ More space usage
     * 
     * 🎯 INTERVIEW ANSWER: "This is an Unbounded Knapsack problem. We use DP to 
     * find minimum coins for each amount. For each coin, try using it and take 
     * minimum. Time complexity is O(amount * n) and space is O(amount)."
     */
} 