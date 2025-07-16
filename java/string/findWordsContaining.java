import java.util.*;

/**
 * Find Words Containing Character
 * 
 * Problem Statement:
 * You are given a 0-indexed array of strings words and a character x. 
 * Return an array of indices representing the words that contain the character x.
 * The returned array can be in any order.
 * 
 * Examples:
 * Input: words = ["leet","code"], x = "e"
 * Output: [0,1]
 * 
 * Input: words = ["abc","bcd","aaaa","cbc"], x = "a"
 * Output: [0,2]
 * 
 * Input: words = ["abc","bcd","aaaa","cbc"], x = "z"
 * Output: []
 * 
 * Approach:
 * Use two nested loops: Outer loop for each word, inner loop for each character in the word.
 * If character x is found in a word, push its index to the result array and break.
 * 
 * Time and Space Complexity:
 * Time Complexity: O(m × n) — where m is the number of words, and n is the max length of a word.
 * Space Complexity: O(1) — constant extra space (excluding result array).
 */

public class findWordsContaining {
    
    /**
     * Find indices of words containing the character x
     * @param words Array of strings
     * @param x Character to search for
     * @return Array of indices of words containing x
     */
    public static List<Integer> findWordsContaining(String[] words, char x) {
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < words.length; i++) {
            for (int j = 0; j < words[i].length(); j++) {
                if (words[i].charAt(j) == x) {
                    res.add(i);
                    break;
                }
            }
        }
        return res;
    }
    
    /**
     * Helper method to check if two lists are equal (ignoring order)
     * @param list1 First list
     * @param list2 Second list
     * @return true if lists contain same elements, false otherwise
     */
    public static boolean listsEqual(List<Integer> list1, List<Integer> list2) {
        if (list1.size() != list2.size()) {
            return false;
        }
        
        List<Integer> sorted1 = new ArrayList<>(list1);
        List<Integer> sorted2 = new ArrayList<>(list2);
        Collections.sort(sorted1);
        Collections.sort(sorted2);
        
        return sorted1.equals(sorted2);
    }
    
    // Main method for testing
    public static void main(String[] args) {
        System.out.println("=== Find Words Containing Character ===\n");
        
        // Test case 1: Basic case
        System.out.println("Test Case 1: words = ['leet','code'], x = 'e'");
        String[] words1 = {"leet", "code"};
        char x1 = 'e';
        System.out.println("Input: " + Arrays.toString(words1) + ", x = " + x1);
        List<Integer> result1 = findWordsContaining(words1, x1);
        System.out.println("Result: " + result1);
        System.out.println("Expected: [0, 1]");
        System.out.println("Correct: " + listsEqual(result1, Arrays.asList(0, 1)));
        System.out.println();
        
        // Test case 2: Character appears in multiple words
        System.out.println("Test Case 2: words = ['abc','bcd','aaaa','cbc'], x = 'a'");
        String[] words2 = {"abc", "bcd", "aaaa", "cbc"};
        char x2 = 'a';
        System.out.println("Input: " + Arrays.toString(words2) + ", x = " + x2);
        List<Integer> result2 = findWordsContaining(words2, x2);
        System.out.println("Result: " + result2);
        System.out.println("Expected: [0, 2]");
        System.out.println("Correct: " + listsEqual(result2, Arrays.asList(0, 2)));
        System.out.println();
        
        // Test case 3: Character not found
        System.out.println("Test Case 3: words = ['abc','bcd','aaaa','cbc'], x = 'z'");
        String[] words3 = {"abc", "bcd", "aaaa", "cbc"};
        char x3 = 'z';
        System.out.println("Input: " + Arrays.toString(words3) + ", x = " + x3);
        List<Integer> result3 = findWordsContaining(words3, x3);
        System.out.println("Result: " + result3);
        System.out.println("Expected: []");
        System.out.println("Correct: " + result3.isEmpty());
        System.out.println();
        
        // Test case 4: Empty array
        System.out.println("Test Case 4: words = [], x = 'a'");
        String[] words4 = {};
        char x4 = 'a';
        System.out.println("Input: " + Arrays.toString(words4) + ", x = " + x4);
        List<Integer> result4 = findWordsContaining(words4, x4);
        System.out.println("Result: " + result4);
        System.out.println("Expected: []");
        System.out.println("Correct: " + result4.isEmpty());
        System.out.println();
        
        // Test case 5: Single character words
        System.out.println("Test Case 5: words = ['a','b','c','d'], x = 'a'");
        String[] words5 = {"a", "b", "c", "d"};
        char x5 = 'a';
        System.out.println("Input: " + Arrays.toString(words5) + ", x = " + x5);
        List<Integer> result5 = findWordsContaining(words5, x5);
        System.out.println("Result: " + result5);
        System.out.println("Expected: [0]");
        System.out.println("Correct: " + result5.equals(Arrays.asList(0)));
        System.out.println();
    }
} 