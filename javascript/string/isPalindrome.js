/**
 * Valid Palindrome - First Approach
 * 
 * Problem: Given a string s, return true if it is a palindrome, or false otherwise.
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase letters 
 * and removing all non-alphanumeric characters, it reads the same forward and backward.
 * 
 * Example:
 * Input: s = "A man, a plan, a canal: Panama"
 * Output: true
 * Explanation: "amanaplanacanalpanama" is a palindrome.
 * 
 * Input: s = "race a car"
 * Output: false
 * Explanation: "raceacar" is not a palindrome.
 * 
 * Input: s = " "
 * Output: true
 * Explanation: s is an empty string "" after removing non-alphanumeric characters.
 * Since an empty string reads the same forward and backward, it is a palindrome.
 * 
 * Approach 1:
 * 1. Convert the string to lowercase to ensure case-insensitive comparison
 * 2. Traverse each character in the string
 * 3. Keep only alphanumeric characters using regex match
 * 4. Build a filtered version and its reverse simultaneously
 * 5. Return true if both strings are equal, else return false
 * 
 * Time Complexity: O(n), where n is the length of the input string
 * Space Complexity: O(n), due to additional filtered and reversed strings
 * 
 * Approach 2 (Two-Pointer):
 * 1. Convert the string to lowercase to simplify comparison
 * 2. Initialize two pointers: one at the start and one at the end of the string
 * 3. Move both pointers toward the center while skipping non-alphanumeric characters
 * 4. Compare the characters at both pointers
 * 5. If they differ, return false. If they match, continue moving
 * 6. If all valid characters match, return true
 * 
 * Time Complexity: O(n), where n is the length of the string
 * Space Complexity: O(1), since no extra space is used beyond pointers
 */

/**
 * Check if a string is a palindrome (case-insensitive, alphanumeric only)
 * Approach 1: String filtering and reversal
 * @param {string} s - The input string
 * @returns {boolean} - True if palindrome, false otherwise
 */
var isPalindrome = function(s) {
    s = s.toLowerCase();
    let filteredString = "";
    let rev = "";
    
    for (let i = 0; i < s.length; i++) {
        if (s[i].match(/[a-z0-9]/i)) {
            filteredString = filteredString + s[i];
            rev = s[i] + rev;
        }
    }
    
    return filteredString === rev;
};

/**
 * Check if a string is a palindrome (case-insensitive, alphanumeric only)
 * Approach 2: Two-pointer method (more space efficient)
 * @param {string} s - The input string
 * @returns {boolean} - True if palindrome, false otherwise
 */
var isPalindromeTwoPointer = function(s) {
    s = s.toLowerCase();
    let i = 0;
    let j = s.length - 1;
    
    while (i < j) {
        if (!s[i].match(/[a-z0-9]/i)) {
            ++i;
        }
        else if (!s[j].match(/[a-z0-9]/i)) {
            --j;
        }
        else if (s[i] === s[j]) {
            ++i;
            --j;
        }
        else {
            return false;
        }
    }
    return true;
};

// Test cases
function runTests() {
    console.log("=== Valid Palindrome Tests ===\n");
    
    const testCases = [
        {
            input: "A man, a plan, a canal: Panama",
            expected: true,
            description: "Complex palindrome with punctuation"
        },
        {
            input: "race a car",
            expected: false,
            description: "Not a palindrome"
        },
        {
            input: " ",
            expected: true,
            description: "Empty string"
        },
        {
            input: "racecar",
            expected: true,
            description: "Simple palindrome"
        },
        {
            input: "hello",
            expected: false,
            description: "Not a palindrome"
        },
        {
            input: "12321",
            expected: true,
            description: "Numeric palindrome"
        },
        {
            input: "A1b2C3c2b1a",
            expected: true,
            description: "Alphanumeric palindrome"
        },
        {
            input: ".,",
            expected: true,
            description: "Only non-alphanumeric characters"
        },
        {
            input: "0P",
            expected: false,
            description: "Two characters, not palindrome"
        },
        {
            input: "Madam, I'm Adam",
            expected: true,
            description: "Palindrome with spaces and punctuation"
        }
    ];
    
    let passed1 = 0;
    let failed1 = 0;
    let passed2 = 0;
    let failed2 = 0;
    
    console.log("Testing Approach 1 (String Filtering):");
    console.log("=====================================");
    
    testCases.forEach((testCase, index) => {
        const result = isPalindrome(testCase.input);
        const status = result === testCase.expected ? "PASS" : "FAIL";
        
        console.log(`Test ${index + 1}: ${status}`);
        console.log(`Input: "${testCase.input}"`);
        console.log(`Expected: ${testCase.expected}, Got: ${result}`);
        console.log(`Description: ${testCase.description}`);
        console.log(`---`);
        
        if (result === testCase.expected) {
            passed1++;
        } else {
            failed1++;
        }
    });
    
    console.log(`\nApproach 1 Summary: ${passed1} passed, ${failed1} failed`);
    console.log(`Success Rate: ${((passed1 / testCases.length) * 100).toFixed(1)}%`);
    
    console.log("\n\nTesting Approach 2 (Two-Pointer):");
    console.log("=================================");
    
    testCases.forEach((testCase, index) => {
        const result = isPalindromeTwoPointer(testCase.input);
        const status = result === testCase.expected ? "PASS" : "FAIL";
        
        console.log(`Test ${index + 1}: ${status}`);
        console.log(`Input: "${testCase.input}"`);
        console.log(`Expected: ${testCase.expected}, Got: ${result}`);
        console.log(`Description: ${testCase.description}`);
        console.log(`---`);
        
        if (result === testCase.expected) {
            passed2++;
        } else {
            failed2++;
        }
    });
    
    console.log(`\nApproach 2 Summary: ${passed2} passed, ${failed2} failed`);
    console.log(`Success Rate: ${((passed2 / testCases.length) * 100).toFixed(1)}%`);
}

