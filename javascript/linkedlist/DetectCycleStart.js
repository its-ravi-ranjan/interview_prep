/**
 * Detect Cycle Start
 * 
 * Problem:
 * Given the head of a linked list, return the node where the cycle begins.
 * If there is no cycle, return null.
 * 
 * Example:
 * Input: head = [3,2,0,-4] (where -4 points back to 2)
 * Output: Node with value 2
 * Explanation:
 * - There is a cycle in the linked list
 * - The cycle starts at node with value 2
 * - The tail connects to the second node
 * 
 * Approach:
 * 1. Use Floyd's Cycle Detection Algorithm to find if there's a cycle
 * 2. If a cycle is found, use two pointers:
 *    - One at the meeting point
 *    - One at the head
 * 3. Move both pointers one step at a time until they meet
 * 4. The meeting point is the start of the cycle
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

class DetectCycleStart {
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    detectCycleStart(head) {
        if (!head || !head.next) return null;

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

        if (!hasCycle) return null;

        // Find the start of the cycle
        slow = head;
        while (slow !== fast) {
            slow = slow.next;
            fast = fast.next;
        }

        return slow;
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
    const solution = new DetectCycleStart();

    // Test case 1: Regular case with cycle
    console.log("Test case 1: Regular case with cycle");
    const list1 = DetectCycleStart.createListWithCycle([3, 2, 0, -4], 1);
    console.log("List (with cycle at index 1):");
    DetectCycleStart.printList(list1);
    const cycleStart1 = solution.detectCycleStart(list1);
    console.log("Cycle starts at node with value:", cycleStart1 ? cycleStart1.val : null);

    // Test case 2: List without cycle
    console.log("\nTest case 2: List without cycle");
    const list2 = DetectCycleStart.createListWithCycle([1, 2, 3, 4], -1);
    console.log("List (no cycle):");
    DetectCycleStart.printList(list2);
    const cycleStart2 = solution.detectCycleStart(list2);
    console.log("Cycle starts at node with value:", cycleStart2 ? cycleStart2.val : null);

    // Test case 3: Single node with self-loop
    console.log("\nTest case 3: Single node with self-loop");
    const list3 = DetectCycleStart.createListWithCycle([1], 0);
    console.log("List (self-loop):");
    DetectCycleStart.printList(list3);
    const cycleStart3 = solution.detectCycleStart(list3);
    console.log("Cycle starts at node with value:", cycleStart3 ? cycleStart3.val : null);

    // Test case 4: Empty list
    console.log("\nTest case 4: Empty list");
    const list4 = null;
    console.log("List: null");
    const cycleStart4 = solution.detectCycleStart(list4);
    console.log("Cycle starts at node with value:", cycleStart4 ? cycleStart4.val : null);

    // Test case 5: Two node list with cycle
    console.log("\nTest case 5: Two node list with cycle");
    const list5 = DetectCycleStart.createListWithCycle([1, 2], 0);
    console.log("List (cycle at start):");
    DetectCycleStart.printList(list5);
    const cycleStart5 = solution.detectCycleStart(list5);
    console.log("Cycle starts at node with value:", cycleStart5 ? cycleStart5.val : null);

    // Test case 6: Long list with cycle
    console.log("\nTest case 6: Long list with cycle");
    const list6 = DetectCycleStart.createListWithCycle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5);
    console.log("List (with cycle at index 5):");
    DetectCycleStart.printList(list6);
    const cycleStart6 = solution.detectCycleStart(list6);
    console.log("Cycle starts at node with value:", cycleStart6 ? cycleStart6.val : null);
}

// Run the tests
runTests(); 