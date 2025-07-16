/**
 * Delete All Occurrences
 * 
 * Problem:
 * Given the head of a linked list and a value, remove all nodes that have the given value.
 * 
 * Example:
 * Input: head = [1,2,6,3,4,5,6], val = 6
 * Output: [1,2,3,4,5]
 * Explanation:
 * - Remove all nodes with value 6
 * - Keep all other nodes in their original order
 * 
 * Approach:
 * 1. Use a dummy node to handle edge cases
 * 2. Use two pointers: prev and current
 * 3. While traversing:
 *    - If current node's value matches val, skip it
 *    - Otherwise, keep the node and move pointers
 * 4. Return the modified list
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

class DeleteAllOccurrences {
    /**
     * @param {ListNode} head
     * @param {number} val
     * @return {ListNode}
     */
    deleteAllOccurrences(head, val) {
        if (!head) return null;

        // Create dummy node
        const dummy = new ListNode(0);
        dummy.next = head;
        let prev = dummy;
        let current = head;

        while (current) {
            if (current.val === val) {
                // Skip the current node
                prev.next = current.next;
            } else {
                // Keep the current node
                prev = current;
            }
            current = current.next;
        }

        return dummy.next;
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
    const solution = new DeleteAllOccurrences();

    // Test case 1: Regular case
    console.log("Test case 1: Regular case");
    const list1 = DeleteAllOccurrences.createList([1, 2, 6, 3, 4, 5, 6]);
    console.log("Original list:");
    DeleteAllOccurrences.printList(list1);
    console.log("List after deleting 6:");
    DeleteAllOccurrences.printList(solution.deleteAllOccurrences(list1, 6));

    // Test case 2: Value at the start
    console.log("\nTest case 2: Value at the start");
    const list2 = DeleteAllOccurrences.createList([1, 1, 2, 3, 4]);
    console.log("Original list:");
    DeleteAllOccurrences.printList(list2);
    console.log("List after deleting 1:");
    DeleteAllOccurrences.printList(solution.deleteAllOccurrences(list2, 1));

    // Test case 3: Value at the end
    console.log("\nTest case 3: Value at the end");
    const list3 = DeleteAllOccurrences.createList([1, 2, 3, 4, 5, 5]);
    console.log("Original list:");
    DeleteAllOccurrences.printList(list3);
    console.log("List after deleting 5:");
    DeleteAllOccurrences.printList(solution.deleteAllOccurrences(list3, 5));

    // Test case 4: All nodes have the value
    console.log("\nTest case 4: All nodes have the value");
    const list4 = DeleteAllOccurrences.createList([2, 2, 2, 2]);
    console.log("Original list:");
    DeleteAllOccurrences.printList(list4);
    console.log("List after deleting 2:");
    DeleteAllOccurrences.printList(solution.deleteAllOccurrences(list4, 2));

    // Test case 5: Empty list
    console.log("\nTest case 5: Empty list");
    const list5 = null;
    console.log("Original list: null");
    console.log("List after deleting 1:");
    DeleteAllOccurrences.printList(solution.deleteAllOccurrences(list5, 1));

    // Test case 6: Single node list
    console.log("\nTest case 6: Single node list");
    const list6 = DeleteAllOccurrences.createList([1]);
    console.log("Original list:");
    DeleteAllOccurrences.printList(list6);
    console.log("List after deleting 1:");
    DeleteAllOccurrences.printList(solution.deleteAllOccurrences(list6, 1));

    // Test case 7: Value not in list
    console.log("\nTest case 7: Value not in list");
    const list7 = DeleteAllOccurrences.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    DeleteAllOccurrences.printList(list7);
    console.log("List after deleting 6:");
    DeleteAllOccurrences.printList(solution.deleteAllOccurrences(list7, 6));
}

// Run the tests
runTests(); 