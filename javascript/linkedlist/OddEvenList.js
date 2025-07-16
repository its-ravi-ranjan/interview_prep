/**
 * Odd Even List
 * 
 * Problem:
 * Given the head of a singly linked list, group all the nodes with odd indices
 * together followed by the nodes with even indices, and return the reordered list.
 * The first node is considered odd, and the second node is even, and so on.
 * 
 * Example:
 * Input: head = [1,2,3,4,5]
 * Output: [1,3,5,2,4]
 * Explanation:
 * - Odd indices: 1->3->5
 * - Even indices: 2->4
 * - Combined: 1->3->5->2->4
 * 
 * Approach:
 * 1. Use two pointers: odd and even
 * 2. Connect odd nodes together and even nodes together
 * 3. Connect the end of odd list to the start of even list
 * 4. Return the head of the reordered list
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

class OddEvenList {
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    oddEvenList(head) {
        if (!head || !head.next) return head;

        let odd = head;
        let even = head.next;
        const evenHead = even;

        while (even && even.next) {
            // Connect odd nodes
            odd.next = even.next;
            odd = odd.next;

            // Connect even nodes
            even.next = odd.next;
            even = even.next;
        }

        // Connect odd list to even list
        odd.next = evenHead;

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
    const solution = new OddEvenList();

    // Test case 1: Regular case with odd number of nodes
    console.log("Test case 1: Regular case with odd number of nodes");
    const list1 = OddEvenList.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    OddEvenList.printList(list1);
    console.log("Reordered list:");
    OddEvenList.printList(solution.oddEvenList(list1));

    // Test case 2: Regular case with even number of nodes
    console.log("\nTest case 2: Regular case with even number of nodes");
    const list2 = OddEvenList.createList([1, 2, 3, 4]);
    console.log("Original list:");
    OddEvenList.printList(list2);
    console.log("Reordered list:");
    OddEvenList.printList(solution.oddEvenList(list2));

    // Test case 3: Single node list
    console.log("\nTest case 3: Single node list");
    const list3 = OddEvenList.createList([1]);
    console.log("Original list:");
    OddEvenList.printList(list3);
    console.log("Reordered list:");
    OddEvenList.printList(solution.oddEvenList(list3));

    // Test case 4: Empty list
    console.log("\nTest case 4: Empty list");
    const list4 = null;
    console.log("Original list: null");
    console.log("Reordered list:");
    OddEvenList.printList(solution.oddEvenList(list4));

    // Test case 5: Two node list
    console.log("\nTest case 5: Two node list");
    const list5 = OddEvenList.createList([1, 2]);
    console.log("Original list:");
    OddEvenList.printList(list5);
    console.log("Reordered list:");
    OddEvenList.printList(solution.oddEvenList(list5));

    // Test case 6: List with negative numbers
    console.log("\nTest case 6: List with negative numbers");
    const list6 = OddEvenList.createList([-1, -2, -3, -4, -5]);
    console.log("Original list:");
    OddEvenList.printList(list6);
    console.log("Reordered list:");
    OddEvenList.printList(solution.oddEvenList(list6));

    // Test case 7: List with duplicate values
    console.log("\nTest case 7: List with duplicate values");
    const list7 = OddEvenList.createList([1, 1, 2, 2, 3, 3]);
    console.log("Original list:");
    OddEvenList.printList(list7);
    console.log("Reordered list:");
    OddEvenList.printList(solution.oddEvenList(list7));
}

// Run the tests
runTests(); 