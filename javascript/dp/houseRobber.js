/**
 * HOUSE ROBBER - DYNAMIC PROGRAMMING PROBLEM
 * 
 * 🎯 PROBLEM STATEMENT:
 * You are a professional robber planning to rob houses along a street. 
 * Each house has a certain amount of money stashed, the only constraint 
 * stopping you from robbing each of them is that adjacent houses have 
 * security systems connected and it will automatically contact the police 
 * if two adjacent houses were broken into on the same night.
 * 
 * Given an integer array nums representing the amount of money of each house, 
 * return the maximum amount of money you can rob tonight without alerting the police.
 * 
 * 📝 EXAMPLES:
 * Input: nums = [1,2,3,1]
 * Output: 4
 * Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
 * Total amount you can rob = 1 + 3 = 4.
 * 
 * Input: nums = [2,7,9,3,1]
 * Output: 12
 * Explanation: Rob house 1 (money = 2), rob house 3 (money = 9), and rob house 5 (money = 1).
 * Total amount you can rob = 2 + 9 + 1 = 12.
 * 
 * 🔍 PATTERN RECOGNITION:
 * This is a variation of the maximum subarray problem with constraints!
 * At each house, we have two choices:
 * 1. Rob this house + money from house i-2
 * 2. Skip this house + money from house i-1
 * 
 * 🎯 KEY INSIGHT:
 * For each house i, the maximum money we can rob is:
 * dp[i] = max(dp[i-1], nums[i] + dp[i-2])
 * 
 * This means: max(skip current house, rob current house + money from 2 houses back)
 */

class HouseRobber {
    
