package searchAndSorting;

import java.util.Arrays;

/**
 * Selection Sort Algorithm
 * 
 * Problem:
 * Implement a sorting algorithm that divides the array into two parts: a sorted subarray
 * and an unsorted subarray. In each iteration, it finds the minimum element from the
 * unsorted part and moves it to the end of the sorted part.
 * 
 * Example:
 * Input: arr = [4, 5, 1, 3, 9]
 * Output: [1, 3, 4, 5, 9]
 * 
 * Approach:
 * 1. Iterate over array from index 0 to n-2
 * 2. For each index i:
 *    - Assume element at i is minimum in unsorted part
 *    - Find actual minimum element from i+1 to n-1
 *    - Swap element at i with minimum element (if different)
 * 3. Repeat until array is sorted
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n²) in all cases (best, average, and worst)
 *   - Always performs n*(n-1)/2 comparisons
 * Space Complexity: O(1) – in-place sorting, no extra space used
 */
public class SelectionSort {
    
    /**
     * Sorts an array using the selection sort algorithm
     * @param arr The input array to be sorted
     * @return The sorted array
     */
    public static int[] selectionSort(int[] arr) {
        int n = arr.length;
        
        // Iterate through the array
        for (int i = 0; i < n - 1; i++) {
            // Assume current element is minimum
            int min = i;
            
            // Find minimum element in unsorted part
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[min]) {
                    min = j;
                }
            }
            
            // Swap if minimum element is not at current position
            if (min != i) {
                int temp = arr[i];
                arr[i] = arr[min];
                arr[min] = temp;
            }
        }
        
        return arr;
    }
    
    public static void main(String[] args) {
        // Test case 1: Basic case
        int[] arr1 = {4, 5, 1, 3, 9};
        System.out.println("Original array: " + arrayToString(arr1));
        System.out.println("Sorted array: " + arrayToString(selectionSort(arr1.clone())));  // Expected: [1, 3, 4, 5, 9]
        
        // Test case 2: Already sorted array
        int[] arr2 = {1, 2, 3, 4, 5};
        System.out.println("\nOriginal array: " + arrayToString(arr2));
        System.out.println("Sorted array: " + arrayToString(selectionSort(arr2.clone())));  // Expected: [1, 2, 3, 4, 5]
        
        // Test case 3: Reverse sorted array
        int[] arr3 = {5, 4, 3, 2, 1};
        System.out.println("\nOriginal array: " + arrayToString(arr3));
        System.out.println("Sorted array: " + arrayToString(selectionSort(arr3.clone())));  // Expected: [1, 2, 3, 4, 5]
        
        // Test case 4: Array with duplicate elements
        int[] arr4 = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
        System.out.println("\nOriginal array: " + arrayToString(arr4));
        System.out.println("Sorted array: " + arrayToString(selectionSort(arr4.clone())));  // Expected: [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
        
        // Test case 5: Array with negative numbers
        int[] arr5 = {-5, 3, -1, 0, 2, -4, 1};
        System.out.println("\nOriginal array: " + arrayToString(arr5));
        System.out.println("Sorted array: " + arrayToString(selectionSort(arr5.clone())));  // Expected: [-5, -4, -1, 0, 1, 2, 3]
        
        // Test case 6: Empty array
        int[] arr6 = {};
        System.out.println("\nOriginal array: " + arrayToString(arr6));
        System.out.println("Sorted array: " + arrayToString(selectionSort(arr6.clone())));  // Expected: []
        
        // Test case 7: Single element array
        int[] arr7 = {1};
        System.out.println("\nOriginal array: " + arrayToString(arr7));
        System.out.println("Sorted array: " + arrayToString(selectionSort(arr7.clone())));  // Expected: [1]
        
        // Test case 8: Large array (performance test)
        int[] arr8 = new int[1000];
        for (int i = 0; i < arr8.length; i++) {
            arr8[i] = (int) (Math.random() * 1000);
        }
        System.out.println("\nLarge array test (length: 1000)");
        System.out.println("First 10 elements of original array: " + arrayToString(Arrays.copyOfRange(arr8, 0, 10)));
        int[] sortedArr8 = selectionSort(arr8.clone());
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