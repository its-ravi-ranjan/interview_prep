/**
 * JUMP GAME - GREEDY ALGORITHM PROBLEM
 * 
 * 🎯 PROBLEM STATEMENT:
 * You are given an integer array nums. You are initially positioned at the array's 
 * first index, and each element in the array represents your maximum jump length 
 * at that position. Return true if you can reach the last index, or false otherwise.
 * 
 * 📝 EXAMPLES:
 * Input: nums = [2,3,1,1,4] → Output: true (Jump 1 step from index 0 to 1, then 3 steps to last)
 * Input: nums = [3,2,1,0,4] → Output: false (Can't reach last index)
 * Input: nums = [0] → Output: true (Already at last index)
 * 
 * 🔍 PATTERN RECOGNITION:
 * This is a classic Greedy Algorithm problem!
 * - Track the maximum reachable position from current position
 * - If current position exceeds max reach, return false
 * - Update max reach based on current position + jump length
 * 
 * 🎯 KEY INSIGHT:
 * Keep track of the maximum reachable position. If you can't reach the current 
 * position, you can't reach the end. Greedy approach: always take maximum jump.
 * 
 * ==================== QUICK RECAP - ALL APPROACHES ====================
 * 
 * 🎯 APPROACH 1: GREEDY WITH MAX REACH (RECOMMENDED)
 * 💡 IDEA: Track maximum reachable position, return false if current position exceeds max reach
 * ⏰ TIME: O(n) - Single pass through array
 * 🏠 SPACE: O(1) - Only constant extra space
 * ✅ BEST FOR: Interviews, most efficient
 * 
 * 🎯 APPROACH 2: GREEDY FROM END (BACKWARD)
 * 💡 IDEA: Start from end, track minimum position needed to reach current position
 * ⏰ TIME: O(n) - Single pass from end
 * 🏠 SPACE: O(1) - Only constant extra space
 * ✅ BEST FOR: Alternative greedy perspective
 * 
 * 🎯 APPROACH 3: DYNAMIC PROGRAMMING
 * 💡 IDEA: Use DP array to track reachability of each position
 * ⏰ TIME: O(n²) - For each position, check all previous positions
 * 🏠 SPACE: O(n) - DP array
 * ✅ BEST FOR: Understanding DP approach (not recommended for this problem)
 * 
 * 📊 COMPARISON TABLE:
 * ┌─────────────────┬─────────────────┬─────────────┬─────────────┬─────────────┐
 * │    APPROACH     │   TIME COMPLEXITY│SPACE COMPLEXITY│  PRACTICAL  │  INTERVIEW  │
 * ├─────────────────┼─────────────────┼─────────────┼─────────────┼─────────────┤
 * │ Max Reach       │       O(n)      │     O(1)     │    ⭐⭐⭐⭐⭐   │    ⭐⭐⭐⭐⭐   │
 * │ Backward Greedy │       O(n)      │     O(1)     │    ⭐⭐⭐⭐⭐   │    ⭐⭐⭐⭐⭐   │
 * │ Dynamic Prog    │      O(n²)      │     O(n)     │    ⭐⭐     │    ⭐⭐     │
 * └─────────────────┴─────────────────┴─────────────┴─────────────┴─────────────┘
 * 
 * 🎯 INTERVIEW ANSWER: "This is a greedy problem. Track the maximum reachable 
 * position. If current position exceeds max reach, return false. Time complexity 
 * is O(n) and space is O(1)."
 * 
 * 🔑 KEY POINTS TO REMEMBER:
 * 1. Track maxReach = maximum position you can reach
 * 2. If i > maxReach, return false (can't reach current position)
 * 3. Update maxReach = max(maxReach, nums[i] + i)
 * 4. Return true if you can reach the end
 * 5. Greedy: always take maximum possible jump
 */

class JumpGame {
    
    // ==================== APPROACH 1: GREEDY WITH MAX REACH ====================
    /**
     * 🎯 APPROACH: Greedy with Max Reach
     * 
     * 💡 IDEA: 
     * - Track the maximum reachable position from current position
     * - If current position exceeds max reach, return false
     * - Update max reach based on current position + jump length
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Single pass through the array
     *    - Each position is visited once
     * 
     * 🏠 SPACE COMPLEXITY: O(1)
     *    - Only uses constant extra space
     *    - No additional data structures
     */
    static canJump(nums) {
        let maxReach = 0;
        
        for (let i = 0; i < nums.length; i++) {
            // If current position exceeds max reach, can't reach here
            if (i > maxReach) {
                return false;
            }
            // Update max reach: current position + jump length
            maxReach = Math.max(maxReach, nums[i] + i);
        }
        
        return true;
    }
    
