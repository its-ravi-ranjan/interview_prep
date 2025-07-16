/**
 * Q4. Merge Two Sorted Lists
 * 
 * Problem:
 * You are given the heads of two sorted linked lists list1 and list2.
 * Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
 * Return the head of the merged linked list.
 * 
 * Example:
 * Input: list1 = [1,2,4], list2 = [1,3,4]
 * Output: [1,1,2,3,4,4]
 * 
 * Approach:
 * 1. Create a dummy node to handle the result list
 * 2. Use a pointer to build the merged list
 * 3. Compare nodes from both lists and link the smaller one
 * 4. Move the pointer and the list pointer forward
 * 5. Attach remaining nodes from the non-empty list
 * 
 * Time Complexity: O(N + M) where N and M are the lengths of the input lists
 * Space Complexity: O(1) as we reuse the existing nodes
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class MergeTwoLists {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Create a dummy node to handle the result list
        ListNode dummy = new ListNode(-1);
        ListNode current = dummy;

        // Compare and merge nodes from both lists
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                current.next = list1;
                list1 = list1.next;
            } else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;
        }

        // Attach remaining nodes from either list
        current.next = (list1 != null) ? list1 : list2;

        return dummy.next;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Create first sorted list: 1->2->4
        ListNode list1 = new ListNode(1);
        list1.next = new ListNode(2);
        list1.next.next = new ListNode(4);

        // Create second sorted list: 1->3->4
        ListNode list2 = new ListNode(1);
        list2.next = new ListNode(3);
        list2.next.next = new ListNode(4);

        // Merge the lists
        MergeTwoLists solution = new MergeTwoLists();
        ListNode result = solution.mergeTwoLists(list1, list2);

        // Print the merged list
        System.out.print("Merged List: ");
        while (result != null) {
            System.out.print(result.val + " -> ");
            result = result.next;
        }
        System.out.println("null");
    }
} 