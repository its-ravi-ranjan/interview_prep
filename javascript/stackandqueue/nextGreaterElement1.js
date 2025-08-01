/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Next Greater Element I
 * 
 * Problem: Find the next greater element for each element in nums1
 * where nums1 is a subset of nums2.
 * 
 * Example:
 * Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
 * Output: [-1,3,-1]
 * 
 * Approach 1: Monotonic Stack (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * Approach 2: Brute Force
 * Time Complexity: O(n * m)
 * Space Complexity: O(1)
 * 
 * Approach 3: HashMap with Linear Search
 * Time Complexity: O(n * m)
 * Space Complexity: O(n)
 */

/**
 * Approach 1: Monotonic Stack (User's Implementation)
 * 
 * Algorithm:
 * 1. Use a monotonic decreasing stack
 * 2. Process nums2 from right to left
 * 3. For each element, pop smaller elements from stack
 * 4. Next greater element is stack top (or -1 if empty)
 * 5. Push current element onto stack
 * 6. Use Map to store results for quick lookup
 * 
 * Time Complexity: O(n) - single pass through nums2
 * Space Complexity: O(n) - stack and Map
 */
function nextGreaterElementMonotonicStack(nums1, nums2) {
    const map = new Map();
    const stack = [];
    
    // Process nums2 from right to left
    for (let i = nums2.length - 1; i >= 0; i--) {
        // Pop elements smaller than current element
        while (stack.length > 0 && stack[stack.length - 1] <= nums2[i]) {
            stack.pop();
        }
        
        // Next greater element is stack top (or -1 if empty)
        const nextGreater = stack.length === 0 ? -1 : stack[stack.length - 1];
        map.set(nums2[i], nextGreater);
        
        // Push current element onto stack
        stack.push(nums2[i]);
    }
    
    // Build result array
    const result = new Array(nums1.length);
    for (let i = 0; i < nums1.length; i++) {
        result[i] = map.get(nums1[i]);
    }
    
    return result;
}

/**
 * Approach 2: Brute Force
 * 
 * Algorithm:
 * 1. For each element in nums1, find its position in nums2
 * 2. Search for next greater element from that position
 * 3. Return -1 if no greater element found
 * 
 * Time Complexity: O(n * m) - n = nums1.length, m = nums2.length
 * Space Complexity: O(1) - only result array
 */
function nextGreaterElementBruteForce(nums1, nums2) {
    const result = new Array(nums1.length);
    
    for (let i = 0; i < nums1.length; i++) {
        // Find position of nums1[i] in nums2
        let pos = -1;
        for (let j = 0; j < nums2.length; j++) {
            if (nums2[j] === nums1[i]) {
                pos = j;
                break;
            }
        }
        
        // Find next greater element
        result[i] = -1;
        for (let j = pos + 1; j < nums2.length; j++) {
            if (nums2[j] > nums1[i]) {
                result[i] = nums2[j];
                break;
            }
        }
    }
    
    return result;
}

/**
 * Approach 3: HashMap with Linear Search
 * 
 * Algorithm:
 * 1. Create Map to store element positions in nums2
 * 2. For each element in nums1, find its position
 * 3. Search for next greater element from that position
 * 
 * Time Complexity: O(n * m) - n = nums1.length, m = nums2.length
 * Space Complexity: O(n) - Map for positions
 */
function nextGreaterElementHashMap(nums1, nums2) {
    const positionMap = new Map();
    
    // Store positions of elements in nums2
    for (let i = 0; i < nums2.length; i++) {
        positionMap.set(nums2[i], i);
    }
    
    const result = new Array(nums1.length);
    
    for (let i = 0; i < nums1.length; i++) {
        const pos = positionMap.get(nums1[i]);
        result[i] = -1;
        
        // Search for next greater element
        for (let j = pos + 1; j < nums2.length; j++) {
            if (nums2[j] > nums1[i]) {
                result[i] = nums2[j];
                break;
            }
        }
    }
    
    return result;
}

/**
 * Approach 4: Monotonic Stack with Forward Pass
 * 
 * Algorithm:
 * 1. Use monotonic decreasing stack
 * 2. Process nums2 from left to right
 * 3. When popping elements, they found their next greater
 * 4. Store results in Map
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function nextGreaterElementForwardStack(nums1, nums2) {
    const map = new Map();
    const stack = [];
    
    // Process nums2 from left to right
    for (const num of nums2) {
        // Pop elements that found their next greater
        while (stack.length > 0 && stack[stack.length - 1] < num) {
            map.set(stack.pop(), num);
        }
        stack.push(num);
    }
    
    // Elements remaining in stack have no next greater
    while (stack.length > 0) {
        map.set(stack.pop(), -1);
    }
    
    // Build result array
    const result = new Array(nums1.length);
    for (let i = 0; i < nums1.length; i++) {
        result[i] = map.get(nums1[i]);
    }
    
    return result;
}

/**
 * Helper function to visualize the monotonic stack process
 */
function visualizeMonotonicStack(nums2) {
    console.log("=== Monotonic Stack Visualization ===");
    console.log("Array:", nums2);
    console.log();
    
    const map = new Map();
    const stack = [];
    
    console.log("Processing from right to left:");
    console.log("Index\tElement\tStack\t\tNext Greater");
    console.log("-----\t-------\t-----\t\t------------");
    
    for (let i = nums2.length - 1; i >= 0; i--) {
        const current = nums2[i];
        
        // Show stack before processing
        process.stdout.write(`${i}\t${current}\t[`);
        for (let j = stack.length - 1; j >= 0; j--) {
            process.stdout.write(stack[j].toString());
            if (j > 0) process.stdout.write(", ");
        }
        process.stdout.write("]\t\t");
        
        // Pop smaller elements
        while (stack.length > 0 && stack[stack.length - 1] <= current) {
            stack.pop();
        }
        
        // Get next greater element
        const nextGreater = stack.length === 0 ? -1 : stack[stack.length - 1];
        map.set(current, nextGreater);
        
        // Push current element
        stack.push(current);
        
        console.log(nextGreater);
    }
    
    console.log("\nFinal Map:");
    for (const [key, value] of map) {
        console.log(`${key} -> ${value}`);
    }
    console.log();
}

/**
 * Performance comparison of different approaches
 */
function compareApproaches(nums1, nums2) {
    console.log("=== Performance Comparison ===");
    console.log("nums1:", nums1);
    console.log("nums2:", nums2);
    console.log();
    
    // Test all approaches
    let startTime, endTime;
    
    // Monotonic Stack approach
    startTime = performance.now();
    const result1 = nextGreaterElementMonotonicStack(nums1, nums2);
    endTime = performance.now();
    console.log("Monotonic Stack Approach:");
    console.log("  Result:", result1);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(n)");
    console.log();
    
    // Brute Force approach
    startTime = performance.now();
    const result2 = nextGreaterElementBruteForce(nums1, nums2);
    endTime = performance.now();
    console.log("Brute Force Approach:");
    console.log("  Result:", result2);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(1)");
    console.log();
    
    // HashMap approach
    startTime = performance.now();
    const result3 = nextGreaterElementHashMap(nums1, nums2);
    endTime = performance.now();
    console.log("HashMap Approach:");
    console.log("  Result:", result3);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(n)");
    console.log();
    
    // Forward Stack approach
    startTime = performance.now();
    const result4 = nextGreaterElementForwardStack(nums1, nums2);
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
 * Demonstrate the monotonic stack concept
 */
function demonstrateMonotonicStack() {
    console.log("=== Monotonic Stack Concept ===");
    console.log("A monotonic stack maintains elements in a specific order.");
    console.log("For next greater element, we use a decreasing stack.");
    console.log();
    
    console.log("Key Insights:");
    console.log("1. Process from right to left for efficiency");
    console.log("2. Pop elements smaller than current element");
    console.log("3. Stack top becomes next greater element");
    console.log("4. Push current element onto stack");
    console.log("5. Elements remaining in stack have no next greater");
    console.log();
    
    console.log("Why does this work?");
    console.log("- When we pop an element, we found its next greater");
    console.log("- Stack maintains decreasing order");
    console.log("- Each element is processed once");
    console.log("- Time complexity is O(n)");
    console.log();
}

/**
 * Additional utility functions for analysis
 */
function analyzeMonotonicStackAlgorithm() {
    console.log("=== Monotonic Stack Algorithm Analysis ===");
    console.log("Why does monotonic stack work for next greater element?");
    console.log("1. Stack maintains decreasing order from top to bottom");
    console.log("2. When we encounter a larger element, we pop smaller ones");
    console.log("3. Popped elements found their next greater element");
    console.log("4. Remaining elements in stack have no next greater");
    console.log("5. Each element is pushed and popped at most once");
    console.log();
    
    console.log("Mathematical Proof:");
    console.log("- Each element is processed once");
    console.log("- Each element is pushed once");
    console.log("- Each element is popped at most once");
    console.log("- Total operations: O(n)");
    console.log("- Space complexity: O(n) for stack");
    console.log();
}

function demonstrateEdgeCases() {
    console.log("=== Edge Cases Demonstration ===");
    
    const edgeCases = [
        {
            name: "Empty arrays",
            nums1: [],
            nums2: [],
            expected: []
        },
        {
            name: "Single element",
            nums1: [1],
            nums2: [1],
            expected: [-1]
        },
        {
            name: "No next greater",
            nums1: [3, 2, 1],
            nums2: [3, 2, 1],
            expected: [-1, -1, -1]
        },
        {
            name: "All have next greater",
            nums1: [1, 2, 3],
            nums2: [1, 2, 3, 4],
            expected: [2, 3, 4]
        },
        {
            name: "Duplicate elements",
            nums1: [1, 1],
            nums2: [1, 2, 1],
            expected: [2, 2]
        }
    ];
    
    for (const testCase of edgeCases) {
        console.log(testCase.name + ":");
        console.log("nums1:", testCase.nums1);
        console.log("nums2:", testCase.nums2);
        const result = nextGreaterElementMonotonicStack(testCase.nums1, testCase.nums2);
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
        { nums1: [4, 1, 2], nums2: [1, 3, 4, 2] },           // Expected: [-1, 3, -1]
        { nums1: [2, 4], nums2: [1, 2, 3, 4] },               // Expected: [3, -1]
        { nums1: [1, 3, 5, 2, 4], nums2: [6, 5, 4, 3, 2, 1, 7] }, // Expected: [7, 7, 7, 7, 7]
        { nums1: [1, 2, 3], nums2: [1, 2, 3] },               // Expected: [2, 3, -1]
        { nums1: [1], nums2: [1, 2, 3, 4] },                   // Expected: [2]
        { nums1: [4, 1, 2], nums2: [1, 2, 3, 4] },            // Expected: [-1, 2, 3]
    ];
    
    console.log("=== Next Greater Element I - Test Cases ===\n");
    
    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        console.log("Test Case " + (i + 1) + ":");
        console.log("nums1:", testCase.nums1);
        console.log("nums2:", testCase.nums2);
        
        const result = nextGreaterElementMonotonicStack(testCase.nums1, testCase.nums2);
        console.log("Output:", result);
        console.log();
    }
    
    // Detailed analysis with visualization
    console.log("=== Detailed Analysis ===");
    visualizeMonotonicStack([1, 3, 4, 2]);
    
    // Performance comparison
    compareApproaches([4, 1, 2], [1, 3, 4, 2]);
    
    // Demonstrate concept
    demonstrateMonotonicStack();
    
    console.log("=== Key Insights ===");
    console.log("1. Monotonic stack is optimal for O(n) time complexity");
    console.log("2. Brute force is simple but O(n*m) time complexity");
    console.log("3. HashMap approach trades space for time");
    console.log("4. Forward and backward stack approaches both work");
    console.log("5. Monotonic stack is a common pattern for next greater/smaller problems");
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        nextGreaterElementMonotonicStack,
        nextGreaterElementBruteForce,
        nextGreaterElementHashMap,
        nextGreaterElementForwardStack,
        visualizeMonotonicStack,
        compareApproaches,
        demonstrateMonotonicStack,
        analyzeMonotonicStackAlgorithm,
        demonstrateEdgeCases,
        runTests
    };
} else {
    // Run tests if executed directly
    runTests();
    analyzeMonotonicStackAlgorithm();
    demonstrateEdgeCases();
} 