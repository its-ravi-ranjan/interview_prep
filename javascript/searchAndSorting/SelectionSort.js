/**
 * Selection Sort Algorithm
 * 
 * Problem:
 * Implement a sorting algorithm that divides the array into two parts: a sorted subarray
 * and an unsorted subarray. In each iteration, it finds the minimum element from the
 * unsorted part and moves it to the end of the sorted part.
 * 
 * Example:
 * Input: arr = [4, 5, 1, 3, 9]
 * Output: [1, 3, 4, 5, 9]
 * 
 * Approach:
 * 1. Iterate over array from index 0 to n-2
 * 2. For each index i:
 *    - Assume element at i is minimum in unsorted part
 *    - Find actual minimum element from i+1 to n-1
 *    - Swap element at i with minimum element (if different)
 * 3. Repeat until array is sorted
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n²) in all cases (best, average, and worst)
 *   - Always performs n*(n-1)/2 comparisons
 * Space Complexity: O(1) – in-place sorting, no extra space used
 */

/**
 * Sorts an array using the selection sort algorithm
 * @param {number[]} arr - The input array to be sorted
 * @return {number[]} The sorted array
 */
function selectionSort(arr) {
    let n = arr.length;
    
    // Iterate through the array
    for (let i = 0; i < n - 1; i++) {
        // Assume current element is minimum
        let min = i;
        
        // Find minimum element in unsorted part
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        
        // Swap if minimum element is not at current position
        if (min !== i) {
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }
    
    return arr;
}

// Test cases
function testSelectionSort() {
    // Test case 1: Basic case
    const arr1 = [4, 5, 1, 3, 9];
    console.log("Original array:", arr1);
    console.log("Sorted array:", selectionSort([...arr1]));  // Expected: [1, 3, 4, 5, 9]
    
    // Test case 2: Already sorted array
    const arr2 = [1, 2, 3, 4, 5];
    console.log("\nOriginal array:", arr2);
    console.log("Sorted array:", selectionSort([...arr2]));  // Expected: [1, 2, 3, 4, 5]
    
    // Test case 3: Reverse sorted array
    const arr3 = [5, 4, 3, 2, 1];
    console.log("\nOriginal array:", arr3);
    console.log("Sorted array:", selectionSort([...arr3]));  // Expected: [1, 2, 3, 4, 5]
    
    // Test case 4: Array with duplicate elements
    const arr4 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    console.log("\nOriginal array:", arr4);
    console.log("Sorted array:", selectionSort([...arr4]));  // Expected: [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
    
    // Test case 5: Array with negative numbers
    const arr5 = [-5, 3, -1, 0, 2, -4, 1];
    console.log("\nOriginal array:", arr5);
    console.log("Sorted array:", selectionSort([...arr5]));  // Expected: [-5, -4, -1, 0, 1, 2, 3]
    
    // Test case 6: Empty array
    const arr6 = [];
    console.log("\nOriginal array:", arr6);
    console.log("Sorted array:", selectionSort([...arr6]));  // Expected: []
    
    // Test case 7: Single element array
    const arr7 = [1];
    console.log("\nOriginal array:", arr7);
    console.log("Sorted array:", selectionSort([...arr7]));  // Expected: [1]
    
    // Test case 8: Large array (performance test)
    const arr8 = Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));
    console.log("\nLarge array test (length: 1000)");
    console.log("First 10 elements of original array:", arr8.slice(0, 10));
    const sortedArr8 = selectionSort([...arr8]);
    console.log("First 10 elements of sorted array:", sortedArr8.slice(0, 10));
}

// Run tests
testSelectionSort(); 