/**
 * Swap Nodes in Pairs
 * 
 * Problem Statement:
 * Given a linked list, swap every two adjacent nodes and return its head. 
 * You must solve the problem without modifying the values in the list's nodes 
 * (i.e., only nodes themselves may be changed.)
 * 
 * Examples:
 * Input: head = [1,2,3,4]
 * Output: [2,1,4,3]
 * 
 * Input: head = []
 * Output: []
 * 
 * Input: head = [1]
 * Output: [1]
 * 
 * Approach 1 (Iterative):
 * Use a dummy node before the head to handle edge cases easily.
 * Use pointers to swap pairs by rewiring node connections.
 * Iterate through the list two nodes at a time and swap them.
 * 
 * Approach 2 (Recursive):
 * Base case: if the list is empty or has only one node, return the head.
 * Let l be the first node and r be the second.
 * Call swapPairs recursively for the rest of the list starting from r.next.
 * Set l.next to the result of recursive call.
 * Make r point to l and return r as the new head.
 * 
 * Time and Space Complexity:
 * Iterative: Time O(n), Space O(1)
 * Recursive: Time O(n), Space O(n) due to recursive call stack
 * 
 * Explanation:
 * - The dummy node helps handle edge cases like swapping the first two nodes
 * - We use prev.next to track the current pair
 * - For each pair, we rewire the connections: first->second->next, second->first
 * - We update prev.next to point to the new first node (second)
 * - We move prev to the new second node (first) for the next iteration
 */

// Node class definition
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * Swap every two adjacent nodes in the linked list (Iterative approach)
 * @param {ListNode} head - Head of the linked list
 * @returns {ListNode} New head of the linked list
 */
function swapPairs(head) {
    if (!head || !head.next) return head;

    let dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;

    while (prev.next && prev.next.next) {
        let first = prev.next;
        let second = first.next;

        first.next = second.next;
        second.next = first;
        prev.next = second;

        prev = first;
    }
    return dummy.next;
}

/**
 * Swap every two adjacent nodes in the linked list (Recursive approach)
 * @param {ListNode} head - Head of the linked list
 * @returns {ListNode} New head of the linked list
 */
function swapPairsRecursive(head) {
    if (!head || !head.next) return head;

    let l = head;
    let r = head.next;

    l.next = swapPairsRecursive(r.next);
    r.next = l;
    return r;
}

/**
 * Helper function to create a linked list from an array
 * @param {number[]} arr - Array of values
 * @returns {ListNode} Head of the created linked list
 */
