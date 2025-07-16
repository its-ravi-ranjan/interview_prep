/**
 * Q9. Reverse Linked List
 * 
 * Problem:
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
 * 
 * Example:
 * Input: head = [1,2,3,4,5]
 * Output: [5,4,3,2,1]
 * 
 * Approach:
 * Iterative approach:
 * 1. Use three pointers: prev, current, and next
 * 2. Initialize prev as null and current as head
 * 3. For each node:
 *    - Store next node
 *    - Reverse current node's pointer
 *    - Move prev and current one step forward
 * 4. Return prev as new head
 * 
 * Time Complexity: O(N) where N is the number of nodes
 * Space Complexity: O(1) as we only use pointers
 */

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class ReverseList {
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    reverseList(head) {
        let prev = null;
        let current = head;

        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        return prev;
    }

    /**
     * Recursive approach to reverse linked list
     * @param {ListNode} head
     * @return {ListNode}
     */
    reverseListRecursive(head) {
        if (!head || !head.next) return head;

        const newHead = this.reverseListRecursive(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
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

    // Helper method to print the list
    static printList(head) {
        const values = [];
        let current = head;
        
        while (current) {
            values.push(current.val);
            current = current.next;
        }
        
        console.log(values.join(' -> '));
    }
}

// Test cases
function runTests() {
    const solution = new ReverseList();

    // Test case 1: Normal list
    console.log("Test case 1: Normal list");
    const list1 = ReverseList.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    ReverseList.printList(list1);
    console.log("Reversed list (iterative):");
    ReverseList.printList(solution.reverseList(list1));
    console.log("Reversed list (recursive):");
    ReverseList.printList(solution.reverseListRecursive(ReverseList.createList([1, 2, 3, 4, 5])));

    // Test case 2: Two node list
    console.log("\nTest case 2: Two node list");
    const list2 = ReverseList.createList([1, 2]);
    console.log("Original list:");
    ReverseList.printList(list2);
    console.log("Reversed list (iterative):");
    ReverseList.printList(solution.reverseList(list2));
    console.log("Reversed list (recursive):");
    ReverseList.printList(solution.reverseListRecursive(ReverseList.createList([1, 2])));

    // Test case 3: Single node list
    console.log("\nTest case 3: Single node list");
    const list3 = ReverseList.createList([1]);
    console.log("Original list:");
    ReverseList.printList(list3);
    console.log("Reversed list (iterative):");
    ReverseList.printList(solution.reverseList(list3));
    console.log("Reversed list (recursive):");
    ReverseList.printList(solution.reverseListRecursive(ReverseList.createList([1])));

    // Test case 4: Empty list
    console.log("\nTest case 4: Empty list");
    const list4 = null;
    console.log("Original list: null");
    console.log("Reversed list (iterative):");
    ReverseList.printList(solution.reverseList(list4));
    console.log("Reversed list (recursive):");
    ReverseList.printList(solution.reverseListRecursive(null));

    // Test case 5: List with negative numbers
    console.log("\nTest case 5: List with negative numbers");
    const list5 = ReverseList.createList([-5, -4, -3, -2, -1]);
    console.log("Original list:");
    ReverseList.printList(list5);
    console.log("Reversed list (iterative):");
    ReverseList.printList(solution.reverseList(list5));
    console.log("Reversed list (recursive):");
    ReverseList.printList(solution.reverseListRecursive(ReverseList.createList([-5, -4, -3, -2, -1])));
}

// Run the tests
runTests(); 