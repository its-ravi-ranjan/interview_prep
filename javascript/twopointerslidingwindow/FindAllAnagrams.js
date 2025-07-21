/**
 * Find All Anagrams in a String
 * 
 * Problem: Given two strings s and p, return an array of all the start indices 
 * of p's anagrams in s. You may return the answer in any order.
 * 
 * Example 1:
 * Input: s = "cbaebabacd", p = "abc"
 * Output: [0,6]
 * Explanation:
 * The substring with start index = 0 is "cba", which is an anagram of "abc".
 * The substring with start index = 6 is "bac", which is an anagram of "abc".
 * 
 * Approach: Sliding Window with Character Count
 * 1. Create two frequency arrays to track character counts
 * 2. Initialize the window with the first p.length() characters
 * 3. Slide the window and compare character frequencies
 * 4. If frequencies match, add the start index to result
 * 
 * Time Complexity: O(n) where n is the length of string s
 * Space Complexity: O(1) since we use fixed-size arrays of 26 characters
 */
class FindAllAnagrams {
    
    findAnagrams(s, p) {
        const result = [];
        
        // Edge case: if pattern is longer than string
        if (p.length > s.length) {
            return result;
        }
        
        // Frequency arrays for pattern and current window
        const patternFreq = new Array(26).fill(0);
        const windowFreq = new Array(26).fill(0);
        
        // Initialize pattern frequency
        for (let i = 0; i < p.length; i++) {
            patternFreq[p.charCodeAt(i) - 97]++;
        }
        
        // Initialize window frequency with first p.length() characters
        for (let i = 0; i < p.length; i++) {
            windowFreq[s.charCodeAt(i) - 97]++;
        }
        
        // Sliding window
        let left = 0;
        let right = p.length - 1;
        
        while (right < s.length) {
            // Check if current window is an anagram
            if (this.isMatching(patternFreq, windowFreq)) {
                result.push(left);
            }
            
            // Slide window
            right++;
            if (right < s.length) {
                windowFreq[s.charCodeAt(left) - 97]--;  // Remove leftmost character
                left++;
                windowFreq[s.charCodeAt(right) - 97]++; // Add rightmost character
            }
        }
        
        return result;
    }
    
    isMatching(patternFreq, windowFreq) {
        for (let i = 0; i < 26; i++) {
            if (patternFreq[i] !== windowFreq[i]) {
                return false;
            }
        }
        return true;
    }
    
    // Alternative optimized approach using a single counter
    findAnagramsOptimized(s, p) {
        const result = [];
        
        if (p.length > s.length) {
            return result;
        }
        
        const freq = new Array(26).fill(0);
        let count = 0; // Number of characters that need to be matched
        
        // Initialize pattern frequency
        for (let i = 0; i < p.length; i++) {
            freq[p.charCodeAt(i) - 97]++;
        }
        
        // Count how many characters need to be matched
        for (let i = 0; i < 26; i++) {
            if (freq[i] > 0) {
                count++;
            }
        }
        
        let left = 0, right = 0;
        
        while (right < s.length) {
            const rightChar = s.charCodeAt(right) - 97;
            
            // Decrease frequency of right character
            freq[rightChar]--;
            
            // If frequency becomes 0, we've matched all occurrences of this character
            if (freq[rightChar] === 0) {
                count--;
            }
            // If frequency becomes -1, we've exceeded the required count
            else if (freq[rightChar] === -1) {
                count++;
            }
            
            // If window size equals pattern length
            if (right - left + 1 === p.length) {
                // If count is 0, all characters are matched
                if (count === 0) {
                    result.push(left);
                }
                
                // Move left pointer
                const leftChar = s.charCodeAt(left) - 97;
                freq[leftChar]++;
                
                // If frequency becomes 0, we've lost a match
                if (freq[leftChar] === 0) {
                    count--;
                }
                // If frequency becomes 1, we've regained a match
                else if (freq[leftChar] === 1) {
                    count++;
                }
                
                left++;
            }
            
            right++;
        }
        
        return result;
    }
    
