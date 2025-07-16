/**
 * Maximum Frequency Sum
 * 
 * Problem Statement:
 * This problem requires finding the most frequently occurring vowel and consonant 
 * characters in a string, and returning the sum of their frequencies.
 * 
 * Examples:
 * Input: s = "hello"
 * Output: 3 (l appears 2 times, e appears 1 time, so 2 + 1 = 3)
 * 
 * Input: s = "leetcode"
 * Output: 4 (e appears 3 times, t appears 1 time, so 3 + 1 = 4)
 * 
 * Approach 1:
 * Initialize a character frequency map using a loop.
 * Define a list of vowels: ['a', 'e', 'i', 'o', 'u'].
 * Traverse the string and count how often each character appears.
 * Track the highest frequency vowel and the highest frequency consonant.
 * Return the sum of those two highest values.
 * 
 * Approach 2:
 * Use a Set for vowels and build frequency map in a single pass.
 * Track maximum frequencies for vowels and consonants simultaneously.
 * Return the sum of maximum frequencies.
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n), where n = length of the string
 * Space Complexity: O(k), where k = number of unique characters (at most 26 lowercase letters)
 */

/**
 * Approach 1: Two-pass with array for vowels
 * @param {string} s - Input string
 * @returns {number} Sum of max vowel frequency and max consonant frequency
 */
function maxFreqSum(s) {
    let map = {}
    for (let i = 0; i < s.length; i++) {
        if (!map[s[i]]) {
            map[s[i]] = 1
        } else {
            ++map[s[i]]
        }
    }

    let vowels = ['a', 'e', 'i', 'o', 'u']
    let maxVowels = 0
    let maxConsonant = 0
    for (let i = 0; i < s.length; i++) {
        if (vowels.includes(s[i])) {
            maxVowels = Math.max(map[s[i]], maxVowels)
        } else {
            maxConsonant = Math.max(map[s[i]], maxConsonant)
        }
    }
    return maxConsonant + maxVowels
}

/**
 * Approach 2: Single-pass with Set for vowels
 * @param {string} s - Input string
 * @returns {number} Sum of max vowel frequency and max consonant frequency
 */
function maxFreqSumApproach2(s) {
    let charMap = {}
    let vowelSet = new Set(['a', 'e', 'i', 'o', 'u']);
    let maxVowelSum = 0
    let maxConsonentSum = 0
    for (let item of s) {
        charMap[item] = (charMap[item] || 0) + 1;

        if (vowelSet.has(item)) {
            maxVowelSum = Math.max(maxVowelSum, charMap[item]);
        } else {
            maxConsonentSum = Math.max(maxConsonentSum, charMap[item]);
        }
    }
    return maxConsonentSum + maxVowelSum;
}

// Test cases
function testMaxFreqSum() {
    console.log("=== Maximum Frequency Sum ===\n");
    
    // Test case 1: Basic case
    console.log("Test Case 1: s = 'hello'");
    const s1 = "hello";
    console.log("Input:", s1);
    console.log("Approach 1 result:", maxFreqSum(s1));
    console.log("Approach 2 result:", maxFreqSumApproach2(s1));
    console.log("Expected: 3 (l=2, e=1)");
    console.log("Correct:", maxFreqSum(s1) === 3 && maxFreqSumApproach2(s1) === 3);
    console.log();
    
    // Test case 2: More complex case
    console.log("Test Case 2: s = 'leetcode'");
    const s2 = "leetcode";
    console.log("Input:", s2);
    console.log("Approach 1 result:", maxFreqSum(s2));
    console.log("Approach 2 result:", maxFreqSumApproach2(s2));
    console.log("Expected: 4 (e=3, t=1)");
    console.log("Correct:", maxFreqSum(s2) === 4 && maxFreqSumApproach2(s2) === 4);
    console.log();
    
    // Test case 3: All vowels
    console.log("Test Case 3: s = 'aeiou'");
    const s3 = "aeiou";
    console.log("Input:", s3);
    console.log("Approach 1 result:", maxFreqSum(s3));
    console.log("Approach 2 result:", maxFreqSumApproach2(s3));
    console.log("Expected: 1 (all vowels appear once)");
    console.log("Correct:", maxFreqSum(s3) === 1 && maxFreqSumApproach2(s3) === 1);
    console.log();
    
    // Test case 4: All consonants
    console.log("Test Case 4: s = 'bcdfg'");
    const s4 = "bcdfg";
    console.log("Input:", s4);
    console.log("Approach 1 result:", maxFreqSum(s4));
    console.log("Approach 2 result:", maxFreqSumApproach2(s4));
    console.log("Expected: 1 (all consonants appear once)");
    console.log("Correct:", maxFreqSum(s4) === 1 && maxFreqSumApproach2(s4) === 1);
    console.log();
    
    // Test case 5: Repeated characters
    console.log("Test Case 5: s = 'aaaabbbcc'");
    const s5 = "aaaabbbcc";
    console.log("Input:", s5);
    console.log("Approach 1 result:", maxFreqSum(s5));
    console.log("Approach 2 result:", maxFreqSumApproach2(s5));
    console.log("Expected: 7 (a=4, b=3)");
    console.log("Correct:", maxFreqSum(s5) === 7 && maxFreqSumApproach2(s5) === 7);
    console.log();
}

// Run the tests
testMaxFreqSum(); 