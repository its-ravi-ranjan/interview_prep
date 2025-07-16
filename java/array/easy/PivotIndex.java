package array.easy;

/**
 * Find Pivot Index
 * 
 * Problem:
 * Given an array of integers nums, calculate the pivot index of this array.
 * The pivot index is the index where the sum of all numbers to the left equals
 * the sum of all numbers to the right. If no such index exists, return -1.
 * 
 * Example:
 * Input: nums = [1,7,3,6,5,6]
 * Output: 3
 * Explanation:
 * The pivot index is 3.
 * Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
 * Right sum = nums[4] + nums[5] = 5 + 6 = 11
 * 
 * Approach:
 * 1. Calculate total sum of array
 * 2. For each index:
 *    - Subtract current number from right sum
 *    - Compare left sum with right sum
 *    - If equal, return current index
 *    - Add current number to left sum
 * 3. Return -1 if no pivot index found
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n) - two passes through the array
 * Space Complexity: O(1) - constant space used
 */
public class PivotIndex {
    
    /**
     * Finds the pivot index of an array
     * @param nums Input array
     * @return Pivot index or -1 if not found
     */
    public static int pivotIndex(int[] nums) {
        int leftSum = 0;
        int rightSum = 0;
        
        // Calculate total sum (right sum initially)
        for (int i = 0; i < nums.length; i++) {
            rightSum += nums[i];
        }
        
        // Find pivot index
        for (int i = 0; i < nums.length; i++) {
            // Subtract current number from right sum
            rightSum -= nums[i];
            
            // Add previous number to left sum (except for first index)
            if (i != 0) {
                leftSum += nums[i - 1];
            }
            
            // Check if sums are equal
            if (leftSum == rightSum) {
                return i;
            }
        }
        
        return -1;
    }
    
    public static void main(String[] args) {
        // Test case 1: Example case
        int[] nums1 = {1, 7, 3, 6, 5, 6};
        System.out.println("Test case 1:");
        System.out.println("Input: " + arrayToString(nums1));
        System.out.println("Output: " + pivotIndex(nums1));  // Expected: 3
        System.out.println("Explanation: Left sum (1+7+3) = Right sum (5+6) = 11\n");
        
        // Test case 2: No pivot index
        int[] nums2 = {1, 2, 3};
        System.out.println("Test case 2:");
        System.out.println("Input: " + arrayToString(nums2));
        System.out.println("Output: " + pivotIndex(nums2));  // Expected: -1
        System.out.println("Explanation: No index where left sum equals right sum\n");
        
        // Test case 3: Pivot at first index
        int[] nums3 = {2, 1, -1};
        System.out.println("Test case 3:");
        System.out.println("Input: " + arrayToString(nums3));
        System.out.println("Output: " + pivotIndex(nums3));  // Expected: 0
        System.out.println("Explanation: Left sum (0) = Right sum (1+(-1)) = 0\n");
        
        // Test case 4: Pivot at last index
        int[] nums4 = {-1, -1, -1, -1, 0, 1};
        System.out.println("Test case 4:");
        System.out.println("Input: " + arrayToString(nums4));
        System.out.println("Output: " + pivotIndex(nums4));  // Expected: 5
        System.out.println("Explanation: Left sum (-1-1-1-1+0) = Right sum (0) = -4\n");
        
        // Test case 5: Single element
        int[] nums5 = {0};
        System.out.println("Test case 5:");
        System.out.println("Input: " + arrayToString(nums5));
        System.out.println("Output: " + pivotIndex(nums5));  // Expected: 0
        System.out.println("Explanation: Left sum (0) = Right sum (0) = 0\n");
        
        // Test case 6: Empty array
        int[] nums6 = {};
        System.out.println("Test case 6:");
        System.out.println("Input: " + arrayToString(nums6));
        System.out.println("Output: " + pivotIndex(nums6));  // Expected: -1
        System.out.println("Explanation: Empty array has no pivot index\n");
        
        // Test case 7: All zeros
        int[] nums7 = {0, 0, 0, 0, 0};
        System.out.println("Test case 7:");
        System.out.println("Input: " + arrayToString(nums7));
        System.out.println("Output: " + pivotIndex(nums7));  // Expected: 0
        System.out.println("Explanation: First index is pivot as left sum (0) = right sum (0)\n");
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