/**
 * Reverse String
 * 
 * Problem:
 * Write a function that reverses a string. The input string is given as an array of characters s.
 * You must do this by modifying the input array in-place with O(1) extra memory.
 * 
 * Example:
 * Input: s = ["h","e","l","l","o"]
 * Output: ["o","l","l","e","h"]
 * 
 * Important Points:
 * 1. Input is an array of characters
 * 2. Must modify array in-place
 * 3. Cannot use extra arrays
 * 4. Space complexity must be O(1)
 * 
 * Approach: Two Pointer Technique
 * - Initialize two pointers, one at start and one at end
 * - Swap characters at both pointers
 * - Move pointers towards center until they meet
 * 
 * Time Complexity: O(n/2) = O(n)
 * Space Complexity: O(1)
 */

public class ReverseString {
    public void reverseString(char[] s) {
        int left = 0;
        int right = s.length - 1;
        
        while (left < right) {
            // Swap characters at left and right pointers
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            
            // Move pointers towards center
            left++;
            right--;
        }
    }

    // Alternative approach using for loop
    public void reverseStringForLoop(char[] s) {
        int len = s.length;
        int halfLen = len / 2;
        
        for (int i = 0; i < halfLen; i++) {
            char temp = s[i];
            s[i] = s[len - i - 1];
            s[len - i - 1] = temp;
        }
    }

    // Helper method to print array
    private static void printArray(char[] s) {
        System.out.print("[");
        for (int i = 0; i < s.length; i++) {
            System.out.print("\"" + s[i] + "\"");
            if (i < s.length - 1) System.out.print(", ");
        }
        System.out.println("]");
    }

    public static void main(String[] args) {
        ReverseString solution = new ReverseString();
        
        // Test case 1: Basic case
        System.out.println("Test case 1: ['h','e','l','l','o']");
        char[] s1 = {'h', 'e', 'l', 'l', 'o'};
        solution.reverseString(s1.clone());
        System.out.println("Two pointer approach:");
        printArray(s1);
        solution.reverseStringForLoop(s1.clone());
        System.out.println("For loop approach:");
        printArray(s1);

        // Test case 2: Empty array
        System.out.println("\nTest case 2: []");
        char[] s2 = {};
        solution.reverseString(s2.clone());
        System.out.println("Two pointer approach:");
        printArray(s2);
        solution.reverseStringForLoop(s2.clone());
        System.out.println("For loop approach:");
        printArray(s2);

        // Test case 3: Single character
        System.out.println("\nTest case 3: ['a']");
        char[] s3 = {'a'};
        solution.reverseString(s3.clone());
        System.out.println("Two pointer approach:");
        printArray(s3);
        solution.reverseStringForLoop(s3.clone());
        System.out.println("For loop approach:");
        printArray(s3);

        // Test case 4: Even length string
        System.out.println("\nTest case 4: ['a','b','c','d']");
        char[] s4 = {'a', 'b', 'c', 'd'};
        solution.reverseString(s4.clone());
        System.out.println("Two pointer approach:");
        printArray(s4);
        solution.reverseStringForLoop(s4.clone());
        System.out.println("For loop approach:");
        printArray(s4);

        // Test case 5: Odd length string
        System.out.println("\nTest case 5: ['a','b','c']");
        char[] s5 = {'a', 'b', 'c'};
        solution.reverseString(s5.clone());
        System.out.println("Two pointer approach:");
        printArray(s5);
        solution.reverseStringForLoop(s5.clone());
        System.out.println("For loop approach:");
        printArray(s5);

        // Test case 6: Palindrome
        System.out.println("\nTest case 6: ['r','a','c','e','c','a','r']");
        char[] s6 = {'r', 'a', 'c', 'e', 'c', 'a', 'r'};
        solution.reverseString(s6.clone());
        System.out.println("Two pointer approach:");
        printArray(s6);
        solution.reverseStringForLoop(s6.clone());
        System.out.println("For loop approach:");
        printArray(s6);
    }
} 