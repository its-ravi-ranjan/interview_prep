/**
 * Length of Last Word
 * 
 * Problem Statement:
 * Given a string s consisting of words and spaces, return the length of the last word in the string.
 * A word is defined as a maximal substring consisting of non-space characters only.
 * 
 * Examples:
 * Input: s = "Hello World"
 * Output: 5
 * 
 * Input: s = "   fly me   to   the moon  "
 * Output: 4
 * 
 * Input: s = "luffy is still joyboy"
 * Output: 6
 * 
 * Approach 1:
 * Start from the end of the string and skip any trailing spaces.
 * Count the number of characters in the last word until a space or the beginning of the string is reached.
 * This ensures we efficiently find the last word without extra space.
 * 
 * Approach 2:
 * Start from the end and skip trailing spaces.
 * Count characters until the next space or beginning of string.
 * This gives the length of the last word efficiently.
 * 
 * Time and Space Complexity:
 * Time Complexity: O(n) — Traverse the string once from the end.
 * Space Complexity: O(1) — No extra space used apart from counters.
 */

public class lengthOfLastWord {
    
    /**
     * Approach 1: Skip trailing spaces then count characters
     * @param s Input string
     * @return Length of the last word
     */
    public static int lengthOfLastWord(String s) {
        int n = s.length() - 1;
        while (n >= 0 && s.charAt(n) == ' ') n--;

        int count = 0;
        while (n >= 0 && s.charAt(n) != ' ') {
            count++;
            n--;
        }

        return count;
    }
    
    /**
     * Approach 2: Count characters until space is encountered
     * @param s Input string
     * @return Length of the last word
     */
    public static int lengthOfLastWordApproach2(String s) {
        int n = s.length() - 1;
        int count = 0;

        while (n >= 0) {
            if (s.charAt(n) != ' ') {
                count++;
            } else if (count > 0) {
                break;
            }
            n--;
        }

        return count;
    }
    
    // Main method for testing
    public static void main(String[] args) {
        System.out.println("=== Length of Last Word ===\n");
        
        // Test case 1: Simple case
        System.out.println("Test Case 1: 'Hello World'");
        String s1 = "Hello World";
        System.out.println("Input: \"" + s1 + "\"");
        System.out.println("Approach 1 result: " + lengthOfLastWord(s1));
        System.out.println("Approach 2 result: " + lengthOfLastWordApproach2(s1));
        System.out.println("Expected: 5");
        System.out.println("Correct: " + (lengthOfLastWord(s1) == 5 && lengthOfLastWordApproach2(s1) == 5));
        System.out.println();
        
        // Test case 2: Multiple spaces
        System.out.println("Test Case 2: '   fly me   to   the moon  '");
        String s2 = "   fly me   to   the moon  ";
        System.out.println("Input: \"" + s2 + "\"");
        System.out.println("Approach 1 result: " + lengthOfLastWord(s2));
        System.out.println("Approach 2 result: " + lengthOfLastWordApproach2(s2));
        System.out.println("Expected: 4");
        System.out.println("Correct: " + (lengthOfLastWord(s2) == 4 && lengthOfLastWordApproach2(s2) == 4));
        System.out.println();
        
        // Test case 3: Single word
        System.out.println("Test Case 3: 'luffy is still joyboy'");
        String s3 = "luffy is still joyboy";
        System.out.println("Input: \"" + s3 + "\"");
        System.out.println("Approach 1 result: " + lengthOfLastWord(s3));
        System.out.println("Approach 2 result: " + lengthOfLastWordApproach2(s3));
        System.out.println("Expected: 6");
        System.out.println("Correct: " + (lengthOfLastWord(s3) == 6 && lengthOfLastWordApproach2(s3) == 6));
        System.out.println();
        
        // Test case 4: Only spaces
        System.out.println("Test Case 4: '   '");
        String s4 = "   ";
        System.out.println("Input: \"" + s4 + "\"");
        System.out.println("Approach 1 result: " + lengthOfLastWord(s4));
        System.out.println("Approach 2 result: " + lengthOfLastWordApproach2(s4));
        System.out.println("Expected: 0");
        System.out.println("Correct: " + (lengthOfLastWord(s4) == 0 && lengthOfLastWordApproach2(s4) == 0));
        System.out.println();
    }
} 