/**
 * Remove Linked List Elements
 * 
 * Problem Statement:
 * Given the head of a linked list and an integer val, remove all the nodes of the linked list 
 * that have Node.val == val, and return the new head.
 * 
 * Examples:
 * Input: head = [1,2,6,3,4,5,6], val = 6
 * Output: [1,2,3,4,5]
 * 
 * Input: head = [], val = 1
 * Output: []
 * 
 * Input: head = [7,7,7,7], val = 7
 * Output: []
 * 
 * Approach:
 * Use a dummy (sentinel) node before the head to simplify edge cases.
 * Iterate through the list using a pointer.
 * Skip any node whose value matches val.
 * Return the next of sentinel as the new head.
 * 
 * Time and Space Complexity:
 * Time Complexity: O(n) - We traverse the list once
 * Space Complexity: O(1) - We only use a few pointers regardless of list size
 * 
 * Explanation:
 * - The sentinel node helps handle edge cases like removing the head node
 * - We use current.next to check the next node's value
 * - If the next node's value matches val, we skip it by updating current.next
 * - If it doesn't match, we move current forward
 * - This approach ensures we don't lose track of the list structure
 */

// Node class definition
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * Remove all nodes with the given value from the linked list
 * @param {ListNode} head - Head of the linked list
 * @param {number} val - Value to remove
 * @returns {ListNode} New head of the linked list
 */
