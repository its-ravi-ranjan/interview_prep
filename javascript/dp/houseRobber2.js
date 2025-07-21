/**
 * HOUSE ROBBER II - DYNAMIC PROGRAMMING PROBLEM (CIRCULAR HOUSES)
 * 
 * 🎯 PROBLEM STATEMENT:
 * You are a professional robber planning to rob houses along a street. 
 * Each house has a certain amount of money stashed. All houses at this 
 * place are arranged in a circle. That means the first house is the 
 * neighbor of the last one. Meanwhile, adjacent houses have a security 
 * system connected, and it will automatically contact the police if two 
 * adjacent houses were broken into on the same night.
 * 
 * Given an integer array nums representing the amount of money of each house, 
 * return the maximum amount of money you can rob tonight without alerting the police.
 * 
 * 📝 EXAMPLES:
 * Input: nums = [2,3,2]
 * Output: 3
 * Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), 
 * because they are adjacent houses. So rob house 2 (money = 3).
 * 
 * Input: nums = [1,2,3,1]
 * Output: 4
 * Explanation: Rob house 2 (money = 2) and house 4 (money = 2).
 * 
 * 🔍 PATTERN RECOGNITION:
 * This is House Robber I with a circular constraint!
 * The key insight is that we can't rob both the first and last house.
 * So we solve two subproblems:
 * 1. Rob houses 0 to n-2 (exclude last house)
 * 2. Rob houses 1 to n-1 (exclude first house)
 * Then take the maximum of these two results.
 * 
 * 🎯 KEY INSIGHT:
 * Since houses are in a circle, we can't rob both first and last house.
 * Therefore: maxMoney = max(robLinear(0, n-2), robLinear(1, n-1))
 * 
 * This breaks the circular constraint into two linear problems!
 */

class HouseRobber2 {
    
    // ==================== APPROACH 1: ITERATIVE (SPACE OPTIMIZED) ====================
    /**
     * 🎯 APPROACH: Iterative with Constant Space
     * 
     * 💡 IDEA: 
     * - Break the circular problem into two linear subproblems
     * - Solve each subproblem using the same approach as House Robber I
     * - Take the maximum of the two results
     * 
     * 🔄 ALGORITHM:
     * 1. Handle base cases: empty array = 0, single house = house value
     * 2. For circular constraint, solve two subproblems:
     *    - Subproblem 1: robLinear(0, n-2) - exclude last house
     *    - Subproblem 2: robLinear(1, n-1) - exclude first house
     * 3. Return max(subproblem1, subproblem2)
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Two linear passes through the array
     *    - Each pass takes O(n) time
     *    - Total: O(n)
     * 
     * 🏠 SPACE COMPLEXITY: O(1)
     *    - Only uses constant space for variables
     *    - No additional arrays needed
     * 
     * 🎯 INTERVIEW ANSWER: "This approach breaks the circular constraint into 
     * two linear subproblems. We solve House Robber I twice - once excluding 
     * the last house and once excluding the first house, then take the maximum. 
     * Time complexity is O(n) and space complexity is O(1)."
     */
    static robIterative(nums) {
        const n = nums.length;
        if (n === 0) return 0;
        if (n === 1) return nums[0];
        if (n === 2) return Math.max(nums[0], nums[1]);
        
        // Solve two subproblems and take the maximum
        return Math.max(
            this.robLinear(0, n - 2, nums),  // Exclude last house
            this.robLinear(1, n - 1, nums)   // Exclude first house
        );
    }
    
    /**
     * Helper method to solve linear house robber problem
     * This is the same as House Robber I
     */
    static robLinear(start, end, nums) {
        let prev1 = 0;  // Maximum money from 2 houses back
        let prev2 = 0;  // Maximum money from 1 house back
        
        for (let i = start; i <= end; i++) {
            const current = Math.max(prev2, nums[i] + prev1);
            prev1 = prev2;
            prev2 = current;
        }
        
        return prev2;
    }
    
