package array.easy;

/**
 * Squares of a Sorted Array
 * 
 * Problem:
 * Given an integer array nums sorted in non-decreasing order, return an array
 * of the squares of each number sorted in non-decreasing order.
 * 
 * Example 1:
 * Input: nums = [-4,-1,0,3,10]
 * Output: [0,1,9,16,100]
 * Explanation: After squaring, the array becomes [16,1,0,9,100].
 * After sorting, it becomes [0,1,9,16,100].
 * 
 * Approach - Two Pointers:
 * Since the array is sorted, the largest absolute values will be on either end.
 * Use two pointers (left and right) to compare absolute values from both ends,
 * fill the result array from end to start.
 * 
 * Steps:
 * 1. Initialize result array of same size as input
 * 2. Use two pointers: left (start) and right (end)
 * 3. Compare squares of elements at left and right pointers
 * 4. Place the larger square at the end of result array
 * 5. Move the pointer that contributed the larger square
 * 6. Continue until all elements are processed
 * 
 * Dry Run (on [-4,-1,0,3,10]):
 * Initial: left = 0, right = 4, pos = 4
 * 
 * Step 1: left = 0, right = 4
 *   leftEle = (-4)² = 16, rightEle = 10² = 100
 *   16 < 100, so result[4] = 100, right--, pos--
 *   Array: [_, _, _, _, 100]
 * 
 * Step 2: left = 0, right = 3
 *   leftEle = (-4)² = 16, rightEle = 3² = 9
 *   16 > 9, so result[3] = 16, left++, pos--
 *   Array: [_, _, _, 16, 100]
 * 
 * Step 3: left = 1, right = 3
 *   leftEle = (-1)² = 1, rightEle = 3² = 9
 *   1 < 9, so result[2] = 9, right--, pos--
 *   Array: [_, _, _, 16, 100]
 * 
 * Step 4: left = 1, right = 2
 *   leftEle = (-1)² = 1, rightEle = 0² = 0
 *   1 > 0, so result[1] = 1, left++, pos--
 *   Array: [_, 1, _, 16, 100]
 * 
 * Step 5: left = 2, right = 2
 *   leftEle = 0² = 0, rightEle = 0² = 0
 *   0 = 0, so result[0] = 0, right--, pos--
 *   Array: [0, 1, _, 16, 100]
 * 
 * Final Result: [0, 1, 9, 16, 100] ✓
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n) - single pass through the array
 * Space Complexity: O(n) - for the result array
 */
public class SortedSquares {
    
    /**
     * Returns squares of array elements in sorted order
     * @param nums Input array sorted in non-decreasing order
     * @return Array of squares in non-decreasing order
     */
    public static int[] sortedSquares(int[] nums) {
        int[] result = new int[nums.length];
        int left = 0;
        int right = nums.length - 1;
        int pos = nums.length - 1;
        
        while (left <= right) {
            int leftEle = nums[left] * nums[left];
            int rightEle = nums[right] * nums[right];
            
            if (leftEle > rightEle) {
                result[pos] = leftEle;
                left++;
            } else {
                result[pos] = rightEle;
                right--;
            }
            pos--;
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        // Test case 1: Example case
        int[] nums1 = {-4, -1, 0, 3, 10};
        System.out.println("Test case 1:");
        System.out.println("Input: " + arrayToString(nums1));
        System.out.println("Output: " + arrayToString(sortedSquares(nums1)));  // Expected: [0, 1, 9, 16, 100]
        System.out.println("Explanation: After squaring, the array becomes [16,1,0,9,100]. After sorting, it becomes [0,1,9,16,100].\n");
        
        // Test case 2: All negative numbers
        int[] nums2 = {-7, -3, -2, -1};
        System.out.println("Test case 2:");
        System.out.println("Input: " + arrayToString(nums2));
        System.out.println("Output: " + arrayToString(sortedSquares(nums2)));  // Expected: [1, 4, 9, 49]
        System.out.println("Explanation: After squaring, the array becomes [49,9,4,1]. After sorting, it becomes [1,4,9,49].\n");
        
        // Test case 3: All positive numbers
        int[] nums3 = {1, 2, 3, 4, 5};
        System.out.println("Test case 3:");
        System.out.println("Input: " + arrayToString(nums3));
        System.out.println("Output: " + arrayToString(sortedSquares(nums3)));  // Expected: [1, 4, 9, 16, 25]
        System.out.println("Explanation: After squaring, the array becomes [1,4,9,16,25]. Already sorted.\n");
        
        // Test case 4: Single element
        int[] nums4 = {-5};
        System.out.println("Test case 4:");
        System.out.println("Input: " + arrayToString(nums4));
        System.out.println("Output: " + arrayToString(sortedSquares(nums4)));  // Expected: [25]
        System.out.println("Explanation: Single element squared.\n");
        
        // Test case 5: Array with zeros
        int[] nums5 = {-3, 0, 0, 2};
        System.out.println("Test case 5:");
        System.out.println("Input: " + arrayToString(nums5));
        System.out.println("Output: " + arrayToString(sortedSquares(nums5)));  // Expected: [0, 0, 4, 9]
        System.out.println("Explanation: After squaring, the array becomes [9,0,0,4]. After sorting, it becomes [0,0,4,9].\n");
        
        // Test case 6: Large numbers
        int[] nums6 = {-1000, -500, 0, 500, 1000};
        System.out.println("Test case 6:");
        System.out.println("Input: " + arrayToString(nums6));
        System.out.println("Output: " + arrayToString(sortedSquares(nums6)));  // Expected: [0, 250000, 250000, 1000000, 1000000]
        System.out.println("Explanation: After squaring, the array becomes [1000000,250000,0,250000,1000000]. After sorting, it becomes [0,250000,250000,1000000,1000000].\n");
        
        // Test case 7: Empty array
        int[] nums7 = {};
        System.out.println("Test case 7:");
        System.out.println("Input: " + arrayToString(nums7));
        System.out.println("Output: " + arrayToString(sortedSquares(nums7)));  // Expected: []
        System.out.println("Explanation: Empty array returns empty array.\n");
        
        // Performance test
        System.out.println("Performance Test:");
        int[] largeArray = new int[100000];
        for (int i = 0; i < largeArray.length; i++) {
            largeArray[i] = i - 50000;
        }
        long startTime = System.nanoTime();
        sortedSquares(largeArray);
        long endTime = System.nanoTime();
        System.out.printf("Time taken for 100,000 elements: %.2f ms%n", (endTime - startTime) / 1_000_000.0);
        System.out.println("Explanation: Efficient O(n) algorithm handles large arrays quickly.\n");
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