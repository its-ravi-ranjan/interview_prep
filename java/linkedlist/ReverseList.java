/**
 * Q6. Reverse Linked List
 * 
 * Problem:
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
 * 
 * Example:
 * Input: head = [1,2,3,4,5]
 * Output: [5,4,3,2,1]
 * 
 * Approach:
 * 1. Use three pointers: prev, current, and next
 * 2. Initialize prev as null and current as head
 * 3. For each node:
 *    - Store next node
 *    - Reverse current node's pointer
 *    - Move prev and current one step forward
 * 4. Return prev as new head
 * 
 * Time Complexity: O(N) where N is the length of the linked list
 * Space Complexity: O(1) as we only use three pointers
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class ReverseList {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        
        while (current != null) {
            // Store next node
            ListNode nextNode = current.next;
            
            // Reverse current node's pointer
            current.next = prev;
            
            // Move prev and current one step forward
            prev = current;
            current = nextNode;
        }
        
        // prev will be the new head
        return prev;
    }

    // Recursive approach
    public ListNode reverseListRecursive(ListNode head) {
        // Base case: empty list or single node
        if (head == null || head.next == null) {
            return head;
        }
        
        // Recursive call to reverse the rest of the list
        ListNode reversedList = reverseListRecursive(head.next);
        
        // Reverse the current node
        head.next.next = head;
        head.next = null;
        
        return reversedList;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Create test linked list: 1->2->3->4->5
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(4);
        head.next.next.next.next = new ListNode(5);

        // Reverse the list iteratively
        ReverseList solution = new ReverseList();
        ListNode reversed = solution.reverseList(head);

        // Print the reversed list
        System.out.print("Reversed List (Iterative): ");
        while (reversed != null) {
            System.out.print(reversed.val + " -> ");
            reversed = reversed.next;
        }
        System.out.println("null");

        // Create another list for recursive approach
        ListNode head2 = new ListNode(1);
        head2.next = new ListNode(2);
        head2.next.next = new ListNode(3);
        head2.next.next.next = new ListNode(4);
        head2.next.next.next.next = new ListNode(5);

        // Reverse the list recursively
        ListNode reversedRecursive = solution.reverseListRecursive(head2);

        // Print the recursively reversed list
        System.out.print("Reversed List (Recursive): ");
        while (reversedRecursive != null) {
            System.out.print(reversedRecursive.val + " -> ");
            reversedRecursive = reversedRecursive.next;
        }
        System.out.println("null");
    }
} 