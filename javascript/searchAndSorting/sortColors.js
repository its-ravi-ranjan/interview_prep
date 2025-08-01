/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Sort Colors (Dutch National Flag)
 * 
 * Problem: Sort an array containing only 0, 1, and 2 in-place
 * so that objects of the same color are adjacent.
 * 
 * Example:
 * Input: nums = [2,0,2,1,1,0]
 * Output: [0,0,1,1,2,2]
 * 
 * Approach 1: Three-Pointer (Dutch National Flag)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * Approach 2: Counting Sort
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * Approach 3: Two-Pass Solution
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * Approach 1: Three-Pointer (Dutch National Flag) - User's Implementation
 * 
 * Algorithm:
 * 1. Use three pointers: start (0), index (current), end (2)
 * 2. If current element is 0, swap with start and move both pointers
 * 3. If current element is 2, swap with end and move end pointer
 * 4. If current element is 1, just move index pointer
 * 5. Continue until index > end
 * 
 * Time Complexity: O(n) - single pass through array
 * Space Complexity: O(1) - in-place sorting
 */
function sortColorsThreePointer(nums) {
    let start = 0;
    let end = nums.length - 1;
    let index = 0;
    
    while (index <= end) {
        if (nums[index] === 0) {
            swap(nums, index, start);
            index++;
            start++;
        } else if (nums[index] === 2) {
            swap(nums, index, end);
            end--;
        } else {
            index++;
        }
    }
}

/**
 * Approach 2: Counting Sort
 * 
 * Algorithm:
 * 1. Count occurrences of 0, 1, and 2
 * 2. Overwrite array with counts in order
 * 
 * Time Complexity: O(n) - two passes through array
 * Space Complexity: O(1) - only count variables
 */
function sortColorsCounting(nums) {
    let count0 = 0, count1 = 0, count2 = 0;
    
    // Count occurrences
    for (const num of nums) {
        if (num === 0) count0++;
        else if (num === 1) count1++;
        else count2++;
    }
    
    // Overwrite array
    let index = 0;
    for (let i = 0; i < count0; i++) {
        nums[index++] = 0;
    }
    for (let i = 0; i < count1; i++) {
        nums[index++] = 1;
    }
    for (let i = 0; i < count2; i++) {
        nums[index++] = 2;
    }
}

/**
 * Approach 3: Two-Pass Solution
 * 
 * Algorithm:
 * 1. First pass: move all 0s to front
 * 2. Second pass: move all 2s to end
 * 3. 1s automatically end up in middle
 * 
 * Time Complexity: O(n) - two passes through array
 * Space Complexity: O(1) - in-place sorting
 */
function sortColorsTwoPass(nums) {
    let index = 0;
    
    // First pass: move all 0s to front
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            swap(nums, index, i);
            index++;
        }
    }
    
    // Second pass: move all 2s to end
    index = nums.length - 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] === 2) {
            swap(nums, index, i);
            index--;
        }
    }
}

/**
 * Approach 4: Optimized Three-Pointer
 * 
 * Algorithm:
 * 1. Use three pointers: left (0), mid (1), right (2)
 * 2. mid pointer traverses the array
 * 3. Swap based on mid element value
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function sortColorsOptimized(nums) {
    let left = 0, mid = 0, right = nums.length - 1;
    
    while (mid <= right) {
        if (nums[mid] === 0) {
            swap(nums, left, mid);
            left++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else { // nums[mid] === 2
            swap(nums, mid, right);
            right--;
        }
    }
}

/**
 * Helper function to swap elements
 */
function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * Helper function to visualize the three-pointer process
 */
function visualizeThreePointer(nums) {
    console.log("=== Three-Pointer Visualization ===");
    console.log("Original:", nums);
    console.log();
    
    let start = 0;
    let end = nums.length - 1;
    let index = 0;
    const arr = [...nums];
    
    console.log("Step\tIndex\tStart\tEnd\tArray\t\tAction");
    console.log("----\t-----\t-----\t---\t-----\t\t------");
    
    let step = 1;
    while (index <= end) {
        process.stdout.write(`${step}\t${index}\t${start}\t${end}\t`);
        process.stdout.write(`[${arr.join(',')}]\t`);
        
        if (arr[index] === 0) {
            swap(arr, index, start);
            console.log(`Swap ${index} and ${start} (0)`);
            index++;
            start++;
        } else if (arr[index] === 2) {
            swap(arr, index, end);
            console.log(`Swap ${index} and ${end} (2)`);
            end--;
        } else {
            console.log("Move index (1)");
            index++;
        }
        step++;
    }
    
    console.log("\nFinal Result:", arr);
    console.log();
}

