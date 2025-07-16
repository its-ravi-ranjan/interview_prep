/**
 * Length of Last Word
 * 
 * Problem Statement:
 * Given a string s consisting of words and spaces, return the length of the last word in the string.
 * A word is defined as a maximal substring consisting of non-space characters only.
 * 
 * Examples:
 * Input: s = "Hello World"
 * Output: 5
 * 
 * Input: s = "   fly me   to   the moon  "
 * Output: 4
 * 
 * Input: s = "luffy is still joyboy"
 * Output: 6
 * 
 * Approach 1:
 * Start from the end of the string and skip any trailing spaces.
 * Count the number of characters in the last word until a space or the beginning of the string is reached.
 * This ensures we efficiently find the last word without extra space.
 * 
 * Approach 2:
 * Start from the end and skip trailing spaces.
 * Count characters until the next space or beginning of string.
 * This gives the length of the last word efficiently.
 * 
 * Time and Space Complexity:
 * Time Complexity: O(n) — Traverse the string once from the end.
 * Space Complexity: O(1) — No extra space used apart from counters.
 */

/**
 * Approach 1: Skip trailing spaces then count characters
 * @param {string} s - Input string
 * @returns {number} Length of the last word
 */
function lengthOfLastWord(s) {
    let n = s.length - 1;
    while (n >= 0 && s[n] === ' ') n--;

    let count = 0;
    while (n >= 0 && s[n] !== ' ') {
        count++;
        n--;
    }

    return count;
}

/**
 * Approach 2: Count characters until space is encountered
 * @param {string} s - Input string
 * @returns {number} Length of the last word
 */
function lengthOfLastWordApproach2(s) {
    let n = s.length - 1;
    let count = 0;

    while (n >= 0) {
        if (s[n] !== " ") {
            count++;
        } else if (count > 0) {
            break;
        }
        n--;
    }

    return count;
}

// Test cases
function testLengthOfLastWord() {
    console.log("=== Length of Last Word ===\n");
    
    // Test case 1: Simple case
    console.log("Test Case 1: 'Hello World'");
    const s1 = "Hello World";
    console.log("Input:", `"${s1}"`);
    console.log("Approach 1 result:", lengthOfLastWord(s1));
    console.log("Approach 2 result:", lengthOfLastWordApproach2(s1));
    console.log("Expected: 5");
    console.log("Correct:", lengthOfLastWord(s1) === 5 && lengthOfLastWordApproach2(s1) === 5);
    console.log();
    
    // Test case 2: Multiple spaces
    console.log("Test Case 2: '   fly me   to   the moon  '");
    const s2 = "   fly me   to   the moon  ";
    console.log("Input:", `"${s2}"`);
    console.log("Approach 1 result:", lengthOfLastWord(s2));
    console.log("Approach 2 result:", lengthOfLastWordApproach2(s2));
    console.log("Expected: 4");
    console.log("Correct:", lengthOfLastWord(s2) === 4 && lengthOfLastWordApproach2(s2) === 4);
    console.log();
    
    // Test case 3: Single word
    console.log("Test Case 3: 'luffy is still joyboy'");
    const s3 = "luffy is still joyboy";
    console.log("Input:", `"${s3}"`);
    console.log("Approach 1 result:", lengthOfLastWord(s3));
    console.log("Approach 2 result:", lengthOfLastWordApproach2(s3));
    console.log("Expected: 6");
    console.log("Correct:", lengthOfLastWord(s3) === 6 && lengthOfLastWordApproach2(s3) === 6);
    console.log();
    
    // Test case 4: Only spaces
    console.log("Test Case 4: '   '");
    const s4 = "   ";
    console.log("Input:", `"${s4}"`);
    console.log("Approach 1 result:", lengthOfLastWord(s4));
    console.log("Approach 2 result:", lengthOfLastWordApproach2(s4));
    console.log("Expected: 0");
    console.log("Correct:", lengthOfLastWord(s4) === 0 && lengthOfLastWordApproach2(s4) === 0);
    console.log();
}

// Run the tests
testLengthOfLastWord(); 