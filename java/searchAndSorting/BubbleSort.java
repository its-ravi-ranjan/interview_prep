package searchAndSorting;

/**
 * Bubble Sort Algorithm
 * 
 * Problem:
 * Implement a sorting algorithm that repeatedly steps through the list, compares adjacent
 * elements, and swaps them if they are in the wrong order. After each pass, the largest
 * unsorted element "bubbles up" to its correct position at the end of the array.
 * 
 * Example:
 * Input: arr = [64, 34, 25, 12, 22, 11, 90]
 * Output: [11, 12, 22, 25, 34, 64, 90]
 * 
 * Approach:
 * 1. Iterate through the array multiple times
 * 2. In each pass, compare adjacent elements:
 *    - If current element > next element, swap them
 * 3. After each pass, largest unsorted element bubbles up to end
 * 4. Use boolean flag (isSwapped) to track if any swap occurred:
 *    - If no swaps in a pass, array is sorted → early exit
 * 5. Repeat for n-1 passes or until no swaps needed
 * 
 * Time & Space Complexity:
 * Time Complexity:
 *   - Best Case: O(n) – when array is already sorted (with isSwapped optimization)
 *   - Worst Case: O(n²) – when array is in reverse order
 * Space Complexity: O(1) – in-place sorting, no extra space used
 */
public class BubbleSort {
    
    /**
     * Sorts an array using the bubble sort algorithm
     * @param arr The input array to be sorted
     * @return The sorted array
     */
    public static int[] bubbleSort(int[] arr) {
        int n = arr.length;
        
        // Outer loop for n-1 passes
        for (int i = 0; i < n - 1; i++) {
            boolean isSwapped = false;
            
            // Inner loop for comparing adjacent elements
            // After each pass, last i elements are in place
            for (int j = 0; j < n - 1 - i; j++) {
                // If current element is greater than next, swap them
                if (arr[j] > arr[j + 1]) {
                    // Swap elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    isSwapped = true;
                }
            }
            
            // If no swapping occurred in this pass, array is sorted
            if (!isSwapped) {
                break;
            }
        }
        
        return arr;
    }
    
    public static void main(String[] args) {
        // Test case 1: Basic case
        int[] arr1 = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original array: " + arrayToString(arr1));
        System.out.println("Sorted array: " + arrayToString(bubbleSort(arr1.clone())));  // Expected: [11, 12, 22, 25, 34, 64, 90]
        
        // Test case 2: Already sorted array
        int[] arr2 = {1, 2, 3, 4, 5};
        System.out.println("\nOriginal array: " + arrayToString(arr2));
        System.out.println("Sorted array: " + arrayToString(bubbleSort(arr2.clone())));  // Expected: [1, 2, 3, 4, 5]
        
        // Test case 3: Reverse sorted array
        int[] arr3 = {5, 4, 3, 2, 1};
        System.out.println("\nOriginal array: " + arrayToString(arr3));
        System.out.println("Sorted array: " + arrayToString(bubbleSort(arr3.clone())));  // Expected: [1, 2, 3, 4, 5]
        
        // Test case 4: Array with duplicate elements
        int[] arr4 = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
        System.out.println("\nOriginal array: " + arrayToString(arr4));
        System.out.println("Sorted array: " + arrayToString(bubbleSort(arr4.clone())));  // Expected: [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
        
        // Test case 5: Array with negative numbers
        int[] arr5 = {-5, 3, -1, 0, 2, -4, 1};
        System.out.println("\nOriginal array: " + arrayToString(arr5));
        System.out.println("Sorted array: " + arrayToString(bubbleSort(arr5.clone())));  // Expected: [-5, -4, -1, 0, 1, 2, 3]
        
        // Test case 6: Empty array
        int[] arr6 = {};
        System.out.println("\nOriginal array: " + arrayToString(arr6));
        System.out.println("Sorted array: " + arrayToString(bubbleSort(arr6.clone())));  // Expected: []
        
        // Test case 7: Single element array
        int[] arr7 = {1};
        System.out.println("\nOriginal array: " + arrayToString(arr7));
        System.out.println("Sorted array: " + arrayToString(bubbleSort(arr7.clone())));  // Expected: [1]
        
        // Test case 8: Large array (performance test)
        int[] arr8 = new int[1000];
        for (int i = 0; i < arr8.length; i++) {
            arr8[i] = (int) (Math.random() * 1000);
        }
        System.out.println("\nLarge array test (length: 1000)");
        System.out.println("First 10 elements of original array: " + arrayToString(Arrays.copyOfRange(arr8, 0, 10)));
        int[] sortedArr8 = bubbleSort(arr8.clone());
        System.out.println("First 10 elements of sorted array: " + arrayToString(Arrays.copyOfRange(sortedArr8, 0, 10)));
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