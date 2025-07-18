/**
 * Longest Substring Without Repeating Characters
 * 
 * Problem: Given a string s, find the length of the longest substring without duplicate characters.
 * 
 * Example 1:
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3.
 * 
 * Example 2:
 * Input: s = "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with the length of 1.
 * 
 * Example 3:
 * Input: s = "pwwkew"
 * Output: 3
 * Explanation: The answer is "wke", with the length of 3.
 * 
 * Approach (Sliding Window with Two Pointers):
 * 1. Use two pointers (left and right) to maintain a sliding window
 * 2. Use a Set to track unique characters in the current window
 * 3. Expand the window by moving right pointer until we encounter a duplicate
 * 4. Contract the window by moving left pointer until we remove the duplicate
 * 5. Track the maximum length of valid windows
 * 6. Return the maximum length found
 * 
 * Key Insights:
 * - When we encounter a duplicate, we need to remove characters from left until the duplicate is removed
 * - The window always contains unique characters
 * - We update maxLength whenever we expand the window successfully
 * 
 * Time Complexity: O(n), where n is the length of the string
 * Space Complexity: O(min(m, n)), where m is the size of the character set
 */

/**
 * Find the length of the longest substring without repeating characters
 * @param {string} s - Input string
 * @returns {number} - Length of longest substring without repeating characters
 */
var lengthOfLongestSubstring = function(s) {
    let maxLength = 0;
    const set = new Set();
    let left = 0;
    let right = 0;
    
    while (right < s.length) {
        const c = s.charAt(right);
        
        if (!set.has(c)) {
            set.add(c);
            maxLength = Math.max(maxLength, right - left + 1);
            right++;
        } else {
            set.delete(s.charAt(left));
            left++;
        }
    }
    
    return maxLength;
};

/**
 * Alternative approach: Using Map to track character positions
 * @param {string} s - Input string
 * @returns {number} - Length of longest substring without repeating characters
 */
