 /**
 * Q16. Delete All Occurrences in Doubly Linked List
 * 
 * Problem:
 * Given the head of a doubly linked list and an integer target, delete all nodes in the linked list
 * with the value target and return the head of the modified linked list.
 * 
 * Example:
 * Input: head -> 1 <-> 2 <-> 3 <-> 1 <-> 4, target = 1
 * Output: head -> 2 <-> 3 <-> 4
 * Explanation: All nodes with the value 1 were removed.
 * 
 * Approach:
 * 1. Handle edge case: if head is null, return null
 * 2. Traverse the list and for each node:
 *    - If node value equals target:
 *      a. Update previous node's next pointer
 *      b. Update next node's previous pointer
 *      c. Update head if first node is deleted
 *    - Move to next node
 * 
 * Time Complexity: O(N) where N is the number of nodes
 * Space Complexity: O(1) as we only use pointers
 */

class ListNode {
    int val;
    ListNode next;
    ListNode prev;
    ListNode(int x) { val = x; }
}

public class DeleteAllOccurrences {
    public ListNode deleteAllOccurrences(ListNode head, int target) {
        // Handle edge case
        if (head == null) {
            return null;
        }

        ListNode current = head;
        
        // Traverse the list
        while (current != null) {
            if (current.val == target) {
                // Store next node before modifying pointers
                ListNode nextNode = current.next;
                
                // Update previous node's next pointer
                if (current.prev != null) {
                    current.prev.next = current.next;
                } else {
                    // If deleting first node, update head
                    head = current.next;
                }
                
                // Update next node's previous pointer
                if (current.next != null) {
                    current.next.prev = current.prev;
                }
                
                // Move to next node
                current = nextNode;
            } else {
                current = current.next;
            }
        }
        
        return head;
    }

    // Helper method to create a doubly linked list
    private static ListNode createDoublyLinkedList(int[] values) {
        if (values == null || values.length == 0) {
            return null;
        }

        ListNode head = new ListNode(values[0]);
        ListNode current = head;
        ListNode prev = null;

        for (int i = 1; i < values.length; i++) {
            current.next = new ListNode(values[i]);
            current.prev = prev;
            prev = current;
            current = current.next;
        }
        current.prev = prev;

        return head;
    }

    // Helper method to print the list
    private static void printList(ListNode head) {
        ListNode current = head;
        while (current != null) {
            System.out.print(current.val);
            if (current.next != null) {
                System.out.print(" <-> ");
            }
            current = current.next;
        }
        System.out.println();
    }

    // Main method for testing
    public static void main(String[] args) {
        DeleteAllOccurrences solution = new DeleteAllOccurrences();

        // Test case 1: Delete target from middle and end [1,2,3,1,4], target = 1
        int[] values1 = {1, 2, 3, 1, 4};
        ListNode head1 = createDoublyLinkedList(values1);
        System.out.println("Test case 1: Delete target from middle and end");
        System.out.println("Original list:");
        printList(head1);
        ListNode result1 = solution.deleteAllOccurrences(head1, 1);
        System.out.println("List after deleting 1:");
        printList(result1);

        // Test case 2: Delete target from start [1,1,2,3,4], target = 1
        int[] values2 = {1, 1, 2, 3, 4};
        ListNode head2 = createDoublyLinkedList(values2);
        System.out.println("\nTest case 2: Delete target from start");
        System.out.println("Original list:");
        printList(head2);
        ListNode result2 = solution.deleteAllOccurrences(head2, 1);
        System.out.println("List after deleting 1:");
        printList(result2);

        // Test case 3: Delete non-existent target [1,2,3,4], target = 5
        int[] values3 = {1, 2, 3, 4};
        ListNode head3 = createDoublyLinkedList(values3);
        System.out.println("\nTest case 3: Delete non-existent target");
        System.out.println("Original list:");
        printList(head3);
        ListNode result3 = solution.deleteAllOccurrences(head3, 5);
        System.out.println("List after deleting 5 (no change):");
        printList(result3);

        // Test case 4: Delete all nodes [1,1,1], target = 1
        int[] values4 = {1, 1, 1};
        ListNode head4 = createDoublyLinkedList(values4);
        System.out.println("\nTest case 4: Delete all nodes");
        System.out.println("Original list:");
        printList(head4);
        ListNode result4 = solution.deleteAllOccurrences(head4, 1);
        System.out.println("List after deleting all 1s:");
        printList(result4);

        // Test case 5: Empty list
        ListNode head5 = null;
        System.out.println("\nTest case 5: Empty list");
        ListNode result5 = solution.deleteAllOccurrences(head5, 1);
        System.out.println("Result of deleting from empty list: " + (result5 == null ? "null" : "not null"));
    }
}