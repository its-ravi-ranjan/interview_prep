/**
 * Longest Common Prefix
 * 
 * Problem: Write a function to find the longest common prefix string amongst an array of strings.
 * If there is no common prefix, return an empty string "".
 * 
 * Example:
 * Input: strs = ["flower","flow","flight"]
 * Output: "fl"
 * 
 * Input: strs = ["dog","racecar","car"]
 * Output: ""
 * 
 * Approach:
 * 1. Initialize a pointer x to track character positions in the first string
 * 2. Iterate through each character of the first string using while loop
 * 3. For every character at position x in the first string, compare it with the character at the same position in the other strings
 * 4. If a mismatch is found or if the current index exceeds the length of any string, return the substring from the first string from 0 to x
 * 5. If the loop completes without any mismatch, return the first string entirely
 * 
 * Time Complexity: O(n·m), where n is the number of strings and m is the length of the shortest string
 * Space Complexity: O(1), as no extra space is used apart from variables
 */

public class LongestCommonPrefix {
    
    /**
     * Find the longest common prefix among an array of strings
     * @param strs Array of strings
     * @return The longest common prefix, or empty string if none exists
     */
    public static String longestCommonPrefix(String[] strs) {
        int x = 0;
        while (x < strs[0].length()) {
            char ch = strs[0].charAt(x);
            for (int i = 1; i < strs.length; i++) {
                if (ch != strs[i].charAt(x) || x == strs[i].length()) {
                    return strs[0].substring(0, x);
                }
            }
            ++x;
        }
        return strs[0];
    }
    
    // Minimal test cases
    public static void runTests() {
        System.out.println("=== Longest Common Prefix Tests ===");
        
        String[][][] testCases = {
            {{"flower", "flow", "flight"}, {"fl"}},
            {{"dog", "racecar", "car"}, {""}},
            {{"interspecies", "interstellar", "interstate"}, {"inters"}},
            {{"hello", "hello", "hello"}, {"hello"}},
            {{"a", "b", "c"}, {""}}
        };
        
        for (int i = 0; i < testCases.length; i++) {
            String[] input = testCases[i][0];
            String expected = testCases[i][1][0];
            String result = longestCommonPrefix(input);
            String status = result.equals(expected) ? "PASS" : "FAIL";
            System.out.println("Test " + (i + 1) + ": " + status + " - Input: [" + String.join(", ", input) + "] -> \"" + result + "\"");
        }
    }
    
    public static void main(String[] args) {
        runTests();
    }
} 