/**
 * Fibonacci Sequence using Recursion
 * 
 * Problem:
 * Write a recursive function fib(n) that returns the nth Fibonacci number.
 * 
 * Fibonacci Sequence Definition:
 * F(0) = 0
 * F(1) = 1
 * F(n) = F(n-1) + F(n-2) for n > 1
 * 
 * Example Sequence:
 * 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
 * 
 * Concepts:
 * 1. Recursion: Function solves problem by calling itself on smaller sub-problems
 * 2. Base Cases: 
 *    - F(0) = 0
 *    - F(1) = 1
 * 3. Recursive Case: F(n) = F(n-1) + F(n-2)
 * 
 * Approach:
 * 1. If n <= 1, return n (base cases)
 * 2. Otherwise, return fib(n-1) + fib(n-2)
 * 
 * Time & Space Complexity:
 * Time Complexity: O(2^n) – each call makes 2 recursive calls, leading to a binary tree
 * Space Complexity: O(n) – maximum call stack depth is n
 * 
 * Note: This recursive implementation is inefficient for large n due to repeated
 * calculations of the same subproblems. For better performance, consider using
 * dynamic programming or memoization.
 */

/**
 * Calculates the nth Fibonacci number using recursion
 * @param {number} n - The position in the Fibonacci sequence
 * @return {number} The nth Fibonacci number
 */
function fib(n) {
    // Base cases: if n is 0 or 1, return n
    if (n <= 1) return n;
    
    // Recursive case: sum of previous two Fibonacci numbers
    return fib(n - 1) + fib(n - 2);
}

// Test cases
function testFibonacci() {
    // Test case 1: Basic cases
    console.log("Fibonacci(0):", fib(0));  // Expected: 0
    console.log("Fibonacci(1):", fib(1));  // Expected: 1
    console.log("Fibonacci(2):", fib(2));  // Expected: 1
    console.log("Fibonacci(3):", fib(3));  // Expected: 2
    console.log("Fibonacci(4):", fib(4));  // Expected: 3
    console.log("Fibonacci(5):", fib(5));  // Expected: 5
    
    // Test case 2: Larger numbers (note: will be slow due to O(2^n) complexity)
    console.log("Fibonacci(10):", fib(10));  // Expected: 55
    
    // Example of what happens in the call stack for fib(4):
    /*
    fib(4)
        return fib(3) + fib(2)
            fib(3)
                return fib(2) + fib(1)
                    fib(2)
                        return fib(1) + fib(0)
                            fib(1) = 1
                            fib(0) = 0
                        return 1 + 0 = 1
                    fib(1) = 1
                return 1 + 1 = 2
            fib(2)
                return fib(1) + fib(0)
                    fib(1) = 1
                    fib(0) = 0
                return 1 + 0 = 1
        return 2 + 1 = 3
    */
    
    // Note: For better performance, consider using dynamic programming:
    /*
    function fibDP(n) {
        if (n <= 1) return n;
        let dp = new Array(n + 1);
        dp[0] = 0;
        dp[1] = 1;
        for (let i = 2; i <= n; i++) {
            dp[i] = dp[i-1] + dp[i-2];
        }
        return dp[n];
    }
    */
}

// Run tests
testFibonacci(); 