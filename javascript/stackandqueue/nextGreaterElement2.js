/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Next Greater Element II (Circular Array)
 * 
 * Problem: Find the next greater element for each element in a circular array.
 * The next greater number of a number x is the first greater number to its
 * traversing-order next in the array, which means you could search circularly.
 * 
 * Example:
 * Input: nums = [1,2,1]
 * Output: [2,-1,2]
 * 
 * Approach 1: Monotonic Stack (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * Approach 2: Brute Force
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * Approach 3: Double Array Simulation
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

/**
 * Approach 1: Monotonic Stack (User's Implementation)
 * 
 * Algorithm:
 * 1. Use a monotonic decreasing stack to store indices
 * 2. Process array twice (2*n) to handle circular nature
 * 3. For each element, pop smaller elements from stack
 * 4. Next greater element is stack top (or -1 if empty)
 * 5. Push current index onto stack
 * 6. Use modulo operation to handle circular indexing
 * 
 * Time Complexity: O(n) - each element processed at most twice
 * Space Complexity: O(n) - stack and result array
 */
function nextGreaterElementsMonotonicStack(nums) {
    const n = nums.length;
    const result = new Array(n);
    const stack = [];
    
    // Process array twice to handle circular nature
    for (let i = 2 * n - 1; i >= 0; i--) {
        const index = i % n;
        
        // Pop elements smaller than current element
        while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[index]) {
            stack.pop();
        }
        
        // Next greater element is stack top (or -1 if empty)
        const nextGreater = stack.length === 0 ? -1 : nums[stack[stack.length - 1]];
        result[index] = nextGreater;
        
        // Push current index onto stack
        stack.push(index);
    }
    
    return result;
}

/**
 * Approach 2: Brute Force
 * 
 * Algorithm:
 * 1. For each element, search circularly for next greater
 * 2. Start from next position and wrap around if needed
 * 3. Return -1 if no greater element found
 * 
 * Time Complexity: O(n²) - for each element, search up to n elements
 * Space Complexity: O(1) - only result array
 */
function nextGreaterElementsBruteForce(nums) {
    const n = nums.length;
    const result = new Array(n);
    
    for (let i = 0; i < n; i++) {
        result[i] = -1;
        
        // Search circularly for next greater element
        for (let j = 1; j < n; j++) {
            const nextIndex = (i + j) % n;
            if (nums[nextIndex] > nums[i]) {
                result[i] = nums[nextIndex];
                break;
            }
        }
    }
    
    return result;
}

/**
 * Approach 3: Double Array Simulation
 * 
 * Algorithm:
 * 1. Create a doubled array [nums, nums]
 * 2. Use monotonic stack on doubled array
 * 3. Take first half of result
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function nextGreaterElementsDoubleArray(nums) {
    const n = nums.length;
    const doubled = new Array(2 * n);
    
    // Create doubled array
    for (let i = 0; i < n; i++) {
        doubled[i] = nums[i];
        doubled[i + n] = nums[i];
    }
    
    const result = new Array(n);
    const stack = [];
    
    // Process doubled array
    for (let i = 2 * n - 1; i >= 0; i--) {
        while (stack.length > 0 && doubled[stack[stack.length - 1]] <= doubled[i]) {
            stack.pop();
        }
        
        const nextGreater = stack.length === 0 ? -1 : doubled[stack[stack.length - 1]];
        
        // Only store result for first half (original array)
        if (i < n) {
            result[i] = nextGreater;
        }
        
        stack.push(i);
    }
    
    return result;
}

/**
 * Approach 4: Monotonic Stack with Forward Pass
 * 
 * Algorithm:
 * 1. Use monotonic decreasing stack
 * 2. Process array twice from left to right
 * 3. When popping elements, they found their next greater
 * 4. Store results in result array
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function nextGreaterElementsForwardStack(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];
    
    // Process array twice to handle circular nature
    for (let i = 0; i < 2 * n; i++) {
        const index = i % n;
        
        // Pop elements that found their next greater
        while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[index]) {
            const poppedIndex = stack.pop();
            result[poppedIndex] = nums[index];
        }
        
        stack.push(index);
    }
    
    return result;
}

/**
 * Helper function to visualize the monotonic stack process
 */
