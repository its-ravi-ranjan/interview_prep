/**
 * Q3. Remove Nth Node From End of List
 * 
 * Problem:
 * Given the head of a linked list, remove the nth node from the end of the list and return its head.
 * 
 * Example:
 * Input: head = [1,2,3,4,5], n = 2
 * Output: [1,2,3,5]
 * 
 * Approach:
 * 1. Use two pointers: fast and slow
 * 2. Move fast pointer n+1 steps ahead
 * 3. Then move both pointers until fast reaches the end
 * 4. At this point, slow will be at the node before the one to be deleted
 * 5. Remove the nth node by updating slow.next
 * 
 * Time Complexity: O(N) where N is the length of the linked list
 * Space Complexity: O(1) as we only use two pointers
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class RemoveNthFromEnd {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // Create a dummy node to handle edge cases (like removing the head)
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        
        // Initialize two pointers
        ListNode slow = dummy;
        ListNode fast = dummy;
        
        // Move fast pointer n+1 steps ahead
        for (int i = 0; i <= n; i++) {
            fast = fast.next;
        }
        
        // Move both pointers until fast reaches the end
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }
        
        // Remove the nth node from end
        slow.next = slow.next.next;
        
        return dummy.next;
    }

    /**
     * Approach 2: Using sentinel node and length calculation
     * 
     * Approach:
     * Use a sentinel (dummy) node before the head to simplify edge cases.
     * First, calculate the total length of the list.
     * Find the previous node of the one to be deleted using the length – n formula.
     * Update the links to skip the target node.
     * 
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     * 
     * @param head Head of the linked list
     * @param n Nth node from end to remove
     * @return New head of the linked list
     */
    public ListNode removeNthFromEndUsingLength(ListNode head, int n) {
        ListNode sentinel = new ListNode(0, head);
        int length = 0;
        ListNode first = head;
        while (first != null) {
            length++;
            first = first.next;
        }
        ListNode prev = sentinel;
        for (int i = 0; i < length - n; i++) {
            prev = prev.next;
        }
        prev.next = prev.next.next;
        return sentinel.next;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Create test linked list: 1->2->3->4->5
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(4);
        head.next.next.next.next = new ListNode(5);

        // Remove 2nd node from end
        RemoveNthFromEnd solution = new RemoveNthFromEnd();
        ListNode result = solution.removeNthFromEnd(head, 2);

        // Print the modified list
        System.out.print("Result: ");
        while (result != null) {
            System.out.print(result.val + " -> ");
            result = result.next;
        }
        System.out.println("null");
    }
} 