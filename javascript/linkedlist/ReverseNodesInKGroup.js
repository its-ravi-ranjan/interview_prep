/**
 * Q14. Reverse Nodes in k-Group
 * 
 * Problem:
 * Given the head of a linked list, reverse the nodes of the list k at a time,
 * and return the modified list. k is a positive integer and is less than or equal
 * to the length of the linked list. If the number of nodes is not a multiple of k,
 * then left-out nodes, in the end, should remain as it is.
 * 
 * Example:
 * Input: head = [1,2,3,4,5], k = 2
 * Output: [2,1,4,3,5]
 * Explanation:
 * - First group: [1,2] -> [2,1]
 * - Second group: [3,4] -> [4,3]
 * - Last node: [5] remains as is
 * 
 * Approach:
 * 1. Use a dummy node to handle edge cases
 * 2. For each group of k nodes:
 *    - Check if there are k nodes remaining
 *    - Reverse the group
 *    - Connect the reversed group to the rest of the list
 * 3. Return the modified list
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

class ReverseNodesInKGroup {
    /**
     * @param {ListNode} head
     * @param {number} k
     * @return {ListNode}
     */
    reverseKGroup(head, k) {
        if (!head || k === 1) return head;

        // Create a dummy node
        const dummy = new ListNode(0);
        dummy.next = head;
        
        let prev = dummy;
        let count = 0;

        // Count total nodes
        let current = head;
        while (current) {
            count++;
            current = current.next;
        }

        // Process each group
        current = head;
        while (count >= k) {
            // Reverse k nodes
            let first = current;
            let second = current.next;
            
            for (let i = 1; i < k; i++) {
                first.next = second.next;
                second.next = prev.next;
                prev.next = second;
                second = first.next;
            }
            
            prev = first;
            current = first.next;
            count -= k;
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
    const solution = new ReverseNodesInKGroup();

    // Test case 1: Regular case with k=2
    console.log("Test case 1: Regular case with k=2");
    const list1 = ReverseNodesInKGroup.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    ReverseNodesInKGroup.printList(list1);
    console.log("List after reversing in groups of 2:");
    ReverseNodesInKGroup.printList(solution.reverseKGroup(list1, 2));

    // Test case 2: Regular case with k=3
    console.log("\nTest case 2: Regular case with k=3");
    const list2 = ReverseNodesInKGroup.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    ReverseNodesInKGroup.printList(list2);
    console.log("List after reversing in groups of 3:");
    ReverseNodesInKGroup.printList(solution.reverseKGroup(list2, 3));

    // Test case 3: k equals list length
    console.log("\nTest case 3: k equals list length");
    const list3 = ReverseNodesInKGroup.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    ReverseNodesInKGroup.printList(list3);
    console.log("List after reversing in groups of 5:");
    ReverseNodesInKGroup.printList(solution.reverseKGroup(list3, 5));

    // Test case 4: k=1 (no reversal)
    console.log("\nTest case 4: k=1 (no reversal)");
    const list4 = ReverseNodesInKGroup.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    ReverseNodesInKGroup.printList(list4);
    console.log("List after reversing in groups of 1:");
    ReverseNodesInKGroup.printList(solution.reverseKGroup(list4, 1));

    // Test case 5: Empty list
    console.log("\nTest case 5: Empty list");
    const list5 = null;
    console.log("Original list: null");
    console.log("List after reversing in groups of 2:");
    ReverseNodesInKGroup.printList(solution.reverseKGroup(list5, 2));

    // Test case 6: Single node list
    console.log("\nTest case 6: Single node list");
    const list6 = ReverseNodesInKGroup.createList([1]);
    console.log("Original list:");
    ReverseNodesInKGroup.printList(list6);
    console.log("List after reversing in groups of 2:");
    ReverseNodesInKGroup.printList(solution.reverseKGroup(list6, 2));

    // Test case 7: List with negative numbers
    console.log("\nTest case 7: List with negative numbers");
    const list7 = ReverseNodesInKGroup.createList([-5, -4, -3, -2, -1]);
    console.log("Original list:");
    ReverseNodesInKGroup.printList(list7);
    console.log("List after reversing in groups of 2:");
    ReverseNodesInKGroup.printList(solution.reverseKGroup(list7, 2));
}

// Run the tests
runTests(); 