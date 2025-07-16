/**
 * Q8. Detect Cycle in Linked List
 * 
 * Problem:
 * Given head, the head of a linked list, determine if the linked list has a cycle in it.
 * There is a cycle in a linked list if there is some node in the list that can be reached again
 * by continuously following the next pointer.
 * 
 * Example:
 * Input: head = [3,2,0,-4], pos = 1
 * Output: true
 * Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
 * 
 * Approach:
 * Use Floyd's Cycle Detection Algorithm (Tortoise and Hare):
 * 1. Use two pointers: slow and fast
 * 2. Slow pointer moves one step at a time
 * 3. Fast pointer moves two steps at a time
 * 4. If there's a cycle, they will eventually meet
 * 5. If fast reaches the end (null), no cycle exists
 * 
 * Time Complexity: O(N) where N is the number of nodes
 * Space Complexity: O(1) as we only use pointers
 
 * Approach 2: Using Set to track visited nodes
 * 
 * Approach:
 * Use a Set to track visited nodes.
 * While traversing, if we encounter a node already in the set, we've found a cycle.
 * If we reach null, there's no cycle.
 * 
 * Time Complexity: O(n), where n is the number of nodes in the list.
 * Space Complexity: O(n), in the worst case we store all nodes in a set.
 * 
 * @param {ListNode} head
 * @return {boolean}
 */
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class DetectCycle {
    /**
     * @param {ListNode} head
     * @return {boolean}
     */
    hasCycle(head) {
        if (!head || !head.next) return false;

        let slow = head;
        let fast = head.next;

        while (fast !== slow) {
            if (!fast || !fast.next) return false;
            fast = fast.next.next;
            slow = slow.next;
        }

        return true;
    }

  
    hasCycleUsingSet(head) {
        let seenNodes = new Set();
        let curr = head;
        
        while (curr !== null) {
            if (seenNodes.has(curr)) {
                return true;
            }
            seenNodes.add(curr);
            curr = curr.next;
        }
        
        return false;
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

    // Helper method to create a list with cycle
    static createListWithCycle(values, pos) {
        if (!values || values.length === 0) return null;
        
        const head = this.createList(values);
        
        if (pos === -1) return head;
        
        // Find the node at position pos
        let cycleNode = head;
        for (let i = 0; i < pos; i++) {
            cycleNode = cycleNode.next;
        }
        
        // Find the last node
        let current = head;
        while (current.next) {
            current = current.next;
        }
        
        // Create cycle
        current.next = cycleNode;
        
        return head;
    }

    // Helper method to print the list (without cycle)
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
            values.push('...cycle...');
        }
        
        console.log(values.join(' -> '));
    }
}

// Test cases
function runTests() {
    const solution = new DetectCycle();

    // Test case 1: List with cycle
    console.log("Test case 1: List with cycle");
    const list1 = DetectCycle.createListWithCycle([3, 2, 0, -4], 1);
    console.log("List (cycle at node 1):");
    DetectCycle.printList(list1);
    console.log("Has cycle:", solution.hasCycle(list1));

    // Test case 2: List with cycle at head
    console.log("\nTest case 2: List with cycle at head");
    const list2 = DetectCycle.createListWithCycle([1, 2], 0);
    console.log("List (cycle at head):");
    DetectCycle.printList(list2);
    console.log("Has cycle:", solution.hasCycle(list2));

    // Test case 3: List with no cycle
    console.log("\nTest case 3: List with no cycle");
    const list3 = DetectCycle.createListWithCycle([1, 2, 3, 4], -1);
    console.log("List (no cycle):");
    DetectCycle.printList(list3);
    console.log("Has cycle:", solution.hasCycle(list3));

    // Test case 4: Empty list
    console.log("\nTest case 4: Empty list");
    const list4 = null;
    console.log("List: null");
    console.log("Has cycle:", solution.hasCycle(list4));

    // Test case 5: Single node list
    console.log("\nTest case 5: Single node list");
    const list5 = DetectCycle.createListWithCycle([1], -1);
    console.log("List (single node):");
    DetectCycle.printList(list5);
    console.log("Has cycle:", solution.hasCycle(list5));

    // Test case 6: Single node with self-cycle
    console.log("\nTest case 6: Single node with self-cycle");
    const list6 = DetectCycle.createListWithCycle([1], 0);
    console.log("List (single node with self-cycle):");
    DetectCycle.printList(list6);
    console.log("Has cycle:", solution.hasCycle(list6));
}

// Run the tests
runTests(); 