    // ==================== APPROACH 2: RECURSIVE WITH MEMOIZATION ====================
    /**
     * 🎯 APPROACH: Recursive with Memoization (Top-down DP)
     * 
     * 💡 IDEA:
     * - Use recursion to break down the problem
     * - Cache results to avoid recalculating subproblems
     * - Apply the same circular constraint logic
     * 
     * 🔄 ALGORITHM:
     * 1. Handle base cases
     * 2. Create memo arrays for both subproblems
     * 3. Solve two recursive subproblems:
     *    - helper(nums, 0, n-2, memo1)
     *    - helper(nums, 1, n-1, memo2)
     * 4. Return maximum of the two results
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Each subproblem is solved only once
     *    - Two subproblems of size n-1 each
     *    - Total: O(n)
     * 
     * 🏠 SPACE COMPLEXITY: O(n)
     *    - Two memo arrays of size n
     *    - Recursion call stack: O(n) in worst case
     *    - Total: O(n)
     * 
     * 🎯 INTERVIEW ANSWER: "This approach uses recursion with memoization for 
     * both subproblems. It has O(n) time and space complexity, where space is 
     * used for memo arrays and recursion stack."
     */
    static robMemoization(nums) {
        const n = nums.length;
        if (n === 0) return 0;
        if (n === 1) return nums[0];
        if (n === 2) return Math.max(nums[0], nums[1]);
        
        // Create memo arrays for both subproblems
        const memo1 = new Array(n).fill(0);
        const memo2 = new Array(n).fill(0);
        
        // Solve two subproblems
        const result1 = this.helper(nums, 0, n - 2, memo1);
        const result2 = this.helper(nums, 1, n - 1, memo2);
        
        return Math.max(result1, result2);
    }
    
    static helper(nums, start, end, memo) {
        // Base cases
        if (start > end) return 0;
        if (start === end) return nums[start];
        if (start === end - 1) return Math.max(nums[start], nums[end]);
        
        // Check if result is already cached
        if (memo[start] !== 0) return memo[start];
        
        // Calculate and cache result
        memo[start] = Math.max(
            this.helper(nums, start + 1, end, memo),  // Skip current house
            nums[start] + this.helper(nums, start + 2, end, memo)  // Rob current house
        );
        return memo[start];
    }
    
    // ==================== APPROACH 3: TABULATION (BOTTOM-UP DP) ====================
    /**
     * 🎯 APPROACH: Tabulation (Bottom-up Dynamic Programming)
     * 
     * 💡 IDEA:
     * - Build solution from base cases up to target
     * - Use arrays to store intermediate results for both subproblems
     * - Apply the same circular constraint logic
     * 
     * 🔄 ALGORITHM:
     * 1. Handle base cases
     * 2. Create DP arrays for both subproblems
     * 3. Fill both arrays using bottom-up approach
     * 4. Return maximum of the two final results
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Two linear passes through the array
     *    - Each pass takes O(n) time
     *    - Total: O(n)
     * 
     * 🏠 SPACE COMPLEXITY: O(n)
     *    - Two DP arrays of size n
     *    - No recursion stack overhead
     * 
     * 🎯 INTERVIEW ANSWER: "This bottom-up approach builds solutions for both 
     * subproblems iteratively. It has O(n) time and O(n) space complexity, 
     * where space is used for the DP arrays."
     */
    static robTabulation(nums) {
        const n = nums.length;
        if (n === 0) return 0;
        if (n === 1) return nums[0];
        if (n === 2) return Math.max(nums[0], nums[1]);
        
        // Create DP arrays for both subproblems
        const dp1 = new Array(n - 1).fill(0);  // For houses 0 to n-2
        const dp2 = new Array(n - 1).fill(0);  // For houses 1 to n-1
        
        // Fill first DP array (houses 0 to n-2)
        dp1[0] = nums[0];
        if (n > 2) dp1[1] = Math.max(nums[0], nums[1]);
        
        for (let i = 2; i < n - 1; i++) {
            dp1[i] = Math.max(dp1[i - 1], nums[i] + dp1[i - 2]);
        }
        
        // Fill second DP array (houses 1 to n-1)
        dp2[0] = nums[1];
        if (n > 2) dp2[1] = Math.max(nums[1], nums[2]);
        
        for (let i = 2; i < n - 1; i++) {
            dp2[i] = Math.max(dp2[i - 1], nums[i + 1] + dp2[i - 2]);
        }
        
        // Return maximum of the two results
        return Math.max(dp1[n - 2], dp2[n - 2]);
    }
    
