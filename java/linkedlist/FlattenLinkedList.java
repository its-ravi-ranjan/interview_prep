/**
 * Q12. Flatten a Multilevel Linked List
 * 
 * Problem:
 * Given a linked list containing 'N' head nodes where every node in the linked list contains two pointers:
 * - 'next' points to the next node in the list
 * - 'child' pointer to a linked list where the current node is the head
 * Each of these child linked lists is in sorted order and connected by a 'child' pointer.
 * Task is to flatten this linked list such that all nodes appear in a single layer or level in a 'sorted order'.
 * 
 * Example:
 * Input:
 * 5 -> 10 -> 19 -> 28
 * |    |     |     |
 * 7    20    22    35
 * |          |     |
 * 8          50    40
 * |                |
 * 30               45
 * 
 * Output: 5->7->8->10->19->20->22->28->30->35->40->45->50
 * 
 * Approach:
 * 1. Recursively flatten the list
 * 2. For each node, merge its child list with the next list
 * 3. Use merge sort technique to merge sorted lists
 * 
 * Time Complexity: O(N) where N is the total number of nodes
 * Space Complexity: O(1) as we only use pointers
 */

class ListNode {
    int val;
    ListNode next;
    ListNode child;
    
    ListNode(int val) {
        this.val = val;
        this.next = null;
        this.child = null;
    }
}

public class FlattenLinkedList {
    public static ListNode flatten(ListNode root) {
        // Handle edge cases
        if (root == null || root.next == null) {
            return root;
        }

        // Recursively flatten the list
        ListNode head = root;
        head.next = flatten(head.next);
        
        // Merge current list with next list
        head = mergeList(head, head.next);
        
        return head;
    }

    private static ListNode mergeList(ListNode l1, ListNode l2) {
        // Create dummy node for result
        ListNode head = new ListNode(0);
        ListNode dummy = head;

        // Merge the two lists
        while (l1 != null && l2 != null) {
            if (l1.val < l2.val) {
                dummy.child = l1;
                l1 = l1.child;
            } else {
                dummy.child = l2;
                l2 = l2.child;
            }
            dummy = dummy.child;
        }

        // Attach remaining nodes
        dummy.child = (l1 != null) ? l1 : l2;
        
        return head.child;
    }

    // Helper method to print the flattened list
    private static void printList(ListNode head) {
        ListNode current = head;
        while (current != null) {
            System.out.print(current.val + " -> ");
            current = current.child;
        }
        System.out.println("null");
    }

    // Main method for testing
    public static void main(String[] args) {
        // Create the multilevel linked list
        // 5 -> 10 -> 19 -> 28
        // |    |     |     |
        // 7    20    22    35
        // |          |     |
        // 8          50    40
        // |                |
        // 30               45

        ListNode head = new ListNode(5);
        ListNode node10 = new ListNode(10);
        ListNode node19 = new ListNode(19);
        ListNode node28 = new ListNode(28);

        // Set next pointers
        head.next = node10;
        node10.next = node19;
        node19.next = node28;

        // Set child pointers
        ListNode node7 = new ListNode(7);
        ListNode node8 = new ListNode(8);
        ListNode node30 = new ListNode(30);
        head.child = node7;
        node7.child = node8;
        node8.child = node30;

        ListNode node20 = new ListNode(20);
        node10.child = node20;

        ListNode node22 = new ListNode(22);
        ListNode node50 = new ListNode(50);
        node19.child = node22;
        node22.child = node50;

        ListNode node35 = new ListNode(35);
        ListNode node40 = new ListNode(40);
        ListNode node45 = new ListNode(45);
        node28.child = node35;
        node35.child = node40;
        node40.child = node45;

        // Flatten the list
        System.out.println("Original multilevel list structure:");
        System.out.println("5 -> 10 -> 19 -> 28");
        System.out.println("|    |     |     |");
        System.out.println("7    20    22    35");
        System.out.println("|          |     |");
        System.out.println("8          50    40");
        System.out.println("|                |");
        System.out.println("30               45");
        System.out.println("\nFlattened list:");
        
        ListNode flattened = flatten(head);
        printList(flattened);

        // Test case 2: Empty list
        ListNode result2 = flatten(null);
        System.out.println("\nEmpty list result: " + (result2 == null ? "null" : "not null"));

        // Test case 3: Single node
        ListNode head3 = new ListNode(1);
        ListNode result3 = flatten(head3);
        System.out.println("\nSingle node list:");
        printList(result3);

        // Test case 4: Two nodes with child
        ListNode head4 = new ListNode(1);
        ListNode node2 = new ListNode(2);
        head4.next = node2;
        head4.child = new ListNode(3);
        ListNode result4 = flatten(head4);
        System.out.println("\nTwo nodes with child:");
        printList(result4);
    }
} 