/**
 * Insertion Sort List
 * 
 * Problem:
 * Given the head of a singly linked list, sort the list using insertion sort,
 * and return the sorted list's head.
 * 
 * Example:
 * Input: head = [4,2,1,3]
 * Output: [1,2,3,4]
 * Explanation:
 * - Start with 4: [4]
 * - Insert 2: [2,4]
 * - Insert 1: [1,2,4]
 * - Insert 3: [1,2,3,4]
 * 
 * Approach:
 * 1. Create a dummy node to handle edge cases
 * 2. For each node in the original list:
 *    - Find the correct position in the sorted list
 *    - Insert the node at that position
 * 3. Return the sorted list
 * 
 * Time Complexity: O(N²) where N is the number of nodes
 * Space Complexity: O(1) as we only use pointers
 */

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class InsertionSortList {
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    insertionSortList(head) {
        if (!head || !head.next) return head;

        // Create dummy node for sorted list
        const dummy = new ListNode(0);
        let current = head;

        while (current) {
            // Store next node before we change current's next
            const next = current.next;
            
            // Find the position to insert current node
            let prev = dummy;
            while (prev.next && prev.next.val < current.val) {
                prev = prev.next;
            }

            // Insert current node
            current.next = prev.next;
            prev.next = current;

            // Move to next node
            current = next;
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
    const solution = new InsertionSortList();

    // Test case 1: Regular case
    console.log("Test case 1: Regular case");
    const list1 = InsertionSortList.createList([4, 2, 1, 3]);
    console.log("Original list:");
    InsertionSortList.printList(list1);
    console.log("Sorted list:");
    InsertionSortList.printList(solution.insertionSortList(list1));

    // Test case 2: Already sorted list
    console.log("\nTest case 2: Already sorted list");
    const list2 = InsertionSortList.createList([1, 2, 3, 4]);
    console.log("Original list:");
    InsertionSortList.printList(list2);
    console.log("Sorted list:");
    InsertionSortList.printList(solution.insertionSortList(list2));

    // Test case 3: Reverse sorted list
    console.log("\nTest case 3: Reverse sorted list");
    const list3 = InsertionSortList.createList([4, 3, 2, 1]);
    console.log("Original list:");
    InsertionSortList.printList(list3);
    console.log("Sorted list:");
    InsertionSortList.printList(solution.insertionSortList(list3));

    // Test case 4: List with duplicate values
    console.log("\nTest case 4: List with duplicate values");
    const list4 = InsertionSortList.createList([3, 1, 4, 1, 5, 9, 2, 6]);
    console.log("Original list:");
    InsertionSortList.printList(list4);
    console.log("Sorted list:");
    InsertionSortList.printList(solution.insertionSortList(list4));

    // Test case 5: Single node list
    console.log("\nTest case 5: Single node list");
    const list5 = InsertionSortList.createList([1]);
    console.log("Original list:");
    InsertionSortList.printList(list5);
    console.log("Sorted list:");
    InsertionSortList.printList(solution.insertionSortList(list5));

    // Test case 6: Empty list
    console.log("\nTest case 6: Empty list");
    const list6 = null;
    console.log("Original list: null");
    console.log("Sorted list:");
    InsertionSortList.printList(solution.insertionSortList(list6));

    // Test case 7: List with negative numbers
    console.log("\nTest case 7: List with negative numbers");
    const list7 = InsertionSortList.createList([-5, 3, -2, 0, 1, -4]);
    console.log("Original list:");
    InsertionSortList.printList(list7);
    console.log("Sorted list:");
    InsertionSortList.printList(solution.insertionSortList(list7));
}

// Run the tests
runTests(); 