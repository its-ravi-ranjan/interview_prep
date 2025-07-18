/**
 * Maximum Subarray (Kadane's Algorithm)
 * 
 * Problem: Given an integer array nums, find the subarray with the largest sum, and return its sum.
 * 
 * Example 1:
 * Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 * Explanation: The subarray [4,-1,2,1] has the largest sum 6.
 * 
 * Example 2:
 * Input: nums = [1]
 * Output: 1
 * 
 * Example 3:
 * Input: nums = [5,4,-1,7,8]
 * Output: 23
 * 
 * Approach (Kadane's Algorithm):
 * 1. Initialize maxSum and currentSum to the first element
 * 2. Iterate through the array starting from index 1
 * 3. For each element, decide whether to:
 *    - Start a new subarray from current element (nums[i])
 *    - Extend the existing subarray (currentSum + nums[i])
 * 4. Update maxSum if currentSum becomes larger
 * 5. Return maxSum
 * 
 * Key Insight: At each step, we decide whether to continue the current subarray
 * or start a new one from the current element.
 * 
 * Time Complexity: O(n), where n is the length of the array
 * Space Complexity: O(1), only using a constant amount of extra space
 */

/**
 * Find the maximum subarray sum using Kadane's Algorithm
 * @param {number[]} nums - Array of integers
 * @returns {number} - Maximum subarray sum
 */
var maxSubArray = function(nums) {
    if (nums.length === 0) return 0;
    
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        // Decide whether to start a new subarray or extend the current one
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        // Update the maximum sum found so far
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
};

/**
 * Alternative approach: More explicit version for better understanding
 * @param {number[]} nums - Array of integers
 * @returns {number} - Maximum subarray sum
 */
var maxSubArrayAlternative = function(nums) {
    if (nums.length === 0) return 0;
    
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        // If currentSum becomes negative, start fresh from current element
        if (currentSum < 0) {
            currentSum = nums[i];
        } else {
            // Otherwise, extend the current subarray
            currentSum += nums[i];
        }
        
        // Update maxSum if we found a better sum
        if (currentSum > maxSum) {
            maxSum = currentSum;
        }
    }
    
    return maxSum;
};

/**
 * Brute Force Approach (for comparison)
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * @param {number[]} nums - Array of integers
 * @returns {number} - Maximum subarray sum
 */
var maxSubArrayBruteForce = function(nums) {
    if (nums.length === 0) return 0;
    
    let maxSum = nums[0];
    
    // Try all possible subarrays
    for (let start = 0; start < nums.length; start++) {
        let currentSum = 0;
        for (let end = start; end < nums.length; end++) {
            currentSum += nums[end];
            maxSum = Math.max(maxSum, currentSum);
        }
    }
    
    return maxSum;
};

// Test cases
function runTests() {
    console.log("=== Maximum Subarray Tests ===");
    
    const testCases = [
        {
            input: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
            expected: 6,
            description: "Standard case with positive and negative numbers"
        },
        {
            input: [1],
            expected: 1,
            description: "Single element array"
        },
        {
            input: [5, 4, -1, 7, 8],
            expected: 23,
            description: "All positive numbers"
        },
        {
            input: [-1, -2, -3, -4],
            expected: -1,
            description: "All negative numbers"
        },
        {
            input: [0, 0, 0, 0],
            expected: 0,
            description: "All zeros"
        },
        {
            input: [1, 2, 3, 4, 5],
            expected: 15,
            description: "Increasing positive numbers"
        },
        {
            input: [-5, -4, -3, -2, -1],
            expected: -1,
            description: "Increasing negative numbers"
        },
        {
            input: [2, -1, 3, -2, 4, -3],
            expected: 6,
            description: "Alternating positive and negative"
        }
    ];
    
    testCases.forEach((testCase, index) => {
        const result = maxSubArray(testCase.input);
        const status = result === testCase.expected ? "PASS" : "FAIL";
        console.log(`Test ${index + 1}: ${status} - ${testCase.description}`);
        console.log(`  Input: [${testCase.input.join(", ")}]`);
        console.log(`  Expected: ${testCase.expected}, Got: ${result}`);
        console.log();
    });
}

// Performance comparison
function performanceTest() {
    console.log("=== Performance Comparison ===");
    
    // Create a large array for testing
    const largeArray = [];
    for (let i = 0; i < 10000; i++) {
        largeArray.push(Math.floor(Math.random() * 200) - 100); // Random numbers between -100 and 100
    }
    
    console.log("Testing with array of size:", largeArray.length);
    
    // Test Kadane's Algorithm
    const start1 = performance.now();
    const result1 = maxSubArray(largeArray);
    const end1 = performance.now();
    console.log(`Kadane's Algorithm: ${result1} (${(end1 - start1).toFixed(4)}ms)`);
    
    // Test Alternative Approach
    const start2 = performance.now();
    const result2 = maxSubArrayAlternative(largeArray);
    const end2 = performance.now();
    console.log(`Alternative Approach: ${result2} (${(end2 - start2).toFixed(4)}ms)`);
    
    // Test Brute Force (only for small arrays due to O(n²) complexity)
    const smallArray = largeArray.slice(0, 100);
    const start3 = performance.now();
    const result3 = maxSubArrayBruteForce(smallArray);
    const end3 = performance.now();
    console.log(`Brute Force (100 elements): ${result3} (${(end3 - start3).toFixed(4)}ms)`);
}

// Dry run demonstration
function dryRun() {
    console.log("=== Dry Run Demonstration ===");
    
    const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    console.log("Input array:", nums);
    console.log();
    
    let maxSum = nums[0]; // -2
    let currentSum = nums[0]; // -2
    
    console.log("Initial: maxSum =", maxSum, ", currentSum =", currentSum);
    
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        const oldCurrentSum = currentSum;
        
        currentSum = Math.max(num, currentSum + num);
        maxSum = Math.max(currentSum, maxSum);
        
        console.log(`Step ${i}: num = ${num}`);
        console.log(`  currentSum = max(${num}, ${oldCurrentSum} + ${num}) = max(${num}, ${oldCurrentSum + num}) = ${currentSum}`);
        console.log(`  maxSum = max(${currentSum}, ${maxSum}) = ${maxSum}`);
        console.log();
    }
    
    console.log("Final result:", maxSum);
}

// Edge cases demonstration
function edgeCases() {
    console.log("=== Edge Cases ===");
    
    const edgeCases = [
        { name: "Empty array", input: [] },
        { name: "Single positive", input: [5] },
        { name: "Single negative", input: [-3] },
        { name: "Two elements", input: [1, -2] },
        { name: "All same positive", input: [2, 2, 2, 2] },
        { name: "All same negative", input: [-1, -1, -1, -1] }
    ];
    
    edgeCases.forEach(testCase => {
        const result = maxSubArray(testCase.input);
        console.log(`${testCase.name}: [${testCase.input.join(", ")}] → ${result}`);
    });
}

// Run all demonstrations
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { maxSubArray, maxSubArrayAlternative, maxSubArrayBruteForce };
} else {
    runTests();
    console.log();
    performanceTest();
    console.log();
    dryRun();
    console.log();
    edgeCases();
} 