    // ==================== BONUS: TRACKING OPTIMAL PATH ====================
    /**
     * 🎯 BONUS: Track which houses to rob for maximum profit
     * 
     * 💡 IDEA:
     * - Use the same DP approach but track decisions
     * - Compare results of both subproblems
     * - Show which subproblem gives better result
     */
    static getOptimalPath(nums) {
        if (nums.length === 0) return "No houses to rob";
        if (nums.length === 1) return "Rob house 1";
        if (nums.length === 2) return "Rob house " + (nums[0] > nums[1] ? "1" : "2");
        
        const n = nums.length;
        
        // Solve both subproblems with path tracking
        const path1 = this.getLinearPath(0, n - 2, nums);
        const path2 = this.getLinearPath(1, n - 1, nums);
        
        const result1 = this.robLinear(0, n - 2, nums);
        const result2 = this.robLinear(1, n - 1, nums);
        
        if (result1 >= result2) {
            return `Subproblem 1: ${path1} (Total: $${result1})`;
        } else {
            return `Subproblem 2: ${path2} (Total: $${result2})`;
        }
    }
    
    static getLinearPath(start, end, nums) {
        if (start > end) return "No houses";
        if (start === end) return `house ${start + 1}($${nums[start]})`;
        
        const n = end - start + 1;
        const dp = new Array(n).fill(0);
        const robbed = new Array(n).fill(false);
        
        // Base cases
        dp[0] = nums[start];
        robbed[0] = true;
        
        if (n > 1) {
            if (nums[start + 1] > nums[start]) {
                dp[1] = nums[start + 1];
                robbed[0] = false;
                robbed[1] = true;
            } else {
                dp[1] = nums[start];
                robbed[1] = false;
            }
        }
        
        // Fill DP array
        for (let i = 2; i < n; i++) {
            if (dp[i - 1] > nums[start + i] + dp[i - 2]) {
                dp[i] = dp[i - 1];
                robbed[i] = false;
            } else {
                dp[i] = nums[start + i] + dp[i - 2];
                robbed[i] = true;
            }
        }
        
        // Build result string
        let result = "";
        for (let i = 0; i < n; i++) {
            if (robbed[i]) {
                if (result.length > 0) result += " + ";
                result += `house ${start + i + 1}($${nums[start + i]})`;
            }
        }
        
        return result;
    }
    
    // ==================== COMPARISON AND ANALYSIS ====================
    /**
     * 📊 COMPARISON OF APPROACHES:
     * 
     * 1. ITERATIVE (RECOMMENDED):
     *    ✅ Time: O(n), Space: O(1)
     *    ✅ Most efficient for most cases
     *    ✅ Simple to understand and implement
     *    ❌ Doesn't track which houses to rob
     * 
     * 2. MEMOIZATION:
     *    ✅ Time: O(n), Space: O(n)
     *    ✅ Good for understanding recursion
     *    ✅ Can be extended to track decisions
     *    ❌ Recursion stack overhead
     * 
     * 3. TABULATION:
     *    ✅ Time: O(n), Space: O(n)
     *    ✅ No recursion overhead
     *    ✅ Good for understanding DP
     *    ✅ Can be extended to track decisions
     *    ❌ Uses more space than iterative
     * 
     * 🎯 INTERVIEW RECOMMENDATION:
     * - Start with iterative approach (most practical)
     * - Mention memoization if asked about recursion
     * - Discuss tabulation if asked about DP
     * - Show optimal path tracking if asked for details
     * 
     * 🔑 KEY DIFFERENCE FROM HOUSE ROBBER I:
     * - Circular constraint: can't rob both first and last house
     * - Solution: solve two linear subproblems and take maximum
     * - This is a common pattern for circular/cyclic problems
     */
    
    // ==================== TESTING UTILITIES ====================
    /**
     * Utility method to convert array to string for display
     */
    static arrayToString(nums) {
        if (nums.length === 0) return "[]";
        return "[" + nums.join(", ") + "]";
    }
    