var lengthOfLongestSubstringMap = function(s) {
    const charMap = new Map();
    let maxLength = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s.charAt(right);
        
        if (charMap.has(char)) {
            // Move left pointer to the position after the last occurrence of current character
            left = Math.max(left, charMap.get(char) + 1);
        }
        
        charMap.set(char, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
};

/**
 * Brute Force Approach (for comparison)
 * Time Complexity: O(n²)
 * Space Complexity: O(min(m, n))
 * @param {string} s - Input string
 * @returns {number} - Length of longest substring without repeating characters
 */
var lengthOfLongestSubstringBruteForce = function(s) {
    let maxLength = 0;
    
    for (let start = 0; start < s.length; start++) {
        const set = new Set();
        let currentLength = 0;
        
        for (let end = start; end < s.length; end++) {
            const char = s.charAt(end);
            
            if (set.has(char)) {
                break;
            }
            
            set.add(char);
            currentLength++;
        }
        
        maxLength = Math.max(maxLength, currentLength);
    }
    
    return maxLength;
};

/**
 * Find the longest substring without repeating characters (returns both length and substring)
 * @param {string} s - Input string
 * @returns {object} - Object containing length and substring
 */
var lengthOfLongestSubstringWithSubstring = function(s) {
    let maxLength = 0;
    let maxStart = 0;
    const set = new Set();
    let left = 0;
    let right = 0;
    
    while (right < s.length) {
        const c = s.charAt(right);
        
        if (!set.has(c)) {
            set.add(c);
            const currentLength = right - left + 1;
            if (currentLength > maxLength) {
                maxLength = currentLength;
                maxStart = left;
            }
            right++;
        } else {
            set.delete(s.charAt(left));
            left++;
        }
    }
    
    const substring = s.substring(maxStart, maxStart + maxLength);
    return { length: maxLength, substring: substring };
};

// Test cases
function runTests() {
    console.log("=== Longest Substring Without Repeating Characters Tests ===");
    
    const testCases = [
        {
            input: "abcabcbb",
            expected: 3,
            description: "Standard case with repeating characters"
        },
        {
            input: "bbbbb",
            expected: 1,
            description: "All characters are the same"
        },
        {
            input: "pwwkew",
            expected: 3,
            description: "Multiple valid substrings"
        },
        {
            input: "",
            expected: 0,
            description: "Empty string"
        },
        {
            input: "a",
            expected: 1,
            description: "Single character"
        },
        {
            input: "abcdef",
            expected: 6,
            description: "All unique characters"
        },
        {
            input: "dvdf",
            expected: 3,
            description: "Substring in middle"
        },
        {
            input: "anviaj",
            expected: 5,
            description: "Complex case with multiple duplicates"
        }
    ];
    
    testCases.forEach((testCase, index) => {
        const result = lengthOfLongestSubstring(testCase.input);
        const status = result === testCase.expected ? "PASS" : "FAIL";
        console.log(`Test ${index + 1}: ${status} - ${testCase.description}`);
        console.log(`  Input: "${testCase.input}"`);
        console.log(`  Expected: ${testCase.expected}, Got: ${result}`);
        console.log();
    });
}

// Performance comparison
function performanceTest() {
    console.log("=== Performance Comparison ===");
    
    // Create test strings
    const testStrings = [
        "abcabcbb".repeat(1000), // Large string with repeats
        "abcdefghijklmnopqrstuvwxyz".repeat(100), // Large string with unique chars
        "a".repeat(10000) // Large string with same character
    ];
    
    testStrings.forEach((s, index) => {
        console.log(`Test ${index + 1}: String length = ${s.length}`);
        
        // Test Set approach
        const start1 = performance.now();
        const result1 = lengthOfLongestSubstring(s);
        const end1 = performance.now();
        console.log(`  Set Approach: ${result1} (${(end1 - start1).toFixed(4)}ms)`);
        
        // Test Map approach
        const start2 = performance.now();
        const result2 = lengthOfLongestSubstringMap(s);
        const end2 = performance.now();
        console.log(`  Map Approach: ${result2} (${(end2 - start2).toFixed(4)}ms)`);
        
        // Test Brute Force (only for small strings)
        if (s.length <= 100) {
            const start3 = performance.now();
            const result3 = lengthOfLongestSubstringBruteForce(s);
            const end3 = performance.now();
            console.log(`  Brute Force: ${result3} (${(end3 - start3).toFixed(4)}ms)`);
        }
        
        console.log();
    });
}

// Dry run demonstration
function dryRun() {
    console.log("=== Dry Run Demonstration ===");
    
    const s = "abcabcbb";
    console.log(`Input: "${s}"`);
    console.log();
    
    let maxLength = 0;
    const set = new Set();
    let left = 0;
    let right = 0;
    
    console.log("Window expansion and contraction:");
    
    while (right < s.length) {
        const c = s.charAt(right);
        console.log(`Step ${right}: Processing '${c}' at position ${right}`);
        console.log(`  Current window: [${left}, ${right}] = "${s.substring(left, right)}"`);
        console.log(`  Set: {${Array.from(set).join(', ')}}`);
        
        if (!set.has(c)) {
            set.add(c);
            const currentLength = right - left + 1;
            maxLength = Math.max(maxLength, currentLength);
            console.log(`  Added '${c}' to set`);
            console.log(`  Current length: ${currentLength}, Max length: ${maxLength}`);
            right++;
        } else {
            const removedChar = s.charAt(left);
            set.delete(removedChar);
            console.log(`  Removed '${removedChar}' from set (duplicate found)`);
            left++;
        }
        
        console.log();
    }
    
    console.log(`Final result: ${maxLength}`);
}

// Edge cases demonstration
function edgeCases() {
    console.log("=== Edge Cases ===");
    
    const edgeCases = [
        { input: "", name: "Empty string" },
        { input: "a", name: "Single character" },
        { input: "aa", name: "Two same characters" },
        { input: "ab", name: "Two different characters" },
        { input: "aaa", name: "Three same characters" },
        { input: "abc", name: "Three different characters" },
        { input: "abcdefghijklmnopqrstuvwxyz", name: "All lowercase letters" },
        { input: "1234567890", name: "All digits" }
    ];
    
    edgeCases.forEach(testCase => {
        const result = lengthOfLongestSubstring(testCase.input);
        console.log(`${testCase.name}: "${testCase.input}" → ${result}`);
    });
}

// Demonstrate finding substring with additional information
function demonstrateWithSubstring() {
    console.log("\n=== Finding Substring with Additional Information ===");
    
    const testStrings = ["abcabcbb", "pwwkew", "dvdf", "anviaj"];
    
    testStrings.forEach(s => {
        const result = lengthOfLongestSubstringWithSubstring(s);
        console.log(`Input: "${s}"`);
        console.log(`  Length: ${result.length}`);
        console.log(`  Substring: "${result.substring}"`);
        console.log();
    });
}

// Run all demonstrations
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        lengthOfLongestSubstring, 
        lengthOfLongestSubstringMap, 
        lengthOfLongestSubstringBruteForce,
        lengthOfLongestSubstringWithSubstring 
    };
} else {
    runTests();
    console.log();
    performanceTest();
    console.log();
    dryRun();
    console.log();
    edgeCases();
    demonstrateWithSubstring();
} 