function removeElements(head, val) {
    let sentinel = new ListNode(0, head);
    let current = sentinel;
    
    while (current && current.next) {
        if (current.next.val === val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    
    return sentinel.next;
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
function testRemoveElements() {
    console.log("=== Remove Linked List Elements ===\n");
    
    // Test case 1: Remove value from middle and end
    console.log("Test Case 1: Remove 6 from [1,2,6,3,4,5,6]");
    const list1 = createLinkedList([1, 2, 6, 3, 4, 5, 6]);
    console.log("Original list:", printLinkedList(list1));
    
    const result1 = removeElements(list1, 6);
    console.log("After removing 6:", printLinkedList(result1));
    console.log("Expected: [1, 2, 3, 4, 5]");
    console.log("Correct:", JSON.stringify(getValuesFromList(result1)) === JSON.stringify([1, 2, 3, 4, 5]));
    console.log();
    
    // Test case 2: Empty list
    console.log("Test Case 2: Remove from empty list []");
    const list2 = createLinkedList([]);
    console.log("Original list:", printLinkedList(list2));
    
    const result2 = removeElements(list2, 1);
    console.log("After removing 1:", printLinkedList(result2));
    console.log("Expected: []");
    console.log("Correct:", result2 === null);
    console.log();
    
    // Test case 3: Remove all elements
    console.log("Test Case 3: Remove all 7s from [7,7,7,7]");
    const list3 = createLinkedList([7, 7, 7, 7]);
    console.log("Original list:", printLinkedList(list3));
    
    const result3 = removeElements(list3, 7);
    console.log("After removing 7:", printLinkedList(result3));
    console.log("Expected: []");
    console.log("Correct:", result3 === null);
    console.log();
    
    // Test case 4: Remove from beginning
    console.log("Test Case 4: Remove 1 from beginning [1,2,3,4]");
    const list4 = createLinkedList([1, 2, 3, 4]);
    console.log("Original list:", printLinkedList(list4));
    
    const result4 = removeElements(list4, 1);
    console.log("After removing 1:", printLinkedList(result4));
    console.log("Expected: [2, 3, 4]");
    console.log("Correct:", JSON.stringify(getValuesFromList(result4)) === JSON.stringify([2, 3, 4]));
    console.log();
    
    // Test case 5: Remove from end
    console.log("Test Case 5: Remove 5 from end [1,2,3,4,5]");
    const list5 = createLinkedList([1, 2, 3, 4, 5]);
    console.log("Original list:", printLinkedList(list5));
    
    const result5 = removeElements(list5, 5);
    console.log("After removing 5:", printLinkedList(result5));
    console.log("Expected: [1, 2, 3, 4]");
    console.log("Correct:", JSON.stringify(getValuesFromList(result5)) === JSON.stringify([1, 2, 3, 4]));
    console.log();
    
    // Test case 6: Remove multiple occurrences
    console.log("Test Case 6: Remove multiple 2s from [1,2,2,3,2,4]");
    const list6 = createLinkedList([1, 2, 2, 3, 2, 4]);
    console.log("Original list:", printLinkedList(list6));
    
    const result6 = removeElements(list6, 2);
    console.log("After removing 2:", printLinkedList(result6));
    console.log("Expected: [1, 3, 4]");
    console.log("Correct:", JSON.stringify(getValuesFromList(result6)) === JSON.stringify([1, 3, 4]));
    console.log();
    
    // Test case 7: Remove value that doesn't exist
    console.log("Test Case 7: Remove 10 from [1,2,3,4,5]");
    const list7 = createLinkedList([1, 2, 3, 4, 5]);
    console.log("Original list:", printLinkedList(list7));
    
    const result7 = removeElements(list7, 10);
    console.log("After removing 10:", printLinkedList(result7));
    console.log("Expected: [1, 2, 3, 4, 5]");
    console.log("Correct:", JSON.stringify(getValuesFromList(result7)) === JSON.stringify([1, 2, 3, 4, 5]));
    console.log();
    
    // Test case 8: Single node list
    console.log("Test Case 8: Remove from single node [5]");
    const list8 = createLinkedList([5]);
    console.log("Original list:", printLinkedList(list8));
    
    const result8 = removeElements(list8, 5);
    console.log("After removing 5:", printLinkedList(result8));
    console.log("Expected: []");
    console.log("Correct:", result8 === null);
    console.log();
    
    // Test case 9: Remove from two node list
    console.log("Test Case 9: Remove from [1,2]");
    const list9 = createLinkedList([1, 2]);
    console.log("Original list:", printLinkedList(list9));
    
    const result9 = removeElements(list9, 1);
    console.log("After removing 1:", printLinkedList(result9));
    console.log("Expected: [2]");
    console.log("Correct:", JSON.stringify(getValuesFromList(result9)) === JSON.stringify([2]));
    console.log();
    
    // Test case 10: Step-by-step demonstration
    console.log("Test Case 10: Step-by-Step Demonstration");
    const demoList = createLinkedList([1, 2, 6, 3, 4, 5, 6]);
    console.log("Original list: [1, 2, 6, 3, 4, 5, 6]");
    console.log("Removing value: 6");
    console.log();
    
    console.log("Step-by-step process:");
    console.log("1. Create sentinel node: [0] -> [1, 2, 6, 3, 4, 5, 6]");
    console.log("2. Check current.next.val (1) != 6, move current forward");
    console.log("3. Check current.next.val (2) != 6, move current forward");
    console.log("4. Check current.next.val (6) == 6, skip this node");
    console.log("5. Check current.next.val (3) != 6, move current forward");
    console.log("6. Check current.next.val (4) != 6, move current forward");
    console.log("7. Check current.next.val (5) != 6, move current forward");
    console.log("8. Check current.next.val (6) == 6, skip this node");
    console.log("9. Return sentinel.next");
    console.log();
    
    const demoResult = removeElements(demoList, 6);
    console.log("Final result:", printLinkedList(demoResult));
    console.log();
    
    // Test case 11: Performance demonstration
    console.log("Test Case 11: Performance Demonstration");
    const largeArray = Array.from({length: 10000}, (_, i) => i % 10); // 0-9 repeating
    const largeList = createLinkedList(largeArray);
    
    const startTime = performance.now();
    const largeResult = removeElements(largeList, 5);
    const endTime = performance.now();
    
    console.log(`Large list with 10,000 nodes:`);
    console.log(`Original size: 10,000`);
    console.log(`After removing 5: ${getValuesFromList(largeResult).length}`);
    console.log(`Time taken: ${(endTime - startTime).toFixed(4)} ms`);
    console.log();
    
    // Test case 12: Edge cases
    console.log("Test Case 12: Edge Cases");
    
    // Null head
    console.log("Null head:");
    const nullResult = removeElements(null, 5);
    console.log("Result:", printLinkedList(nullResult));
    console.log("Correct:", nullResult === null);
    console.log();
    
    // Remove from list with only target values
    console.log("List with only target values [3,3,3]:");
    const onlyTargetList = createLinkedList([3, 3, 3]);
    const onlyTargetResult = removeElements(onlyTargetList, 3);
    console.log("Result:", printLinkedList(onlyTargetResult));
    console.log("Correct:", onlyTargetResult === null);
    console.log();
    
    // Remove from list with no target values
    console.log("List with no target values [1,2,3,4,5]:");
    const noTargetList = createLinkedList([1, 2, 3, 4, 5]);
    const noTargetResult = removeElements(noTargetList, 10);
    console.log("Result:", printLinkedList(noTargetResult));
    console.log("Correct:", JSON.stringify(getValuesFromList(noTargetResult)) === JSON.stringify([1, 2, 3, 4, 5]));
    console.log();
}

// Run the tests
testRemoveElements(); 