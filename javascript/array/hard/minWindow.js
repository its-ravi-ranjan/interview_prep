/**
 * Minimum Window Substring
 * 
 * Problem: Given two strings s and t of lengths m and n respectively, return the minimum window 
 * substring of s such that every character in t (including duplicates) is included in the window. 
 * If there is no such substring, return the empty string "".
 * 
 * Example 1:
 * Input: s = "ADOBECODEBANC", t = "ABC"
 * Output: "BANC"
 * Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
 * 
 * Example 2:
 * Input: s = "a", t = "a"
 * Output: "a"
 * 
 * Example 3:
 * Input: s = "a", t = "aa"
 * Output: ""
 * 
 * Approach (Sliding Window with Two Pointers):
 * 1. Create a frequency map for characters in string t (need map)
 * 2. Create a frequency map for characters in current window (field map)
 * 3. Use two pointers (left and right) to maintain a sliding window
 * 4. Expand the window by moving right pointer until we have all required characters
 * 5. Contract the window by moving left pointer to find the minimum valid window
 * 6. Track the minimum window length and starting position
 * 7. Return the minimum window substring
 * 
 * Key Insights:
 * - Use a counter to track how many required characters we have in current window
 * - Only increment counter when we exactly match the required frequency
 * - Only decrement counter when we fall below the required frequency
 * 
 * Time Complexity: O(m + n), where m is length of s and n is length of t
 * Space Complexity: O(k), where k is the number of unique characters in t
 */

/**
 * Find the minimum window substring containing all characters from t
 * @param {string} s - The source string
 * @param {string} t - The target string
 * @returns {string} - Minimum window substring or empty string
 */
