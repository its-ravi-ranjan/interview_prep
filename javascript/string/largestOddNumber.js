/**
 * Largest Odd Number in String
 * 
 * Problem: Given a string num representing a large integer, return the largest-valued 
 * odd integer (as a string) that is a non-empty substring of num, or an empty string "" 
 * if no odd integer exists.
 * 
 * A substring is a contiguous sequence of characters within a string.
 * 
 * Example:
 * Input: num = "52"
 * Output: "5"
 * Explanation: The only non-empty substrings are "5", "2", and "52". "5" is the only odd number.
 * 
 * Input: num = "4206"
 * Output: ""
 * Explanation: There are no odd numbers in "4206".
 * 
 * Input: num = "35427"
 * Output: "35427"
 * Explanation: "35427" is already an odd number.
 * 
 * Approach:
 * 1. Start from the end of the string and move backward
 * 2. Check if the current digit is odd using modulus % 2
 * 3. If an odd digit is found, return the substring from index 0 to that digit (inclusive)
 * 4. If no odd digit exists in the string, return an empty string
 * 
 * Time Complexity: O(n), where n is the length of the string
 * Space Complexity: O(1), no extra space used
 */

/**
 * Find the largest odd number that can be formed by removing trailing even digits
 * @param {string} num - The input numeric string
 * @returns {string} - The largest odd number as string, or empty string if no odd number exists
 */
var largestOddNumber = function(num) {
    let n = num.length - 1;
    while (n >= 0) {
        if (Number(num[n]) % 2 == 1) {
            return num.substring(0, n + 1);
        }
        --n;
    }
    return "";
};

// Alternative implementation using character comparison
var largestOddNumberAlternative = function(num) {
    let n = num.length - 1;
    while (n >= 0) {
        const digit = num[n];
        if (digit === '1' || digit === '3' || digit === '5' || digit === '7' || digit === '9') {
            return num.substring(0, n + 1);
        }
        --n;
    }
    return "";
};

// Test cases
function runTests() {
    console.log("=== Largest Odd Number Tests ===\n");
    
    const testCases = [
        {
            input: "52",
            expected: "5",
            description: "Simple case with one odd digit"
        },
        {
            input: "4206",
            expected: "",
            description: "No odd digits"
        },
        {
            input: "35427",
            expected: "35427",
            description: "Already odd number"
        },
        {
            input: "123456",
            expected: "12345",
            description: "Remove trailing even digit"
        },
        {
            input: "2468",
            expected: "",
            description: "All even digits"
        },
        {
            input: "13579",
            expected: "13579",
            description: "All odd digits"
        },
        {
            input: "1000",
            expected: "1",
            description: "Single odd digit at start"
        },
        {
            input: "9999",
            expected: "9999",
            description: "All nines"
        },
        {
            input: "0",
            expected: "",
            description: "Single zero"
        },
        {
            input: "1",
            expected: "1",
            description: "Single one"
        },
        {
            input: "1234567890",
            expected: "123456789",
            description: "Remove trailing zero"
        },
        {
            input: "246813579",
            expected: "246813579",
            description: "Odd digit at end"
        }
    ];
    
    let passed1 = 0;
    let failed1 = 0;
    let passed2 = 0;
    let failed2 = 0;
    
    console.log("Testing Approach 1 (Modulus):");
    console.log("=============================");
    
    testCases.forEach((testCase, index) => {
        const result = largestOddNumber(testCase.input);
        const status = result === testCase.expected ? "PASS" : "FAIL";
        
        console.log(`Test ${index + 1}: ${status}`);
        console.log(`Input: "${testCase.input}"`);
        console.log(`Expected: "${testCase.expected}", Got: "${result}"`);
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
    
    console.log("\n\nTesting Approach 2 (Character Comparison):");
    console.log("==========================================");
    
    testCases.forEach((testCase, index) => {
        const result = largestOddNumberAlternative(testCase.input);
        const status = result === testCase.expected ? "PASS" : "FAIL";
        
        console.log(`Test ${index + 1}: ${status}`);
        console.log(`Input: "${testCase.input}"`);
        console.log(`Expected: "${testCase.expected}", Got: "${result}"`);
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
    
    // Create long strings for testing
    const longEvenString = "2468".repeat(1000); // 4000 chars, all even
    const longOddString = "13579".repeat(1000); // 5000 chars, all odd
    const mixedString = "1234567890".repeat(500); // 5000 chars, mixed
    
    // Test Approach 1
    const start1 = performance.now();
    largestOddNumber(longEvenString);
    const end1 = performance.now();
    
    const start2 = performance.now();
    largestOddNumber(longOddString);
    const end2 = performance.now();
    
    const start3 = performance.now();
    largestOddNumber(mixedString);
    const end3 = performance.now();
    
    // Test Approach 2
    const start4 = performance.now();
    largestOddNumberAlternative(longEvenString);
    const end4 = performance.now();
    
    const start5 = performance.now();
    largestOddNumberAlternative(longOddString);
    const end5 = performance.now();
    
    const start6 = performance.now();
    largestOddNumberAlternative(mixedString);
    const end6 = performance.now();
    
    console.log("Approach 1 (Modulus):");
    console.log(`Long even string (${longEvenString.length} chars): ${(end1 - start1).toFixed(3)}ms`);
    console.log(`Long odd string (${longOddString.length} chars): ${(end2 - start2).toFixed(3)}ms`);
    console.log(`Mixed string (${mixedString.length} chars): ${(end3 - start3).toFixed(3)}ms`);
    
    console.log("\nApproach 2 (Character Comparison):");
    console.log(`Long even string (${longEvenString.length} chars): ${(end4 - start4).toFixed(3)}ms`);
    console.log(`Long odd string (${longOddString.length} chars): ${(end5 - start5).toFixed(3)}ms`);
    console.log(`Mixed string (${mixedString.length} chars): ${(end6 - start6).toFixed(3)}ms`);
}

// Dry run demonstration
function dryRun() {
    console.log("\n=== Dry Run ===");
    const num = "123456";
    console.log("Input: \"" + num + "\"");
    
    let n = num.length - 1;
    let step = 1;
    
    console.log("\nStep-by-step execution:");
    while (n >= 0) {
        console.log(`\nStep ${step}:`);
        console.log(`n = ${n}, digit = '${num[n]}'`);
        console.log(`Number(${num[n]}) % 2 = ${Number(num[n]) % 2}`);
        
        if (Number(num[n]) % 2 == 1) {
            console.log(`Found odd digit '${num[n]}' at index ${n}`);
            console.log(`Returning substring(0, ${n + 1}) = "${num.substring(0, n + 1)}"`);
            console.log("Result: \"" + num.substring(0, n + 1) + "\"");
            return;
        } else {
            console.log(`Digit '${num[n]}' is even, decrementing n`);
        }
        --n;
        step++;
    }
    
    console.log("\nNo odd digit found, returning empty string");
    console.log("Result: \"\"");
}

// Run tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { largestOddNumber, largestOddNumberAlternative };
} else {
    runTests();
    performanceTest();
    dryRun();
} 