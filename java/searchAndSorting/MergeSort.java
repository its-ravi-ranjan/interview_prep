package searchAndSorting;

import java.util.Arrays;

/**
 * Merge Sort
 * 
 * Problem:
 * Sort an array of numbers using the Merge Sort algorithm.
 * Merge Sort is a popular divide-and-conquer sorting algorithm that divides
 * the input array into two halves, recursively sorts them, and then merges
 * the sorted halves into one sorted result.
 * 
 * Example:
 * Input: [5, 2, 4, 1]
 * Output: [1, 2, 4, 5]
 * 
 * Approach - Divide & Conquer:
 * 1. Divide: Split the array into two halves
 * 2. Conquer: Recursively sort each half using merge sort
 * 3. Combine: Merge the two sorted halves into one sorted array
 * 
 * Key Concept - Merge Step:
 * The key step is merging two sorted arrays efficiently into one sorted array.
 * This is done using a two-pointer approach, comparing elements from both arrays
 * and adding the smaller one into a new result array.
 * 
 * Dry Run (on [5, 2, 4, 1]):
 * 
 * Step 1: Divide
 * [5, 2, 4, 1] →
 * [5, 2] and [4, 1] →
 * [5] and [2]    |    [4] and [1]
 * 
 * Step 2: Merge
 * Merge [5] and [2] → [2, 5]
 * Merge [4] and [1] → [1, 4]
 * 
 * Step 3: Final Merge
 * Merge [2, 5] and [1, 4]:
 * Compare 2 and 1 → [1]
 * Compare 2 and 4 → [1, 2]
 * Compare 5 and 4 → [1, 2, 4]
 * Remaining elements → [1, 2, 4, 5]
 * 
 * Output: [1, 2, 4, 5]
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n log n) - Divide takes log n steps and merging takes linear time
 * Space Complexity: O(n) - Additional space is needed to store the merged arrays
 */
public class MergeSort {
    
    /**
     * Sorts an array using Merge Sort algorithm
     * @param nums Input array to be sorted
     * @return Sorted array
     */
    public static int[] mergeSort(int[] nums) {
        if (nums.length <= 1) return nums;
        
        int mid = nums.length / 2;
        int[] left = Arrays.copyOfRange(nums, 0, mid);
        int[] right = Arrays.copyOfRange(nums, mid, nums.length);
        
        left = mergeSort(left);
        right = mergeSort(right);
        
        return merge(left, right);
    }
    
