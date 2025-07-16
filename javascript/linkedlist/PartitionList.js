/**
 * Partition List
 * 
 * Problem:
 * Given the head of a linked list and a value x, partition it such that all nodes
 * less than x come before nodes greater than or equal to x. You should preserve
 * the original relative order of the nodes in each of the two partitions.
 * 
 * Example:
 * Input: head = [1,4,3,2,5,2], x = 3
 * Output: [1,2,2,4,3,5]
 * Explanation:
 * - Nodes less than 3: [1,2,2]
 * - Nodes greater than or equal to 3: [4,3,5]
 * - Preserved relative order in both partitions
 * 
 * Approach:
 * 1. Create two dummy nodes for less and greater lists
 * 2. Traverse the original list:
 *    - If node value < x, add to less list
 *    - If node value >= x, add to greater list
 * 3. Connect the two lists
 * 4. Return the head of the combined list
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

class PartitionList {
    /**
     * @param {ListNode} head
     * @param {number} x
     * @return {ListNode}
     */
    partition(head, x) {
        if (!head || !head.next) return head;

        // Create dummy nodes for less and greater lists
        const lessDummy = new ListNode(0);
        const greaterDummy = new ListNode(0);
        let less = lessDummy;
        let greater = greaterDummy;
        let current = head;

        // Partition the list
        while (current) {
            if (current.val < x) {
                less.next = current;
                less = less.next;
            } else {
                greater.next = current;
                greater = greater.next;
            }
            current = current.next;
        }

        // Connect the two lists
        greater.next = null;
        less.next = greaterDummy.next;

        return lessDummy.next;
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
    const solution = new PartitionList();

    // Test case 1: Regular case
    console.log("Test case 1: Regular case");
    const list1 = PartitionList.createList([1, 4, 3, 2, 5, 2]);
    console.log("Original list:");
    PartitionList.printList(list1);
    console.log("List after partitioning (x=3):");
    PartitionList.printList(solution.partition(list1, 3));

    // Test case 2: All elements less than x
    console.log("\nTest case 2: All elements less than x");
    const list2 = PartitionList.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    PartitionList.printList(list2);
    console.log("List after partitioning (x=6):");
    PartitionList.printList(solution.partition(list2, 6));

    // Test case 3: All elements greater than x
    console.log("\nTest case 3: All elements greater than x");
    const list3 = PartitionList.createList([1, 2, 3, 4, 5]);
    console.log("Original list:");
    PartitionList.printList(list3);
    console.log("List after partitioning (x=0):");
    PartitionList.printList(solution.partition(list3, 0));

    // Test case 4: Empty list
    console.log("\nTest case 4: Empty list");
    const list4 = null;
    console.log("Original list: null");
    console.log("List after partitioning (x=3):");
    PartitionList.printList(solution.partition(list4, 3));

    // Test case 5: Single node list
    console.log("\nTest case 5: Single node list");
    const list5 = PartitionList.createList([1]);
    console.log("Original list:");
    PartitionList.printList(list5);
    console.log("List after partitioning (x=2):");
    PartitionList.printList(solution.partition(list5, 2));

    // Test case 6: List with duplicate values
    console.log("\nTest case 6: List with duplicate values");
    const list6 = PartitionList.createList([3, 1, 3, 2, 3, 4, 3]);
    console.log("Original list:");
    PartitionList.printList(list6);
    console.log("List after partitioning (x=3):");
    PartitionList.printList(solution.partition(list6, 3));

    // Test case 7: List with negative numbers
    console.log("\nTest case 7: List with negative numbers");
    const list7 = PartitionList.createList([-1, -4, -3, -2, -5, -2]);
    console.log("Original list:");
    PartitionList.printList(list7);
    console.log("List after partitioning (x=-3):");
    PartitionList.printList(solution.partition(list7, -3));
}

// Run the tests
runTests(); 