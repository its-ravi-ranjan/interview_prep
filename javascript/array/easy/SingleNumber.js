/**
 * Single Number
 * 
 * Problem:
 * Given a non-empty array of integers nums, every element appears twice except for one.
 * Find that single one.
 * 
 * Example:
 * Input: nums = [2,2,1]
 * Output: 1
 * 
 * Input: nums = [4,1,2,1,2]
 * Output: 4
 * 
 * Approaches:
 * 1. Hash Map Approach:
 *    - Create a hash map to store counts of each element
 *    - First pass: Count occurrences of each number
 *    - Second pass: Find the number with count 1
 *    Time Complexity: O(n) - Two passes through array
 *    Space Complexity: O(n) - Hash map stores counts
 * 
 * 2. XOR Approach (Optimal):
 *    - Use XOR properties:
 *      a ^ a = 0 (XOR of same numbers is 0)
 *      a ^ 0 = a (XOR with 0 is the number itself)
 *    - XOR all numbers together
 *    - Result is the single number
 *    Time Complexity: O(n) - Single pass through array
 *    Space Complexity: O(1) - Constant extra space
 */

/**
 * Hash Map Solution
 * Time: O(n), Space: O(n)
 * 
 * @param {number[]} nums - Array of integers where all but one appear twice
 * @return {number} The single number
 */
function singleNumberHashMap(nums) {
    // Step 1: Create hash map to store counts
    const countMap = new Map();
    
    // Step 2: Count occurrences of each number
    for (const num of nums) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
    }
    
    // Step 3: Find the number with count 1
    for (const [num, count] of countMap) {
        if (count === 1) {
            return num;
        }
    }
    
    // This line should never be reached if input is valid
    return -1;
}

/**
 * Optimal Solution using XOR
 * Time: O(n), Space: O(1)
 * 
 * @param {number[]} nums - Array of integers where all but one appear twice
 * @return {number} The single number
 */
function singleNumber(nums) {
    // Step 1: Initialize result with 0
    let result = 0;
    
    // Step 2: XOR all numbers together
    for (const num of nums) {
        result ^= num;
    }
    
    // Step 3: Return the result
    return result;
}

// Test cases
function testSingleNumber() {
    // Test case 1: Basic case
    let nums1 = [2, 2, 1];
    console.log("Test 1 (XOR):", singleNumber(nums1));  // Expected: 1
    console.log("Test 1 (HashMap):", singleNumberHashMap(nums1));  // Expected: 1
    
    // Test case 2: Single element
    let nums2 = [1];
    console.log("Test 2 (XOR):", singleNumber(nums2));  // Expected: 1
    console.log("Test 2 (HashMap):", singleNumberHashMap(nums2));  // Expected: 1
    
    // Test case 3: Multiple pairs
    let nums3 = [4, 1, 2, 1, 2];
    console.log("Test 3 (XOR):", singleNumber(nums3));  // Expected: 4
    console.log("Test 3 (HashMap):", singleNumberHashMap(nums3));  // Expected: 4
    
    // Test case 4: Negative numbers
    let nums4 = [-1, -1, -2];
    console.log("Test 4 (XOR):", singleNumber(nums4));  // Expected: -2
    console.log("Test 4 (HashMap):", singleNumberHashMap(nums4));  // Expected: -2
    
    // Test case 5: Large numbers
    let nums5 = [1000000, 1000000, 1];
    console.log("Test 5 (XOR):", singleNumber(nums5));  // Expected: 1
    console.log("Test 5 (HashMap):", singleNumberHashMap(nums5));  // Expected: 1
    
    // Performance comparison
    console.log("\nPerformance comparison with large array:");
    const largeArray = [];
    // Create array with 1,000,000 pairs and one single number
    for (let i = 0; i < 500000; i++) {
        largeArray.push(i, i);
    }
    largeArray.push(1000000); // Add single number
    
    // Test XOR solution
    console.time('XOR Solution');
    singleNumber(largeArray);
    console.timeEnd('XOR Solution');
    
    // Test HashMap solution
    console.time('HashMap Solution');
    singleNumberHashMap(largeArray);
    console.timeEnd('HashMap Solution');
}

// Run tests
testSingleNumber(); 