    // Alternative approach using Map for better readability
    findAnagramsWithMap(s, p) {
        const result = [];
        
        if (p.length > s.length) {
            return result;
        }
        
        // Create frequency map for pattern
        const patternMap = new Map();
        for (let char of p) {
            patternMap.set(char, (patternMap.get(char) || 0) + 1);
        }
        
        // Create frequency map for current window
        const windowMap = new Map();
        let matches = 0;
        const requiredMatches = patternMap.size;
        
        let left = 0;
        
        for (let right = 0; right < s.length; right++) {
            const rightChar = s[right];
            
            // Add right character to window
            windowMap.set(rightChar, (windowMap.get(rightChar) || 0) + 1);
            
            // Check if this character matches the pattern
            if (patternMap.has(rightChar) && windowMap.get(rightChar) === patternMap.get(rightChar)) {
                matches++;
            } else if (patternMap.has(rightChar) && windowMap.get(rightChar) === patternMap.get(rightChar) + 1) {
                matches--; // We exceeded the required count
            }
            
            // If window size equals pattern length
            if (right - left + 1 === p.length) {
                // If all characters match
                if (matches === requiredMatches) {
                    result.push(left);
                }
                
                // Remove left character from window
                const leftChar = s[left];
                windowMap.set(leftChar, windowMap.get(leftChar) - 1);
                
                // Update matches count
                if (patternMap.has(leftChar) && windowMap.get(leftChar) === patternMap.get(leftChar)) {
                    matches++;
                } else if (patternMap.has(leftChar) && windowMap.get(leftChar) === patternMap.get(leftChar) - 1) {
                    matches--; // We lost a match
                }
                
                left++;
            }
        }
        
        return result;
    }
}

// Test function
function runTests() {
    const solution = new FindAllAnagrams();
    
    // Test Case 1
    console.log("Test Case 1:");
    const s1 = "cbaebabacd";
    const p1 = "abc";
    const result1 = solution.findAnagrams(s1, p1);
    console.log(`Input: s = "${s1}", p = "${p1}"`);
    console.log(`Output: [${result1}]`);
    console.log("Expected: [0, 6]");
    console.log();
    
    // Test Case 2
    console.log("Test Case 2:");
    const s2 = "abab";
    const p2 = "ab";
    const result2 = solution.findAnagrams(s2, p2);
    console.log(`Input: s = "${s2}", p = "${p2}"`);
    console.log(`Output: [${result2}]`);
    console.log("Expected: [0, 1, 2]");
    console.log();
    
    // Test Case 3
    console.log("Test Case 3:");
    const s3 = "aaaaaaaaaa";
    const p3 = "aaaaa";
    const result3 = solution.findAnagrams(s3, p3);
    console.log(`Input: s = "${s3}", p = "${p3}"`);
    console.log(`Output: [${result3}]`);
    console.log("Expected: [0, 1, 2, 3, 4, 5]");
    console.log();
    
    // Test Case 4 - No anagrams found
    console.log("Test Case 4:");
    const s4 = "abcdef";
    const p4 = "xyz";
    const result4 = solution.findAnagrams(s4, p4);
    console.log(`Input: s = "${s4}", p = "${p4}"`);
    console.log(`Output: [${result4}]`);
    console.log("Expected: []");
    console.log();
    
    // Test Case 5 - Pattern longer than string
    console.log("Test Case 5:");
    const s5 = "abc";
    const p5 = "abcd";
    const result5 = solution.findAnagrams(s5, p5);
    console.log(`Input: s = "${s5}", p = "${p5}"`);
    console.log(`Output: [${result5}]`);
    console.log("Expected: []");
    console.log();
    
    // Test Case 6 - Edge case with single character
    console.log("Test Case 6:");
    const s6 = "a";
    const p6 = "a";
    const result6 = solution.findAnagrams(s6, p6);
    console.log(`Input: s = "${s6}", p = "${p6}"`);
    console.log(`Output: [${result6}]`);
    console.log("Expected: [0]");
    console.log();
    
    // Performance comparison
    console.log("Performance Comparison:");
    const longS = "a".repeat(10000) + "b".repeat(10000);
    const longP = "a".repeat(5000);
    
    let startTime = performance.now();
    const result7 = solution.findAnagrams(longS, longP);
    let endTime = performance.now();
    console.log(`Basic approach time: ${(endTime - startTime).toFixed(2)}ms`);
    
    startTime = performance.now();
    const result8 = solution.findAnagramsOptimized(longS, longP);
    endTime = performance.now();
    console.log(`Optimized approach time: ${(endTime - startTime).toFixed(2)}ms`);
    
    startTime = performance.now();
    const result9 = solution.findAnagramsWithMap(longS, longP);
    endTime = performance.now();
    console.log(`Map approach time: ${(endTime - startTime).toFixed(2)}ms`);
    
    // Verify all approaches give same result
    console.log("\nVerification:");
    console.log("All approaches give same result:", 
        JSON.stringify(result7) === JSON.stringify(result8) && 
        JSON.stringify(result8) === JSON.stringify(result9));
}

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runTests();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FindAllAnagrams;
} 