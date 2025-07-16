package searchAndSorting;

/**
 * Insertion Sort
 * 
 * Problem:
 * Sort an array of numbers using the Insertion Sort algorithm.
 * Insertion Sort builds the final sorted array one element at a time by
 * comparing each element with the previous elements and inserting it at
 * the correct position.
 * 
 * Example:
 * Input: [4, 5, 1, 3, 9]
 * Output: [1, 3, 4, 5, 9]
 * 
 * Dry Run (on [4, 5, 1, 3, 9]):
 * Initial array: [4, 5, 1, 3, 9]
 * 
 * Pass 1 (i = 1):
 *   curr = 5, prev = 0
 *   Compare: arr[0] (4) < 5, no shift needed
 *   Array remains: [4, 5, 1, 3, 9]
 * 
 * Pass 2 (i = 2):
 *   curr = 1, prev = 1
 *   Compare: arr[1] (5) > 1, shift 5 → [4, 5, 5, 3, 9]
 *   Compare: arr[0] (4) > 1, shift 4 → [4, 4, 5, 3, 9]
 *   Insert 1 → [1, 4, 5, 3, 9]
 * 
 * Pass 3 (i = 3):
 *   curr = 3, prev = 2
 *   Compare: arr[2] (5) > 3, shift 5 → [1, 4, 5, 5, 9]
 *   Compare: arr[1] (4) > 3, shift 4 → [1, 4, 4, 5, 9]
 *   Compare: arr[0] (1) < 3, stop
 *   Insert 3 → [1, 3, 4, 5, 9]
 * 
 * Pass 4 (i = 4):
 *   curr = 9, prev = 3
 *   Compare: arr[3] (5) < 9, no shift needed
 *   Array remains: [1, 3, 4, 5, 9]
 * 
 * Final Sorted Array: [1, 3, 4, 5, 9]
 * 
 * Approach:
 * 1. Start from the second element (index 1)
 * 2. Store the current element (curr)
 * 3. Compare with previous elements and shift them if greater
 * 4. Insert current element at correct position
 * 5. Repeat until array is sorted
 * 
 * Time & Space Complexity:
 * Time Complexity: 
 *   - Best Case: O(n) - when array is already sorted
 *   - Average Case: O(n²)
 *   - Worst Case: O(n²) - when array is reverse sorted
 * Space Complexity: O(1) - sorting is done in-place
 */
public class InsertionSort {
    
    /**
     * Sorts an array using Insertion Sort algorithm
     * @param arr Input array to be sorted
     */
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        
        // Start from second element (index 1)
        for (int i = 1; i < n; i++) {
            // Store current element
            int curr = arr[i];
            int prev = i - 1;
            
            // Shift elements greater than current element
            while (prev >= 0 && arr[prev] > curr) {
                arr[prev + 1] = arr[prev];
                prev--;
            }
            
            // Insert current element at correct position
            arr[prev + 1] = curr;
        }
    }
    
    public static void main(String[] args) {
        // Test case 1: Basic case
        int[] arr1 = {4, 5, 1, 3, 9};
        System.out.println("Test case 1:");
        System.out.println("Input: " + arrayToString(arr1));
        insertionSort(arr1.clone());
        System.out.println("Output: " + arrayToString(arr1));  // Expected: [1, 3, 4, 5, 9]
        System.out.println("Explanation: Elements are inserted one by one at their correct positions\n");
        
        // Test case 2: Already sorted array
        int[] arr2 = {1, 2, 3, 4, 5};
        System.out.println("Test case 2:");
        System.out.println("Input: " + arrayToString(arr2));
        insertionSort(arr2.clone());
        System.out.println("Output: " + arrayToString(arr2));  // Expected: [1, 2, 3, 4, 5]
        System.out.println("Explanation: Array is already sorted, no shifts needed\n");
        
        // Test case 3: Reverse sorted array
        int[] arr3 = {5, 4, 3, 2, 1};
        System.out.println("Test case 3:");
        System.out.println("Input: " + arrayToString(arr3));
        insertionSort(arr3.clone());
        System.out.println("Output: " + arrayToString(arr3));  // Expected: [1, 2, 3, 4, 5]
        System.out.println("Explanation: Each element needs to be shifted to the beginning\n");
        
        // Test case 4: Array with duplicates
        int[] arr4 = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
        System.out.println("Test case 4:");
        System.out.println("Input: " + arrayToString(arr4));
        insertionSort(arr4.clone());
        System.out.println("Output: " + arrayToString(arr4));  // Expected: [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
        System.out.println("Explanation: Duplicate elements are handled correctly\n");
        
        // Test case 5: Array with negative numbers
        int[] arr5 = {-5, 3, -1, 0, 7, -9, 2};
        System.out.println("Test case 5:");
        System.out.println("Input: " + arrayToString(arr5));
        insertionSort(arr5.clone());
        System.out.println("Output: " + arrayToString(arr5));  // Expected: [-9, -5, -1, 0, 2, 3, 7]
        System.out.println("Explanation: Negative numbers are sorted correctly\n");
        
        // Test case 6: Single element array
        int[] arr6 = {1};
        System.out.println("Test case 6:");
        System.out.println("Input: " + arrayToString(arr6));
        insertionSort(arr6.clone());
        System.out.println("Output: " + arrayToString(arr6));  // Expected: [1]
        System.out.println("Explanation: Single element array remains unchanged\n");
        
        // Test case 7: Empty array
        int[] arr7 = {};
        System.out.println("Test case 7:");
        System.out.println("Input: " + arrayToString(arr7));
        insertionSort(arr7.clone());
        System.out.println("Output: " + arrayToString(arr7));  // Expected: []
        System.out.println("Explanation: Empty array remains unchanged\n");
        
        // Test case 8: Large array with random elements
        int[] arr8 = new int[1000];
        for (int i = 0; i < arr8.length; i++) {
            arr8[i] = (int) (Math.random() * 1000);
        }
        System.out.println("Test case 8:");
        System.out.println("Input: Array of 1000 random elements");
        long startTime = System.nanoTime();
        insertionSort(arr8.clone());
        long endTime = System.nanoTime();
        System.out.printf("Time taken: %.2f ms%n", (endTime - startTime) / 1_000_000.0);
        System.out.println("Explanation: Performance test with large random array\n");
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