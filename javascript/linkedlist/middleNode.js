/**
 * Find the Middle Node of a Singly Linked List
 * 
 * Problem:
 * Given the head of a singly linked list, return the middle node of the linked list.
 * If there are two middle nodes, return the second middle node.
 * 
 * Example:
 * Input: head = [1,2,3,4,5]
 * Output: [3,4,5] (node with value 3)
 * 
 * Input: head = [1,2,3,4,5,6]
 * Output: [4,5,6] (node with value 4 - second middle node)
 * 
 * Approach:
 * Use two pointers: slow and fast.
 * Initialize both at the head of the list.
 * Move slow one step and fast two steps at a time.
 * When fast reaches the end, slow will be at the middle.
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n) - We traverse the list once
 * Space Complexity: O(1) - We use only two pointers regardless of list size
 * 
 * Explanation:
 * - The slow pointer moves at half the speed of the fast pointer
 * - When fast reaches the end (null), slow will be exactly at the middle
 * - For even-length lists, this gives us the second middle node
 * - For odd-length lists, this gives us the single middle node
 */

// Node class definition
class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

/**
 * Find the middle node of a singly linked list using slow and fast pointer approach
 * @param {Node} head - Head of the linked list
 * @returns {Node} Middle node of the linked list
 */
function middleNode(head) {
    if (!head || !head.next) {
        return head;
    }
    
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}

/**
 * Helper function to create a linked list from an array
 * @param {number[]} arr - Array of values
 * @returns {Node} Head of the created linked list
 */
function createLinkedList(arr) {
    if (!arr || arr.length === 0) {
        return null;
    }
    
    const head = new Node(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        current.next = new Node(arr[i]);
        current = current.next;
    }
    
    return head;
}

/**
 * Helper function to print a linked list
 * @param {Node} head - Head of the linked list
 * @returns {string} String representation of the linked list
 */
function printLinkedList(head) {
    if (!head) {
        return "null";
    }
    
    let result = [];
    let current = head;
    
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    
    return result.join(" -> ");
}

/**
 * Helper function to get values from a linked list starting from a given node
 * @param {Node} node - Starting node
 * @returns {number[]} Array of values from the node onwards
 */
function getValuesFromNode(node) {
    const values = [];
    let current = node;
    
    while (current) {
        values.push(current.val);
        current = current.next;
    }
    
    return values;
}

