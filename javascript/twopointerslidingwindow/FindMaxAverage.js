/**
 * Maximum Average Subarray I
 * 
 * Problem: You are given an integer array nums consisting of n elements, and an integer k.
 * Find a contiguous subarray whose length is equal to k that has the maximum average 
 * value and return this value. Any answer with a calculation error less than 10^-5 
 * will be accepted.
 * 
 * Example 1:
 * Input: nums = [1,12,-5,-6,50,3], k = 4
 * Output: 12.75000
 * Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
 * 
 * Approach: Sliding Window with Sum Tracking
 * 1. Calculate the sum of the first k elements
 * 2. Slide the window by adding the next element and removing the first element
 * 3. Calculate average for each window and track the maximum
 * 4. Return the maximum average found
 * 
 * Time Complexity: O(n) where n is the length of array nums
 * Space Complexity: O(1) since we only use a few variables
 */
class FindMaxAverage {
    
    findMaxAverage(nums, k) {
        let maxAvg = Number.MIN_SAFE_INTEGER;
        let windowSum = 0;

        for (let i = 0; i < nums.length; i++) {
            if (i <= k - 1) {
                windowSum += nums[i];
            } else {
                const avg = windowSum / k;
                maxAvg = Math.max(maxAvg, avg);
                windowSum -= nums[i - k];
                windowSum += nums[i];
            }
        }
        
        const avg = windowSum / k;
        return Math.max(maxAvg, avg);
    }
    
    // Alternative approach using explicit sliding window
    findMaxAverageSlidingWindow(nums, k) {
        if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
            return 0.0;
        }
        
        // Calculate sum of first window
        let windowSum = 0;
        for (let i = 0; i < k; i++) {
            windowSum += nums[i];
        }
        
        let maxAvg = windowSum / k;
        
        // Slide the window
        for (let i = k; i < nums.length; i++) {
            windowSum = windowSum - nums[i - k] + nums[i];
            const currentAvg = windowSum / k;
            maxAvg = Math.max(maxAvg, currentAvg);
        }
        
        return maxAvg;
    }
    
    // Alternative approach using two pointers
    findMaxAverageTwoPointers(nums, k) {
        if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
            return 0.0;
        }
        
        let left = 0;
        let right = 0;
        let windowSum = 0;
        let maxAvg = Number.MIN_SAFE_INTEGER;
        
        while (right < nums.length) {
            windowSum += nums[right];
            
            // When window size reaches k
            if (right - left + 1 === k) {
                const currentAvg = windowSum / k;
                maxAvg = Math.max(maxAvg, currentAvg);
                windowSum -= nums[left];
                left++;
            }
            
            right++;
        }
        
        return maxAvg;
    }
    
    // Alternative approach using prefix sum (for educational purposes)
    findMaxAveragePrefixSum(nums, k) {
        if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
            return 0.0;
        }
        
        // Calculate prefix sum
        const prefixSum = new Array(nums.length + 1).fill(0);
        for (let i = 0; i < nums.length; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }
        
        let maxAvg = Number.MIN_SAFE_INTEGER;
        
        // Find maximum average using prefix sum
        for (let i = k; i <= nums.length; i++) {
            const sum = prefixSum[i] - prefixSum[i - k];
            const avg = sum / k;
            maxAvg = Math.max(maxAvg, avg);
        }
        
        return maxAvg;
    }
    
    // Alternative approach optimized for large numbers
    findMaxAverageOptimized(nums, k) {
        if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
            return 0.0;
        }
        
        // Use BigInt to avoid integer overflow for large sums
        let windowSum = 0n;
        
        // Calculate sum of first window
        for (let i = 0; i < k; i++) {
            windowSum += BigInt(nums[i]);
        }
        
        let maxAvg = Number(windowSum) / k;
        
        // Slide the window
        for (let i = k; i < nums.length; i++) {
            windowSum = windowSum - BigInt(nums[i - k]) + BigInt(nums[i]);
            const currentAvg = Number(windowSum) / k;
            maxAvg = Math.max(maxAvg, currentAvg);
        }
        
        return maxAvg;
    }
    
    // Alternative approach using reduce for functional programming style
    findMaxAverageFunctional(nums, k) {
        if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
            return 0.0;
        }
        
        // Calculate sum of first window
        let windowSum = nums.slice(0, k).reduce((sum, num) => sum + num, 0);
        let maxAvg = windowSum / k;
        
        // Slide the window
        for (let i = k; i < nums.length; i++) {
            windowSum = windowSum - nums[i - k] + nums[i];
            const currentAvg = windowSum / k;
            maxAvg = Math.max(maxAvg, currentAvg);
        }
        
        return maxAvg;
    }
    
    // Alternative approach using array methods
    findMaxAverageWithArrayMethods(nums, k) {
        if (!nums || nums.length === 0 || k <= 0 || k > nums.length) {
            return 0.0;
        }
        
        let maxAvg = Number.MIN_SAFE_INTEGER;
        
        // Check each possible window
        for (let i = 0; i <= nums.length - k; i++) {
            const window = nums.slice(i, i + k);
            const avg = window.reduce((sum, num) => sum + num, 0) / k;
            maxAvg = Math.max(maxAvg, avg);
        }
        
        return maxAvg;
    }
}

