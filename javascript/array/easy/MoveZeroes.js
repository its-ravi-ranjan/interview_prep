/**
 * Move Zeroes
 * 
 * Problem:
 * Given an integer array nums, move all 0's to the end of it while maintaining
 * the relative order of the non-zero elements.
 * 
 * Note: You must do this in-place without making a copy of the array.
 * 
 * Approach – Two Pointers:
 * 1. Initialize a pointer x = 0
 * 2. Loop through the array:
 *    - If the current element is not 0, assign it to nums[x] and increment x
 * 3. After the loop, from index x to the end of the array, fill all values with 0
 * 
 * Time Complexity: O(n), where n is the length of the array
 * Space Complexity: O(1), as we modify the array in-place
 * 
 * @param {number[]} nums - The input array
 * @return {void} Do not return anything, modify nums in-place instead.
 */

// Optimal Solution - Two Pointers
// Time: O(n), Space: O(1)
function moveZeroes(nums) {
    // Step 1: Initialize pointer x for placing non-zero elements
    let x = 0;
    
    // Step 2: First pass - Move all non-zero elements to the front
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            // Place non-zero element at position x and increment x
            nums[x] = nums[i];
            x++;
        }
    }
    
    // Step 3: Second pass - Fill remaining positions with zeros
    for (let i = x; i < nums.length; i++) {
        nums[i] = 0;
    }
}

// Alternative Solution - Using Swap
// Time: O(n), Space: O(1)
function moveZeroesWithSwap(nums) {
    let lastNonZeroFoundAt = 0;
    
    // Move all non-zero elements to the front
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            // Swap elements
            [nums[lastNonZeroFoundAt], nums[i]] = [nums[i], nums[lastNonZeroFoundAt]];
            lastNonZeroFoundAt++;
        }
    }
}

// Test cases
function testMoveZeroes() {
    // Test case 1
    let nums1 = [0, 1, 0, 3, 12];
    moveZeroes(nums1);
    console.log("Test 1:", nums1);  // Expected: [1, 3, 12, 0, 0]
    
    // Test case 2
    let nums2 = [0];
    moveZeroes(nums2);
    console.log("Test 2:", nums2);  // Expected: [0]
    
    // Test case 3
    let nums3 = [1, 0, 0, 0, 1];
    moveZeroes(nums3);
    console.log("Test 3:", nums3);  // Expected: [1, 1, 0, 0, 0]
    
    // Test case 4
    let nums4 = [1, 2, 3, 4, 5];
    moveZeroes(nums4);
    console.log("Test 4:", nums4);  // Expected: [1, 2, 3, 4, 5]
    
    // Test case 5
    let nums5 = [0, 0, 0, 0, 0];
    moveZeroes(nums5);
    console.log("Test 5:", nums5);  // Expected: [0, 0, 0, 0, 0]
    
    // Test swap solution
    console.log("\nTesting swap solution:");
    let nums6 = [0, 1, 0, 3, 12];
    moveZeroesWithSwap(nums6);
    console.log("Swap Solution:", nums6);  // Expected: [1, 3, 12, 0, 0]
}

// Run tests
testMoveZeroes(); 