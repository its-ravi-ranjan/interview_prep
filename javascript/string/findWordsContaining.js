/**
 * Find Words Containing Character
 * 
 * Problem Statement:
 * You are given a 0-indexed array of strings words and a character x. 
 * Return an array of indices representing the words that contain the character x.
 * The returned array can be in any order.
 * 
 * Examples:
 * Input: words = ["leet","code"], x = "e"
 * Output: [0,1]
 * 
 * Input: words = ["abc","bcd","aaaa","cbc"], x = "a"
 * Output: [0,2]
 * 
 * Input: words = ["abc","bcd","aaaa","cbc"], x = "z"
 * Output: []
 * 
 * Approach:
 * Use two nested loops: Outer loop for each word, inner loop for each character in the word.
 * If character x is found in a word, push its index to the result array and break.
 * 
 * Time and Space Complexity:
 * Time Complexity: O(m × n) — where m is the number of words, and n is the max length of a word.
 * Space Complexity: O(1) — constant extra space (excluding result array).
 */

/**
 * Find indices of words containing the character x
 * @param {string[]} words - Array of strings
 * @param {string} x - Character to search for
 * @returns {number[]} Array of indices of words containing x
 */
function findWordsContaining(words, x) {
    let res = [];
    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < words[i].length; j++) {
            if (words[i][j] === x) {
                res.push(i);
                break;
            }
        }
    }
    return res;
}

// Test cases
function testFindWordsContaining() {
    console.log("=== Find Words Containing Character ===\n");
    
    // Test case 1: Basic case
    console.log("Test Case 1: words = ['leet','code'], x = 'e'");
    const words1 = ["leet", "code"];
    const x1 = "e";
    console.log("Input:", words1, "x =", x1);
    console.log("Result:", findWordsContaining(words1, x1));
    console.log("Expected: [0, 1]");
    console.log("Correct:", JSON.stringify(findWordsContaining(words1, x1).sort()) === JSON.stringify([0, 1]));
    console.log();
    
    // Test case 2: Character appears in multiple words
    console.log("Test Case 2: words = ['abc','bcd','aaaa','cbc'], x = 'a'");
    const words2 = ["abc", "bcd", "aaaa", "cbc"];
    const x2 = "a";
    console.log("Input:", words2, "x =", x2);
    console.log("Result:", findWordsContaining(words2, x2));
    console.log("Expected: [0, 2]");
    console.log("Correct:", JSON.stringify(findWordsContaining(words2, x2).sort()) === JSON.stringify([0, 2]));
    console.log();
    
    // Test case 3: Character not found
    console.log("Test Case 3: words = ['abc','bcd','aaaa','cbc'], x = 'z'");
    const words3 = ["abc", "bcd", "aaaa", "cbc"];
    const x3 = "z";
    console.log("Input:", words3, "x =", x3);
    console.log("Result:", findWordsContaining(words3, x3));
    console.log("Expected: []");
    console.log("Correct:", JSON.stringify(findWordsContaining(words3, x3)) === JSON.stringify([]));
    console.log();
    
    // Test case 4: Empty array
    console.log("Test Case 4: words = [], x = 'a'");
    const words4 = [];
    const x4 = "a";
    console.log("Input:", words4, "x =", x4);
    console.log("Result:", findWordsContaining(words4, x4));
    console.log("Expected: []");
    console.log("Correct:", JSON.stringify(findWordsContaining(words4, x4)) === JSON.stringify([]));
    console.log();
    
    // Test case 5: Single character words
    console.log("Test Case 5: words = ['a','b','c','d'], x = 'a'");
    const words5 = ["a", "b", "c", "d"];
    const x5 = "a";
    console.log("Input:", words5, "x =", x5);
    console.log("Result:", findWordsContaining(words5, x5));
    console.log("Expected: [0]");
    console.log("Correct:", JSON.stringify(findWordsContaining(words5, x5)) === JSON.stringify([0]));
    console.log();
}

// Run the tests
testFindWordsContaining(); 