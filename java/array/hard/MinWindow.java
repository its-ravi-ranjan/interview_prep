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

import java.util.*;

public class MinWindow {
    
    /**
     * Find the minimum window substring containing all characters from t
     * @param s The source string
     * @param t The target string
     * @return Minimum window substring or empty string
     */
    public static String minWindow(String s, String t) {
        if (s.length() < t.length()) return "";
        
        // Create frequency map for characters in t
        Map<Character, Integer> need = new HashMap<>();
        for (int i = 0; i < t.length(); i++) {
            char c = t.charAt(i);
            need.put(c, need.getOrDefault(c, 0) + 1);
        }
        
        int required = need.size(); // Number of unique characters needed
        int have = 0; // Number of unique characters we have in current window
        int left = 0;
        int right = 0;
        int minLength = Integer.MAX_VALUE;
        int minLeft = 0;
        
        // Frequency map for characters in current window
        Map<Character, Integer> field = new HashMap<>();
        
        while (right < s.length()) {
            char c = s.charAt(right);
            field.put(c, field.getOrDefault(c, 0) + 1);
            
            // Check if we have exactly matched the required frequency for this character
            if (need.containsKey(c) && field.get(c).intValue() == need.get(c).intValue()) {
                have++;
            }
            
            // Try to contract the window from left
            while (left <= right && have == required) {
                // Update minimum window if current window is smaller
                if ((right - left + 1) < minLength) {
                    minLength = right - left + 1;
                    minLeft = left;
                }
                
                char d = s.charAt(left);
                field.put(d, field.get(d) - 1);
                
                // Check if we lost a required character
                if (need.containsKey(d) && field.get(d).intValue() < need.get(d).intValue()) {
                    have--;
                }
                
                left++;
            }
            
            right++;
        }
        
        return minLength == Integer.MAX_VALUE ? "" : s.substring(minLeft, minLeft + minLength);
    }
    
