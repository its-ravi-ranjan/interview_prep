/**
 * Flatten Linked List
 * 
 * Problem:
 * Given a linked list where every node represents a linked list and contains two pointers:
 * 1. 'next' points to the next node in the list
 * 2. 'child' points to a linked list where the current node is the head
 * Each of these child linked lists is in sorted order.
 * Flatten the linked list such that all nodes appear in a single layer in sorted order.
 * 
 * Example:
 * Input:
 * 5 -> 10 -> 19 -> 28
 * |    |     |     |
 * 7    20    22    35
 * |          |     |
 * 8          50    40
 * |                |
 * 30               45
 * 
 * Output: 5->7->8->10->19->20->22->28->30->35->40->45->50
 * 
 * Approach:
 * 1. Use merge sort technique to merge child lists
 * 2. Recursively flatten the list
 * 3. Merge the flattened list with the next list
 * 
 * Time Complexity: O(N) where N is the total number of nodes
 * Space Complexity: O(1) as we only use pointers
 */

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.child = null;
    }
}

class FlattenLinkedList {
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    flatten(head) {
        if (!head || !head.next) return head;

        // Recursively flatten the rest of the list
        head.next = this.flatten(head.next);

        // Merge the current list with the flattened list
        head = this.merge(head, head.next);

        return head;
    }

    /**
     * Merge two sorted linked lists
     * @param {ListNode} a
     * @param {ListNode} b
     * @return {ListNode}
     */
    merge(a, b) {
        if (!a) return b;
        if (!b) return a;

        let result;

        if (a.val < b.val) {
            result = a;
            result.child = this.merge(a.child, b);
        } else {
            result = b;
            result.child = this.merge(a, b.child);
        }

        result.next = null;
        return result;
    }

    // Helper method to create a multi-level linked list
    static createMultiLevelList(structure) {
        if (!structure || structure.length === 0) return null;

        const nodes = new Map();
        let head = null;

        // Create all nodes first
        for (const level of structure) {
            for (const node of level) {
                nodes.set(node.val, new ListNode(node.val));
            }
        }

        // Connect nodes
        for (let i = 0; i < structure.length; i++) {
            const level = structure[i];
            for (let j = 0; j < level.length; j++) {
                const node = nodes.get(level[j].val);
                
                // Connect next pointer
                if (j < level.length - 1) {
                    node.next = nodes.get(level[j + 1].val);
                }

                // Connect child pointer
                if (level[j].child && i < structure.length - 1) {
                    node.child = nodes.get(structure[i + 1][0].val);
                }

                // Set head if it's the first node
                if (i === 0 && j === 0) {
                    head = node;
                }
            }
        }

        return head;
    }

    // Helper method to print the flattened list
    static printList(head) {
        let current = head;
        const values = [];
        while (current) {
            values.push(current.val);
            current = current.child;
        }
        console.log(values.join(' -> '));
    }

    // Helper method to print the multi-level list (for debugging)
    static printMultiLevelList(head) {
        let current = head;
        const levels = [];
        
        while (current) {
            const level = [];
            let node = current;
            while (node) {
                level.push(node.val);
                node = node.next;
            }
            levels.push(level.join(' -> '));
            current = current.child;
        }
        
        console.log(levels.join('\n'));
    }
}

// Test cases
function runTests() {
    const solution = new FlattenLinkedList();

    // Test case 1: Regular case
    console.log("Test case 1: Regular case");
    const list1 = FlattenLinkedList.createMultiLevelList([
        [{ val: 5, child: true }, { val: 10, child: true }, { val: 19, child: true }, { val: 28 }],
        [{ val: 7, child: true }, { val: 20 }, { val: 22, child: true }, { val: 35, child: true }],
        [{ val: 8, child: true }, { val: 50 }, { val: 40, child: true }],
        [{ val: 30 }, { val: 45 }]
    ]);
    console.log("Original multi-level list:");
    FlattenLinkedList.printMultiLevelList(list1);
    console.log("Flattened list:");
    FlattenLinkedList.printList(solution.flatten(list1));

    // Test case 2: Single level list
    console.log("\nTest case 2: Single level list");
    const list2 = FlattenLinkedList.createMultiLevelList([
        [{ val: 1 }, { val: 2 }, { val: 3 }]
    ]);
    console.log("Original list:");
    FlattenLinkedList.printMultiLevelList(list2);
    console.log("Flattened list:");
    FlattenLinkedList.printList(solution.flatten(list2));

    // Test case 3: Empty list
    console.log("\nTest case 3: Empty list");
    const list3 = null;
    console.log("Original list: null");
    console.log("Flattened list:");
    FlattenLinkedList.printList(solution.flatten(list3));

    // Test case 4: Single node
    console.log("\nTest case 4: Single node");
    const list4 = FlattenLinkedList.createMultiLevelList([
        [{ val: 1 }]
    ]);
    console.log("Original list:");
    FlattenLinkedList.printMultiLevelList(list4);
    console.log("Flattened list:");
    FlattenLinkedList.printList(solution.flatten(list4));

    // Test case 5: List with negative numbers
    console.log("\nTest case 5: List with negative numbers");
    const list5 = FlattenLinkedList.createMultiLevelList([
        [{ val: -5, child: true }, { val: 10 }],
        [{ val: -3, child: true }, { val: 8 }],
        [{ val: -1 }]
    ]);
    console.log("Original multi-level list:");
    FlattenLinkedList.printMultiLevelList(list5);
    console.log("Flattened list:");
    FlattenLinkedList.printList(solution.flatten(list5));
}

// Run the tests
runTests(); 