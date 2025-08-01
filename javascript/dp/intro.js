/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation and dynamic programming learning guide
 * 
 * ========================================
 * DYNAMIC PROGRAMMING - COMPLETE GUIDE
 * ========================================
 * 
 * What is Dynamic Programming?
 * -----------------------------
 * DP is a method for solving complex problems by breaking them down into simpler subproblems.
 * It stores the results of subproblems to avoid redundant calculations.
 * 
 * Key Principles:
 * ---------------
 * 1. Optimal Substructure: Optimal solution contains optimal sub-solutions
 * 2. Overlapping Subproblems: Same subproblems are solved multiple times
 * 3. Memoization: Store results of subproblems (top-down)
 * 4. Tabulation: Build solution from bottom-up
 * 
 * Visual Example:
 * 
 * Fibonacci: F(n) = F(n-1) + F(n-2)
 * 
 * Recursive Tree:           DP Table:
 *      F(4)                    n: 0 1 2 3 4
 *     /   \                    F: 0 1 1 2 3
 *   F(3)  F(2)
 *   /  \   /  \
 * F(2) F(1) F(1) F(0)
 * 
 * ========================================
 * WHEN TO RECOGNIZE DP PROBLEMS
 * ========================================
 * 
 * 🔹 6. Ninja Techniques to Recognize DP Problems
 * 
 * ✅ "Count ways" or "number of" — often DP
 *    Examples: Climbing stairs, unique paths, coin change
 *    Pattern: Need to count all possible ways to achieve something
 * 
 * ✅ "Maximum/Minimum" with choices — likely DP
 *    Examples: House robber, maximum subarray, longest subsequence
 *    Pattern: Need to find optimal value among multiple choices
 * 
 * ✅ "Can you make" or "is it possible" — DP with boolean
 *    Examples: Partition equal subset sum, word break
 *    Pattern: Need to determine if target can be achieved
 * 
 * ✅ "Longest/Shortest" sequence — DP on arrays/strings
 *    Examples: Longest increasing subsequence, longest common subsequence
 *    Pattern: Need to find optimal sequence length
 * 
 * ✅ "Cost/Profit" optimization — DP with costs
 *    Examples: Minimum cost to climb stairs, maximum profit
 *    Pattern: Need to optimize cost/profit with constraints
 * 
 * ✅ "Grid/Maze" traversal — 2D DP
 *    Examples: Unique paths, minimum path sum, robot paths
 *    Pattern: Need to traverse grid with optimal path
 * 
 * ========================================
 * DP APPROACHES
 * ========================================
 * 
 * 1. TOP-DOWN (Memoization)
 * ---------------------------
 * Use: Recursive approach with caching
 * Data Structure: Map/Object for memo
 * Time: O(subproblems) - each solved once
 * Space: O(subproblems) + recursion stack
 * 
 * When to use:
 * - Natural recursive solution exists
 * - Want to avoid building full table
 * - Need to solve specific subproblems only
 * 
 * 2. BOTTOM-UP (Tabulation)
 * ---------------------------
 * Use: Iterative approach building from base cases
 * Data Structure: Array/Matrix for DP table
 * Time: O(subproblems)
 * Space: O(subproblems)
 * 
 * When to use:
 * - Want to avoid recursion stack
 * - Need all subproblems anyway
 * - Space optimization possible
 * 
 * 3. SPACE OPTIMIZATION
 * ----------------------
 * Use: Reduce space complexity by reusing arrays
 * Data Structure: 1D or 2D array instead of full table
 * Time: Same as bottom-up
 * Space: O(n) instead of O(n²)
 * 
 * When to use:
 * - Only need previous states
 * - Memory constraints
 * - Can overwrite old values
 * 
 * ========================================
 * COMMON PROBLEM PATTERNS
 * ========================================
 * 
 * Pattern 1: "1D DP" (Linear)
 * -----------------------------
 * Keywords: "stairs", "robber", "subarray", "sequence"
 * Solution: 1D array, each state depends on previous
 * Examples: Climbing stairs, house robber, maximum subarray
 * 
 * Pattern 2: "2D DP" (Grid)
 * ---------------------------
 * Keywords: "grid", "matrix", "paths", "maze"
 * Solution: 2D array, each state depends on left/up
 * Examples: Unique paths, minimum path sum
 * 
 * Pattern 3: "String DP"
 * ------------------------
 * Keywords: "subsequence", "substring", "palindrome"
 * Solution: 2D array, compare characters
 * Examples: LCS, longest palindromic substring
 * 
 * Pattern 4: "Knapsack" (0/1)
 * -----------------------------
 * Keywords: "subset", "sum", "capacity", "weight"
 * Solution: 2D array, include/exclude choices
 * Examples: Subset sum, partition equal subset
 * 
 * Pattern 5: "Unbounded Knapsack"
 * ---------------------------------
 * Keywords: "coins", "infinite", "multiple uses"
 * Solution: 1D array, can reuse items
 * Examples: Coin change, rod cutting
 * 
 * Pattern 6: "State Machine"
 * ----------------------------
 * Keywords: "buy/sell", "hold", "state transitions"
 * Solution: Multiple DP arrays for different states
 * Examples: Best time to buy/sell stock
 * 
 * ========================================
 * IMPLEMENTATION STRATEGIES
 * ========================================
 * 
 * JavaScript DP Implementation:
 * ------------------------------
 * 
 * // Top-down with memoization
 * const memo = new Map();
 * 
 * function solve(n) {
 *     if (memo.has(n)) return memo.get(n);
 *     if (n <= 1) return n;
 *     
 *     const result = solve(n-1) + solve(n-2);
 *     memo.set(n, result);
 *     return result;
 * }
 * 
 * // Bottom-up with tabulation
 * function fibonacciBottomUp(n) {
 *     const dp = new Array(n + 1).fill(0);
 *     dp[0] = 0; dp[1] = 1;
 *     
 *     for (let i = 2; i <= n; i++) {
 *         dp[i] = dp[i-1] + dp[i-2];
 *     }
 *     return dp[n];
 * }
 * 
 * // Space optimization
 * function fibonacciOptimized(n) {
 *     if (n <= 1) return n;
 *     
 *     let prev = 0, curr = 1;
 *     for (let i = 2; i <= n; i++) {
 *         const next = prev + curr;
 *         prev = curr;
 *         curr = next;
 *     }
 *     return curr;
 * }
 * 
 * ========================================
 * TIME COMPLEXITY GUIDE
 * ========================================
 * 
 * Problem Type        | Time Complexity | Space Complexity
 * --------------------|-----------------|------------------
 * 1D DP              | O(n)            | O(n) / O(1)
 * 2D DP              | O(m*n)          | O(m*n) / O(n)
 * String DP          | O(n²)           | O(n²)
 * Knapsack           | O(n*W)          | O(n*W) / O(W)
 * State Machine      | O(n*k)          | O(n*k) / O(k)
 * 
 * Optimization       | Time            | Space
 * --------------------|-----------------|------------------
 * Memoization        | Same            | O(subproblems)
 * Tabulation         | Same            | O(subproblems)
 * Space Opt          | Same            | Reduced
 * 
 * ========================================
 * INTERVIEW TIPS
 * ========================================
 * 
 * 1. RECOGNITION TIPS:
 *    - Look for "count", "maximum", "minimum" keywords
 *    - Check if problem has overlapping subproblems
 *    - Identify if choices lead to optimal substructure
 *    - See if brute force would be exponential
 * 
 * 2. IMPLEMENTATION TIPS:
 *    - Start with recursive solution
 *    - Add memoization to avoid recomputation
 *    - Convert to bottom-up if needed
 *    - Optimize space if possible
 *    - Use Map for memoization in JavaScript
 * 
 * 3. OPTIMIZATION TIPS:
 *    - Use space optimization when possible
 *    - Consider if you need full table
 *    - Look for patterns in state transitions
 *    - Think about rolling arrays
 *    - Use Array.fill() for initialization
 * 
 * 4. COMMON MISTAKES:
 *    - Not identifying overlapping subproblems
 *    - Wrong state definition
 *    - Incorrect base cases
 *    - Not handling edge cases
 *    - Forgetting to initialize DP array
 *    - Not using Map for memoization
 * 
 * ========================================
 * PRACTICE PROBLEMS BY DIFFICULTY
 * ========================================
 * 
 * EASY:
 * - Climbing Stairs
 * - House Robber
 * - Maximum Subarray
 * - Fibonacci Number
 * 
 * MEDIUM:
 * - Coin Change
 * - Longest Increasing Subsequence
 * - Unique Paths
 * - Partition Equal Subset Sum
 * 
 * HARD:
 * - Longest Common Subsequence
 * - Edit Distance
 * - Best Time to Buy/Sell Stock III
 * - Regular Expression Matching
 * 
 * ========================================
 * QUICK REFERENCE
 * ========================================
 * 
 * When to use DP:
 * - Problem has overlapping subproblems
 * - Optimal substructure exists
 * - Brute force would be exponential
 * - Need to count ways or find optimal value
 * - Choices lead to different outcomes
 * 
 * Which Approach to use:
 * - Top-down: Natural recursive solution
 * - Bottom-up: Avoid recursion, space optimization
 * - Space Opt: Only need previous states
 * 
 * Key Steps:
 * 1. Identify subproblems
 * 2. Define state (what to store)
 * 3. Write recurrence relation
 * 4. Set base cases
 * 5. Choose implementation (top-down/bottom-up)
 * 6. Optimize space if possible
 * 
 * Time Complexity:
 * - Usually O(subproblems)
 * - Each subproblem solved once
 * - Space can often be optimized
 * 
 * JavaScript-Specific Notes:
 * - Use Map for memoization (better than object)
 * - Use Array.fill() for initialization
 * - Consider BigInt for large numbers
 * - Use const/let instead of var
 * - Handle undefined values properly
 * 
 * This guide should help you quickly identify DP problems and choose the right approach!
 */

/**
 * This is a reference guide for dynamic programming problems.
 * No implementation needed - just concepts and patterns.
 */

function main() {
    console.log("=== DYNAMIC PROGRAMMING GUIDE ===");
    console.log("Use this as a quick reference for DP problems.");
    console.log("Key patterns to recognize:");
    console.log("1. 'Count ways' or 'number of' problems");
    console.log("2. 'Maximum/Minimum' with choices");
    console.log("3. 'Can you make' or 'is it possible'");
    console.log("4. 'Longest/Shortest' sequence");
    console.log("5. 'Cost/Profit' optimization");
    console.log("6. 'Grid/Maze' traversal");
    console.log();
    console.log("Choose approach based on problem:");
    console.log("- Top-down: Natural recursive solution");
    console.log("- Bottom-up: Avoid recursion, optimize space");
    console.log("- Space Opt: Only need previous states");
    console.log();
    console.log("JavaScript Implementation Tips:");
    console.log("- Use Map for memoization");
    console.log("- Use Array.fill() for initialization");
    console.log("- Handle undefined values properly");
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        main,
        // Add any helper functions here if needed
    };
} else {
    // Run if executed directly
    main();
} 