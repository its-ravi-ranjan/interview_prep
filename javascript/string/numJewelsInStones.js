/**
 * Jewels and Stones
 * 
 * Problem Statement:
 * You're given strings jewels representing the types of stones that are jewels, 
 * and stones representing the stones you have. Each character in stones is a type 
 * of stone you have. You want to know how many of the stones you have are also jewels.
 * 
 * Letters are case sensitive, so "a" is different from "A".
 * jewels and stones consist of only English letters.
 * All characters in jewels are unique.
 * 
 * Examples:
 * Input: jewels = "aA", stones = "aAAbbbb"
 * Output: 3
 * 
 * Input: jewels = "z", stones = "ZZ"
 * Output: 0
 * 
 * Approach 1:
 * Use two nested loops: Outer loop over stones, inner loop over jewels.
 * If a character in stones matches any in jewels, increment the count.
 * Break inner loop once matched to avoid redundant checks.
 * 
 * Approach 2:
 * Use a Set (or hash set) to store all characters from jewels.
 * Loop through each character in stones.
 * Increment a counter for every character found in the jewels set.
 * 
 * Time and Space Complexity:
 * Approach 1: Time O(m × n), Space O(1)
 * Approach 2: Time O(n + m), Space O(1)
 */

/**
 * Approach 1: Nested loops
 * @param {string} jewels - String representing jewel types
 * @param {string} stones - String representing stones you have
 * @returns {number} Number of stones that are jewels
 */
function numJewelsInStones(jewels, stones) {
    let count = 0;
    for (let i = 0; i < stones.length; i++) {
        for (let j = 0; j < jewels.length; j++) {
            if (jewels[j] === stones[i]) {
                ++count;
                break;
            }
        }
    }
    return count;
}

/**
 * Approach 2: Using Set
 * @param {string} jewels - String representing jewel types
 * @param {string} stones - String representing stones you have
 * @returns {number} Number of stones that are jewels
 */
function numJewelsInStonesApproach2(jewels, stones) {
    let jSet = new Set(jewels);
    let count = 0;
    for (let c of stones) {
        if (jSet.has(c)) count++;
    }
    return count;
}

// Test cases
function testNumJewelsInStones() {
    console.log("=== Jewels and Stones ===\n");
    
    // Test case 1: Basic case
    console.log("Test Case 1: jewels = 'aA', stones = 'aAAbbbb'");
    const jewels1 = "aA";
    const stones1 = "aAAbbbb";
    console.log("Input: jewels =", jewels1, ", stones =", stones1);
    console.log("Approach 1 result:", numJewelsInStones(jewels1, stones1));
    console.log("Approach 2 result:", numJewelsInStonesApproach2(jewels1, stones1));
    console.log("Expected: 3");
    console.log("Correct:", numJewelsInStones(jewels1, stones1) === 3 && 
                numJewelsInStonesApproach2(jewels1, stones1) === 3);
    console.log();
    
    // Test case 2: No matches
    console.log("Test Case 2: jewels = 'z', stones = 'ZZ'");
    const jewels2 = "z";
    const stones2 = "ZZ";
    console.log("Input: jewels =", jewels2, ", stones =", stones2);
    console.log("Approach 1 result:", numJewelsInStones(jewels2, stones2));
    console.log("Approach 2 result:", numJewelsInStonesApproach2(jewels2, stones2));
    console.log("Expected: 0");
    console.log("Correct:", numJewelsInStones(jewels2, stones2) === 0 && 
                numJewelsInStonesApproach2(jewels2, stones2) === 0);
    console.log();
    
    // Test case 3: All stones are jewels
    console.log("Test Case 3: jewels = 'abc', stones = 'abcabc'");
    const jewels3 = "abc";
    const stones3 = "abcabc";
    console.log("Input: jewels =", jewels3, ", stones =", stones3);
    console.log("Approach 1 result:", numJewelsInStones(jewels3, stones3));
    console.log("Approach 2 result:", numJewelsInStonesApproach2(jewels3, stones3));
    console.log("Expected: 6");
    console.log("Correct:", numJewelsInStones(jewels3, stones3) === 6 && 
                numJewelsInStonesApproach2(jewels3, stones3) === 6);
    console.log();
    
    // Test case 4: Empty strings
    console.log("Test Case 4: jewels = '', stones = 'abc'");
    const jewels4 = "";
    const stones4 = "abc";
    console.log("Input: jewels =", jewels4, ", stones =", stones4);
    console.log("Approach 1 result:", numJewelsInStones(jewels4, stones4));
    console.log("Approach 2 result:", numJewelsInStonesApproach2(jewels4, stones4));
    console.log("Expected: 0");
    console.log("Correct:", numJewelsInStones(jewels4, stones4) === 0 && 
                numJewelsInStonesApproach2(jewels4, stones4) === 0);
    console.log();
}

// Run the tests
testNumJewelsInStones(); 