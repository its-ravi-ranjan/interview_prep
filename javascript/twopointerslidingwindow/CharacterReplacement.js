/**
 * Longest Repeating Character Replacement
 * 
 * Problem: You are given a string s and an integer k. You can choose any character 
 * of the string and change it to any other uppercase English character. You can 
 * perform this operation at most k times.
 * 
 * Return the length of the longest substring containing the same letter you can 
 * get after performing the above operations.
 * 
 * Example 1:
 * Input: s = "ABAB", k = 2
 * Output: 4
 * Explanation: Replace the two 'A's with two 'B's or vice versa.
 * 
 * Approach: Sliding Window with Character Count
 * 1. Use a sliding window to find the longest substring
 * 2. Track character frequencies in the current window
 * 3. Check if the window is valid (can be made uniform with k replacements)
 * 4. Expand window if valid, shrink if invalid
 * 5. Track the maximum window size found
 * 
 * Time Complexity: O(n) where n is the length of string s
 * Space Complexity: O(1) since we use fixed-size array of 26 characters
 */
class CharacterReplacement {
    
    characterReplacement(s, k) {
        if (!s || s.length === 0) {
            return 0;
        }
        
        let left = 0;
        let right = 0;
        const charCount = new Array(26).fill(0);
        let result = 0;
        
        // Initialize with first character
        charCount[s.charCodeAt(0) - 65] = 1;
        
        while (right < s.length) {
            // Check if current window is valid
            if (this.isValidWindow(charCount, k)) {
                result = Math.max(result, right - left + 1);
                right++;
                if (right < s.length) {
                    charCount[s.charCodeAt(right) - 65]++;
                }
            } else {
                // Shrink window from left
                charCount[s.charCodeAt(left) - 65]--;
                left++;
            }
        }
        
        return result;
    }
    
    isValidWindow(charCount, k) {
        let totalCount = 0;
        let maxCharCount = 0;
        
        for (let i = 0; i < 26; i++) {
            totalCount += charCount[i];
            maxCharCount = Math.max(maxCharCount, charCount[i]);
        }
        
        // If we can replace all other characters with the most frequent one
        return (totalCount - maxCharCount) <= k;
    }
    
    // Alternative optimized approach
    characterReplacementOptimized(s, k) {
        if (!s || s.length === 0) {
            return 0;
        }
        
        const charCount = new Array(26).fill(0);
        let left = 0;
        let maxCount = 0;
        let result = 0;
        
        for (let right = 0; right < s.length; right++) {
            charCount[s.charCodeAt(right) - 65]++;
            maxCount = Math.max(maxCount, charCount[s.charCodeAt(right) - 65]);
            
            // If window size - maxCount > k, we need to shrink window
            if (right - left + 1 - maxCount > k) {
                charCount[s.charCodeAt(left) - 65]--;
                left++;
            }
            
            result = Math.max(result, right - left + 1);
        }
        
        return result;
    }
    
    // Alternative approach using Map for better readability
    characterReplacementWithMap(s, k) {
        if (!s || s.length === 0) {
            return 0;
        }
        
        const charCount = new Map();
        let left = 0;
        let maxCount = 0;
        let result = 0;
        
        for (let right = 0; right < s.length; right++) {
            const rightChar = s[right];
            charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);
            maxCount = Math.max(maxCount, charCount.get(rightChar));
            
            // If window size - maxCount > k, we need to shrink window
            if (right - left + 1 - maxCount > k) {
                const leftChar = s[left];
                charCount.set(leftChar, charCount.get(leftChar) - 1);
                left++;
            }
            
            result = Math.max(result, right - left + 1);
        }
        
        return result;
    }
    
    // Alternative approach using object for character counting
    characterReplacementWithObject(s, k) {
        if (!s || s.length === 0) {
            return 0;
        }
        
        const charCount = {};
        let left = 0;
        let maxCount = 0;
        let result = 0;
        
        for (let right = 0; right < s.length; right++) {
            const rightChar = s[right];
            charCount[rightChar] = (charCount[rightChar] || 0) + 1;
            maxCount = Math.max(maxCount, charCount[rightChar]);
            
            // If window size - maxCount > k, we need to shrink window
            if (right - left + 1 - maxCount > k) {
                const leftChar = s[left];
                charCount[leftChar]--;
                left++;
            }
            
            result = Math.max(result, right - left + 1);
        }
        
        return result;
    }
}

