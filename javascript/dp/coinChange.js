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

class CoinChange {
    
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
    static coinChangeIterative(coins, amount) {
        const max = amount + 1;
        const dp = new Array(amount + 1).fill(max);
        dp[0] = 0;  // Base case: 0 coins needed for amount 0
        
        for (const coin of coins) {
            for (let j = coin; j <= amount; j++) {
                dp[j] = Math.min(dp[j], dp[j - coin] + 1);
            }
        }
        
        return dp[amount] === max ? -1 : dp[amount];
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
    static coinChangeMemoization(coins, amount) {
        const memo = new Array(amount + 1).fill(null);
        const result = this.helper(coins, amount, memo);
        return result === Number.MAX_SAFE_INTEGER ? -1 : result;
    }
    
    static helper(coins, amount, memo) {
        if (amount === 0) return 0;
        if (amount < 0) return Number.MAX_SAFE_INTEGER;
        
        if (memo[amount] !== null) return memo[amount];
        
        let minCoins = Number.MAX_SAFE_INTEGER;
        for (const coin of coins) {
            const result = this.helper(coins, amount - coin, memo);
            if (result !== Number.MAX_SAFE_INTEGER) {
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
    static coinChangeTabulation(coins, amount) {
        const max = amount + 1;
        const dp = new Array(coins.length + 1).fill().map(() => new Array(amount + 1).fill(max));
        
        // Base case: 0 coins needed for amount 0
        for (let i = 0; i <= coins.length; i++) {
            dp[i][0] = 0;
        }
        
        for (let i = 1; i <= coins.length; i++) {
            for (let j = 1; j <= amount; j++) {
                dp[i][j] = dp[i - 1][j];  // Don't use current coin
                if (j >= coins[i - 1]) {
                    dp[i][j] = Math.min(dp[i][j], dp[i][j - coins[i - 1]] + 1);  // Use current coin
                }
            }
        }
        
        return dp[coins.length][amount] === max ? -1 : dp[coins.length][amount];
    }
    
    // ==================== UTILITY METHODS ====================
    static arrayToString(nums) {
        if (nums.length === 0) return "[]";
        return "[" + nums.join(", ") + "]";
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

// ==================== MAIN EXECUTION ====================
function runCoinChangeDemo() {
    console.log("=== COIN CHANGE ===");
    
    const testCases = [
        {coins: [1, 2, 5], amount: 11},      // Expected: 3
        {coins: [2], amount: 3},             // Expected: -1
        {coins: [1], amount: 0},             // Expected: 0
        {coins: [1], amount: 1},             // Expected: 1
        {coins: [1], amount: 2},             // Expected: 2
        {coins: [1, 3, 4], amount: 6},       // Expected: 2
        {coins: [2, 5, 10, 1], amount: 27},  // Expected: 4
        {coins: [186, 419, 83, 408], amount: 6249} // Expected: 20
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        const {coins, amount} = testCases[i];
        console.log(`\n--- Test Case ${i + 1} ---`);
        console.log("Input: coins =", CoinChange.arrayToString(coins), ", amount =", amount);
        
        // Approach 1: Iterative (Space Optimized)
        const startTime1 = performance.now();
        const result1 = CoinChange.coinChangeIterative(coins, amount);
        const endTime1 = performance.now();
        console.log(`Iterative: ${result1} (Time: ${(endTime1 - startTime1).toFixed(3)} ms)`);
        
        // Approach 2: Recursive with Memoization
        const startTime2 = performance.now();
        const result2 = CoinChange.coinChangeMemoization(coins, amount);
        const endTime2 = performance.now();
        console.log(`Memoization: ${result2} (Time: ${(endTime2 - startTime2).toFixed(3)} ms)`);
        
        // Approach 3: Tabulation
        const startTime3 = performance.now();
        const result3 = CoinChange.coinChangeTabulation(coins, amount);
        const endTime3 = performance.now();
        console.log(`Tabulation: ${result3} (Time: ${(endTime3 - startTime3).toFixed(3)} ms)`);
        
        if (result1 === result2 && result2 === result3) {
            console.log("✅ All approaches agree!");
        } else {
            console.log("❌ Results don't match!");
        }
    }
}

// Run the demo
runCoinChangeDemo();

// Export for use in other modules
module.exports = CoinChange; 