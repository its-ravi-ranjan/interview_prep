/**
 * Group Anagrams
 * 
 * Problem: Given an array of strings strs, group the anagrams together. You can return the answer in any order.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 * 
 * Example:
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 * 
 * Input: strs = [""]
 * Output: [[""]]
 * 
 * Input: strs = ["a"]
 * Output: [["a"]]
 * 
 * Approach 1 (Sorting):
 * 1. Initialize a hashmap to store grouped anagrams.
 * 2. For each word in the input list:
 *    - Sort the characters in the word alphabetically.
 *    - Use the sorted string as a key.
 *    - Add the original word to the list at that key.
 * 3. Return all grouped lists of anagrams from the hashmap.
 * 
 * Approach 2 (Frequency Counting):
 * 1. Initialize a hashmap to store grouped anagrams.
 * 2. For each word in the input array:
 *    - Create an array of size 26 to count frequency of each letter.
 *    - Convert that frequency array into a unique string key (like "#1#0#2…").
 *    - Use this string as a hash key to group anagrams.
 * 3. Return all the grouped values.
 * 
 * Time Complexity: 
 * - Approach 1: O(n·k·log k), where n is the number of strings and k is the average length of each string (due to sorting)
 * - Approach 2: O(n·k), where n = number of strings, k = average length of strings (no sorting)
 * Space Complexity: O(n·k), for storing grouped anagrams
 */

/**
 * Group anagrams together using sorting approach
 * @param {string[]} strs - Array of strings
 * @returns {string[][]} - Array of grouped anagrams
 */
var groupAnagrams = function(strs) {
    let map = {};

    for (let i = 0; i < strs.length; i++) {
        let sortedStr = strs[i].split("").sort().join(""); 

        if (!map[sortedStr]) {
            map[sortedStr] = [strs[i]];
        } else {
            map[sortedStr].push(strs[i]);
        }
    }

    return Object.values(map);
};

/**
 * Group anagrams together using frequency counting approach
 * @param {string[]} strs - Array of strings
 * @returns {string[][]} - Array of grouped anagrams
 */
var groupAnagramsFrequency = function(strs) {
    let map = {};

    for (let i = 0; i < strs.length; i++) {
        let freqArr = Array(26).fill(0);
        let s = strs[i];

        for (let j = 0; j < s.length; j++) {
            let index = s[j].charCodeAt(0) - 'a'.charCodeAt(0);
            freqArr[index]++;
        }

        let key = "";
        for (let k = 0; k < 26; k++) {
            key += "#" + freqArr[k];
        }

        if (!map[key]) {
            map[key] = [s];
        } else {
            map[key].push(s);
        }
    }

    return Object.values(map);
};

// Minimal test cases
function runTests() {
    console.log("=== Group Anagrams Tests ===");
    
    const testCases = [
        {
            input: ["eat", "tea", "tan", "ate", "nat", "bat"],
            expected: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
        },
        {
            input: [""],
            expected: [[""]]
        },
        {
            input: ["a"],
            expected: [["a"]]
        },
        {
            input: ["abc", "cba", "bac"],
            expected: [["abc", "cba", "bac"]]
        },
        {
            input: ["hello", "world", "olleh"],
            expected: [["world"], ["hello", "olleh"]]
        }
    ];
    
    testCases.forEach((testCase, index) => {
        const result = groupAnagrams(testCase.input);
        const status = arraysEqual(result, testCase.expected) ? "PASS" : "FAIL";
        console.log(`Test ${index + 1}: ${status} - Input: [${testCase.input.join(", ")}]`);
        console.log(`  Expected: ${JSON.stringify(testCase.expected)}`);
        console.log(`  Got: ${JSON.stringify(result)}`);
    });
}

// Helper function to compare arrays of arrays
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    
    // Sort both arrays by their first element for consistent comparison
    const sortedA = a.map(group => group.sort()).sort((x, y) => x[0].localeCompare(y[0]));
    const sortedB = b.map(group => group.sort()).sort((x, y) => x[0].localeCompare(y[0]));
    
    for (let i = 0; i < sortedA.length; i++) {
        if (sortedA[i].length !== sortedB[i].length) return false;
        for (let j = 0; j < sortedA[i].length; j++) {
            if (sortedA[i][j] !== sortedB[i][j]) return false;
        }
    }
    return true;
}

// Run tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { groupAnagrams };
} else {
    runTests();
} 