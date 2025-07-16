/**
 * Q5. Find Middle Node of Linked List
 * 
 * Problem:
 * Given the head of a singly linked list, return the middle node of the linked list.
 * If there are two middle nodes, return the second middle node.
 * 
 * Example:
 * Input: head = [1,2,3,4,5,6]
 * Output: [4,5,6]
 * Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.
 * 
 * Approach:
 * Use two pointers:
 * 1. Slow pointer moves one step at a time
 * 2. Fast pointer moves two steps at a time
 * 3. When fast pointer reaches the end, slow pointer will be at the middle
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

class FindMiddleNode {
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    findMiddleNode(head) {
        // Handle edge cases
        if (!head || !head.next) return head;

        let slow = head;
        let fast = head;

        // Move fast pointer twice as fast as slow pointer
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow;
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
    const solution = new FindMiddleNode();

    // Test case 1: Even length list
    console.log("Test case 1: Even length list");
    const list1 = FindMiddleNode.createList([1, 2, 3, 4, 5, 6]);
    console.log("Original list:");
    FindMiddleNode.printList(list1);
    const middle1 = solution.findMiddleNode(list1);
    console.log("Middle node and remaining list:");
    FindMiddleNode.printList(middle1);

    // Test case 2: Odd length list
    console.log("\nTest case 2: Odd length list");
    const list2 = FindMiddleNode.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    FindMiddleNode.printList(list2);
    const middle2 = solution.findMiddleNode(list2);
    console.log("Middle node and remaining list:");
    FindMiddleNode.printList(middle2);

    // Test case 3: Two node list
    console.log("\nTest case 3: Two node list");
    const list3 = FindMiddleNode.createList([1, 2]);
    console.log("Original list:");
    FindMiddleNode.printList(list3);
    const middle3 = solution.findMiddleNode(list3);
    console.log("Middle node and remaining list:");
    FindMiddleNode.printList(middle3);

    // Test case 4: Single node list
    console.log("\nTest case 4: Single node list");
    const list4 = FindMiddleNode.createList([1]);
    console.log("Original list:");
    FindMiddleNode.printList(list4);
    const middle4 = solution.findMiddleNode(list4);
    console.log("Middle node and remaining list:");
    FindMiddleNode.printList(middle4);

    // Test case 5: Empty list
    console.log("\nTest case 5: Empty list");
    const list5 = null;
    console.log("Original list: null");
    const middle5 = solution.findMiddleNode(list5);
    console.log("Middle node and remaining list:");
    FindMiddleNode.printList(middle5);
}

// Run the tests
runTests(); 