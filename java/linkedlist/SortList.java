/**
 * Q17. Sort Linked List
 * 
 * Problem:
 * Given the head of a linked list, return the list after sorting it in ascending order.
 * 
 * Example:
 * Input: head = [4,2,1,3]
 * Output: [1,2,3,4]
 * 
 * Approach:
 * 1. Use Merge Sort algorithm:
 *    - Find the middle of the list using slow and fast pointers
 *    - Split the list into two halves
 *    - Recursively sort both halves
 *    - Merge the sorted halves
 * 
 * Time Complexity: O(N log N) where N is the number of nodes
 * Space Complexity: O(log N) for recursion stack
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class SortList {
    public ListNode sortList(ListNode head) {
        // Base case: empty list or single node
        if (head == null || head.next == null) {
            return head;
        }

        // Find middle node
        ListNode mid = getHalf(head);
        ListNode next = mid.next;
        mid.next = null;  // Split the list

        // Recursively sort both halves
        ListNode firstHalf = sortList(head);
        ListNode secondHalf = sortList(next);

        // Merge sorted halves
        return merge(firstHalf, secondHalf);
    }

    // Helper method to find middle node
    private ListNode getHalf(ListNode node) {
        ListNode fast = node;
        ListNode slow = node;
        ListNode prev = null;

        while (fast != null && fast.next != null) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }

        return prev;
    }

    // Helper method to merge two sorted lists
    private ListNode merge(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;

        while (l1 != null && l2 != null) {
            if (l1.val < l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }

        // Attach remaining nodes
        current.next = (l1 != null) ? l1 : l2;

        return dummy.next;
    }

    // Helper method to create a linked list
    private static ListNode createList(int[] values) {
        if (values == null || values.length == 0) {
            return null;
        }

        ListNode head = new ListNode(values[0]);
        ListNode current = head;

        for (int i = 1; i < values.length; i++) {
            current.next = new ListNode(values[i]);
            current = current.next;
        }

        return head;
    }

    // Helper method to print the list
    private static void printList(ListNode head) {
        ListNode current = head;
        while (current != null) {
            System.out.print(current.val);
            if (current.next != null) {
                System.out.print(" -> ");
            }
            current = current.next;
        }
        System.out.println();
    }

    // Main method for testing
    public static void main(String[] args) {
        SortList solution = new SortList();

        // Test case 1: Random order [4,2,1,3]
        int[] values1 = {4, 2, 1, 3};
        ListNode head1 = createList(values1);
        System.out.println("Test case 1: Random order");
        System.out.println("Original list:");
        printList(head1);
        ListNode result1 = solution.sortList(head1);
        System.out.println("Sorted list:");
        printList(result1);

        // Test case 2: Already sorted [1,2,3,4]
        int[] values2 = {1, 2, 3, 4};
        ListNode head2 = createList(values2);
        System.out.println("\nTest case 2: Already sorted");
        System.out.println("Original list:");
        printList(head2);
        ListNode result2 = solution.sortList(head2);
        System.out.println("Sorted list:");
        printList(result2);

        // Test case 3: Reverse sorted [4,3,2,1]
        int[] values3 = {4, 3, 2, 1};
        ListNode head3 = createList(values3);
        System.out.println("\nTest case 3: Reverse sorted");
        System.out.println("Original list:");
        printList(head3);
        ListNode result3 = solution.sortList(head3);
        System.out.println("Sorted list:");
        printList(result3);

        // Test case 4: List with duplicates [3,1,4,1,5,9,2,6]
        int[] values4 = {3, 1, 4, 1, 5, 9, 2, 6};
        ListNode head4 = createList(values4);
        System.out.println("\nTest case 4: List with duplicates");
        System.out.println("Original list:");
        printList(head4);
        ListNode result4 = solution.sortList(head4);
        System.out.println("Sorted list:");
        printList(result4);

        // Test case 5: Single node [1]
        int[] values5 = {1};
        ListNode head5 = createList(values5);
        System.out.println("\nTest case 5: Single node");
        System.out.println("Original list:");
        printList(head5);
        ListNode result5 = solution.sortList(head5);
        System.out.println("Sorted list:");
        printList(result5);

        // Test case 6: Empty list
        ListNode head6 = null;
        System.out.println("\nTest case 6: Empty list");
        ListNode result6 = solution.sortList(head6);
        System.out.println("Sorted list: " + (result6 == null ? "null" : "not null"));
    }
} 