function visualizeMonotonicStack(nums) {
    console.log("=== Monotonic Stack Visualization (Circular) ===");
    console.log("Array:", nums);
    console.log("Length:", nums.length);
    console.log();
    
    const n = nums.length;
    const result = new Array(n);
    const stack = [];
    
    console.log("Processing from right to left (2*n times):");
    console.log("Index\tElement\tStack\t\tNext Greater");
    console.log("-----\t-------\t-----\t\t------------");
    
    for (let i = 2 * n - 1; i >= 0; i--) {
        const index = i % n;
        const current = nums[index];
        
        // Show stack before processing
        process.stdout.write(`${i}(${index})\t${current}\t[`);
        for (let j = stack.length - 1; j >= 0; j--) {
            process.stdout.write(nums[stack[j]].toString());
            if (j > 0) process.stdout.write(", ");
        }
        process.stdout.write("]\t\t");
        
        // Pop smaller elements
        while (stack.length > 0 && nums[stack[stack.length - 1]] <= current) {
            stack.pop();
        }
        
        // Get next greater element
        const nextGreater = stack.length === 0 ? -1 : nums[stack[stack.length - 1]];
        result[index] = nextGreater;
        
        // Push current index
        stack.push(index);
        
        console.log(nextGreater);
    }
    
    console.log("\nFinal Result:", result);
    console.log();
}

/**
 * Performance comparison of different approaches
 */
function compareApproaches(nums) {
    console.log("=== Performance Comparison ===");
    console.log("Array:", nums);
    console.log("Array length:", nums.length);
    console.log();
    
    // Test all approaches
    let startTime, endTime;
    
    // Monotonic Stack approach
    startTime = performance.now();
    const result1 = nextGreaterElementsMonotonicStack(nums);
    endTime = performance.now();
    console.log("Monotonic Stack Approach:");
    console.log("  Result:", result1);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(n)");
    console.log();
    
    // Brute Force approach
    startTime = performance.now();
    const result2 = nextGreaterElementsBruteForce(nums);
    endTime = performance.now();
    console.log("Brute Force Approach:");
    console.log("  Result:", result2);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(1)");
    console.log();
    
    // Double Array approach
    startTime = performance.now();
    const result3 = nextGreaterElementsDoubleArray(nums);
    endTime = performance.now();
    console.log("Double Array Approach:");
    console.log("  Result:", result3);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(n)");
    console.log();
    
    // Forward Stack approach
    startTime = performance.now();
    const result4 = nextGreaterElementsForwardStack(nums);
    endTime = performance.now();
    console.log("Forward Stack Approach:");
    console.log("  Result:", result4);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(n)");
    console.log();
    
    // Verify all results are same
    const allSame = JSON.stringify(result1) === JSON.stringify(result2) && 
                   JSON.stringify(result2) === JSON.stringify(result3) && 
                   JSON.stringify(result3) === JSON.stringify(result4);
    console.log("All approaches give same result:", allSame);
    console.log();
}

/**
 * Demonstrate the circular array concept
 */
function demonstrateCircularArray() {
    console.log("=== Circular Array Concept ===");
    console.log("In a circular array, the next element of nums[n-1] is nums[0].");
    console.log("This means we can search circularly for next greater elements.");
    console.log();
    
    console.log("Key Insights:");
    console.log("1. Process array twice (2*n) to handle circular nature");
    console.log("2. Use modulo operation (i % n) for circular indexing");
    console.log("3. Monotonic stack works the same way as non-circular");
    console.log("4. Each element can find next greater in circular manner");
    console.log("5. Time complexity remains O(n) despite processing 2*n elements");
    console.log();
    
    console.log("Why process 2*n times?");
    console.log("- First n iterations: handle normal next greater");
    console.log("- Second n iterations: handle circular next greater");
    console.log("- Ensures all elements find their next greater");
    console.log("- Handles cases where next greater is before current element");
    console.log();
}

/**
 * Demonstrate circular search examples
 */
