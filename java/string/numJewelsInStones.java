import java.util.*;

/**
 * Jewels and Stones
 * 
 * Problem Statement:
 * You're given strings jewels representing the types of stones that are jewels, 
 * and stones representing the stones you have. Each character in stones is a type 
 * of stone you have. You want to know how many of the stones you have are also jewels.
 * 
 * Letters are case sensitive, so "a" is different from "A".
 * jewels and stones consist of only English letters.
 * All characters in jewels are unique.
 * 
 * Examples:
 * Input: jewels = "aA", stones = "aAAbbbb"
 * Output: 3
 * 
 * Input: jewels = "z", stones = "ZZ"
 * Output: 0
 * 
 * Approach 1:
 * Use two nested loops: Outer loop over stones, inner loop over jewels.
 * If a character in stones matches any in jewels, increment the count.
 * Break inner loop once matched to avoid redundant checks.
 * 
 * Approach 2:
 * Use a Set (or hash set) to store all characters from jewels.
 * Loop through each character in stones.
 * Increment a counter for every character found in the jewels set.
 * 
 * Time and Space Complexity:
 * Approach 1: Time O(m × n), Space O(1)
 * Approach 2: Time O(n + m), Space O(1)
 */

public class numJewelsInStones {
    
    /**
     * Approach 1: Nested loops
     * @param jewels String representing jewel types
     * @param stones String representing stones you have
     * @return Number of stones that are jewels
     */
    public static int numJewelsInStones(String jewels, String stones) {
        int count = 0;
        for (int i = 0; i < stones.length(); i++) {
            for (int j = 0; j < jewels.length(); j++) {
                if (jewels.charAt(j) == stones.charAt(i)) {
                    ++count;
                    break;
                }
            }
        }
        return count;
    }
    
    /**
     * Approach 2: Using Set
     * @param jewels String representing jewel types
     * @param stones String representing stones you have
     * @return Number of stones that are jewels
     */
    public static int numJewelsInStonesApproach2(String jewels, String stones) {
        Set<Character> jSet = new HashSet<>();
        for (char c : jewels.toCharArray()) {
            jSet.add(c);
        }
        
        int count = 0;
        for (char c : stones.toCharArray()) {
            if (jSet.contains(c)) {
                count++;
            }
        }
        return count;
    }
    
    // Main method for testing
    public static void main(String[] args) {
        System.out.println("=== Jewels and Stones ===\n");
        
        // Test case 1: Basic case
        System.out.println("Test Case 1: jewels = 'aA', stones = 'aAAbbbb'");
        String jewels1 = "aA";
        String stones1 = "aAAbbbb";
        System.out.println("Input: jewels = " + jewels1 + ", stones = " + stones1);
        System.out.println("Approach 1 result: " + numJewelsInStones(jewels1, stones1));
        System.out.println("Approach 2 result: " + numJewelsInStonesApproach2(jewels1, stones1));
        System.out.println("Expected: 3");
        System.out.println("Correct: " + (numJewelsInStones(jewels1, stones1) == 3 && 
                numJewelsInStonesApproach2(jewels1, stones1) == 3));
        System.out.println();
        
        // Test case 2: No matches
        System.out.println("Test Case 2: jewels = 'z', stones = 'ZZ'");
        String jewels2 = "z";
        String stones2 = "ZZ";
        System.out.println("Input: jewels = " + jewels2 + ", stones = " + stones2);
        System.out.println("Approach 1 result: " + numJewelsInStones(jewels2, stones2));
        System.out.println("Approach 2 result: " + numJewelsInStonesApproach2(jewels2, stones2));
        System.out.println("Expected: 0");
        System.out.println("Correct: " + (numJewelsInStones(jewels2, stones2) == 0 && 
                numJewelsInStonesApproach2(jewels2, stones2) == 0));
        System.out.println();
        
        // Test case 3: All stones are jewels
        System.out.println("Test Case 3: jewels = 'abc', stones = 'abcabc'");
        String jewels3 = "abc";
        String stones3 = "abcabc";
        System.out.println("Input: jewels = " + jewels3 + ", stones = " + stones3);
        System.out.println("Approach 1 result: " + numJewelsInStones(jewels3, stones3));
        System.out.println("Approach 2 result: " + numJewelsInStonesApproach2(jewels3, stones3));
        System.out.println("Expected: 6");
        System.out.println("Correct: " + (numJewelsInStones(jewels3, stones3) == 6 && 
                numJewelsInStonesApproach2(jewels3, stones3) == 6));
        System.out.println();
        
        // Test case 4: Empty strings
        System.out.println("Test Case 4: jewels = '', stones = 'abc'");
        String jewels4 = "";
        String stones4 = "abc";
        System.out.println("Input: jewels = " + jewels4 + ", stones = " + stones4);
        System.out.println("Approach 1 result: " + numJewelsInStones(jewels4, stones4));
        System.out.println("Approach 2 result: " + numJewelsInStonesApproach2(jewels4, stones4));
        System.out.println("Expected: 0");
        System.out.println("Correct: " + (numJewelsInStones(jewels4, stones4) == 0 && 
                numJewelsInStonesApproach2(jewels4, stones4) == 0));
        System.out.println();
    }
} 