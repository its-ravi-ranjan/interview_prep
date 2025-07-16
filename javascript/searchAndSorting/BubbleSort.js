/**
 * Bubble Sort Algorithm
 * 
 * Problem:
 * Implement a sorting algorithm that repeatedly steps through the list, compares adjacent
 * elements, and swaps them if they are in the wrong order. After each pass, the largest
 * unsorted element "bubbles up" to its correct position at the end of the array.
 * 
 * Example:
 * Input: arr = [64, 34, 25, 12, 22, 11, 90]
 * Output: [11, 12, 22, 25, 34, 64, 90]
 * 
 * Approach:
 * 1. Iterate through the array multiple times
 * 2. In each pass, compare adjacent elements:
 *    - If current element > next element, swap them
 * 3. After each pass, largest unsorted element bubbles up to end
 * 4. Use boolean flag (isSwapped) to track if any swap occurred:
 *    - If no swaps in a pass, array is sorted → early exit
 * 5. Repeat for n-1 passes or until no swaps needed
 * 
 * Time & Space Complexity:
 * Time Complexity:
 *   - Best Case: O(n) – when array is already sorted (with isSwapped optimization)
 *   - Worst Case: O(n²) – when array is in reverse order
 * Space Complexity: O(1) – in-place sorting, no extra space used
 */

/**
 * Sorts an array using the bubble sort algorithm
 * @param {number[]} arr - The input array to be sorted
 * @return {number[]} The sorted array
 */
function bubbleSort(arr) {
    let n = arr.length;
    
    // Outer loop for n-1 passes
    for (let i = 0; i < n - 1; i++) {
        let isSwapped = false;
        
        // Inner loop for comparing adjacent elements
        // After each pass, last i elements are in place
        for (let j = 0; j < n - 1 - i; j++) {
            // If current element is greater than next, swap them
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                isSwapped = true;
            }
        }
        
        // If no swapping occurred in this pass, array is sorted
        if (!isSwapped) {
            break;
        }
    }
    
    return arr;
}

// Test cases
function testBubbleSort() {
    // Test case 1: Basic case
    const arr1 = [64, 34, 25, 12, 22, 11, 90];
    console.log("Original array:", arr1);
    console.log("Sorted array:", bubbleSort([...arr1]));  // Expected: [11, 12, 22, 25, 34, 64, 90]
    
    // Test case 2: Already sorted array
    const arr2 = [1, 2, 3, 4, 5];
    console.log("\nOriginal array:", arr2);
    console.log("Sorted array:", bubbleSort([...arr2]));  // Expected: [1, 2, 3, 4, 5]
    
    // Test case 3: Reverse sorted array
    const arr3 = [5, 4, 3, 2, 1];
    console.log("\nOriginal array:", arr3);
    console.log("Sorted array:", bubbleSort([...arr3]));  // Expected: [1, 2, 3, 4, 5]
    
    // Test case 4: Array with duplicate elements
    const arr4 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    console.log("\nOriginal array:", arr4);
    console.log("Sorted array:", bubbleSort([...arr4]));  // Expected: [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
    
    // Test case 5: Array with negative numbers
    const arr5 = [-5, 3, -1, 0, 2, -4, 1];
    console.log("\nOriginal array:", arr5);
    console.log("Sorted array:", bubbleSort([...arr5]));  // Expected: [-5, -4, -1, 0, 1, 2, 3]
    
    // Test case 6: Empty array
    const arr6 = [];
    console.log("\nOriginal array:", arr6);
    console.log("Sorted array:", bubbleSort([...arr6]));  // Expected: []
    
    // Test case 7: Single element array
    const arr7 = [1];
    console.log("\nOriginal array:", arr7);
    console.log("Sorted array:", bubbleSort([...arr7]));  // Expected: [1]
    
    // Test case 8: Large array (performance test)
    const arr8 = Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));
    console.log("\nLarge array test (length: 1000)");
    console.log("First 10 elements of original array:", arr8.slice(0, 10));
    const sortedArr8 = bubbleSort([...arr8]);
    console.log("First 10 elements of sorted array:", sortedArr8.slice(0, 10));
}

// Run tests
testBubbleSort(); 