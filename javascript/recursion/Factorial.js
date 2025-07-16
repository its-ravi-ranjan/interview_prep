/**
 * Factorial using Recursion
 * 
 * Problem:
 * Write a recursive function fact(n) that returns the factorial of a number n.
 * 
 * Example:
 * Input: 5
 * Output: 120
 * Explanation: 5 * 4 * 3 * 2 * 1 = 120
 * 
 * Concepts:
 * 1. Recursion: Repeatedly multiply n with fact(n - 1)
 * 2. Base Case: fact(1) = 1
 * 3. Recursive Case: n * fact(n - 1)
 * 
 * Approach:
 * 1. If n === 1, return 1 (base case)
 * 2. Otherwise, return n * fact(n - 1)
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n) – one recursive call per number from n to 1
 * Space Complexity: O(n) – due to recursive call stack
 */

/**
 * Calculates the factorial of a number using recursion
 * @param {number} n - The number to calculate factorial for
 * @return {number} The factorial of n
 */
function fact(n) {
    // Base case: if n is 1, return 1
    if (n === 1) return 1;
    
    // Recursive case: multiply n with factorial of (n-1)
    return n * fact(n - 1);
}

// Test cases
function testFactorial() {
    // Test case 1: Basic case
    console.log("Factorial of 5:", fact(5));  // Expected: 120
    
    // Test case 2: Factorial of 1
    console.log("Factorial of 1:", fact(1));  // Expected: 1
    
    // Test case 3: Factorial of 0 (edge case)
    console.log("Factorial of 0:", fact(0));  // Expected: 1 (mathematical definition)
    
    // Test case 4: Factorial of 10
    console.log("Factorial of 10:", fact(10));  // Expected: 3628800
    
    // Example of what happens in the call stack for fact(5):
    /*
    fact(5)
        return 5 * fact(4)
            return 4 * fact(3)
                return 3 * fact(2)
                    return 2 * fact(1)
                        return 1
                    return 2 * 1 = 2
                return 3 * 2 = 6
            return 4 * 6 = 24
        return 5 * 24 = 120
    */
}

// Run tests
testFactorial(); 