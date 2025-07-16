/**
 * Longest Common Prefix
 * 
 * Problem: Write a function to find the longest common prefix string amongst an array of strings.
 * If there is no common prefix, return an empty string "".
 * 
 * Example:
 * Input: strs = ["flower","flow","flight"]
 * Output: "fl"
 * 
 * Input: strs = ["dog","racecar","car"]
 * Output: ""
 * 
 * Approach:
 * 1. Initialize a pointer x to track character positions in the first string
 * 2. Iterate through each character of the first string using while loop
 * 3. For every character at position x in the first string, compare it with the character at the same position in the other strings
 * 4. If a mismatch is found or if the current index exceeds the length of any string, return the substring from the first string from 0 to x
 * 5. If the loop completes without any mismatch, return the first string entirely
 * 
 * Time Complexity: O(n·m), where n is the number of strings and m is the length of the shortest string
 * Space Complexity: O(1), as no extra space is used apart from variables
 */

/**
 * Find the longest common prefix among an array of strings
 * @param {string[]} strs - Array of strings
 * @returns {string} - The longest common prefix, or empty string if none exists
 */
var longestCommonPrefix = function(strs) {
    let x = 0;
    while (x < strs[0].length) {
        let ch = strs[0][x];
        for (let i = 1; i < strs.length; i++) {
            if (ch != strs[i][x] || x == strs[i].length) {
                return strs[0].substring(0, x);
            }
        }
        ++x;
    }
    return strs[0];
};

// Minimal test cases
function runTests() {
    console.log("=== Longest Common Prefix Tests ===");
    
    const testCases = [
        { input: ["flower", "flow", "flight"], expected: "fl" },
        { input: ["dog", "racecar", "car"], expected: "" },
        { input: ["interspecies", "interstellar", "interstate"], expected: "inters" },
        { input: ["hello", "hello", "hello"], expected: "hello" },
        { input: ["a", "b", "c"], expected: "" }
    ];
    
    testCases.forEach((testCase, index) => {
        const result = longestCommonPrefix(testCase.input);
        const status = result === testCase.expected ? "PASS" : "FAIL";
        console.log(`Test ${index + 1}: ${status} - Input: [${testCase.input.join(", ")}] -> "${result}"`);
    });
}

// Run tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { longestCommonPrefix };
} else {
    runTests();
} 