/**
 * Longest Substring Without Repeating Characters
 * 
 * Problem: Given a string s, find the length of the longest substring without duplicate characters.
 * 
 * Example 1:
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3.
 * 
 * Example 2:
 * Input: s = "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with the length of 1.
 * 
 * Example 3:
 * Input: s = "pwwkew"
 * Output: 3
 * Explanation: The answer is "wke", with the length of 3.
 * 
 * Approach (Sliding Window with Two Pointers):
 * 1. Use two pointers (left and right) to maintain a sliding window
 * 2. Use a Set to track unique characters in the current window
 * 3. Expand the window by moving right pointer until we encounter a duplicate
 * 4. Contract the window by moving left pointer until we remove the duplicate
 * 5. Track the maximum length of valid windows
 * 6. Return the maximum length found
 * 
 * Key Insights:
 * - When we encounter a duplicate, we need to remove characters from left until the duplicate is removed
 * - The window always contains unique characters
 * - We update maxLength whenever we expand the window successfully
 * 
 * Time Complexity: O(n), where n is the length of the string
 * Space Complexity: O(min(m, n)), where m is the size of the character set
 */

import java.util.*;

public class LengthOfLongestSubstring {
    
    /**
     * Find the length of the longest substring without repeating characters
     * @param s Input string
     * @return Length of longest substring without repeating characters
     */
    public static int lengthOfLongestSubstring(String s) {
        int maxLength = 0;
        Set<Character> set = new HashSet<>();
        int left = 0;
        int right = 0;
        
        while (right < s.length()) {
            char c = s.charAt(right);
            
            if (!set.contains(c)) {
                set.add(c);
                maxLength = Math.max(maxLength, right - left + 1);
                right++;
            } else {
                set.remove(s.charAt(left));
                left++;
            }
        }
        
        return maxLength;
    }
    
    /**
     * Alternative approach: Using Map to track character positions
     * @param s Input string
     * @return Length of longest substring without repeating characters
     */
    public static int lengthOfLongestSubstringMap(String s) {
        Map<Character, Integer> charMap = new HashMap<>();
        int maxLength = 0;
        int left = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            
            if (charMap.containsKey(c)) {
                // Move left pointer to the position after the last occurrence of current character
                left = Math.max(left, charMap.get(c) + 1);
            }
            
            charMap.put(c, right);
            maxLength = Math.max(maxLength, right - left + 1);
        }
        
