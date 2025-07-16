/**
 * Linear Search Algorithm
 * 
 * Problem:
 * Implement a function to find a specific element in an array by checking each element
 * one by one until the target value is found or the end of the array is reached.
 * 
 * Example:
 * Input: arr = [2, 4, 7, 10], target = 10
 * Output: 3
 * Explanation: 10 is found at index 3
 * 
 * Approach:
 * 1. Start from the first element of the array
 * 2. Compare the current element with the target value
 * 3. If a match is found, return the index
 * 4. If the loop ends without finding the target, return -1
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n) – in worst case, we need to check each element once
 * Space Complexity: O(1) – constant space as we only use a single variable
 */

/**
 * Performs linear search on an array to find the target value
 * @param {number[]} arr - The input array to search in
 * @param {number} target - The value to search for
 * @return {number} The index of the target value if found, -1 otherwise
 */
function linearSearch(arr, target) {
    // Iterate through each element in the array
    for (let i = 0; i < arr.length; i++) {
        // If current element matches target, return its index
        if (arr[i] === target) {
            return i;
        }
    }
    // If target is not found, return -1
    return -1;
}

// Test cases
function testLinearSearch() {
    // Test case 1: Basic case - target found
    const arr1 = [2, 4, 7, 10];
    console.log("Array:", arr1);
    console.log("Searching for 10:", linearSearch(arr1, 10));  // Expected: 3
    
    // Test case 2: Target not found
    const arr2 = [1, 3, 5, 7, 9];
    console.log("\nArray:", arr2);
    console.log("Searching for 6:", linearSearch(arr2, 6));  // Expected: -1
    
    // Test case 3: Target at first position
    const arr3 = [5, 8, 12, 15];
    console.log("\nArray:", arr3);
    console.log("Searching for 5:", linearSearch(arr3, 5));  // Expected: 0
    
    // Test case 4: Empty array
    const arr4 = [];
    console.log("\nArray:", arr4);
    console.log("Searching for 1:", linearSearch(arr4, 1));  // Expected: -1
    
    // Test case 5: Array with duplicate elements
    const arr5 = [2, 4, 4, 6, 8];
    console.log("\nArray:", arr5);
    console.log("Searching for 4:", linearSearch(arr5, 4));  // Expected: 1 (first occurrence)
    
    // Test case 6: Array with negative numbers
    const arr6 = [-5, -3, 0, 2, 4];
    console.log("\nArray:", arr6);
    console.log("Searching for -3:", linearSearch(arr6, -3));  // Expected: 1
}

// Run tests
testLinearSearch(); 