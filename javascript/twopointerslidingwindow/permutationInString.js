/**
 * Permutation in String (LeetCode 567)
 * 
 * Problem: Given two strings s1 and s2, return true if s2 contains a permutation of s1, 
 * or false otherwise. In other words, return true if one of s1's permutations is the 
 * substring of s2.
 * 
 * Example:
 * Input: s1 = "ab", s2 = "eidbaooo"
 * Output: true
 * Explanation: s2 contains one permutation of s1 ("ba").
 * 
 * Input: s1 = "ab", s2 = "eidboaoo"
 * Output: false
 * 
 * Approach: Sliding Window with Character Frequency Counting
 * 1. Use two arrays to track character frequencies of s1 and current window in s2
 * 2. Initialize the window with the first s1.length() characters of s2
 * 3. Slide the window one character at a time, updating frequencies
 * 4. Compare frequencies at each step
 * 
 * Time Complexity: O(n) where n is the length of s2
 * Space Complexity: O(1) since we use fixed-size arrays (26 characters)
 */

/**
 * Main function to check if s2 contains a permutation of s1
 * @param {string} s1 - The string to find permutation of
 * @param {string} s2 - The string to search in
 * @returns {boolean} - True if permutation found, false otherwise
 */
function permutationInString(s1, s2) {
    // If s1 is longer than s2, no permutation can exist
    if (s1.length > s2.length) {
        return false;
    }
    
    // Arrays to track character frequencies
    const hashS1 = new Array(26).fill(0);  // Frequency of characters in s1
    const hashS2 = new Array(26).fill(0);  // Frequency of characters in current window of s2
    
    let left = 0;
    let right = s1.length - 1;
    
    // Initialize frequency arrays with first window
    for (let i = 0; i < s1.length; i++) {
        hashS1[s1.charCodeAt(i) - 97]++;  // 'a' has ASCII code 97
        hashS2[s2.charCodeAt(i) - 97]++;
    }
    
    // Slide the window and check for matches
    while (right < s2.length) {
        if (isHashSame(hashS1, hashS2)) {
            return true;
        }
        
        right++;
        if (right < s2.length) {
            // Remove leftmost character from window
            hashS2[s2.charCodeAt(left) - 97]--;
            left++;
            // Add rightmost character to window
            hashS2[s2.charCodeAt(right) - 97]++;
        }
    }
    
    return false;
}

/**
 * Helper function to compare two frequency arrays
 * @param {number[]} hashS1 - Frequency array for s1
 * @param {number[]} hashS2 - Frequency array for current window
 * @returns {boolean} - True if arrays are identical
 */
function isHashSame(hashS1, hashS2) {
    for (let i = 0; i < 26; i++) {
        if (hashS1[i] !== hashS2[i]) {
            return false;
        }
    }
    return true;
}

/**
 * Alternative approach using a single frequency array
 * More efficient as it reduces the number of comparisons
 * @param {string} s1 - The string to find permutation of
 * @param {string} s2 - The string to search in
 * @returns {boolean} - True if permutation found, false otherwise
 */
function permutationInStringOptimized(s1, s2) {
    if (s1.length > s2.length) {
        return false;
    }
    
    const count = new Array(26).fill(0);
    let matches = 0;
    
    // Count characters in s1
    for (let i = 0; i < s1.length; i++) {
        count[s1.charCodeAt(i) - 97]++;
    }
    
    let left = 0;
    let right = 0;
    
    while (right < s2.length) {
        const rightChar = s2.charCodeAt(right) - 97;
        count[rightChar]--;
        
        // If character count becomes 0, we have a match
        if (count[rightChar] === 0) {
            matches++;
        }
        // If character count becomes -1, we had an extra character
        else if (count[rightChar] === -1) {
            matches--;
        }
        
        // If window size exceeds s1 length, remove leftmost character
        if (right - left + 1 > s1.length) {
            const leftChar = s2.charCodeAt(left) - 97;
            count[leftChar]++;
            
            // Update matches accordingly
            if (count[leftChar] === 0) {
                matches++;
            } else if (count[leftChar] === 1) {
                matches--;
            }
            
            left++;
        }
        
        // If all characters match, return true
        if (matches === 26) {
            return true;
        }
        
        right++;
    }
    
    return false;
}

/**
 * Test cases
 */
function runTests() {
    console.log("=== Permutation in String Tests ===\n");
    
    // Test case 1: Valid permutation
    let s1 = "ab";
    let s2 = "eidbaooo";
    console.log(`Test 1: s1 = "${s1}", s2 = "${s2}"`);
    console.log(`Expected: true, Got: ${permutationInString(s1, s2)}`);
    console.log(`Optimized: ${permutationInStringOptimized(s1, s2)}`);
    console.log();
    
    // Test case 2: No permutation
    s1 = "ab";
    s2 = "eidboaoo";
    console.log(`Test 2: s1 = "${s1}", s2 = "${s2}"`);
    console.log(`Expected: false, Got: ${permutationInString(s1, s2)}`);
    console.log(`Optimized: ${permutationInStringOptimized(s1, s2)}`);
    console.log();
    
    // Test case 3: Single character
    s1 = "a";
    s2 = "ab";
    console.log(`Test 3: s1 = "${s1}", s2 = "${s2}"`);
    console.log(`Expected: true, Got: ${permutationInString(s1, s2)}`);
    console.log(`Optimized: ${permutationInStringOptimized(s1, s2)}`);
    console.log();
    
    // Test case 4: Same strings
    s1 = "abc";
    s2 = "abc";
    console.log(`Test 4: s1 = "${s1}", s2 = "${s2}"`);
    console.log(`Expected: true, Got: ${permutationInString(s1, s2)}`);
    console.log(`Optimized: ${permutationInStringOptimized(s1, s2)}`);
    console.log();
    
    // Test case 5: s1 longer than s2
    s1 = "abcd";
    s2 = "abc";
    console.log(`Test 5: s1 = "${s1}", s2 = "${s2}"`);
    console.log(`Expected: false, Got: ${permutationInString(s1, s2)}`);
    console.log(`Optimized: ${permutationInStringOptimized(s1, s2)}`);
    console.log();
    
    // Test case 6: Repeated characters
    s1 = "aab";
    s2 = "eidbaaoo";
    console.log(`Test 6: s1 = "${s1}", s2 = "${s2}"`);
    console.log(`Expected: true, Got: ${permutationInString(s1, s2)}`);
    console.log(`Optimized: ${permutationInStringOptimized(s1, s2)}`);
    console.log();
    
    // Test case 7: Edge case - empty strings
    s1 = "";
    s2 = "abc";
    console.log(`Test 7: s1 = "${s1}", s2 = "${s2}"`);
    console.log(`Expected: true, Got: ${permutationInString(s1, s2)}`);
    console.log(`Optimized: ${permutationInStringOptimized(s1, s2)}`);
    console.log();
    
    // Test case 8: Edge case - both empty
    s1 = "";
    s2 = "";
    console.log(`Test 8: s1 = "${s1}", s2 = "${s2}"`);
    console.log(`Expected: true, Got: ${permutationInString(s1, s2)}`);
    console.log(`Optimized: ${permutationInStringOptimized(s1, s2)}`);
    console.log();
}

// Run tests if this file is executed directly
if (require.main === module) {
    runTests();
}

module.exports = {
    permutationInString,
    permutationInStringOptimized,
    isHashSame
}; 