/**
 * Performance comparison of different approaches
 */
function compareApproaches(nums) {
    console.log("=== Performance Comparison ===");
    console.log("Original:", nums);
    console.log();
    
    // Test all approaches
    let startTime, endTime;
    
    // Three-Pointer approach
    const arr1 = [...nums];
    startTime = performance.now();
    sortColorsThreePointer(arr1);
    endTime = performance.now();
    console.log("Three-Pointer Approach:");
    console.log("  Result:", arr1);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(1)");
    console.log();
    
    // Counting Sort approach
    const arr2 = [...nums];
    startTime = performance.now();
    sortColorsCounting(arr2);
    endTime = performance.now();
    console.log("Counting Sort Approach:");
    console.log("  Result:", arr2);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(1)");
    console.log();
    
    // Two-Pass approach
    const arr3 = [...nums];
    startTime = performance.now();
    sortColorsTwoPass(arr3);
    endTime = performance.now();
    console.log("Two-Pass Approach:");
    console.log("  Result:", arr3);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(1)");
    console.log();
    
    // Optimized approach
    const arr4 = [...nums];
    startTime = performance.now();
    sortColorsOptimized(arr4);
    endTime = performance.now();
    console.log("Optimized Approach:");
    console.log("  Result:", arr4);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(1)");
    console.log();
    
    // Verify all results are same
    const allSame = JSON.stringify(arr1) === JSON.stringify(arr2) && 
                   JSON.stringify(arr2) === JSON.stringify(arr3) && 
                   JSON.stringify(arr3) === JSON.stringify(arr4);
    console.log("All approaches give same result:", allSame);
    console.log();
}

/**
 * Demonstrate the Dutch National Flag concept
 */
function demonstrateDutchNationalFlag() {
    console.log("=== Dutch National Flag Concept ===");
    console.log("The Dutch National Flag problem is a classic sorting problem.");
    console.log("It involves sorting an array with only three distinct values.");
    console.log();
    
    console.log("Key Insights:");
    console.log("1. Use three pointers to partition the array");
    console.log("2. One pass through the array is sufficient");
    console.log("3. Maintain invariant: 0s on left, 1s in middle, 2s on right");
    console.log("4. Swap operations maintain the invariant");
    console.log("5. Time complexity is O(n) with O(1) space");
    console.log();
    
    console.log("Pointer Roles:");
    console.log("- start: points to next position for 0");
    console.log("- index: current element being processed");
    console.log("- end: points to next position for 2");
    console.log();
    
    console.log("Why does this work?");
    console.log("- 0s are moved to front and never touched again");
    console.log("- 2s are moved to end and never touched again");
    console.log("- 1s stay in place and get naturally sorted");
    console.log("- Each element is processed at most once");
    console.log();
}

/**
 * Demonstrate different test cases
 */
function demonstrateTestCases() {
    console.log("=== Test Cases Demonstration ===");
    
    const testCases = [
        [2, 0, 2, 1, 1, 0],           // Mixed order
        [2, 2, 2, 2, 2, 2],           // All 2s
        [0, 0, 0, 0, 0, 0],           // All 0s
        [1, 1, 1, 1, 1, 1],           // All 1s
        [0, 1, 2, 0, 1, 2],           // Alternating
        [2, 1, 0, 2, 1, 0],           // Reverse alternating
        [0, 0, 1, 1, 2, 2],           // Already sorted
        [2, 2, 1, 1, 0, 0],           // Reverse sorted
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        console.log("Test Case " + (i + 1) + ":");
        console.log("Input:", testCases[i]);
        
        const result = [...testCases[i]];
        sortColorsThreePointer(result);
        console.log("Output:", result);
        
        // Verify sorting
        let isSorted = true;
        for (let j = 1; j < result.length; j++) {
            if (result[j] < result[j-1]) {
                isSorted = false;
                break;
            }
        }
        console.log("Correctly sorted:", isSorted);
        console.log();
    }
}

/**
 * Additional utility functions for analysis
 */
