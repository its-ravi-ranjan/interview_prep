package recursion;

/**
 * Power of Two using Recursion
 * 
 * Problem:
 * Write a recursive function isPowerOfTwo(n) that returns true if n is a power of 2,
 * otherwise false.
 * 
 * Example:
 * Input: 8
 * Output: true
 * Explanation: 8 → 4 → 2 → 1 (can be divided by 2 repeatedly until reaching 1)
 * 
 * Input: 18
 * Output: false
 * Explanation: 18 → 9 (cannot be divided by 2 further as 9 is odd)
 * 
 * Concepts:
 * 1. Power of Two: A number is a power of 2 if it can be divided by 2 repeatedly until it reaches 1
 * 2. Base Case: n == 1 → true
 * 3. Invalid Case: n < 1 or n % 2 != 0 → false
 * 4. Recursive Case: isPowerOfTwo(n / 2)
 * 
 * Approach:
 * 1. If n == 1, return true (base case)
 * 2. If n < 1 or n % 2 != 0, return false (invalid case)
 * 3. Otherwise, recursively check n / 2
 * 
 * Time & Space Complexity:
 * Time Complexity: O(log n) – number of divisions by 2 until reaching 1
 * Space Complexity: O(log n) – due to recursive call stack
 */
public class PowerOfTwo {
    
    /**
     * Checks if a number is a power of 2 using recursion
     * @param n The number to check
     * @return True if n is a power of 2, false otherwise
     */
    public static boolean isPowerOfTwo(int n) {
        // Base case: if n is 1, it's a power of 2
        if (n == 1) return true;
        
        // Invalid cases: if n is less than 1 or odd, it's not a power of 2
        if (n < 1 || n % 2 != 0) return false;
        
        // Recursive case: check if n/2 is a power of 2
        return isPowerOfTwo(n / 2);
    }
    
    public static void main(String[] args) {
        // Test case 1: Basic power of 2
        System.out.println("Is 8 a power of 2? " + isPowerOfTwo(8));  // Expected: true
        
        // Test case 2: Not a power of 2
        System.out.println("Is 18 a power of 2? " + isPowerOfTwo(18));  // Expected: false
        
        // Test case 3: Edge case - 1
        System.out.println("Is 1 a power of 2? " + isPowerOfTwo(1));  // Expected: true
        
        // Test case 4: Edge case - 0
        System.out.println("Is 0 a power of 2? " + isPowerOfTwo(0));  // Expected: false
        
        // Test case 5: Edge case - negative number
        System.out.println("Is -4 a power of 2? " + isPowerOfTwo(-4));  // Expected: false
        
        // Test case 6: Large power of 2
        System.out.println("Is 1024 a power of 2? " + isPowerOfTwo(1024));  // Expected: true
        
        // Example of what happens in the call stack for isPowerOfTwo(8):
        /*
        isPowerOfTwo(8)
            return isPowerOfTwo(4)
                return isPowerOfTwo(2)
                    return isPowerOfTwo(1)
                        return true
                    return true
                return true
            return true
        */
    }
} 