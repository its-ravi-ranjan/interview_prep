/**
 * Missing Number
 * 
 * Problem:
 * Given an array nums containing n distinct numbers in the range [0, n],
 * return the only number in the range that is missing from the array.
 * 
 * Example:
 * Input: nums = [3,0,1]
 * Output: 2
 * Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3].
 * 2 is the missing number since it does not appear in nums.
 * 
 * Approaches:
 * 1. Brute-force with Sorting:
 *    - Sort the array
 *    - Check for gaps between consecutive numbers
 *    - Handle edge cases (missing 0 or n)
 *    Time Complexity: O(n log n) - Due to sorting
 *    Space Complexity: O(1) - In-place sorting
 * 
 * 2. Optimal using Sum Formula:
 *    - Calculate expected sum using formula: n * (n + 1) / 2
 *    - Calculate actual sum of array elements
 *    - Missing number = expected sum - actual sum
 *    Time Complexity: O(n) - Single pass through array
 *    Space Complexity: O(1) - Constant extra space
 */

/**
 * Brute-force Solution using Sorting
 * Time: O(n log n), Space: O(1)
 * 
 * @param {number[]} nums - Array of distinct numbers in range [0, n]
 * @return {number} The missing number
 */
function missingNumberBruteForce(nums) {
    // Step 1: Sort the array
    nums.sort((a, b) => a - b);
    
    // Step 2: Check if 0 is missing
    if (nums[0] !== 0) return 0;
    
    // Step 3: Check for gaps between consecutive numbers
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1] + 1) {
            return nums[i - 1] + 1;
        }
    }
    
    // Step 4: If no gap found, n is missing
    return nums.length;
}

/**
 * Optimal Solution using Sum Formula
 * Time: O(n), Space: O(1)
 * 
 * @param {number[]} nums - Array of distinct numbers in range [0, n]
 * @return {number} The missing number
 */
function missingNumber(nums) {
    // Step 1: Calculate expected sum using formula
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    
    // Step 2: Calculate actual sum of array elements
    const actualSum = nums.reduce((sum, num) => sum + num, 0);
    
    // Step 3: Return the difference
    return expectedSum - actualSum;
}

// Test cases
function testMissingNumber() {
    // Test case 1: Basic case
    let nums1 = [3, 0, 1];
    console.log("Test 1 (Optimal):", missingNumber(nums1));  // Expected: 2
    console.log("Test 1 (Brute):", missingNumberBruteForce(nums1));  // Expected: 2
    
    // Test case 2: Missing 0
    let nums2 = [1, 2, 3];
    console.log("Test 2 (Optimal):", missingNumber(nums2));  // Expected: 0
    console.log("Test 2 (Brute):", missingNumberBruteForce(nums2));  // Expected: 0
    
    // Test case 3: Missing last number
    let nums3 = [0, 1, 2];
    console.log("Test 3 (Optimal):", missingNumber(nums3));  // Expected: 3
    console.log("Test 3 (Brute):", missingNumberBruteForce(nums3));  // Expected: 3
    
    // Test case 4: Single element
    let nums4 = [0];
    console.log("Test 4 (Optimal):", missingNumber(nums4));  // Expected: 1
    console.log("Test 4 (Brute):", missingNumberBruteForce(nums4));  // Expected: 1
    
    // Test case 5: Empty array
    let nums5 = [];
    console.log("Test 5 (Optimal):", missingNumber(nums5));  // Expected: 0
    console.log("Test 5 (Brute):", missingNumberBruteForce(nums5));  // Expected: 0
    
    // Performance comparison
    console.log("\nPerformance comparison with large array:");
    const largeArray = Array.from({length: 1000000}, (_, i) => i);
    // Remove a random number
    const randomIndex = Math.floor(Math.random() * largeArray.length);
    largeArray.splice(randomIndex, 1);
    
    // Test optimal solution
    console.time('Optimal Solution');
    missingNumber(largeArray);
    console.timeEnd('Optimal Solution');
    
    // Test brute force solution
    console.time('Brute Force Solution');
    missingNumberBruteForce(largeArray);
    console.timeEnd('Brute Force Solution');
}

// Run tests
testMissingNumber(); 