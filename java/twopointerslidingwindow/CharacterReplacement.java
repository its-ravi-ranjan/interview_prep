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
public class CharacterReplacement {
    
    public int characterReplacement(String s, int k) {
        if (s == null || s.length() == 0) {
            return 0;
        }
        
        int left = 0;
        int right = 0;
        int[] charCount = new int[26];
        int maxCount = 0;
        int result = 0;
        
        // Initialize with first character
        charCount[s.charAt(0) - 'A'] = 1;
        
        while (right < s.length()) {
            // Check if current window is valid
            if (isValidWindow(charCount, k)) {
                result = Math.max(result, right - left + 1);
                right++;
                if (right < s.length()) {
                    charCount[s.charAt(right) - 'A']++;
                }
            } else {
                // Shrink window from left
                charCount[s.charAt(left) - 'A']--;
                left++;
            }
        }
        
        return result;
    }
    
    private boolean isValidWindow(int[] charCount, int k) {
        int totalCount = 0;
        int maxCharCount = 0;
        
        for (int i = 0; i < 26; i++) {
            totalCount += charCount[i];
            maxCharCount = Math.max(maxCharCount, charCount[i]);
        }
        
        // If we can replace all other characters with the most frequent one
        return (totalCount - maxCharCount) <= k;
    }
    
    // Alternative optimized approach
    public int characterReplacementOptimized(String s, int k) {
        if (s == null || s.length() == 0) {
            return 0;
        }
        
        int[] charCount = new int[26];
        int left = 0;
        int maxCount = 0;
        int result = 0;
        
        for (int right = 0; right < s.length(); right++) {
            charCount[s.charAt(right) - 'A']++;
            maxCount = Math.max(maxCount, charCount[s.charAt(right) - 'A']);
            
            // If window size - maxCount > k, we need to shrink window
            if (right - left + 1 - maxCount > k) {
                charCount[s.charAt(left) - 'A']--;
                left++;
            }
            
            result = Math.max(result, right - left + 1);
        }
        
        return result;
    }
    
    // Alternative approach using HashMap for better readability
    public int characterReplacementWithMap(String s, int k) {
        if (s == null || s.length() == 0) {
            return 0;
        }
        
        java.util.Map<Character, Integer> charCount = new java.util.HashMap<>();
        int left = 0;
        int maxCount = 0;
        int result = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char rightChar = s.charAt(right);
            charCount.put(rightChar, charCount.getOrDefault(rightChar, 0) + 1);
            maxCount = Math.max(maxCount, charCount.get(rightChar));
            
            // If window size - maxCount > k, we need to shrink window
            if (right - left + 1 - maxCount > k) {
                char leftChar = s.charAt(left);
                charCount.put(leftChar, charCount.get(leftChar) - 1);
                left++;
            }
            
            result = Math.max(result, right - left + 1);
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        CharacterReplacement solution = new CharacterReplacement();
        
        // Test Case 1
        System.out.println("Test Case 1:");
        String s1 = "ABAB";
        int k1 = 2;
        int result1 = solution.characterReplacement(s1, k1);
        System.out.println("Input: s = \"" + s1 + "\", k = " + k1);
        System.out.println("Output: " + result1);
        System.out.println("Expected: 4");
        System.out.println();
        
        // Test Case 2
        System.out.println("Test Case 2:");
        String s2 = "AABABBA";
        int k2 = 1;
        int result2 = solution.characterReplacement(s2, k2);
        System.out.println("Input: s = \"" + s2 + "\", k = " + k2);
        System.out.println("Output: " + result2);
        System.out.println("Expected: 4");
        System.out.println();
        
        // Test Case 3
        System.out.println("Test Case 3:");
        String s3 = "AAAA";
        int k3 = 2;
        int result3 = solution.characterReplacement(s3, k3);
        System.out.println("Input: s = \"" + s3 + "\", k = " + k3);
        System.out.println("Output: " + result3);
        System.out.println("Expected: 4");
        System.out.println();
        
        // Test Case 4 - All characters can be replaced
        System.out.println("Test Case 4:");
        String s4 = "ABCD";
        int k4 = 3;
        int result4 = solution.characterReplacement(s4, k4);
        System.out.println("Input: s = \"" + s4 + "\", k = " + k4);
        System.out.println("Output: " + result4);
        System.out.println("Expected: 4");
        System.out.println();
        
        // Test Case 5 - No replacements allowed
        System.out.println("Test Case 5:");
        String s5 = "ABCD";
        int k5 = 0;
        int result5 = solution.characterReplacement(s5, k5);
        System.out.println("Input: s = \"" + s5 + "\", k = " + k5);
        System.out.println("Output: " + result5);
        System.out.println("Expected: 1");
        System.out.println();
        
        // Test Case 6 - Single character string
        System.out.println("Test Case 6:");
        String s6 = "A";
        int k6 = 1;
        int result6 = solution.characterReplacement(s6, k6);
        System.out.println("Input: s = \"" + s6 + "\", k = " + k6);
        System.out.println("Output: " + result6);
        System.out.println("Expected: 1");
        System.out.println();
        
        // Test Case 7 - Large k value
        System.out.println("Test Case 7:");
        String s7 = "ABCDEF";
        int k7 = 10;
        int result7 = solution.characterReplacement(s7, k7);
        System.out.println("Input: s = \"" + s7 + "\", k = " + k7);
        System.out.println("Output: " + result7);
        System.out.println("Expected: 6");
        System.out.println();
        
        // Performance comparison
        System.out.println("Performance Comparison:");
        String longS = "A".repeat(10000) + "B".repeat(10000);
        int longK = 5000;
        
        long startTime = System.currentTimeMillis();
        int result8 = solution.characterReplacement(longS, longK);
        long endTime = System.currentTimeMillis();
        System.out.println("Basic approach time: " + (endTime - startTime) + "ms, Result: " + result8);
        
        startTime = System.currentTimeMillis();
        int result9 = solution.characterReplacementOptimized(longS, longK);
        endTime = System.currentTimeMillis();
        System.out.println("Optimized approach time: " + (endTime - startTime) + "ms, Result: " + result9);
        
        startTime = System.currentTimeMillis();
        int result10 = solution.characterReplacementWithMap(longS, longK);
        endTime = System.currentTimeMillis();
        System.out.println("Map approach time: " + (endTime - startTime) + "ms, Result: " + result10);
        
        // Verify all approaches give same result
        System.out.println("\nVerification:");
        System.out.println("All approaches give same result: " + 
            (result8 == result9 && result9 == result10));
    }
} 