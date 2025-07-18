/**
 * Valid Anagram
 * 
 * Problem: Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 * 
 * Example:
 * Input: s = "anagram", t = "nagaram"
 * Output: true
 * 
 * Input: s = "rat", t = "car"
 * Output: false
 * 
 * Approach:
 * 1. First, check if the lengths of both strings are equal. If not, return false.
 * 2. Create a hashmap (or character counter) to store the frequency of characters in the first string.
 * 3. Iterate over the second string and decrease the corresponding frequency in the map.
 * 4. If a character is not found or the count goes below zero, return false.
 * 5. If all characters match, return true at the end.
 * 
 * Time Complexity: O(n), where n is the length of the strings
 * Space Complexity: O(1), since the character set is limited to 26 lowercase letters
 */

import java.util.HashMap;
import java.util.Map;

public class IsAnagram {
    
    /**
     * Check if two strings are anagrams of each other
     * @param s First string
     * @param t Second string
     * @return true if anagrams, false otherwise
     */
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;

        Map<Character, Integer> map = new HashMap<>();

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            map.put(c, map.getOrDefault(c, 0) + 1);
        }

        for (int i = 0; i < t.length(); i++) {
            char c = t.charAt(i);
            if (!map.containsKey(c) || map.get(c) == 0) {
                return false;
            } else {
                map.put(c, map.get(c) - 1);
            }
        }

        return true;
    }
    
    // Minimal test cases
    public static void runTests() {
        System.out.println("=== Valid Anagram Tests ===");
        
        String[][] testCases = {
            {"anagram", "nagaram", "true"},
            {"rat", "car", "false"},
            {"listen", "silent", "true"},
            {"hello", "world", "false"},
            {"", "", "true"},
            {"a", "a", "true"},
            {"ab", "ba", "true"}
        };
        
        for (int i = 0; i < testCases.length; i++) {
            String s = testCases[i][0];
            String t = testCases[i][1];
            boolean expected = Boolean.parseBoolean(testCases[i][2]);
            boolean result = isAnagram(s, t);
            String status = result == expected ? "PASS" : "FAIL";
            System.out.println("Test " + (i + 1) + ": " + status + " - \"" + s + "\" vs \"" + t + "\" -> " + result);
        }
    }
    
    public static void main(String[] args) {
        runTests();
    }
} 