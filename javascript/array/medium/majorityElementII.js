/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Majority Element II (Elements appearing more than ⌊n/3⌋ times)
 * 
 * Problem: Given an integer array of size n, find all elements that appear more than ⌊n/3⌋ times.
 * 
 * Example:
 * Input: nums = [3,2,3]
 * Output: [3]
 * 
 * Input: nums = [1,1,1,3,3,2,2,2]
 * Output: [1,2]
 * 
 * Approach 1: HashMap (User's Solution)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * Approach 2: Boyer-Moore voting algorithm (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * Approach 3: Sorting
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) (excluding sorting space)
 */

/**
 * Approach 1: HashMap Solution (User's Implementation)
 * 
 * Algorithm:
 * 1. Use Map to count frequency of each element
 * 2. Check if frequency > n/3 for each element
 * 3. Add to result array if condition is met
 * 
 * Time Complexity: O(n) - single pass through array
 * Space Complexity: O(n) - Map to store frequencies
 */
function majorityElementHashMap(nums) {
    const map = new Map();
    const result = [];
    const threshold = Math.floor(nums.length / 3);
    
    for (const num of nums) {
        const count = (map.get(num) || 0) + 1;
        map.set(num, count);
        
        if (count > threshold && !result.includes(num)) {
            result.push(num);
        }
    }
    
    return result;
}

/**
 * Approach 2: Boyer-Moore Voting Algorithm (Optimal)
 * 
 * Algorithm:
 * 1. Since we need elements appearing > n/3 times, there can be at most 2 such elements
 * 2. Use two candidates and their counters
 * 3. First pass: find potential candidates
 * 4. Second pass: verify candidates appear > n/3 times
 * 
 * Time Complexity: O(n) - two passes through array
 * Space Complexity: O(1) - only constant extra space
 */
function majorityElementBoyerMoore(nums) {
    const result = [];
    
    if (!nums || nums.length === 0) {
        return result;
    }
    
    // Step 1: Find potential candidates
    let candidate1 = 0, candidate2 = 0;
    let count1 = 0, count2 = 0;
    
    for (const num of nums) {
        if (num === candidate1) {
            count1++;
        } else if (num === candidate2) {
            count2++;
        } else if (count1 === 0) {
            candidate1 = num;
            count1 = 1;
        } else if (count2 === 0) {
            candidate2 = num;
            count2 = 1;
        } else {
            count1--;
            count2--;
        }
    }
    
    // Step 2: Verify candidates appear more than n/3 times
    count1 = 0;
    count2 = 0;
    
    for (const num of nums) {
        if (num === candidate1) {
            count1++;
        } else if (num === candidate2) {
            count2++;
        }
    }
    
    const threshold = Math.floor(nums.length / 3);
    
    if (count1 > threshold) {
        result.push(candidate1);
    }
    if (count2 > threshold) {
        result.push(candidate2);
    }
    
    return result;
}

/**
 * Approach 3: Sorting Solution
 * 
 * Algorithm:
 * 1. Sort the array
 * 2. Count consecutive occurrences of each element
 * 3. Add to result if count > n/3
 * 
 * Time Complexity: O(n log n) - sorting dominates
 * Space Complexity: O(1) - excluding sorting space
 */
function majorityElementSorting(nums) {
    const result = [];
    
    if (!nums || nums.length === 0) {
        return result;
    }
    
    // Create a copy to avoid modifying original array
    const sortedNums = [...nums].sort((a, b) => a - b);
    const threshold = Math.floor(nums.length / 3);
    let count = 1;
    let current = sortedNums[0];
    
    for (let i = 1; i < sortedNums.length; i++) {
        if (sortedNums[i] === current) {
            count++;
        } else {
            if (count > threshold) {
                result.push(current);
            }
            current = sortedNums[i];
            count = 1;
        }
    }
    
    // Check last element
    if (count > threshold) {
        result.push(current);
    }
    
    return result;
}

