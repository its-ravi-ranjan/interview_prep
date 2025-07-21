/**
 * SUBARRAY SUM EQUALS K
 * 
 * Problem: Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.
 * 
 * Approach: Prefix Sum with HashMap
 * 1. Use prefix sum to track cumulative sum
 * 2. Store frequency of each prefix sum in HashMap
 * 3. For each current sum, check if (sum - k) exists in map
 * 4. If exists, add its frequency to count
 * 5. Update frequency of current sum in map
 * 
 * Note: sum[i] - sum[j] = k means subarray from j+1 to i has sum k
 * 
 * Time Complexity: O(n) where n is the length of array
 * Space Complexity: O(n) for HashMap storage
 */
import java.util.*;

public class SubarraySumEqualsK {
    
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1); // Base case: sum 0 appears once at index -1
        
        int sum = 0;
        int count = 0;
        
        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];
            
            // Check if (sum - k) exists in map
            if (map.containsKey(sum - k)) {
                count += map.get(sum - k);
            }
            
            // Update frequency of current sum
            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }
        
        return count;
    }
    
    // Alternative approach with detailed explanation
    public int subarraySumDetailed(int[] nums, int k) {
        Map<Integer, Integer> prefixSumCount = new HashMap<>();
        prefixSumCount.put(0, 1); // Empty subarray has sum 0
        
        int currentSum = 0;
        int result = 0;
        
        for (int num : nums) {
            currentSum += num;
            
            // If (currentSum - k) exists, we found subarrays with sum k
            int target = currentSum - k;
            if (prefixSumCount.containsKey(target)) {
                result += prefixSumCount.get(target);
            }
            
            // Increment count for current sum
            prefixSumCount.put(currentSum, prefixSumCount.getOrDefault(currentSum, 0) + 1);
        }
        
        return result;
    }
    
    // Simple test
    public static void main(String[] args) {
        SubarraySumEqualsK solution = new SubarraySumEqualsK();
        
        // Test case 1
        int[] nums1 = {1, 1, 1};
        int k1 = 2;
        System.out.println(solution.subarraySum(nums1, k1)); // Expected: 2
        
        // Test case 2
        int[] nums2 = {1, 2, 3};
        int k2 = 3;
        System.out.println(solution.subarraySum(nums2, k2)); // Expected: 2
    }
} 