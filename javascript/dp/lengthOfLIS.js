/**
 * LONGEST INCREASING SUBSEQUENCE (LIS) - DYNAMIC PROGRAMMING PROBLEM
 * 
 * 🎯 PROBLEM STATEMENT:
 * Given an integer array nums, return the length of the longest strictly 
 * increasing subsequence.
 * 
 * 📝 EXAMPLES:
 * Input: nums = [10,9,2,5,3,7,101,18]
 * Output: 4
 * Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
 * 
 * Input: nums = [0,1,0,3,2,3]
 * Output: 4
 * Explanation: The longest increasing subsequence is [0,1,2,3].
 * 
 * 🔍 PATTERN RECOGNITION:
 * This is a classic Dynamic Programming problem!
 * - For each element, check all previous elements
 * - If current element is greater, extend the subsequence
 * - Track maximum length ending at each position
 * 
 * 🎯 KEY INSIGHT:
 * dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]
 * Final answer is max(dp[0...n-1])
 */

class LengthOfLIS {
    
    // ==================== APPROACH 1: ITERATIVE (STANDARD DP) ====================
    /**
     * 🎯 APPROACH: Iterative with DP Array
     * 
     * 💡 IDEA: 
     * - Initialize dp array with 1 (each element is a subsequence of length 1)
     * - For each element, check all previous elements
     * - If current element is greater, extend the subsequence
     * - Take maximum of all possible extensions
     * 
     * ⏰ TIME COMPLEXITY: O(n²)
     * 🏠 SPACE COMPLEXITY: O(n)
     */
    static lengthOfLISIterative(nums) {
        if (nums.length === 0) return 0;
        
        const n = nums.length;
        const dp = new Array(n).fill(1);  // Each element is a subsequence of length 1
        
        for (let i = 1; i < n; i++) {
            for (let j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
        }
        
        // Find maximum value in dp array
        let maxCount = 0;
        for (const d of dp) {
            maxCount = Math.max(maxCount, d);
        }
        
        return maxCount;
    }
    
    // ==================== APPROACH 2: RECURSIVE WITH MEMOIZATION ====================
    /**
     * 🎯 APPROACH: Recursive with Memoization
     * 
     * 💡 IDEA:
     * - Use recursion to find LIS ending at each position
     * - Cache results to avoid recalculating
     * - Try all possible previous elements
     * 
     * ⏰ TIME COMPLEXITY: O(n²)
     * 🏠 SPACE COMPLEXITY: O(n)
     */
    static lengthOfLISMemoization(nums) {
        if (nums.length === 0) return 0;
        
        const n = nums.length;
        const memo = new Array(n).fill(null);
        
        let maxLength = 0;
        for (let i = 0; i < n; i++) {
            maxLength = Math.max(maxLength, this.helper(nums, i, memo));
        }
        
        return maxLength;
    }
    
    static helper(nums, index, memo) {
        if (memo[index] !== null) return memo[index];
        
        let maxLength = 1;  // Current element is a subsequence of length 1
        
        for (let i = 0; i < index; i++) {
            if (nums[i] < nums[index]) {
                maxLength = Math.max(maxLength, this.helper(nums, i, memo) + 1);
            }
        }
        
        memo[index] = maxLength;
        return maxLength;
    }
    
    // ==================== APPROACH 3: BINARY SEARCH (OPTIMIZED) ====================
    /**
     * 🎯 APPROACH: Binary Search with Patience Sorting
     * 
     * 💡 IDEA:
     * - Use binary search to find insertion position
     * - Maintain array of smallest tail values for each length
     * - Replace or append based on binary search result
     * 
     * ⏰ TIME COMPLEXITY: O(n log n)
     * 🏠 SPACE COMPLEXITY: O(n)
     */
    static lengthOfLISBinarySearch(nums) {
        if (nums.length === 0) return 0;
        
        const n = nums.length;
        const tails = new Array(n).fill(0);
        let length = 0;
        
        for (const num of nums) {
            const index = this.binarySearch(tails, 0, length, num);
            tails[index] = num;
            if (index === length) {
                length++;
            }
        }
        
        return length;
    }
    
    static binarySearch(tails, left, right, target) {
        while (left < right) {
            const mid = left + Math.floor((right - left) / 2);
            if (tails[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
    
    // ==================== UTILITY METHODS ====================
    static arrayToString(nums) {
        if (nums.length === 0) return "[]";
        return "[" + nums.join(", ") + "]";
    }
    
    /**
     * 📊 COMPARISON OF APPROACHES:
     * 
     * 1. ITERATIVE (STANDARD):
     *    ✅ Time: O(n²), Space: O(n)
     *    ✅ Simple to understand and implement
     *    ✅ Good for interviews
     * 
     * 2. MEMOIZATION:
     *    ✅ Time: O(n²), Space: O(n)
     *    ✅ Good for understanding recursion
     *    ✅ Same complexity as iterative
     * 
     * 3. BINARY SEARCH (OPTIMIZED):
     *    ✅ Time: O(n log n), Space: O(n)
     *    ✅ Most efficient for large inputs
     *    ✅ Uses patience sorting concept
     * 
     * 🎯 INTERVIEW ANSWER: "This is a classic DP problem. For each element, 
     * check all previous elements and extend the subsequence if possible. 
     * Standard approach has O(n²) time and O(n) space. Binary search 
     * optimization gives O(n log n) time."
     */
}

// ==================== MAIN EXECUTION ====================
function runLengthOfLISDemo() {
    console.log("=== LONGEST INCREASING SUBSEQUENCE ===");
    
    const testCases = [
        [10, 9, 2, 5, 3, 7, 101, 18],  // Expected: 4
        [0, 1, 0, 3, 2, 3],            // Expected: 4
        [7, 7, 7, 7, 7, 7, 7],         // Expected: 1
        [1],                           // Expected: 1
        [3, 1, 4, 1, 5, 9, 2, 6],      // Expected: 4
        [1, 2, 3, 4, 5],               // Expected: 5
        [5, 4, 3, 2, 1],               // Expected: 1
        []                             // Expected: 0
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        const nums = testCases[i];
        console.log(`\n--- Test Case ${i + 1} ---`);
        console.log("Input:", LengthOfLIS.arrayToString(nums));
        
        // Approach 1: Iterative (Standard DP)
        const startTime1 = performance.now();
        const result1 = LengthOfLIS.lengthOfLISIterative(nums);
        const endTime1 = performance.now();
        console.log(`Iterative: ${result1} (Time: ${(endTime1 - startTime1).toFixed(3)} ms)`);
        
        // Approach 2: Recursive with Memoization
        const startTime2 = performance.now();
        const result2 = LengthOfLIS.lengthOfLISMemoization(nums);
        const endTime2 = performance.now();
        console.log(`Memoization: ${result2} (Time: ${(endTime2 - startTime2).toFixed(3)} ms)`);
        
        // Approach 3: Binary Search (Optimized)
        const startTime3 = performance.now();
        const result3 = LengthOfLIS.lengthOfLISBinarySearch(nums);
        const endTime3 = performance.now();
        console.log(`Binary Search: ${result3} (Time: ${(endTime3 - startTime3).toFixed(3)} ms)`);
        
        if (result1 === result2 && result2 === result3) {
            console.log("✅ All approaches agree!");
        } else {
            console.log("❌ Results don't match!");
        }
    }
}

// Run the demo
runLengthOfLISDemo();

// Export for use in other modules
module.exports = LengthOfLIS; 