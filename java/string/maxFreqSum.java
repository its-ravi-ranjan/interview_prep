import java.util.*;

/**
 * Maximum Frequency Sum
 * 
 * Problem Statement:
 * This problem requires finding the most frequently occurring vowel and consonant 
 * characters in a string, and returning the sum of their frequencies.
 * 
 * Examples:
 * Input: s = "hello"
 * Output: 3 (l appears 2 times, e appears 1 time, so 2 + 1 = 3)
 * 
 * Input: s = "leetcode"
 * Output: 4 (e appears 3 times, t appears 1 time, so 3 + 1 = 4)
 * 
 * Approach 1:
 * Initialize a character frequency map using a loop.
 * Define a list of vowels: ['a', 'e', 'i', 'o', 'u'].
 * Traverse the string and count how often each character appears.
 * Track the highest frequency vowel and the highest frequency consonant.
 * Return the sum of those two highest values.
 * 
 * Approach 2:
 * Use a Set for vowels and build frequency map in a single pass.
 * Track maximum frequencies for vowels and consonants simultaneously.
 * Return the sum of maximum frequencies.
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n), where n = length of the string
 * Space Complexity: O(k), where k = number of unique characters (at most 26 lowercase letters)
 */

public class maxFreqSum {
    
    /**
     * Approach 1: Two-pass with array for vowels
     * @param s Input string
     * @return Sum of max vowel frequency and max consonant frequency
     */
    public static int maxFreqSum(String s) {
        Map<Character, Integer> map = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            map.put(c, map.getOrDefault(c, 0) + 1);
        }

        char[] vowels = {'a', 'e', 'i', 'o', 'u'};
        int maxVowels = 0;
        int maxConsonant = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            boolean isVowel = false;
            for (char vowel : vowels) {
                if (c == vowel) {
                    isVowel = true;
                    break;
                }
            }
            
            if (isVowel) {
                maxVowels = Math.max(map.get(c), maxVowels);
            } else {
                maxConsonant = Math.max(map.get(c), maxConsonant);
            }
        }
        return maxConsonant + maxVowels;
    }
    
    /**
     * Approach 2: Single-pass with Set for vowels
     * @param s Input string
     * @return Sum of max vowel frequency and max consonant frequency
     */
    public static int maxFreqSumApproach2(String s) {
        Map<Character, Integer> charMap = new HashMap<>();
        Set<Character> vowelSet = new HashSet<>(Arrays.asList('a', 'e', 'i', 'o', 'u'));
        int maxVowelSum = 0;
        int maxConsonentSum = 0;
        
        for (char item : s.toCharArray()) {
            charMap.put(item, charMap.getOrDefault(item, 0) + 1);

            if (vowelSet.contains(item)) {
                maxVowelSum = Math.max(maxVowelSum, charMap.get(item));
            } else {
                maxConsonentSum = Math.max(maxConsonentSum, charMap.get(item));
            }
        }
        return maxConsonentSum + maxVowelSum;
    }
    
    // Main method for testing
    public static void main(String[] args) {
        System.out.println("=== Maximum Frequency Sum ===\n");
        
        // Test case 1: Basic case
        System.out.println("Test Case 1: s = 'hello'");
        String s1 = "hello";
        System.out.println("Input: " + s1);
        System.out.println("Approach 1 result: " + maxFreqSum(s1));
        System.out.println("Approach 2 result: " + maxFreqSumApproach2(s1));
        System.out.println("Expected: 3 (l=2, e=1)");
        System.out.println("Correct: " + (maxFreqSum(s1) == 3 && maxFreqSumApproach2(s1) == 3));
        System.out.println();
        
        // Test case 2: More complex case
        System.out.println("Test Case 2: s = 'leetcode'");
        String s2 = "leetcode";
        System.out.println("Input: " + s2);
        System.out.println("Approach 1 result: " + maxFreqSum(s2));
        System.out.println("Approach 2 result: " + maxFreqSumApproach2(s2));
        System.out.println("Expected: 4 (e=3, t=1)");
        System.out.println("Correct: " + (maxFreqSum(s2) == 4 && maxFreqSumApproach2(s2) == 4));
        System.out.println();
        
        // Test case 3: All vowels
        System.out.println("Test Case 3: s = 'aeiou'");
        String s3 = "aeiou";
        System.out.println("Input: " + s3);
        System.out.println("Approach 1 result: " + maxFreqSum(s3));
        System.out.println("Approach 2 result: " + maxFreqSumApproach2(s3));
        System.out.println("Expected: 1 (all vowels appear once)");
        System.out.println("Correct: " + (maxFreqSum(s3) == 1 && maxFreqSumApproach2(s3) == 1));
        System.out.println();
        
        // Test case 4: All consonants
        System.out.println("Test Case 4: s = 'bcdfg'");
        String s4 = "bcdfg";
        System.out.println("Input: " + s4);
        System.out.println("Approach 1 result: " + maxFreqSum(s4));
        System.out.println("Approach 2 result: " + maxFreqSumApproach2(s4));
        System.out.println("Expected: 1 (all consonants appear once)");
        System.out.println("Correct: " + (maxFreqSum(s4) == 1 && maxFreqSumApproach2(s4) == 1));
        System.out.println();
        
        // Test case 5: Repeated characters
        System.out.println("Test Case 5: s = 'aaaabbbcc'");
        String s5 = "aaaabbbcc";
        System.out.println("Input: " + s5);
        System.out.println("Approach 1 result: " + maxFreqSum(s5));
        System.out.println("Approach 2 result: " + maxFreqSumApproach2(s5));
        System.out.println("Expected: 7 (a=4, b=3)");
        System.out.println("Correct: " + (maxFreqSum(s5) == 7 && maxFreqSumApproach2(s5) == 7));
        System.out.println();
    }
} 