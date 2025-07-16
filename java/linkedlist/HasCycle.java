/**
 * Q8. Linked List Cycle
 * 
 * Problem:
 * Given head, the head of a linked list, determine if the linked list has a cycle in it.
 * There is a cycle in a linked list if there is some node in the list that can be reached again
 * by continuously following the next pointer.
 * 
 * Example:
 * Input: head = [3,2,0,-4], pos = 1
 * Output: true
 * Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
 * 
 * Approach:
 * Floyd's Cycle Detection Algorithm (Tortoise and Hare):
 * 1. Use two pointers: slow and fast
 * 2. Slow pointer moves one step at a time
 * 3. Fast pointer moves two steps at a time
 * 4. If there's a cycle, they will eventually meet
 * 5. If fast reaches null, there's no cycle
 * 
 * Time Complexity: O(N) where N is the number of nodes
 * Space Complexity: O(1) as we only use two pointers
 */

import java.util.HashSet;
import java.util.Set;

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
        val = x;
        next = null;
    }
}

public class HasCycle {
    public boolean hasCycle(ListNode head) {
        // Handle edge cases
        if (head == null || head.next == null) {
            return false;
        }

        // Initialize two pointers
        ListNode slow = head;
        ListNode fast = head;

        // Move pointers until they meet or fast reaches end
        while (fast != null && fast.next != null) {
            slow = slow.next;        // Move slow by 1
            fast = fast.next.next;   // Move fast by 2

            // If they meet, there's a cycle
            if (slow == fast) {
                return true;
            }
        }

        // If fast reaches null, there's no cycle
        return false;
    }

    /**
     * Approach 2: Using HashSet to track visited nodes
     * 
     * Approach:
     * Use a HashSet to track visited nodes.
     * While traversing, if we encounter a node already in the set, we've found a cycle.
     * If we reach null, there's no cycle.
     * 
     * Time Complexity: O(n), where n is the number of nodes in the list.
     * Space Complexity: O(n), in the worst case we store all nodes in a set.
     * 
     * @param head Head of the linked list
     * @return true if cycle exists, false otherwise
     */
    public boolean hasCycleUsingSet(ListNode head) {
        Set<ListNode> seenNodes = new HashSet<>();
        ListNode curr = head;
        
        while (curr != null) {
            if (seenNodes.contains(curr)) {
                return true;
            }
            seenNodes.add(curr);
            curr = curr.next;
        }
        
        return false;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Create a linked list with cycle: 3->2->0->-4->2
        ListNode head = new ListNode(3);
        head.next = new ListNode(2);
        head.next.next = new ListNode(0);
        head.next.next.next = new ListNode(-4);
        head.next.next.next.next = head.next; // Create cycle

        // Test cycle detection
        HasCycle solution = new HasCycle();
        boolean hasCycle = solution.hasCycle(head);
        System.out.println("Has cycle: " + hasCycle);

        // Create a linked list without cycle: 1->2->3->4
        ListNode head2 = new ListNode(1);
        head2.next = new ListNode(2);
        head2.next.next = new ListNode(3);
        head2.next.next.next = new ListNode(4);

        // Test cycle detection
        boolean hasCycle2 = solution.hasCycle(head2);
        System.out.println("Has cycle: " + hasCycle2);
    }
} 