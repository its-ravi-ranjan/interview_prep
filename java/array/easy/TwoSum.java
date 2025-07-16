package array.easy;

import java.util.*;

/**
 * Two Sum
 * 
 * Problem:
 * Given an array of integers nums and an integer target, return the indices
 * of the two numbers such that they add up to target. You may assume that
 * each input would have exactly one solution, and you may not use the same
 * element twice. You can return the answer in any order.
 * 
 * Example:
 * Input: nums = [2, 7, 11, 15], target = 9
 * Output: [0, 1]
 * Explanation: nums[0] + nums[1] = 2 + 7 = 9
 * 
 * Approach 1 - Hash Map (Best for Unsorted Array):
 * 1. Create a hash map to store numbers and their indices
 * 2. For each number, calculate the difference (target - current number)
 * 3. If difference exists in map, return the indices
 * 4. Otherwise, add current number and its index to map
 * 
 * Approach 2 - Two Pointers (If Array is Sorted):
 * 1. Use two pointers: left (start) and right (end)
 * 2. Calculate sum of elements at left and right pointers
 * 3. If sum equals target, return indices
 * 4. If sum < target, move left pointer right
 * 5. If sum > target, move right pointer left
 * 
 * Dry Run - Hash Map Approach (on [2, 7, 11, 15], target = 9):
 * Initial: map = {}
 * 
 * Step 1: i = 0, num = 2
 *   diff = 9 - 2 = 7
 *   map.containsKey(7) = false
 *   map.put(2, 0) → map = {2: 0}
 * 
 * Step 2: i = 1, num = 7
 *   diff = 9 - 7 = 2
 *   map.containsKey(2) = true, map.get(2) = 0
 *   Return [0, 1] ✓
 * 
 * Dry Run - Two Pointers Approach (on [2, 7, 11, 15], target = 9):
 * Initial: left = 0, right = 3
 * 
 * Step 1: left = 0, right = 3
 *   sum = arr[0] + arr[3] = 2 + 15 = 17
 *   17 > 9, so right--
 * 
 * Step 2: left = 0, right = 2
 *   sum = arr[0] + arr[2] = 2 + 11 = 13
 *   13 > 9, so right--
 * 
 * Step 3: left = 0, right = 1
 *   sum = arr[0] + arr[1] = 2 + 7 = 9
 *   9 = 9, return [0, 1] ✓
 * 
 * Time & Space Complexity:
 * Hash Map Approach:
 *   Time Complexity: O(n) - single pass through the array
 *   Space Complexity: O(n) - hash map storage
 * 
 * Two Pointers Approach:
 *   Time Complexity: O(n) - single pass through the array
 *   Space Complexity: O(1) - constant space used
 */
public class TwoSum {
    
    /**
     * Finds two numbers that add up to target using Hash Map approach
     * @param nums Input array
     * @param target Target sum
     * @return Indices of two numbers that add up to target
     */
    public static int[] twoSumHashMap(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            
            if (map.containsKey(diff)) {
                return new int[]{map.get(diff), i};
            }
            
            map.put(nums[i], i);
        }
        