// Test function
function runTests() {
    const solution = new CharacterReplacement();
    
    // Test Case 1
    console.log("Test Case 1:");
    const s1 = "ABAB";
    const k1 = 2;
    const result1 = solution.characterReplacement(s1, k1);
    console.log(`Input: s = "${s1}", k = ${k1}`);
    console.log(`Output: ${result1}`);
    console.log("Expected: 4");
    console.log();
    
    // Test Case 2
    console.log("Test Case 2:");
    const s2 = "AABABBA";
    const k2 = 1;
    const result2 = solution.characterReplacement(s2, k2);
    console.log(`Input: s = "${s2}", k = ${k2}`);
    console.log(`Output: ${result2}`);
    console.log("Expected: 4");
    console.log();
    
    // Test Case 3
    console.log("Test Case 3:");
    const s3 = "AAAA";
    const k3 = 2;
    const result3 = solution.characterReplacement(s3, k3);
    console.log(`Input: s = "${s3}", k = ${k3}`);
    console.log(`Output: ${result3}`);
    console.log("Expected: 4");
    console.log();
    
    // Test Case 4 - All characters can be replaced
    console.log("Test Case 4:");
    const s4 = "ABCD";
    const k4 = 3;
    const result4 = solution.characterReplacement(s4, k4);
    console.log(`Input: s = "${s4}", k = ${k4}`);
    console.log(`Output: ${result4}`);
    console.log("Expected: 4");
    console.log();
    
    // Test Case 5 - No replacements allowed
    console.log("Test Case 5:");
    const s5 = "ABCD";
    const k5 = 0;
    const result5 = solution.characterReplacement(s5, k5);
    console.log(`Input: s = "${s5}", k = ${k5}`);
    console.log(`Output: ${result5}`);
    console.log("Expected: 1");
    console.log();
    
    // Test Case 6 - Single character string
    console.log("Test Case 6:");
    const s6 = "A";
    const k6 = 1;
    const result6 = solution.characterReplacement(s6, k6);
    console.log(`Input: s = "${s6}", k = ${k6}`);
    console.log(`Output: ${result6}`);
    console.log("Expected: 1");
    console.log();
    
    // Test Case 7 - Large k value
    console.log("Test Case 7:");
    const s7 = "ABCDEF";
    const k7 = 10;
    const result7 = solution.characterReplacement(s7, k7);
    console.log(`Input: s = "${s7}", k = ${k7}`);
    console.log(`Output: ${result7}`);
    console.log("Expected: 6");
    console.log();
    
    // Test Case 8 - Complex case
    console.log("Test Case 8:");
    const s8 = "KRSCDCSONAJNHLBMDQGIFCPEKPOHQIHLTDIQGEKLRLCJNBJNBLB";
    const k8 = 4;
    const result8 = solution.characterReplacement(s8, k8);
    console.log(`Input: s = "${s8}", k = ${k8}`);
    console.log(`Output: ${result8}`);
    console.log("Expected: 7");
    console.log();
    
    // Performance comparison
    console.log("Performance Comparison:");
    const longS = "A".repeat(10000) + "B".repeat(10000);
    const longK = 5000;
    
    let startTime = performance.now();
    const result9 = solution.characterReplacement(longS, longK);
    let endTime = performance.now();
    console.log(`Basic approach time: ${(endTime - startTime).toFixed(2)}ms, Result: ${result9}`);
    
    startTime = performance.now();
    const result10 = solution.characterReplacementOptimized(longS, longK);
    endTime = performance.now();
    console.log(`Optimized approach time: ${(endTime - startTime).toFixed(2)}ms, Result: ${result10}`);
    
    startTime = performance.now();
    const result11 = solution.characterReplacementWithMap(longS, longK);
    endTime = performance.now();
    console.log(`Map approach time: ${(endTime - startTime).toFixed(2)}ms, Result: ${result11}`);
    
    startTime = performance.now();
    const result12 = solution.characterReplacementWithObject(longS, longK);
    endTime = performance.now();
    console.log(`Object approach time: ${(endTime - startTime).toFixed(2)}ms, Result: ${result12}`);
    
    // Verify all approaches give same result
    console.log("\nVerification:");
    console.log("All approaches give same result:", 
        result9 === result10 && result10 === result11 && result11 === result12);
    
    // Additional edge cases
    console.log("\nAdditional Edge Cases:");
    
    // Empty string
    console.log("Empty string:", solution.characterReplacement("", 1));
    
    // Null/undefined
    console.log("Null string:", solution.characterReplacement(null, 1));
    console.log("Undefined string:", solution.characterReplacement(undefined, 1));
    
    // Very large k
    console.log("Very large k:", solution.characterReplacement("ABC", 100));
    
    // k larger than string length
    console.log("k larger than string length:", solution.characterReplacement("ABC", 5));
}

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runTests();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CharacterReplacement;
} 