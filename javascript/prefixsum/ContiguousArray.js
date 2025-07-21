/**
 * CONTIGUOUS ARRAY
 * 
 * Problem: Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.
 * 
 * Approach: Prefix Sum with HashMap
 * 1. Convert 0 to -1 and 1 to 1 to track balance
 * 2. Use prefix sum to track cumulative balance
 * 3. Store first occurrence of each balance in HashMap
 * 4. When same balance appears again, calculate subarray length
 * 5. Track maximum length found
 * 
 * Note: Balance of 0 means equal 0s and 1s in that range
 * 
 * Time Complexity: O(n) where n is the length of array
 * Space Complexity: O(n) for HashMap storage
 */
class ContiguousArray {
    
    findMaxLength(nums) {
        const map = new Map();
        map.set(0, -1); // Base case: balance 0 at index -1
        
        let maxLength = 0;
        let balance = 0;
        
        for (let i = 0; i < nums.length; i++) {
            // Convert 0 to -1, 1 to 1
            balance += (nums[i] === 1) ? 1 : -1;
            
            if (map.has(balance)) {
                // Found same balance before, calculate subarray length
                maxLength = Math.max(maxLength, i - map.get(balance));
            } else {
                // First time seeing this balance, store index
                map.set(balance, i);
            }
        }
        
        return maxLength;
    }
    
    // Alternative approach using array instead of HashMap
    findMaxLengthArray(nums) {
        const n = nums.length;
        const balanceIndex = new Array(2 * n + 1).fill(-2); // Balance can range from -n to n
        balanceIndex[n] = -1; // Balance 0 at index -1
        
        let maxLength = 0;
        let balance = 0;
        
        for (let i = 0; i < n; i++) {
            balance += (nums[i] === 1) ? 1 : -1;
            
            if (balanceIndex[balance + n] !== -2) {
                maxLength = Math.max(maxLength, i - balanceIndex[balance + n]);
            } else {
                balanceIndex[balance + n] = i;
            }
        }
        
        return maxLength;
    }
}

// Simple test
const solution = new ContiguousArray();

// Test case 1
const nums1 = [0, 1];
console.log(solution.findMaxLength(nums1)); // Expected: 2

// Test case 2
const nums2 = [0, 1, 0];
console.log(solution.findMaxLength(nums2)); // Expected: 2 