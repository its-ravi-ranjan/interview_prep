package array.easy;

/**
 * Running Sum of 1d Array
 * 
 * Problem:
 * Given an array nums, return the running sum of the array where runningSum[i] = sum(nums[0]…nums[i]).
 * 
 * Example:
 * Input: nums = [1,2,3,4]
 * Output: [1,3,6,10]
 * Explanation: Running sum is obtained as follows: [1, 1+2, 1+2+3, 1+2+3+4].
 * 
 * Approach:
 * 1. Initialize a sum variable to keep track of the running sum
 * 2. Iterate through the array
 * 3. For each element, add it to the sum and update the current position
 * 4. Return the modified array
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n) - single pass through the array
 * Space Complexity: O(1) - in-place modification of the array
 */
public class RunningSum {
    
    /**
     * Calculates the running sum of an array
     * @param nums Input array
     * @return Array containing running sums
     */
    public static int[] runningSum(int[] nums) {
        int sum = 0;
        
        // Iterate through the array
        for (int i = 0; i < nums.length; i++) {
            // Add current number to sum
            sum += nums[i];
            // Update current position with running sum
            nums[i] = sum;
        }
        
        return nums;
    }
    
    public static void main(String[] args) {
        // Test case 1: Example case
        int[] nums1 = {1, 2, 3, 4};
        System.out.println("Test case 1:");
        System.out.println("Input: " + arrayToString(nums1));
        System.out.println("Output: " + arrayToString(runningSum(nums1.clone())));  // Expected: [1, 3, 6, 10]
        System.out.println("Explanation: Running sum is obtained as follows: [1, 1+2, 1+2+3, 1+2+3+4]\n");
        
        // Test case 2: Array with negative numbers
        int[] nums2 = {1, -2, 3, -4, 5};
        System.out.println("Test case 2:");
        System.out.println("Input: " + arrayToString(nums2));
        System.out.println("Output: " + arrayToString(runningSum(nums2.clone())));  // Expected: [1, -1, 2, -2, 3]
        System.out.println("Explanation: Running sum with negative numbers\n");
        
        // Test case 3: Single element array
        int[] nums3 = {5};
        System.out.println("Test case 3:");
        System.out.println("Input: " + arrayToString(nums3));
        System.out.println("Output: " + arrayToString(runningSum(nums3.clone())));  // Expected: [5]
        System.out.println("Explanation: Single element array, running sum is the element itself\n");
        
        // Test case 4: Array with zeros
        int[] nums4 = {0, 0, 0, 0};
        System.out.println("Test case 4:");
        System.out.println("Input: " + arrayToString(nums4));
        System.out.println("Output: " + arrayToString(runningSum(nums4.clone())));  // Expected: [0, 0, 0, 0]
        System.out.println("Explanation: Array with all zeros, running sum remains zero\n");
        
        // Test case 5: Empty array
        int[] nums5 = {};
        System.out.println("Test case 5:");
        System.out.println("Input: " + arrayToString(nums5));
        System.out.println("Output: " + arrayToString(runningSum(nums5.clone())));  // Expected: []
        System.out.println("Explanation: Empty array, no running sum to calculate\n");
        
        // Test case 6: Large numbers
        int[] nums6 = {1000, 2000, 3000, 4000};
        System.out.println("Test case 6:");
        System.out.println("Input: " + arrayToString(nums6));
        System.out.println("Output: " + arrayToString(runningSum(nums6.clone())));  // Expected: [1000, 3000, 6000, 10000]
        System.out.println("Explanation: Running sum with large numbers\n");
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