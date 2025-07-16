/**
 * Find Loop Length
 * 
 * Problem:
 * Given a linked list that may contain a cycle, find the length of the loop if it exists.
 * If there is no cycle, return 0.
 * 
 * Example:
 * Input: head = [1,2,3,4,5] (where 5 points back to 3)
 * Output: 3
 * Explanation:
 * - The loop starts at node 3
 * - The loop contains nodes 3->4->5->3
 * - Therefore, the length of the loop is 3
 * 
 * Approach:
 * 1. Use Floyd's Cycle Detection Algorithm to find if there's a cycle
 * 2. If a cycle is found, keep one pointer at the meeting point
 * 3. Move another pointer one step at a time until it meets the first pointer
 * 4. Count the number of steps to get the length
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

class FindLoopLength {
    /**
     * @param {ListNode} head
     * @return {number}
     */
    findLoopLength(head) {
        if (!head || !head.next) return 0;

        // Find meeting point using Floyd's Cycle Detection
        let slow = head;
        let fast = head;
        let hasCycle = false;

        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow === fast) {
                hasCycle = true;
                break;
            }
        }

        if (!hasCycle) return 0;

        // Count the length of the loop
        let length = 1;
        let current = slow.next;
        while (current !== slow) {
            length++;
            current = current.next;
        }

        return length;
    }

    // Helper method to create a linked list with a cycle
    static createListWithCycle(values, cycleStartIndex) {
        if (!values || values.length === 0) return null;
        
        const head = new ListNode(values[0]);
        let current = head;
        let cycleStart = null;
        
        for (let i = 1; i < values.length; i++) {
            current.next = new ListNode(values[i]);
            if (i === cycleStartIndex) {
                cycleStart = current.next;
            }
            current = current.next;
        }
        
        // Create cycle if cycleStartIndex is valid
        if (cycleStartIndex >= 0 && cycleStartIndex < values.length) {
            current.next = cycleStart;
        }
        
        return head;
    }

    // Helper method to print the list (only works for lists without cycles)
    static printList(head) {
        let current = head;
        const values = [];
        const visited = new Set();
        
        while (current && !visited.has(current)) {
            values.push(current.val);
            visited.add(current);
            current = current.next;
        }
        
        if (current) {
            values.push('... (cycle)');
        }
        
        console.log(values.join(' -> '));
    }
}

// Test cases
function runTests() {
    const solution = new FindLoopLength();

    // Test case 1: List with cycle
    console.log("Test case 1: List with cycle");
    const list1 = FindLoopLength.createListWithCycle([1, 2, 3, 4, 5], 2);
    console.log("List (with cycle at index 2):");
    FindLoopLength.printList(list1);
    console.log("Loop length:", solution.findLoopLength(list1));

    // Test case 2: List without cycle
    console.log("\nTest case 2: List without cycle");
    const list2 = FindLoopLength.createListWithCycle([1, 2, 3, 4, 5], -1);
    console.log("List (no cycle):");
    FindLoopLength.printList(list2);
    console.log("Loop length:", solution.findLoopLength(list2));

    // Test case 3: Single node with self-loop
    console.log("\nTest case 3: Single node with self-loop");
    const list3 = FindLoopLength.createListWithCycle([1], 0);
    console.log("List (self-loop):");
    FindLoopLength.printList(list3);
    console.log("Loop length:", solution.findLoopLength(list3));

    // Test case 4: Empty list
    console.log("\nTest case 4: Empty list");
    const list4 = null;
    console.log("List: null");
    console.log("Loop length:", solution.findLoopLength(list4));

    // Test case 5: Two node list with cycle
    console.log("\nTest case 5: Two node list with cycle");
    const list5 = FindLoopLength.createListWithCycle([1, 2], 0);
    console.log("List (cycle at start):");
    FindLoopLength.printList(list5);
    console.log("Loop length:", solution.findLoopLength(list5));

    // Test case 6: Long list with cycle
    console.log("\nTest case 6: Long list with cycle");
    const list6 = FindLoopLength.createListWithCycle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5);
    console.log("List (with cycle at index 5):");
    FindLoopLength.printList(list6);
    console.log("Loop length:", solution.findLoopLength(list6));
}

// Run the tests
runTests(); 