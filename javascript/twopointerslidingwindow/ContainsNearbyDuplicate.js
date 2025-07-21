/**
 * Contains Duplicate II
 * 
 * Problem: Given an integer array nums and an integer k, return true if there are 
 * two distinct indices i and j in the array such that nums[i] == nums[j] and 
 * abs(i - j) <= k.
 * 
 * Example 1:
 * Input: nums = [1,2,3,1], k = 3
 * Output: true
 * Explanation: nums[0] == nums[3] and abs(0 - 3) = 3 <= k
 * 
 * Approach: Sliding Window with Set
 * 1. Use a Set to maintain a sliding window of size k+1
 * 2. For each element, check if it already exists in the window
 * 3. If found, return true (duplicate within k distance)
 * 4. Add current element to window and remove oldest if window size exceeds k+1
 * 5. If no duplicates found, return false
 * 
 * Time Complexity: O(n) where n is the length of array nums
 * Space Complexity: O(min(k, n)) since we store at most k+1 elements in the set
 */
class ContainsNearbyDuplicate {
    
    containsNearbyDuplicate(nums, k) {
        const window = new Set();
        
        for (let i = 0; i < nums.length; i++) {
            // Check if current element already exists in window
            if (window.has(nums[i])) {
                return true;
            }
            
            // Add current element to window
            window.add(nums[i]);
            
            // Remove oldest element if window size exceeds k+1
            if (window.size > k) {
                window.delete(nums[i - k]);
            }
        }
        
        return false;
    }
    
    // Alternative approach using Map to track indices
    containsNearbyDuplicateWithMap(nums, k) {
        const numToIndex = new Map();
        
        for (let i = 0; i < nums.length; i++) {
            // Check if we've seen this number before
            if (numToIndex.has(nums[i])) {
                const prevIndex = numToIndex.get(nums[i]);
                // Check if the distance is within k
                if (i - prevIndex <= k) {
                    return true;
                }
            }
            
            // Update the index for current number
            numToIndex.set(nums[i], i);
        }
        
        return false;
    }
    
    // Alternative approach using sliding window with explicit window management
    containsNearbyDuplicateSlidingWindow(nums, k) {
        if (!nums || nums.length <= 1 || k < 0) {
            return false;
        }
        
        const window = new Set();
        let left = 0;
        
        for (let right = 0; right < nums.length; right++) {
            // Check if current element exists in window
            if (window.has(nums[right])) {
                return true;
            }
            
            // Add current element to window
            window.add(nums[right]);
            
            // Maintain window size of k+1
            if (right - left >= k) {
                window.delete(nums[left]);
                left++;
            }
        }
        
        return false;
    }
    
    // Alternative approach using object for character counting
    containsNearbyDuplicateWithObject(nums, k) {
        const numToIndex = {};
        
        for (let i = 0; i < nums.length; i++) {
            // Check if we've seen this number before
            if (numToIndex.hasOwnProperty(nums[i])) {
                const prevIndex = numToIndex[nums[i]];
                // Check if the distance is within k
                if (i - prevIndex <= k) {
                    return true;
                }
            }
            
            // Update the index for current number
            numToIndex[nums[i]] = i;
        }
        
        return false;
    }
    
    // Alternative approach using array for small k values (optimization)
    containsNearbyDuplicateOptimized(nums, k) {
        if (!nums || nums.length <= 1 || k < 0) {
            return false;
        }
        
        // For very small k, we can use a simple array approach
        if (k <= 10) {
            return this.containsNearbyDuplicateSmallK(nums, k);
        }
        
        // For larger k, use Set approach
        return this.containsNearbyDuplicate(nums, k);
    }
    
    containsNearbyDuplicateSmallK(nums, k) {
        for (let i = 0; i < nums.length; i++) {
            // Check elements within k distance
            for (let j = Math.max(0, i - k); j < i; j++) {
                if (nums[i] === nums[j]) {
                    return true;
                }
            }
        }
        return false;
    }
    
    // Alternative approach using Set with explicit window size management
    containsNearbyDuplicateWithExplicitWindow(nums, k) {
        if (!nums || nums.length <= 1 || k < 0) {
            return false;
        }
        
        const window = new Set();
        const windowSize = k + 1;
        
        for (let i = 0; i < nums.length; i++) {
            // Check if current element already exists in window
            if (window.has(nums[i])) {
                return true;
            }
            
            // Add current element to window
            window.add(nums[i]);
            
            // Maintain window size
            if (i >= k) {
                window.delete(nums[i - k]);
            }
        }
        
        return false;
    }
}

