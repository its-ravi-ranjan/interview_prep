/**
 * Remove Duplicates from Sorted Array
 * 
 * Problem:
 * Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place
 * such that each unique element appears only once. The relative order of the elements should
 * be kept the same. Then return the number of unique elements in nums.
 * 
 * Example:
 * Input: nums = [1,1,2]
 * Output: 2, nums = [1,2,_]
 * 
 * Important Points:
 * 1. Array is sorted in non-decreasing order (nums[i] <= nums[i+1])
 * 2. Must modify array in-place
 * 3. Cannot use extra arrays
 * 4. Return value k represents number of unique elements
 * 5. First k elements should contain unique elements in original order
 * 
 * Approach 1: Using two pointers (i and j)
 * - i tracks position for next unique element
 * - j scans through array
 * - When nums[j] != nums[j-1], we found a new unique element
 * 
 * Approach 2: Using single pointer (x)
 * - x tracks last unique element's position
 * - Compare current element with last unique element
 * - If current > last unique, we found a new unique element
 * 
 * Time Complexity: O(n) for both approaches
 * Space Complexity: O(1) for both approaches
 */

public class RemoveDuplicates {
    // Approach 1: Using two pointers (i and j)
    public int removeDuplicatesTwoPointers(int[] nums) {
        if (nums.length < 2) return nums.length;
        
        int i = 1; // Position for next unique element
        for (int j = 1; j < nums.length; j++) {
            if (nums[j] != nums[j - 1]) {
                nums[i] = nums[j];
                i++;
            }
        }
        return i;
    }

    // Approach 2: Using single pointer (x)
    public int removeDuplicatesSinglePointer(int[] nums) {
        if (nums.length < 2) return nums.length;
        
        int x = 0; // Track last unique element's position
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > nums[x]) {
                x++;
                nums[x] = nums[i];
            }
        }
        return x + 1;
    }

    // Helper method to print array
    private static void printArray(int[] nums, int length) {
        System.out.print("[");
        for (int i = 0; i < length; i++) {
            System.out.print(nums[i]);
            if (i < length - 1) System.out.print(", ");
        }
        System.out.println("]");
    }

    public static void main(String[] args) {
        RemoveDuplicates solution = new RemoveDuplicates();
        
        // Test case 1: Basic case with duplicates
        System.out.println("Test case 1: [1,1,2]");
        int[] nums1 = {1, 1, 2};
        int result1 = solution.removeDuplicatesTwoPointers(nums1.clone());
        System.out.println("Two pointers approach: " + result1);
        printArray(nums1, result1);
        
        result1 = solution.removeDuplicatesSinglePointer(nums1.clone());
        System.out.println("Single pointer approach: " + result1);
        printArray(nums1, result1);

        // Test case 2: No duplicates
        System.out.println("\nTest case 2: [1,2,3]");
        int[] nums2 = {1, 2, 3};
        int result2 = solution.removeDuplicatesTwoPointers(nums2.clone());
        System.out.println("Two pointers approach: " + result2);
        printArray(nums2, result2);
        
        result2 = solution.removeDuplicatesSinglePointer(nums2.clone());
        System.out.println("Single pointer approach: " + result2);
        printArray(nums2, result2);

        // Test case 3: All duplicates
        System.out.println("\nTest case 3: [1,1,1]");
        int[] nums3 = {1, 1, 1};
        int result3 = solution.removeDuplicatesTwoPointers(nums3.clone());
        System.out.println("Two pointers approach: " + result3);
        printArray(nums3, result3);
        
        result3 = solution.removeDuplicatesSinglePointer(nums3.clone());
        System.out.println("Single pointer approach: " + result3);
        printArray(nums3, result3);

        // Test case 4: Empty array
        System.out.println("\nTest case 4: []");
        int[] nums4 = {};
        int result4 = solution.removeDuplicatesTwoPointers(nums4.clone());
        System.out.println("Two pointers approach: " + result4);
        printArray(nums4, result4);
        
        result4 = solution.removeDuplicatesSinglePointer(nums4.clone());
        System.out.println("Single pointer approach: " + result4);
        printArray(nums4, result4);

        // Test case 5: Single element
        System.out.println("\nTest case 5: [1]");
        int[] nums5 = {1};
        int result5 = solution.removeDuplicatesTwoPointers(nums5.clone());
        System.out.println("Two pointers approach: " + result5);
        printArray(nums5, result5);
        
        result5 = solution.removeDuplicatesSinglePointer(nums5.clone());
        System.out.println("Single pointer approach: " + result5);
        printArray(nums5, result5);

        // Test case 6: Multiple duplicates
        System.out.println("\nTest case 6: [0,0,1,1,1,2,2,3,3,4]");
        int[] nums6 = {0, 0, 1, 1, 1, 2, 2, 3, 3, 4};
        int result6 = solution.removeDuplicatesTwoPointers(nums6.clone());
        System.out.println("Two pointers approach: " + result6);
        printArray(nums6, result6);
        
        result6 = solution.removeDuplicatesSinglePointer(nums6.clone());
        System.out.println("Single pointer approach: " + result6);
        printArray(nums6, result6);
    }
} 