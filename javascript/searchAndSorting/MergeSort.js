/**
 * Merge Sort
 * 
 * Problem:
 * Sort an array of numbers using the Merge Sort algorithm.
 * Merge Sort is a popular divide-and-conquer sorting algorithm that divides
 * the input array into two halves, recursively sorts them, and then merges
 * the sorted halves into one sorted result.
 * 
 * Example:
 * Input: [5, 2, 4, 1]
 * Output: [1, 2, 4, 5]
 * 
 * Approach - Divide & Conquer:
 * 1. Divide: Split the array into two halves
 * 2. Conquer: Recursively sort each half using merge sort
 * 3. Combine: Merge the two sorted halves into one sorted array
 * 
 * Key Concept - Merge Step:
 * The key step is merging two sorted arrays efficiently into one sorted array.
 * This is done using a two-pointer approach, comparing elements from both arrays
 * and adding the smaller one into a new result array.
 * 
 * Dry Run (on [5, 2, 4, 1]):
 * 
 * Step 1: Divide
 * [5, 2, 4, 1] →
 * [5, 2] and [4, 1] →
 * [5] and [2]    |    [4] and [1]
 * 
 * Step 2: Merge
 * Merge [5] and [2] → [2, 5]
 * Merge [4] and [1] → [1, 4]
 * 
 * Step 3: Final Merge
 * Merge [2, 5] and [1, 4]:
 * Compare 2 and 1 → [1]
 * Compare 2 and 4 → [1, 2]
 * Compare 5 and 4 → [1, 2, 4]
 * Remaining elements → [1, 2, 4, 5]
 * 
 * Output: [1, 2, 4, 5]
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n log n) - Divide takes log n steps and merging takes linear time
 * Space Complexity: O(n) - Additional space is needed to store the merged arrays
 */

/**
 * Sorts an array using Merge Sort algorithm
 * @param {number[]} nums - Input array to be sorted
 * @return {number[]} Sorted array
 */
function mergeSort(nums) {
    if (nums.length <= 1) return nums;
    
    const mid = Math.floor(nums.length / 2);
    const left = mergeSort(nums.slice(0, mid));
    const right = mergeSort(nums.slice(mid));
    
    return merge(left, right);
}

/**
 * Merges two sorted arrays into one sorted array
 * @param {number[]} left - Left sorted array
 * @param {number[]} right - Right sorted array
 * @return {number[]} Merged sorted array
 */
function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    // Compare elements from both arrays and add smaller one
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    // Add remaining elements from left array
    while (i < left.length) {
        result.push(left[i++]);
    }
    
    // Add remaining elements from right array
    while (j < right.length) {
        result.push(right[j++]);
    }
    
    return result;
}

// Test cases
function testMergeSort() {
    // Test case 1: Basic case
    const arr1 = [5, 2, 4, 1];
    console.log("Test case 1:");
    console.log("Input:", arr1);
    console.log("Output:", mergeSort([...arr1]));  // Expected: [1, 2, 4, 5]
    console.log("Explanation: Array is divided, sorted recursively, and merged\n");
    
    // Test case 2: Already sorted array
    const arr2 = [1, 2, 3, 4, 5];
    console.log("Test case 2:");
    console.log("Input:", arr2);
    console.log("Output:", mergeSort([...arr2]));  // Expected: [1, 2, 3, 4, 5]
    console.log("Explanation: Array is already sorted, no changes needed\n");
    
    // Test case 3: Reverse sorted array
    const arr3 = [5, 4, 3, 2, 1];
    console.log("Test case 3:");
    console.log("Input:", arr3);
    console.log("Output:", mergeSort([...arr3]));  // Expected: [1, 2, 3, 4, 5]
    console.log("Explanation: Array is completely reversed, needs full sorting\n");
    
    // Test case 4: Array with duplicates
    const arr4 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    console.log("Test case 4:");
    console.log("Input:", arr4);
    console.log("Output:", mergeSort([...arr4]));  // Expected: [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
    console.log("Explanation: Duplicate elements are handled correctly\n");
    
    // Test case 5: Array with negative numbers
    const arr5 = [-5, 3, -1, 0, 7, -9, 2];
    console.log("Test case 5:");
    console.log("Input:", arr5);
    console.log("Output:", mergeSort([...arr5]));  // Expected: [-9, -5, -1, 0, 2, 3, 7]
    console.log("Explanation: Negative numbers are sorted correctly\n");
    
    // Test case 6: Single element array
    const arr6 = [1];
    console.log("Test case 6:");
    console.log("Input:", arr6);
    console.log("Output:", mergeSort([...arr6]));  // Expected: [1]
    console.log("Explanation: Single element array remains unchanged\n");
    
    // Test case 7: Empty array
    const arr7 = [];
    console.log("Test case 7:");
    console.log("Input:", arr7);
    console.log("Output:", mergeSort([...arr7]));  // Expected: []
    console.log("Explanation: Empty array returns empty array\n");
    
    // Test case 8: Large array with random elements
    const arr8 = Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));
    console.log("Test case 8:");
    console.log("Input: Array of 1000 random elements");
    const startTime = performance.now();
    mergeSort([...arr8]);
    const endTime = performance.now();
    console.log(`Time taken: ${(endTime - startTime).toFixed(2)}ms`);
    console.log("Explanation: Efficient O(n log n) algorithm handles large arrays\n");
    
    // Test case 9: Demonstrate stable sorting
    const arr9 = [
        {value: 3, id: 1},
        {value: 1, id: 2},
        {value: 3, id: 3},
        {value: 1, id: 4}
    ];
    console.log("Test case 9 - Stable Sort:");
    console.log("Input:", arr9.map(item => `${item.value}(${item.id})`));
    
    // Custom merge sort for objects to demonstrate stability
    function mergeSortStable(arr, key = 'value') {
        if (arr.length <= 1) return arr;
        
        const mid = Math.floor(arr.length / 2);
        const left = mergeSortStable(arr.slice(0, mid), key);
        const right = mergeSortStable(arr.slice(mid), key);
        
        return mergeStable(left, right, key);
    }
    
    function mergeStable(left, right, key) {
        const result = [];
        let i = 0, j = 0;
        
        while (i < left.length && j < right.length) {
            if (left[i][key] <= right[j][key]) {
                result.push(left[i++]);
            } else {
                result.push(right[j++]);
            }
        }
        
        while (i < left.length) result.push(left[i++]);
        while (j < right.length) result.push(right[j++]);
        
        return result;
    }
    
    const sorted = mergeSortStable([...arr9]);
    console.log("Output:", sorted.map(item => `${item.value}(${item.id})`));
    console.log("Explanation: Merge sort is stable - equal elements maintain their relative order\n");
}

// Run tests
testMergeSort(); 