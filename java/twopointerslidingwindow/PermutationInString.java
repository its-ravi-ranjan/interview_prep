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
public class PermutationInString {
    
    /**
     * Main method to check if s2 contains a permutation of s1
     */
    public boolean permutationInString(String s1, String s2) {
        // If s1 is longer than s2, no permutation can exist
        if (s1.length() > s2.length()) {
            return false;
        }
        
        // Arrays to track character frequencies
        int[] hashS1 = new int[26];  // Frequency of characters in s1
        int[] hashS2 = new int[26];  // Frequency of characters in current window of s2
        
        int left = 0;
        int right = s1.length() - 1;
        
        // Initialize frequency arrays with first window
        for (int i = 0; i < s1.length(); i++) {
            hashS1[s1.charAt(i) - 'a']++;
            hashS2[s2.charAt(i) - 'a']++;
        }
        
        // Slide the window and check for matches
        while (right < s2.length()) {
            if (isHashSame(hashS1, hashS2)) {
                return true;
            }
            
            right++;
            if (right < s2.length()) {
                // Remove leftmost character from window
                hashS2[s2.charAt(left) - 'a']--;
                left++;
                // Add rightmost character to window
                hashS2[s2.charAt(right) - 'a']++;
            }
        }
        
        return false;
    }
    
    /**
     * Helper method to compare two frequency arrays
     */
    private boolean isHashSame(int[] hashS1, int[] hashS2) {
        for (int i = 0; i < 26; i++) {
            if (hashS1[i] != hashS2[i]) {
                return false;
            }
        }
        return true;
    }
    
    /**
     * Alternative approach using a single frequency array
     * More efficient as it reduces the number of comparisons
     */
    public boolean permutationInStringOptimized(String s1, String s2) {
        if (s1.length() > s2.length()) {
            return false;
        }
        
        int[] count = new int[26];
        int matches = 0;
        
        // Count characters in s1
        for (char c : s1.toCharArray()) {
            count[c - 'a']++;
        }
        
        int left = 0;
        int right = 0;
        
        while (right < s2.length()) {
            char rightChar = s2.charAt(right);
            count[rightChar - 'a']--;
            
            // If character count becomes 0, we have a match
            if (count[rightChar - 'a'] == 0) {
                matches++;
            }
            // If character count becomes -1, we had an extra character
            else if (count[rightChar - 'a'] == -1) {
                matches--;
            }
            
            // If window size exceeds s1 length, remove leftmost character
            if (right - left + 1 > s1.length()) {
                char leftChar = s2.charAt(left);
                count[leftChar - 'a']++;
                
                // Update matches accordingly
                if (count[leftChar - 'a'] == 0) {
                    matches++;
                } else if (count[leftChar - 'a'] == 1) {
                    matches--;
                }
                
                left++;
            }
            
            // If all characters match, return true
            if (matches == 26) {
                return true;
            }
            
            right++;
        }
        
        return false;
    }
    
    /**
     * Test cases
     */
    public static void main(String[] args) {
        PermutationInString solution = new PermutationInString();
        
        // Test case 1: Valid permutation
        String s1 = "ab";
        String s2 = "eidbaooo";
        System.out.println("Test 1: s1 = \"" + s1 + "\", s2 = \"" + s2 + "\"");
        System.out.println("Expected: true, Got: " + solution.permutationInString(s1, s2));
        System.out.println("Optimized: " + solution.permutationInStringOptimized(s1, s2));
        System.out.println();
        
        // Test case 2: No permutation
        s1 = "ab";
        s2 = "eidboaoo";
        System.out.println("Test 2: s1 = \"" + s1 + "\", s2 = \"" + s2 + "\"");
        System.out.println("Expected: false, Got: " + solution.permutationInString(s1, s2));
        System.out.println("Optimized: " + solution.permutationInStringOptimized(s1, s2));
        System.out.println();
        
        // Test case 3: Single character
        s1 = "a";
        s2 = "ab";
        System.out.println("Test 3: s1 = \"" + s1 + "\", s2 = \"" + s2 + "\"");
        System.out.println("Expected: true, Got: " + solution.permutationInString(s1, s2));
        System.out.println("Optimized: " + solution.permutationInStringOptimized(s1, s2));
        System.out.println();
        
        // Test case 4: Same strings
        s1 = "abc";
        s2 = "abc";
        System.out.println("Test 4: s1 = \"" + s1 + "\", s2 = \"" + s2 + "\"");
        System.out.println("Expected: true, Got: " + solution.permutationInString(s1, s2));
        System.out.println("Optimized: " + solution.permutationInStringOptimized(s1, s2));
        System.out.println();
        
        // Test case 5: s1 longer than s2
        s1 = "abcd";
        s2 = "abc";
        System.out.println("Test 5: s1 = \"" + s1 + "\", s2 = \"" + s2 + "\"");
        System.out.println("Expected: false, Got: " + solution.permutationInString(s1, s2));
        System.out.println("Optimized: " + solution.permutationInStringOptimized(s1, s2));
        System.out.println();
        
        // Test case 6: Repeated characters
        s1 = "aab";
        s2 = "eidbaaoo";
        System.out.println("Test 6: s1 = \"" + s1 + "\", s2 = \"" + s2 + "\"");
        System.out.println("Expected: true, Got: " + solution.permutationInString(s1, s2));
        System.out.println("Optimized: " + solution.permutationInStringOptimized(s1, s2));
        System.out.println();
    }
} 