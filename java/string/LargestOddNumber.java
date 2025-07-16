/**
 * Largest Odd Number in String
 * 
 * Problem: Given a string num representing a large integer, return the largest-valued 
 * odd integer (as a string) that is a non-empty substring of num, or an empty string "" 
 * if no odd integer exists.
 * 
 * A substring is a contiguous sequence of characters within a string.
 * 
 * Example:
 * Input: num = "52"
 * Output: "5"
 * Explanation: The only non-empty substrings are "5", "2", and "52". "5" is the only odd number.
 * 
 * Input: num = "4206"
 * Output: ""
 * Explanation: There are no odd numbers in "4206".
 * 
 * Input: num = "35427"
 * Output: "35427"
 * Explanation: "35427" is already an odd number.
 * 
 * Approach:
 * 1. Start from the end of the string and move backward
 * 2. Check if the current digit is odd using modulus % 2
 * 3. If an odd digit is found, return the substring from index 0 to that digit (inclusive)
 * 4. If no odd digit exists in the string, return an empty string
 * 
 * Time Complexity: O(n), where n is the length of the string
 * Space Complexity: O(1), no extra space used
 */

public class LargestOddNumber {
    
    /**
     * Find the largest odd number that can be formed by removing trailing even digits
     * @param num The input numeric string
     * @return The largest odd number as string, or empty string if no odd number exists
     */
    public static String largestOddNumber(String num) {
        int n = num.length() - 1;
        while (n >= 0) {
            if ((num.charAt(n) - '0') % 2 == 1) {
                return num.substring(0, n + 1);
            }
            --n;
        }
        return "";
    }
    
    /**
     * Alternative implementation using character comparison
     * @param num The input numeric string
     * @return The largest odd number as string, or empty string if no odd number exists
     */
    public static String largestOddNumberAlternative(String num) {
        int n = num.length() - 1;
        while (n >= 0) {
            char digit = num.charAt(n);
            if (digit == '1' || digit == '3' || digit == '5' || digit == '7' || digit == '9') {
                return num.substring(0, n + 1);
            }
            --n;
        }
        return "";
    }
    
