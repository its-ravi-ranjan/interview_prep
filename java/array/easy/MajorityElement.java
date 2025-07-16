package array.easy;

import java.util.HashMap;
import java.util.Map;

/**
 * Majority Element
 * 
 * Problem:
 * Given an array nums of size n, return the majority element.
 * The majority element is the element that appears more than ⌊n / 2⌋ times.
 * You may assume that the majority element always exists in the array.
 * 
 * Example 1:
 * Input: nums = [3,2,3]
 * Output: 3
 * 
 * Example 2:
 * Input: nums = [2,2,1,1,1,2,2]
 * Output: 2
 * 
 * Approach 1 - Hash Map:
 * 1. Create a hash map to count occurrences of each element
 * 2. Iterate through the array and count each element
 * 3. Find the element with count > n/2
 * 
 * Approach 2 - Boyer-Moore Majority Vote Algorithm:
 * 1. Initialize candidate and count
 * 2. For each element:
 *    - If count is 0, set current element as candidate
 *    - If current element equals candidate, increment count
 *    - If different, decrement count
 * 3. Return the candidate
 * 
 * Dry Run (Boyer-Moore on [2,2,1,1,1,2,2]):
 * Initial: majorElement = null, count = 0
 * 
 * Step 1: num = 2
 *   count = 0, so majorElement = 2, count = 1
 * 
 * Step 2: num = 2
 *   majorElement == 2, so count = 2
 * 
 * Step 3: num = 1
 *   majorElement != 1, so count = 1
 * 
 * Step 4: num = 1
 *   majorElement != 1, so count = 0
 * 
 * Step 5: num = 1
 *   count = 0, so majorElement = 1, count = 1
 * 
 * Step 6: num = 2
 *   majorElement != 2, so count = 0
 * 
 * Step 7: num = 2
 *   count = 0, so majorElement = 2, count = 1
 * 
 * Result: 2 ✓
 * 
 * Time & Space Complexity:
 * Approach 1 (Hash Map):
 *   Time Complexity: O(n)
 *   Space Complexity: O(n)
 * 
 * Approach 2 (Boyer-Moore):
 *   Time Complexity: O(n)
 *   Space Complexity: O(1)
 */
public class MajorityElement {
    
    /**
     * Finds majority element using Hash Map approach
     * @param nums Input array
     * @return Majority element
     */
    public static int majorityElementHashMap(int[] nums) {
        Map<Integer, Integer> map = new HashMap<>();
        
        // Count occurrences of each element
        for (int num : nums) {
            map.put(num, map.getOrDefault(num, 0) + 1);
        }
        
        // Find element with count > n/2
        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            if (entry.getValue() > nums.length / 2) {
                return entry.getKey();
            }
        }
        
        return -1; // Should not reach here as per problem statement
    }
    
    /**
     * Finds majority element using Boyer-Moore Majority Vote Algorithm
     * @param nums Input array
     * @return Majority element
     */
    public static int majorityElement(int[] nums) {
        Integer majorElement = null;
        int count = 0;
        
        for (int num : nums) {
            if (count == 0) {
                majorElement = num;
            }
            count += (majorElement == num) ? 1 : -1;
        }
        
        return majorElement;
    }
    
    public static void main(String[] args) {
        // Test case 1: Example 1
        int[] nums1 = {3, 2, 3};
        System.out.println("Test case 1:");
        System.out.println("Input: " + arrayToString(nums1));
        System.out.println("Hash Map Output: " + majorityElementHashMap(nums1));  // Expected: 3
        System.out.println("Boyer-Moore Output: " + majorityElement(nums1));  // Expected: 3
        System.out.println("Explanation: 3 appears 2 times out of 3 elements\n");
        
        // Test case 2: Example 2
        int[] nums2 = {2, 2, 1, 1, 1, 2, 2};
        System.out.println("Test case 2:");
        System.out.println("Input: " + arrayToString(nums2));
        System.out.println("Hash Map Output: " + majorityElementHashMap(nums2));  // Expected: 2
        System.out.println("Boyer-Moore Output: " + majorityElement(nums2));  // Expected: 2
        System.out.println("Explanation: 2 appears 4 times out of 7 elements\n");
        
        // Test case 3: Single element
        int[] nums3 = {1};
        System.out.println("Test case 3:");
        System.out.println("Input: " + arrayToString(nums3));
        System.out.println("Hash Map Output: " + majorityElementHashMap(nums3));  // Expected: 1
        System.out.println("Boyer-Moore Output: " + majorityElement(nums3));  // Expected: 1
        System.out.println("Explanation: Single element is always majority\n");
        
        // Test case 4: All same elements
        int[] nums4 = {5, 5, 5, 5, 5};
        System.out.println("Test case 4:");
        System.out.println("Input: " + arrayToString(nums4));
        System.out.println("Hash Map Output: " + majorityElementHashMap(nums4));  // Expected: 5
        System.out.println("Boyer-Moore Output: " + majorityElement(nums4));  // Expected: 5
        System.out.println("Explanation: All elements are the same\n");
        
        // Test case 5: Large array
        int[] nums5 = new int[1999];
        for (int i = 0; i < 1000; i++) {
            nums5[i] = 7;
        }
        for (int i = 1000; i < 1999; i++) {
            nums5[i] = 3;
        }
        System.out.println("Test case 5:");
        System.out.println("Input: Array with 1999 elements (7 appears 1000 times, 3 appears 999 times)");
        System.out.println("Hash Map Output: " + majorityElementHashMap(nums5));  // Expected: 7
        System.out.println("Boyer-Moore Output: " + majorityElement(nums5));  // Expected: 7
        System.out.println("Explanation: 7 appears 1000 times out of 1999 elements\n");
        
        // Performance comparison
        System.out.println("Performance Comparison:");
        int[] largeArray = new int[200000];
        for (int i = 0; i < 100000; i++) {
            largeArray[i] = 9;
        }
        for (int i = 100000; i < 200000; i++) {
            largeArray[i] = 1;
        }
        
        long startTime1 = System.nanoTime();
        majorityElementHashMap(largeArray);
        long endTime1 = System.nanoTime();
        System.out.printf("Hash Map time: %.2f ms%n", (endTime1 - startTime1) / 1_000_000.0);
        
        long startTime2 = System.nanoTime();
        majorityElement(largeArray);
        long endTime2 = System.nanoTime();
        System.out.printf("Boyer-Moore time: %.2f ms%n", (endTime2 - startTime2) / 1_000_000.0);
        System.out.println("Explanation: Boyer-Moore is more efficient due to O(1) space complexity\n");
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