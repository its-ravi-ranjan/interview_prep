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

class PartitionEqualSubsetSum {
    
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
    static canPartitionIterative(nums) {
        const totalSum = nums.reduce((sum, num) => sum + num, 0);
        
        if (totalSum % 2 !== 0) return false;
        
        const target = totalSum / 2;
        const dp = new Array(target + 1).fill(false);
        dp[0] = true;
        
        for (const num of nums) {
            for (let j = target; j >= num; j--) {
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
    static canPartitionMemoization(nums) {
        const totalSum = nums.reduce((sum, num) => sum + num, 0);
        
        if (totalSum % 2 !== 0) return false;
        
        const target = totalSum / 2;
        const memo = new Array(nums.length).fill().map(() => new Array(target + 1).fill(null));
        
        return this.helper(nums, 0, target, memo);
    }
    
    static helper(nums, index, target, memo) {
        if (target === 0) return true;
        if (index >= nums.length || target < 0) return false;
        
        if (memo[index][target] !== null) return memo[index][target];
        
        memo[index][target] = this.helper(nums, index + 1, target, memo) || 
                              this.helper(nums, index + 1, target - nums[index], memo);
        
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
    static canPartitionTabulation(nums) {
        const totalSum = nums.reduce((sum, num) => sum + num, 0);
        
        if (totalSum % 2 !== 0) return false;
        
        const target = totalSum / 2;
        const dp = new Array(nums.length + 1).fill().map(() => new Array(target + 1).fill(false));
        
        // Base case: empty subset can achieve sum 0
        for (let i = 0; i <= nums.length; i++) {
            dp[i][0] = true;
        }
        
        for (let i = 1; i <= nums.length; i++) {
            for (let j = 1; j <= target; j++) {
                dp[i][j] = dp[i - 1][j];  // Don't include current element
                if (j >= nums[i - 1]) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j - nums[i - 1]];  // Include current element
                }
            }
        }
        
        return dp[nums.length][target];
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

// ==================== MAIN EXECUTION ====================
function runPartitionDemo() {
    console.log("=== PARTITION EQUAL SUBSET SUM ===");
    
    const testCases = [
        [1, 5, 11, 5],     // Expected: true
        [1, 2, 3, 5],      // Expected: false
        [1, 2, 3, 4, 5, 6, 7], // Expected: true
        [1, 1, 1, 1],      // Expected: true
        [1, 2],            // Expected: false
        [1, 1],            // Expected: true
        [1],               // Expected: false
        []                 // Expected: false
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        const nums = testCases[i];
        console.log(`\n--- Test Case ${i + 1} ---`);
        console.log("Input:", PartitionEqualSubsetSum.arrayToString(nums));
        
        // Approach 1: Iterative (Space Optimized)
        const startTime1 = performance.now();
        const result1 = PartitionEqualSubsetSum.canPartitionIterative(nums);
        const endTime1 = performance.now();
        console.log(`Iterative: ${result1} (Time: ${(endTime1 - startTime1).toFixed(3)} ms)`);
        
        // Approach 2: Recursive with Memoization
        const startTime2 = performance.now();
        const result2 = PartitionEqualSubsetSum.canPartitionMemoization(nums);
        const endTime2 = performance.now();
        console.log(`Memoization: ${result2} (Time: ${(endTime2 - startTime2).toFixed(3)} ms)`);
        
        // Approach 3: Tabulation
        const startTime3 = performance.now();
        const result3 = PartitionEqualSubsetSum.canPartitionTabulation(nums);
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
runPartitionDemo();

// Export for use in other modules
module.exports = PartitionEqualSubsetSum; 