    /**
     * Merges two sorted arrays into one sorted array
     * @param left Left sorted array
     * @param right Right sorted array
     * @return Merged sorted array
     */
    public static int[] merge(int[] left, int[] right) {
        int[] result = new int[left.length + right.length];
        int i = 0, j = 0, k = 0;
        
        // Compare elements from both arrays and add smaller one
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                result[k++] = left[i++];
            } else {
                result[k++] = right[j++];
            }
        }
        
        // Add remaining elements from left array
        while (i < left.length) {
            result[k++] = left[i++];
        }
        
        // Add remaining elements from right array
        while (j < right.length) {
            result[k++] = right[j++];
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        // Test case 1: Basic case
        int[] arr1 = {5, 2, 4, 1};
        System.out.println("Test case 1:");
        System.out.println("Input: " + arrayToString(arr1));
        System.out.println("Output: " + arrayToString(mergeSort(arr1.clone())));  // Expected: [1, 2, 4, 5]
        System.out.println("Explanation: Array is divided, sorted recursively, and merged\n");
        
        // Test case 2: Already sorted array
        int[] arr2 = {1, 2, 3, 4, 5};
        System.out.println("Test case 2:");
        System.out.println("Input: " + arrayToString(arr2));
        System.out.println("Output: " + arrayToString(mergeSort(arr2.clone())));  // Expected: [1, 2, 3, 4, 5]
        System.out.println("Explanation: Array is already sorted, no changes needed\n");
        
        // Test case 3: Reverse sorted array
        int[] arr3 = {5, 4, 3, 2, 1};
        System.out.println("Test case 3:");
        System.out.println("Input: " + arrayToString(arr3));
        System.out.println("Output: " + arrayToString(mergeSort(arr3.clone())));  // Expected: [1, 2, 3, 4, 5]
        System.out.println("Explanation: Array is completely reversed, needs full sorting\n");
        
        // Test case 4: Array with duplicates
        int[] arr4 = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
        System.out.println("Test case 4:");
        System.out.println("Input: " + arrayToString(arr4));
        System.out.println("Output: " + arrayToString(mergeSort(arr4.clone())));  // Expected: [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
        System.out.println("Explanation: Duplicate elements are handled correctly\n");
        
        // Test case 5: Array with negative numbers
        int[] arr5 = {-5, 3, -1, 0, 7, -9, 2};
        System.out.println("Test case 5:");
        System.out.println("Input: " + arrayToString(arr5));
        System.out.println("Output: " + arrayToString(mergeSort(arr5.clone())));  // Expected: [-9, -5, -1, 0, 2, 3, 7]
        System.out.println("Explanation: Negative numbers are sorted correctly\n");
        
        // Test case 6: Single element array
        int[] arr6 = {1};
        System.out.println("Test case 6:");
        System.out.println("Input: " + arrayToString(arr6));
        System.out.println("Output: " + arrayToString(mergeSort(arr6.clone())));  // Expected: [1]
        System.out.println("Explanation: Single element array remains unchanged\n");
        
        // Test case 7: Empty array
        int[] arr7 = {};
        System.out.println("Test case 7:");
        System.out.println("Input: " + arrayToString(arr7));
        System.out.println("Output: " + arrayToString(mergeSort(arr7.clone())));  // Expected: []
        System.out.println("Explanation: Empty array returns empty array\n");
        
        // Test case 8: Large array with random elements
        int[] arr8 = new int[1000];
        for (int i = 0; i < arr8.length; i++) {
            arr8[i] = (int) (Math.random() * 1000);
        }
        System.out.println("Test case 8:");
        System.out.println("Input: Array of 1000 random elements");
        long startTime = System.nanoTime();
        mergeSort(arr8.clone());
        long endTime = System.nanoTime();
        System.out.printf("Time taken: %.2f ms%n", (endTime - startTime) / 1_000_000.0);
        System.out.println("Explanation: Efficient O(n log n) algorithm handles large arrays\n");
        
        // Test case 9: Demonstrate stable sorting with objects
        System.out.println("Test case 9 - Stable Sort:");
        System.out.println("Input: [3(1), 1(2), 3(3), 1(4)]");
        
        // Custom merge sort for objects to demonstrate stability
        class Item {
            int value;
            int id;
            
            Item(int value, int id) {
                this.value = value;
                this.id = id;
            }
            
            @Override
            public String toString() {
                return value + "(" + id + ")";
            }
        }
        
        Item[] items = {
            new Item(3, 1),
            new Item(1, 2),
            new Item(3, 3),
            new Item(1, 4)
        };
        
        // Merge sort for objects
        Item[] sortedItems = mergeSortObjects(items);
        System.out.print("Output: [");
        for (int i = 0; i < sortedItems.length; i++) {
            System.out.print(sortedItems[i]);
            if (i < sortedItems.length - 1) System.out.print(", ");
        }
        System.out.println("]");
        System.out.println("Explanation: Merge sort is stable - equal elements maintain their relative order\n");
    }
    
    /**
     * Merge sort for objects to demonstrate stability
     */
    public static Item[] mergeSortObjects(Item[] items) {
        if (items.length <= 1) return items;
        
        int mid = items.length / 2;
        Item[] left = Arrays.copyOfRange(items, 0, mid);
        Item[] right = Arrays.copyOfRange(items, mid, items.length);
        
        left = mergeSortObjects(left);
        right = mergeSortObjects(right);
        
        return mergeObjects(left, right);
    }
    
    /**
     * Merge two sorted object arrays
     */
    public static Item[] mergeObjects(Item[] left, Item[] right) {
        Item[] result = new Item[left.length + right.length];
        int i = 0, j = 0, k = 0;
        
        while (i < left.length && j < right.length) {
            if (left[i].value <= right[j].value) {
                result[k++] = left[i++];
            } else {
                result[k++] = right[j++];
            }
        }
        
        while (i < left.length) result[k++] = left[i++];
        while (j < right.length) result[k++] = right[j++];
        
        return result;
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