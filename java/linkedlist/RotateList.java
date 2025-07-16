/**
 * Q12. Rotate List
 * 
 * Problem:
 * Given the head of a linked list, rotate the list to the right by k places.
 * 
 * Example:
 * Input: head = [1,2,3,4,5], k = 2
 * Output: [4,5,1,2,3]
 * 
 * Approach:
 * 1. Find the length of the list
 * 2. Calculate effective rotation (k % length)
 * 3. If k is 0 or length, return original list
 * 4. Find the new tail (length - k - 1)
 * 5. Break the list at new tail and reconnect
 * 
 * Time Complexity: O(N) where N is the number of nodes
 * Space Complexity: O(1) as we only use pointers
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class RotateList {
    public ListNode rotateRight(ListNode head, int k) {
        // Handle edge cases
        if (head == null || head.next == null || k == 0) {
            return head;
        }

        // Find length and last node
        int length = 1;
        ListNode last = head;
        while (last.next != null) {
            last = last.next;
            length++;
        }

        // Calculate effective rotation
        k = k % length;
        if (k == 0) {
            return head;
        }

        // Find new tail
        ListNode newTail = head;
        for (int i = 0; i < length - k - 1; i++) {
            newTail = newTail.next;
        }

        // Break and reconnect
        ListNode newHead = newTail.next;
        newTail.next = null;
        last.next = head;

        return newHead;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Create test linked list: 1->2->3->4->5
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(4);
        head.next.next.next.next = new ListNode(5);

        // Rotate list by 2
        RotateList solution = new RotateList();
        ListNode result = solution.rotateRight(head, 2);

        // Print the result
        System.out.print("List after rotating by 2: ");
        while (result != null) {
            System.out.print(result.val + " -> ");
            result = result.next;
        }
        System.out.println("null");

        // Test with k = length
        ListNode head2 = new ListNode(1);
        head2.next = new ListNode(2);
        head2.next.next = new ListNode(3);
        head2.next.next.next = new ListNode(4);
        head2.next.next.next.next = new ListNode(5);

        ListNode result2 = solution.rotateRight(head2, 5);
        System.out.print("List after rotating by length (5): ");
        while (result2 != null) {
            System.out.print(result2.val + " -> ");
            result2 = result2.next;
        }
        System.out.println("null");

        // Test with k > length
        ListNode head3 = new ListNode(1);
        head3.next = new ListNode(2);
        head3.next.next = new ListNode(3);

        ListNode result3 = solution.rotateRight(head3, 4);
        System.out.print("List after rotating by 4 (length=3): ");
        while (result3 != null) {
            System.out.print(result3.val + " -> ");
            result3 = result3.next;
        }
        System.out.println("null");
    }
} 