// Performance test
function performanceTest() {
    console.log("\n=== Performance Test ===");
    
    const longPalindrome = "A".repeat(10000) + "B".repeat(10000) + "A".repeat(10000);
    const longNonPalindrome = "A".repeat(10000) + "B".repeat(10000) + "C".repeat(10000);
    
    // Test Approach 1
    const start1 = performance.now();
    isPalindrome(longPalindrome);
    const end1 = performance.now();
    
    const start2 = performance.now();
    isPalindrome(longNonPalindrome);
    const end2 = performance.now();
    
    // Test Approach 2
    const start3 = performance.now();
    isPalindromeTwoPointer(longPalindrome);
    const end3 = performance.now();
    
    const start4 = performance.now();
    isPalindromeTwoPointer(longNonPalindrome);
    const end4 = performance.now();
    
    console.log("Approach 1 (String Filtering):");
    console.log(`Long palindrome (${longPalindrome.length} chars): ${(end1 - start1).toFixed(3)}ms`);
    console.log(`Long non-palindrome (${longNonPalindrome.length} chars): ${(end2 - start2).toFixed(3)}ms`);
    
    console.log("\nApproach 2 (Two-Pointer):");
    console.log(`Long palindrome (${longPalindrome.length} chars): ${(end3 - start3).toFixed(3)}ms`);
    console.log(`Long non-palindrome (${longNonPalindrome.length} chars): ${(end4 - start4).toFixed(3)}ms`);
}

// Dry run demonstration for two-pointer approach
function dryRunTwoPointer() {
    console.log("\n=== Dry Run - Two-Pointer Approach ===");
    const s = "A man, a plan, a canal: Panama";
    console.log("Input: \"" + s + "\"");
    
    const lowerS = s.toLowerCase();
    console.log("After toLowerCase(): \"" + lowerS + "\"");
    
    let i = 0;
    let j = lowerS.length - 1;
    let step = 1;
    
    console.log("\nStep-by-step execution:");
    while (i < j) {
        console.log(`\nStep ${step}:`);
        console.log(`i = ${i}, j = ${j}`);
        console.log(`s[i] = '${lowerS[i]}', s[j] = '${lowerS[j]}'`);
        
        if (!lowerS[i].match(/[a-z0-9]/i)) {
            console.log(`s[i] = '${lowerS[i]}' is not alphanumeric, incrementing i`);
            ++i;
        }
        else if (!lowerS[j].match(/[a-z0-9]/i)) {
            console.log(`s[j] = '${lowerS[j]}' is not alphanumeric, decrementing j`);
            --j;
        }
        else if (lowerS[i] === lowerS[j]) {
            console.log(`s[i] = '${lowerS[i]}' equals s[j] = '${lowerS[j]}', moving both pointers`);
            ++i;
            --j;
        }
        else {
            console.log(`s[i] = '${lowerS[i]}' != s[j] = '${lowerS[j]}', returning false`);
            console.log("Result: false");
            return;
        }
        step++;
    }
    
    console.log(`\nLoop ended: i = ${i}, j = ${j}`);
    console.log("Result: true");
}

// Run tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { isPalindrome, isPalindromeTwoPointer };
} else {
    runTests();
    performanceTest();
    dryRunTwoPointer();
} 