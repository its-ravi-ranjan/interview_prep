/**
 * Q1. Delete Node in a Linked List
 * 
 * Problem:
 * There is a singly-linked list head and we want to delete a node node in it.
 * You are given the node to be deleted node. You will not be given access to the first node of head.
 * All the values of the linked list are unique, and it is guaranteed that the given node node is not the last node in the linked list.
 * 
 * Example:
 * Input: head = [4,5,1,9], node = 5
 * Output: [4,1,9]
 * Explanation: You are given the second node with value 5, the linked list should become 4 -> 1 -> 9 after calling your function.
 * 
 * Approach:
 * Since we don't have access to the previous node, we can't directly delete the given node.
 * Instead, we can copy the value of the next node to the current node and then delete the next node.
 * This effectively removes the current node from the list.
 * 
 * Time Complexity: O(1) - We only need to perform a constant number of operations
 * Space Complexity: O(1) - We use constant extra space
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class DeleteNode {
    public void deleteNode(ListNode node) {
        // Copy the value of the next node to the current node
        node.val = node.next.val;
        // Skip the next node by pointing to the node after it
        node.next = node.next.next;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Create test linked list: 4->5->1->9
        ListNode head = new ListNode(4);
        head.next = new ListNode(5);
        head.next.next = new ListNode(1);
        head.next.next.next = new ListNode(9);

        // Delete node with value 5
        DeleteNode solution = new DeleteNode();
        solution.deleteNode(head.next); // Pass the node with value 5

        // Print the modified list
        ListNode current = head;
        while (current != null) {
            System.out.print(current.val + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }
} 