/**
 * Approach 4: HashMap with Single Pass (Optimized)
 * 
 * Algorithm:
 * 1. Use Map to count frequencies
 * 2. Check threshold condition in same loop
 * 3. Use Set to avoid duplicates
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function majorityElementHashMapOptimized(nums) {
    const map = new Map();
    const result = new Set();
    const threshold = Math.floor(nums.length / 3);
    
    for (const num of nums) {
        const count = (map.get(num) || 0) + 1;
        map.set(num, count);
        
        if (count > threshold) {
            result.add(num);
        }
    }
    
    return Array.from(result);
}

/**
 * Helper function to visualize the voting process
 */
function visualizeBoyerMoore(nums) {
    console.log("=== Boyer-Moore Voting Algorithm Visualization ===");
    console.log("Array:", nums);
    console.log("Threshold:", Math.floor(nums.length / 3));
    
    let candidate1 = 0, candidate2 = 0;
    let count1 = 0, count2 = 0;
    
    console.log("\nStep 1: Finding Candidates");
    console.log("Index\tElement\tCandidate1\tCount1\tCandidate2\tCount2");
    console.log("-----\t-------\t----------\t------\t----------\t------");
    
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        
        if (num === candidate1) {
            count1++;
        } else if (num === candidate2) {
            count2++;
        } else if (count1 === 0) {
            candidate1 = num;
            count1 = 1;
        } else if (count2 === 0) {
            candidate2 = num;
            count2 = 1;
        } else {
            count1--;
            count2--;
        }
        
        console.log(`${i}\t${num}\t${candidate1}\t\t${count1}\t${candidate2}\t\t${count2}`);
    }
    
    console.log("\nCandidates found:", candidate1 + ", " + candidate2);
    
    // Verify candidates
    count1 = 0;
    count2 = 0;
    
    for (const num of nums) {
        if (num === candidate1) count1++;
        else if (num === candidate2) count2++;
    }
    
    console.log("Final counts:");
    console.log("Candidate " + candidate1 + ":", count1 + " times");
    console.log("Candidate " + candidate2 + ":", count2 + " times");
    
    const result = [];
    const threshold = Math.floor(nums.length / 3);
    
    if (count1 > threshold) result.push(candidate1);
    if (count2 > threshold) result.push(candidate2);
    
    console.log("Result:", result);
    console.log();
}

/**
 * Performance comparison of different approaches
 */
