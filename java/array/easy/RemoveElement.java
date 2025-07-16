/**
 * Remove Element
 * 
 * Problem:
 * Given an integer array nums and an integer val, remove all occurrences of val in-place.
 * The order of the elements may be changed. Then return the number of elements in nums
 * which are not equal to val.
 * 
 * Example:
 * Input: nums = [3,2,2,3], val = 3
 * Output: 2, nums = [2,2,_,_]
 * 
 * Important Points:
 * 1. Must modify array in-place
 * 2. Cannot use extra arrays
 * 3. Return value k represents number of elements not equal to val
 * 4. First k elements should contain elements not equal to val
 * 5. Order of elements can be changed
 * 
 * Approach: Two Pointer Technique
 * - Use pointer x to track where next non-val element should go
 * - Traverse array with index i
 * - If nums[i] != val, assign nums[x] = nums[i] and increment x
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

public class RemoveElement {
    public int removeElement(int[] nums, int val) {
        int x = 0; // Pointer to track position for next non-val element
        
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != val) {
                nums[x] = nums[i];
                x++;
            }
        }
        
        return x;
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
        RemoveElement solution = new RemoveElement();
        
        // Test case 1: Basic case
        System.out.println("Test case 1: nums = [3,2,2,3], val = 3");
        int[] nums1 = {3, 2, 2, 3};
        int result1 = solution.removeElement(nums1.clone(), 3);
        System.out.println("Result: " + result1);
        printArray(nums1, result1);

        // Test case 2: No occurrences of val
        System.out.println("\nTest case 2: nums = [1,2,3,4], val = 5");
        int[] nums2 = {1, 2, 3, 4};
        int result2 = solution.removeElement(nums2.clone(), 5);
        System.out.println("Result: " + result2);
        printArray(nums2, result2);

        // Test case 3: All elements equal to val
        System.out.println("\nTest case 3: nums = [2,2,2,2], val = 2");
        int[] nums3 = {2, 2, 2, 2};
        int result3 = solution.removeElement(nums3.clone(), 2);
        System.out.println("Result: " + result3);
        printArray(nums3, result3);

        // Test case 4: Empty array
        System.out.println("\nTest case 4: nums = [], val = 1");
        int[] nums4 = {};
        int result4 = solution.removeElement(nums4.clone(), 1);
        System.out.println("Result: " + result4);
        printArray(nums4, result4);

        // Test case 5: Single element not equal to val
        System.out.println("\nTest case 5: nums = [1], val = 2");
        int[] nums5 = {1};
        int result5 = solution.removeElement(nums5.clone(), 2);
        System.out.println("Result: " + result5);
        printArray(nums5, result5);

        // Test case 6: Single element equal to val
        System.out.println("\nTest case 6: nums = [1], val = 1");
        int[] nums6 = {1};
        int result6 = solution.removeElement(nums6.clone(), 1);
        System.out.println("Result: " + result6);
        printArray(nums6, result6);

        // Test case 7: Multiple occurrences at different positions
        System.out.println("\nTest case 7: nums = [0,1,2,2,3,0,4,2], val = 2");
        int[] nums7 = {0, 1, 2, 2, 3, 0, 4, 2};
        int result7 = solution.removeElement(nums7.clone(), 2);
        System.out.println("Result: " + result7);
        printArray(nums7, result7);
    }
} 