function demonstrateCircularSearch() {
    console.log("=== Circular Search Examples ===");
    
    const examples = [
        [1, 2, 1],      // [2, -1, 2]
        [1, 2, 3, 4],   // [2, 3, 4, -1]
        [4, 3, 2, 1],   // [-1, 4, 4, 4]
        [1, 1, 1],      // [-1, -1, -1]
        [5, 4, 3, 2, 1] // [-1, 5, 5, 5, 5]
    ];
    
    for (let i = 0; i < examples.length; i++) {
        const nums = examples[i];
        console.log("Example " + (i + 1) + ":");
        console.log("Array:", nums);
        
        // Show circular search for each element
        for (let j = 0; j < nums.length; j++) {
            process.stdout.write("  " + nums[j] + " -> ");
            
            let found = false;
            for (let k = 1; k < nums.length; k++) {
                const nextIndex = (j + k) % nums.length;
                if (nums[nextIndex] > nums[j]) {
                    console.log(nums[nextIndex]);
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                console.log("-1");
            }
        }
        
        const result = nextGreaterElementsMonotonicStack(nums);
        console.log("Result:", result);
        console.log();
    }
}

/**
 * Additional utility functions for analysis
 */
function analyzeCircularArrayAlgorithm() {
    console.log("=== Circular Array Algorithm Analysis ===");
    console.log("Why does processing 2*n times work for circular arrays?");
    console.log("1. First n iterations: handle normal next greater elements");
    console.log("2. Second n iterations: handle circular next greater elements");
    console.log("3. Modulo operation ensures we stay within array bounds");
    console.log("4. Each element gets processed exactly twice");
    console.log("5. Monotonic stack maintains decreasing order throughout");
    console.log();
    
    console.log("Mathematical Proof:");
    console.log("- Each element is processed at most twice");
    console.log("- Each element is pushed and popped at most once per iteration");
    console.log("- Total operations: O(2n) = O(n)");
    console.log("- Space complexity: O(n) for stack");
    console.log("- Time complexity remains O(n) despite 2*n iterations");
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
            expected: [-1]
        },
        {
            name: "Two elements",
            nums: [1, 2],
            expected: [2, -1]
        },
        {
            name: "All same elements",
            nums: [1, 1, 1],
            expected: [-1, -1, -1]
        },
        {
            name: "Decreasing sequence",
            nums: [3, 2, 1],
            expected: [-1, 3, 3]
        },
        {
            name: "Increasing sequence",
            nums: [1, 2, 3],
            expected: [2, 3, -1]
        }
    ];
    
    for (const testCase of edgeCases) {
        console.log(testCase.name + ":");
        console.log("nums:", testCase.nums);
        const result = nextGreaterElementsMonotonicStack(testCase.nums);
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
        { nums: [1, 2, 1], expected: [2, -1, 2] },
        { nums: [1, 2, 3, 4], expected: [2, 3, 4, -1] },
        { nums: [4, 3, 2, 1], expected: [-1, 4, 4, 4] },
        { nums: [1, 1, 1], expected: [-1, -1, -1] },
        { nums: [5, 4, 3, 2, 1], expected: [-1, 5, 5, 5, 5] },
        { nums: [2, 1, 2, 4, 3], expected: [4, 2, 4, -1, 4] }
    ];
    
    console.log("=== Next Greater Element II - Test Cases ===\n");
    
    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        console.log("Test Case " + (i + 1) + ":");
        console.log("Input:", testCase.nums);
        
        const result = nextGreaterElementsMonotonicStack(testCase.nums);
        console.log("Output:", result);
        console.log("Expected:", testCase.expected);
        console.log("Correct:", JSON.stringify(result) === JSON.stringify(testCase.expected));
        console.log();
    }
    
    // Detailed analysis with visualization
    console.log("=== Detailed Analysis ===");
    visualizeMonotonicStack([1, 2, 1]);
    
    // Performance comparison
    compareApproaches([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    
    // Demonstrate concepts
    demonstrateCircularArray();
    demonstrateCircularSearch();
    
    console.log("=== Key Insights ===");
    console.log("1. Monotonic stack is optimal for O(n) time complexity");
    console.log("2. Process array twice to handle circular nature");
    console.log("3. Use modulo operation for circular indexing");
    console.log("4. Brute force is O(n²) but easy to understand");
    console.log("5. Circular arrays require special handling for next greater elements");
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        nextGreaterElementsMonotonicStack,
        nextGreaterElementsBruteForce,
        nextGreaterElementsDoubleArray,
        nextGreaterElementsForwardStack,
        visualizeMonotonicStack,
        compareApproaches,
        demonstrateCircularArray,
        demonstrateCircularSearch,
        analyzeCircularArrayAlgorithm,
        demonstrateEdgeCases,
        runTests
    };
} else {
    // Run tests if executed directly
    runTests();
    analyzeCircularArrayAlgorithm();
    demonstrateEdgeCases();
} 