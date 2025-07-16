/**
 * Binary Search Algorithm
 * 
 * Problem:
 * Implement a function to find a specific element in a sorted array by repeatedly
 * dividing the search interval in half.
 * 
 * Example:
 * Input: nums = [1, 3, 5, 7, 9], target = 7
 * Output: 3
 * Explanation: 7 is found at index 3
 * 
 * Approach:
 * 1. Set left = 0, right = nums.length - 1
 * 2. While left <= right:
 *    - Calculate middle = Math.floor((left + right) / 2)
 *    - If nums[middle] === target, return middle
 *    - If target < nums[middle], discard right half: right = middle - 1
 *    - Else, discard left half: left = middle + 1
 * 3. If target is not found, return -1
 * 
 * Time & Space Complexity:
 * Time Complexity: 
 *   - Best Case: O(1) – when target is found at middle initially
 *   - Worst Case: O(log n) – array is halved every iteration
 * Space Complexity: O(1) – constant space as we only use a few variables
 */

/**
 * Performs binary search on a sorted array to find the target value
 * @param {number[]} nums - The sorted input array to search in
 * @param {number} target - The value to search for
 * @return {number} The index of the target value if found, -1 otherwise
 */
function binarySearch(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        // Calculate middle index (using bitwise right shift for integer division)
        let middle = left + ((right - left) >> 1);
        
        if (nums[middle] === target) {
            return middle;
        } else if (target < nums[middle]) {
            right = middle - 1;  // Search in left half
        } else {
            left = middle + 1;   // Search in right half
        }
    }
    
    return -1;  // Target not found
}

// Test cases
function testBinarySearch() {
    // Test case 1: Basic case - target found
    const nums1 = [1, 3, 5, 7, 9];
    console.log("Array:", nums1);
    console.log("Searching for 7:", binarySearch(nums1, 7));  // Expected: 3
    
    // Test case 2: Target not found
    const nums2 = [2, 4, 6, 8, 10];
    console.log("\nArray:", nums2);
    console.log("Searching for 5:", binarySearch(nums2, 5));  // Expected: -1
    
    // Test case 3: Target at first position
    const nums3 = [1, 2, 3, 4, 5];
    console.log("\nArray:", nums3);
    console.log("Searching for 1:", binarySearch(nums3, 1));  // Expected: 0
    
    // Test case 4: Target at last position
    const nums4 = [1, 2, 3, 4, 5];
    console.log("\nArray:", nums4);
    console.log("Searching for 5:", binarySearch(nums4, 5));  // Expected: 4
    
    // Test case 5: Empty array
    const nums5 = [];
    console.log("\nArray:", nums5);
    console.log("Searching for 1:", binarySearch(nums5, 1));  // Expected: -1
    
    // Test case 6: Single element array
    const nums6 = [1];
    console.log("\nArray:", nums6);
    console.log("Searching for 1:", binarySearch(nums6, 1));  // Expected: 0
    
    // Test case 7: Array with negative numbers
    const nums7 = [-5, -3, -1, 0, 2, 4];
    console.log("\nArray:", nums7);
    console.log("Searching for -3:", binarySearch(nums7, -3));  // Expected: 1
    
    // Test case 8: Large array (performance test)
    const nums8 = Array.from({length: 1000000}, (_, i) => i * 2);  // Even numbers from 0 to 1999998
    console.log("\nLarge array test (length: 1000000)");
    console.log("Searching for 1000000:", binarySearch(nums8, 1000000));  // Expected: 500000
}

// Run tests
testBinarySearch(); 