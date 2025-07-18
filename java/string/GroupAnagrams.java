/**
 * Group Anagrams
 * 
 * Problem: Given an array of strings strs, group the anagrams together. You can return the answer in any order.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 * 
 * Example:
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 * 
 * Input: strs = [""]
 * Output: [[""]]
 * 
 * Input: strs = ["a"]
 * Output: [["a"]]
 * 
 * Approach 1 (Sorting):
 * 1. Initialize a hashmap to store grouped anagrams.
 * 2. For each word in the input list:
 *    - Sort the characters in the word alphabetically.
 *    - Use the sorted string as a key.
 *    - Add the original word to the list at that key.
 * 3. Return all grouped lists of anagrams from the hashmap.
 * 
 * Approach 2 (Frequency Counting):
 * 1. Initialize a hashmap to store grouped anagrams.
 * 2. For each word in the input array:
 *    - Create an array of size 26 to count frequency of each letter.
 *    - Convert that frequency array into a unique string key (like "#1#0#2…").
 *    - Use this string as a hash key to group anagrams.
 * 3. Return all the grouped values.
 * 
 * Time Complexity: 
 * - Approach 1: O(n·k·log k), where n is the number of strings and k is the average length of each string (due to sorting)
 * - Approach 2: O(n·k), where n = number of strings, k = average length of strings (no sorting)
 * Space Complexity: O(n·k), for storing grouped anagrams
 */

import java.util.*;

public class GroupAnagrams {
    
    /**
     * Group anagrams together using sorting approach
     * @param strs Array of strings
     * @return List of grouped anagrams
     */
    public static List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();

        for (String str : strs) {
            char[] charArray = str.toCharArray();
            Arrays.sort(charArray);
            String sortedStr = new String(charArray);

            if (!map.containsKey(sortedStr)) {
                map.put(sortedStr, new ArrayList<>());
            }
            map.get(sortedStr).add(str);
        }

        return new ArrayList<>(map.values());
    }
    
    /**
     * Group anagrams together using frequency counting approach
     * @param strs Array of strings
     * @return List of grouped anagrams
     */
    public static List<List<String>> groupAnagramsFrequency(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();

        for (String str : strs) {
            int[] freqArr = new int[26];
            
            for (char c : str.toCharArray()) {
                freqArr[c - 'a']++;
            }
            
            StringBuilder key = new StringBuilder();
            for (int i = 0; i < 26; i++) {
                key.append("#").append(freqArr[i]);
            }

            if (!map.containsKey(key.toString())) {
                map.put(key.toString(), new ArrayList<>());
            }
            map.get(key.toString()).add(str);
        }

        return new ArrayList<>(map.values());
    }
    
    // Minimal test cases
    public static void runTests() {
        System.out.println("=== Group Anagrams Tests ===");
        
        String[][][] testCases = {
            {
                {"eat", "tea", "tan", "ate", "nat", "bat"},
                {"bat", "nat,tan", "ate,eat,tea"}
            },
            {
                {""},
                {""}
            },
            {
                {"a"},
                {"a"}
            },
            {
                {"abc", "cba", "bac"},
                {"abc,cba,bac"}
            },
            {
                {"hello", "world", "olleh"},
                {"world", "hello,olleh"}
            }
        };
        
        for (int i = 0; i < testCases.length; i++) {
            String[] input = testCases[i][0];
            String[] expectedGroups = testCases[i][1];
            
            List<List<String>> result = groupAnagrams(input);
            boolean status = checkResult(result, expectedGroups);
            
            System.out.println("Test " + (i + 1) + ": " + (status ? "PASS" : "FAIL") + 
                             " - Input: [" + String.join(", ", input) + "]");
            System.out.println("  Result: " + formatResult(result));
        }
    }
    
    // Helper method to format result for display
    private static String formatResult(List<List<String>> result) {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < result.size(); i++) {
            sb.append("[").append(String.join(",", result.get(i))).append("]");
            if (i < result.size() - 1) sb.append(", ");
        }
        sb.append("]");
        return sb.toString();
    }
    
    // Helper method to check if result matches expected
    private static boolean checkResult(List<List<String>> result, String[] expectedGroups) {
        if (result.size() != expectedGroups.length) return false;
        
        // Convert result to comparable format
        List<String> resultGroups = new ArrayList<>();
        for (List<String> group : result) {
            List<String> sortedGroup = new ArrayList<>(group);
            Collections.sort(sortedGroup);
            resultGroups.add(String.join(",", sortedGroup));
        }
        Collections.sort(resultGroups);
        
        // Convert expected to comparable format
        List<String> expectedList = new ArrayList<>();
        for (String group : expectedGroups) {
            String[] words = group.split(",");
            Arrays.sort(words);
            expectedList.add(String.join(",", words));
        }
        Collections.sort(expectedList);
        
        return resultGroups.equals(expectedList);
    }
    
    public static void main(String[] args) {
        runTests();
    }
} 