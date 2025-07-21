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

public class ClimbingStairs {
    
    public static void main(String[] args) {
        System.out.println("=== CLIMBING STAIRS - DYNAMIC PROGRAMMING ===");
        
        // Test cases
        int[] testCases = {1, 2, 3, 4, 5, 10, 20};
        
        for (int n : testCases) {
            System.out.println("\n--- Testing n = " + n + " ---");
            
            // Approach 1: Iterative (Space Optimized)
            long startTime = System.nanoTime();
            int result1 = climbStairsIterative(n);
            long endTime = System.nanoTime();
            System.out.println("Iterative Approach: " + result1 + 
                             " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            // Approach 2: Recursive with Memoization
            startTime = System.nanoTime();
            int result2 = climbStairsMemoization(n);
            endTime = System.nanoTime();
            System.out.println("Memoization Approach: " + result2 + 
                             " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            // Approach 3: Tabulation (Bottom-up DP)
            startTime = System.nanoTime();
            int result3 = climbStairsTabulation(n);
            endTime = System.nanoTime();
            System.out.println("Tabulation Approach: " + result3 + 
                             " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            // Verify all approaches give same result
            if (result1 == result2 && result2 == result3) {
                System.out.println("✅ All approaches agree!");
            } else {
                System.out.println("❌ Results don't match!");
            }
        }
        
        // Demonstrate the pattern
        System.out.println("\n=== FIBONACCI PATTERN DEMONSTRATION ===");
        for (int i = 1; i <= 10; i++) {
            System.out.println("n=" + i + " → " + climbStairsIterative(i) + " ways");
        }
    }
    
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
    public static int climbStairsIterative(int n) {
        if (n <= 1) return 1;
        
        int prev1 = 1;  // f(1) = 1
        int prev2 = 1;  // f(0) = 1
        
        for (int i = 2; i <= n; i++) {
            int current = prev1 + prev2;
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
    public static int climbStairsMemoization(int n) {
        int[] memo = new int[n + 1];
        return helper(n, memo);
    }
    
    private static int helper(int n, int[] memo) {
        // Base cases
        if (n == 0 || n == 1) return 1;
        
        // Check if result is already cached
        if (memo[n] != 0) return memo[n];
        
        // Calculate and cache result
        memo[n] = helper(n - 1, memo) + helper(n - 2, memo);
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
    public static int climbStairsTabulation(int n) {
        if (n <= 1) return 1;
        
        int[] dp = new int[n + 1];
        dp[0] = 1;  // Base case: 0 steps = 1 way (do nothing)
        dp[1] = 1;  // Base case: 1 step = 1 way
        
        for (int i = 2; i <= n; i++) {
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
    public static int climbStairsMatrix(int n) {
        if (n <= 1) return 1;
        
        // Matrix: [[1, 1], [1, 0]]
        long[][] matrix = {{1, 1}, {1, 0}};
        matrix = matrixPower(matrix, n);
        
        return (int) matrix[0][0];
    }
    
    private static long[][] matrixPower(long[][] matrix, int n) {
        if (n == 0) return new long[][]{{1, 0}, {0, 1}}; // Identity matrix
        if (n == 1) return matrix;
        
        long[][] half = matrixPower(matrix, n / 2);
        long[][] result = matrixMultiply(half, half);
        
        if (n % 2 == 1) {
            result = matrixMultiply(result, matrix);
        }
        
        return result;
    }
    
    private static long[][] matrixMultiply(long[][] a, long[][] b) {
        return new long[][]{
            {a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]},
            {a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]}
        };
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
     *    ✅ Can handle larger values with BigInteger
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
    public static void performanceTest() {
        System.out.println("\n=== PERFORMANCE COMPARISON ===");
        
        int[] testSizes = {10, 100, 1000, 10000};
        
        for (int n : testSizes) {
            System.out.println("\nTesting n = " + n);
            
            // Test iterative
            long start = System.nanoTime();
            int result1 = climbStairsIterative(n);
            long time1 = System.nanoTime() - start;
            
            // Test memoization
            start = System.nanoTime();
            int result2 = climbStairsMemoization(n);
            long time2 = System.nanoTime() - start;
            
            // Test tabulation
            start = System.nanoTime();
            int result3 = climbStairsTabulation(n);
            long time3 = System.nanoTime() - start;
            
            System.out.printf("Iterative: %d ways, %d μs%n", result1, time1 / 1000);
            System.out.printf("Memoization: %d ways, %d μs%n", result2, time2 / 1000);
            System.out.printf("Tabulation: %d ways, %d μs%n", result3, time3 / 1000);
        }
    }
} 