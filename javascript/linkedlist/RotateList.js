/**
 * Q12. Rotate List
 * 
 * Problem:
 * Given the head of a linked list, rotate the list to the right by k places.
 * 
 * Example:
 * Input: head = [1,2,3,4,5], k = 2
 * Output: [4,5,1,2,3]
 * Explanation:
 * rotate 1 steps to the right: [5,1,2,3,4]
 * rotate 2 steps to the right: [4,5,1,2,3]
 * 
 * Approach:
 * 1. Find the length of the list
 * 2. Calculate effective rotation (k % length)
 * 3. If effective rotation is 0, return original list
 * 4. Find the new tail (length - k - 1 steps from head)
 * 5. Break the list at new tail and reconnect
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

class RotateList {
    /**
     * @param {ListNode} head
     * @param {number} k
     * @return {ListNode}
     */
    rotateRight(head, k) {
        if (!head || !head.next || k === 0) return head;

        // Find length and last node
        let length = 1;
        let last = head;
        while (last.next) {
            length++;
            last = last.next;
        }

        // Calculate effective rotation
        k = k % length;
        if (k === 0) return head;

        // Find new tail
        let newTail = head;
        for (let i = 0; i < length - k - 1; i++) {
            newTail = newTail.next;
        }

        // Break and reconnect
        const newHead = newTail.next;
        newTail.next = null;
        last.next = head;

        return newHead;
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
    const solution = new RotateList();

    // Test case 1: Regular rotation
    console.log("Test case 1: Regular rotation");
    const list1 = RotateList.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    RotateList.printList(list1);
    console.log("Rotated list (k=2):");
    RotateList.printList(solution.rotateRight(list1, 2));

    // Test case 2: Rotation by list length
    console.log("\nTest case 2: Rotation by list length");
    const list2 = RotateList.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    RotateList.printList(list2);
    console.log("Rotated list (k=5):");
    RotateList.printList(solution.rotateRight(list2, 5));

    // Test case 3: Rotation by more than list length
    console.log("\nTest case 3: Rotation by more than list length");
    const list3 = RotateList.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    RotateList.printList(list3);
    console.log("Rotated list (k=7):");
    RotateList.printList(solution.rotateRight(list3, 7));

    // Test case 4: Empty list
    console.log("\nTest case 4: Empty list");
    const list4 = null;
    console.log("Original list: null");
    console.log("Rotated list (k=2):");
    RotateList.printList(solution.rotateRight(list4, 2));

    // Test case 5: Single node list
    console.log("\nTest case 5: Single node list");
    const list5 = RotateList.createList([1]);
    console.log("Original list:");
    RotateList.printList(list5);
    console.log("Rotated list (k=2):");
    RotateList.printList(solution.rotateRight(list5, 2));

    // Test case 6: Two node list
    console.log("\nTest case 6: Two node list");
    const list6 = RotateList.createList([1, 2]);
    console.log("Original list:");
    RotateList.printList(list6);
    console.log("Rotated list (k=1):");
    RotateList.printList(solution.rotateRight(list6, 1));

    // Test case 7: Rotation by 0
    console.log("\nTest case 7: Rotation by 0");
    const list7 = RotateList.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    RotateList.printList(list7);
    console.log("Rotated list (k=0):");
    RotateList.printList(solution.rotateRight(list7, 0));
}

// Run the tests
runTests(); 