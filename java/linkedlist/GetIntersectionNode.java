/**
 * Q7. Intersection of Two Linked Lists
 * 
 * Problem:
 * Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect.
 * If the two linked lists have no intersection at all, return null.
 * 
 * Example:
 * Input: 
 * pA: a1 → a2 → c1 → c2 → c3 → null → b1 → b2 → b3 → c1 ← Match
 * pB: b1 → b2 → b3 → c1 → c2 → c3 → null → a1 → a2 → c1 ← Match
 * Output: c1
 * 
 * Approach:
 * 1. Use two pointers pA and pB starting at headA and headB
 * 2. When pA reaches end, move it to headB
 * 3. When pB reaches end, move it to headA
 * 4. They will meet at intersection point or null
 * 5. This works because they will traverse same distance: a + b + c
 * 
 * Time Complexity: O(N + M) where N and M are the lengths of the lists
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

public class GetIntersectionNode {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode pA = headA;
        ListNode pB = headB;
        
        while (pA != pB) {
            // Move pA to headB if it reaches end
            pA = (pA == null) ? headB : pA.next;
            // Move pB to headA if it reaches end
            pB = (pB == null) ? headA : pB.next;
        }
        
        return pA; // or pB, they are the same
    }

    /**
     * Approach 2: Using HashSet to store nodes
     * 
     * Approach:
     * Store all nodes of headB in a Set.
     * Traverse headA; return the node when one exists in the set.
     * If no match is found, return null.
     * 
     * Time Complexity: O(n + m), where n and m are lengths of listA and listB.
     * Space Complexity: O(m), storing nodes of listB in a set.
     * 
     * @param headA Head of first linked list
     * @param headB Head of second linked list
     * @return Intersection node or null
     */
    public ListNode getIntersectionNodeUsingSet(ListNode headA, ListNode headB) {
        Set<ListNode> set = new HashSet<>();
        while (headB != null) {
            set.add(headB);
            headB = headB.next;
        }
        while (headA != null) {
            if (set.contains(headA)) return headA;
            headA = headA.next;
        }
        return null;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Create intersection node
        ListNode intersection = new ListNode(8);
        intersection.next = new ListNode(4);
        intersection.next.next = new ListNode(5);

        // Create first list: 4->1->8->4->5
        ListNode headA = new ListNode(4);
        headA.next = new ListNode(1);
        headA.next.next = intersection;

        // Create second list: 5->6->1->8->4->5
        ListNode headB = new ListNode(5);
        headB.next = new ListNode(6);
        headB.next.next = new ListNode(1);
        headB.next.next.next = intersection;

        // Find intersection
        GetIntersectionNode solution = new GetIntersectionNode();
        ListNode result = solution.getIntersectionNode(headA, headB);

        // Print result
        if (result != null) {
            System.out.println("Intersection node value: " + result.val);
            System.out.print("List from intersection: ");
            while (result != null) {
                System.out.print(result.val + " -> ");
                result = result.next;
            }
            System.out.println("null");
        } else {
            System.out.println("No intersection found");
        }
    }
} 