    // ==================== APPROACH 2: GREEDY FROM END ====================
    /**
     * 🎯 APPROACH: Greedy from End (Backward)
     * 
     * 💡 IDEA:
     * - Start from the end and work backwards
     * - Track the minimum position needed to reach current position
     * - If we can reach position 0, return true
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Single pass from end to beginning
     * 
     * 🏠 SPACE COMPLEXITY: O(1)
     *    - Only uses constant extra space
     */
    static canJumpBackward(nums) {
        let lastPos = nums.length - 1;
        
        for (let i = nums.length - 2; i >= 0; i--) {
            // If we can reach lastPos from current position
            if (i + nums[i] >= lastPos) {
                lastPos = i;  // Update lastPos to current position
            }
        }
        
        return lastPos === 0;  // Can we reach position 0?
    }
    
    // ==================== APPROACH 3: DYNAMIC PROGRAMMING ====================
    /**
     * 🎯 APPROACH: Dynamic Programming
     * 
     * 💡 IDEA:
     * - Use DP array to track reachability of each position
     * - For each position, check if any previous position can reach it
     * - Not recommended for this problem due to O(n²) complexity
     * 
     * ⏰ TIME COMPLEXITY: O(n²)
     *    - For each position, check all previous positions
     * 
     * 🏠 SPACE COMPLEXITY: O(n)
     *    - DP array to store reachability
     */
    static canJumpDP(nums) {
        const n = nums.length;
        const dp = new Array(n).fill(false);
        dp[0] = true;  // Starting position is reachable
        
        for (let i = 1; i < n; i++) {
            // Check if any previous position can reach current position
            for (let j = i - 1; j >= 0; j--) {
                if (dp[j] && j + nums[j] >= i) {
                    dp[i] = true;
                    break;
                }
            }
        }
        
        return dp[n - 1];
    }
    
    // ==================== UTILITY METHODS ====================
    static arrayToString(nums) {
        if (nums.length === 0) return "[]";
        return "[" + nums.join(", ") + "]";
    }
    
    /**
     * 📊 COMPARISON OF APPROACHES:
     * 
     * 1. MAX REACH (RECOMMENDED):
     *    ✅ Time: O(n), Space: O(1)
     *    ✅ Most efficient and simple
     *    ✅ Best for interviews
     * 
     * 2. BACKWARD GREEDY:
     *    ✅ Time: O(n), Space: O(1)
     *    ✅ Alternative perspective
     *    ✅ Also very efficient
     * 
     * 3. DYNAMIC PROGRAMMING:
     *    ✅ Time: O(n²), Space: O(n)
     *    ✅ Good for understanding DP
     *    ❌ Overkill for this problem
     * 
     * 🎯 INTERVIEW ANSWER: "This is a greedy problem. Track the maximum reachable 
     * position. If current position exceeds max reach, return false. Time complexity 
     * is O(n) and space is O(1)."
     */
}

// ==================== MAIN EXECUTION ====================
function runJumpGameDemo() {
    console.log("=== JUMP GAME - GREEDY ALGORITHM ===");
    
    const testCases = [
        [2, 3, 1, 1, 4],        // Expected: true
        [3, 2, 1, 0, 4],        // Expected: false
        [0],                     // Expected: true
        [1],                     // Expected: true
        [2, 0],                  // Expected: true
        [1, 0, 1, 0],           // Expected: false
        [2, 5, 0, 0],           // Expected: true
        [1, 1, 1, 1],           // Expected: true
        [3, 0, 8, 2, 0, 0, 1],  // Expected: true
        [0, 2, 3]               // Expected: false
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        const nums = testCases[i];
        console.log(`\n--- Test Case ${i + 1} ---`);
        console.log("Input: nums =", JumpGame.arrayToString(nums));
        
        // Approach 1: Greedy with Max Reach
        const startTime1 = performance.now();
        const result1 = JumpGame.canJump(nums);
        const endTime1 = performance.now();
        console.log(`Greedy Max Reach: ${result1} (Time: ${(endTime1 - startTime1).toFixed(3)} ms)`);
        
        // Approach 2: Greedy from End
        const startTime2 = performance.now();
        const result2 = JumpGame.canJumpBackward(nums);
        const endTime2 = performance.now();
        console.log(`Greedy Backward: ${result2} (Time: ${(endTime2 - startTime2).toFixed(3)} ms)`);
        
        // Approach 3: Dynamic Programming
        const startTime3 = performance.now();
        const result3 = JumpGame.canJumpDP(nums);
        const endTime3 = performance.now();
        console.log(`Dynamic Programming: ${result3} (Time: ${(endTime3 - startTime3).toFixed(3)} ms)`);
        
        if (result1 === result2 && result2 === result3) {
            console.log("✅ All approaches agree!");
        } else {
            console.log("❌ Results don't match!");
        }
    }
}

// Run the demo
runJumpGameDemo();

// Export for use in other modules
module.exports = JumpGame; 