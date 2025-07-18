/**
 * Isomorphic Strings
 * 
 * Problem: Given two strings s and t, determine if they are isomorphic.
 * Two strings s and t are isomorphic if the characters in s can be replaced to get t.
 * All occurrences of a character must be replaced with another character while preserving
 * the order of characters. No two characters may map to the same character, but a character may map to itself.
 * 
 * Example:
 * Input: s = "egg", t = "add"
 * Output: true
 * 
 * Input: s = "foo", t = "bar"
 * Output: false
 * 
 * Input: s = "paper", t = "title"
 * Output: true
 * 
 * Approach:
 * 1. Initialize two maps: one from s to t and the other from t to s.
 * 2. Traverse both strings simultaneously.
 * 3. If a mapping doesn't exist in either direction, create it.
 * 4. If the mapping exists but doesn't match the current characters, return false.
 * 5. If the loop completes without conflicts, return true.
 * 
 * Time Complexity: O(n), where n is the length of the strings
 * Space Complexity: O(1), as the mappings are bounded by character set size
 */

/**
 * Check if two strings are isomorphic
 * @param {string} s - First string
 * @param {string} t - Second string
 * @returns {boolean} - True if isomorphic, false otherwise
 */
var isIsomorphic = function(s, t) {
    let mapSToT = {};
    let mapTToS = {};

    for (let i = 0; i < s.length; i++) {
        if (!mapSToT[s[i]] && !mapTToS[t[i]]) {
            mapSToT[s[i]] = t[i];
            mapTToS[t[i]] = s[i];
        } else if (mapTToS[t[i]] !== s[i] || mapSToT[s[i]] !== t[i]) {
            return false;
        }
    }

    return true;
};

// Minimal test cases
function runTests() {
    console.log("=== Isomorphic Strings Tests ===");
    
    const testCases = [
        { s: "egg", t: "add", expected: true },
        { s: "foo", t: "bar", expected: false },
        { s: "paper", t: "title", expected: true },
        { s: "badc", t: "baba", expected: false },
        { s: "", t: "", expected: true },
        { s: "a", t: "a", expected: true },
        { s: "ab", t: "aa", expected: false }
    ];
    
    testCases.forEach((testCase, index) => {
        const result = isIsomorphic(testCase.s, testCase.t);
        const status = result === testCase.expected ? "PASS" : "FAIL";
        console.log(`Test ${index + 1}: ${status} - "${testCase.s}" vs "${testCase.t}" -> ${result}`);
    });
}

// Run tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { isIsomorphic };
} else {
    runTests();
} 