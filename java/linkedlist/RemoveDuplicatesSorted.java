/**
 * Q19. Remove Duplicates from Sorted Doubly Linked List
 * 
 * Problem:
 * Given the head of a doubly linked list with its values sorted in non-decreasing order,
 * remove all duplicate occurrences of any value in the list so that only distinct values
 * are present in the list.
 * 
 * Example:
 * Input: head -> 1 <-> 1 <-> 3 <-> 3 <-> 4 <-> 5
 * Output: head -> 1 <-> 3 <-> 4 <-> 5
 * 
 * Approach:
 * 1. Handle edge cases (null or single node)
 * 2. Use two pointers: prev and current
 * 3. For each node:
 *    - If current value is different from prev value:
 *      a. Update prev's next pointer
 *      b. Update current's prev pointer
 *      c. Move prev forward
 *    - Move current forward
 * 4. Set prev's next to null at the end
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

public class RemoveDuplicatesSorted {
    public ListNode removeDuplicates(ListNode head) {
        // Handle edge cases
        if (head == null || head.next == null) {
            return head;
        }

        ListNode current = head.next;
        ListNode prev = head;

        // Traverse the list
        while (current != null) {
            if (current.val != prev.val) {
                // Update pointers only if values are different
                prev.next = current;
                current.prev = prev;
                prev = prev.next;
            }
            current = current.next;
        }

        // Set the last node's next to null
        prev.next = null;
        
        return head;
    }

    // Helper method to create a sorted doubly linked list
    private static ListNode createSortedList(int[] values) {
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
        RemoveDuplicatesSorted solution = new RemoveDuplicatesSorted();

        // Test case 1: List with consecutive duplicates [1,1,3,3,4,5]
        int[] values1 = {1, 1, 3, 3, 4, 5};
        ListNode head1 = createSortedList(values1);
        System.out.println("Test case 1: List with consecutive duplicates");
        System.out.println("Original list:");
        printList(head1);
        ListNode result1 = solution.removeDuplicates(head1);
        System.out.println("List after removing duplicates:");
        printList(result1);

        // Test case 2: List with all same values [1,1,1,1]
        int[] values2 = {1, 1, 1, 1};
        ListNode head2 = createSortedList(values2);
        System.out.println("\nTest case 2: List with all same values");
        System.out.println("Original list:");
        printList(head2);
        ListNode result2 = solution.removeDuplicates(head2);
        System.out.println("List after removing duplicates:");
        printList(result2);

        // Test case 3: List with no duplicates [1,2,3,4,5]
        int[] values3 = {1, 2, 3, 4, 5};
        ListNode head3 = createSortedList(values3);
        System.out.println("\nTest case 3: List with no duplicates");
        System.out.println("Original list:");
        printList(head3);
        ListNode result3 = solution.removeDuplicates(head3);
        System.out.println("List after removing duplicates:");
        printList(result3);

        // Test case 4: Single node [1]
        int[] values4 = {1};
        ListNode head4 = createSortedList(values4);
        System.out.println("\nTest case 4: Single node");
        System.out.println("Original list:");
        printList(head4);
        ListNode result4 = solution.removeDuplicates(head4);
        System.out.println("List after removing duplicates:");
        printList(result4);

        // Test case 5: Empty list
        ListNode head5 = null;
        System.out.println("\nTest case 5: Empty list");
        ListNode result5 = solution.removeDuplicates(head5);
        System.out.println("Result: " + (result5 == null ? "null" : "not null"));

        // Test case 6: List with duplicates at start and end [1,1,2,3,4,4,4]
        int[] values6 = {1, 1, 2, 3, 4, 4, 4};
        ListNode head6 = createSortedList(values6);
        System.out.println("\nTest case 6: List with duplicates at start and end");
        System.out.println("Original list:");
        printList(head6);
        ListNode result6 = solution.removeDuplicates(head6);
        System.out.println("List after removing duplicates:");
        printList(result6);
    }
} 