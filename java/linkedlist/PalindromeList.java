/**
 * Q10. Palindrome Linked List
 * 
 * Problem:
 * Given the head of a singly linked list, return true if it is a palindrome or false otherwise.
 * 
 * Example:
 * Input: head = [1,2,2,1]
 * Output: true
 * 
 * Approach 1:
 * 1. Find the middle of the list using slow and fast pointers
 * 2. Reverse the second half of the list
 * 3. Compare the first half with the reversed second half
 * 4. Restore the list (optional)
 * 
 * Time Complexity: O(N) where N is the number of nodes
 * Space Complexity: O(1) as we only use pointers
 */

   /**
     * Approach 2: Using ArrayList to store values
     * 
     * Approach:
     * Traverse the linked list and store values in an array.
     * Check whether the array is a palindrome by comparing elements from start and end moving towards the center.
     * 
     * Time Complexity: O(n), where n is the number of nodes.
     * Space Complexity: O(n), for the array storage.
     * 
     * @param head Head of the linked list
     * @return true if palindrome, false otherwise
     */
    
import java.util.ArrayList;
import java.util.List;

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class PalindromeList {
    public boolean isPalindrome(ListNode head) {
        // Handle edge cases
        if (head == null || head.next == null) {
            return true;
        }

        // Step 1: Find the middle of the list
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            fast = fast.next.next;
            slow = slow.next;
        }

        // Step 2: Reverse the second half
        ListNode reversedList = reverse(slow);
        
        // Step 3: Compare the two halves
        ListNode current = head;
        ListNode reversedCopy = reversedList; // Keep a copy for restoration
        boolean isPalindrome = true;
        
        while (reversedList != null) {
            if (current.val != reversedList.val) {
                isPalindrome = false;
                break;
            }
            current = current.next;
            reversedList = reversedList.next;
        }
        return isPalindrome;
    }

    // Helper method to reverse a linked list
    private ListNode reverse(ListNode node) {
        ListNode prev = null;
        ListNode currNode = node;
        while (currNode != null) {
            ListNode next = currNode.next;
            currNode.next = prev;
            prev = currNode;
            currNode = next;
        }
        return prev;
    }

 
    public boolean isPalindromeUsingArray(ListNode head) {
        List<Integer> arr = new ArrayList<>();
        ListNode curr = head;
        while (curr != null) {
            arr.add(curr.val);
            curr = curr.next;
        }
        int left = 0, right = arr.size() - 1;
        while (left < right) {
            if (!arr.get(left++).equals(arr.get(right--))) return false;
        }
        return true;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Test case 1: Palindrome list [1,2,2,1]
        ListNode head1 = new ListNode(1);
        head1.next = new ListNode(2);
        head1.next.next = new ListNode(2);
        head1.next.next.next = new ListNode(1);

        PalindromeList solution = new PalindromeList();
        System.out.println("Is [1,2,2,1] a palindrome? " + solution.isPalindrome(head1));

        // Test case 2: Non-palindrome list [1,2,3]
        ListNode head2 = new ListNode(1);
        head2.next = new ListNode(2);
        head2.next.next = new ListNode(3);
        System.out.println("Is [1,2,3] a palindrome? " + solution.isPalindrome(head2));

        // Test case 3: Single node [1]
        ListNode head3 = new ListNode(1);
        System.out.println("Is [1] a palindrome? " + solution.isPalindrome(head3));

        // Test case 4: Empty list
        System.out.println("Is [] a palindrome? " + solution.isPalindrome(null));

        // Test case 5: Odd length palindrome [1,2,3,2,1]
        ListNode head5 = new ListNode(1);
        head5.next = new ListNode(2);
        head5.next.next = new ListNode(3);
        head5.next.next.next = new ListNode(2);
        head5.next.next.next.next = new ListNode(1);
        System.out.println("Is [1,2,3,2,1] a palindrome? " + solution.isPalindrome(head5));
    }
} 