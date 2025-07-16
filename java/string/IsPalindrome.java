/**
 * Valid Palindrome - First Approach
 * 
 * Problem: Given a string s, return true if it is a palindrome, or false otherwise.
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase letters 
 * and removing all non-alphanumeric characters, it reads the same forward and backward.
 * 
 * Example:
 * Input: s = "A man, a plan, a canal: Panama"
 * Output: true
 * Explanation: "amanaplanacanalpanama" is a palindrome.
 * 
 * Input: s = "race a car"
 * Output: false
 * Explanation: "raceacar" is not a palindrome.
 * 
 * Input: s = " "
 * Output: true
 * Explanation: s is an empty string "" after removing non-alphanumeric characters.
 * Since an empty string reads the same forward and backward, it is a palindrome.
 * 
 * Approach 1:
 * 1. Convert the string to lowercase to ensure case-insensitive comparison
 * 2. Traverse each character in the string
 * 3. Keep only alphanumeric characters using Character.isLetterOrDigit()
 * 4. Build a filtered version and its reverse simultaneously
 * 5. Return true if both strings are equal, else return false
 * 
 * Time Complexity: O(n), where n is the length of the input string
 * Space Complexity: O(n), due to additional filtered and reversed strings
 * 
 * Approach 2 (Two-Pointer):
 * 1. Convert the string to lowercase to simplify comparison
 * 2. Initialize two pointers: one at the start and one at the end of the string
 * 3. Move both pointers toward the center while skipping non-alphanumeric characters
 * 4. Compare the characters at both pointers
 * 5. If they differ, return false. If they match, continue moving
 * 6. If all valid characters match, return true
 * 
 * Time Complexity: O(n), where n is the length of the string
 * Space Complexity: O(1), since no extra space is used beyond pointers
 */

public class IsPalindrome {
    
