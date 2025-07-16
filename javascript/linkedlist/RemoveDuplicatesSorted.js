/**
 * Q10. Remove Duplicates from Sorted List
 * 
 * Problem:
 * Given the head of a sorted linked list, delete all duplicates such that each element appears only once.
 * Return the linked list sorted as well.
 * 
 * Example:
 * Input: head = [1,1,2,3,3]
 * Output: [1,2,3]
 * 
 * Approach:
 * 1. Use a current pointer to traverse the list
 * 2. For each node, check if its value equals the next node's value
 * 3. If equal, skip the next node by updating current.next
 * 4. If not equal, move current pointer forward
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

class RemoveDuplicatesSorted {
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    deleteDuplicates(head) {
        if (!head || !head.next) return head;

        let current = head;

        while (current && current.next) {
            if (current.val === current.next.val) {
                // Skip the duplicate node
                current.next = current.next.next;
            } else {
                // Move to next node
                current = current.next;
            }
        }

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
    const solution = new RemoveDuplicatesSorted();

    // Test case 1: List with consecutive duplicates
    console.log("Test case 1: List with consecutive duplicates");
    const list1 = RemoveDuplicatesSorted.createList([1, 1, 2, 3, 3]);
    console.log("Original list:");
    RemoveDuplicatesSorted.printList(list1);
    const result1 = solution.deleteDuplicates(list1);
    console.log("List after removing duplicates:");
    RemoveDuplicatesSorted.printList(result1);

    // Test case 2: List with no duplicates
    console.log("\nTest case 2: List with no duplicates");
    const list2 = RemoveDuplicatesSorted.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    RemoveDuplicatesSorted.printList(list2);
    const result2 = solution.deleteDuplicates(list2);
    console.log("List after removing duplicates:");
    RemoveDuplicatesSorted.printList(result2);

    // Test case 3: List with all duplicates
    console.log("\nTest case 3: List with all duplicates");
    const list3 = RemoveDuplicatesSorted.createList([1, 1, 1, 1, 1]);
    console.log("Original list:");
    RemoveDuplicatesSorted.printList(list3);
    const result3 = solution.deleteDuplicates(list3);
    console.log("List after removing duplicates:");
    RemoveDuplicatesSorted.printList(result3);

    // Test case 4: Empty list
    console.log("\nTest case 4: Empty list");
    const list4 = null;
    console.log("Original list: null");
    const result4 = solution.deleteDuplicates(list4);
    console.log("List after removing duplicates:");
    RemoveDuplicatesSorted.printList(result4);

    // Test case 5: Single node list
    console.log("\nTest case 5: Single node list");
    const list5 = RemoveDuplicatesSorted.createList([1]);
    console.log("Original list:");
    RemoveDuplicatesSorted.printList(list5);
    const result5 = solution.deleteDuplicates(list5);
    console.log("List after removing duplicates:");
    RemoveDuplicatesSorted.printList(result5);

    // Test case 6: List with multiple groups of duplicates
    console.log("\nTest case 6: List with multiple groups of duplicates");
    const list6 = RemoveDuplicatesSorted.createList([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
    console.log("Original list:");
    RemoveDuplicatesSorted.printList(list6);
    const result6 = solution.deleteDuplicates(list6);
    console.log("List after removing duplicates:");
    RemoveDuplicatesSorted.printList(result6);
}

// Run the tests
runTests(); 