function analyzeDutchNationalFlagAlgorithm() {
    console.log("=== Dutch National Flag Algorithm Analysis ===");
    console.log("Why does the three-pointer approach work?");
    console.log("1. Invariant: 0s on left, 1s in middle, 2s on right");
    console.log("2. start pointer: next position for 0");
    console.log("3. index pointer: current element being processed");
    console.log("4. end pointer: next position for 2");
    console.log("5. Each element is processed at most once");
    console.log();
    
    console.log("Mathematical Proof:");
    console.log("- Each element is processed at most once");
    console.log("- Each swap operation maintains the invariant");
    console.log("- Total operations: O(n)");
    console.log("- Space complexity: O(1) for pointers");
    console.log("- No extra space needed for sorting");
    console.log();
}

function demonstrateEdgeCases() {
    console.log("=== Edge Cases Demonstration ===");
    
    const edgeCases = [
        {
            name: "Empty array",
            nums: [],
            expected: []
        },
        {
            name: "Single element",
            nums: [1],
            expected: [1]
        },
        {
            name: "Two elements",
            nums: [2, 0],
            expected: [0, 2]
        },
        {
            name: "All same elements",
            nums: [1, 1, 1],
            expected: [1, 1, 1]
        },
        {
            name: "Already sorted",
            nums: [0, 0, 1, 1, 2, 2],
            expected: [0, 0, 1, 1, 2, 2]
        },
        {
            name: "Reverse sorted",
            nums: [2, 2, 1, 1, 0, 0],
            expected: [0, 0, 1, 1, 2, 2]
        }
    ];
    
    for (const testCase of edgeCases) {
        console.log(testCase.name + ":");
        console.log("nums:", testCase.nums);
        const result = [...testCase.nums];
        sortColorsThreePointer(result);
        console.log("Output:", result);
        console.log("Expected:", testCase.expected);
        console.log("Correct:", JSON.stringify(result) === JSON.stringify(testCase.expected));
        console.log();
    }
}

/**
 * Run test cases and demonstrations
 */
function runTests() {
    // Test cases
    const testCases = [
        { nums: [2, 0, 2, 1, 1, 0], expected: [0, 0, 1, 1, 2, 2] },
        { nums: [2, 0, 1], expected: [0, 1, 2] },
        { nums: [0], expected: [0] },
        { nums: [1], expected: [1] },
        { nums: [2], expected: [2] },
        { nums: [0, 1, 2], expected: [0, 1, 2] },
        { nums: [2, 1, 0], expected: [0, 1, 2] },
        { nums: [1, 0, 2, 1, 0, 2], expected: [0, 0, 1, 1, 2, 2] }
    ];
    
    console.log("=== Sort Colors - Test Cases ===\n");
    
    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        console.log("Test Case " + (i + 1) + ":");
        console.log("Input:", testCase.nums);
        
        const result = [...testCase.nums];
        sortColorsThreePointer(result);
        console.log("Output:", result);
        console.log("Expected:", testCase.expected);
        console.log("Correct:", JSON.stringify(result) === JSON.stringify(testCase.expected));
        console.log();
    }
    
    // Detailed analysis with visualization
    console.log("=== Detailed Analysis ===");
    visualizeThreePointer([2, 0, 2, 1, 1, 0]);
    
    // Performance comparison
    compareApproaches([2, 0, 2, 1, 1, 0, 2, 0, 1, 2, 1, 0]);
    
    // Demonstrate concepts
    demonstrateDutchNationalFlag();
    demonstrateTestCases();
    
    console.log("=== Key Insights ===");
    console.log("1. Three-pointer approach is optimal for O(n) time complexity");
    console.log("2. Counting sort is simple but requires two passes");
    console.log("3. Two-pass solution is intuitive but less efficient");
    console.log("4. All approaches maintain O(1) space complexity");
    console.log("5. Dutch National Flag is a classic partitioning problem");
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sortColorsThreePointer,
        sortColorsCounting,
        sortColorsTwoPass,
        sortColorsOptimized,
        swap,
        visualizeThreePointer,
        compareApproaches,
        demonstrateDutchNationalFlag,
        demonstrateTestCases,
        analyzeDutchNationalFlagAlgorithm,
        demonstrateEdgeCases,
        runTests
    };
} else {
    // Run tests if executed directly
    runTests();
    analyzeDutchNationalFlagAlgorithm();
    demonstrateEdgeCases();
} 