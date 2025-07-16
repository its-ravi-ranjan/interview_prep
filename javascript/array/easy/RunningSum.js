/**
 * Running Sum of 1d Array
 * 
 * Problem:
 * Given an array nums, return the running sum of the array where runningSum[i] = sum(nums[0]…nums[i]).
 * 
 * Example:
 * Input: nums = [1,2,3,4]
 * Output: [1,3,6,10]
 * Explanation: Running sum is obtained as follows: [1, 1+2, 1+2+3, 1+2+3+4].
 * 
 * Approach:
 * 1. Initialize a sum variable to keep track of the running sum
 * 2. Iterate through the array
 * 3. For each element, add it to the sum and update the current position
 * 4. Return the modified array
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n) - single pass through the array
 * Space Complexity: O(1) - in-place modification of the array
 */

/**
 * Calculates the running sum of an array
 * @param {number[]} nums - Input array
 * @return {number[]} Array containing running sums
 */
function runningSum(nums) {
    let sum = 0;
    
    // Iterate through the array
    for (let i = 0; i < nums.length; i++) {
        // Add current number to sum
        sum += nums[i];
        // Update current position with running sum
        nums[i] = sum;
    }
    
    return nums;
}

// Test cases
function testRunningSum() {
    // Test case 1: Example case
    const nums1 = [1, 2, 3, 4];
    console.log("Test case 1:");
    console.log("Input:", nums1);
    console.log("Output:", runningSum([...nums1]));  // Expected: [1, 3, 6, 10]
    console.log("Explanation: Running sum is obtained as follows: [1, 1+2, 1+2+3, 1+2+3+4]\n");
    
    // Test case 2: Array with negative numbers
    const nums2 = [1, -2, 3, -4, 5];
    console.log("Test case 2:");
    console.log("Input:", nums2);
    console.log("Output:", runningSum([...nums2]));  // Expected: [1, -1, 2, -2, 3]
    console.log("Explanation: Running sum with negative numbers\n");
    
    // Test case 3: Single element array
    const nums3 = [5];
    console.log("Test case 3:");
    console.log("Input:", nums3);
    console.log("Output:", runningSum([...nums3]));  // Expected: [5]
    console.log("Explanation: Single element array, running sum is the element itself\n");
    
    // Test case 4: Array with zeros
    const nums4 = [0, 0, 0, 0];
    console.log("Test case 4:");
    console.log("Input:", nums4);
    console.log("Output:", runningSum([...nums4]));  // Expected: [0, 0, 0, 0]
    console.log("Explanation: Array with all zeros, running sum remains zero\n");
    
    // Test case 5: Empty array
    const nums5 = [];
    console.log("Test case 5:");
    console.log("Input:", nums5);
    console.log("Output:", runningSum([...nums5]));  // Expected: []
    console.log("Explanation: Empty array, no running sum to calculate\n");
    
    // Test case 6: Large numbers
    const nums6 = [1000, 2000, 3000, 4000];
    console.log("Test case 6:");
    console.log("Input:", nums6);
    console.log("Output:", runningSum([...nums6]));  // Expected: [1000, 3000, 6000, 10000]
    console.log("Explanation: Running sum with large numbers\n");
}

// Run tests
testRunningSum(); 