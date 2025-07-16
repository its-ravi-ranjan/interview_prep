/**
 * Maximum Consecutive Ones
 * 
 * Problem:
 * Given a binary array nums, return the maximum number of consecutive 1's in the array.
 * 
 * Example:
 * Input: nums = [1,1,0,1,1,1]
 * Output: 3
 * Explanation: The first two digits or the last three digits are consecutive 1s.
 * The maximum number of consecutive 1s is 3.
 * 
 * Optimal Approach – Single Pass:
 * 1. Initialize two variables:
 *    - currentCount → to count current streak of 1s
 *    - maxCount → to keep track of the maximum streak seen so far
 * 
 * 2. Traverse the array:
 *    - If nums[i] == 1, increment currentCount
 *    - If nums[i] == 0, compare currentCount with maxCount, update maxCount,
 *      then reset currentCount to 0
 * 
 * 3. After the loop, return the maximum of maxCount and currentCount
 *    (to handle case where array ends in 1s)
 * 
 * Time Complexity: O(n) → One pass through the array of n elements
 * Space Complexity: O(1) → No extra space used beyond a few variables
 * 
 * @param {number[]} nums - Binary array containing only 0s and 1s
 * @return {number} Maximum number of consecutive 1's
 */

// Optimal Solution - Single Pass
// Time: O(n), Space: O(1)
function findMaxConsecutiveOnes(nums) {
    // Step 1: Initialize counters
    let currentCount = 0;  // Count of current streak of 1s
    let maxCount = 0;      // Maximum streak of 1s seen so far
    
    // Step 2: Traverse the array
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            // Increment current streak
            currentCount++;
        } else {
            // Update max streak and reset current streak
            maxCount = Math.max(currentCount, maxCount);
            currentCount = 0;
        }
    }
    
    // Step 3: Return maximum of maxCount and currentCount
    // (to handle case where array ends in 1s)
    return Math.max(maxCount, currentCount);
}

// Alternative Solution - Using reduce
// Time: O(n), Space: O(1)
function findMaxConsecutiveOnesReduce(nums) {
    return nums.reduce((acc, curr) => {
        if (curr === 1) {
            acc.current++;
            acc.max = Math.max(acc.current, acc.max);
        } else {
            acc.current = 0;
        }
        return acc;
    }, { current: 0, max: 0 }).max;
}

// Test cases
function testMaxConsecutiveOnes() {
    // Test case 1: Basic case
    let nums1 = [1, 1, 0, 1, 1, 1];
    console.log("Test 1:", findMaxConsecutiveOnes(nums1));  // Expected: 3
    
    // Test case 2: All ones
    let nums2 = [1, 1, 1, 1];
    console.log("Test 2:", findMaxConsecutiveOnes(nums2));  // Expected: 4
    
    // Test case 3: All zeros
    let nums3 = [0, 0, 0, 0];
    console.log("Test 3:", findMaxConsecutiveOnes(nums3));  // Expected: 0
    
    // Test case 4: Single element
    let nums4 = [1];
    console.log("Test 4:", findMaxConsecutiveOnes(nums4));  // Expected: 1
    
    // Test case 5: Empty array
    let nums5 = [];
    console.log("Test 5:", findMaxConsecutiveOnes(nums5));  // Expected: 0
    
    // Test case 6: Alternating ones and zeros
    let nums6 = [1, 0, 1, 0, 1];
    console.log("Test 6:", findMaxConsecutiveOnes(nums6));  // Expected: 1
    
    // Test case 7: Ones at the end
    let nums7 = [0, 0, 1, 1, 1];
    console.log("Test 7:", findMaxConsecutiveOnes(nums7));  // Expected: 3
    
    // Test case 8: Ones at the beginning
    let nums8 = [1, 1, 1, 0, 0];
    console.log("Test 8:", findMaxConsecutiveOnes(nums8));  // Expected: 3
    
    // Test reduce solution
    console.log("\nTesting reduce solution:");
    console.log("Test 1 (reduce):", findMaxConsecutiveOnesReduce(nums1));  // Expected: 3
    console.log("Test 2 (reduce):", findMaxConsecutiveOnesReduce(nums2));  // Expected: 4
}

// Run tests
testMaxConsecutiveOnes(); 