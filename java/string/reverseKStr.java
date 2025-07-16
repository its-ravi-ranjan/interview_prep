/**
 * Reverse String II
 * 
 * Problem Statement:
 * The problem requires reversing the first k characters for every 2k characters in a string. 
 * If there are fewer than k characters left, reverse all of them. 
 * If there are between k and 2k characters left, reverse the first k and leave the rest as is.
 * 
 * Examples:
 * Input: s = "abcdefg", k = 2
 * Output: "bacdfeg"
 * Explanation: 
 * - For the first 2k = 4 characters: reverse first k = 2 characters -> "bacd"
 * - For the remaining 3 characters: reverse first k = 2 characters -> "feg" becomes "feg"
 * 
 * Input: s = "abcd", k = 2
 * Output: "bacd"
 * Explanation: Reverse first 2 characters, leave the rest as is.
 * 
 * Steps:
 * Convert the string into a character array (if needed).
 * Iterate over the array in steps of 2k.
 * At each step, reverse the next k characters if available.
 * Join or return the modified string.
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n), where n = length of the string
 * Space Complexity: O(1) if in-place, else O(n)
 */

public class reverseStr {
    
    /**
     * Reverse the first k characters for every 2k characters in a string
     * @param s Input string
     * @param k Number of characters to reverse in each group
     * @return Modified string with reversed characters
     */
    public static String reverseStr(String s, int k) {
        char[] chars = s.toCharArray();

        for (int x = 0; x < chars.length; x = x + (2 * k)) {
            int n = Math.min(k, chars.length - x);
            int mid = n / 2;
            for (int i = 0; i < mid; i++) {
                char temp = chars[x + i];
                chars[x + i] = chars[x + n - 1 - i];
                chars[x + n - 1 - i] = temp;
            }
        }
        return new String(chars);
    }
    
    // Main method for testing
    public static void main(String[] args) {
        System.out.println("=== Reverse String II ===\n");
        
        // Test case 1: Basic case
        System.out.println("Test Case 1: s = 'abcdefg', k = 2");
        String s1 = "abcdefg";
        int k1 = 2;
        System.out.println("Input: s = " + s1 + ", k = " + k1);
        System.out.println("Result: " + reverseStr(s1, k1));
        System.out.println("Expected: 'bacdfeg'");
        System.out.println("Explanation: Reverse first 2 chars of every 4 chars");
        System.out.println("Correct: " + reverseStr(s1, k1).equals("bacdfeg"));
        System.out.println();
        
        // Test case 2: String length less than 2k
        System.out.println("Test Case 2: s = 'abcd', k = 2");
        String s2 = "abcd";
        int k2 = 2;
        System.out.println("Input: s = " + s2 + ", k = " + k2);
        System.out.println("Result: " + reverseStr(s2, k2));
        System.out.println("Expected: 'bacd'");
        System.out.println("Explanation: Reverse first 2 chars, leave rest as is");
        System.out.println("Correct: " + reverseStr(s2, k2).equals("bacd"));
        System.out.println();
        
        // Test case 3: String length exactly 2k
        System.out.println("Test Case 3: s = 'abcdef', k = 3");
        String s3 = "abcdef";
        int k3 = 3;
        System.out.println("Input: s = " + s3 + ", k = " + k3);
        System.out.println("Result: " + reverseStr(s3, k3));
        System.out.println("Expected: 'cbadef'");
        System.out.println("Explanation: Reverse first 3 chars of 6 chars");
        System.out.println("Correct: " + reverseStr(s3, k3).equals("cbadef"));
        System.out.println();
        
        // Test case 4: k = 1
        System.out.println("Test Case 4: s = 'hello', k = 1");
        String s4 = "hello";
        int k4 = 1;
        System.out.println("Input: s = " + s4 + ", k = " + k4);
        System.out.println("Result: " + reverseStr(s4, k4));
        System.out.println("Expected: 'hello'");
        System.out.println("Explanation: Reverse every other character");
        System.out.println("Correct: " + reverseStr(s4, k4).equals("hello"));
        System.out.println();
        
        // Test case 5: k larger than string length
        System.out.println("Test Case 5: s = 'abc', k = 5");
        String s5 = "abc";
        int k5 = 5;
        System.out.println("Input: s = " + s5 + ", k = " + k5);
        System.out.println("Result: " + reverseStr(s5, k5));
        System.out.println("Expected: 'cba'");
        System.out.println("Explanation: Reverse all characters since k > string length");
        System.out.println("Correct: " + reverseStr(s5, k5).equals("cba"));
        System.out.println();
    }
} 