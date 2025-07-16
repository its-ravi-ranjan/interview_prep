/**
 * Q1. Delete Node in a Linked List
 * 
 * Problem:
 * There is a singly-linked list head and we want to delete a node node in it.
 * You are given the node to be deleted node. You will not be given access to the first node of head.
 * All the values of the linked list are unique, and it is guaranteed that the given node node is not the last node in the linked list.
 * 
 * Example:
 * Input: head = [4,5,1,9], node = 5
 * Output: [4,1,9]
 * Explanation: You are given the second node with value 5, the linked list should become 4 -> 1 -> 9 after calling your function.
 * 
 * Approach:
 * Since we don't have access to the previous node, we can copy the value of the next node to the current node
 * and then delete the next node.
 * 
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class DeleteNode {
    /**
     * @param {ListNode} node
     * @return {void} Do not return anything, modify node in-place instead.
     */
    deleteNode(node) {
        // Copy the value of next node to current node
        node.val = node.next.val;
        // Delete the next node
        node.next = node.next.next;
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

    // Helper method to find a node by value
    static findNode(head, value) {
        let current = head;
        while (current) {
            if (current.val === value) return current;
            current = current.next;
        }
        return null;
    }
}

// Test cases
function runTests() {
    const solution = new DeleteNode();

    // Test case 1: Delete middle node
    console.log("Test case 1: Delete middle node");
    const list1 = DeleteNode.createList([4, 5, 1, 9]);
    console.log("Original list:");
    DeleteNode.printList(list1);
    const nodeToDelete1 = DeleteNode.findNode(list1, 5);
    solution.deleteNode(nodeToDelete1);
    console.log("List after deleting node 5:");
    DeleteNode.printList(list1);

    // Test case 2: Delete node with value 1
    console.log("\nTest case 2: Delete node with value 1");
    const list2 = DeleteNode.createList([1, 2, 3, 4]);
    console.log("Original list:");
    DeleteNode.printList(list2);
    const nodeToDelete2 = DeleteNode.findNode(list2, 1);
    solution.deleteNode(nodeToDelete2);
    console.log("List after deleting node 1:");
    DeleteNode.printList(list2);

    // Test case 3: Delete node in a two-node list
    console.log("\nTest case 3: Delete node in a two-node list");
    const list3 = DeleteNode.createList([1, 2]);
    console.log("Original list:");
    DeleteNode.printList(list3);
    const nodeToDelete3 = DeleteNode.findNode(list3, 1);
    solution.deleteNode(nodeToDelete3);
    console.log("List after deleting node 1:");
    DeleteNode.printList(list3);
}

// Run the tests
runTests(); 