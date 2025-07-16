package searchAndSorting;

/**
 * Linear Search Algorithm
 * 
 * Problem:
 * Implement a function to find a specific element in an array by checking each element
 * one by one until the target value is found or the end of the array is reached.
 * 
 * Example:
 * Input: arr = [2, 4, 7, 10], target = 10
 * Output: 3
 * Explanation: 10 is found at index 3
 * 
 * Approach:
 * 1. Start from the first element of the array
 * 2. Compare the current element with the target value
 * 3. If a match is found, return the index
 * 4. If the loop ends without finding the target, return -1
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n) – in worst case, we need to check each element once
 * Space Complexity: O(1) – constant space as we only use a single variable
 */
public class LinearSearch {
    
    /**
     * Performs linear search on an array to find the target value
     * @param arr The input array to search in
     * @param target The value to search for
     * @return The index of the target value if found, -1 otherwise
     */
    public static int linearSearch(int[] arr, int target) {
        // Iterate through each element in the array
        for (int i = 0; i < arr.length; i++) {
            // If current element matches target, return its index
            if (arr[i] == target) {
                return i;
            }
        }
        // If target is not found, return -1
        return -1;
    }
    
    public static void main(String[] args) {
        // Test case 1: Basic case - target found
        int[] arr1 = {2, 4, 7, 10};
        System.out.println("Array: " + arrayToString(arr1));
        System.out.println("Searching for 10: " + linearSearch(arr1, 10));  // Expected: 3
        
        // Test case 2: Target not found
        int[] arr2 = {1, 3, 5, 7, 9};
        System.out.println("\nArray: " + arrayToString(arr2));
        System.out.println("Searching for 6: " + linearSearch(arr2, 6));  // Expected: -1
        
        // Test case 3: Target at first position
        int[] arr3 = {5, 8, 12, 15};
        System.out.println("\nArray: " + arrayToString(arr3));
        System.out.println("Searching for 5: " + linearSearch(arr3, 5));  // Expected: 0
        
        // Test case 4: Empty array
        int[] arr4 = {};
        System.out.println("\nArray: " + arrayToString(arr4));
        System.out.println("Searching for 1: " + linearSearch(arr4, 1));  // Expected: -1
        
        // Test case 5: Array with duplicate elements
        int[] arr5 = {2, 4, 4, 6, 8};
        System.out.println("\nArray: " + arrayToString(arr5));
        System.out.println("Searching for 4: " + linearSearch(arr5, 4));  // Expected: 1 (first occurrence)
        
        // Test case 6: Array with negative numbers
        int[] arr6 = {-5, -3, 0, 2, 4};
        System.out.println("\nArray: " + arrayToString(arr6));
        System.out.println("Searching for -3: " + linearSearch(arr6, -3));  // Expected: 1
    }
    
    /**
     * Helper method to convert array to string representation
     * @param arr The array to convert
     * @return String representation of the array
     */
    private static String arrayToString(int[] arr) {
        if (arr.length == 0) return "[]";
        
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < arr.length; i++) {
            sb.append(arr[i]);
            if (i < arr.length - 1) {
                sb.append(", ");
            }
        }
        sb.append("]");
        return sb.toString();
    }
} 