var minWindow = function(s, t) {
    if (s.length < t.length) return "";
    
    // Create frequency map for characters in t
    const need = new Map();
    for (let i = 0; i < t.length; i++) {
        const char = t.charAt(i);
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    const required = need.size; // Number of unique characters needed
    let have = 0; // Number of unique characters we have in current window
    let left = 0;
    let right = 0;
    let minLength = Infinity;
    let minLeft = 0;
    
    // Frequency map for characters in current window
    const field = new Map();
    
    while (right < s.length) {
        const c = s.charAt(right);
        field.set(c, (field.get(c) || 0) + 1);
        
        // Check if we have exactly matched the required frequency for this character
        if (need.has(c) && field.get(c) === need.get(c)) {
            have++;
        }
        
        // Try to contract the window from left
        while (left <= right && have === required) {
            // Update minimum window if current window is smaller
            if ((right - left + 1) < minLength) {
                minLength = right - left + 1;
                minLeft = left;
            }
            
            const d = s.charAt(left);
            field.set(d, field.get(d) - 1);
            
            // Check if we lost a required character
            if (need.has(d) && field.get(d) < need.get(d)) {
                have--;
            }
            
            left++;
        }
        
        right++;
    }
    
    return minLength === Infinity ? "" : s.substring(minLeft, minLeft + minLength);
};

/**
 * Alternative approach: More explicit version for better understanding
 * @param {string} s - The source string
 * @param {string} t - The target string
 * @returns {string} - Minimum window substring or empty string
 */
var minWindowAlternative = function(s, t) {
    if (s.length < t.length) return "";
    
    // Count characters in t
    const charCount = {};
    for (let char of t) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    let required = Object.keys(charCount).length;
    let formed = 0;
    let left = 0;
    let right = 0;
    let minLen = Infinity;
    let minStart = 0;
    
    // Count characters in current window
    const windowCount = {};
    
    while (right < s.length) {
        const char = s[right];
        windowCount[char] = (windowCount[char] || 0) + 1;
        
        // Check if this character completes a requirement
        if (charCount[char] && windowCount[char] === charCount[char]) {
            formed++;
        }
        
        // Try to minimize the window
        while (left <= right && formed === required) {
            const currentLen = right - left + 1;
            if (currentLen < minLen) {
                minLen = currentLen;
                minStart = left;
            }
            
            const leftChar = s[left];
            windowCount[leftChar]--;
            
            // Check if we broke a requirement
            if (charCount[leftChar] && windowCount[leftChar] < charCount[leftChar]) {
                formed--;
            }
            
            left++;
        }
        
        right++;
    }
    
    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
};

/**
 * Brute Force Approach (for comparison)
 * Time Complexity: O(m² * n)
 * Space Complexity: O(n)
 * @param {string} s - The source string
 * @param {string} t - The target string
 * @returns {string} - Minimum window substring or empty string
 */
var minWindowBruteForce = function(s, t) {
    if (s.length < t.length) return "";
    
    let minLen = Infinity;
    let minStart = 0;
    
    // Try all possible substrings
    for (let start = 0; start < s.length; start++) {
        for (let end = start; end < s.length; end++) {
            const substring = s.substring(start, end + 1);
            
            // Check if this substring contains all characters from t
            if (containsAllCharacters(substring, t)) {
                const currentLen = end - start + 1;
                if (currentLen < minLen) {
                    minLen = currentLen;
                    minStart = start;
                }
            }
        }
    }
    
    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
};

/**
 * Helper function to check if a string contains all characters from another string
 * @param {string} str - The string to check
 * @param {string} target - The target string
 * @returns {boolean} - True if str contains all characters from target
 */
function containsAllCharacters(str, target) {
    const charCount = {};
    
    // Count characters in target
    for (let char of target) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Count characters in str
    for (let char of str) {
        if (charCount[char]) {
            charCount[char]--;
        }
    }
    
    // Check if all characters are covered
    for (let count of Object.values(charCount)) {
        if (count > 0) return false;
    }
    
    return true;
}

// Test cases
function runTests() {
    console.log("=== Minimum Window Substring Tests ===");
    
    const testCases = [
        {
            s: "ADOBECODEBANC",
            t: "ABC",
            expected: "BANC",
            description: "Standard case with multiple occurrences"
        },
        {
            s: "a",
            t: "a",
            expected: "a",
            description: "Single character match"
        },
        {
            s: "a",
            t: "aa",
            expected: "",
            description: "No valid window (insufficient characters)"
        },
        {
            s: "aa",
            t: "aa",
            expected: "aa",
            description: "Exact match"
        },
        {
            s: "ADOBECODEBANC",
            t: "ABC",
            expected: "BANC",
            description: "Multiple valid windows"
        },
        {
            s: "aab",
            t: "aab",
            expected: "aab",
            description: "Complete string match"
        },
        {
            s: "cabwefgewcwaefgcf",
            t: "cae",
            expected: "cwae",
            description: "Complex case with multiple valid windows"
        },
        {
            s: "xyz",
            t: "abc",
            expected: "",
            description: "No common characters"
        }
    ];
    
    testCases.forEach((testCase, index) => {
        const result = minWindow(testCase.s, testCase.t);
        const status = result === testCase.expected ? "PASS" : "FAIL";
        console.log(`Test ${index + 1}: ${status} - ${testCase.description}`);
        console.log(`  s = "${testCase.s}", t = "${testCase.t}"`);
        console.log(`  Expected: "${testCase.expected}", Got: "${result}"`);
        console.log();
    });
}

// Performance comparison
function performanceTest() {
    console.log("=== Performance Comparison ===");
    
    // Create test strings
    const s = "ADOBECODEBANC".repeat(1000); // Large string
    const t = "ABC";
    
    console.log("Testing with s length:", s.length, "and t length:", t.length);
    
    // Test Sliding Window
    const start1 = performance.now();
    const result1 = minWindow(s, t);
    const end1 = performance.now();
    console.log(`Sliding Window: "${result1}" (${(end1 - start1).toFixed(4)}ms)`);
    
    // Test Alternative Approach
    const start2 = performance.now();
    const result2 = minWindowAlternative(s, t);
    const end2 = performance.now();
    console.log(`Alternative Approach: "${result2}" (${(end2 - start2).toFixed(4)}ms)`);
    
    // Test Brute Force (only for small strings due to O(m² * n) complexity)
    const smallS = s.substring(0, 50);
    const start3 = performance.now();
    const result3 = minWindowBruteForce(smallS, t);
    const end3 = performance.now();
    console.log(`Brute Force (50 chars): "${result3}" (${(end3 - start3).toFixed(4)}ms)`);
}

// Dry run demonstration
function dryRun() {
    console.log("=== Dry Run Demonstration ===");
    
    const s = "ADOBECODEBANC";
    const t = "ABC";
    
    console.log(`s = "${s}", t = "${t}"`);
    console.log();
    
    // Create frequency map for t
    const need = new Map();
    for (let i = 0; i < t.length; i++) {
        const char = t.charAt(i);
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    console.log("Need map:", Object.fromEntries(need));
    console.log("Required unique characters:", need.size);
    console.log();
    
    let required = need.size;
    let have = 0;
    let left = 0;
    let right = 0;
    let minLength = Infinity;
    let minLeft = 0;
    const field = new Map();
    
    console.log("Window expansion and contraction:");
    
    while (right < s.length) {
        const c = s.charAt(right);
        field.set(c, (field.get(c) || 0) + 1);
        
        console.log(`Step ${right}: Add '${c}' at position ${right}`);
        console.log(`  Field map:`, Object.fromEntries(field));
        
        if (need.has(c) && field.get(c) === need.get(c)) {
            have++;
            console.log(`  Have increased to ${have}/${required}`);
        }
        
        while (left <= right && have === required) {
            const currentLen = right - left + 1;
            console.log(`  Valid window found: [${left}, ${right}] = "${s.substring(left, right + 1)}" (length: ${currentLen})`);
            
            if (currentLen < minLength) {
                minLength = currentLen;
                minLeft = left;
                console.log(`  New minimum: "${s.substring(minLeft, minLeft + minLength)}"`);
            }
            
            const d = s.charAt(left);
            field.set(d, field.get(d) - 1);
            console.log(`  Remove '${d}' from left, field map:`, Object.fromEntries(field));
            
            if (need.has(d) && field.get(d) < need.get(d)) {
                have--;
                console.log(`  Have decreased to ${have}/${required}`);
            }
            
            left++;
        }
        
        right++;
        console.log();
    }
    
    console.log(`Final result: "${s.substring(minLeft, minLeft + minLength)}"`);
}

// Edge cases demonstration
function edgeCases() {
    console.log("=== Edge Cases ===");
    
    const edgeCases = [
        { s: "", t: "ABC", name: "Empty source string" },
        { s: "ABC", t: "", name: "Empty target string" },
        { s: "", t: "", name: "Both strings empty" },
        { s: "A", t: "A", name: "Single character match" },
        { s: "AA", t: "A", name: "Multiple source, single target" },
        { s: "A", t: "AA", name: "Single source, multiple target" },
        { s: "ABC", t: "ABC", name: "Exact match" },
        { s: "ABCDEF", t: "XYZ", name: "No common characters" }
    ];
    
    edgeCases.forEach(testCase => {
        const result = minWindow(testCase.s, testCase.t);
        console.log(`${testCase.name}: s="${testCase.s}", t="${testCase.t}" → "${result}"`);
    });
}

// Run all demonstrations
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { minWindow, minWindowAlternative, minWindowBruteForce };
} else {
    runTests();
    console.log();
    performanceTest();
    console.log();
    dryRun();
    console.log();
    edgeCases();
} 