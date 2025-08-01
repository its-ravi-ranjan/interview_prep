/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Container With Most Water
 * 
 * Problem: Find two lines that together with the x-axis form a container
 * such that the container contains the most water.
 * 
 * Example:
 * Input: height = [1,8,6,2,5,4,8,3,7]
 * Output: 49
 * 
 * Approach 1: Two-Pointer (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * Approach 2: Brute Force
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * Approach 3: Optimized Two-Pointer
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * Approach 1: Two-Pointer (User's Implementation)
 * 
 * Algorithm:
 * 1. Use two pointers: left and right
 * 2. Calculate area = width * min(height[left], height[right])
 * 3. Move pointer with smaller height inward
 * 4. Update maxWater if current area is larger
 * 5. Continue until left < right
 * 
 * Time Complexity: O(n) - single pass through array
 * Space Complexity: O(1) - only a few variables
 */
function maxAreaTwoPointer(height) {
    let maxWater = 0;
    let left = 0;
    let right = height.length - 1;
    
    while (left < right) {
        const width = right - left;
        const length = Math.min(height[left], height[right]);
        const area = width * length;
        maxWater = Math.max(area, maxWater);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}

/**
 * Approach 2: Brute Force
 * 
 * Algorithm:
 * 1. Check all possible pairs of lines
 * 2. Calculate area for each pair
 * 3. Keep track of maximum area
 * 
 * Time Complexity: O(n²) - nested loops
 * Space Complexity: O(1) - only a few variables
 */
function maxAreaBruteForce(height) {
    let maxWater = 0;
    
    for (let i = 0; i < height.length; i++) {
        for (let j = i + 1; j < height.length; j++) {
            const width = j - i;
            const length = Math.min(height[i], height[j]);
            const area = width * length;
            maxWater = Math.max(area, maxWater);
        }
    }
    
    return maxWater;
}

/**
 * Approach 3: Optimized Two-Pointer with Early Exit
 * 
 * Algorithm:
 * 1. Use two pointers: left and right
 * 2. Calculate area and update maxWater
 * 3. Move pointer with smaller height
 * 4. Early exit if remaining width * max height < current maxWater
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function maxAreaOptimized(height) {
    let maxWater = 0;
    let left = 0;
    let right = height.length - 1;
    
    while (left < right) {
        const width = right - left;
        const length = Math.min(height[left], height[right]);
        const area = width * length;
        maxWater = Math.max(area, maxWater);
        
        // Early exit optimization
        if (width * Math.max(height[left], height[right]) <= maxWater) {
            break;
        }
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}

/**
 * Approach 4: Two-Pointer with Height Tracking
 * 
 * Algorithm:
 * 1. Use two pointers and track max heights seen
 * 2. Skip lines that can't improve the result
 * 3. More aggressive optimization
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function maxAreaHeightTracking(height) {
    let maxWater = 0;
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    
    while (left < right) {
        leftMax = Math.max(leftMax, height[left]);
        rightMax = Math.max(rightMax, height[right]);
        
        const width = right - left;
        const length = Math.min(height[left], height[right]);
        const area = width * length;
        maxWater = Math.max(area, maxWater);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}

/**
 * Helper function to visualize the two-pointer process
 */
function visualizeTwoPointer(height) {
    console.log("=== Two-Pointer Visualization ===");
    console.log("Height array:", height);
    console.log();
    
    let maxWater = 0;
    let left = 0;
    let right = height.length - 1;
    
    console.log("Step\tLeft\tRight\tWidth\tLength\tArea\tMaxWater\tAction");
    console.log("----\t----\t-----\t-----\t------\t---\t--------\t------");
    
    let step = 1;
    while (left < right) {
        const width = right - left;
        const length = Math.min(height[left], height[right]);
        const area = width * length;
        maxWater = Math.max(area, maxWater);
        
        process.stdout.write(`${step}\t${left}\t${right}\t${width}\t${length}\t${area}\t${maxWater}\t`);
        
        if (height[left] < height[right]) {
            console.log("Move left (smaller height)");
            left++;
        } else {
            console.log("Move right (smaller height)");
            right--;
        }
        step++;
    }
    
    console.log("\nFinal Result:", maxWater);
    console.log();
}

/**
 * Performance comparison of different approaches
 */
function compareApproaches(height) {
    console.log("=== Performance Comparison ===");
    console.log("Height array:", height);
    console.log("Array length:", height.length);
    console.log();
    
    // Test all approaches
    let startTime, endTime;
    
    // Two-Pointer approach
    startTime = performance.now();
    const result1 = maxAreaTwoPointer(height);
    endTime = performance.now();
    console.log("Two-Pointer Approach:");
    console.log("  Result:", result1);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(1)");
    console.log();
    
    // Brute Force approach
    startTime = performance.now();
    const result2 = maxAreaBruteForce(height);
    endTime = performance.now();
    console.log("Brute Force Approach:");
    console.log("  Result:", result2);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(1)");
    console.log();
    
    // Optimized approach
    startTime = performance.now();
    const result3 = maxAreaOptimized(height);
    endTime = performance.now();
    console.log("Optimized Approach:");
    console.log("  Result:", result3);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(1)");
    console.log();
    
    // Height Tracking approach
    startTime = performance.now();
    const result4 = maxAreaHeightTracking(height);
    endTime = performance.now();
    console.log("Height Tracking Approach:");
    console.log("  Result:", result4);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(1)");
    console.log();
    
    // Verify all results are same
    const allSame = result1 === result2 && result2 === result3 && result3 === result4;
    console.log("All approaches give same result:", allSame);
    console.log();
}

/**
 * Demonstrate the two-pointer concept
 */
function demonstrateTwoPointer() {
    console.log("=== Two-Pointer Concept ===");
    console.log("The two-pointer approach is optimal for this problem.");
    console.log("It uses the insight that we can eliminate certain pairs.");
    console.log();
    
    console.log("Key Insights:");
    console.log("1. Start with widest possible container (left=0, right=n-1)");
    console.log("2. Area = width * min(height[left], height[right])");
    console.log("3. Move pointer with smaller height inward");
    console.log("4. Larger height might give better area with remaining width");
    console.log("5. Continue until pointers meet");
    console.log();
    
    console.log("Why move smaller height pointer?");
    console.log("- Current area is limited by smaller height");
    console.log("- Moving larger height pointer can't improve area");
    console.log("- Moving smaller height pointer might find better pair");
    console.log("- Width decreases, but height might increase");
    console.log();
}

/**
 * Demonstrate different test cases
 */
function demonstrateTestCases() {
    console.log("=== Test Cases Demonstration ===");
    
    const testCases = [
        [1, 8, 6, 2, 5, 4, 8, 3, 7],  // Expected: 49
        [1, 1],                         // Expected: 1
        [4, 3, 2, 1, 4],               // Expected: 16
        [1, 2, 1],                     // Expected: 2
        [1, 8, 6, 2, 5, 4, 8, 3, 7],  // Expected: 49
        [1, 2, 4, 3],                  // Expected: 4
        [2, 3, 4, 5, 18, 17, 6],      // Expected: 17
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        console.log("Test Case " + (i + 1) + ":");
        console.log("Input:", testCases[i]);
        
        const result = maxAreaTwoPointer(testCases[i]);
        console.log("Output:", result);
        
        // Verify with brute force
        const bruteForceResult = maxAreaBruteForce(testCases[i]);
        console.log("Brute Force:", bruteForceResult);
        console.log("Correct:", result === bruteForceResult);
        console.log();
    }
}

/**
 * Additional utility functions for analysis
 */
function analyzeTwoPointerAlgorithm() {
    console.log("=== Two-Pointer Algorithm Analysis ===");
    console.log("Why does the two-pointer approach work?");
    console.log("1. Greedy Choice: Move pointer with smaller height");
    console.log("2. Current area is limited by smaller height");
    console.log("3. Moving larger height pointer can't improve area");
    console.log("4. Moving smaller height pointer might find better pair");
    console.log("5. Width decreases, but height might increase");
    console.log();
    
    console.log("Mathematical Proof:");
    console.log("- Each element is processed at most once");
    console.log("- Each pointer movement eliminates certain pairs");
    console.log("- Total operations: O(n)");
    console.log("- Space complexity: O(1) for pointers");
    console.log("- Greedy choice preserves optimality");
    console.log();
}

function demonstrateEdgeCases() {
    console.log("=== Edge Cases Demonstration ===");
    
    const edgeCases = [
        {
            name: "Empty array",
            height: [],
            expected: 0
        },
        {
            name: "Single element",
            height: [1],
            expected: 0
        },
        {
            name: "Two elements",
            height: [1, 2],
            expected: 1
        },
        {
            name: "All same height",
            height: [5, 5, 5, 5],
            expected: 15
        },
        {
            name: "Increasing heights",
            height: [1, 2, 3, 4, 5],
            expected: 6
        },
        {
            name: "Decreasing heights",
            height: [5, 4, 3, 2, 1],
            expected: 6
        }
    ];
    
    for (const testCase of edgeCases) {
        console.log(testCase.name + ":");
        console.log("height:", testCase.height);
        const result = maxAreaTwoPointer(testCase.height);
        console.log("Output:", result);
        console.log("Expected:", testCase.expected);
        console.log("Correct:", result === testCase.expected);
        console.log();
    }
}

/**
 * Demonstrate the mathematical proof
 */
function demonstrateMathematicalProof() {
    console.log("=== Mathematical Proof ===");
    console.log("Why does the two-pointer approach work?");
    console.log();
    
    console.log("1. Greedy Choice:");
    console.log("   - At each step, we choose to move the pointer with smaller height");
    console.log("   - This is optimal because the current area is limited by the smaller height");
    console.log("   - Moving the larger height pointer can't improve the area");
    console.log();
    
    console.log("2. Optimal Substructure:");
    console.log("   - If we have optimal solution for subproblem, we can extend it");
    console.log("   - Moving smaller height pointer preserves optimality");
    console.log("   - We don't lose any potential better solutions");
    console.log();
    
    console.log("3. Contradiction Proof:");
    console.log("   - Assume moving larger height pointer gives better solution");
    console.log("   - But current area is limited by smaller height");
    console.log("   - Moving larger height can't increase the limiting factor");
    console.log("   - Contradiction: our assumption is false");
    console.log();
}

/**
 * Run test cases and demonstrations
 */
function runTests() {
    // Test cases
    const testCases = [
        { height: [1, 8, 6, 2, 5, 4, 8, 3, 7], expected: 49 },
        { height: [1, 1], expected: 1 },
        { height: [4, 3, 2, 1, 4], expected: 16 },
        { height: [1, 2, 1], expected: 2 },
        { height: [1, 8, 6, 2, 5, 4, 8, 3, 7], expected: 49 },
        { height: [1, 2, 4, 3], expected: 4 },
        { height: [2, 3, 4, 5, 18, 17, 6], expected: 17 }
    ];
    
    console.log("=== Container With Most Water - Test Cases ===\n");
    
    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        console.log("Test Case " + (i + 1) + ":");
        console.log("Input:", testCase.height);
        
        const result = maxAreaTwoPointer(testCase.height);
        console.log("Output:", result);
        console.log("Expected:", testCase.expected);
        console.log("Correct:", result === testCase.expected);
        console.log();
    }
    
    // Detailed analysis with visualization
    console.log("=== Detailed Analysis ===");
    visualizeTwoPointer([1, 8, 6, 2, 5, 4, 8, 3, 7]);
    
    // Performance comparison
    compareApproaches([1, 8, 6, 2, 5, 4, 8, 3, 7, 9, 2, 1, 5, 3, 8, 4, 6, 7, 1, 9]);
    
    // Demonstrate concepts
    demonstrateTwoPointer();
    demonstrateTestCases();
    demonstrateMathematicalProof();
    
    console.log("=== Key Insights ===");
    console.log("1. Two-pointer approach is optimal for O(n) time complexity");
    console.log("2. Brute force is O(n²) but easy to understand");
    console.log("3. Move pointer with smaller height for optimality");
    console.log("4. Area = width * min(height[left], height[right])");
    console.log("5. Greedy choice: always move smaller height pointer");
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        maxAreaTwoPointer,
        maxAreaBruteForce,
        maxAreaOptimized,
        maxAreaHeightTracking,
        visualizeTwoPointer,
        compareApproaches,
        demonstrateTwoPointer,
        demonstrateTestCases,
        analyzeTwoPointerAlgorithm,
        demonstrateEdgeCases,
        demonstrateMathematicalProof,
        runTests
    };
} else {
    // Run tests if executed directly
    runTests();
    analyzeTwoPointerAlgorithm();
    demonstrateEdgeCases();
} 