    // ==================== APPROACH 1: ITERATIVE (SPACE OPTIMIZED) ====================
    /**
     * 🎯 APPROACH: Iterative with Constant Space
     * 
     * 💡 IDEA: 
     * - Use only two variables to track previous two maximum values
     * - At each step, choose between robbing current house or skipping it
     * - This is the most space-efficient approach
     * 
     * 🔄 ALGORITHM:
     * 1. Handle base cases: empty array = 0, single house = house value
     * 2. Initialize prev2 = nums[0], prev1 = max(nums[0], nums[1])
     * 3. For i from 2 to n-1:
     *    - current = max(prev1, nums[i] + prev2)
     *    - Update prev2 = prev1, prev1 = current
     * 4. Return prev1
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Single loop through the array
     *    - Constant time operations in each iteration
     * 
     * 🏠 SPACE COMPLEXITY: O(1)
     *    - Only uses 3 variables regardless of input size
     *    - Most space-efficient approach
     * 
     * 🎯 INTERVIEW ANSWER: "This is the most efficient approach with O(n) time 
     * and O(1) space. It uses the iterative pattern with constant space by 
     * maintaining only the previous two maximum values."
     */
    static robIterative(nums) {
        if (nums.length === 0) return 0;
        if (nums.length === 1) return nums[0];
        
        let prev2 = nums[0];  // Maximum money from 2 houses back
        let prev1 = Math.max(prev2, nums[1]);  // Maximum money from 1 house back
        
        for (let i = 2; i < nums.length; i++) {
            const current = Math.max(prev1, nums[i] + prev2);
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
    
    // ==================== APPROACH 2: RECURSIVE WITH MEMOIZATION ====================
    /**
     * 🎯 APPROACH: Recursive with Memoization (Top-down DP)
     * 
     * 💡 IDEA:
     * - Use recursion to break down the problem
     * - Cache results to avoid recalculating subproblems
     * - Top-down approach: solve from end down to base cases
     * 
     * 🔄 ALGORITHM:
     * 1. Create memo array to cache results
     * 2. Base cases: f(0) = nums[0], f(1) = max(nums[0], nums[1])
     * 3. For each position, check if result is cached
     * 4. If not cached, calculate f(i) = max(f(i-1), nums[i] + f(i-2))
     * 5. Cache and return result
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Each subproblem is solved only once
     *    - Total number of unique subproblems is n
     *    - Without memoization: O(2^n) exponential time
     * 
     * 🏠 SPACE COMPLEXITY: O(n)
     *    - Memo array: O(n)
     *    - Recursion call stack: O(n) in worst case
     *    - Total: O(n)
     * 
     * 🎯 INTERVIEW ANSWER: "This approach uses recursion with memoization to 
     * avoid recalculating subproblems. It has O(n) time and space complexity, 
     * where the space is used for both the memo array and recursion stack."
     */
    static robMemoization(nums) {
        if (nums.length === 0) return 0;
        if (nums.length === 1) return nums[0];
        
        const memo = new Array(nums.length).fill(0);
        return this.helper(nums, nums.length - 1, memo);
    }
    
    static helper(nums, index, memo) {
        // Base cases
        if (index === 0) return nums[0];
        if (index === 1) return Math.max(nums[0], nums[1]);
        
        // Check if result is already cached
        if (memo[index] !== 0) return memo[index];
        
        // Calculate and cache result
        memo[index] = Math.max(
            this.helper(nums, index - 1, memo),  // Skip current house
            nums[index] + this.helper(nums, index - 2, memo)  // Rob current house
        );
        return memo[index];
    }
    
    // ==================== APPROACH 3: TABULATION (BOTTOM-UP DP) ====================
    /**
     * 🎯 APPROACH: Tabulation (Bottom-up Dynamic Programming)
     * 
     * 💡 IDEA:
     * - Build solution from base cases up to target
     * - Use array to store all intermediate results
     * - Bottom-up approach: solve from beginning to end
     * 
     * 🔄 ALGORITHM:
     * 1. Create DP array of size n
     * 2. Set base cases: dp[0] = nums[0], dp[1] = max(nums[0], nums[1])
     * 3. For i from 2 to n-1:
     *    - dp[i] = max(dp[i-1], nums[i] + dp[i-2])
     * 4. Return dp[n-1]
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Single loop through the array
     *    - Constant time operations in each iteration
     * 
     * 🏠 SPACE COMPLEXITY: O(n)
     *    - DP array of size n
     *    - No recursion stack overhead
     * 
     * 🎯 INTERVIEW ANSWER: "This bottom-up approach builds the solution 
     * iteratively from base cases. It has O(n) time and O(n) space complexity, 
     * where space is used for the DP array to store all intermediate results."
     */
    static robTabulation(nums) {
        const n = nums.length;
        if (n === 0) return 0;
        if (n === 1) return nums[0];
        
        const dp = new Array(n).fill(0);
        dp[0] = nums[0];  // Base case: only first house
        dp[1] = Math.max(nums[0], nums[1]);  // Base case: max of first two houses
        
        for (let i = 2; i < n; i++) {
            dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
        }
        
        return dp[n - 1];
    }
    
    // ==================== BONUS: TRACKING OPTIMAL PATH ====================
    /**
     * 🎯 BONUS: Track which houses to rob for maximum profit
     * 
     * 💡 IDEA:
     * - Use the same DP approach but track decisions
     * - Backtrack through the DP array to find optimal path
     * - Useful for understanding the solution
     */
    static getOptimalPath(nums) {
        if (nums.length === 0) return "No houses to rob";
        if (nums.length === 1) return "Rob house 1";
        
        const n = nums.length;
        const dp = new Array(n).fill(0);
        const robbed = new Array(n).fill(false);  // Track which houses were robbed
        
        // Base cases
        dp[0] = nums[0];
        robbed[0] = true;
        
        if (nums[1] > nums[0]) {
            dp[1] = nums[1];
            robbed[0] = false;
            robbed[1] = true;
        } else {
            dp[1] = nums[0];
            robbed[1] = false;
        }
        
        // Fill DP array
        for (let i = 2; i < n; i++) {
            if (dp[i - 1] > nums[i] + dp[i - 2]) {
                dp[i] = dp[i - 1];
                robbed[i] = false;  // Skip current house
            } else {
                dp[i] = nums[i] + dp[i - 2];
                robbed[i] = true;   // Rob current house
            }
        }
        
        // Build result string
        let result = "";
        for (let i = 0; i < n; i++) {
            if (robbed[i]) {
                if (result.length > 0) result += " + ";
                result += `house ${i + 1}($${nums[i]})`;
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
     * Demonstrate the pattern with examples
     */
    static demonstratePattern() {
        console.log("\n=== PATTERN DEMONSTRATION ===");
        const demoNums = [2, 7, 9, 3, 1, 8, 4, 6];
        console.log("Input:", this.arrayToString(demoNums));
        console.log("Optimal robbery path:", this.getOptimalPath(demoNums));
        console.log("Maximum money:", this.robIterative(demoNums));
    }
}

// ==================== MAIN EXECUTION ====================
/**
 * Main function to run all tests and demonstrations
 */
function runHouseRobberDemo() {
    console.log("=== HOUSE ROBBER - DYNAMIC PROGRAMMING ===");
    
    // Test cases
    const testCases = [
        [1, 2, 3, 1],           // Expected: 4
        [2, 7, 9, 3, 1],        // Expected: 12
        [1, 2, 3, 4, 5],        // Expected: 9
        [2, 1, 1, 2],           // Expected: 4
        [1],                    // Expected: 1
        [1, 2],                 // Expected: 2
        [],                     // Expected: 0
        [5, 1, 2, 6, 20, 2]     // Expected: 27
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        const nums = testCases[i];
        console.log(`\n--- Test Case ${i + 1} ---`);
        console.log("Input:", HouseRobber.arrayToString(nums));
        
        // Approach 1: Iterative (Space Optimized)
        const startTime1 = performance.now();
        const result1 = HouseRobber.robIterative(nums);
        const endTime1 = performance.now();
        console.log(`Iterative Approach: ${result1} (Time: ${(endTime1 - startTime1).toFixed(3)} ms)`);
        
        // Approach 2: Recursive with Memoization
        const startTime2 = performance.now();
        const result2 = HouseRobber.robMemoization(nums);
        const endTime2 = performance.now();
        console.log(`Memoization Approach: ${result2} (Time: ${(endTime2 - startTime2).toFixed(3)} ms)`);
        
        // Approach 3: Tabulation (Bottom-up DP)
        const startTime3 = performance.now();
        const result3 = HouseRobber.robTabulation(nums);
        const endTime3 = performance.now();
        console.log(`Tabulation Approach: ${result3} (Time: ${(endTime3 - startTime3).toFixed(3)} ms)`);
        
        // Verify all approaches give same result
        if (result1 === result2 && result2 === result3) {
            console.log("✅ All approaches agree!");
        } else {
            console.log("❌ Results don't match!");
        }
    }
    
    // Demonstrate the pattern
    HouseRobber.demonstratePattern();
    
    // Performance comparison
    HouseRobber.performanceTest();
}

// Run the demo
runHouseRobberDemo();

// Export for use in other modules
module.exports = HouseRobber; 