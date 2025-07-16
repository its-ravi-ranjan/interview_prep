package array.easy;

import java.util.HashMap;
import java.util.Map;

/**
 * Single Number
 * 
 * Problem:
 * Given a non-empty array of integers nums, every element appears twice except for one.
 * Find that single one.
 * 
 * Example:
 * Input: nums = [2,2,1]
 * Output: 1
 * 
 * Input: nums = [4,1,2,1,2]
 * Output: 4
 * 
 * Approaches:
 * 1. Hash Map Approach:
 *    - Create a hash map to store counts of each element
 *    - First pass: Count occurrences of each number
 *    - Second pass: Find the number with count 1
 *    Time Complexity: O(n) - Two passes through array
 *    Space Complexity: O(n) - Hash map stores counts
 * 
 * 2. XOR Approach (Optimal):
 *    - Use XOR properties:
 *      a ^ a = 0 (XOR of same numbers is 0)
 *      a ^ 0 = a (XOR with 0 is the number itself)
 *    - XOR all numbers together
 *    - Result is the single number
 *    Time Complexity: O(n) - Single pass through array
 *    Space Complexity: O(1) - Constant extra space
 */
public class SingleNumber {
    
    /**
     * Hash Map Solution
     * Time: O(n), Space: O(n)
     * 
     * @param nums Array of integers where all but one appear twice
     * @return The single number
     */
    public int singleNumberHashMap(int[] nums) {
        // Step 1: Create hash map to store counts
        Map<Integer, Integer> countMap = new HashMap<>();
        
        // Step 2: Count occurrences of each number
        for (int num : nums) {
            countMap.put(num, countMap.getOrDefault(num, 0) + 1);
        }
        
        // Step 3: Find the number with count 1
        for (Map.Entry<Integer, Integer> entry : countMap.entrySet()) {
            if (entry.getValue() == 1) {
                return entry.getKey();
            }
        }
        
        // This line should never be reached if input is valid
        return -1;
    }
    
    /**
     * Optimal Solution using XOR
     * Time: O(n), Space: O(1)
     * 
     * @param nums Array of integers where all but one appear twice
     * @return The single number
     */
    public int singleNumber(int[] nums) {
        // Step 1: Initialize result with 0
        int result = 0;
        
        // Step 2: XOR all numbers together
        for (int num : nums) {
            result ^= num;
        }
        
        // Step 3: Return the result
        return result;
    }
    
    // Test cases
    public static void main(String[] args) {
        SingleNumber solution = new SingleNumber();
        
        // Test case 1: Basic case
        int[] nums1 = {2, 2, 1};
        System.out.println("Test 1 (XOR): " + solution.singleNumber(nums1));  // Expected: 1
        System.out.println("Test 1 (HashMap): " + solution.singleNumberHashMap(nums1));  // Expected: 1
        
        // Test case 2: Single element
        int[] nums2 = {1};
        System.out.println("Test 2 (XOR): " + solution.singleNumber(nums2));  // Expected: 1
        System.out.println("Test 2 (HashMap): " + solution.singleNumberHashMap(nums2));  // Expected: 1
        
        // Test case 3: Multiple pairs
        int[] nums3 = {4, 1, 2, 1, 2};
        System.out.println("Test 3 (XOR): " + solution.singleNumber(nums3));  // Expected: 4
        System.out.println("Test 3 (HashMap): " + solution.singleNumberHashMap(nums3));  // Expected: 4
        
        // Test case 4: Negative numbers
        int[] nums4 = {-1, -1, -2};
        System.out.println("Test 4 (XOR): " + solution.singleNumber(nums4));  // Expected: -2
        System.out.println("Test 4 (HashMap): " + solution.singleNumberHashMap(nums4));  // Expected: -2
        
        // Test case 5: Large numbers
        int[] nums5 = {1000000, 1000000, 1};
        System.out.println("Test 5 (XOR): " + solution.singleNumber(nums5));  // Expected: 1
        System.out.println("Test 5 (HashMap): " + solution.singleNumberHashMap(nums5));  // Expected: 1
        
        // Performance comparison
        System.out.println("\nPerformance comparison with large array:");
        int[] largeArray = new int[1000001];  // 1,000,000 pairs + 1 single number
        for (int i = 0; i < 500000; i++) {
            largeArray[i * 2] = i;
            largeArray[i * 2 + 1] = i;
        }
        largeArray[1000000] = 1000000;  // Add single number
        
        // Test XOR solution
        long startTime = System.nanoTime();
        solution.singleNumber(largeArray);
        long endTime = System.nanoTime();
        System.out.println("XOR solution time: " + (endTime - startTime) / 1000000.0 + " ms");
        
        // Test HashMap solution
        startTime = System.nanoTime();
        solution.singleNumberHashMap(largeArray);
        endTime = System.nanoTime();
        System.out.println("HashMap solution time: " + (endTime - startTime) / 1000000.0 + " ms");
    }
} 