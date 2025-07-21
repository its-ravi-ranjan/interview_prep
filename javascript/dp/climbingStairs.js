/**
 * CLIMBING STAIRS - DYNAMIC PROGRAMMING PROBLEM
 * 
 * 🎯 PROBLEM STATEMENT:
 * You are climbing a staircase. It takes n steps to reach the top.
 * Each time you can either climb 1 or 2 steps. 
 * In how many distinct ways can you climb to the top?
 * 
 * 📝 EXAMPLES:
 * Input: n = 2
 * Output: 2
 * Explanation: There are two ways to climb to the top.
 * 1. 1 step + 1 step
 * 2. 2 steps
 * 
 * Input: n = 3
 * Output: 3
 * Explanation: There are three ways to climb to the top.
 * 1. 1 step + 1 step + 1 step
 * 2. 1 step + 2 steps
 * 3. 2 steps + 1 step
 * 
 * 🔍 PATTERN RECOGNITION:
 * This is essentially the Fibonacci sequence!
 * f(n) = f(n-1) + f(n-2)
 * Base cases: f(0) = 1, f(1) = 1
 * 
 * 🎯 KEY INSIGHT:
 * To reach step n, you can either:
 * 1. Come from step n-1 (climb 1 step)
 * 2. Come from step n-2 (climb 2 steps)
 * 
 * Therefore: ways(n) = ways(n-1) + ways(n-2)
 */

class ClimbingStairs {
    
