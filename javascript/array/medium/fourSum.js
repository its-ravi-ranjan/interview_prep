/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - 4Sum
 * 
 * Problem: Find all unique quadruplets that sum to target
 * 
 * Example:
 * Input: nums = [1,0,-1,0,-2,2], target = 0
 * Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
 * 
 * Approach 1: Optimized Two-Pointer (User's Implementation)
 * Time Complexity: O(n³)
 * Space Complexity: O(1) excluding output
 * 
 * Approach 2: Brute Force
 * Time Complexity: O(n⁴)
 * Space Complexity: O(1) excluding output
 * 
 * Approach 3: HashMap Approach
 * Time Complexity: O(n³)
 * Space Complexity: O(n²)
 */

/**
 * Approach 1: Optimized Two-Pointer (User's Implementation)
 * 
 * Algorithm:
 * 1. Sort the array
 * 2. Use four nested loops with two-pointer optimization
 * 3. Skip duplicates at each level
 * 4. Use two-pointer for last two elements
 * 5. Handle overflow with BigInt
 * 
 * Time Complexity: O(n³) - three nested loops
 * Space Complexity: O(1) excluding output
 */
function fourSumOptimized(nums, target) {
    const result = [];
    nums.sort((a, b) => a - b);
    const n = nums.length;
    
    for (let i = 0; i < n - 3; i++) {
        // Skip duplicates for first element
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        for (let j = i + 1; j < n - 2; j++) {
            // Skip duplicates for second element
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            
            let left = j + 1;
            let right = n - 1;
            
            while (left < right) {
                const sum = BigInt(nums[i]) + BigInt(nums[j]) + BigInt(nums[left]) + BigInt(nums[right]);
                
                if (sum === BigInt(target)) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                    
                    // Skip duplicates for third and fourth elements
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < BigInt(target)) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    
    return result;
}

/**
 * Approach 2: Brute Force
 * 
 * Algorithm:
 * 1. Use four nested loops
 * 2. Check all possible combinations
 * 3. Skip duplicates manually
 * 
 * Time Complexity: O(n⁴) - four nested loops
 * Space Complexity: O(1) excluding output
 */
function fourSumBruteForce(nums, target) {
    const result = [];
    nums.sort((a, b) => a - b);
    const n = nums.length;
    
    for (let i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        for (let j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            
            for (let k = j + 1; k < n - 1; k++) {
                if (k > j + 1 && nums[k] === nums[k - 1]) continue;
                
                for (let l = k + 1; l < n; l++) {
                    if (l > k + 1 && nums[l] === nums[l - 1]) continue;
                    
                    if (nums[i] + nums[j] + nums[k] + nums[l] === target) {
                        result.push([nums[i], nums[j], nums[k], nums[l]]);
                    }
                }
            }
        }
    }
    
    return result;
}

/**
 * Approach 3: HashMap Approach
 * 
 * Algorithm:
 * 1. Use Map to store pair sums
 * 2. Find complementary pairs
 * 3. Handle duplicates carefully
 * 
 * Time Complexity: O(n³)
 * Space Complexity: O(n²)
 */
function fourSumHashMap(nums, target) {
    const result = [];
    nums.sort((a, b) => a - b);
    const n = nums.length;
    
    for (let i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        for (let j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            
            const pairSum = new Map();
            
            for (let k = j + 1; k < n; k++) {
                if (k > j + 1 && nums[k] === nums[k - 1]) continue;
                
                const complement = target - nums[i] - nums[j] - nums[k];
                
                if (pairSum.has(complement)) {
                    for (const pair of pairSum.get(complement)) {
                        result.push([nums[i], nums[j], pair[0], pair[1]]);
                    }
                }
                
                // Add current pair
                const currentSum = nums[j] + nums[k];
                if (!pairSum.has(currentSum)) {
                    pairSum.set(currentSum, []);
                }
                pairSum.get(currentSum).push([nums[j], nums[k]]);
            }
        }
    }
    
    return result;
}

/**
 * Approach 4: Optimized with Early Exit
 * 
 * Algorithm:
 * 1. Sort array and use two-pointer approach
 * 2. Add early exit conditions
 * 3. More aggressive duplicate skipping
 * 
 * Time Complexity: O(n³)
 * Space Complexity: O(1) excluding output
 */
function fourSumOptimizedWithEarlyExit(nums, target) {
    const result = [];
    nums.sort((a, b) => a - b);
    const n = nums.length;
    
    for (let i = 0; i < n - 3; i++) {
        // Early exit conditions
        if (nums[i] * 4 > target) break;
        if (nums[i] + nums[n - 1] * 3 < target) continue;
        
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        for (let j = i + 1; j < n - 2; j++) {
            // Early exit conditions
            if (nums[i] + nums[j] * 3 > target) break;
            if (nums[i] + nums[j] + nums[n - 1] * 2 < target) continue;
            
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            
            let left = j + 1;
            let right = n - 1;
            
            while (left < right) {
                const sum = BigInt(nums[i]) + BigInt(nums[j]) + BigInt(nums[left]) + BigInt(nums[right]);
                
                if (sum === BigInt(target)) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                    
                    // Skip duplicates
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < BigInt(target)) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    
    return result;
}

/**
 * Helper function to visualize the optimized approach
 */
function visualizeOptimizedApproach(nums, target) {
    console.log("=== Optimized Approach Visualization ===");
    console.log("Array:", nums);
    console.log("Target:", target);
    console.log();
    
    const result = [];
    const sortedNums = [...nums].sort((a, b) => a - b);
    const n = sortedNums.length;
    
    console.log("Sorted array:", sortedNums);
    console.log();
    
    console.log("Step\ti\tj\tleft\tright\tsum\tAction");
    console.log("----\t-\t-\t-----\t-----\t---\t------");
    
    let step = 1;
    for (let i = 0; i < n - 3; i++) {
        if (i > 0 && sortedNums[i] === sortedNums[i - 1]) {
            console.log(step + "\t" + i + "\t-\t-\t-\t-\tSkip duplicate i");
            step++;
            continue;
        }
        
        for (let j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && sortedNums[j] === sortedNums[j - 1]) {
                console.log(step + "\t" + i + "\t" + j + "\t-\t-\t-\tSkip duplicate j");
                step++;
                continue;
            }
            
            let left = j + 1;
            let right = n - 1;
            
            while (left < right) {
                const sum = BigInt(sortedNums[i]) + BigInt(sortedNums[j]) + BigInt(sortedNums[left]) + BigInt(sortedNums[right]);
                
                process.stdout.write(`${step}\t${i}\t${j}\t${left}\t${right}\t${sum}\t`);
                
                if (sum === BigInt(target)) {
                    console.log("Found quadruplet: [" + sortedNums[i] + "," + sortedNums[j] + "," + sortedNums[left] + "," + sortedNums[right] + "]");
                    result.push([sortedNums[i], sortedNums[j], sortedNums[left], sortedNums[right]]);
                    
                    while (left < right && sortedNums[left] === sortedNums[left + 1]) left++;
                    while (left < right && sortedNums[right] === sortedNums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < BigInt(target)) {
                    console.log("Sum < target, move left");
                    left++;
                } else {
                    console.log("Sum > target, move right");
                    right--;
                }
                step++;
            }
        }
    }
    
    console.log("\nFinal Result:", result);
    console.log();
}

/**
 * Performance comparison of different approaches
 */
function compareApproaches(nums, target) {
    console.log("=== Performance Comparison ===");
    console.log("Array:", nums);
    console.log("Target:", target);
    console.log("Array length:", nums.length);
    console.log();
    
    // Test all approaches
    let startTime, endTime;
    
    // Optimized approach
    startTime = performance.now();
    const result1 = fourSumOptimized(nums, target);
    endTime = performance.now();
    console.log("Optimized Approach:");
    console.log("  Result:", result1);
    console.log("  Count:", result1.length);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(1) excluding output");
    console.log();
    
    // Brute Force approach
    startTime = performance.now();
    const result2 = fourSumBruteForce(nums, target);
    endTime = performance.now();
    console.log("Brute Force Approach:");
    console.log("  Result:", result2);
    console.log("  Count:", result2.length);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(1) excluding output");
    console.log();
    
    // HashMap approach
    startTime = performance.now();
    const result3 = fourSumHashMap(nums, target);
    endTime = performance.now();
    console.log("HashMap Approach:");
    console.log("  Result:", result3);
    console.log("  Count:", result3.length);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(n²)");
    console.log();
    
    // Optimized with early exit
    startTime = performance.now();
    const result4 = fourSumOptimizedWithEarlyExit(nums, target);
    endTime = performance.now();
    console.log("Optimized with Early Exit:");
    console.log("  Result:", result4);
    console.log("  Count:", result4.length);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(1) excluding output");
    console.log();
    
    // Verify all results are same
    const allSame = result1.length === result2.length && 
                   result2.length === result3.length && 
                   result3.length === result4.length;
    console.log("All approaches give same count:", allSame);
    console.log();
}

/**
 * Demonstrate the 4Sum concept
 */
function demonstrateFourSum() {
    console.log("=== 4Sum Concept ===");
    console.log("4Sum is an extension of 3Sum and 2Sum problems.");
    console.log("It finds all unique quadruplets that sum to target.");
    console.log();
    
    console.log("Key Insights:");
    console.log("1. Sort array first for efficient duplicate skipping");
    console.log("2. Use nested loops with two-pointer optimization");
    console.log("3. Skip duplicates at each level to avoid duplicates");
    console.log("4. Handle integer overflow with BigInt");
    console.log("5. Early exit conditions can improve performance");
    console.log();
    
    console.log("Algorithm Steps:");
    console.log("1. Sort the array");
    console.log("2. Fix first two elements (i, j)");
    console.log("3. Use two-pointer for remaining two elements (left, right)");
    console.log("4. Skip duplicates at each level");
    console.log("5. Handle overflow with BigInt arithmetic");
    console.log();
}

/**
 * Demonstrate different test cases
 */
function demonstrateTestCases() {
    console.log("=== Test Cases Demonstration ===");
    
    const testCases = [
        { nums: [1, 0, -1, 0, -2, 2], target: 0, description: "Basic case" },
        { nums: [2, 2, 2, 2, 2], target: 8, description: "All same elements" },
        { nums: [-2, -1, 0, 0, 1, 2], target: 0, description: "Sorted case" },
        { nums: [1, 1, 1, 1], target: 4, description: "All ones" },
        { nums: [-1, 0, 1, 2, -1, -4], target: 0, description: "Negative target" },
        { nums: [1, 2, 3, 4, 5, 6, 7, 8], target: 15, description: "Increasing sequence" },
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        console.log("Test Case " + (i + 1) + " (" + testCase.description + "):");
        console.log("Input:", testCase.nums, ", Target:", testCase.target);
        
        const result = fourSumOptimized(testCase.nums, testCase.target);
        console.log("Output:", result);
        console.log("Count:", result.length);
        console.log();
    }
}

/**
 * Additional utility functions for analysis
 */
function analyzeFourSumAlgorithm() {
    console.log("=== 4Sum Algorithm Analysis ===");
    console.log("Why does the optimized approach work?");
    console.log("1. Sorting enables efficient duplicate skipping");
    console.log("2. Two-pointer optimization reduces complexity from O(n⁴) to O(n³)");
    console.log("3. Duplicate skipping prevents duplicate results");
    console.log("4. BigInt handles integer overflow");
    console.log("5. Early exit conditions improve performance");
    console.log();
    
    console.log("Mathematical Proof:");
    console.log("- Each element is processed at most once per level");
    console.log("- Two-pointer reduces last two loops to O(n)");
    console.log("- Total operations: O(n³)");
    console.log("- Space complexity: O(1) excluding output");
    console.log("- Duplicate skipping preserves uniqueness");
    console.log();
}

function demonstrateEdgeCases() {
    console.log("=== Edge Cases Demonstration ===");
    
    const edgeCases = [
        {
            name: "Empty array",
            nums: [],
            target: 0,
            expected: []
        },
        {
            name: "Less than 4 elements",
            nums: [1, 2, 3],
            target: 6,
            expected: []
        },
        {
            name: "Exactly 4 elements",
            nums: [1, 2, 3, 4],
            target: 10,
            expected: [[1, 2, 3, 4]]
        },
        {
            name: "All same elements",
            nums: [2, 2, 2, 2, 2],
            target: 8,
            expected: [[2, 2, 2, 2]]
        },
        {
            name: "No solution",
            nums: [1, 2, 3, 4, 5],
            target: 100,
            expected: []
        }
    ];
    
    for (const testCase of edgeCases) {
        console.log(testCase.name + ":");
        console.log("nums:", testCase.nums);
        console.log("target:", testCase.target);
        const result = fourSumOptimized(testCase.nums, testCase.target);
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
        { nums: [1, 0, -1, 0, -2, 2], target: 0, expected: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]] },
        { nums: [2, 2, 2, 2, 2], target: 8, expected: [[2, 2, 2, 2]] },
        { nums: [-2, -1, 0, 0, 1, 2], target: 0, expected: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]] },
        { nums: [1, 1, 1, 1], target: 4, expected: [[1, 1, 1, 1]] },
        { nums: [-1, 0, 1, 2, -1, -4], target: 0, expected: [] }
    ];
    
    console.log("=== 4Sum - Test Cases ===\n");
    
    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        console.log("Test Case " + (i + 1) + ":");
        console.log("Input:", testCase.nums, ", Target:", testCase.target);
        
        const result = fourSumOptimized(testCase.nums, testCase.target);
        console.log("Output:", result);
        console.log("Expected:", testCase.expected);
        console.log("Correct:", JSON.stringify(result) === JSON.stringify(testCase.expected));
        console.log();
    }
    
    // Detailed analysis with visualization
    console.log("=== Detailed Analysis ===");
    visualizeOptimizedApproach([1, 0, -1, 0, -2, 2], 0);
    
    // Performance comparison
    compareApproaches([1, 0, -1, 0, -2, 2, 3, -3, 4, -4], 0);
    
    // Demonstrate concepts
    demonstrateFourSum();
    demonstrateTestCases();
    
    console.log("=== Key Insights ===");
    console.log("1. Optimized approach uses O(n³) time complexity");
    console.log("2. Brute force is O(n⁴) but easy to understand");
    console.log("3. Sort array first for efficient duplicate skipping");
    console.log("4. Use BigInt to handle integer overflow");
    console.log("5. Skip duplicates at each level to avoid duplicate results");
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fourSumOptimized,
        fourSumBruteForce,
        fourSumHashMap,
        fourSumOptimizedWithEarlyExit,
        visualizeOptimizedApproach,
        compareApproaches,
        demonstrateFourSum,
        demonstrateTestCases,
        analyzeFourSumAlgorithm,
        demonstrateEdgeCases,
        runTests
    };
} else {
    // Run tests if executed directly
    runTests();
    analyzeFourSumAlgorithm();
    demonstrateEdgeCases();
} 