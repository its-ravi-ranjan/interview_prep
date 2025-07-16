/**
 * Find Pivot Index
 * 
 * Problem:
 * Given an array of integers nums, calculate the pivot index of this array.
 * The pivot index is the index where the sum of all numbers to the left equals
 * the sum of all numbers to the right. If no such index exists, return -1.
 * 
 * Example:
 * Input: nums = [1,7,3,6,5,6]
 * Output: 3
 * Explanation:
 * The pivot index is 3.
 * Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
 * Right sum = nums[4] + nums[5] = 5 + 6 = 11
 * 
 * Approach:
 * 1. Calculate total sum of array
 * 2. For each index:
 *    - Subtract current number from right sum
 *    - Compare left sum with right sum
 *    - If equal, return current index
 *    - Add current number to left sum
 * 3. Return -1 if no pivot index found
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n) - two passes through the array
 * Space Complexity: O(1) - constant space used
 */

/**
 * Finds the pivot index of an array
 * @param {number[]} nums - Input array
 * @return {number} Pivot index or -1 if not found
 */
function pivotIndex(nums) {
    let leftSum = 0;
    let rightSum = 0;
    
    // Calculate total sum (right sum initially)
    for (let i = 0; i < nums.length; i++) {
        rightSum += nums[i];
    }
    
    // Find pivot index
    for (let i = 0; i < nums.length; i++) {
        // Subtract current number from right sum
        rightSum -= nums[i];
        
        // Add previous number to left sum (except for first index)
        if (i !== 0) {
            leftSum += nums[i - 1];
        }
        
        // Check if sums are equal
        if (leftSum === rightSum) {
            return i;
        }
    }
    
    return -1;
}

// Test cases
function testPivotIndex() {
    // Test case 1: Example case
    const nums1 = [1, 7, 3, 6, 5, 6];
    console.log("Test case 1:");
    console.log("Input:", nums1);
    console.log("Output:", pivotIndex(nums1));  // Expected: 3
    console.log("Explanation: Left sum (1+7+3) = Right sum (5+6) = 11\n");
    
    // Test case 2: No pivot index
    const nums2 = [1, 2, 3];
    console.log("Test case 2:");
    console.log("Input:", nums2);
    console.log("Output:", pivotIndex(nums2));  // Expected: -1
    console.log("Explanation: No index where left sum equals right sum\n");
    
    // Test case 3: Pivot at first index
    const nums3 = [2, 1, -1];
    console.log("Test case 3:");
    console.log("Input:", nums3);
    console.log("Output:", pivotIndex(nums3));  // Expected: 0
    console.log("Explanation: Left sum (0) = Right sum (1+(-1)) = 0\n");
    
    // Test case 4: Pivot at last index
    const nums4 = [-1, -1, -1, -1, 0, 1];
    console.log("Test case 4:");
    console.log("Input:", nums4);
    console.log("Output:", pivotIndex(nums4));  // Expected: 5
    console.log("Explanation: Left sum (-1-1-1-1+0) = Right sum (0) = -4\n");
    
    // Test case 5: Single element
    const nums5 = [0];
    console.log("Test case 5:");
    console.log("Input:", nums5);
    console.log("Output:", pivotIndex(nums5));  // Expected: 0
    console.log("Explanation: Left sum (0) = Right sum (0) = 0\n");
    
    // Test case 6: Empty array
    const nums6 = [];
    console.log("Test case 6:");
    console.log("Input:", nums6);
    console.log("Output:", pivotIndex(nums6));  // Expected: -1
    console.log("Explanation: Empty array has no pivot index\n");
    
    // Test case 7: All zeros
    const nums7 = [0, 0, 0, 0, 0];
    console.log("Test case 7:");
    console.log("Input:", nums7);
    console.log("Output:", pivotIndex(nums7));  // Expected: 0
    console.log("Explanation: First index is pivot as left sum (0) = right sum (0)\n");
}

// Run tests
testPivotIndex(); 