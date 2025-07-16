/**
 * Q14. Delete Middle Node of Linked List
 * 
 * Problem:
 * You are given the head of a linked list. Delete the middle node, and return the head of the modified linked list.
 * The middle node of a linked list of size n is the ⌊n / 2⌋th node from the start using 0-based indexing,
 * where ⌊x⌋ denotes the largest integer less than or equal to x.
 * For n = 1, 2, 3, 4, and 5, the middle nodes are 0, 1, 1, 2, and 2, respectively.
 * 
 * Example:
 * Input: head = [1,3,4,7,1,2,6]
 * Output: [1,3,4,1,2,6]
 * 
 * Approach:
 * 1. Use slow and fast pointers to find the middle node
 * 2. Keep track of the previous node of slow pointer
 * 3. Delete the middle node by connecting prev.next to slow.next
 * 
 * Time Complexity: O(N) where N is the number of nodes
 * Space Complexity: O(1) as we only use pointers
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class DeleteMiddleNode {
    public ListNode deleteMiddle(ListNode head) {
        // Handle edge cases
        if (head == null || head.next == null) {
            return null;
        }

        // Initialize pointers
        ListNode prev = null;
        ListNode fast = head;
        ListNode slow = head;

        // Find middle node
        while (fast != null && fast.next != null) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }

        // Delete middle node
        prev.next = slow.next != null ? slow.next : null;
        
        return head;
    }

    // Helper method to print the list
    private static void printList(ListNode head) {
        ListNode current = head;
        while (current != null) {
            System.out.print(current.val + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }

    // Main method for testing
    public static void main(String[] args) {
        // Test case 1: List with odd number of nodes [1,3,4,7,1,2,6]
        ListNode head1 = new ListNode(1);
        head1.next = new ListNode(3);
        head1.next.next = new ListNode(4);
        head1.next.next.next = new ListNode(7);
        head1.next.next.next.next = new ListNode(1);
        head1.next.next.next.next.next = new ListNode(2);
        head1.next.next.next.next.next.next = new ListNode(6);

        DeleteMiddleNode solution = new DeleteMiddleNode();
        System.out.println("Original list:");
        printList(head1);
        
        ListNode result1 = solution.deleteMiddle(head1);
        System.out.println("List after deleting middle node:");
        printList(result1);

        // Test case 2: List with even number of nodes [1,2,3,4]
        ListNode head2 = new ListNode(1);
        head2.next = new ListNode(2);
        head2.next.next = new ListNode(3);
        head2.next.next.next = new ListNode(4);

        System.out.println("\nOriginal list:");
        printList(head2);
        
        ListNode result2 = solution.deleteMiddle(head2);
        System.out.println("List after deleting middle node:");
        printList(result2);

        // Test case 3: List with two nodes [1,2]
        ListNode head3 = new ListNode(1);
        head3.next = new ListNode(2);

        System.out.println("\nOriginal list:");
        printList(head3);
        
        ListNode result3 = solution.deleteMiddle(head3);
        System.out.println("List after deleting middle node:");
        printList(result3);

        // Test case 4: Single node [1]
        ListNode head4 = new ListNode(1);

        System.out.println("\nOriginal list:");
        printList(head4);
        
        ListNode result4 = solution.deleteMiddle(head4);
        System.out.println("List after deleting middle node:");
        printList(result4);

        // Test case 5: Empty list
        ListNode result5 = solution.deleteMiddle(null);
        System.out.println("\nEmpty list result: " + (result5 == null ? "null" : "not null"));
    }
} 