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

class TargetSum {
    
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
    static findTargetSumWaysIterative(nums, target) {
        const totalSum = nums.reduce((sum, num) => sum + num, 0);
        
        // Early exit conditions
        if ((totalSum + target) % 2 !== 0 || totalSum < Math.abs(target)) return 0;
        
        const sum = (totalSum + target) / 2;
        const dp = new Array(sum + 1).fill(0);
        dp[0] = 1;  // Base case: one way to achieve sum 0 (empty subset)
        
        for (const num of nums) {
            for (let i = sum; i >= num; i--) {
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
    static findTargetSumWaysMemoization(nums, target) {
        const totalSum = nums.reduce((sum, num) => sum + num, 0);
        
        if ((totalSum + target) % 2 !== 0 || totalSum < Math.abs(target)) return 0;
        
        const sum = (totalSum + target) / 2;
        const memo = new Array(nums.length).fill().map(() => new Array(sum + 1).fill(null));
        
        return this.helper(nums, 0, sum, memo);
    }
    
    static helper(nums, index, target, memo) {
        if (index >= nums.length) return target === 0 ? 1 : 0;
        if (target < 0) return 0;
        
        if (memo[index][target] !== null) return memo[index][target];
        
        // Try including current number (positive)
        const include = this.helper(nums, index + 1, target - nums[index], memo);
        // Try excluding current number (negative)
        const exclude = this.helper(nums, index + 1, target, memo);
        
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
    static findTargetSumWaysTabulation(nums, target) {
        const totalSum = nums.reduce((sum, num) => sum + num, 0);
        
        if ((totalSum + target) % 2 !== 0 || totalSum < Math.abs(target)) return 0;
        
        const sum = (totalSum + target) / 2;
        const dp = new Array(nums.length + 1).fill().map(() => new Array(sum + 1).fill(0));
        
        // Base case: one way to achieve sum 0 with empty subset
        dp[0][0] = 1;
        
        for (let i = 1; i <= nums.length; i++) {
            for (let j = 0; j <= sum; j++) {
                dp[i][j] = dp[i - 1][j];  // Don't include current element
                if (j >= nums[i - 1]) {
                    dp[i][j] += dp[i - 1][j - nums[i - 1]];  // Include current element
                }
            }
        }
        
        return dp[nums.length][sum];
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

// ==================== MAIN EXECUTION ====================
function runTargetSumDemo() {
    console.log("=== TARGET SUM ===");
    
    const testCases = [
        {nums: [1, 1, 1, 1, 1], target: 3},      // Expected: 5
        {nums: [1], target: 1},                   // Expected: 1
        {nums: [1, 0], target: 1},                // Expected: 2
        {nums: [1, 2, 3, 4, 5], target: 3},      // Expected: 3
        {nums: [1, 2, 3, 4, 5], target: 15},     // Expected: 1
        {nums: [1, 2, 3, 4, 5], target: 20},     // Expected: 0
        {nums: [0, 0, 0, 0, 0, 0, 0, 0, 1], target: 1} // Expected: 256
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        const {nums, target} = testCases[i];
        console.log(`\n--- Test Case ${i + 1} ---`);
        console.log("Input: nums =", TargetSum.arrayToString(nums), ", target =", target);
        
        // Approach 1: Iterative (Space Optimized)
        const startTime1 = performance.now();
        const result1 = TargetSum.findTargetSumWaysIterative(nums, target);
        const endTime1 = performance.now();
        console.log(`Iterative: ${result1} (Time: ${(endTime1 - startTime1).toFixed(3)} ms)`);
        
        // Approach 2: Recursive with Memoization
        const startTime2 = performance.now();
        const result2 = TargetSum.findTargetSumWaysMemoization(nums, target);
        const endTime2 = performance.now();
        console.log(`Memoization: ${result2} (Time: ${(endTime2 - startTime2).toFixed(3)} ms)`);
        
        // Approach 3: Tabulation
        const startTime3 = performance.now();
        const result3 = TargetSum.findTargetSumWaysTabulation(nums, target);
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
runTargetSumDemo();

// Export for use in other modules
module.exports = TargetSum; 