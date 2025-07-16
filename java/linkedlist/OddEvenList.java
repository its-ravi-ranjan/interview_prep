/**
 * Q18. Odd Even Linked List
 * 
 * Problem:
 * Given the head of a singly linked list, group all the nodes with odd indices together
 * followed by the nodes with even indices, and return the reordered list.
 * The first node is considered odd, and the second node is even, and so on.
 * Note that the relative order inside both the even and odd groups should remain as it was in the input.
 * 
 * Example:
 * Input: head = [1,2,3,4,5]
 * Output: [1,3,5,2,4]
 * 
 * Approach 1 (Using Extra Space):
 * 1. Create two dummy nodes for odd and even lists
 * 2. Traverse the original list and separate nodes into odd and even lists
 * 3. Connect odd list to even list
 * 
 * Approach 2 (In-place):
 * 1. Use two pointers: odd and even
 * 2. Keep track of even head
 * 3. Reconnect nodes in-place
 * 
 * Time Complexity: O(N) where N is the number of nodes
 * Space Complexity: 
 *   - Approach 1: O(1) extra space (only dummy nodes)
 *   - Approach 2: O(1) extra space (only pointers)
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class OddEvenList {
    // Approach 1: Using dummy nodes
    public ListNode oddEvenList(ListNode head) {
        // Create dummy nodes for odd and even lists
        ListNode odd = new ListNode(0);
        ListNode oddTail = odd;
        ListNode even = new ListNode(0);
        ListNode evenTail = even;
        
        int count = 1;
        ListNode current = head;
        
        // Separate nodes into odd and even lists
        while (current != null) {
            if (count % 2 == 0) {
                evenTail.next = current;
                evenTail = evenTail.next;
            } else {
                oddTail.next = current;
                oddTail = oddTail.next;
            }
            count++;
            current = current.next;
        }
        
        // Connect odd list to even list
        oddTail.next = even.next;
        evenTail.next = null;
        
        return odd.next;
    }

    // Approach 2: In-place reordering
    public ListNode oddEvenList2(ListNode head) {
        // Handle edge cases
        if (head == null || head.next == null) {
            return head;
        }

        ListNode odd = head;
        ListNode even = head.next;
        ListNode evenHead = even;

        // Reconnect nodes in-place
        while (even != null && even.next != null) {
            odd.next = even.next;
            odd = odd.next;
            even.next = odd.next;
            even = even.next;
        }

        // Connect odd list to even list
        odd.next = evenHead;
        
        return head;
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
        OddEvenList solution = new OddEvenList();

        // Test case 1: List with odd number of nodes [1,2,3,4,5]
        int[] values1 = {1, 2, 3, 4, 5};
        ListNode head1 = createList(values1);
        System.out.println("Test case 1: List with odd number of nodes");
        System.out.println("Original list:");
        printList(head1);
        
        System.out.println("\nApproach 1 (Using dummy nodes):");
        ListNode result1 = solution.oddEvenList(head1);
        printList(result1);
        
        // Create new list for second approach
        head1 = createList(values1);
        System.out.println("\nApproach 2 (In-place):");
        ListNode result1_2 = solution.oddEvenList2(head1);
        printList(result1_2);

        // Test case 2: List with even number of nodes [1,2,3,4]
        int[] values2 = {1, 2, 3, 4};
        ListNode head2 = createList(values2);
        System.out.println("\nTest case 2: List with even number of nodes");
        System.out.println("Original list:");
        printList(head2);
        
        System.out.println("\nApproach 1 (Using dummy nodes):");
        ListNode result2 = solution.oddEvenList(head2);
        printList(result2);
        
        // Create new list for second approach
        head2 = createList(values2);
        System.out.println("\nApproach 2 (In-place):");
        ListNode result2_2 = solution.oddEvenList2(head2);
        printList(result2_2);

        // Test case 3: Single node [1]
        int[] values3 = {1};
        ListNode head3 = createList(values3);
        System.out.println("\nTest case 3: Single node");
        System.out.println("Original list:");
        printList(head3);
        
        System.out.println("\nApproach 1 (Using dummy nodes):");
        ListNode result3 = solution.oddEvenList(head3);
        printList(result3);
        
        System.out.println("\nApproach 2 (In-place):");
        ListNode result3_2 = solution.oddEvenList2(head3);
        printList(result3_2);

        // Test case 4: Empty list
        ListNode head4 = null;
        System.out.println("\nTest case 4: Empty list");
        System.out.println("Approach 1 (Using dummy nodes):");
        ListNode result4 = solution.oddEvenList(head4);
        System.out.println("Result: " + (result4 == null ? "null" : "not null"));
        
        System.out.println("\nApproach 2 (In-place):");
        ListNode result4_2 = solution.oddEvenList2(head4);
        System.out.println("Result: " + (result4_2 == null ? "null" : "not null"));
    }
} 