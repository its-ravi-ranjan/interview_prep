/**
 * Q11. Linked List Cycle II
 * 
 * Problem:
 * Given the head of a linked list, return the node where the cycle begins.
 * If there is no cycle, return null.
 * 
 * There is a cycle in a linked list if there is some node in the list that can be reached again
 * by continuously following the next pointer. Internally, pos is used to denote the index of the
 * node that tail's next pointer is connected to (0-indexed). It is -1 if there is no cycle.
 * Note that pos is not passed as a parameter.
 * 
 * Example:
 * Input: head = [3,2,0,-4], pos = 1
 * Output: tail connects to node index 1
 * Explanation: There is a cycle in the linked list, where tail connects to the second node.
 * 
 * Approach:
 * 1. Use Floyd's Cycle Detection Algorithm (Tortoise and Hare)
 * 2. When fast and slow meet, reset slow to head
 * 3. Move both pointers one step at a time
 * 4. They will meet at the cycle start
 * 
 * Time Complexity: O(N) where N is the number of nodes
 * Space Complexity: O(1) as we only use two pointers
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
        val = x;
        next = null;
    }
}

public class DetectCycleStart {
    public ListNode detectCycle(ListNode head) {
        // Handle edge cases
        if (head == null || head.next == null) {
            return null;
        }

        // Step 1: Find meeting point using Floyd's algorithm
        ListNode fast = head;
        ListNode slow = head;
        
        while (fast != null && fast.next != null) {
            fast = fast.next.next;
            slow = slow.next;
            
            // If they meet, there is a cycle
            if (fast == slow) {
                // Step 2: Find cycle start
                ListNode current = head;
                while (current != slow) {
                    current = current.next;
                    slow = slow.next;
                }
                return current;
            }
        }
        
        // No cycle found
        return null;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Test case 1: List with cycle at index 1
        ListNode head1 = new ListNode(3);
        ListNode node2 = new ListNode(2);
        ListNode node3 = new ListNode(0);
        ListNode node4 = new ListNode(-4);
        
        head1.next = node2;
        node2.next = node3;
        node3.next = node4;
        node4.next = node2; // Create cycle at node2

        DetectCycleStart solution = new DetectCycleStart();
        ListNode cycleStart = solution.detectCycle(head1);
        System.out.println("Cycle starts at node with value: " + 
            (cycleStart != null ? cycleStart.val : "null"));

        // Test case 2: List with cycle at head
        ListNode head2 = new ListNode(1);
        ListNode node5 = new ListNode(2);
        head2.next = node5;
        node5.next = head2; // Create cycle at head

        cycleStart = solution.detectCycle(head2);
        System.out.println("Cycle starts at node with value: " + 
            (cycleStart != null ? cycleStart.val : "null"));

        // Test case 3: List without cycle
        ListNode head3 = new ListNode(1);
        head3.next = new ListNode(2);
        head3.next.next = new ListNode(3);

        cycleStart = solution.detectCycle(head3);
        System.out.println("Cycle starts at node with value: " + 
            (cycleStart != null ? cycleStart.val : "null"));

        // Test case 4: Empty list
        cycleStart = solution.detectCycle(null);
        System.out.println("Cycle starts at node with value: " + 
            (cycleStart != null ? cycleStart.val : "null"));

        // Test case 5: Single node without cycle
        ListNode head5 = new ListNode(1);
        cycleStart = solution.detectCycle(head5);
        System.out.println("Cycle starts at node with value: " + 
            (cycleStart != null ? cycleStart.val : "null"));
    }
} 