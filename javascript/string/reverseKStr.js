/**
 * Reverse String II
 * 
 * Problem Statement:
 * The problem requires reversing the first k characters for every 2k characters in a string. 
 * If there are fewer than k characters left, reverse all of them. 
 * If there are between k and 2k characters left, reverse the first k and leave the rest as is.
 * 
 * Examples:
 * Input: s = "abcdefg", k = 2
 * Output: "bacdfeg"
 * Explanation: 
 * - For the first 2k = 4 characters: reverse first k = 2 characters -> "bacd"
 * - For the remaining 3 characters: reverse first k = 2 characters -> "feg" becomes "feg"
 * 
 * Input: s = "abcd", k = 2
 * Output: "bacd"
 * Explanation: Reverse first 2 characters, leave the rest as is.
 * 
 * Steps:
 * Convert the string into a character array (if needed).
 * Iterate over the array in steps of 2k.
 * At each step, reverse the next k characters if available.
 * Join or return the modified string.
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n), where n = length of the string
 * Space Complexity: O(1) if in-place, else O(n)
 */

/**
 * Reverse the first k characters for every 2k characters in a string
 * @param {string} s - Input string
 * @param {number} k - Number of characters to reverse in each group
 * @returns {string} Modified string with reversed characters
 */
function reverseStr(s, k) {
    s = s.split("");

    for (let x = 0; x < s.length; x = x + (2 * k)) {
        let n = Math.min(k, s.length - x);
        let mid = Math.floor(n / 2);
        for (let i = 0; i < mid; i++) {
            let temp = s[x + i];
            s[x + i] = s[x + n - 1 - i];
            s[x + n - 1 - i] = temp;
        }
    }
    return s.join("");
}

// Test cases
function testReverseStr() {
    console.log("=== Reverse String II ===\n");
    
    // Test case 1: Basic case
    console.log("Test Case 1: s = 'abcdefg', k = 2");
    const s1 = "abcdefg";
    const k1 = 2;
    console.log("Input: s =", s1, ", k =", k1);
    console.log("Result:", reverseStr(s1, k1));
    console.log("Expected: 'bacdfeg'");
    console.log("Explanation: Reverse first 2 chars of every 4 chars");
    console.log("Correct:", reverseStr(s1, k1) === "bacdfeg");
    console.log();
    
    // Test case 2: String length less than 2k
    console.log("Test Case 2: s = 'abcd', k = 2");
    const s2 = "abcd";
    const k2 = 2;
    console.log("Input: s =", s2, ", k =", k2);
    console.log("Result:", reverseStr(s2, k2));
    console.log("Expected: 'bacd'");
    console.log("Explanation: Reverse first 2 chars, leave rest as is");
    console.log("Correct:", reverseStr(s2, k2) === "bacd");
    console.log();
    
    // Test case 3: String length exactly 2k
    console.log("Test Case 3: s = 'abcdef', k = 3");
    const s3 = "abcdef";
    const k3 = 3;
    console.log("Input: s =", s3, ", k =", k3);
    console.log("Result:", reverseStr(s3, k3));
    console.log("Expected: 'cbadef'");
    console.log("Explanation: Reverse first 3 chars of 6 chars");
    console.log("Correct:", reverseStr(s3, k3) === "cbadef");
    console.log();
    
    // Test case 4: k = 1
    console.log("Test Case 4: s = 'hello', k = 1");
    const s4 = "hello";
    const k4 = 1;
    console.log("Input: s =", s4, ", k =", k4);
    console.log("Result:", reverseStr(s4, k4));
    console.log("Expected: 'hello'");
    console.log("Explanation: Reverse every other character");
    console.log("Correct:", reverseStr(s4, k4) === "hello");
    console.log();
    
    // Test case 5: k larger than string length
    console.log("Test Case 5: s = 'abc', k = 5");
    const s5 = "abc";
    const k5 = 5;
    console.log("Input: s =", s5, ", k =", k5);
    console.log("Result:", reverseStr(s5, k5));
    console.log("Expected: 'cba'");
    console.log("Explanation: Reverse all characters since k > string length");
    console.log("Correct:", reverseStr(s5, k5) === "cba");
    console.log();
}

// Run the tests
testReverseStr(); 