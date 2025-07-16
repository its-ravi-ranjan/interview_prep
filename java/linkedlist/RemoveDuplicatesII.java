/**
 * Q11. Remove Duplicates from Sorted List II
 * 
 * Problem:
 * Given the head of a sorted linked list, delete all nodes that have duplicate numbers,
 * leaving only distinct numbers from the original list. Return the linked list sorted as well.
 * 
 * Example:
 * Input: head = [1,2,3,3,4,4,5]
 * Output: [1,2,5]
 * 
 * Approach:
 * 1. Use a dummy node to handle edge cases
 * 2. Use two pointers: prev and current
 * 3. For each node, check if it has duplicates
 * 4. If yes, skip all nodes with same value
 * 5. If no, move both pointers forward
 * 
 * Time Complexity: O(N) where N is the number of nodes
 * Space Complexity: O(1) as we only use two pointers
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class RemoveDuplicatesII {
    public ListNode deleteDuplicates(ListNode head) {
        // Handle edge cases
        if (head == null || head.next == null) {
            return head;
        }

        // Create dummy node to handle edge cases
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;
        ListNode current = head;

        while (current != null) {
            // Skip all nodes with same value
            while (current.next != null && current.val == current.next.val) {
                current = current.next;
            }

            // If prev.next is current, no duplicates found
            if (prev.next == current) {
                prev = prev.next;
            } else {
                // Skip all duplicates
                prev.next = current.next;
            }
            current = current.next;
        }

        return dummy.next;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Create test linked list: 1->2->3->3->4->4->5
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(3);
        head.next.next.next.next = new ListNode(4);
        head.next.next.next.next.next = new ListNode(4);
        head.next.next.next.next.next.next = new ListNode(5);

        // Remove duplicates
        RemoveDuplicatesII solution = new RemoveDuplicatesII();
        ListNode result = solution.deleteDuplicates(head);

        // Print the result
        System.out.print("List after removing all duplicates: ");
        while (result != null) {
            System.out.print(result.val + " -> ");
            result = result.next;
        }
        System.out.println("null");

        // Test with all duplicates: 1->1->1->2->2
        ListNode head2 = new ListNode(1);
        head2.next = new ListNode(1);
        head2.next.next = new ListNode(1);
        head2.next.next.next = new ListNode(2);
        head2.next.next.next.next = new ListNode(2);

        ListNode result2 = solution.deleteDuplicates(head2);
        System.out.print("List with all duplicates removed: ");
        while (result2 != null) {
            System.out.print(result2.val + " -> ");
            result2 = result2.next;
        }
        System.out.println("null");

        // Test with no duplicates: 1->2->3
        ListNode head3 = new ListNode(1);
        head3.next = new ListNode(2);
        head3.next.next = new ListNode(3);

        ListNode result3 = solution.deleteDuplicates(head3);
        System.out.print("List with no duplicates: ");
        while (result3 != null) {
            System.out.print(result3.val + " -> ");
            result3 = result3.next;
        }
        System.out.println("null");
    }
} 