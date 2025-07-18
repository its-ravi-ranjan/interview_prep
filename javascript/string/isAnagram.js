/**
 * Valid Anagram
 * 
 * Problem: Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 * 
 * Example:
 * Input: s = "anagram", t = "nagaram"
 * Output: true
 * 
 * Input: s = "rat", t = "car"
 * Output: false
 * 
 * Approach:
 * 1. First, check if the lengths of both strings are equal. If not, return false.
 * 2. Create a hashmap (or character counter) to store the frequency of characters in the first string.
 * 3. Iterate over the second string and decrease the corresponding frequency in the map.
 * 4. If a character is not found or the count goes below zero, return false.
 * 5. If all characters match, return true at the end.
 * 
 * Time Complexity: O(n), where n is the length of the strings
 * Space Complexity: O(1), since the character set is limited to 26 lowercase letters
 */

/**
 * Check if two strings are anagrams of each other
 * @param {string} s - First string
 * @param {string} t - Second string
 * @returns {boolean} - True if anagrams, false otherwise
 */
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;

    let map = {};

    for (let i = 0; i < s.length; i++) {
        if (!map[s[i]]) {
            map[s[i]] = 1;
        } else {
            ++map[s[i]];
        }
    }

    for (let i = 0; i < t.length; i++) {
        if (!map[t[i]] || map[t[i]] === 0) {
            return false;
        } else {
            --map[t[i]];
        }
    }

    return true;
};

// Minimal test cases
function runTests() {
    console.log("=== Valid Anagram Tests ===");
    
    const testCases = [
        { s: "anagram", t: "nagaram", expected: true },
        { s: "rat", t: "car", expected: false },
        { s: "listen", t: "silent", expected: true },
        { s: "hello", t: "world", expected: false },
        { s: "", t: "", expected: true },
        { s: "a", t: "a", expected: true },
        { s: "ab", t: "ba", expected: true }
    ];
    
    testCases.forEach((testCase, index) => {
        const result = isAnagram(testCase.s, testCase.t);
        const status = result === testCase.expected ? "PASS" : "FAIL";
        console.log(`Test ${index + 1}: ${status} - "${testCase.s}" vs "${testCase.t}" -> ${result}`);
    });
}

// Run tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { isAnagram };
} else {
    runTests();
} 