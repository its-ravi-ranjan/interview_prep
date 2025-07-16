package recursion;

/**
 * Sum of First N Natural Numbers using Recursion
 * 
 * Problem:
 * Write a function sum(n) that calculates the sum of the first n natural numbers using recursion.
 * 
 * Example:
 * Input: 5
 * Output: 15
 * Explanation: 5 + 4 + 3 + 2 + 1 = 15
 * 
 * Concepts:
 * 1. Recursion: A technique where a function calls itself with a reduced subproblem
 * 2. Base Case: Stops recursion to prevent infinite calls (if n == 0, return 0)
 * 3. Recursive Case: Return n + sum(n - 1)
 * 
 * Approach:
 * 1. If n == 0, return 0 (base case)
 * 2. Otherwise, return n + sum(n - 1)
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n) – one call per value from n to 0
 * Space Complexity: O(n) – due to call stack in recursion
 */
public class SumOfN {
    
    /**
     * Calculates the sum of first n natural numbers using recursion
     * @param n The number up to which sum is to be calculated
     * @return The sum of first n natural numbers
     */
    public static int sum(int n) {
        // Base case: if n is 0, return 0
        if (n == 0) return 0;
        
        // Recursive case: return n + sum of (n-1)
        return n + sum(n - 1);
    }
    
    public static void main(String[] args) {
        // Test case 1: Basic case
        System.out.println("Sum of first 5 natural numbers: " + sum(5));  // Expected: 15
        
        // Test case 2: Sum of first 1 natural number
        System.out.println("Sum of first 1 natural number: " + sum(1));  // Expected: 1
        
        // Test case 3: Sum of first 0 natural numbers
        System.out.println("Sum of first 0 natural numbers: " + sum(0));  // Expected: 0
        
        // Test case 4: Sum of first 10 natural numbers
        System.out.println("Sum of first 10 natural numbers: " + sum(10));  // Expected: 55
        
        // Example of what happens in the call stack for sum(5):
        /*
        sum(5)
            return 5 + sum(4)
                return 4 + sum(3)
                    return 3 + sum(2)
                        return 2 + sum(1)
                            return 1 + sum(0)
                                return 0
                            return 1 + 0 = 1
                        return 2 + 1 = 3
                    return 3 + 3 = 6
                return 4 + 6 = 10
            return 5 + 10 = 15
        */
    }
} 