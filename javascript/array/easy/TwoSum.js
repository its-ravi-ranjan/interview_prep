/**
 * Two Sum
 * 
 * Problem:
 * Given an array of integers nums and an integer target, return the indices
 * of the two numbers such that they add up to target. You may assume that
 * each input would have exactly one solution, and you may not use the same
 * element twice. You can return the answer in any order.
 * 
 * Example:
 * Input: nums = [2, 7, 11, 15], target = 9
 * Output: [0, 1]
 * Explanation: nums[0] + nums[1] = 2 + 7 = 9
 * 
 * Approach 1 - Hash Map (Best for Unsorted Array):
 * 1. Create a hash map to store numbers and their indices
 * 2. For each number, calculate the difference (target - current number)
 * 3. If difference exists in map, return the indices
 * 4. Otherwise, add current number and its index to map
 * 
 * Approach 2 - Two Pointers (If Array is Sorted):
 * 1. Use two pointers: left (start) and right (end)
 * 2. Calculate sum of elements at left and right pointers
 * 3. If sum equals target, return indices
 * 4. If sum < target, move left pointer right
 * 5. If sum > target, move right pointer left
 * 
 * Dry Run - Hash Map Approach (on [2, 7, 11, 15], target = 9):
 * Initial: map = {}
 * 
 * Step 1: i = 0, num = 2
 *   diff = 9 - 2 = 7
 *   map.has(7) = false
 *   map.set(2, 0) → map = {2: 0}
 * 
 * Step 2: i = 1, num = 7
 *   diff = 9 - 7 = 2
 *   map.has(2) = true, map.get(2) = 0
 *   Return [0, 1] ✓
 * 
 * Dry Run - Two Pointers Approach (on [2, 7, 11, 15], target = 9):
 * Initial: left = 0, right = 3
 * 
 * Step 1: left = 0, right = 3
 *   sum = arr[0] + arr[3] = 2 + 15 = 17
 *   17 > 9, so right--
 * 
 * Step 2: left = 0, right = 2
 *   sum = arr[0] + arr[2] = 2 + 11 = 13
 *   13 > 9, so right--
 * 
 * Step 3: left = 0, right = 1
 *   sum = arr[0] + arr[1] = 2 + 7 = 9
 *   9 = 9, return [0, 1] ✓
 * 
 * Time & Space Complexity:
 * Hash Map Approach:
 *   Time Complexity: O(n) - single pass through the array
 *   Space Complexity: O(n) - hash map storage
 * 
 * Two Pointers Approach:
 *   Time Complexity: O(n) - single pass through the array
 *   Space Complexity: O(1) - constant space used
 */

/**
 * Finds two numbers that add up to target using Hash Map approach
 * @param {number[]} nums - Input array
 * @param {number} target - Target sum
 * @return {number[]} Indices of two numbers that add up to target
 */
function twoSumHashMap(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        
        if (map.has(diff)) {
            return [map.get(diff), i];
        }
        
        map.set(nums[i], i);
    }
    
    return []; // No solution found
}

/**
 * Finds two numbers that add up to target using Two Pointers approach
 * Note: This approach requires the array to be sorted
 * @param {number[]} nums - Input array (must be sorted)
 * @param {number} target - Target sum
 * @return {number[]} Indices of two numbers that add up to target
 */
function twoSumTwoPointers(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const sum = nums[left] + nums[right];
        
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return []; // No solution found
}

/**
 * Finds two numbers that add up to target with duplicate handling
 * @param {number[]} nums - Input array
 * @param {number} target - Target sum
 * @return {number[]} Indices of two numbers that add up to target
 */
function twoSumWithDuplicates(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        
        if (map.has(diff) && map.get(diff) !== i) {
            return [map.get(diff), i];
        }
        
        map.set(nums[i], i);
    }
    
    return []; // No solution found
}

/**
 * Finds all pairs that add up to target
 * @param {number[]} nums - Input array
 * @param {number} target - Target sum
 * @return {number[][]} All pairs of indices that add up to target
 */