    /**
     * Check if a string is a palindrome (case-insensitive, alphanumeric only)
     * Approach 1: String filtering and reversal
     * @param s The input string
     * @return true if palindrome, false otherwise
     */
    public static boolean isPalindrome(String s) {
        s = s.toLowerCase();
        StringBuilder filteredString = new StringBuilder();
        StringBuilder rev = new StringBuilder();
        
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isLetterOrDigit(c)) {
                filteredString.append(c);
                rev.insert(0, c);
            }
        }
        
        return filteredString.toString().equals(rev.toString());
    }
    
    /**
     * Check if a string is a palindrome (case-insensitive, alphanumeric only)
     * Approach 2: Two-pointer method (more space efficient)
     * @param s The input string
     * @return true if palindrome, false otherwise
     */
    public static boolean isPalindromeTwoPointer(String s) {
        s = s.toLowerCase();
        int i = 0;
        int j = s.length() - 1;
        
        while (i < j) {
            if (!Character.isLetterOrDigit(s.charAt(i))) {
                ++i;
            }
            else if (!Character.isLetterOrDigit(s.charAt(j))) {
                --j;
            }
            else if (s.charAt(i) == s.charAt(j)) {
                ++i;
                --j;
            }
            else {
                return false;
            }
        }
        return true;
    }
    
    // Alternative implementation using String concatenation (less efficient)
    public static boolean isPalindromeAlternative(String s) {
        s = s.toLowerCase();
        String filteredString = "";
        String rev = "";
        
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isLetterOrDigit(c)) {
                filteredString = filteredString + c;
                rev = c + rev;
            }
        }
        
        return filteredString.equals(rev);
    }
    
    // Test cases
    public static void runTests() {
        System.out.println("=== Valid Palindrome Tests ===\n");
        
        String[][] testCases = {
            {"A man, a plan, a canal: Panama", "true", "Complex palindrome with punctuation"},
            {"race a car", "false", "Not a palindrome"},
            {" ", "true", "Empty string"},
            {"racecar", "true", "Simple palindrome"},
            {"hello", "false", "Not a palindrome"},
            {"12321", "true", "Numeric palindrome"},
            {"A1b2C3c2b1a", "true", "Alphanumeric palindrome"},
            {".,", "true", "Only non-alphanumeric characters"},
            {"0P", "false", "Two characters, not palindrome"},
            {"Madam, I'm Adam", "true", "Palindrome with spaces and punctuation"}
        };
        
        int passed1 = 0;
        int failed1 = 0;
        int passed2 = 0;
        int failed2 = 0;
        
        System.out.println("Testing Approach 1 (String Filtering):");
        System.out.println("=====================================");
        
        for (int i = 0; i < testCases.length; i++) {
            String input = testCases[i][0];
            boolean expected = Boolean.parseBoolean(testCases[i][1]);
            String description = testCases[i][2];
            
            boolean result = isPalindrome(input);
            String status = result == expected ? "PASS" : "FAIL";
            
            System.out.println("Test " + (i + 1) + ": " + status);
            System.out.println("Input: \"" + input + "\"");
            System.out.println("Expected: " + expected + ", Got: " + result);
            System.out.println("Description: " + description);
            System.out.println("---");
            
            if (result == expected) {
                passed1++;
            } else {
                failed1++;
            }
        }
        
        System.out.println("\nApproach 1 Summary: " + passed1 + " passed, " + failed1 + " failed");
        System.out.println("Success Rate: " + String.format("%.1f", (double) passed1 / testCases.length * 100) + "%");
        
        System.out.println("\n\nTesting Approach 2 (Two-Pointer):");
        System.out.println("=================================");
        
        for (int i = 0; i < testCases.length; i++) {
            String input = testCases[i][0];
            boolean expected = Boolean.parseBoolean(testCases[i][1]);
            String description = testCases[i][2];
            
            boolean result = isPalindromeTwoPointer(input);
            String status = result == expected ? "PASS" : "FAIL";
            
            System.out.println("Test " + (i + 1) + ": " + status);
            System.out.println("Input: \"" + input + "\"");
            System.out.println("Expected: " + expected + ", Got: " + result);
            System.out.println("Description: " + description);
            System.out.println("---");
            
            if (result == expected) {
                passed2++;
            } else {
                failed2++;
            }
        }
        
        System.out.println("\nApproach 2 Summary: " + passed2 + " passed, " + failed2 + " failed");
        System.out.println("Success Rate: " + String.format("%.1f", (double) passed2 / testCases.length * 100) + "%");
    }
    
    // Performance test
    public static void performanceTest() {
        System.out.println("\n=== Performance Test ===");
        
        // Create long strings for testing
        StringBuilder longPalindrome = new StringBuilder();
        StringBuilder longNonPalindrome = new StringBuilder();
        
        for (int i = 0; i < 10000; i++) {
            longPalindrome.append("A");
        }
        for (int i = 0; i < 10000; i++) {
            longPalindrome.append("B");
        }
        for (int i = 0; i < 10000; i++) {
            longPalindrome.append("A");
        }
        
        for (int i = 0; i < 10000; i++) {
            longNonPalindrome.append("A");
        }
        for (int i = 0; i < 10000; i++) {
            longNonPalindrome.append("B");
        }
        for (int i = 0; i < 10000; i++) {
            longNonPalindrome.append("C");
        }
        
        String palindromeStr = longPalindrome.toString();
        String nonPalindromeStr = longNonPalindrome.toString();
        
        // Test Approach 1 (StringBuilder)
        long start1 = System.currentTimeMillis();
        isPalindrome(palindromeStr);
        long end1 = System.currentTimeMillis();
        
        long start2 = System.currentTimeMillis();
        isPalindrome(nonPalindromeStr);
        long end2 = System.currentTimeMillis();
        
        // Test Approach 2 (Two-Pointer)
        long start3 = System.currentTimeMillis();
        isPalindromeTwoPointer(palindromeStr);
        long end3 = System.currentTimeMillis();
        
        long start4 = System.currentTimeMillis();
        isPalindromeTwoPointer(nonPalindromeStr);
        long end4 = System.currentTimeMillis();
        
        // Test String concatenation approach
        long start5 = System.currentTimeMillis();
        isPalindromeAlternative(palindromeStr);
        long end5 = System.currentTimeMillis();
        
        long start6 = System.currentTimeMillis();
        isPalindromeAlternative(nonPalindromeStr);
        long end6 = System.currentTimeMillis();
        
        System.out.println("Approach 1 (StringBuilder):");
        System.out.println("Long palindrome (" + palindromeStr.length() + " chars): " + (end1 - start1) + "ms");
        System.out.println("Long non-palindrome (" + nonPalindromeStr.length() + " chars): " + (end2 - start2) + "ms");
        
        System.out.println("\nApproach 2 (Two-Pointer):");
        System.out.println("Long palindrome (" + palindromeStr.length() + " chars): " + (end3 - start3) + "ms");
        System.out.println("Long non-palindrome (" + nonPalindromeStr.length() + " chars): " + (end4 - start4) + "ms");
        
        System.out.println("\nString concatenation approach:");
        System.out.println("Long palindrome (" + palindromeStr.length() + " chars): " + (end5 - start5) + "ms");
        System.out.println("Long non-palindrome (" + nonPalindromeStr.length() + " chars): " + (end6 - start6) + "ms");
    }
    
    // Dry run demonstration
    public static void dryRun() {
        System.out.println("\n=== Dry Run - Approach 1 ===");
        String s = "A man, a plan, a canal: Panama";
        System.out.println("Input: \"" + s + "\"");
        
        s = s.toLowerCase();
        System.out.println("After toLowerCase(): \"" + s + "\"");
        
        StringBuilder filteredString = new StringBuilder();
        StringBuilder rev = new StringBuilder();
        
        System.out.println("\nProcessing characters:");
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isLetterOrDigit(c)) {
                filteredString.append(c);
                rev.insert(0, c);
                System.out.println("Character '" + c + "' at index " + i + " is alphanumeric");
                System.out.println("  filteredString: \"" + filteredString + "\"");
                System.out.println("  rev: \"" + rev + "\"");
            } else {
                System.out.println("Character '" + c + "' at index " + i + " is NOT alphanumeric (skipped)");
            }
        }
        
        boolean result = filteredString.toString().equals(rev.toString());
        System.out.println("\nFinal comparison:");
        System.out.println("filteredString: \"" + filteredString + "\"");
        System.out.println("rev: \"" + rev + "\"");
        System.out.println("Result: " + result);
    }
    
    // Dry run demonstration for two-pointer approach
    public static void dryRunTwoPointer() {
        System.out.println("\n=== Dry Run - Two-Pointer Approach ===");
        String s = "A man, a plan, a canal: Panama";
        System.out.println("Input: \"" + s + "\"");
        
        String lowerS = s.toLowerCase();
        System.out.println("After toLowerCase(): \"" + lowerS + "\"");
        
        int i = 0;
        int j = lowerS.length() - 1;
        int step = 1;
        
        System.out.println("\nStep-by-step execution:");
        while (i < j) {
            System.out.println("\nStep " + step + ":");
            System.out.println("i = " + i + ", j = " + j);
            System.out.println("s[i] = '" + lowerS.charAt(i) + "', s[j] = '" + lowerS.charAt(j) + "'");
            
            if (!Character.isLetterOrDigit(lowerS.charAt(i))) {
                System.out.println("s[i] = '" + lowerS.charAt(i) + "' is not alphanumeric, incrementing i");
                ++i;
            }
            else if (!Character.isLetterOrDigit(lowerS.charAt(j))) {
                System.out.println("s[j] = '" + lowerS.charAt(j) + "' is not alphanumeric, decrementing j");
                --j;
            }
            else if (lowerS.charAt(i) == lowerS.charAt(j)) {
                System.out.println("s[i] = '" + lowerS.charAt(i) + "' equals s[j] = '" + lowerS.charAt(j) + "', moving both pointers");
                ++i;
                --j;
            }
            else {
                System.out.println("s[i] = '" + lowerS.charAt(i) + "' != s[j] = '" + lowerS.charAt(j) + "', returning false");
                System.out.println("Result: false");
                return;
            }
            step++;
        }
        
        System.out.println("\nLoop ended: i = " + i + ", j = " + j);
        System.out.println("Result: true");
    }
    
    public static void main(String[] args) {
        runTests();
        performanceTest();
        dryRun();
        dryRunTwoPointer();
    }
} 