// Test cases and examples
function testMiddleNode() {
    console.log("=== Find Middle Node of Singly Linked List ===\n");
    
    // Test case 1: Odd length list
    console.log("Test Case 1: Odd Length List [1,2,3,4,5]");
    const list1 = createLinkedList([1, 2, 3, 4, 5]);
    console.log("Original list:", printLinkedList(list1));
    
    const middle1 = middleNode(list1);
    console.log("Middle node value:", middle1.val);
    console.log("Middle node onwards:", printLinkedList(middle1));
    console.log("Values from middle:", getValuesFromNode(middle1));
    console.log();
    
    // Test case 2: Even length list
    console.log("Test Case 2: Even Length List [1,2,3,4,5,6]");
    const list2 = createLinkedList([1, 2, 3, 4, 5, 6]);
    console.log("Original list:", printLinkedList(list2));
    
    const middle2 = middleNode(list2);
    console.log("Middle node value:", middle2.val);
    console.log("Middle node onwards:", printLinkedList(middle2));
    console.log("Values from middle:", getValuesFromNode(middle2));
    console.log();
    
    // Test case 3: Single node
    console.log("Test Case 3: Single Node [42]");
    const list3 = createLinkedList([42]);
    console.log("Original list:", printLinkedList(list3));
    
    const middle3 = middleNode(list3);
    console.log("Middle node value:", middle3.val);
    console.log("Middle node onwards:", printLinkedList(middle3));
    console.log();
    
    // Test case 4: Two nodes
    console.log("Test Case 4: Two Nodes [10, 20]");
    const list4 = createLinkedList([10, 20]);
    console.log("Original list:", printLinkedList(list4));
    
    const middle4 = middleNode(list4);
    console.log("Middle node value:", middle4.val);
    console.log("Middle node onwards:", printLinkedList(middle4));
    console.log();
    
    // Test case 5: Three nodes
    console.log("Test Case 5: Three Nodes [100, 200, 300]");
    const list5 = createLinkedList([100, 200, 300]);
    console.log("Original list:", printLinkedList(list5));
    
    const middle5 = middleNode(list5);
    console.log("Middle node value:", middle5.val);
    console.log("Middle node onwards:", printLinkedList(middle5));
    console.log();
    
    // Test case 6: Four nodes
    console.log("Test Case 6: Four Nodes [1, 2, 3, 4]");
    const list6 = createLinkedList([1, 2, 3, 4]);
    console.log("Original list:", printLinkedList(list6));
    
    const middle6 = middleNode(list6);
    console.log("Middle node value:", middle6.val);
    console.log("Middle node onwards:", printLinkedList(middle6));
    console.log();
    
    // Test case 7: Large odd list
    console.log("Test Case 7: Large Odd List [1,2,3,4,5,6,7,8,9]");
    const list7 = createLinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    console.log("Original list:", printLinkedList(list7));
    
    const middle7 = middleNode(list7);
    console.log("Middle node value:", middle7.val);
    console.log("Middle node onwards:", printLinkedList(middle7));
    console.log();
    
    // Test case 8: Large even list
    console.log("Test Case 8: Large Even List [1,2,3,4,5,6,7,8,9,10]");
    const list8 = createLinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    console.log("Original list:", printLinkedList(list8));
    
    const middle8 = middleNode(list8);
    console.log("Middle node value:", middle8.val);
    console.log("Middle node onwards:", printLinkedList(middle8));
    console.log();
    
    // Test case 9: Empty list
    console.log("Test Case 9: Empty List");
    const list9 = createLinkedList([]);
    console.log("Original list:", printLinkedList(list9));
    
    const middle9 = middleNode(list9);
    console.log("Middle node:", middle9 ? middle9.val : "null");
    console.log();
    
    // Test case 10: Null list
    console.log("Test Case 10: Null List");
    const list10 = null;
    console.log("Original list:", printLinkedList(list10));
    
    const middle10 = middleNode(list10);
    console.log("Middle node:", middle10 ? middle10.val : "null");
    console.log();
    
    // Test case 11: Step-by-step demonstration
    console.log("Test Case 11: Step-by-Step Demonstration");
    const demoList = createLinkedList([1, 2, 3, 4, 5, 6]);
    console.log("List: [1, 2, 3, 4, 5, 6]");
    console.log("Length: 6 (even)");
    console.log("Expected middle: 4 (second middle node)");
    console.log();
    
    console.log("Step-by-step pointer movement:");
    let slow = demoList;
    let fast = demoList;
    let step = 1;
    
    while (fast && fast.next) {
        console.log(`Step ${step}:`);
        console.log(`  Slow pointer: ${slow.val}`);
        console.log(`  Fast pointer: ${fast.val}`);
        
        slow = slow.next;
        fast = fast.next.next;
        step++;
    }
    
    console.log(`Final step:`);
    console.log(`  Slow pointer: ${slow.val} (middle node)`);
    console.log(`  Fast pointer: ${fast ? fast.val : 'null'} (reached end)`);
    console.log();
    
    // Test case 12: Performance demonstration
    console.log("Test Case 12: Performance Demonstration");
    const largeList = createLinkedList(Array.from({length: 10000}, (_, i) => i + 1));
    
    const startTime = performance.now();
    const largeMiddle = middleNode(largeList);
    const endTime = performance.now();
    
    console.log(`Large list with 10,000 nodes:`);
    console.log(`Middle node value: ${largeMiddle.val}`);
    console.log(`Time taken: ${(endTime - startTime).toFixed(4)} ms`);
    console.log();
    
    // Test case 13: Verification with different approaches
    console.log("Test Case 13: Verification with Different Approaches");
    const verifyList = createLinkedList([1, 2, 3, 4, 5, 6, 7, 8]);
    
    // Method 1: Slow and fast pointer (our implementation)
    const middleFast = middleNode(verifyList);
    console.log("Fast pointer method - Middle node:", middleFast.val);
    
    // Method 2: Count nodes and find middle
    let count = 0;
    let current = verifyList;
    while (current) {
        count++;
        current = current.next;
    }
    
    const middleIndex = Math.floor(count / 2);
    current = verifyList;
    for (let i = 0; i < middleIndex; i++) {
        current = current.next;
    }
    console.log("Count method - Middle node:", current.val);
    console.log("Both methods give same result:", middleFast.val === current.val);
    console.log();
}

// Run the tests
testMiddleNode(); 