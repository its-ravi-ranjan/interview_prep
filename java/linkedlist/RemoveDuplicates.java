/**
 * Q10. Remove Duplicates from Sorted List
 * 
 * Problem:
 * Given the head of a sorted linked list, delete all duplicates such that each element appears only once.
 * Return the linked list sorted as well.
 * 
 * Example:
 * Input: head = [1,1,2,3,3]
 * Output: [1,2,3]
 * 
 * Approach:
 * 1. Use a current pointer to traverse the list
 * 2. For each node, check if next node has same value
 * 3. If yes, skip the next node by updating current.next
 * 4. If no, move current pointer forward
 * 5. Continue until end of list
 * 
 * Time Complexity: O(N) where N is the number of nodes
 * Space Complexity: O(1) as we only use one pointer
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class RemoveDuplicates {
    public ListNode deleteDuplicates(ListNode head) {
        // Handle edge cases
        if (head == null || head.next == null) {
            return head;
        }

        ListNode current = head;

        // Traverse the list
        while (current != null && current.next != null) {
            // If current node and next node have same value
            if (current.val == current.next.val) {
                // Skip the next node
                current.next = current.next.next;
            } else {
                // Move to next node
                current = current.next;
            }
        }

        return head;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Create test linked list: 1->1->2->3->3
        ListNode head = new ListNode(1);
        head.next = new ListNode(1);
        head.next.next = new ListNode(2);
        head.next.next.next = new ListNode(3);
        head.next.next.next.next = new ListNode(3);

        // Remove duplicates
        RemoveDuplicates solution = new RemoveDuplicates();
        ListNode result = solution.deleteDuplicates(head);

        // Print the result
        System.out.print("List after removing duplicates: ");
        while (result != null) {
            System.out.print(result.val + " -> ");
            result = result.next;
        }
        System.out.println("null");

        // Test with empty list
        ListNode result2 = solution.deleteDuplicates(null);
        System.out.println("Empty list result: " + (result2 == null ? "null" : "not null"));

        // Test with single node
        ListNode head3 = new ListNode(1);
        ListNode result3 = solution.deleteDuplicates(head3);
        System.out.print("Single node list: ");
        while (result3 != null) {
            System.out.print(result3.val + " -> ");
            result3 = result3.next;
        }
        System.out.println("null");
    }
} 