function compareApproaches(nums) {
    console.log("=== Performance Comparison ===");
    console.log("Array:", nums);
    console.log("Array length:", nums.length);
    console.log("Threshold:", Math.floor(nums.length / 3));
    console.log();
    
    // Test all approaches
    let startTime, endTime;
    
    // HashMap approach
    startTime = performance.now();
    const result1 = majorityElementHashMap(nums);
    endTime = performance.now();
    console.log("HashMap Approach:");
    console.log("  Result:", result1);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(n)");
    console.log();
    
    // Boyer-Moore approach
    startTime = performance.now();
    const result2 = majorityElementBoyerMoore(nums);
    endTime = performance.now();
    console.log("Boyer-Moore Approach:");
    console.log("  Result:", result2);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(1)");
    console.log();
    
    // Sorting approach
    startTime = performance.now();
    const result3 = majorityElementSorting(nums);
    endTime = performance.now();
    console.log("Sorting Approach:");
    console.log("  Result:", result3);
    console.log("  Time:", (endTime - startTime).toFixed(4), "ms");
    console.log("  Space: O(1)");
    console.log();
    
    // HashMap Optimized approach
    startTime = performance.now();
    const result4 = majorityElementHashMapOptimized(nums);
    endTime = performance.now();
    console.log("HashMap Optimized Approach:");
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
 * Run test cases and demonstrations
 */
function runTests() {
    // Test cases
    const testCases = [
        [3, 2, 3],                    // Expected: [3]
        [1, 1, 1, 3, 3, 2, 2, 2],    // Expected: [1, 2]
        [1, 2, 3],                    // Expected: []
        [1, 1, 1, 1],                // Expected: [1]
        [1, 2, 3, 4, 5, 6],          // Expected: []
        [1, 1, 1, 2, 2, 2, 3],      // Expected: [1, 2]
        [1, 1, 1, 2, 2, 2, 3, 3, 3], // Expected: []
        [1, 1, 1, 2, 2, 2, 3, 3],   // Expected: [1, 2]
    ];
    
    console.log("=== Majority Element II - Test Cases ===\n");
    
    for (let i = 0; i < testCases.length; i++) {
        console.log("Test Case " + (i + 1) + ":");
        console.log("Input:", testCases[i]);
        
        const result = majorityElementBoyerMoore(testCases[i]);
        console.log("Output:", result);
        console.log();
    }
    
    // Detailed analysis with visualization
    console.log("=== Detailed Analysis ===");
    visualizeBoyerMoore([1, 1, 1, 3, 3, 2, 2, 2]);
    
    // Performance comparison
    compareApproaches([1, 1, 1, 3, 3, 2, 2, 2, 4, 4, 4, 5, 5, 5]);
    
    console.log("=== Key Insights ===");
    console.log("1. Boyer-Moore is optimal for space complexity O(1)");
    console.log("2. HashMap is simple and efficient for time complexity O(n)");
    console.log("3. At most 2 elements can appear more than ⌊n/3⌋ times");
    console.log("4. Boyer-Moore requires two passes but uses constant space");
    console.log("5. Sorting approach is not optimal but easy to understand");
}

/**
 * Additional utility functions for analysis
 */
function analyzeBoyerMooreAlgorithm() {
    console.log("=== Boyer-Moore Algorithm Analysis ===");
    console.log("Why does Boyer-Moore work for ⌊n/3⌋ threshold?");
    console.log("1. If an element appears > n/3 times, it must be a candidate");
    console.log("2. At most 2 elements can appear > n/3 times");
    console.log("3. First pass finds potential candidates");
    console.log("4. Second pass verifies actual counts");
    console.log("5. Space complexity is O(1) - only 4 variables needed");
    console.log();
    
    console.log("Mathematical Proof:");
    console.log("- If element A appears > n/3 times");
    console.log("- And element B appears > n/3 times");
    console.log("- Then A + B > 2n/3");
    console.log("- Remaining elements < n/3");
    console.log("- Therefore, at most 2 such elements can exist");
    console.log();
}

function demonstrateEdgeCases() {
    console.log("=== Edge Cases Demonstration ===");
    
    const edgeCases = [
        {
            name: "Empty array",
            input: [],
            expected: []
        },
        {
            name: "Single element",
            input: [1],
            expected: []
        },
        {
            name: "Two elements",
            input: [1, 2],
            expected: []
        },
        {
            name: "Three same elements",
            input: [1, 1, 1],
            expected: [1]
        },
        {
            name: "All elements appear exactly n/3 times",
            input: [1, 1, 2, 2, 3, 3],
            expected: []
        },
        {
            name: "One element appears exactly n/3 + 1 times",
            input: [1, 1, 1, 2, 2, 3],
            expected: [1]
        }
    ];
    
    for (const testCase of edgeCases) {
        console.log(testCase.name + ":");
        console.log("Input:", testCase.input);
        const result = majorityElementBoyerMoore(testCase.input);
        console.log("Output:", result);
        console.log("Expected:", testCase.expected);
        console.log("Correct:", JSON.stringify(result) === JSON.stringify(testCase.expected));
        console.log();
    }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        majorityElementHashMap,
        majorityElementBoyerMoore,
        majorityElementSorting,
        majorityElementHashMapOptimized,
        visualizeBoyerMoore,
        compareApproaches,
        runTests,
        analyzeBoyerMooreAlgorithm,
        demonstrateEdgeCases
    };
} else {
    // Run tests if executed directly
    runTests();
    analyzeBoyerMooreAlgorithm();
    demonstrateEdgeCases();
} 