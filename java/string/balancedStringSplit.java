/**
 * Split a String in Balanced Strings
 * 
 * Problem Statement:
 * Balanced strings are those that have an equal quantity of 'L' and 'R' characters.
 * Given a balanced string s, split it into some number of substrings such that:
 * Each substring is balanced.
 * Return the maximum number of balanced strings you can obtain.
 * 
 * Examples:
 * Input: s = "RLRRLLRLRL"
 * Output: 4
 * Explanation: s can be split into "RL", "RRLL", "RL", "RL", each substring contains same number of 'L' and 'R'.
 * 
 * Input: s = "RLLLLRRRLR"
 * Output: 3
 * Explanation: s can be split into "RL", "LLLRRR", "LR", each substring contains same number of 'L' and 'R'.
 * 
 * Approach 1:
 * Use separate counters for 'L' and 'R' characters.
 * Increment respective counters when encountering each character.
 * When both counters are equal, increment the result count and reset both counters.
 * This approach tracks both characters explicitly.
 * 
 * Approach 2:
 * Use a single counter that increments for 'L' and decrements for 'R'.
 * When the counter reaches 0, it means we have a balanced substring.
 * This approach is more concise and uses less memory.
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n), where n is the length of the string
 * Space Complexity: O(1), constant extra space used
 */

public class balancedStringSplit {
    
    /**
     * Approach 1: Separate counters for L and R
     * @param s Input balanced string
     * @return Maximum number of balanced substrings
     */
    public static int balancedStringSplit(String s) {
        int rcount = 0;
        int lcount = 0;
        int count = 0;
        for (char item : s.toCharArray()) {
            if (item == 'L') {
                lcount++;
            }
            if (item == 'R') {
                rcount++;
            }
            if (rcount == lcount) {
                count++;
                lcount = 0;
                rcount = 0;
            }
        }
        return count;
    }
    
    /**
     * Approach 2: Single counter approach
     * @param s Input balanced string
     * @return Maximum number of balanced substrings
     */
    public static int balancedStringSplitApproach2(String s) {
        int dummyCount = 0;
        int count = 0;
        for (char item : s.toCharArray()) {
            if (item == 'L') {
                dummyCount++;
            }
            if (item == 'R') {
                dummyCount--;
            }
            if (dummyCount == 0) {
                count++;
            }
        }
        return count;
    }
    
    // Main method for testing
    public static void main(String[] args) {
        System.out.println("=== Split a String in Balanced Strings ===\n");
        
        // Test case 1: Basic case
        System.out.println("Test Case 1: s = 'RLRRLLRLRL'");
        String s1 = "RLRRLLRLRL";
        System.out.println("Input: " + s1);
        System.out.println("Approach 1 result: " + balancedStringSplit(s1));
        System.out.println("Approach 2 result: " + balancedStringSplitApproach2(s1));
        System.out.println("Expected: 4");
        System.out.println("Explanation: Can be split into 'RL', 'RRLL', 'RL', 'RL'");
        System.out.println("Correct: " + (balancedStringSplit(s1) == 4 && balancedStringSplitApproach2(s1) == 4));
        System.out.println();
        
        // Test case 2: Another balanced string
        System.out.println("Test Case 2: s = 'RLLLLRRRLR'");
        String s2 = "RLLLLRRRLR";
        System.out.println("Input: " + s2);
        System.out.println("Approach 1 result: " + balancedStringSplit(s2));
        System.out.println("Approach 2 result: " + balancedStringSplitApproach2(s2));
        System.out.println("Expected: 3");
        System.out.println("Explanation: Can be split into 'RL', 'LLLRRR', 'LR'");
        System.out.println("Correct: " + (balancedStringSplit(s2) == 3 && balancedStringSplitApproach2(s2) == 3));
        System.out.println();
        
        // Test case 3: Simple case
        System.out.println("Test Case 3: s = 'LLLLRRRR'");
        String s3 = "LLLLRRRR";
        System.out.println("Input: " + s3);
        System.out.println("Approach 1 result: " + balancedStringSplit(s3));
        System.out.println("Approach 2 result: " + balancedStringSplitApproach2(s3));
        System.out.println("Expected: 1");
        System.out.println("Explanation: Can be split into 'LLLLRRRR' (one balanced substring)");
        System.out.println("Correct: " + (balancedStringSplit(s3) == 1 && balancedStringSplitApproach2(s3) == 1));
        System.out.println();
    }
} 