function createLinkedList(arr) {
    if (!arr || arr.length === 0) {
        return null;
    }
    
    const head = new ListNode(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    
    return head;
}

/**
 * Helper function to print a linked list
 * @param {ListNode} head - Head of the linked list
 * @returns {string} String representation of the linked list
 */
function printLinkedList(head) {
    if (!head) {
        return "[]";
    }
    
    let result = [];
    let current = head;
    
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    
    return "[" + result.join(", ") + "]";
}

/**
 * Helper function to get values from a linked list as array
 * @param {ListNode} head - Head of the linked list
 * @returns {number[]} Array of values
 */
function getValuesFromList(head) {
    const values = [];
    let current = head;
    
    while (current) {
        values.push(current.val);
        current = current.next;
    }
    
    return values;
}

// Test cases and examples
function testSwapPairs() {
    console.log("=== Swap Nodes in Pairs ===\n");
    
    // Test case 1: Even number of nodes
    console.log("Test Case 1: Even number of nodes [1,2,3,4]");
    const list1 = createLinkedList([1, 2, 3, 4]);
    console.log("Original list:", printLinkedList(list1));
    
    const result1 = swapPairs(list1);
    console.log("After swapping pairs:", printLinkedList(result1));
    console.log("Expected: [2, 1, 4, 3]");
    console.log("Correct:", JSON.stringify(getValuesFromList(result1)) === JSON.stringify([2, 1, 4, 3]));
    console.log();
    
    // Test case 2: Odd number of nodes
    console.log("Test Case 2: Odd number of nodes [1,2,3,4,5]");
    const list2 = createLinkedList([1, 2, 3, 4, 5]);
    console.log("Original list:", printLinkedList(list2));
    
    const result2 = swapPairs(list2);
    console.log("After swapping pairs:", printLinkedList(result2));
    console.log("Expected: [2, 1, 4, 3, 5]");
    console.log("Correct:", JSON.stringify(getValuesFromList(result2)) === JSON.stringify([2, 1, 4, 3, 5]));
    console.log();
    
    // Test case 3: Empty list
    console.log("Test Case 3: Empty list []");
    const list3 = createLinkedList([]);
    console.log("Original list:", printLinkedList(list3));
    
    const result3 = swapPairs(list3);
    console.log("After swapping pairs:", printLinkedList(result3));
    console.log("Expected: []");
    console.log("Correct:", result3 === null);
    console.log();
    
    // Test case 4: Single node
    console.log("Test Case 4: Single node [1]");
    const list4 = createLinkedList([1]);
    console.log("Original list:", printLinkedList(list4));
    
    const result4 = swapPairs(list4);
    console.log("After swapping pairs:", printLinkedList(result4));
    console.log("Expected: [1]");
    console.log("Correct:", JSON.stringify(getValuesFromList(result4)) === JSON.stringify([1]));
    console.log();
    
    // Test case 5: Two nodes
    console.log("Test Case 5: Two nodes [1,2]");
    const list5 = createLinkedList([1, 2]);
    console.log("Original list:", printLinkedList(list5));
    
    const result5 = swapPairs(list5);
    console.log("After swapping pairs:", printLinkedList(result5));
    console.log("Expected: [2, 1]");
    console.log("Correct:", JSON.stringify(getValuesFromList(result5)) === JSON.stringify([2, 1]));
    console.log();
    
    // Test case 6: Step-by-step demonstration
    console.log("Test Case 6: Step-by-Step Demonstration");
    const demoList = createLinkedList([1, 2, 3, 4]);
    console.log("Original list: [1, 2, 3, 4]");
    console.log();
    
    console.log("Step-by-step process:");
    console.log("1. Create dummy node: dummy -> 1 -> 2 -> 3 -> 4");
    console.log("2. First iteration: swap 1 and 2");
    console.log("   - first = 1, second = 2");
    console.log("   - first.next = second.next (3)");
    console.log("   - second.next = first (1)");
    console.log("   - prev.next = second (2)");
    console.log("   - Result: dummy -> 2 -> 1 -> 3 -> 4");
    console.log("3. Second iteration: swap 3 and 4");
    console.log("   - first = 3, second = 4");
    console.log("   - first.next = second.next (null)");
    console.log("   - second.next = first (3)");
    console.log("   - prev.next = second (4)");
    console.log("   - Result: dummy -> 2 -> 1 -> 4 -> 3");
    console.log();
    
    const demoResult = swapPairs(demoList);
    console.log("Final result:", printLinkedList(demoResult));
    console.log();
    
    // Test case 7: Large list
    console.log("Test Case 7: Large list [1,2,3,4,5,6,7,8]");
    const largeList = createLinkedList([1, 2, 3, 4, 5, 6, 7, 8]);
    console.log("Original list:", printLinkedList(largeList));
    
    const largeResult = swapPairs(largeList);
    console.log("After swapping pairs:", printLinkedList(largeResult));
    console.log("Expected: [2, 1, 4, 3, 6, 5, 8, 7]");
    console.log("Correct:", JSON.stringify(getValuesFromList(largeResult)) === JSON.stringify([2, 1, 4, 3, 6, 5, 8, 7]));
    console.log();
    
    // Test case 8: Recursive approach
    console.log("Test Case 8: Recursive Approach [1,2,3,4]");
    const recursiveList = createLinkedList([1, 2, 3, 4]);
    console.log("Original list:", printLinkedList(recursiveList));
    
    const recursiveResult = swapPairsRecursive(recursiveList);
    console.log("After swapping pairs (recursive):", printLinkedList(recursiveResult));
    console.log("Expected: [2, 1, 4, 3]");
    console.log("Correct:", JSON.stringify(getValuesFromList(recursiveResult)) === JSON.stringify([2, 1, 4, 3]));
    console.log();
}

// Run the tests
testSwapPairs(); 