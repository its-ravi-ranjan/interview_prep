/**
 * Q11. Remove Duplicates from Sorted List II
 * 
 * Problem:
 * Given the head of a sorted linked list, delete all nodes that have duplicate numbers,
 * leaving only distinct numbers from the original list. Return the linked list sorted as well.
 * 
 * Example:
 * Input: head = [1,2,3,3,4,4,5]
 * Output: [1,2,5]
 * Explanation: 3 and 4 are duplicates, so we remove all nodes with values 3 and 4.
 * 
 * Approach:
 * 1. Use a dummy node to handle edge cases (like removing head)
 * 2. Use two pointers: prev and current
 * 3. For each node:
 *    - Check if current node's value equals next node's value
 *    - If equal, skip all nodes with same value
 *    - If not equal, move both pointers forward
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

class RemoveDuplicatesSortedII {
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    deleteDuplicates(head) {
        // Create a dummy node to handle edge cases
        const dummy = new ListNode(0);
        dummy.next = head;
        
        let prev = dummy;
        let current = head;

        while (current && current.next) {
            // If current node's value equals next node's value
            if (current.val === current.next.val) {
                // Skip all nodes with same value
                const duplicateValue = current.val;
                while (current && current.val === duplicateValue) {
                    current = current.next;
                }
                // Update prev's next to skip all duplicates
                prev.next = current;
            } else {
                // Move both pointers forward
                prev = current;
                current = current.next;
            }
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
    const solution = new RemoveDuplicatesSortedII();

    // Test case 1: List with multiple duplicates
    console.log("Test case 1: List with multiple duplicates");
    const list1 = RemoveDuplicatesSortedII.createList([1, 2, 3, 3, 4, 4, 5]);
    console.log("Original list:");
    RemoveDuplicatesSortedII.printList(list1);
    const result1 = solution.deleteDuplicates(list1);
    console.log("List after removing duplicates:");
    RemoveDuplicatesSortedII.printList(result1);

    // Test case 2: List with duplicates at start
    console.log("\nTest case 2: List with duplicates at start");
    const list2 = RemoveDuplicatesSortedII.createList([1, 1, 1, 2, 3]);
    console.log("Original list:");
    RemoveDuplicatesSortedII.printList(list2);
    const result2 = solution.deleteDuplicates(list2);
    console.log("List after removing duplicates:");
    RemoveDuplicatesSortedII.printList(result2);

    // Test case 3: List with duplicates at end
    console.log("\nTest case 3: List with duplicates at end");
    const list3 = RemoveDuplicatesSortedII.createList([1, 2, 3, 3, 3]);
    console.log("Original list:");
    RemoveDuplicatesSortedII.printList(list3);
    const result3 = solution.deleteDuplicates(list3);
    console.log("List after removing duplicates:");
    RemoveDuplicatesSortedII.printList(result3);

    // Test case 4: List with all duplicates
    console.log("\nTest case 4: List with all duplicates");
    const list4 = RemoveDuplicatesSortedII.createList([1, 1, 1, 1, 1]);
    console.log("Original list:");
    RemoveDuplicatesSortedII.printList(list4);
    const result4 = solution.deleteDuplicates(list4);
    console.log("List after removing duplicates:");
    RemoveDuplicatesSortedII.printList(result4);

    // Test case 5: Empty list
    console.log("\nTest case 5: Empty list");
    const list5 = null;
    console.log("Original list: null");
    const result5 = solution.deleteDuplicates(list5);
    console.log("List after removing duplicates:");
    RemoveDuplicatesSortedII.printList(result5);

    // Test case 6: Single node list
    console.log("\nTest case 6: Single node list");
    const list6 = RemoveDuplicatesSortedII.createList([1]);
    console.log("Original list:");
    RemoveDuplicatesSortedII.printList(list6);
    const result6 = solution.deleteDuplicates(list6);
    console.log("List after removing duplicates:");
    RemoveDuplicatesSortedII.printList(result6);

    // Test case 7: List with alternating duplicates
    console.log("\nTest case 7: List with alternating duplicates");
    const list7 = RemoveDuplicatesSortedII.createList([1, 1, 2, 2, 3, 3, 4, 4, 5]);
    console.log("Original list:");
    RemoveDuplicatesSortedII.printList(list7);
    const result7 = solution.deleteDuplicates(list7);
    console.log("List after removing duplicates:");
    RemoveDuplicatesSortedII.printList(result7);
}

// Run the tests
runTests(); 