    /**
     * Utility method to test all approaches and compare performance
     */
    static performanceTest() {
        console.log("\n=== PERFORMANCE COMPARISON ===");
        
        // Generate test cases of different sizes
        const sizes = [100, 1000, 10000, 100000];
        
        for (const size of sizes) {
            const testNums = new Array(size);
            for (let i = 0; i < size; i++) {
                testNums[i] = Math.floor(Math.random() * 1000) + 1;  // Random values 1-1000
            }
            
            console.log(`\nTesting array of size: ${size}`);
            
            // Test iterative
            const start1 = performance.now();
            const result1 = this.robIterative(testNums);
            const time1 = performance.now() - start1;
            
            // Test memoization
            const start2 = performance.now();
            const result2 = this.robMemoization(testNums);
            const time2 = performance.now() - start2;
            
            // Test tabulation
            const start3 = performance.now();
            const result3 = this.robTabulation(testNums);
            const time3 = performance.now() - start3;
            
            console.log(`Iterative: ${result1}, ${time1.toFixed(3)} ms`);
            console.log(`Memoization: ${result2}, ${time2.toFixed(3)} ms`);
            console.log(`Tabulation: ${result3}, ${time3.toFixed(3)} ms`);
        }
    }
    
    /**
     * Demonstrate the circular constraint with examples
     */
    static demonstrateCircularConstraint() {
        console.log("\n=== CIRCULAR CONSTRAINT DEMONSTRATION ===");
        const demoNums = [2, 7, 9, 3, 1];
        console.log("Input:", this.arrayToString(demoNums));
        console.log("Subproblem 1 (houses 0 to 3):", this.robLinear(0, 3, demoNums));
        console.log("Subproblem 2 (houses 1 to 4):", this.robLinear(1, 4, demoNums));
        console.log("Final result:", this.robIterative(demoNums));
        console.log("Optimal path:", this.getOptimalPath(demoNums));
    }
}

// ==================== MAIN EXECUTION ====================
/**
 * Main function to run all tests and demonstrations
 */
function runHouseRobber2Demo() {
    console.log("=== HOUSE ROBBER II - CIRCULAR HOUSES ===");
    
    // Test cases
    const testCases = [
        [2, 3, 2],           // Expected: 3
        [1, 2, 3, 1],        // Expected: 4
        [1, 2, 3, 4, 5],     // Expected: 8
        [2, 1, 1, 2],        // Expected: 3
        [1],                 // Expected: 1
        [1, 2],              // Expected: 2
        [],                  // Expected: 0
        [5, 1, 2, 6, 20, 2], // Expected: 25
        [2, 7, 9, 3, 1],     // Expected: 11
        [1, 3, 1, 3, 100]    // Expected: 103
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        const nums = testCases[i];
        console.log(`\n--- Test Case ${i + 1} ---`);
        console.log("Input:", HouseRobber2.arrayToString(nums));
        
        // Approach 1: Iterative (Space Optimized)
        const startTime1 = performance.now();
        const result1 = HouseRobber2.robIterative(nums);
        const endTime1 = performance.now();
        console.log(`Iterative Approach: ${result1} (Time: ${(endTime1 - startTime1).toFixed(3)} ms)`);
        
        // Approach 2: Recursive with Memoization
        const startTime2 = performance.now();
        const result2 = HouseRobber2.robMemoization(nums);
        const endTime2 = performance.now();
        console.log(`Memoization Approach: ${result2} (Time: ${(endTime2 - startTime2).toFixed(3)} ms)`);
        
        // Approach 3: Tabulation (Bottom-up DP)
        const startTime3 = performance.now();
        const result3 = HouseRobber2.robTabulation(nums);
        const endTime3 = performance.now();
        console.log(`Tabulation Approach: ${result3} (Time: ${(endTime3 - startTime3).toFixed(3)} ms)`);
        
        // Verify all approaches give same result
        if (result1 === result2 && result2 === result3) {
            console.log("✅ All approaches agree!");
        } else {
            console.log("❌ Results don't match!");
        }
    }
    
    // Demonstrate the circular constraint
    HouseRobber2.demonstrateCircularConstraint();
    
    // Performance comparison
    HouseRobber2.performanceTest();
}

// Run the demo
runHouseRobber2Demo();

// Export for use in other modules
module.exports = HouseRobber2; 