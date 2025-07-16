/**
 * Q4. Merge Two Sorted Lists
 * 
 * Problem:
 * You are given the heads of two sorted linked lists list1 and list2.
 * Merge the two lists into one sorted list. The list should be made by splicing together
 * the nodes of the first two lists.
 * Return the head of the merged linked list.
 * 
 * Example:
 * Input: list1 = [1,2,4], list2 = [1,3,4]
 * Output: [1,1,2,3,4,4]
 * 
 * Approach:
 * 1. Create a dummy node to handle edge cases
 * 2. Compare nodes from both lists
 * 3. Attach the smaller node to the result list
 * 4. Move the pointer in the list from which we took the node
 * 5. Attach remaining nodes from the non-empty list
 * 
 * Time Complexity: O(N + M) where N and M are the lengths of the input lists
 * Space Complexity: O(1) as we reuse existing nodes
 */

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class MergeTwoSortedLists {
    /**
     * @param {ListNode} list1
     * @param {ListNode} list2
     * @return {ListNode}
     */
    mergeTwoLists(list1, list2) {
        // Create a dummy node
        const dummy = new ListNode(0);
        let current = dummy;

        // Compare and merge nodes
        while (list1 && list2) {
            if (list1.val <= list2.val) {
                current.next = list1;
                list1 = list1.next;
            } else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;
        }

        // Attach remaining nodes
        current.next = list1 || list2;

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
    const solution = new MergeTwoSortedLists();

    // Test case 1: Regular merge
    console.log("Test case 1: Regular merge");
    const list1_1 = MergeTwoSortedLists.createList([1, 2, 4]);
    const list2_1 = MergeTwoSortedLists.createList([1, 3, 4]);
    console.log("List 1:");
    MergeTwoSortedLists.printList(list1_1);
    console.log("List 2:");
    MergeTwoSortedLists.printList(list2_1);
    const result1 = solution.mergeTwoLists(list1_1, list2_1);
    console.log("Merged list:");
    MergeTwoSortedLists.printList(result1);

    // Test case 2: Empty lists
    console.log("\nTest case 2: Empty lists");
    const list1_2 = null;
    const list2_2 = null;
    console.log("List 1: null");
    console.log("List 2: null");
    const result2 = solution.mergeTwoLists(list1_2, list2_2);
    console.log("Merged list:");
    MergeTwoSortedLists.printList(result2);

    // Test case 3: One empty list
    console.log("\nTest case 3: One empty list");
    const list1_3 = MergeTwoSortedLists.createList([1, 3, 5]);
    const list2_3 = null;
    console.log("List 1:");
    MergeTwoSortedLists.printList(list1_3);
    console.log("List 2: null");
    const result3 = solution.mergeTwoLists(list1_3, list2_3);
    console.log("Merged list:");
    MergeTwoSortedLists.printList(result3);

    // Test case 4: Lists with different lengths
    console.log("\nTest case 4: Lists with different lengths");
    const list1_4 = MergeTwoSortedLists.createList([1, 2, 3, 4, 5]);
    const list2_4 = MergeTwoSortedLists.createList([1, 2]);
    console.log("List 1:");
    MergeTwoSortedLists.printList(list1_4);
    console.log("List 2:");
    MergeTwoSortedLists.printList(list2_4);
    const result4 = solution.mergeTwoLists(list1_4, list2_4);
    console.log("Merged list:");
    MergeTwoSortedLists.printList(result4);

    // Test case 5: Lists with duplicate values
    console.log("\nTest case 5: Lists with duplicate values");
    const list1_5 = MergeTwoSortedLists.createList([1, 1, 2, 3]);
    const list2_5 = MergeTwoSortedLists.createList([1, 2, 2, 4]);
    console.log("List 1:");
    MergeTwoSortedLists.printList(list1_5);
    console.log("List 2:");
    MergeTwoSortedLists.printList(list2_5);
    const result5 = solution.mergeTwoLists(list1_5, list2_5);
    console.log("Merged list:");
    MergeTwoSortedLists.printList(result5);
}

// Run the tests
runTests(); 