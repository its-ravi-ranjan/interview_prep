package searchAndSorting;

/**
 * Binary Search Algorithm
 * 
 * Problem:
 * Implement a function to find a specific element in a sorted array by repeatedly
 * dividing the search interval in half.
 * 
 * Example:
 * Input: nums = [1, 3, 5, 7, 9], target = 7
 * Output: 3
 * Explanation: 7 is found at index 3
 * 
 * Approach:
 * 1. Set left = 0, right = nums.length - 1
 * 2. While left <= right:
 *    - Calculate middle = (left + right) / 2
 *    - If nums[middle] == target, return middle
 *    - If target < nums[middle], discard right half: right = middle - 1
 *    - Else, discard left half: left = middle + 1
 * 3. If target is not found, return -1
 * 
 * Time & Space Complexity:
 * Time Complexity: 
 *   - Best Case: O(1) – when target is found at middle initially
 *   - Worst Case: O(log n) – array is halved every iteration
 * Space Complexity: O(1) – constant space as we only use a few variables
 */
public class BinarySearch {
    
    /**
     * Performs binary search on a sorted array to find the target value
     * @param nums The sorted input array to search in
     * @param target The value to search for
     * @return The index of the target value if found, -1 otherwise
     */
    public static int binarySearch(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        
        while (left <= right) {
            // Calculate middle index (using bitwise right shift for integer division)
            int middle = left + ((right - left) >> 1);
            
            if (nums[middle] == target) {
                return middle;
            } else if (target < nums[middle]) {
                right = middle - 1;  // Search in left half
            } else {
                left = middle + 1;   // Search in right half
            }
        }
        
        return -1;  // Target not found
    }
    
    public static void main(String[] args) {
        // Test case 1: Basic case - target found
        int[] nums1 = {1, 3, 5, 7, 9};
        System.out.println("Array: " + arrayToString(nums1));
        System.out.println("Searching for 7: " + binarySearch(nums1, 7));  // Expected: 3
        
        // Test case 2: Target not found
        int[] nums2 = {2, 4, 6, 8, 10};
        System.out.println("\nArray: " + arrayToString(nums2));
        System.out.println("Searching for 5: " + binarySearch(nums2, 5));  // Expected: -1
        
        // Test case 3: Target at first position
        int[] nums3 = {1, 2, 3, 4, 5};
        System.out.println("\nArray: " + arrayToString(nums3));
        System.out.println("Searching for 1: " + binarySearch(nums3, 1));  // Expected: 0
        
        // Test case 4: Target at last position
        int[] nums4 = {1, 2, 3, 4, 5};
        System.out.println("\nArray: " + arrayToString(nums4));
        System.out.println("Searching for 5: " + binarySearch(nums4, 5));  // Expected: 4
        
        // Test case 5: Empty array
        int[] nums5 = {};
        System.out.println("\nArray: " + arrayToString(nums5));
        System.out.println("Searching for 1: " + binarySearch(nums5, 1));  // Expected: -1
        
        // Test case 6: Single element array
        int[] nums6 = {1};
        System.out.println("\nArray: " + arrayToString(nums6));
        System.out.println("Searching for 1: " + binarySearch(nums6, 1));  // Expected: 0
        
        // Test case 7: Array with negative numbers
        int[] nums7 = {-5, -3, -1, 0, 2, 4};
        System.out.println("\nArray: " + arrayToString(nums7));
        System.out.println("Searching for -3: " + binarySearch(nums7, -3));  // Expected: 1
        
        // Test case 8: Large array (performance test)
        int[] nums8 = new int[1000000];
        for (int i = 0; i < nums8.length; i++) {
            nums8[i] = i * 2;  // Even numbers from 0 to 1999998
        }
        System.out.println("\nLarge array test (length: 1000000)");
        System.out.println("Searching for 1000000: " + binarySearch(nums8, 1000000));  // Expected: 500000
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