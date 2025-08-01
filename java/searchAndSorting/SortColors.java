/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Sort Colors (Dutch National Flag)
 * 
 * Problem: Sort an array containing only 0, 1, and 2 in-place
 * so that objects of the same color are adjacent.
 * 
 * Example:
 * Input: nums = [2,0,2,1,1,0]
 * Output: [0,0,1,1,2,2]
 * 
 * Approach 1: Three-Pointer (Dutch National Flag)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * Approach 2: Counting Sort
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * Approach 3: Two-Pass Solution
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

import java.util.*;

public class SortColors {
    
    /**
     * Approach 1: Three-Pointer (Dutch National Flag) - User's Implementation
     * 
     * Algorithm:
     * 1. Use three pointers: start (0), index (current), end (2)
     * 2. If current element is 0, swap with start and move both pointers
     * 3. If current element is 2, swap with end and move end pointer
     * 4. If current element is 1, just move index pointer
     * 5. Continue until index > end
     * 
     * Time Complexity: O(n) - single pass through array
     * Space Complexity: O(1) - in-place sorting
     */
    public static void sortColorsThreePointer(int[] nums) {
        int start = 0;
        int end = nums.length - 1;
        int index = 0;
        
        while (index <= end) {
            if (nums[index] == 0) {
                swap(nums, index, start);
                index++;
                start++;
            } else if (nums[index] == 2) {
                swap(nums, index, end);
                end--;
            } else {
                index++;
            }
        }
    }
    
    /**
     * Approach 2: Counting Sort
     * 
     * Algorithm:
     * 1. Count occurrences of 0, 1, and 2
     * 2. Overwrite array with counts in order
     * 
     * Time Complexity: O(n) - two passes through array
     * Space Complexity: O(1) - only count variables
     */
    public static void sortColorsCounting(int[] nums) {
        int count0 = 0, count1 = 0, count2 = 0;
        
        // Count occurrences
        for (int num : nums) {
            if (num == 0) count0++;
            else if (num == 1) count1++;
            else count2++;
        }
        
        // Overwrite array
        int index = 0;
        for (int i = 0; i < count0; i++) {
            nums[index++] = 0;
        }
        for (int i = 0; i < count1; i++) {
            nums[index++] = 1;
        }
        for (int i = 0; i < count2; i++) {
            nums[index++] = 2;
        }
    }
    