        return new int[]{}; // No solution found
    }
    
    /**
     * Finds two numbers that add up to target using Two Pointers approach
     * Note: This approach requires the array to be sorted
     * @param nums Input array (must be sorted)
     * @param target Target sum
     * @return Indices of two numbers that add up to target
     */
    public static int[] twoSumTwoPointers(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        
        while (left < right) {
            int sum = nums[left] + nums[right];
            
            if (sum == target) {
                return new int[]{left, right};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        
        return new int[]{}; // No solution found
    }
    
    /**
     * Finds two numbers that add up to target with duplicate handling
     * @param nums Input array
     * @param target Target sum
     * @return Indices of two numbers that add up to target
     */
    public static int[] twoSumWithDuplicates(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            
            if (map.containsKey(diff) && map.get(diff) != i) {
                return new int[]{map.get(diff), i};
            }
            
            map.put(nums[i], i);
        }
        
        return new int[]{}; // No solution found
    }
    
    /**
     * Finds all pairs that add up to target
     * @param nums Input array
     * @param target Target sum
     * @return All pairs of indices that add up to target
     */
    public static List<int[]> findAllTwoSumPairs(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        List<int[]> result = new ArrayList<>();
        
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            
            if (map.containsKey(diff)) {
                result.add(new int[]{map.get(diff), i});
            }
            
            map.put(nums[i], i);
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        // Test case 1: Basic case - Hash Map
        int[] nums1 = {2, 7, 11, 15};
        int target1 = 9;
        System.out.println("Test case 1 - Hash Map:");
        System.out.println("Input: nums = " + arrayToString(nums1) + ", target = " + target1);
        System.out.println("Output: " + arrayToString(twoSumHashMap(nums1, target1)));  // Expected: [0, 1]
        System.out.println("Explanation: nums[0] + nums[1] = 2 + 7 = 9\n");
        
        // Test case 2: Two Pointers (sorted array)
        int[] nums2 = {2, 7, 11, 15};
        int target2 = 9;
        System.out.println("Test case 2 - Two Pointers:");
        System.out.println("Input: nums = " + arrayToString(nums2) + ", target = " + target2);
        System.out.println("Output: " + arrayToString(twoSumTwoPointers(nums2, target2)));  // Expected: [0, 1]
        System.out.println("Explanation: Using two pointers on sorted array\n");
        
        // Test case 3: No solution
        int[] nums3 = {1, 2, 3, 4};
        int target3 = 10;
        System.out.println("Test case 3 - No Solution:");
        System.out.println("Input: nums = " + arrayToString(nums3) + ", target = " + target3);
        System.out.println("Output: " + arrayToString(twoSumHashMap(nums3, target3)));  // Expected: []
        System.out.println("Explanation: No two numbers add up to 10\n");
        
        // Test case 4: Duplicate elements
        int[] nums4 = {3, 2, 4, 3};
        int target4 = 6;
        System.out.println("Test case 4 - With Duplicates:");
        System.out.println("Input: nums = " + arrayToString(nums4) + ", target = " + target4);
        System.out.println("Output: " + arrayToString(twoSumWithDuplicates(nums4, target4)));  // Expected: [1, 2]
        System.out.println("Explanation: nums[1] + nums[2] = 2 + 4 = 6\n");
        
        // Test case 5: Multiple pairs
        int[] nums5 = {1, 5, 3, 3, 5, 1};
        int target5 = 6;
        System.out.println("Test case 5 - Multiple Pairs:");
        System.out.println("Input: nums = " + arrayToString(nums5) + ", target = " + target5);
        List<int[]> allPairs = findAllTwoSumPairs(nums5, target5);
        System.out.print("All pairs: [");
        for (int i = 0; i < allPairs.size(); i++) {
            System.out.print(arrayToString(allPairs.get(i)));
            if (i < allPairs.size() - 1) System.out.print(", ");
        }
        System.out.println("]");  // Expected: [[0,1], [2,3], [4,5]]
        System.out.println("Explanation: Multiple pairs add up to 6\n");
        
        // Test case 6: Large numbers
        int[] nums6 = {1000000, 2000000, 3000000, 4000000};
        int target6 = 3000000;
        System.out.println("Test case 6 - Large Numbers:");
        System.out.println("Input: nums = " + arrayToString(nums6) + ", target = " + target6);
        System.out.println("Output: " + arrayToString(twoSumHashMap(nums6, target6)));  // Expected: [0, 1]
        System.out.println("Explanation: nums[0] + nums[1] = 1000000 + 2000000 = 3000000\n");
        
        // Test case 7: Negative numbers
        int[] nums7 = {-1, -2, -3, -4, -5};
        int target7 = -8;
        System.out.println("Test case 7 - Negative Numbers:");
        System.out.println("Input: nums = " + arrayToString(nums7) + ", target = " + target7);
        System.out.println("Output: " + arrayToString(twoSumHashMap(nums7, target7)));  // Expected: [2, 4]
        System.out.println("Explanation: nums[2] + nums[4] = -3 + (-5) = -8\n");
        
        // Performance comparison
        System.out.println("Performance Comparison:");
        int[] largeArray = new int[100000];
        for (int i = 0; i < largeArray.length; i++) {
            largeArray[i] = i;
        }
        int largeTarget = 199998;
        
        long startTime1 = System.nanoTime();
        twoSumHashMap(largeArray, largeTarget);
        long endTime1 = System.nanoTime();
        System.out.printf("Hash Map time: %.2f ms%n", (endTime1 - startTime1) / 1_000_000.0);
        
        long startTime2 = System.nanoTime();
        twoSumTwoPointers(largeArray, largeTarget);
        long endTime2 = System.nanoTime();
        System.out.printf("Two Pointers time: %.2f ms%n", (endTime2 - startTime2) / 1_000_000.0);
        System.out.println("Explanation: Both approaches are O(n) but Hash Map uses more space\n");
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