    // ==================== APPROACH 1: ITERATIVE (SPACE OPTIMIZED) ====================
    /**
     * 🎯 APPROACH: Iterative with Constant Space
     * 
     * 💡 IDEA: 
     * - Use only two variables to track previous two values
     * - Update them iteratively to build the sequence
     * - This is the most space-efficient approach
     * 
     * 🔄 ALGORITHM:
     * 1. Initialize prev1 = 1, prev2 = 1 (base cases)
     * 2. For i from 2 to n:
     *    - Calculate current = prev1 + prev2
     *    - Update prev2 = prev1
     *    - Update prev1 = current
     * 3. Return prev1
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Single loop from 2 to n
     *    - Constant time operations in each iteration
     * 
     * 🏠 SPACE COMPLEXITY: O(1)
     *    - Only uses 3 variables regardless of input size
     *    - Most space-efficient approach
     * 
     * 🎯 INTERVIEW ANSWER: "This is the most efficient approach with O(n) time 
     * and O(1) space. It uses the iterative Fibonacci pattern with constant 
     * space by maintaining only the previous two values."
     */
    static climbStairsIterative(n) {
        if (n <= 1) return 1;
        
        let prev1 = 1;  // f(1) = 1
        let prev2 = 1;  // f(0) = 1
        
        for (let i = 2; i <= n; i++) {
            const current = prev1 + prev2;
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
     * - Top-down approach: solve from n down to base cases
     * 
     * 🔄 ALGORITHM:
     * 1. Create memo array to cache results
     * 2. Base cases: f(0) = 1, f(1) = 1
     * 3. For each n, check if result is cached
     * 4. If not cached, calculate f(n) = f(n-1) + f(n-2)
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
    static climbStairsMemoization(n) {
        const memo = new Array(n + 1).fill(0);
        return this.helper(n, memo);
    }
    
    static helper(n, memo) {
        // Base cases
        if (n === 0 || n === 1) return 1;
        
        // Check if result is already cached
        if (memo[n] !== 0) return memo[n];
        
        // Calculate and cache result
        memo[n] = this.helper(n - 1, memo) + this.helper(n - 2, memo);
        return memo[n];
    }
    
    // ==================== APPROACH 3: TABULATION (BOTTOM-UP DP) ====================
    /**
     * 🎯 APPROACH: Tabulation (Bottom-up Dynamic Programming)
     * 
     * 💡 IDEA:
     * - Build solution from base cases up to target
     * - Use array to store all intermediate results
     * - Bottom-up approach: solve from base cases up to n
     * 
     * 🔄 ALGORITHM:
     * 1. Create DP array of size n+1
     * 2. Set base cases: dp[0] = 1, dp[1] = 1
     * 3. For i from 2 to n:
     *    - dp[i] = dp[i-1] + dp[i-2]
     * 4. Return dp[n]
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Single loop from 2 to n
     *    - Constant time operations in each iteration
     * 
     * 🏠 SPACE COMPLEXITY: O(n)
     *    - DP array of size n+1
     *    - No recursion stack overhead
     * 
     * 🎯 INTERVIEW ANSWER: "This bottom-up approach builds the solution 
     * iteratively from base cases. It has O(n) time and O(n) space complexity, 
     * where space is used for the DP array to store all intermediate results."
     */
    static climbStairsTabulation(n) {
        if (n <= 1) return 1;
        
        const dp = new Array(n + 1).fill(0);
        dp[0] = 1;  // Base case: 0 steps = 1 way (do nothing)
        dp[1] = 1;  // Base case: 1 step = 1 way
        
        for (let i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
    
    // ==================== BONUS: MATRIX EXPONENTIATION ====================
    /**
     * 🎯 BONUS APPROACH: Matrix Exponentiation (Advanced)
     * 
     * 💡 IDEA:
     * - Use matrix multiplication to calculate Fibonacci in O(log n)
     * - Based on the fact that Fibonacci can be represented as matrix power
     * - Most efficient for very large values of n
     * 
     * ⏰ TIME COMPLEXITY: O(log n)
     * 🏠 SPACE COMPLEXITY: O(1)
     * 
     * Note: This is advanced and usually not expected in interviews
     */
    static climbStairsMatrix(n) {
        if (n <= 1) return 1;
        
        // Matrix: [[1, 1], [1, 0]]
        let matrix = [[1, 1], [1, 0]];
        matrix = this.matrixPower(matrix, n);
        
        return matrix[0][0];
    }
    
    static matrixPower(matrix, n) {
        if (n === 0) return [[1, 0], [0, 1]]; // Identity matrix
        if (n === 1) return matrix;
        
        const half = this.matrixPower(matrix, Math.floor(n / 2));
        let result = this.matrixMultiply(half, half);
        
        if (n % 2 === 1) {
            result = this.matrixMultiply(result, matrix);
        }
        
        return result;
    }
    
    static matrixMultiply(a, b) {
        return [
            [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
            [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]]
        ];
    }
    
    // ==================== COMPARISON AND ANALYSIS ====================
    /**
     * 📊 COMPARISON OF APPROACHES:
     * 
     * 1. ITERATIVE (RECOMMENDED):
     *    ✅ Time: O(n), Space: O(1)
     *    ✅ Most efficient for most cases
     *    ✅ Simple to understand and implement
     *    ❌ Not suitable for very large n (overflow)
     * 
     * 2. MEMOIZATION:
     *    ✅ Time: O(n), Space: O(n)
     *    ✅ Good for understanding recursion
     *    ✅ Can handle larger values with BigInt
     *    ❌ Recursion stack overhead
     * 
     * 3. TABULATION:
     *    ✅ Time: O(n), Space: O(n)
     *    ✅ No recursion overhead
     *    ✅ Good for understanding DP
     *    ❌ Uses more space than iterative
     * 
     * 4. MATRIX EXPONENTIATION:
     *    ✅ Time: O(log n), Space: O(1)
     *    ✅ Most efficient for very large n
     *    ❌ Complex implementation
     *    ❌ Usually not expected in interviews
     * 
     * 🎯 INTERVIEW RECOMMENDATION:
     * - Start with iterative approach (most practical)
     * - Mention memoization if asked about recursion
     * - Discuss tabulation if asked about DP
     * - Matrix exponentiation only if specifically asked
     */
    
    // ==================== TESTING UTILITIES ====================
    /**
     * Utility method to test all approaches and compare performance
     */
    static performanceTest() {
        console.log("\n=== PERFORMANCE COMPARISON ===");
        
        const testSizes = [10, 100, 1000, 10000];
        
        for (const n of testSizes) {
            console.log(`\nTesting n = ${n}`);
            
            // Test iterative
            const start1 = performance.now();
            const result1 = this.climbStairsIterative(n);
            const time1 = performance.now() - start1;
            
            // Test memoization
            const start2 = performance.now();
            const result2 = this.climbStairsMemoization(n);
            const time2 = performance.now() - start2;
            
            // Test tabulation
            const start3 = performance.now();
            const result3 = this.climbStairsTabulation(n);
            const time3 = performance.now() - start3;
            
            console.log(`Iterative: ${result1} ways, ${time1.toFixed(3)} ms`);
            console.log(`Memoization: ${result2} ways, ${time2.toFixed(3)} ms`);
            console.log(`Tabulation: ${result3} ways, ${time3.toFixed(3)} ms`);
        }
    }
    
    /**
     * Demonstrate the Fibonacci pattern
     */
    static demonstratePattern() {
        console.log("\n=== FIBONACCI PATTERN DEMONSTRATION ===");
        for (let i = 1; i <= 10; i++) {
            console.log(`n=${i} → ${this.climbStairsIterative(i)} ways`);
        }
    }
}

// ==================== MAIN EXECUTION ====================
/**
 * Main function to run all tests and demonstrations
 */
function runClimbingStairsDemo() {
    console.log("=== CLIMBING STAIRS - DYNAMIC PROGRAMMING ===");
    
    // Test cases
    const testCases = [1, 2, 3, 4, 5, 10, 20];
    
    for (const n of testCases) {
        console.log(`\n--- Testing n = ${n} ---`);
        
        // Approach 1: Iterative (Space Optimized)
        const startTime1 = performance.now();
        const result1 = ClimbingStairs.climbStairsIterative(n);
        const endTime1 = performance.now();
        console.log(`Iterative Approach: ${result1} (Time: ${(endTime1 - startTime1).toFixed(3)} ms)`);
        
        // Approach 2: Recursive with Memoization
        const startTime2 = performance.now();
        const result2 = ClimbingStairs.climbStairsMemoization(n);
        const endTime2 = performance.now();
        console.log(`Memoization Approach: ${result2} (Time: ${(endTime2 - startTime2).toFixed(3)} ms)`);
        
        // Approach 3: Tabulation (Bottom-up DP)
        const startTime3 = performance.now();
        const result3 = ClimbingStairs.climbStairsTabulation(n);
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
    ClimbingStairs.demonstratePattern();
    
    // Performance comparison
    ClimbingStairs.performanceTest();
    
    // Test matrix exponentiation for larger values
    console.log("\n=== MATRIX EXPONENTIATION TEST ===");
    const largeN = 45; // Large enough to see difference
    const startTime = performance.now();
    const matrixResult = ClimbingStairs.climbStairsMatrix(largeN);
    const endTime = performance.now();
    console.log(`Matrix Exponentiation for n=${largeN}: ${matrixResult} (Time: ${(endTime - startTime).toFixed(3)} ms)`);
}

// Run the demo
runClimbingStairsDemo();

// Export for use in other modules
module.exports = ClimbingStairs; 