    // Test cases
    public static void runTests() {
        System.out.println("=== Largest Odd Number Tests ===\n");
        
        String[][] testCases = {
            {"52", "5", "Simple case with one odd digit"},
            {"4206", "", "No odd digits"},
            {"35427", "35427", "Already odd number"},
            {"123456", "12345", "Remove trailing even digit"},
            {"2468", "", "All even digits"},
            {"13579", "13579", "All odd digits"},
            {"1000", "1", "Single odd digit at start"},
            {"9999", "9999", "All nines"},
            {"0", "", "Single zero"},
            {"1", "1", "Single one"},
            {"1234567890", "123456789", "Remove trailing zero"},
            {"246813579", "246813579", "Odd digit at end"}
        };
        
        int passed1 = 0;
        int failed1 = 0;
        int passed2 = 0;
        int failed2 = 0;
        
        System.out.println("Testing Approach 1 (Modulus):");
        System.out.println("=============================");
        
        for (int i = 0; i < testCases.length; i++) {
            String input = testCases[i][0];
            String expected = testCases[i][1];
            String description = testCases[i][2];
            
            String result = largestOddNumber(input);
            String status = result.equals(expected) ? "PASS" : "FAIL";
            
            System.out.println("Test " + (i + 1) + ": " + status);
            System.out.println("Input: \"" + input + "\"");
            System.out.println("Expected: \"" + expected + "\", Got: \"" + result + "\"");
            System.out.println("Description: " + description);
            System.out.println("---");
            
            if (result.equals(expected)) {
                passed1++;
            } else {
                failed1++;
            }
        }
        
        System.out.println("\nApproach 1 Summary: " + passed1 + " passed, " + failed1 + " failed");
        System.out.println("Success Rate: " + String.format("%.1f", (double) passed1 / testCases.length * 100) + "%");
        
        System.out.println("\n\nTesting Approach 2 (Character Comparison):");
        System.out.println("==========================================");
        
        for (int i = 0; i < testCases.length; i++) {
            String input = testCases[i][0];
            String expected = testCases[i][1];
            String description = testCases[i][2];
            
            String result = largestOddNumberAlternative(input);
            String status = result.equals(expected) ? "PASS" : "FAIL";
            
            System.out.println("Test " + (i + 1) + ": " + status);
            System.out.println("Input: \"" + input + "\"");
            System.out.println("Expected: \"" + expected + "\", Got: \"" + result + "\"");
            System.out.println("Description: " + description);
            System.out.println("---");
            
            if (result.equals(expected)) {
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
        StringBuilder longEvenString = new StringBuilder();
        StringBuilder longOddString = new StringBuilder();
        StringBuilder mixedString = new StringBuilder();
        
        for (int i = 0; i < 1000; i++) {
            longEvenString.append("2468");
        }
        
        for (int i = 0; i < 1000; i++) {
            longOddString.append("13579");
        }
        
        for (int i = 0; i < 500; i++) {
            mixedString.append("1234567890");
        }
        
        String evenStr = longEvenString.toString();
        String oddStr = longOddString.toString();
        String mixedStr = mixedString.toString();
        
        // Test Approach 1
        long start1 = System.currentTimeMillis();
        largestOddNumber(evenStr);
        long end1 = System.currentTimeMillis();
        
        long start2 = System.currentTimeMillis();
        largestOddNumber(oddStr);
        long end2 = System.currentTimeMillis();
        
        long start3 = System.currentTimeMillis();
        largestOddNumber(mixedStr);
        long end3 = System.currentTimeMillis();
        
        // Test Approach 2
        long start4 = System.currentTimeMillis();
        largestOddNumberAlternative(evenStr);
        long end4 = System.currentTimeMillis();
        
        long start5 = System.currentTimeMillis();
        largestOddNumberAlternative(oddStr);
        long end5 = System.currentTimeMillis();
        
        long start6 = System.currentTimeMillis();
        largestOddNumberAlternative(mixedStr);
        long end6 = System.currentTimeMillis();
        
        System.out.println("Approach 1 (Modulus):");
        System.out.println("Long even string (" + evenStr.length() + " chars): " + (end1 - start1) + "ms");
        System.out.println("Long odd string (" + oddStr.length() + " chars): " + (end2 - start2) + "ms");
        System.out.println("Mixed string (" + mixedStr.length() + " chars): " + (end3 - start3) + "ms");
        
        System.out.println("\nApproach 2 (Character Comparison):");
        System.out.println("Long even string (" + evenStr.length() + " chars): " + (end4 - start4) + "ms");
        System.out.println("Long odd string (" + oddStr.length() + " chars): " + (end5 - start5) + "ms");
        System.out.println("Mixed string (" + mixedStr.length() + " chars): " + (end6 - start6) + "ms");
    }
    
    // Dry run demonstration
    public static void dryRun() {
        System.out.println("\n=== Dry Run ===");
        String num = "123456";
        System.out.println("Input: \"" + num + "\"");
        
        int n = num.length() - 1;
        int step = 1;
        
        System.out.println("\nStep-by-step execution:");
        while (n >= 0) {
            System.out.println("\nStep " + step + ":");
            System.out.println("n = " + n + ", digit = '" + num.charAt(n) + "'");
            System.out.println("(num.charAt(" + n + ") - '0') % 2 = " + ((num.charAt(n) - '0') % 2));
            
            if ((num.charAt(n) - '0') % 2 == 1) {
                System.out.println("Found odd digit '" + num.charAt(n) + "' at index " + n);
                System.out.println("Returning substring(0, " + (n + 1) + ") = \"" + num.substring(0, n + 1) + "\"");
                System.out.println("Result: \"" + num.substring(0, n + 1) + "\"");
                return;
            } else {
                System.out.println("Digit '" + num.charAt(n) + "' is even, decrementing n");
            }
            --n;
            step++;
        }
        
        System.out.println("\nNo odd digit found, returning empty string");
        System.out.println("Result: \"\"");
    }
    
    // Additional examples and edge cases
    public static void additionalExamples() {
        System.out.println("\n=== Additional Examples ===");
        
        String[] examples = {
            "52", "4206", "35427", "123456", "2468", "13579", 
            "1000", "9999", "0", "1", "1234567890", "246813579"
        };
        
        for (String example : examples) {
            String result = largestOddNumber(example);
            System.out.println("Input: \"" + example + "\" -> Output: \"" + result + "\"");
        }
    }
    
    public static void main(String[] args) {
        runTests();
        performanceTest();
        dryRun();
        additionalExamples();
    }
} 