    /**
     * Approach 3: Two-Pass Solution
     * 
     * Algorithm:
     * 1. First pass: move all 0s to front
     * 2. Second pass: move all 2s to end
     * 3. 1s automatically end up in middle
     * 
     * Time Complexity: O(n) - two passes through array
     * Space Complexity: O(1) - in-place sorting
     */
    public static void sortColorsTwoPass(int[] nums) {
        int index = 0;
        
        // First pass: move all 0s to front
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == 0) {
                swap(nums, index, i);
                index++;
            }
        }
        
        // Second pass: move all 2s to end
        index = nums.length - 1;
        for (int i = nums.length - 1; i >= 0; i--) {
            if (nums[i] == 2) {
                swap(nums, index, i);
                index--;
            }
        }
    }
    
    /**
     * Approach 4: Optimized Three-Pointer
     * 
     * Algorithm:
     * 1. Use three pointers: left (0), mid (1), right (2)
     * 2. mid pointer traverses the array
     * 3. Swap based on mid element value
     * 
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    public static void sortColorsOptimized(int[] nums) {
        int left = 0, mid = 0, right = nums.length - 1;
        
        while (mid <= right) {
            if (nums[mid] == 0) {
                swap(nums, left, mid);
                left++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else { // nums[mid] == 2
                swap(nums, mid, right);
                right--;
            }
        }
    }
    
    /**
     * Helper method to swap elements
     */
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    /**
     * Helper method to visualize the three-pointer process
     */
    public static void visualizeThreePointer(int[] nums) {
        System.out.println("=== Three-Pointer Visualization ===");
        System.out.println("Original: " + Arrays.toString(nums));
        System.out.println();
        
        int start = 0;
        int end = nums.length - 1;
        int index = 0;
        int[] arr = nums.clone();
        
        System.out.println("Step\tIndex\tStart\tEnd\tArray\t\tAction");
        System.out.println("----\t-----\t-----\t---\t-----\t\t------");
        
        int step = 1;
        while (index <= end) {
            System.out.print(step + "\t" + index + "\t" + start + "\t" + end + "\t");
            System.out.print(Arrays.toString(arr) + "\t");
            
            if (arr[index] == 0) {
                swap(arr, index, start);
                System.out.println("Swap " + index + " and " + start + " (0)");
                index++;
                start++;
            } else if (arr[index] == 2) {
                swap(arr, index, end);
                System.out.println("Swap " + index + " and " + end + " (2)");
                end--;
            } else {
                System.out.println("Move index (1)");
                index++;
            }
            step++;
        }
        
        System.out.println("\nFinal Result: " + Arrays.toString(arr));
        System.out.println();
    }
    
    /**
     * Performance comparison of different approaches
     */
    public static void compareApproaches(int[] nums) {
        System.out.println("=== Performance Comparison ===");
        System.out.println("Original: " + Arrays.toString(nums));
        System.out.println();
        
        // Test all approaches
        long startTime, endTime;
        
        // Three-Pointer approach
        int[] arr1 = nums.clone();
        startTime = System.nanoTime();
        sortColorsThreePointer(arr1);
        endTime = System.nanoTime();
        System.out.println("Three-Pointer Approach:");
        System.out.println("  Result: " + Arrays.toString(arr1));
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(1)");
        System.out.println();
        
        // Counting Sort approach
        int[] arr2 = nums.clone();
        startTime = System.nanoTime();
        sortColorsCounting(arr2);
        endTime = System.nanoTime();
        System.out.println("Counting Sort Approach:");
        System.out.println("  Result: " + Arrays.toString(arr2));
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(1)");
        System.out.println();
        
        // Two-Pass approach
        int[] arr3 = nums.clone();
        startTime = System.nanoTime();
        sortColorsTwoPass(arr3);
        endTime = System.nanoTime();
        System.out.println("Two-Pass Approach:");
        System.out.println("  Result: " + Arrays.toString(arr3));
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(1)");
        System.out.println();
        
        // Optimized approach
        int[] arr4 = nums.clone();
        startTime = System.nanoTime();
        sortColorsOptimized(arr4);
        endTime = System.nanoTime();
        System.out.println("Optimized Approach:");
        System.out.println("  Result: " + Arrays.toString(arr4));
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(1)");
        System.out.println();
        
        // Verify all results are same
        boolean allSame = Arrays.equals(arr1, arr2) && 
                         Arrays.equals(arr2, arr3) && 
                         Arrays.equals(arr3, arr4);
        System.out.println("All approaches give same result: " + allSame);
        System.out.println();
    }
    
    /**
     * Demonstrate the Dutch National Flag concept
     */
    public static void demonstrateDutchNationalFlag() {
        System.out.println("=== Dutch National Flag Concept ===");
        System.out.println("The Dutch National Flag problem is a classic sorting problem.");
        System.out.println("It involves sorting an array with only three distinct values.");
        System.out.println();
        
        System.out.println("Key Insights:");
        System.out.println("1. Use three pointers to partition the array");
        System.out.println("2. One pass through the array is sufficient");
        System.out.println("3. Maintain invariant: 0s on left, 1s in middle, 2s on right");
        System.out.println("4. Swap operations maintain the invariant");
        System.out.println("5. Time complexity is O(n) with O(1) space");
        System.out.println();
        
        System.out.println("Pointer Roles:");
        System.out.println("- start: points to next position for 0");
        System.out.println("- index: current element being processed");
        System.out.println("- end: points to next position for 2");
        System.out.println();
        
        System.out.println("Why does this work?");
        System.out.println("- 0s are moved to front and never touched again");
        System.out.println("- 2s are moved to end and never touched again");
        System.out.println("- 1s stay in place and get naturally sorted");
        System.out.println("- Each element is processed at most once");
        System.out.println();
    }
    
    /**
     * Demonstrate different test cases
     */
    public static void demonstrateTestCases() {
        System.out.println("=== Test Cases Demonstration ===");
        
        int[][] testCases = {
            {2, 0, 2, 1, 1, 0},           // Mixed order
            {2, 2, 2, 2, 2, 2},           // All 2s
            {0, 0, 0, 0, 0, 0},           // All 0s
            {1, 1, 1, 1, 1, 1},           // All 1s
            {0, 1, 2, 0, 1, 2},           // Alternating
            {2, 1, 0, 2, 1, 0},           // Reverse alternating
            {0, 0, 1, 1, 2, 2},           // Already sorted
            {2, 2, 1, 1, 0, 0},           // Reverse sorted
        };
        
        for (int i = 0; i < testCases.length; i++) {
            System.out.println("Test Case " + (i + 1) + ":");
            System.out.println("Input: " + Arrays.toString(testCases[i]));
            
            int[] result = testCases[i].clone();
            sortColorsThreePointer(result);
            System.out.println("Output: " + Arrays.toString(result));
            
            // Verify sorting
            boolean isSorted = true;
            for (int j = 1; j < result.length; j++) {
                if (result[j] < result[j-1]) {
                    isSorted = false;
                    break;
                }
            }
            System.out.println("Correctly sorted: " + isSorted);
            System.out.println();
        }
    }
    
    public static void main(String[] args) {
        // Test cases
        int[][] testCases = {
            {2, 0, 2, 1, 1, 0},           // Expected: [0,0,1,1,2,2]
            {2, 0, 1},                     // Expected: [0,1,2]
            {0},                           // Expected: [0]
            {1},                           // Expected: [1]
            {2},                           // Expected: [2]
            {0, 1, 2},                     // Expected: [0,1,2]
            {2, 1, 0},                     // Expected: [0,1,2]
            {1, 0, 2, 1, 0, 2},           // Expected: [0,0,1,1,2,2]
        };
        
        System.out.println("=== Sort Colors - Test Cases ===\n");
        
        for (int i = 0; i < testCases.length; i++) {
            System.out.println("Test Case " + (i + 1) + ":");
            System.out.println("Input: " + Arrays.toString(testCases[i]));
            
            int[] result = testCases[i].clone();
            sortColorsThreePointer(result);
            System.out.println("Output: " + Arrays.toString(result));
            System.out.println();
        }
        
        // Detailed analysis with visualization
        System.out.println("=== Detailed Analysis ===");
        visualizeThreePointer(new int[]{2, 0, 2, 1, 1, 0});
        
        // Performance comparison
        compareApproaches(new int[]{2, 0, 2, 1, 1, 0, 2, 0, 1, 2, 1, 0});
        
        // Demonstrate concepts
        demonstrateDutchNationalFlag();
        demonstrateTestCases();
        
        System.out.println("=== Key Insights ===");
        System.out.println("1. Three-pointer approach is optimal for O(n) time complexity");
        System.out.println("2. Counting sort is simple but requires two passes");
        System.out.println("3. Two-pass solution is intuitive but less efficient");
        System.out.println("4. All approaches maintain O(1) space complexity");
        System.out.println("5. Dutch National Flag is a classic partitioning problem");
    }
} 