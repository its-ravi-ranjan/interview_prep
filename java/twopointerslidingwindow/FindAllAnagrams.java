import java.util.*;

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
public class FindAllAnagrams {
    
    public List<Integer> findAnagrams(String s, String p) {
        List<Integer> result = new ArrayList<>();
        
        // Edge case: if pattern is longer than string
        if (p.length() > s.length()) {
            return result;
        }
        
        // Frequency arrays for pattern and current window
        int[] patternFreq = new int[26];
        int[] windowFreq = new int[26];
        
        // Initialize pattern frequency
        for (int i = 0; i < p.length(); i++) {
            patternFreq[p.charAt(i) - 'a']++;
        }
        
        // Initialize window frequency with first p.length() characters
        for (int i = 0; i < p.length(); i++) {
            windowFreq[s.charAt(i) - 'a']++;
        }
        
        // Sliding window
        int left = 0;
        int right = p.length() - 1;
        
        while (right < s.length()) {
            // Check if current window is an anagram
            if (isMatching(patternFreq, windowFreq)) {
                result.add(left);
            }
            
            // Slide window
            right++;
            if (right < s.length()) {
                windowFreq[s.charAt(left) - 'a']--;  // Remove leftmost character
                left++;
                windowFreq[s.charAt(right) - 'a']++; // Add rightmost character
            }
        }
        
        return result;
    }
    
    private boolean isMatching(int[] patternFreq, int[] windowFreq) {
        for (int i = 0; i < 26; i++) {
            if (patternFreq[i] != windowFreq[i]) {
                return false;
            }
        }
        return true;
    }
    
    // Alternative optimized approach using a single counter
    public List<Integer> findAnagramsOptimized(String s, String p) {
        List<Integer> result = new ArrayList<>();
        
        if (p.length() > s.length()) {
            return result;
        }
        
        int[] freq = new int[26];
        int count = 0; // Number of characters that need to be matched
        
        // Initialize pattern frequency
        for (char c : p.toCharArray()) {
            freq[c - 'a']++;
        }
        
        // Count how many characters need to be matched
        for (int i = 0; i < 26; i++) {
            if (freq[i] > 0) {
                count++;
            }
        }
        
        int left = 0, right = 0;
        
        while (right < s.length()) {
            char rightChar = s.charAt(right);
            
            // Decrease frequency of right character
            freq[rightChar - 'a']--;
            
            // If frequency becomes 0, we've matched all occurrences of this character
            if (freq[rightChar - 'a'] == 0) {
                count--;
            }
            // If frequency becomes -1, we've exceeded the required count
            else if (freq[rightChar - 'a'] == -1) {
                count++;
            }
            
            // If window size equals pattern length
            if (right - left + 1 == p.length()) {
                // If count is 0, all characters are matched
                if (count == 0) {
                    result.add(left);
                }
                
                // Move left pointer
                char leftChar = s.charAt(left);
                freq[leftChar - 'a']++;
                
                // If frequency becomes 0, we've lost a match
                if (freq[leftChar - 'a'] == 0) {
                    count--;
                }
                // If frequency becomes 1, we've regained a match
                else if (freq[leftChar - 'a'] == 1) {
                    count++;
                }
                
                left++;
            }
            
            right++;
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        FindAllAnagrams solution = new FindAllAnagrams();
        
        // Test Case 1
        System.out.println("Test Case 1:");
        String s1 = "cbaebabacd";
        String p1 = "abc";
        List<Integer> result1 = solution.findAnagrams(s1, p1);
        System.out.println("Input: s = \"" + s1 + "\", p = \"" + p1 + "\"");
        System.out.println("Output: " + result1);
        System.out.println("Expected: [0, 6]");
        System.out.println();
        
        // Test Case 2
        System.out.println("Test Case 2:");
        String s2 = "abab";
        String p2 = "ab";
        List<Integer> result2 = solution.findAnagrams(s2, p2);
        System.out.println("Input: s = \"" + s2 + "\", p = \"" + p2 + "\"");
        System.out.println("Output: " + result2);
        System.out.println("Expected: [0, 1, 2]");
        System.out.println();
        
        // Test Case 3
        System.out.println("Test Case 3:");
        String s3 = "aaaaaaaaaa";
        String p3 = "aaaaa";
        List<Integer> result3 = solution.findAnagrams(s3, p3);
        System.out.println("Input: s = \"" + s3 + "\", p = \"" + p3 + "\"");
        System.out.println("Output: " + result3);
        System.out.println("Expected: [0, 1, 2, 3, 4, 5]");
        System.out.println();
        
        // Test Case 4 - No anagrams found
        System.out.println("Test Case 4:");
        String s4 = "abcdef";
        String p4 = "xyz";
        List<Integer> result4 = solution.findAnagrams(s4, p4);
        System.out.println("Input: s = \"" + s4 + "\", p = \"" + p4 + "\"");
        System.out.println("Output: " + result4);
        System.out.println("Expected: []");
        System.out.println();
        
        // Test Case 5 - Pattern longer than string
        System.out.println("Test Case 5:");
        String s5 = "abc";
        String p5 = "abcd";
        List<Integer> result5 = solution.findAnagrams(s5, p5);
        System.out.println("Input: s = \"" + s5 + "\", p = \"" + p5 + "\"");
        System.out.println("Output: " + result5);
        System.out.println("Expected: []");
        System.out.println();
        
        // Performance comparison
        System.out.println("Performance Comparison:");
        String longS = "a".repeat(10000) + "b".repeat(10000);
        String longP = "a".repeat(5000);
        
        long startTime = System.currentTimeMillis();
        List<Integer> result6 = solution.findAnagrams(longS, longP);
        long endTime = System.currentTimeMillis();
        System.out.println("Basic approach time: " + (endTime - startTime) + "ms");
        
        startTime = System.currentTimeMillis();
        List<Integer> result7 = solution.findAnagramsOptimized(longS, longP);
        endTime = System.currentTimeMillis();
        System.out.println("Optimized approach time: " + (endTime - startTime) + "ms");
    }
} 