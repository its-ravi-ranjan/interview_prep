/**
 * Q7. Intersection of Two Linked Lists
 * 
 * Problem:
 * Given the heads of two singly linked-lists headA and headB, return the node at which
 * the two lists intersect. If the two linked lists have no intersection at all, return null.
 * 
 * Example:
 * For example, the following two linked lists begin to intersect at node c1:
 * pA: a1 → a2 → c1 → c2 → c3 → null → b1 → b2 → b3 → c1 ← Match
 * pB: b1 → b2 → b3 → c1 → c2 → c3 → null → a1 → a2 → c1 ← Match
 * 
 * Approach:
 * 1. Use two pointers pA and pB
 * 2. When pA reaches the end, move it to headB
 * 3. When pB reaches the end, move it to headA
 * 4. The pointers will meet at the intersection point
 * 
 * Time Complexity: O(N + M) where N and M are the lengths of the input lists
 * Space Complexity: O(1) as we only use pointers
 */

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class IntersectionOfTwoLists {
    /**
     * @param {ListNode} headA
     * @param {ListNode} headB
     * @return {ListNode}
     */
    getIntersectionNode(headA, headB) {
        if (!headA || !headB) return null;

        let pA = headA;
        let pB = headB;

        while (pA !== pB) {
            // Move pA to headB when it reaches the end
            pA = pA ? pA.next : headB;
            // Move pB to headA when it reaches the end
            pB = pB ? pB.next : headA;
        }

        return pA; // or pB, they're the same
    }

    /**
     * Approach 2: Using Set to store nodes
     * 
     * Approach:
     * Store all nodes of headB in a Set.
     * Traverse headA; return the node when one exists in the set.
     * If no match is found, return null.
     * 
     * Time Complexity: O(n + m), where n and m are lengths of listA and listB.
     * Space Complexity: O(m), storing nodes of listB in a set.
     * 
     * @param {ListNode} headA
     * @param {ListNode} headB
     * @return {ListNode}
     */
    getIntersectionNodeUsingSet(headA, headB) {
        let set = new Set();
        while (headB) {
            set.add(headB);
            headB = headB.next;
        }
        while (headA) {
            if (set.has(headA)) return headA;
            headA = headA.next;
        }
        return null;
    }

    // Helper method to create a linked list
    static createList(values) {
        if (!values || values.length === 0) return null;
        
        const head = new ListNode(values[0]);
        let current = head;
        
        for (let i = 1; i < values.length; i++) {
            current.next = new ListNode(values[i]);
            current = current.next;
        }
        
        return head;
    }

    // Helper method to create intersecting lists
    static createIntersectingLists(listA, listB, intersection) {
        if (!listA || !listB) return [null, null];

        const headA = this.createList(listA);
        const headB = this.createList(listB);
        const intersectionNode = this.createList(intersection);

        // Find the last node of list A
        let currentA = headA;
        while (currentA.next) {
            currentA = currentA.next;
        }
        // Connect list A to intersection
        currentA.next = intersectionNode;

        // Find the last node of list B
        let currentB = headB;
        while (currentB.next) {
            currentB = currentB.next;
        }
        // Connect list B to intersection
        currentB.next = intersectionNode;

        return [headA, headB];
    }

    // Helper method to print the list
    static printList(head) {
        let current = head;
        const values = [];
        while (current) {
            values.push(current.val);
            current = current.next;
        }
        console.log(values.join(' -> '));
    }
}

// Test cases
function runTests() {
    const solution = new IntersectionOfTwoLists();

    // Test case 1: Lists with intersection
    console.log("Test case 1: Lists with intersection");
    const [listA1, listB1] = IntersectionOfTwoLists.createIntersectingLists(
        [4, 1, 8],
        [5, 6, 1],
        [8, 4, 5]
    );
    console.log("List A:");
    IntersectionOfTwoLists.printList(listA1);
    console.log("List B:");
    IntersectionOfTwoLists.printList(listB1);
    const intersection1 = solution.getIntersectionNode(listA1, listB1);
    console.log("Intersection node value:", intersection1 ? intersection1.val : null);

    // Test case 2: Lists with no intersection
    console.log("\nTest case 2: Lists with no intersection");
    const listA2 = IntersectionOfTwoLists.createList([2, 6, 4]);
    const listB2 = IntersectionOfTwoLists.createList([1, 5]);
    console.log("List A:");
    IntersectionOfTwoLists.printList(listA2);
    console.log("List B:");
    IntersectionOfTwoLists.printList(listB2);
    const intersection2 = solution.getIntersectionNode(listA2, listB2);
    console.log("Intersection node value:", intersection2 ? intersection2.val : null);

    // Test case 3: Lists with intersection at first node
    console.log("\nTest case 3: Lists with intersection at first node");
    const [listA3, listB3] = IntersectionOfTwoLists.createIntersectingLists(
        [1],
        [1],
        [1, 2, 3]
    );
    console.log("List A:");
    IntersectionOfTwoLists.printList(listA3);
    console.log("List B:");
    IntersectionOfTwoLists.printList(listB3);
    const intersection3 = solution.getIntersectionNode(listA3, listB3);
    console.log("Intersection node value:", intersection3 ? intersection3.val : null);

    // Test case 4: Empty lists
    console.log("\nTest case 4: Empty lists");
    const listA4 = null;
    const listB4 = null;
    console.log("List A: null");
    console.log("List B: null");
    const intersection4 = solution.getIntersectionNode(listA4, listB4);
    console.log("Intersection node value:", intersection4 ? intersection4.val : null);

    // Test case 5: One empty list
    console.log("\nTest case 5: One empty list");
    const listA5 = IntersectionOfTwoLists.createList([1, 2, 3]);
    const listB5 = null;
    console.log("List A:");
    IntersectionOfTwoLists.printList(listA5);
    console.log("List B: null");
    const intersection5 = solution.getIntersectionNode(listA5, listB5);
    console.log("Intersection node value:", intersection5 ? intersection5.val : null);
}

// Run the tests
runTests(); 