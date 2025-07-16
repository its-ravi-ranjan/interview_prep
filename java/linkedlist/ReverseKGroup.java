/**
 * Q9. Reverse Nodes in k-Group
 * 
 * Problem:
 * Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.
 * k is a positive integer and is less than or equal to the length of the linked list.
 * If the number of nodes is not a multiple of k, then left-out nodes should remain as is.
 * 
 * Example:
 * Input: head = [1,2,3,4,5], k = 2
 * Output: [2,1,4,3,5]
 * 
 * Approach:
 * 1. First, check if we have k nodes to reverse
 * 2. If yes, reverse k nodes using standard reverse algorithm
 * 3. Recursively process the remaining list
 * 4. Connect the reversed k-group with the rest of the list
 * 
 * Time Complexity: O(N) where N is the number of nodes
 * Space Complexity: O(N/k) for recursion stack
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class ReverseKGroup {
    public ListNode reverseKGroup(ListNode head, int k) {
        // Check if we have k nodes to reverse
        ListNode current = head;
        int count = 0;
        while (current != null && count < k) {
            current = current.next;
            count++;
        }

        // If we have k nodes, reverse them
        if (count == k) {
            // Reverse k nodes
            ListNode reversedHead = reverseKNodes(head, k);
            // Recursively process the remaining list
            head.next = reverseKGroup(current, k);
            return reversedHead;
        }

        // If we don't have k nodes, return head as is
        return head;
    }

    // Helper method to reverse k nodes
    private ListNode reverseKNodes(ListNode head, int k) {
        ListNode prev = null;
        ListNode current = head;
        ListNode next = null;
        int count = 0;

        // Reverse k nodes
        while (current != null && count < k) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
            count++;
        }

        return prev;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Create test linked list: 1->2->3->4->5
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(4);
        head.next.next.next.next = new ListNode(5);

        // Reverse in groups of 2
        ReverseKGroup solution = new ReverseKGroup();
        ListNode result = solution.reverseKGroup(head, 2);

        // Print the result
        System.out.print("Reversed in groups of 2: ");
        while (result != null) {
            System.out.print(result.val + " -> ");
            result = result.next;
        }
        System.out.println("null");

        // Test with k=3
        ListNode head2 = new ListNode(1);
        head2.next = new ListNode(2);
        head2.next.next = new ListNode(3);
        head2.next.next.next = new ListNode(4);
        head2.next.next.next.next = new ListNode(5);

        ListNode result2 = solution.reverseKGroup(head2, 3);
        System.out.print("Reversed in groups of 3: ");
        while (result2 != null) {
            System.out.print(result2.val + " -> ");
            result2 = result2.next;
        }
        System.out.println("null");
    }
} 