        return maxLength;
    }
    
    /**
     * Brute Force Approach (for comparison)
     * Time Complexity: O(n²)
     * Space Complexity: O(min(m, n))
     * @param s Input string
     * @return Length of longest substring without repeating characters
     */
    public static int lengthOfLongestSubstringBruteForce(String s) {
        int maxLength = 0;
        
        for (int start = 0; start < s.length(); start++) {
            Set<Character> set = new HashSet<>();
            int currentLength = 0;
            
            for (int end = start; end < s.length(); end++) {
                char c = s.charAt(end);
                
                if (set.contains(c)) {
                    break;
                }
                
                set.add(c);
                currentLength++;
            }
            
            maxLength = Math.max(maxLength, currentLength);
        }
        
        return maxLength;
    }
    
    /**
     * Find the longest substring without repeating characters (returns both length and substring)
     * @param s Input string
     * @return Array containing [length, substring]
     */
    public static String[] lengthOfLongestSubstringWithSubstring(String s) {
        int maxLength = 0;
        int maxStart = 0;
        Set<Character> set = new HashSet<>();
        int left = 0;
        int right = 0;
        
        while (right < s.length()) {
            char c = s.charAt(right);
            
            if (!set.contains(c)) {
                set.add(c);
                int currentLength = right - left + 1;
                if (currentLength > maxLength) {
                    maxLength = currentLength;
                    maxStart = left;
                }
                right++;
            } else {
                set.remove(s.charAt(left));
                left++;
            }
        }
        
        String substring = s.substring(maxStart, maxStart + maxLength);
        return new String[]{String.valueOf(maxLength), substring};
    }
    
    /**
     * Optimized approach using array for ASCII characters
     * Time Complexity: O(n)
     * Space Complexity: O(1) - fixed size array
     * @param s Input string (assumes ASCII characters)
     * @return Length of longest substring without repeating characters
     */
    public static int lengthOfLongestSubstringArray(String s) {
        int[] charIndex = new int[128]; // ASCII characters
        Arrays.fill(charIndex, -1);
        
        int maxLength = 0;
        int left = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            
            if (charIndex[c] >= left) {
                left = charIndex[c] + 1;
            }
            
            charIndex[c] = right;
            maxLength = Math.max(maxLength, right - left + 1);
        }
        
        return maxLength;
    }
    
    // Test cases
    public static void runTests() {
        System.out.println("=== Longest Substring Without Repeating Characters Tests ===");
        
        String[][][] testCases = {
            {
                {"abcabcbb"},
                {"3"},
                {"Standard case with repeating characters"}
            },
            {
                {"bbbbb"},
                {"1"},
                {"All characters are the same"}
            },
            {
                {"pwwkew"},
                {"3"},
                {"Multiple valid substrings"}
            },
            {
                {""},
                {"0"},
                {"Empty string"}
            },
            {
                {"a"},
                {"1"},
                {"Single character"}
            },
            {
                {"abcdef"},
                {"6"},
                {"All unique characters"}
            },
            {
                {"dvdf"},
                {"3"},
                {"Substring in middle"}
            },
            {
                {"anviaj"},
                {"5"},
                {"Complex case with multiple duplicates"}
            }
        };
        
        for (int i = 0; i < testCases.length; i++) {
            String input = testCases[i][0][0];
            int expected = Integer.parseInt(testCases[i][1][0]);
            String description = testCases[i][2][0];
            
            int result = lengthOfLongestSubstring(input);
            String status = result == expected ? "PASS" : "FAIL";
            
            System.out.println("Test " + (i + 1) + ": " + status + " - " + description);
            System.out.println("  Input: \"" + input + "\"");
            System.out.println("  Expected: " + expected + ", Got: " + result);
            System.out.println();
        }
    }
    
    // Performance comparison
    public static void performanceTest() {
        System.out.println("=== Performance Comparison ===");
        
        // Create test strings
        String[] testStrings = {
            "abcabcbb".repeat(1000), // Large string with repeats
            "abcdefghijklmnopqrstuvwxyz".repeat(100), // Large string with unique chars
            "a".repeat(10000) // Large string with same character
        };
        
        for (int i = 0; i < testStrings.length; i++) {
            String s = testStrings[i];
            System.out.println("Test " + (i + 1) + ": String length = " + s.length());
            
            // Test Set approach
            long start1 = System.nanoTime();
            int result1 = lengthOfLongestSubstring(s);
            long end1 = System.nanoTime();
            System.out.println("  Set Approach: " + result1 + " (" + (end1 - start1) / 1000000.0 + "ms)");
            
            // Test Map approach
            long start2 = System.nanoTime();
            int result2 = lengthOfLongestSubstringMap(s);
            long end2 = System.nanoTime();
            System.out.println("  Map Approach: " + result2 + " (" + (end2 - start2) / 1000000.0 + "ms)");
            
            // Test Array approach
            long start3 = System.nanoTime();
            int result3 = lengthOfLongestSubstringArray(s);
            long end3 = System.nanoTime();
            System.out.println("  Array Approach: " + result3 + " (" + (end3 - start3) / 1000000.0 + "ms)");
            
            // Test Brute Force (only for small strings)
            if (s.length() <= 100) {
                long start4 = System.nanoTime();
                int result4 = lengthOfLongestSubstringBruteForce(s);
                long end4 = System.nanoTime();
                System.out.println("  Brute Force: " + result4 + " (" + (end4 - start4) / 1000000.0 + "ms)");
            }
            
            System.out.println();
        }
    }
    
    // Dry run demonstration
    public static void dryRun() {
        System.out.println("=== Dry Run Demonstration ===");
        
        String s = "abcabcbb";
        System.out.println("Input: \"" + s + "\"");
        System.out.println();
        
        int maxLength = 0;
        Set<Character> set = new HashSet<>();
        int left = 0;
        int right = 0;
        
        System.out.println("Window expansion and contraction:");
        
        while (right < s.length()) {
            char c = s.charAt(right);
            System.out.println("Step " + right + ": Processing '" + c + "' at position " + right);
            System.out.println("  Current window: [" + left + ", " + right + "] = \"" + s.substring(left, right) + "\"");
            System.out.println("  Set: " + set);
            
            if (!set.contains(c)) {
                set.add(c);
                int currentLength = right - left + 1;
                maxLength = Math.max(maxLength, currentLength);
                System.out.println("  Added '" + c + "' to set");
                System.out.println("  Current length: " + currentLength + ", Max length: " + maxLength);
                right++;
            } else {
                char removedChar = s.charAt(left);
                set.remove(removedChar);
                System.out.println("  Removed '" + removedChar + "' from set (duplicate found)");
                left++;
            }
            
            System.out.println();
        }
        
        System.out.println("Final result: " + maxLength);
    }
    
    // Edge cases demonstration
    public static void edgeCases() {
        System.out.println("=== Edge Cases ===");
        
        String[][][] edgeCases = {
            {{""}, {"Empty string"}},
            {{"a"}, {"Single character"}},
            {{"aa"}, {"Two same characters"}},
            {{"ab"}, {"Two different characters"}},
            {{"aaa"}, {"Three same characters"}},
            {{"abc"}, {"Three different characters"}},
            {{"abcdefghijklmnopqrstuvwxyz"}, {"All lowercase letters"}},
            {{"1234567890"}, {"All digits"}}
        };
        
        for (String[][] testCase : edgeCases) {
            String input = testCase[0][0];
            String name = testCase[1][0];
            
            int result = lengthOfLongestSubstring(input);
            System.out.println(name + ": \"" + input + "\" → " + result);
        }
    }
    
    // Demonstrate finding substring with additional information
    public static void demonstrateWithSubstring() {
        System.out.println("\n=== Finding Substring with Additional Information ===");
        
        String[] testStrings = {"abcabcbb", "pwwkew", "dvdf", "anviaj"};
        
        for (String s : testStrings) {
            String[] result = lengthOfLongestSubstringWithSubstring(s);
            int length = Integer.parseInt(result[0]);
            String substring = result[1];
            
            System.out.println("Input: \"" + s + "\"");
            System.out.println("  Length: " + length);
            System.out.println("  Substring: \"" + substring + "\"");
            System.out.println();
        }
    }
    
    // Compare different approaches
    public static void compareApproaches() {
        System.out.println("=== Approach Comparison ===");
        
        String[] testStrings = {"abcabcbb", "pwwkew", "dvdf", "anviaj", "bbbbb"};
        
        for (String s : testStrings) {
            System.out.println("Input: \"" + s + "\"");
            
            int result1 = lengthOfLongestSubstring(s);
            int result2 = lengthOfLongestSubstringMap(s);
            int result3 = lengthOfLongestSubstringArray(s);
            int result4 = lengthOfLongestSubstringBruteForce(s);
            
            System.out.println("  Set Approach: " + result1);
            System.out.println("  Map Approach: " + result2);
            System.out.println("  Array Approach: " + result3);
            System.out.println("  Brute Force: " + result4);
            System.out.println();
        }
    }
    
    public static void main(String[] args) {
        runTests();
        performanceTest();
        System.out.println();
        dryRun();
        System.out.println();
        edgeCases();
        demonstrateWithSubstring();
        System.out.println();
        compareApproaches();
    }
} 