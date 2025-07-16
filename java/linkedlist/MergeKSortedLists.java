/**
 * Q17. Merge k Sorted Lists
 * 
 * Problem:
 * You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
 * Merge all the linked-lists into one sorted linked-list and return it.
 * 
 * Example:
 * Input: lists = [[1,4,5],[1,3,4],[2,6]]
 * Output: [1,1,2,3,4,4,5,6]
 * 
 * Approach:
 * 1. Use a min heap (PriorityQueue) to store the head of each list
 * 2. Create a dummy node for the result list
 * 3. While heap is not empty:
 *    - Remove min node from heap
 *    - Add it to result list
 *    - Add its next node to heap if exists
 * 4. Return the merged list
 * 
 * Time Complexity: O(N log k) where N is total number of nodes and k is number of lists
 * Space Complexity: O(k) for the heap
 */

import java.util.PriorityQueue;
import java.util.Comparator;

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class MergeKSortedLists {
    public ListNode mergeKLists(ListNode[] lists) {
        // Handle edge cases
        if (lists == null || lists.length == 0) {
            return null;
        }

        // Create min heap
        PriorityQueue<ListNode> minHeap = new PriorityQueue<>(
            lists.length,
            Comparator.comparingInt(a -> a.val)
        );

        // Add head of each list to heap
        for (ListNode list : lists) {
            if (list != null) {
                minHeap.offer(list);
            }
        }

        // Create dummy node for result
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;

        // Merge lists
        while (!minHeap.isEmpty()) {
            // Get min node
            ListNode minNode = minHeap.poll();
            
            // Add to result
            current.next = minNode;
            current = current.next;

            // Add next node to heap if exists
            if (minNode.next != null) {
                minHeap.offer(minNode.next);
            }
        }

        return dummy.next;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Create test lists: [[1,4,5],[1,3,4],[2,6]]
        ListNode list1 = new ListNode(1);
        list1.next = new ListNode(4);
        list1.next.next = new ListNode(5);

        ListNode list2 = new ListNode(1);
        list2.next = new ListNode(3);
        list2.next.next = new ListNode(4);

        ListNode list3 = new ListNode(2);
        list3.next = new ListNode(6);

        ListNode[] lists = {list1, list2, list3};

        // Merge lists
        MergeKSortedLists solution = new MergeKSortedLists();
        ListNode result = solution.mergeKLists(lists);

        // Print the result
        System.out.print("Merged k sorted lists: ");
        while (result != null) {
            System.out.print(result.val + " -> ");
            result = result.next;
        }
        System.out.println("null");

        // Test with empty array
        ListNode[] emptyLists = {};
        ListNode result2 = solution.mergeKLists(emptyLists);
        System.out.println("Empty array result: " + (result2 == null ? "null" : "not null"));

        // Test with array containing null lists
        ListNode[] nullLists = {null, null};
        ListNode result3 = solution.mergeKLists(nullLists);
        System.out.println("Null lists result: " + (result3 == null ? "null" : "not null"));
    }
} 