/**
 * Squares of a Sorted Array
 * 
 * Problem:
 * Given an integer array nums sorted in non-decreasing order, return an array
 * of the squares of each number sorted in non-decreasing order.
 * 
 * Example 1:
 * Input: nums = [-4,-1,0,3,10]
 * Output: [0,1,9,16,100]
 * Explanation: After squaring, the array becomes [16,1,0,9,100].
 * After sorting, it becomes [0,1,9,16,100].
 * 
 * Approach - Two Pointers:
 * Since the array is sorted, the largest absolute values will be on either end.
 * Use two pointers (left and right) to compare absolute values from both ends,
 * fill the result array from end to start.
 * 
 * Steps:
 * 1. Initialize result array of same size as input
 * 2. Use two pointers: left (start) and right (end)
 * 3. Compare squares of elements at left and right pointers
 * 4. Place the larger square at the end of result array
 * 5. Move the pointer that contributed the larger square
 * 6. Continue until all elements are processed
 * 
 * Dry Run (on [-4,-1,0,3,10]):
 * Initial: left = 0, right = 4, pos = 4
 * 
 * Step 1: left = 0, right = 4
 *   leftEle = (-4)² = 16, rightEle = 10² = 100
 *   16 < 100, so result[4] = 100, right--, pos--
 *   Array: [_, _, _, _, 100]
 * 
 * Step 2: left = 0, right = 3
 *   leftEle = (-4)² = 16, rightEle = 3² = 9
 *   16 > 9, so result[3] = 16, left++, pos--
 *   Array: [_, _, _, 16, 100]
 * 
 * Step 3: left = 1, right = 3
 *   leftEle = (-1)² = 1, rightEle = 3² = 9
 *   1 < 9, so result[2] = 9, right--, pos--
 *   Array: [_, _, _, 16, 100]
 * 
 * Step 4: left = 1, right = 2
 *   leftEle = (-1)² = 1, rightEle = 0² = 0
 *   1 > 0, so result[1] = 1, left++, pos--
 *   Array: [_, 1, _, 16, 100]
 * 
 * Step 5: left = 2, right = 2
 *   leftEle = 0² = 0, rightEle = 0² = 0
 *   0 = 0, so result[0] = 0, right--, pos--
 *   Array: [0, 1, _, 16, 100]
 * 
 * Final Result: [0, 1, 9, 16, 100] ✓
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n) - single pass through the array
 * Space Complexity: O(n) - for the result array
 */

/**
 * Returns squares of array elements in sorted order
 * @param {number[]} nums - Input array sorted in non-decreasing order
 * @return {number[]} Array of squares in non-decreasing order
 */
function sortedSquares(nums) {
    const result = new Array(nums.length);
    let left = 0;
    let right = nums.length - 1;
    let pos = nums.length - 1;
    
    while (left <= right) {
        const leftEle = nums[left] * nums[left];
        const rightEle = nums[right] * nums[right];
        
        if (leftEle > rightEle) {
            result[pos] = leftEle;
            left++;
        } else {
            result[pos] = rightEle;
            right--;
        }
        pos--;
    }
    
    return result;
}

// Test cases
function testSortedSquares() {
    // Test case 1: Example case
    const nums1 = [-4, -1, 0, 3, 10];
    console.log("Test case 1:");
    console.log("Input:", nums1);
    console.log("Output:", sortedSquares(nums1));  // Expected: [0, 1, 9, 16, 100]
    console.log("Explanation: After squaring, the array becomes [16,1,0,9,100]. After sorting, it becomes [0,1,9,16,100].\n");
    
    // Test case 2: All negative numbers
    const nums2 = [-7, -3, -2, -1];
    console.log("Test case 2:");
    console.log("Input:", nums2);
    console.log("Output:", sortedSquares(nums2));  // Expected: [1, 4, 9, 49]
    console.log("Explanation: After squaring, the array becomes [49,9,4,1]. After sorting, it becomes [1,4,9,49].\n");
    
    // Test case 3: All positive numbers
    const nums3 = [1, 2, 3, 4, 5];
    console.log("Test case 3:");
    console.log("Input:", nums3);
    console.log("Output:", sortedSquares(nums3));  // Expected: [1, 4, 9, 16, 25]
    console.log("Explanation: After squaring, the array becomes [1,4,9,16,25]. Already sorted.\n");
    
    // Test case 4: Single element
    const nums4 = [-5];
    console.log("Test case 4:");
    console.log("Input:", nums4);
    console.log("Output:", sortedSquares(nums4));  // Expected: [25]
    console.log("Explanation: Single element squared.\n");
    
    // Test case 5: Array with zeros
    const nums5 = [-3, 0, 0, 2];
    console.log("Test case 5:");
    console.log("Input:", nums5);
    console.log("Output:", sortedSquares(nums5));  // Expected: [0, 0, 4, 9]
    console.log("Explanation: After squaring, the array becomes [9,0,0,4]. After sorting, it becomes [0,0,4,9].\n");
    
    // Test case 6: Large numbers
    const nums6 = [-1000, -500, 0, 500, 1000];
    console.log("Test case 6:");
    console.log("Input:", nums6);
    console.log("Output:", sortedSquares(nums6));  // Expected: [0, 250000, 250000, 1000000, 1000000]
    console.log("Explanation: After squaring, the array becomes [1000000,250000,0,250000,1000000]. After sorting, it becomes [0,250000,250000,1000000,1000000].\n");
    
    // Test case 7: Empty array
    const nums7 = [];
    console.log("Test case 7:");
    console.log("Input:", nums7);
    console.log("Output:", sortedSquares(nums7));  // Expected: []
    console.log("Explanation: Empty array returns empty array.\n");
    
    // Performance test
    console.log("Performance Test:");
    const largeArray = Array.from({length: 100000}, (_, i) => i - 50000);
    const startTime = performance.now();
    sortedSquares(largeArray);
    const endTime = performance.now();
    console.log(`Time taken for 100,000 elements: ${(endTime - startTime).toFixed(2)}ms`);
    console.log("Explanation: Efficient O(n) algorithm handles large arrays quickly.\n");
}

// Run tests
testSortedSquares(); 