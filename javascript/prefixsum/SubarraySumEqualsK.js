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
class SubarraySumEqualsK {
    
    subarraySum(nums, k) {
        const map = new Map();
        map.set(0, 1); // Base case: sum 0 appears once at index -1
        
        let sum = 0;
        let count = 0;
        
        for (let i = 0; i < nums.length; i++) {
            sum += nums[i];
            
            // Check if (sum - k) exists in map
            if (map.has(sum - k)) {
                count += map.get(sum - k);
            }
            
            // Update frequency of current sum
            map.set(sum, (map.get(sum) || 0) + 1);
        }
        
        return count;
    }
    
    // Alternative approach with detailed explanation
    subarraySumDetailed(nums, k) {
        const prefixSumCount = new Map();
        prefixSumCount.set(0, 1); // Empty subarray has sum 0
        
        let currentSum = 0;
        let result = 0;
        
        for (const num of nums) {
            currentSum += num;
            
            // If (currentSum - k) exists, we found subarrays with sum k
            const target = currentSum - k;
            if (prefixSumCount.has(target)) {
                result += prefixSumCount.get(target);
            }
            
            // Increment count for current sum
            prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);
        }
        
        return result;
    }
}

// Simple test
const solution = new SubarraySumEqualsK();

// Test case 1
const nums1 = [1, 1, 1];
const k1 = 2;
console.log(solution.subarraySum(nums1, k1)); // Expected: 2

// Test case 2
const nums2 = [1, 2, 3];
const k2 = 3;
console.log(solution.subarraySum(nums2, k2)); // Expected: 2 