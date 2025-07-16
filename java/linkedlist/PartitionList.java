/**
 * Q13. Partition List
 * 
 * Problem:
 * Given the head of a linked list and a value x, partition it such that all nodes less than x
 * come before nodes greater than or equal to x. You should preserve the original relative order
 * of the nodes in each of the two partitions.
 * 
 * Example:
 * Input: head = [1,4,3,2,5,2], x = 3
 * Output: [1,2,2,4,3,5]
 * 
 * Approach:
 * 1. Create two dummy nodes for before and after lists
 * 2. Use two pointers to build before and after lists
 * 3. Traverse original list and partition nodes
 * 4. Connect before and after lists
 * 5. Return the merged list
 * 
 * Time Complexity: O(N) where N is the number of nodes
 * Space Complexity: O(1) as we only use pointers
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class PartitionList {
    public ListNode partition(ListNode head, int x) {
        // Create dummy nodes for before and after lists
        ListNode beforeHead = new ListNode(0);
        ListNode afterHead = new ListNode(0);
        ListNode before = beforeHead;
        ListNode after = afterHead;

        // Traverse the list and partition nodes
        while (head != null) {
            if (head.val < x) {
                before.next = head;
                before = before.next;
            } else {
                after.next = head;
                after = after.next;
            }
            head = head.next;
        }

        // Connect before and after lists
        after.next = null;
        before.next = afterHead.next;

        return beforeHead.next;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Create test linked list: 1->4->3->2->5->2
        ListNode head = new ListNode(1);
        head.next = new ListNode(4);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(2);
        head.next.next.next.next = new ListNode(5);
        head.next.next.next.next.next = new ListNode(2);

        // Partition list around x = 3
        PartitionList solution = new PartitionList();
        ListNode result = solution.partition(head, 3);

        // Print the result
        System.out.print("List after partitioning around 3: ");
        while (result != null) {
            System.out.print(result.val + " -> ");
            result = result.next;
        }
        System.out.println("null");

        // Test with all elements less than x
        ListNode head2 = new ListNode(1);
        head2.next = new ListNode(2);
        head2.next.next = new ListNode(3);

        ListNode result2 = solution.partition(head2, 4);
        System.out.print("List with all elements < 4: ");
        while (result2 != null) {
            System.out.print(result2.val + " -> ");
            result2 = result2.next;
        }
        System.out.println("null");

        // Test with all elements greater than x
        ListNode head3 = new ListNode(5);
        head3.next = new ListNode(6);
        head3.next.next = new ListNode(7);

        ListNode result3 = solution.partition(head3, 4);
        System.out.print("List with all elements > 4: ");
        while (result3 != null) {
            System.out.print(result3.val + " -> ");
            result3 = result3.next;
        }
        System.out.println("null");
    }
} 