/**
 * Q2. Add Two Numbers
 * 
 * Problem:
 * You are given two non-empty linked lists representing two non-negative integers.
 * The digits are stored in reverse order, and each of their nodes contains a single digit.
 * Add the two numbers and return the sum as a linked list.
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
 * 
 * Example:
 * Input: l1 = [2,4,3], l2 = [5,6,4]
 * Output: [7,0,8]
 * Explanation: 342 + 465 = 807.
 * 
 * Approach:
 * 1. Initialize a dummy node and a carry variable
 * 2. Traverse both lists simultaneously
 * 3. For each position:
 *    - Add the values of both nodes (if they exist) and carry
 *    - Create a new node with the sum % 10
 *    - Update carry to sum / 10
 * 4. If there's a remaining carry, add it as a new node
 * 
 * Time Complexity: O(max(N,M)) where N and M are the lengths of the input lists
 * Space Complexity: O(max(N,M)) for the result list
 */

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class AddTwoNumbers {
    /**
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode}
     */
    addTwoNumbers(l1, l2) {
        const dummy = new ListNode(0);
        let current = dummy;
        let carry = 0;

        while (l1 || l2) {
            // Get values from both lists, default to 0 if node doesn't exist
            const val1 = l1 ? l1.val : 0;
            const val2 = l2 ? l2.val : 0;

            // Calculate sum and carry
            const sum = val1 + val2 + carry;
            carry = Math.floor(sum / 10);

            // Create new node with the digit
            current.next = new ListNode(sum % 10);
            current = current.next;

            // Move to next nodes if they exist
            if (l1) l1 = l1.next;
            if (l2) l2 = l2.next;
        }

        // Add remaining carry if any
        if (carry > 0) {
            current.next = new ListNode(carry);
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
    const solution = new AddTwoNumbers();

    // Test case 1: Regular addition
    console.log("Test case 1: Regular addition");
    const l1_1 = AddTwoNumbers.createList([2, 4, 3]);
    const l2_1 = AddTwoNumbers.createList([5, 6, 4]);
    console.log("List 1:");
    AddTwoNumbers.printList(l1_1);
    console.log("List 2:");
    AddTwoNumbers.printList(l2_1);
    const result1 = solution.addTwoNumbers(l1_1, l2_1);
    console.log("Result:");
    AddTwoNumbers.printList(result1);

    // Test case 2: Different length lists
    console.log("\nTest case 2: Different length lists");
    const l1_2 = AddTwoNumbers.createList([9, 9, 9, 9]);
    const l2_2 = AddTwoNumbers.createList([9, 9]);
    console.log("List 1:");
    AddTwoNumbers.printList(l1_2);
    console.log("List 2:");
    AddTwoNumbers.printList(l2_2);
    const result2 = solution.addTwoNumbers(l1_2, l2_2);
    console.log("Result:");
    AddTwoNumbers.printList(result2);

    // Test case 3: Lists with zeros
    console.log("\nTest case 3: Lists with zeros");
    const l1_3 = AddTwoNumbers.createList([0]);
    const l2_3 = AddTwoNumbers.createList([0]);
    console.log("List 1:");
    AddTwoNumbers.printList(l1_3);
    console.log("List 2:");
    AddTwoNumbers.printList(l2_3);
    const result3 = solution.addTwoNumbers(l1_3, l2_3);
    console.log("Result:");
    AddTwoNumbers.printList(result3);

    // Test case 4: One empty list
    console.log("\nTest case 4: One empty list");
    const l1_4 = AddTwoNumbers.createList([1, 2, 3]);
    const l2_4 = null;
    console.log("List 1:");
    AddTwoNumbers.printList(l1_4);
    console.log("List 2: null");
    const result4 = solution.addTwoNumbers(l1_4, l2_4);
    console.log("Result:");
    AddTwoNumbers.printList(result4);
}

// Run the tests
runTests(); 