function findAllTwoSumPairs(nums, target) {
    const map = new Map();
    const result = [];
    
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        
        if (map.has(diff)) {
            result.push([map.get(diff), i]);
        }
        
        map.set(nums[i], i);
    }
    
    return result;
}

// Test cases
function testTwoSum() {
    // Test case 1: Basic case - Hash Map
    const nums1 = [2, 7, 11, 15];
    const target1 = 9;
    console.log("Test case 1 - Hash Map:");
    console.log("Input: nums =", nums1, ", target =", target1);
    console.log("Output:", twoSumHashMap(nums1, target1));  // Expected: [0, 1]
    console.log("Explanation: nums[0] + nums[1] = 2 + 7 = 9\n");
    
    // Test case 2: Two Pointers (sorted array)
    const nums2 = [2, 7, 11, 15];
    const target2 = 9;
    console.log("Test case 2 - Two Pointers:");
    console.log("Input: nums =", nums2, ", target =", target2);
    console.log("Output:", twoSumTwoPointers(nums2, target2));  // Expected: [0, 1]
    console.log("Explanation: Using two pointers on sorted array\n");
    
    // Test case 3: No solution
    const nums3 = [1, 2, 3, 4];
    const target3 = 10;
    console.log("Test case 3 - No Solution:");
    console.log("Input: nums =", nums3, ", target =", target3);
    console.log("Output:", twoSumHashMap(nums3, target3));  // Expected: []
    console.log("Explanation: No two numbers add up to 10\n");
    
    // Test case 4: Duplicate elements
    const nums4 = [3, 2, 4, 3];
    const target4 = 6;
    console.log("Test case 4 - With Duplicates:");
    console.log("Input: nums =", nums4, ", target =", target4);
    console.log("Output:", twoSumWithDuplicates(nums4, target4));  // Expected: [1, 2]
    console.log("Explanation: nums[1] + nums[2] = 2 + 4 = 6\n");
    
    // Test case 5: Multiple pairs
    const nums5 = [1, 5, 3, 3, 5, 1];
    const target5 = 6;
    console.log("Test case 5 - Multiple Pairs:");
    console.log("Input: nums =", nums5, ", target =", target5);
    console.log("All pairs:", findAllTwoSumPairs(nums5, target5));  // Expected: [[0,1], [2,3], [4,5]]
    console.log("Explanation: Multiple pairs add up to 6\n");
    
    // Test case 6: Large numbers
    const nums6 = [1000000, 2000000, 3000000, 4000000];
    const target6 = 3000000;
    console.log("Test case 6 - Large Numbers:");
    console.log("Input: nums =", nums6, ", target =", target6);
    console.log("Output:", twoSumHashMap(nums6, target6));  // Expected: [0, 1]
    console.log("Explanation: nums[0] + nums[1] = 1000000 + 2000000 = 3000000\n");
    
    // Test case 7: Negative numbers
    const nums7 = [-1, -2, -3, -4, -5];
    const target7 = -8;
    console.log("Test case 7 - Negative Numbers:");
    console.log("Input: nums =", nums7, ", target =", target7);
    console.log("Output:", twoSumHashMap(nums7, target7));  // Expected: [2, 4]
    console.log("Explanation: nums[2] + nums[4] = -3 + (-5) = -8\n");
    
    // Performance comparison
    console.log("Performance Comparison:");
    const largeArray = Array.from({length: 100000}, (_, i) => i);
    const largeTarget = 199998;
    
    const startTime1 = performance.now();
    twoSumHashMap(largeArray, largeTarget);
    const endTime1 = performance.now();
    console.log(`Hash Map time: ${(endTime1 - startTime1).toFixed(2)}ms`);
    
    const startTime2 = performance.now();
    twoSumTwoPointers(largeArray, largeTarget);
    const endTime2 = performance.now();
    console.log(`Two Pointers time: ${(endTime2 - startTime2).toFixed(2)}ms`);
    console.log("Explanation: Both approaches are O(n) but Hash Map uses more space\n");
}

// Run tests
testTwoSum(); 