// Test function
function runTests() {
    const solution = new ContainsNearbyDuplicate();
    
    // Test Case 1
    console.log("Test Case 1:");
    const nums1 = [1, 2, 3, 1];
    const k1 = 3;
    const result1 = solution.containsNearbyDuplicate(nums1, k1);
    console.log(`Input: nums = [${nums1}], k = ${k1}`);
    console.log(`Output: ${result1}`);
    console.log("Expected: true");
    console.log();
    
    // Test Case 2
    console.log("Test Case 2:");
    const nums2 = [1, 0, 1, 1];
    const k2 = 1;
    const result2 = solution.containsNearbyDuplicate(nums2, k2);
    console.log(`Input: nums = [${nums2}], k = ${k2}`);
    console.log(`Output: ${result2}`);
    console.log("Expected: true");
    console.log();
    
    // Test Case 3
    console.log("Test Case 3:");
    const nums3 = [1, 2, 3, 1, 2, 3];
    const k3 = 2;
    const result3 = solution.containsNearbyDuplicate(nums3, k3);
    console.log(`Input: nums = [${nums3}], k = ${k3}`);
    console.log(`Output: ${result3}`);
    console.log("Expected: false");
    console.log();
    
    // Test Case 4 - Single element
    console.log("Test Case 4:");
    const nums4 = [1];
    const k4 = 1;
    const result4 = solution.containsNearbyDuplicate(nums4, k4);
    console.log(`Input: nums = [${nums4}], k = ${k4}`);
    console.log(`Output: ${result4}`);
    console.log("Expected: false");
    console.log();
    
    // Test Case 5 - k = 0
    console.log("Test Case 5:");
    const nums5 = [1, 2, 3, 1];
    const k5 = 0;
    const result5 = solution.containsNearbyDuplicate(nums5, k5);
    console.log(`Input: nums = [${nums5}], k = ${k5}`);
    console.log(`Output: ${result5}`);
    console.log("Expected: false");
    console.log();
    
    // Test Case 6 - Large k
    console.log("Test Case 6:");
    const nums6 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
    const k6 = 10;
    const result6 = solution.containsNearbyDuplicate(nums6, k6);
    console.log(`Input: nums = [${nums6}], k = ${k6}`);
    console.log(`Output: ${result6}`);
    console.log("Expected: true");
    console.log();
    
    // Test Case 7 - All same elements
    console.log("Test Case 7:");
    const nums7 = [1, 1, 1, 1];
    const k7 = 2;
    const result7 = solution.containsNearbyDuplicate(nums7, k7);
    console.log(`Input: nums = [${nums7}], k = ${k7}`);
    console.log(`Output: ${result7}`);
    console.log("Expected: true");
    console.log();
    
    // Test Case 8 - Edge case with k larger than array length
    console.log("Test Case 8:");
    const nums8 = [1, 2, 3];
    const k8 = 5;
    const result8 = solution.containsNearbyDuplicate(nums8, k8);
    console.log(`Input: nums = [${nums8}], k = ${k8}`);
    console.log(`Output: ${result8}`);
    console.log("Expected: false");
    console.log();
    
    // Test Case 9 - Negative numbers
    console.log("Test Case 9:");
    const nums9 = [-1, -2, -1, -3];
    const k9 = 2;
    const result9 = solution.containsNearbyDuplicate(nums9, k9);
    console.log(`Input: nums = [${nums9}], k = ${k9}`);
    console.log(`Output: ${result9}`);
    console.log("Expected: true");
    console.log();
    
    // Test Case 10 - Large numbers
    console.log("Test Case 10:");
    const nums10 = [1000000, 2000000, 1000000, 3000000];
    const k10 = 2;
    const result10 = solution.containsNearbyDuplicate(nums10, k10);
    console.log(`Input: nums = [${nums10}], k = ${k10}`);
    console.log(`Output: ${result10}`);
    console.log("Expected: true");
    console.log();
    
    // Performance comparison
    console.log("Performance Comparison:");
    const largeNums = Array.from({length: 10000}, (_, i) => i % 100); // Creates some duplicates
    const largeK = 100;
    
    let startTime = performance.now();
    const result11 = solution.containsNearbyDuplicate(largeNums, largeK);
    let endTime = performance.now();
    console.log(`Set approach time: ${(endTime - startTime).toFixed(2)}ms, Result: ${result11}`);
    
    startTime = performance.now();
    const result12 = solution.containsNearbyDuplicateWithMap(largeNums, largeK);
    endTime = performance.now();
    console.log(`Map approach time: ${(endTime - startTime).toFixed(2)}ms, Result: ${result12}`);
    
    startTime = performance.now();
    const result13 = solution.containsNearbyDuplicateSlidingWindow(largeNums, largeK);
    endTime = performance.now();
    console.log(`Sliding window approach time: ${(endTime - startTime).toFixed(2)}ms, Result: ${result13}`);
    
    startTime = performance.now();
    const result14 = solution.containsNearbyDuplicateWithObject(largeNums, largeK);
    endTime = performance.now();
    console.log(`Object approach time: ${(endTime - startTime).toFixed(2)}ms, Result: ${result14}`);
    
    startTime = performance.now();
    const result15 = solution.containsNearbyDuplicateOptimized(largeNums, largeK);
    endTime = performance.now();
    console.log(`Optimized approach time: ${(endTime - startTime).toFixed(2)}ms, Result: ${result15}`);
    
    startTime = performance.now();
    const result16 = solution.containsNearbyDuplicateWithExplicitWindow(largeNums, largeK);
    endTime = performance.now();
    console.log(`Explicit window approach time: ${(endTime - startTime).toFixed(2)}ms, Result: ${result16}`);
    
    // Verify all approaches give same result
    console.log("\nVerification:");
    console.log("All approaches give same result:", 
        result11 === result12 && result12 === result13 && result13 === result14 && 
        result14 === result15 && result15 === result16);
    
    // Test with small k for optimized approach
    console.log("\nTesting optimized approach with small k:");
    const smallKNums = [1, 2, 3, 1, 2, 3];
    const smallK = 2;
    const result17 = solution.containsNearbyDuplicateOptimized(smallKNums, smallK);
    console.log("Small k test: " + result17 + " (Expected: false)");
    
    // Additional edge cases
    console.log("\nAdditional Edge Cases:");
    
    // Empty array
    console.log("Empty array:", solution.containsNearbyDuplicate([], 1));
    
    // Null/undefined
    console.log("Null array:", solution.containsNearbyDuplicate(null, 1));
    console.log("Undefined array:", solution.containsNearbyDuplicate(undefined, 1));
    
    // Negative k
    console.log("Negative k:", solution.containsNearbyDuplicate([1, 2, 3], -1));
    
    // Very large k
    console.log("Very large k:", solution.containsNearbyDuplicate([1, 2, 3], 1000000));
}

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runTests();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContainsNearbyDuplicate;
} 