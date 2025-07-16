/**
 * Sort List
 * 
 * Problem:
 * Given the head of a linked list, return the list after sorting it in ascending order.
 * 
 * Example:
 * Input: head = [4,2,1,3]
 * Output: [1,2,3,4]
 * 
 * Approach:
 * 1. Use merge sort algorithm:
 *    - Find the middle of the list using slow and fast pointers
 *    - Split the list into two halves
 *    - Recursively sort both halves
 *    - Merge the sorted halves
 * 2. Return the sorted list
 * 
 * Time Complexity: O(N log N) where N is the number of nodes
 * Space Complexity: O(log N) for the recursion stack
 */

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SortList {
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    sortList(head) {
        if (!head || !head.next) return head;

        // Find middle of the list
        const mid = this.findMiddle(head);
        const right = mid.next;
        mid.next = null;

        // Recursively sort both halves
        const left = this.sortList(head);
        const sortedRight = this.sortList(right);

        // Merge sorted halves
        return this.merge(left, sortedRight);
    }

    /**
     * Find the middle node of the list
     * @param {ListNode} head
     * @return {ListNode}
     */
    findMiddle(head) {
        let slow = head;
        let fast = head;

        while (fast.next && fast.next.next) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow;
    }

    /**
     * Merge two sorted lists
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode}
     */
    merge(l1, l2) {
        const dummy = new ListNode(0);
        let current = dummy;

        while (l1 && l2) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }

        // Attach remaining nodes
        current.next = l1 || l2;

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
    const solution = new SortList();

    // Test case 1: Regular case
    console.log("Test case 1: Regular case");
    const list1 = SortList.createList([4, 2, 1, 3]);
    console.log("Original list:");
    SortList.printList(list1);
    console.log("Sorted list:");
    SortList.printList(solution.sortList(list1));

    // Test case 2: Already sorted list
    console.log("\nTest case 2: Already sorted list");
    const list2 = SortList.createList([1, 2, 3, 4]);
    console.log("Original list:");
    SortList.printList(list2);
    console.log("Sorted list:");
    SortList.printList(solution.sortList(list2));

    // Test case 3: Reverse sorted list
    console.log("\nTest case 3: Reverse sorted list");
    const list3 = SortList.createList([4, 3, 2, 1]);
    console.log("Original list:");
    SortList.printList(list3);
    console.log("Sorted list:");
    SortList.printList(solution.sortList(list3));

    // Test case 4: List with duplicate values
    console.log("\nTest case 4: List with duplicate values");
    const list4 = SortList.createList([3, 1, 4, 1, 5, 9, 2, 6]);
    console.log("Original list:");
    SortList.printList(list4);
    console.log("Sorted list:");
    SortList.printList(solution.sortList(list4));

    // Test case 5: Single node list
    console.log("\nTest case 5: Single node list");
    const list5 = SortList.createList([1]);
    console.log("Original list:");
    SortList.printList(list5);
    console.log("Sorted list:");
    SortList.printList(solution.sortList(list5));

    // Test case 6: Empty list
    console.log("\nTest case 6: Empty list");
    const list6 = null;
    console.log("Original list: null");
    console.log("Sorted list:");
    SortList.printList(solution.sortList(list6));

    // Test case 7: List with negative numbers
    console.log("\nTest case 7: List with negative numbers");
    const list7 = SortList.createList([-5, 3, -2, 0, 1, -4]);
    console.log("Original list:");
    SortList.printList(list7);
    console.log("Sorted list:");
    SortList.printList(solution.sortList(list7));
}

// Run the tests
runTests(); 