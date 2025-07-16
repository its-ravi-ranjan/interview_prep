/**
 * Majority Element
 * 
 * Problem:
 * Given an array nums of size n, return the majority element.
 * The majority element is the element that appears more than ⌊n / 2⌋ times.
 * You may assume that the majority element always exists in the array.
 * 
 * Example 1:
 * Input: nums = [3,2,3]
 * Output: 3
 * 
 * Example 2:
 * Input: nums = [2,2,1,1,1,2,2]
 * Output: 2
 * 
 * Approach 1 - Hash Map:
 * 1. Create a hash map to count occurrences of each element
 * 2. Iterate through the array and count each element
 * 3. Find the element with count > n/2
 * 
 * Approach 2 - Boyer-Moore Majority Vote Algorithm:
 * 1. Initialize candidate and count
 * 2. For each element:
 *    - If count is 0, set current element as candidate
 *    - If current element equals candidate, increment count
 *    - If different, decrement count
 * 3. Return the candidate
 * 
 * Dry Run (Boyer-Moore on [2,2,1,1,1,2,2]):
 * Initial: majorElement = null, count = 0
 * 
 * Step 1: num = 2
 *   count = 0, so majorElement = 2, count = 1
 * 
 * Step 2: num = 2
 *   majorElement == 2, so count = 2
 * 
 * Step 3: num = 1
 *   majorElement != 1, so count = 1
 * 
 * Step 4: num = 1
 *   majorElement != 1, so count = 0
 * 
 * Step 5: num = 1
 *   count = 0, so majorElement = 1, count = 1
 * 
 * Step 6: num = 2
 *   majorElement != 2, so count = 0
 * 
 * Step 7: num = 2
 *   count = 0, so majorElement = 2, count = 1
 * 
 * Result: 2 ✓
 * 
 * Time & Space Complexity:
 * Approach 1 (Hash Map):
 *   Time Complexity: O(n)
 *   Space Complexity: O(n)
 * 
 * Approach 2 (Boyer-Moore):
 *   Time Complexity: O(n)
 *   Space Complexity: O(1)
 */

/**
 * Finds majority element using Hash Map approach
 * @param {number[]} nums - Input array
 * @return {number} Majority element
 */
function majorityElementHashMap(nums) {
    const map = {};
    
    // Count occurrences of each element
    for (let i = 0; i < nums.length; i++) {
        if (!map[nums[i]]) {
            map[nums[i]] = 1;
        } else {
            map[nums[i]] += 1;
        }
    }
    
    // Find element with count > n/2
    for (let key of Object.keys(map)) {
        if (map[key] > nums.length / 2) {
            return Number(key);
        }
    }
    
    return -1; // Should not reach here as per problem statement
}

/**
 * Finds majority element using Boyer-Moore Majority Vote Algorithm
 * @param {number[]} nums - Input array
 * @return {number} Majority element
 */
function majorityElement(nums) {
    let majorElement = null;
    let count = 0;
    
    for (let num of nums) {
        if (count === 0) {
            majorElement = num;
        }
        count += (majorElement === num) ? 1 : -1;
    }
    
    return majorElement;
}

// Test cases
function testMajorityElement() {
    // Test case 1: Example 1
    const nums1 = [3, 2, 3];
    console.log("Test case 1:");
    console.log("Input:", nums1);
    console.log("Hash Map Output:", majorityElementHashMap(nums1));  // Expected: 3
    console.log("Boyer-Moore Output:", majorityElement(nums1));  // Expected: 3
    console.log("Explanation: 3 appears 2 times out of 3 elements\n");
    
    // Test case 2: Example 2
    const nums2 = [2, 2, 1, 1, 1, 2, 2];
    console.log("Test case 2:");
    console.log("Input:", nums2);
    console.log("Hash Map Output:", majorityElementHashMap(nums2));  // Expected: 2
    console.log("Boyer-Moore Output:", majorityElement(nums2));  // Expected: 2
    console.log("Explanation: 2 appears 4 times out of 7 elements\n");
    
    // Test case 3: Single element
    const nums3 = [1];
    console.log("Test case 3:");
    console.log("Input:", nums3);
    console.log("Hash Map Output:", majorityElementHashMap(nums3));  // Expected: 1
    console.log("Boyer-Moore Output:", majorityElement(nums3));  // Expected: 1
    console.log("Explanation: Single element is always majority\n");
    
    // Test case 4: All same elements
    const nums4 = [5, 5, 5, 5, 5];
    console.log("Test case 4:");
    console.log("Input:", nums4);
    console.log("Hash Map Output:", majorityElementHashMap(nums4));  // Expected: 5
    console.log("Boyer-Moore Output:", majorityElement(nums4));  // Expected: 5
    console.log("Explanation: All elements are the same\n");
    
    // Test case 5: Large array
    const nums5 = Array(1000).fill(7).concat(Array(999).fill(3));
    console.log("Test case 5:");
    console.log("Input: Array with 1000 elements (7 appears 1000 times, 3 appears 999 times)");
    console.log("Hash Map Output:", majorityElementHashMap(nums5));  // Expected: 7
    console.log("Boyer-Moore Output:", majorityElement(nums5));  // Expected: 7
    console.log("Explanation: 7 appears 1000 times out of 1999 elements\n");
    
    // Performance comparison
    console.log("Performance Comparison:");
    const largeArray = Array(100000).fill(9).concat(Array(99999).fill(1));
    
    const startTime1 = performance.now();
    majorityElementHashMap(largeArray);
    const endTime1 = performance.now();
    console.log(`Hash Map time: ${(endTime1 - startTime1).toFixed(2)}ms`);
    
    const startTime2 = performance.now();
    majorityElement(largeArray);
    const endTime2 = performance.now();
    console.log(`Boyer-Moore time: ${(endTime2 - startTime2).toFixed(2)}ms`);
    console.log("Explanation: Boyer-Moore is more efficient due to O(1) space complexity\n");
}

// Run tests
testMajorityElement(); 