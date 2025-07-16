package recursion;

/**
 * Sum of Array Elements using Recursion
 * 
 * Problem:
 * Write a function sum(n) that calculates the sum of all numbers in an array arr
 * using recursion, summing from index 0 to n.
 * 
 * Example:
 * Input: arr = [5, 2, 6, 1, 3]
 * Output: 17
 * Explanation: 5 + 2 + 6 + 1 + 3 = 17
 * 
 * Concepts:
 * 1. Recursion: The function keeps summing the element at index n and calls itself with n-1
 * 2. Base Case: If n == 0, return the first element
 * 3. Recursive Case: Return arr[n] + sum(n - 1)
 * 
 * Approach:
 * 1. If n == 0, return arr[0]
 * 2. Otherwise, return arr[n] + sum(n - 1)
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n) – one recursive call per element
 * Space Complexity: O(n) – due to call stack
 */
public class SumOfAll {
    
    /**
     * Calculates the sum of array elements from index 0 to n using recursion
     * @param arr The input array
     * @param n The index up to which sum is to be calculated
     * @return The sum of array elements from index 0 to n
     */
    public static int sum(int[] arr, int n) {
        // Base case: if n is 0, return the first element
        if (n == 0) return arr[0];
        
        // Recursive case: return current element + sum of previous elements
        return arr[n] + sum(arr, n - 1);
    }
    
    public static void main(String[] args) {
        // Test case 1: Basic case
        int[] arr1 = {5, 2, 6, 1, 3};
        System.out.println("Sum of array [5, 2, 6, 1, 3]: " + sum(arr1, arr1.length - 1));  // Expected: 17
        
        // Test case 2: Single element array
        int[] arr2 = {7};
        System.out.println("Sum of array [7]: " + sum(arr2, arr2.length - 1));  // Expected: 7
        
        // Test case 3: Array with negative numbers
        int[] arr3 = {-1, 2, -3, 4};
        System.out.println("Sum of array [-1, 2, -3, 4]: " + sum(arr3, arr3.length - 1));  // Expected: 2
        
        // Test case 4: Array with zeros
        int[] arr4 = {0, 0, 0, 0};
        System.out.println("Sum of array [0, 0, 0, 0]: " + sum(arr4, arr4.length - 1));  // Expected: 0
        
        // Example of what happens in the call stack for arr = [5, 2, 6, 1, 3]:
        /*
        sum(arr, 4)
            return arr[4] + sum(arr, 3)
                return arr[3] + sum(arr, 2)
                    return arr[2] + sum(arr, 1)
                        return arr[1] + sum(arr, 0)
                            return arr[0]
                        return 2 + 5 = 7
                    return 6 + 7 = 13
                return 1 + 13 = 14
            return 3 + 14 = 17
        */
    }
} 