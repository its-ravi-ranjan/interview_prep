/**
 * Q3. Remove Nth Node From End of List
 * 
 * Problem:
 * Given the head of a linked list, remove the nth node from the end of the list and return its head.
 * 
 * Example:
 * Input: head = [1,2,3,4,5], n = 2
 * Output: [1,2,3,5]
 * 
 * Approach:
 * 1. Use two pointers: fast and slow
 * 2. Move fast pointer n+1 steps ahead
 * 3. Move both pointers until fast reaches the end
 * 4. Remove the node after slow pointer
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

class RemoveNthNodeFromEnd {
    /**
     * @param {ListNode} head
     * @param {number} n
     * @return {ListNode}
     */
    removeNthFromEnd(head, n) {
        // Create a dummy node to handle edge cases
        const dummy = new ListNode(0);
        dummy.next = head;
        
        let fast = dummy;
        let slow = dummy;
        
        // Move fast pointer n+1 steps ahead
        for (let i = 0; i <= n; i++) {
            fast = fast.next;
        }
        
        // Move both pointers until fast reaches the end
        while (fast !== null) {
            fast = fast.next;
            slow = slow.next;
        }
        
        // Remove the nth node from end
        slow.next = slow.next.next;
        
        return dummy.next;
    }

    /**
     * Approach 2: Using sentinel node and length calculation
     * 
     * Approach:
     * Use a sentinel (dummy) node before the head to simplify edge cases.
     * First, calculate the total length of the list.
     * Find the previous node of the one to be deleted using the length – n formula.
     * Update the links to skip the target node.
     * 
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     * 
     * @param {ListNode} head
     * @param {number} n
     * @return {ListNode}
     */
    removeNthFromEndUsingLength(head, n) {
        let sentinel = new ListNode(0, head);
        let length = 0;
        let first = head;
        while (first) {
            length++;
            first = first.next;
        }
        let prev = sentinel;
        for (let i = 0; i < length - n; i++) {
            prev = prev.next;
        }
        prev.next = prev.next.next;
        return sentinel.next;
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
    const solution = new RemoveNthNodeFromEnd();

    // Test case 1: Remove second node from end
    console.log("Test case 1: Remove second node from end");
    const list1 = RemoveNthNodeFromEnd.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    RemoveNthNodeFromEnd.printList(list1);
    const result1 = solution.removeNthFromEnd(list1, 2);
    console.log("List after removing 2nd node from end:");
    RemoveNthNodeFromEnd.printList(result1);

    // Test case 2: Remove first node (n equals list length)
    console.log("\nTest case 2: Remove first node");
    const list2 = RemoveNthNodeFromEnd.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    RemoveNthNodeFromEnd.printList(list2);
    const result2 = solution.removeNthFromEnd(list2, 5);
    console.log("List after removing 5th node from end:");
    RemoveNthNodeFromEnd.printList(result2);

    // Test case 3: Remove last node (n = 1)
    console.log("\nTest case 3: Remove last node");
    const list3 = RemoveNthNodeFromEnd.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    RemoveNthNodeFromEnd.printList(list3);
    const result3 = solution.removeNthFromEnd(list3, 1);
    console.log("List after removing last node:");
    RemoveNthNodeFromEnd.printList(result3);

    // Test case 4: Single node list
    console.log("\nTest case 4: Single node list");
    const list4 = RemoveNthNodeFromEnd.createList([1]);
    console.log("Original list:");
    RemoveNthNodeFromEnd.printList(list4);
    const result4 = solution.removeNthFromEnd(list4, 1);
    console.log("List after removing node:");
    RemoveNthNodeFromEnd.printList(result4);

    // Test case 5: Two node list
    console.log("\nTest case 5: Two node list");
    const list5 = RemoveNthNodeFromEnd.createList([1, 2]);
    console.log("Original list:");
    RemoveNthNodeFromEnd.printList(list5);
    const result5 = solution.removeNthFromEnd(list5, 1);
    console.log("List after removing last node:");
    RemoveNthNodeFromEnd.printList(result5);
}

// Run the tests
runTests(); 