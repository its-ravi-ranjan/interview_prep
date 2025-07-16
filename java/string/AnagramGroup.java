/**
 * Anagram Grouping Problem
 * 
 * Problem:
 * Given an array of strings, group all strings that have the same set of unique characters.
 * Strings with the same set of unique characters (regardless of frequency) should be grouped together.
 * 
 * Example:
 * Input: words[] = { "may", "student", "students", "dog",
 *                   "studentssess", "god", "cat", "act",
 *                   "tab", "bat", "flow", "wolf", "lambs",
 *                   "amy", "yam", "balms", "looped", 
 *                   "poodle"}
 * 
 * Output:
 * looped, poodle,
 * lambs, balms,
 * flow, wolf,
 * tab, bat,
 * 
 * Approach:
 * 1. For each word:
 *    - Convert to lowercase
 *    - Get unique characters using HashSet
 *    - Sort unique characters
 *    - Use sorted unique characters as key in HashMap
 *    - Add word to list of words with same key
 * 2. Print all groups that have more than one word
 * 
 * Time Complexity: O(n * m * log m)
 * - n = number of words
 * - m = average length of words
 * - For each word:
 *   - Converting to lowercase: O(m)
 *   - Creating HashSet: O(m)
 *   - Sorting unique characters: O(m log m)
 *   - HashMap operations: O(1) average case
 * 
 * Space Complexity: O(n * m)
 * - HashMap stores all words
 * - Each word can be up to m characters
 * - Additional space for temporary arrays and sets
 */

import java.util.*;

public class AnagramGroup {
    /**
     * Groups strings that have the same set of unique characters.
     * @param words Array of input strings
     */
    public static void groupStrings(String[] words) {
        // HashMap to store groups of words with same unique characters
        // Key: sorted unique characters of a word
        // Value: list of words with those unique characters
        Map<String, List<String>> groups = new HashMap<>();
        
        // Process each word
        for (String word : words) {
            // Convert word to lowercase for case-insensitive comparison
            String lowerWord = word.toLowerCase();
            
            // Get unique characters using HashSet
            Set<Character> uniqueChars = new HashSet<>();
            for (char c : lowerWord.toCharArray()) {
                uniqueChars.add(c);
            }
            
            // Sort unique characters to create consistent key
            List<Character> sortedChars = new ArrayList<>(uniqueChars);
            Collections.sort(sortedChars);
            
            // Create key from sorted unique characters
            StringBuilder keyBuilder = new StringBuilder();
            for (char c : sortedChars) {
                keyBuilder.append(c);
            }
            String key = keyBuilder.toString();
            
            // Add word to appropriate group
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(word);
        }
        
        // Print groups with more than one word
        for (List<String> group : groups.values()) {
            if (group.size() > 1) {
                System.out.println(String.join(", ", group) + ",");
            }
        }
    }

    /**
     * Alternative implementation using character frequency approach.
     * This approach is more efficient for words with many repeated characters.
     * @param words Array of input strings
     */
    public static void groupStringsUsingFrequency(String[] words) {
        Map<String, List<String>> groups = new HashMap<>();
        
        for (String word : words) {
            // Convert to lowercase
            String lowerWord = word.toLowerCase();
            
            // Count frequency of each character
            int[] charCount = new int[26]; // Assuming only lowercase letters
            for (char c : lowerWord.toCharArray()) {
                charCount[c - 'a']++;
            }
            
            // Create key from character presence (1 if present, 0 if not)
            StringBuilder keyBuilder = new StringBuilder();
            for (int count : charCount) {
                keyBuilder.append(count > 0 ? '1' : '0');
            }
            String key = keyBuilder.toString();
            
            // Add word to appropriate group
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(word);
        }
        
        // Print groups with more than one word
        for (List<String> group : groups.values()) {
            if (group.size() > 1) {
                System.out.println(String.join(", ", group) + ",");
            }
        }
    }

    public static void main(String[] args) {
        // Test case 1: Original example
        System.out.println("Test case 1: Original example");
        String[] words1 = {
            "may", "student", "students", "dog",
            "studentssess", "god", "cat", "act",
            "tab", "bat", "flow", "wolf", "lambs",
            "amy", "yam", "balms", "looped", 
            "poodle"
        };
        System.out.println("Using unique characters approach:");
        groupStrings(words1);
        System.out.println("\nUsing frequency approach:");
        groupStringsUsingFrequency(words1);

        // Test case 2: Empty array
        System.out.println("\nTest case 2: Empty array");
        String[] words2 = {};
        System.out.println("Using unique characters approach:");
        groupStrings(words2);
        System.out.println("\nUsing frequency approach:");
        groupStringsUsingFrequency(words2);

        // Test case 3: Single word
        System.out.println("\nTest case 3: Single word");
        String[] words3 = {"hello"};
        System.out.println("Using unique characters approach:");
        groupStrings(words3);
        System.out.println("\nUsing frequency approach:");
        groupStringsUsingFrequency(words3);

        // Test case 4: No groups
        System.out.println("\nTest case 4: No groups");
        String[] words4 = {"cat", "dog", "bird"};
        System.out.println("Using unique characters approach:");
        groupStrings(words4);
        System.out.println("\nUsing frequency approach:");
        groupStringsUsingFrequency(words4);

        // Test case 5: Case sensitivity
        System.out.println("\nTest case 5: Case sensitivity");
        String[] words5 = {"Cat", "cat", "ACT", "act"};
        System.out.println("Using unique characters approach:");
        groupStrings(words5);
        System.out.println("\nUsing frequency approach:");
        groupStringsUsingFrequency(words5);
    }
} 