/**
 * Split a String in Balanced Strings
 * 
 * Problem Statement:
 * Balanced strings are those that have an equal quantity of 'L' and 'R' characters.
 * Given a balanced string s, split it into some number of substrings such that:
 * Each substring is balanced.
 * Return the maximum number of balanced strings you can obtain.
 * 
 * Examples:
 * Input: s = "RLRRLLRLRL"
 * Output: 4
 * Explanation: s can be split into "RL", "RRLL", "RL", "RL", each substring contains same number of 'L' and 'R'.
 * 
 * Input: s = "RLLLLRRRLR"
 * Output: 3
 * Explanation: s can be split into "RL", "LLLRRR", "LR", each substring contains same number of 'L' and 'R'.
 * 
 * Approach 1:
 * Use separate counters for 'L' and 'R' characters.
 * Increment respective counters when encountering each character.
 * When both counters are equal, increment the result count and reset both counters.
 * This approach tracks both characters explicitly.
 * 
 * Approach 2:
 * Use a single counter that increments for 'L' and decrements for 'R'.
 * When the counter reaches 0, it means we have a balanced substring.
 * This approach is more concise and uses less memory.
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n), where n is the length of the string
 * Space Complexity: O(1), constant extra space used
 */

/**
 * Approach 1: Separate counters for L and R
 * @param {string} s - Input balanced string
 * @returns {number} Maximum number of balanced substrings
 */
function balancedStringSplit(s) {
    let rcount = 0;
    let lcount = 0;
    let count = 0;
    for (let item of s) {
        if (item == 'L') {
            lcount++;
        }
        if (item == 'R') {
            rcount++;
        }
        if (rcount == lcount) {
            count++;
            lcount = 0;
            rcount = 0;
        }
    }
    return count;
}

/**
 * Approach 2: Single counter approach
 * @param {string} s - Input balanced string
 * @returns {number} Maximum number of balanced substrings
 */
function balancedStringSplitApproach2(s) {
    let dummyCount = 0;
    let count = 0;
    for (let item of s) {
        if (item == 'L') {
            dummyCount++;
        }
        if (item == 'R') {
            dummyCount--;
        }
        if (dummyCount == 0) {
            count++;
        }
    }
    return count;
}

// Test cases
function testBalancedStringSplit() {
    console.log("=== Split a String in Balanced Strings ===\n");
    
    // Test case 1: Basic case
    console.log("Test Case 1: s = 'RLRRLLRLRL'");
    const s1 = "RLRRLLRLRL";
    console.log("Input:", s1);
    console.log("Approach 1 result:", balancedStringSplit(s1));
    console.log("Approach 2 result:", balancedStringSplitApproach2(s1));
    console.log("Expected: 4");
    console.log("Explanation: Can be split into 'RL', 'RRLL', 'RL', 'RL'");
    console.log("Correct:", balancedStringSplit(s1) === 4 && balancedStringSplitApproach2(s1) === 4);
    console.log();
    
    // Test case 2: Another balanced string
    console.log("Test Case 2: s = 'RLLLLRRRLR'");
    const s2 = "RLLLLRRRLR";
    console.log("Input:", s2);
    console.log("Approach 1 result:", balancedStringSplit(s2));
    console.log("Approach 2 result:", balancedStringSplitApproach2(s2));
    console.log("Expected: 3");
    console.log("Explanation: Can be split into 'RL', 'LLLRRR', 'LR'");
    console.log("Correct:", balancedStringSplit(s2) === 3 && balancedStringSplitApproach2(s2) === 3);
    console.log();
    
    // Test case 3: Simple case
    console.log("Test Case 3: s = 'LLLLRRRR'");
    const s3 = "LLLLRRRR";
    console.log("Input:", s3);
    console.log("Approach 1 result:", balancedStringSplit(s3));
    console.log("Approach 2 result:", balancedStringSplitApproach2(s3));
    console.log("Expected: 1");
    console.log("Explanation: Can be split into 'LLLLRRRR' (one balanced substring)");
    console.log("Correct:", balancedStringSplit(s3) === 1 && balancedStringSplitApproach2(s3) === 1);
    console.log();
}

// Run the tests
testBalancedStringSplit(); 