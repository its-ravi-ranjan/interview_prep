/**
 * Isomorphic Strings
 * 
 * Problem: Given two strings s and t, determine if they are isomorphic.
 * Two strings s and t are isomorphic if the characters in s can be replaced to get t.
 * All occurrences of a character must be replaced with another character while preserving
 * the order of characters. No two characters may map to the same character, but a character may map to itself.
 * 
 * Example:
 * Input: s = "egg", t = "add"
 * Output: true
 * 
 * Input: s = "foo", t = "bar"
 * Output: false
 * 
 * Input: s = "paper", t = "title"
 * Output: true
 * 
 * Approach:
 * 1. Initialize two maps: one from s to t and the other from t to s.
 * 2. Traverse both strings simultaneously.
 * 3. If a mapping doesn't exist in either direction, create it.
 * 4. If the mapping exists but doesn't match the current characters, return false.
 * 5. If the loop completes without conflicts, return true.
 * 
 * Time Complexity: O(n), where n is the length of the strings
 * Space Complexity: O(1), as the mappings are bounded by character set size
 */

import java.util.HashMap;
import java.util.Map;

public class IsIsomorphic {
    
    /**
     * Check if two strings are isomorphic
     * @param s First string
     * @param t Second string
     * @return true if isomorphic, false otherwise
     */
    public static boolean isIsomorphic(String s, String t) {
        Map<Character, Character> mapSToT = new HashMap<>();
        Map<Character, Character> mapTToS = new HashMap<>();

        for (int i = 0; i < s.length(); i++) {
            char charS = s.charAt(i);
            char charT = t.charAt(i);
            
            if (!mapSToT.containsKey(charS) && !mapTToS.containsKey(charT)) {
                mapSToT.put(charS, charT);
                mapTToS.put(charT, charS);
            } else if (!mapTToS.containsKey(charT) || !mapSToT.containsKey(charS) || 
                       mapTToS.get(charT) != charS || mapSToT.get(charS) != charT) {
                return false;
            }
        }

        return true;
    }
    
    // Minimal test cases
    public static void runTests() {
        System.out.println("=== Isomorphic Strings Tests ===");
        
        String[][] testCases = {
            {"egg", "add", "true"},
            {"foo", "bar", "false"},
            {"paper", "title", "true"},
            {"badc", "baba", "false"},
            {"", "", "true"},
            {"a", "a", "true"},
            {"ab", "aa", "false"}
        };
        
        for (int i = 0; i < testCases.length; i++) {
            String s = testCases[i][0];
            String t = testCases[i][1];
            boolean expected = Boolean.parseBoolean(testCases[i][2]);
            boolean result = isIsomorphic(s, t);
            String status = result == expected ? "PASS" : "FAIL";
            System.out.println("Test " + (i + 1) + ": " + status + " - \"" + s + "\" vs \"" + t + "\" -> " + result);
        }
    }
    
    public static void main(String[] args) {
        runTests();
    }
} 