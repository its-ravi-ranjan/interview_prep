/**
 * Insertion Sort
 * 
 * Problem:
 * Sort an array of numbers using the Insertion Sort algorithm.
 * Insertion Sort builds the final sorted array one element at a time by
 * comparing each element with the previous elements and inserting it at
 * the correct position.
 * 
 * Example:
 * Input: [4, 5, 1, 3, 9]
 * Output: [1, 3, 4, 5, 9]
 * 
 * Dry Run (on [4, 5, 1, 3, 9]):
 * Initial array: [4, 5, 1, 3, 9]
 * 
 * Pass 1 (i = 1):
 *   curr = 5, prev = 0
 *   Compare: arr[0] (4) < 5, no shift needed
 *   Array remains: [4, 5, 1, 3, 9]
 * 
 * Pass 2 (i = 2):
 *   curr = 1, prev = 1
 *   Compare: arr[1] (5) > 1, shift 5 → [4, 5, 5, 3, 9]
 *   Compare: arr[0] (4) > 1, shift 4 → [4, 4, 5, 3, 9]
 *   Insert 1 → [1, 4, 5, 3, 9]
 * 
 * Pass 3 (i = 3):
 *   curr = 3, prev = 2
 *   Compare: arr[2] (5) > 3, shift 5 → [1, 4, 5, 5, 9]
 *   Compare: arr[1] (4) > 3, shift 4 → [1, 4, 4, 5, 9]
 *   Compare: arr[0] (1) < 3, stop
 *   Insert 3 → [1, 3, 4, 5, 9]
 * 
 * Pass 4 (i = 4):
 *   curr = 9, prev = 3
 *   Compare: arr[3] (5) < 9, no shift needed
 *   Array remains: [1, 3, 4, 5, 9]
 * 
 * Final Sorted Array: [1, 3, 4, 5, 9]
 * 
 * Approach:
 * 1. Start from the second element (index 1)
 * 2. Store the current element (curr)
 * 3. Compare with previous elements and shift them if greater
 * 4. Insert current element at correct position
 * 5. Repeat until array is sorted
 * 
 * Time & Space Complexity:
 * Time Complexity: 
 *   - Best Case: O(n) - when array is already sorted
 *   - Average Case: O(n²)
 *   - Worst Case: O(n²) - when array is reverse sorted
 * Space Complexity: O(1) - sorting is done in-place
 */

/**
 * Sorts an array using Insertion Sort algorithm
 * @param {number[]} arr - Input array to be sorted
 * @return {number[]} Sorted array
 */
function insertionSort(arr) {
    const n = arr.length;
    
    // Start from second element (index 1)
    for (let i = 1; i < n; i++) {
        // Store current element
        const curr = arr[i];
        let prev = i - 1;
        
        // Shift elements greater than current element
        while (prev >= 0 && arr[prev] > curr) {
            arr[prev + 1] = arr[prev];
            prev--;
        }
        
        // Insert current element at correct position
        arr[prev + 1] = curr;
    }
    
    return arr;
}

// Test cases
function testInsertionSort() {
    // Test case 1: Basic case
    const arr1 = [4, 5, 1, 3, 9];
    console.log("Test case 1:");
    console.log("Input:", arr1);
    console.log("Output:", insertionSort([...arr1]));  // Expected: [1, 3, 4, 5, 9]
    console.log("Explanation: Elements are inserted one by one at their correct positions\n");
    
    // Test case 2: Already sorted array
    const arr2 = [1, 2, 3, 4, 5];
    console.log("Test case 2:");
    console.log("Input:", arr2);
    console.log("Output:", insertionSort([...arr2]));  // Expected: [1, 2, 3, 4, 5]
    console.log("Explanation: Array is already sorted, no shifts needed\n");
    
    // Test case 3: Reverse sorted array
    const arr3 = [5, 4, 3, 2, 1];
    console.log("Test case 3:");
    console.log("Input:", arr3);
    console.log("Output:", insertionSort([...arr3]));  // Expected: [1, 2, 3, 4, 5]
    console.log("Explanation: Each element needs to be shifted to the beginning\n");
    
    // Test case 4: Array with duplicates
    const arr4 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    console.log("Test case 4:");
    console.log("Input:", arr4);
    console.log("Output:", insertionSort([...arr4]));  // Expected: [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
    console.log("Explanation: Duplicate elements are handled correctly\n");
    
    // Test case 5: Array with negative numbers
    const arr5 = [-5, 3, -1, 0, 7, -9, 2];
    console.log("Test case 5:");
    console.log("Input:", arr5);
    console.log("Output:", insertionSort([...arr5]));  // Expected: [-9, -5, -1, 0, 2, 3, 7]
    console.log("Explanation: Negative numbers are sorted correctly\n");
    
    // Test case 6: Single element array
    const arr6 = [1];
    console.log("Test case 6:");
    console.log("Input:", arr6);
    console.log("Output:", insertionSort([...arr6]));  // Expected: [1]
    console.log("Explanation: Single element array remains unchanged\n");
    
    // Test case 7: Empty array
    const arr7 = [];
    console.log("Test case 7:");
    console.log("Input:", arr7);
    console.log("Output:", insertionSort([...arr7]));  // Expected: []
    console.log("Explanation: Empty array remains unchanged\n");
    
    // Test case 8: Large array with random elements
    const arr8 = Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));
    console.log("Test case 8:");
    console.log("Input: Array of 1000 random elements");
    const startTime = performance.now();
    insertionSort([...arr8]);
    const endTime = performance.now();
    console.log(`Time taken: ${(endTime - startTime).toFixed(2)}ms`);
    console.log("Explanation: Performance test with large random array\n");
}

// Run tests
testInsertionSort(); 