// Test function
function runTests() {
    const solution = new FindMaxAverage();
    
    // Test Case 1
    console.log("Test Case 1:");
    const nums1 = [1, 12, -5, -6, 50, 3];
    const k1 = 4;
    const result1 = solution.findMaxAverage(nums1, k1);
    console.log(`Input: nums = [${nums1}], k = ${k1}`);
    console.log(`Output: ${result1}`);
    console.log("Expected: 12.75");
    console.log();
    
    // Test Case 2
    console.log("Test Case 2:");
    const nums2 = [5];
    const k2 = 1;
    const result2 = solution.findMaxAverage(nums2, k2);
    console.log(`Input: nums = [${nums2}], k = ${k2}`);
    console.log(`Output: ${result2}`);
    console.log("Expected: 5.0");
    console.log();
    
    // Test Case 3
    console.log("Test Case 3:");
    const nums3 = [0, 1, 1, 3, 3];
    const k3 = 4;
    const result3 = solution.findMaxAverage(nums3, k3);
    console.log(`Input: nums = [${nums3}], k = ${k3}`);
    console.log(`Output: ${result3}`);
    console.log("Expected: 2.0");
    console.log();
    
    // Test Case 4 - All negative numbers
    console.log("Test Case 4:");
    const nums4 = [-1, -2, -3, -4, -5];
    const k4 = 3;
    const result4 = solution.findMaxAverage(nums4, k4);
    console.log(`Input: nums = [${nums4}], k = ${k4}`);
    console.log(`Output: ${result4}`);
    console.log("Expected: -2.0");
    console.log();
    
    // Test Case 5 - k equals array length
    console.log("Test Case 5:");
    const nums5 = [1, 2, 3, 4, 5];
    const k5 = 5;
    const result5 = solution.findMaxAverage(nums5, k5);
    console.log(`Input: nums = [${nums5}], k = ${k5}`);
    console.log(`Output: ${result5}`);
    console.log("Expected: 3.0");
    console.log();
    
    // Test Case 6 - Large numbers
    console.log("Test Case 6:");
    const nums6 = [1000000, 2000000, 3000000, 4000000];
    const k6 = 2;
    const result6 = solution.findMaxAverage(nums6, k6);
    console.log(`Input: nums = [${nums6}], k = ${k6}`);
    console.log(`Output: ${result6}`);
    console.log("Expected: 3500000.0");
    console.log();
    
    // Test Case 7 - Mixed positive and negative
    console.log("Test Case 7:");
    const nums7 = [-1, 5, -3, 10, -2, 8];
    const k7 = 3;
    const result7 = solution.findMaxAverage(nums7, k7);
    console.log(`Input: nums = [${nums7}], k = ${k7}`);
    console.log(`Output: ${result7}`);
    console.log("Expected: 4.0");
    console.log();
    
    // Test Case 8 - All same numbers
    console.log("Test Case 8:");
    const nums8 = [3, 3, 3, 3, 3];
    const k8 = 3;
    const result8 = solution.findMaxAverage(nums8, k8);
    console.log(`Input: nums = [${nums8}], k = ${k8}`);
    console.log(`Output: ${result8}`);
    console.log("Expected: 3.0");
    console.log();
    
    // Test Case 9 - Very large numbers
    console.log("Test Case 9:");
    const nums9 = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
    const k9 = 2;
    const result9 = solution.findMaxAverageOptimized(nums9, k9);
    console.log(`Input: nums = [${nums9}], k = ${k9}`);
    console.log(`Output: ${result9}`);
    console.log("Expected: Number.MAX_SAFE_INTEGER");
    console.log();
    
    // Performance comparison
    console.log("Performance Comparison:");
    const largeNums = Array.from({length: 100000}, () => Math.floor(Math.random() * 10000) - 5000);
    const largeK = 1000;
    
    let startTime = performance.now();
    const result10 = solution.findMaxAverage(largeNums, largeK);
    let endTime = performance.now();
    console.log(`Basic approach time: ${(endTime - startTime).toFixed(2)}ms, Result: ${result10}`);
    
    startTime = performance.now();
    const result11 = solution.findMaxAverageSlidingWindow(largeNums, largeK);
    endTime = performance.now();
    console.log(`Sliding window approach time: ${(endTime - startTime).toFixed(2)}ms, Result: ${result11}`);
    
    startTime = performance.now();
    const result12 = solution.findMaxAverageTwoPointers(largeNums, largeK);
    endTime = performance.now();
    console.log(`Two pointers approach time: ${(endTime - startTime).toFixed(2)}ms, Result: ${result12}`);
    
    startTime = performance.now();
    const result13 = solution.findMaxAveragePrefixSum(largeNums, largeK);
    endTime = performance.now();
    console.log(`Prefix sum approach time: ${(endTime - startTime).toFixed(2)}ms, Result: ${result13}`);
    
    startTime = performance.now();
    const result14 = solution.findMaxAverageOptimized(largeNums, largeK);
    endTime = performance.now();
    console.log(`Optimized approach time: ${(endTime - startTime).toFixed(2)}ms, Result: ${result14}`);
    
    startTime = performance.now();
    const result15 = solution.findMaxAverageFunctional(largeNums, largeK);
    endTime = performance.now();
    console.log(`Functional approach time: ${(endTime - startTime).toFixed(2)}ms, Result: ${result15}`);
    
    startTime = performance.now();
    const result16 = solution.findMaxAverageWithArrayMethods(largeNums, largeK);
    endTime = performance.now();
    console.log(`Array methods approach time: ${(endTime - startTime).toFixed(2)}ms, Result: ${result16}`);
    
    // Verify all approaches give same result (within precision)
    console.log("\nVerification:");
    const results = [result10, result11, result12, result13, result14, result15, result16];
    const allSame = results.every((result, index) => 
        index === 0 || Math.abs(result - results[0]) < 1e-10
    );
    console.log("All approaches give same result: " + allSame);
    
    // Test edge cases
    console.log("\nEdge Cases:");
    
    // Empty array
    console.log("Empty array: " + solution.findMaxAverage([], 1));
    
    // Null/undefined
    console.log("Null array: " + solution.findMaxAverage(null, 1));
    console.log("Undefined array: " + solution.findMaxAverage(undefined, 1));
    
    // k larger than array length
    console.log("k larger than array length: " + solution.findMaxAverage([1, 2, 3], 5));
    
    // k = 0
    console.log("k = 0: " + solution.findMaxAverage([1, 2, 3], 0));
    
    // k negative
    console.log("k negative: " + solution.findMaxAverage([1, 2, 3], -1));
    
    // Very large k
    console.log("Very large k: " + solution.findMaxAverage([1, 2, 3], 1000000));
    
    // Test with floating point precision
    console.log("\nFloating Point Precision Test:");
    const precisionNums = [1.5, 2.5, 3.5, 4.5];
    const precisionK = 2;
    const precisionResult = solution.findMaxAverage(precisionNums, precisionK);
    console.log(`Input: nums = [${precisionNums}], k = ${precisionK}`);
    console.log(`Output: ${precisionResult}`);
    console.log("Expected: 3.0");
}

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runTests();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FindMaxAverage;
} 