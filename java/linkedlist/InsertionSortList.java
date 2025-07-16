/**
 * Q16. Insertion Sort List
 * 
 * Problem:
 * Given the head of a singly linked list, sort the list using insertion sort, and return the sorted list's head.
 * 
 * Example:
 * Input: head = [4,2,1,3]
 * Output: [1,2,3,4]
 * 
 * Approach:
 * 1. Create a dummy node to handle the result list
 * 2. For each node in the original list:
 *    - Find the correct position in the sorted list
 *    - Insert the node at that position
 * 3. Return the sorted list
 * 
 * Time Complexity: O(N²) where N is the number of nodes
 * Space Complexity: O(1) as we only use pointers
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class InsertionSortList {
    public ListNode insertionSortList(ListNode head) {
        // Handle edge cases
        if (head == null || head.next == null) {
            return head;
        }

        // Create dummy node for the sorted list
        ListNode dummy = new ListNode(0);
        ListNode current = head;

        while (current != null) {
            // Store next node
            ListNode next = current.next;
            
            // Find the correct position in sorted list
            ListNode prev = dummy;
            while (prev.next != null && prev.next.val < current.val) {
                prev = prev.next;
            }
            
            // Insert current node
            current.next = prev.next;
            prev.next = current;
            
            // Move to next node
            current = next;
        }

        return dummy.next;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Create test linked list: 4->2->1->3
        ListNode head = new ListNode(4);
        head.next = new ListNode(2);
        head.next.next = new ListNode(1);
        head.next.next.next = new ListNode(3);

        // Sort the list
        InsertionSortList solution = new InsertionSortList();
        ListNode result = solution.insertionSortList(head);

        // Print the result
        System.out.print("Sorted list using insertion sort: ");
        while (result != null) {
            System.out.print(result.val + " -> ");
            result = result.next;
        }
        System.out.println("null");

        // Test with already sorted list: 1->2->3->4
        ListNode head2 = new ListNode(1);
        head2.next = new ListNode(2);
        head2.next.next = new ListNode(3);
        head2.next.next.next = new ListNode(4);

        ListNode result2 = solution.insertionSortList(head2);
        System.out.print("Already sorted list: ");
        while (result2 != null) {
            System.out.print(result2.val + " -> ");
            result2 = result2.next;
        }
        System.out.println("null");

        // Test with single node: 1
        ListNode head3 = new ListNode(1);
        ListNode result3 = solution.insertionSortList(head3);
        System.out.print("Single node list: ");
        while (result3 != null) {
            System.out.print(result3.val + " -> ");
            result3 = result3.next;
        }
        System.out.println("null");
    }
} 