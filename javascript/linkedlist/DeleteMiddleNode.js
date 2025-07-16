/**
 * Delete Middle Node
 * 
 * Problem:
 * Given the head of a linked list, delete the middle node, and return the head of the modified linked list.
 * The middle node of a linked list of size n is the ⌊n / 2⌋th node from the start using 0-based indexing.
 * For n = 1, 2, 3, 4, and 5, the middle nodes are 0, 1, 1, 2, and 2, respectively.
 * 
 * Example:
 * Input: head = [1,3,4,7,1,2,6]
 * Output: [1,3,4,1,2,6]
 * Explanation:
 * - The middle node is 7 (index 3)
 * - After deleting it, the list becomes [1,3,4,1,2,6]
 * 
 * Approach:
 * 1. Use slow and fast pointers to find the middle node
 * 2. Keep track of the previous node of the middle node
 * 3. Delete the middle node by updating pointers
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

class DeleteMiddleNode {
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    deleteMiddle(head) {
        if (!head || !head.next) return null;

        let slow = head;
        let fast = head;
        let prev = null;

        while (fast && fast.next) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }

        // Delete the middle node
        prev.next = slow.next;

        return head;
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
    const solution = new DeleteMiddleNode();

    // Test case 1: Regular case
    console.log("Test case 1: Regular case");
    const list1 = DeleteMiddleNode.createList([1, 3, 4, 7, 1, 2, 6]);
    console.log("Original list:");
    DeleteMiddleNode.printList(list1);
    console.log("List after deleting middle node:");
    DeleteMiddleNode.printList(solution.deleteMiddle(list1));

    // Test case 2: Two node list
    console.log("\nTest case 2: Two node list");
    const list2 = DeleteMiddleNode.createList([1, 2]);
    console.log("Original list:");
    DeleteMiddleNode.printList(list2);
    console.log("List after deleting middle node:");
    DeleteMiddleNode.printList(solution.deleteMiddle(list2));

    // Test case 3: Three node list
    console.log("\nTest case 3: Three node list");
    const list3 = DeleteMiddleNode.createList([1, 2, 3]);
    console.log("Original list:");
    DeleteMiddleNode.printList(list3);
    console.log("List after deleting middle node:");
    DeleteMiddleNode.printList(solution.deleteMiddle(list3));

    // Test case 4: Single node list
    console.log("\nTest case 4: Single node list");
    const list4 = DeleteMiddleNode.createList([1]);
    console.log("Original list:");
    DeleteMiddleNode.printList(list4);
    console.log("List after deleting middle node:");
    DeleteMiddleNode.printList(solution.deleteMiddle(list4));

    // Test case 5: Empty list
    console.log("\nTest case 5: Empty list");
    const list5 = null;
    console.log("Original list: null");
    console.log("List after deleting middle node:");
    DeleteMiddleNode.printList(solution.deleteMiddle(list5));

    // Test case 6: List with even number of nodes
    console.log("\nTest case 6: List with even number of nodes");
    const list6 = DeleteMiddleNode.createList([1, 2, 3, 4]);
    console.log("Original list:");
    DeleteMiddleNode.printList(list6);
    console.log("List after deleting middle node:");
    DeleteMiddleNode.printList(solution.deleteMiddle(list6));

    // Test case 7: List with negative numbers
    console.log("\nTest case 7: List with negative numbers");
    const list7 = DeleteMiddleNode.createList([-1, -2, -3, -4, -5]);
    console.log("Original list:");
    DeleteMiddleNode.printList(list7);
    console.log("List after deleting middle node:");
    DeleteMiddleNode.printList(solution.deleteMiddle(list7));
}

// Run the tests
runTests(); 