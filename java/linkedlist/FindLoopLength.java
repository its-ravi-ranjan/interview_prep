/**
 * Q15. Find Length of Loop in Linked List
 * 
 * Problem:
 * Given the head of a singly linked list, find the length of the loop in the linked list if it exists.
 * Return the length of the loop if it exists; otherwise, return 0.
 * A loop exists in a linked list if some node in the list can be reached again by continuously following the next pointer.
 * Internally, pos is used to denote the index (0-based) of the node from where the loop starts.
 * Note that pos is not passed as a parameter.
 * 
 * Example:
 * Input: head = [1,2,3,4,5], pos = 1 (where 5 points to 2)
 * Output: 4 (length of loop: 2->3->4->5->2)
 * 
 * Approach:
 * 1. Use Floyd's Cycle Detection Algorithm (slow and fast pointers) to detect if there's a loop
 * 2. If a loop is found, keep one pointer at the meeting point and move another pointer
 *    around the loop until it reaches back to the meeting point, counting the nodes
 * 
 * Time Complexity: O(N) where N is the number of nodes
 * Space Complexity: O(1) as we only use pointers
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class FindLoopLength {
    public int findLengthOfLoop(ListNode head) {
        // Handle edge cases
        if (head == null || head.next == null) {
            return 0;
        }

        // Initialize pointers
        ListNode fast = head;
        ListNode slow = head;

        // Find meeting point using Floyd's Cycle Detection
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            
            // If loop is found
            if (slow == fast) {
                // Count length of loop
                int count = 1;
                ListNode current = slow.next;
                while (current != slow) {
                    current = current.next;
                    count++;
                }
                return count;
            }
        }
        
        return 0; // No loop found
    }

    // Helper method to create a linked list with a loop
    private static ListNode createListWithLoop(int[] values, int loopStartIndex) {
        if (values == null || values.length == 0) {
            return null;
        }

        ListNode head = new ListNode(values[0]);
        ListNode current = head;
        ListNode loopStart = null;

        // Create the list
        for (int i = 1; i < values.length; i++) {
            current.next = new ListNode(values[i]);
            current = current.next;
            
            // Mark the loop start node
            if (i == loopStartIndex) {
                loopStart = current;
            }
        }

        // Create the loop if loopStartIndex is valid
        if (loopStartIndex >= 0 && loopStartIndex < values.length) {
            current.next = loopStart;
        }

        return head;
    }

    // Helper method to print the list (only non-loop part)
    private static void printList(ListNode head, int length) {
        ListNode current = head;
        int count = 0;
        while (current != null && count < length) {
            System.out.print(current.val + " -> ");
            current = current.next;
            count++;
        }
        System.out.println("... (loop)");
    }

    // Main method for testing
    public static void main(String[] args) {
        FindLoopLength solution = new FindLoopLength();

        // Test case 1: List with loop of length 4 [1,2,3,4,5] with loop at index 1
        int[] values1 = {1, 2, 3, 4, 5};
        ListNode head1 = createListWithLoop(values1, 1);
        System.out.println("Test case 1: List with loop of length 4");
        System.out.println("List structure: 1 -> 2 -> 3 -> 4 -> 5 -> 2 (loop)");
        int length1 = solution.findLengthOfLoop(head1);
        System.out.println("Length of loop: " + length1);

        // Test case 2: List with loop of length 3 [1,2,3,4] with loop at index 0
        int[] values2 = {1, 2, 3, 4};
        ListNode head2 = createListWithLoop(values2, 0);
        System.out.println("\nTest case 2: List with loop of length 3");
        System.out.println("List structure: 1 -> 2 -> 3 -> 4 -> 1 (loop)");
        int length2 = solution.findLengthOfLoop(head2);
        System.out.println("Length of loop: " + length2);

        // Test case 3: List with no loop [1,2,3,4,5]
        int[] values3 = {1, 2, 3, 4, 5};
        ListNode head3 = createListWithLoop(values3, -1);
        System.out.println("\nTest case 3: List with no loop");
        System.out.println("List structure: 1 -> 2 -> 3 -> 4 -> 5");
        int length3 = solution.findLengthOfLoop(head3);
        System.out.println("Length of loop: " + length3);

        // Test case 4: Empty list
        ListNode head4 = null;
        System.out.println("\nTest case 4: Empty list");
        int length4 = solution.findLengthOfLoop(head4);
        System.out.println("Length of loop: " + length4);

        // Test case 5: Single node list with self-loop
        ListNode head5 = new ListNode(1);
        head5.next = head5;
        System.out.println("\nTest case 5: Single node with self-loop");
        System.out.println("List structure: 1 -> 1 (loop)");
        int length5 = solution.findLengthOfLoop(head5);
        System.out.println("Length of loop: " + length5);
    }
} 