    /**
     * Alternative approach: More explicit version for better understanding
     * @param s The source string
     * @param t The target string
     * @return Minimum window substring or empty string
     */
    public static String minWindowAlternative(String s, String t) {
        if (s.length() < t.length()) return "";
        
        // Count characters in t
        Map<Character, Integer> charCount = new HashMap<>();
        for (char c : t.toCharArray()) {
            charCount.put(c, charCount.getOrDefault(c, 0) + 1);
        }
        
        int required = charCount.size();
        int formed = 0;
        int left = 0;
        int right = 0;
        int minLen = Integer.MAX_VALUE;
        int minStart = 0;
        
        // Count characters in current window
        Map<Character, Integer> windowCount = new HashMap<>();
        
        while (right < s.length()) {
            char c = s.charAt(right);
            windowCount.put(c, windowCount.getOrDefault(c, 0) + 1);
            
            // Check if this character completes a requirement
            if (charCount.containsKey(c) && windowCount.get(c).intValue() == charCount.get(c).intValue()) {
                formed++;
            }
            
            // Try to minimize the window
            while (left <= right && formed == required) {
                int currentLen = right - left + 1;
                if (currentLen < minLen) {
                    minLen = currentLen;
                    minStart = left;
                }
                
                char leftChar = s.charAt(left);
                windowCount.put(leftChar, windowCount.get(leftChar) - 1);
                
                // Check if we broke a requirement
                if (charCount.containsKey(leftChar) && windowCount.get(leftChar).intValue() < charCount.get(leftChar).intValue()) {
                    formed--;
                }
                
                left++;
            }
            
            right++;
        }
        
        return minLen == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLen);
    }
    
    /**
     * Brute Force Approach (for comparison)
     * Time Complexity: O(m² * n)
     * Space Complexity: O(n)
     * @param s The source string
     * @param t The target string
     * @return Minimum window substring or empty string
     */
    public static String minWindowBruteForce(String s, String t) {
        if (s.length() < t.length()) return "";
        
        int minLen = Integer.MAX_VALUE;
        int minStart = 0;
        
        // Try all possible substrings
        for (int start = 0; start < s.length(); start++) {
            for (int end = start; end < s.length(); end++) {
                String substring = s.substring(start, end + 1);
                
                // Check if this substring contains all characters from t
                if (containsAllCharacters(substring, t)) {
                    int currentLen = end - start + 1;
                    if (currentLen < minLen) {
                        minLen = currentLen;
                        minStart = start;
                    }
                }
            }
        }
        
        return minLen == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLen);
    }
    
    /**
     * Helper function to check if a string contains all characters from another string
     * @param str The string to check
     * @param target The target string
     * @return True if str contains all characters from target
     */
    private static boolean containsAllCharacters(String str, String target) {
        Map<Character, Integer> charCount = new HashMap<>();
        
        // Count characters in target
        for (char c : target.toCharArray()) {
            charCount.put(c, charCount.getOrDefault(c, 0) + 1);
        }
        
        // Count characters in str
        for (char c : str.toCharArray()) {
            if (charCount.containsKey(c)) {
                charCount.put(c, charCount.get(c) - 1);
            }
        }
        
        // Check if all characters are covered
        for (int count : charCount.values()) {
            if (count > 0) return false;
        }
        
        return true;
    }
    
    /**
     * Find minimum window with additional information (returns both substring and indices)
     * @param s The source string
     * @param t The target string
     * @return Array containing [substring, startIndex, endIndex, length]
     */
    public static String[] minWindowWithInfo(String s, String t) {
        if (s.length() < t.length()) return new String[]{"", "-1", "-1", "0"};
        
        Map<Character, Integer> need = new HashMap<>();
        for (char c : t.toCharArray()) {
            need.put(c, need.getOrDefault(c, 0) + 1);
        }
        
        int required = need.size();
        int have = 0;
        int left = 0;
        int right = 0;
        int minLength = Integer.MAX_VALUE;
        int minLeft = 0;
        int minRight = 0;
        Map<Character, Integer> field = new HashMap<>();
        
        while (right < s.length()) {
            char c = s.charAt(right);
            field.put(c, field.getOrDefault(c, 0) + 1);
            
            if (need.containsKey(c) && field.get(c).intValue() == need.get(c).intValue()) {
                have++;
            }
            
            while (left <= right && have == required) {
                int currentLen = right - left + 1;
                if (currentLen < minLength) {
                    minLength = currentLen;
                    minLeft = left;
                    minRight = right;
                }
                
                char d = s.charAt(left);
                field.put(d, field.get(d) - 1);
                
                if (need.containsKey(d) && field.get(d).intValue() < need.get(d).intValue()) {
                    have--;
                }
                
                left++;
            }
            
            right++;
        }
        
        if (minLength == Integer.MAX_VALUE) {
            return new String[]{"", "-1", "-1", "0"};
        }
        
        String result = s.substring(minLeft, minRight + 1);
        return new String[]{result, String.valueOf(minLeft), String.valueOf(minRight), String.valueOf(minLength)};
    }
    
    // Test cases
    public static void runTests() {
        System.out.println("=== Minimum Window Substring Tests ===");
        
        String[][][] testCases = {
            {
                {"ADOBECODEBANC", "ABC"},
                {"BANC"},
                {"Standard case with multiple occurrences"}
            },
            {
                {"a", "a"},
                {"a"},
                {"Single character match"}
            },
            {
                {"a", "aa"},
                {""},
                {"No valid window (insufficient characters)"}
            },
            {
                {"aa", "aa"},
                {"aa"},
                {"Exact match"}
            },
            {
                {"aab", "aab"},
                {"aab"},
                {"Complete string match"}
            },
            {
                {"cabwefgewcwaefgcf", "cae"},
                {"cwae"},
                {"Complex case with multiple valid windows"}
            },
            {
                {"xyz", "abc"},
                {""},
                {"No common characters"}
            },
            {
                {"ADOBECODEBANC", "ABC"},
                {"BANC"},
                {"Multiple valid windows"}
            }
        };
        
        for (int i = 0; i < testCases.length; i++) {
            String s = testCases[i][0][0];
            String t = testCases[i][0][1];
            String expected = testCases[i][1][0];
            String description = testCases[i][2][0];
            
            String result = minWindow(s, t);
            String status = result.equals(expected) ? "PASS" : "FAIL";
            
            System.out.println("Test " + (i + 1) + ": " + status + " - " + description);
            System.out.println("  s = \"" + s + "\", t = \"" + t + "\"");
            System.out.println("  Expected: \"" + expected + "\", Got: \"" + result + "\"");
            System.out.println();
        }
    }
    
    // Performance comparison
    public static void performanceTest() {
        System.out.println("=== Performance Comparison ===");
        
        // Create test strings
        String s = "ADOBECODEBANC".repeat(1000); // Large string
        String t = "ABC";
        
        System.out.println("Testing with s length: " + s.length() + " and t length: " + t.length());
        
        // Test Sliding Window
        long start1 = System.nanoTime();
        String result1 = minWindow(s, t);
        long end1 = System.nanoTime();
        System.out.println("Sliding Window: \"" + result1 + "\" (" + (end1 - start1) / 1000000.0 + "ms)");
        
        // Test Alternative Approach
        long start2 = System.nanoTime();
        String result2 = minWindowAlternative(s, t);
        long end2 = System.nanoTime();
        System.out.println("Alternative Approach: \"" + result2 + "\" (" + (end2 - start2) / 1000000.0 + "ms)");
        
        // Test Brute Force (only for small strings due to O(m² * n) complexity)
        String smallS = s.substring(0, 50);
        long start3 = System.nanoTime();
        String result3 = minWindowBruteForce(smallS, t);
        long end3 = System.nanoTime();
        System.out.println("Brute Force (50 chars): \"" + result3 + "\" (" + (end3 - start3) / 1000000.0 + "ms)");
    }
    
    // Dry run demonstration
    public static void dryRun() {
        System.out.println("=== Dry Run Demonstration ===");
        
        String s = "ADOBECODEBANC";
        String t = "ABC";
        
        System.out.println("s = \"" + s + "\", t = \"" + t + "\"");
        System.out.println();
        
        // Create frequency map for t
        Map<Character, Integer> need = new HashMap<>();
        for (char c : t.toCharArray()) {
            need.put(c, need.getOrDefault(c, 0) + 1);
        }
        
        System.out.println("Need map: " + need);
        System.out.println("Required unique characters: " + need.size());
        System.out.println();
        
        int required = need.size();
        int have = 0;
        int left = 0;
        int right = 0;
        int minLength = Integer.MAX_VALUE;
        int minLeft = 0;
        Map<Character, Integer> field = new HashMap<>();
        
        System.out.println("Window expansion and contraction:");
        
        while (right < s.length()) {
            char c = s.charAt(right);
            field.put(c, field.getOrDefault(c, 0) + 1);
            
            System.out.println("Step " + right + ": Add '" + c + "' at position " + right);
            System.out.println("  Field map: " + field);
            
            if (need.containsKey(c) && field.get(c).intValue() == need.get(c).intValue()) {
                have++;
                System.out.println("  Have increased to " + have + "/" + required);
            }
            
            while (left <= right && have == required) {
                int currentLen = right - left + 1;
                System.out.println("  Valid window found: [" + left + ", " + right + "] = \"" + s.substring(left, right + 1) + "\" (length: " + currentLen + ")");
                
                if (currentLen < minLength) {
                    minLength = currentLen;
                    minLeft = left;
                    System.out.println("  New minimum: \"" + s.substring(minLeft, minLeft + minLength) + "\"");
                }
                
                char d = s.charAt(left);
                field.put(d, field.get(d) - 1);
                System.out.println("  Remove '" + d + "' from left, field map: " + field);
                
                if (need.containsKey(d) && field.get(d).intValue() < need.get(d).intValue()) {
                    have--;
                    System.out.println("  Have decreased to " + have + "/" + required);
                }
                
                left++;
            }
            
            right++;
            System.out.println();
        }
        
        System.out.println("Final result: \"" + s.substring(minLeft, minLeft + minLength) + "\"");
    }
    
    // Edge cases demonstration
    public static void edgeCases() {
        System.out.println("=== Edge Cases ===");
        
        String[][][] edgeCases = {
            {{"", "ABC"}, {"Empty source string"}},
            {{"ABC", ""}, {"Empty target string"}},
            {{"", ""}, {"Both strings empty"}},
            {{"A", "A"}, {"Single character match"}},
            {{"AA", "A"}, {"Multiple source, single target"}},
            {{"A", "AA"}, {"Single source, multiple target"}},
            {{"ABC", "ABC"}, {"Exact match"}},
            {{"ABCDEF", "XYZ"}, {"No common characters"}}
        };
        
        for (String[][] testCase : edgeCases) {
            String s = testCase[0][0];
            String t = testCase[0][1];
            String name = testCase[1][0];
            
            String result = minWindow(s, t);
            System.out.println(name + ": s=\"" + s + "\", t=\"" + t + "\" → \"" + result + "\"");
        }
    }
    
    // Demonstrate finding window with additional information
    public static void demonstrateWithInfo() {
        System.out.println("\n=== Finding Window with Additional Information ===");
        
        String s = "ADOBECODEBANC";
        String t = "ABC";
        
        System.out.println("s = \"" + s + "\", t = \"" + t + "\"");
        
        String[] result = minWindowWithInfo(s, t);
        String substring = result[0];
        int start = Integer.parseInt(result[1]);
        int end = Integer.parseInt(result[2]);
        int length = Integer.parseInt(result[3]);
        
        System.out.println("Minimum window substring: \"" + substring + "\"");
        System.out.println("Start index: " + start);
        System.out.println("End index: " + end);
        System.out.println("Length: " + length);
        
        // Verify the result
        if (!substring.isEmpty()) {
            System.out.println("Verification: substring from " + start + " to " + end + " = \"" + s.substring(start, end + 1) + "\"");
        }
    }
    
    public static void main(String[] args) {
        runTests();
        performanceTest();
        System.out.println();
        dryRun();
        System.out.println();
        edgeCases();
        demonstrateWithInfo();
    }
} 