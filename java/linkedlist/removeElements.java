package linkedlist;

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
    int val;
    ListNode next;
    
    ListNode(int val) {
        this.val = val;
        this.next = null;
    }
    
    ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }
}

public class removeElements {
    
    /**
     * Remove all nodes with the given value from the linked list
     * @param head Head of the linked list
     * @param val Value to remove
     * @return New head of the linked list
     */
    public static ListNode removeElements(ListNode head, int val) {
        ListNode sentinel = new ListNode(0, head);
        ListNode current = sentinel;
        
        while (current != null && current.next != null) {
            if (current.next.val == val) {
                current.next = current.next.next;
            } else {
                current = current.next;
            }
        }
        
        return sentinel.next;
    }
    
    /**
     * Helper function to create a linked list from an array
     * @param arr Array of values
     * @return Head of the created linked list
     */
    public static ListNode createLinkedList(int[] arr) {
        if (arr == null || arr.length == 0) {
            return null;
        }
        
        ListNode head = new ListNode(arr[0]);
        ListNode current = head;
        
        for (int i = 1; i < arr.length; i++) {
            current.next = new ListNode(arr[i]);
            current = current.next;
        }
        
        return head;
    }
    
    /**
     * Helper function to print a linked list
     * @param head Head of the linked list
     * @return String representation of the linked list
     */
    public static String printLinkedList(ListNode head) {
        if (head == null) {
            return "[]";
        }
        
        StringBuilder result = new StringBuilder("[");
        ListNode current = head;
        
        while (current != null) {
            result.append(current.val);
            if (current.next != null) {
                result.append(", ");
            }
            current = current.next;
        }
        
        result.append("]");
        return result.toString();
    }
    
    /**
     * Helper function to get values from a linked list as array
     * @param head Head of the linked list
     * @return Array of values
     */
    public static int[] getValuesFromList(ListNode head) {
        if (head == null) {
            return new int[0];
        }
        
        // First, count the number of nodes
        int count = 0;
        ListNode current = head;
        while (current != null) {
            count++;
            current = current.next;
        }
        
        // Then, collect the values
        int[] values = new int[count];
        current = head;
        int index = 0;
        
        while (current != null) {
            values[index++] = current.val;
            current = current.next;
        }
        
        return values;
    }
    
    /**
     * Helper function to print an array
     * @param arr Array to print
     * @return String representation of the array
     */
    public static String printArray(int[] arr) {
        if (arr == null || arr.length == 0) {
            return "[]";
        }
        
        StringBuilder result = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            result.append(arr[i]);
            if (i < arr.length - 1) {
                result.append(", ");
            }
        }
        result.append("]");
        return result.toString();
    }
    
    public static void main(String[] args) {
        System.out.println("=== Remove Linked List Elements ===\n");
        
        // Test case 1: Remove value from middle and end
        System.out.println("Test Case 1: Remove 6 from [1,2,6,3,4,5,6]");
        ListNode list1 = createLinkedList(new int[]{1, 2, 6, 3, 4, 5, 6});
        System.out.println("Original list: " + printLinkedList(list1));
        
        ListNode result1 = removeElements(list1, 6);
        System.out.println("After removing 6: " + printLinkedList(result1));
        System.out.println("Expected: [1, 2, 3, 4, 5]");
        System.out.println("Correct: " + printArray(getValuesFromList(result1)).equals("[1, 2, 3, 4, 5]"));
        System.out.println();
        
        // Test case 2: Empty list
        System.out.println("Test Case 2: Remove from empty list []");
        ListNode list2 = createLinkedList(new int[]{});
        System.out.println("Original list: " + printLinkedList(list2));
        
        ListNode result2 = removeElements(list2, 1);
        System.out.println("After removing 1: " + printLinkedList(result2));
        System.out.println("Expected: []");
        System.out.println("Correct: " + (result2 == null));
        System.out.println();
        
        // Test case 3: Remove all elements
        System.out.println("Test Case 3: Remove all 7s from [7,7,7,7]");
        ListNode list3 = createLinkedList(new int[]{7, 7, 7, 7});
        System.out.println("Original list: " + printLinkedList(list3));
        
        ListNode result3 = removeElements(list3, 7);
        System.out.println("After removing 7: " + printLinkedList(result3));
        System.out.println("Expected: []");
        System.out.println("Correct: " + (result3 == null));
        System.out.println();
        
        // Test case 4: Remove from beginning
        System.out.println("Test Case 4: Remove 1 from beginning [1,2,3,4]");
        ListNode list4 = createLinkedList(new int[]{1, 2, 3, 4});
        System.out.println("Original list: " + printLinkedList(list4));
        
        ListNode result4 = removeElements(list4, 1);
        System.out.println("After removing 1: " + printLinkedList(result4));
        System.out.println("Expected: [2, 3, 4]");
        System.out.println("Correct: " + printArray(getValuesFromList(result4)).equals("[2, 3, 4]"));
        System.out.println();
        
        // Test case 5: Remove from end
        System.out.println("Test Case 5: Remove 5 from end [1,2,3,4,5]");
        ListNode list5 = createLinkedList(new int[]{1, 2, 3, 4, 5});
        System.out.println("Original list: " + printLinkedList(list5));
        
        ListNode result5 = removeElements(list5, 5);
        System.out.println("After removing 5: " + printLinkedList(result5));
        System.out.println("Expected: [1, 2, 3, 4]");
        System.out.println("Correct: " + printArray(getValuesFromList(result5)).equals("[1, 2, 3, 4]"));
        System.out.println();
        
        // Test case 6: Remove multiple occurrences
        System.out.println("Test Case 6: Remove multiple 2s from [1,2,2,3,2,4]");
        ListNode list6 = createLinkedList(new int[]{1, 2, 2, 3, 2, 4});
        System.out.println("Original list: " + printLinkedList(list6));
        
        ListNode result6 = removeElements(list6, 2);
        System.out.println("After removing 2: " + printLinkedList(result6));
        System.out.println("Expected: [1, 3, 4]");
        System.out.println("Correct: " + printArray(getValuesFromList(result6)).equals("[1, 3, 4]"));
        System.out.println();
        
        // Test case 7: Remove value that doesn't exist
        System.out.println("Test Case 7: Remove 10 from [1,2,3,4,5]");
        ListNode list7 = createLinkedList(new int[]{1, 2, 3, 4, 5});
        System.out.println("Original list: " + printLinkedList(list7));
        
        ListNode result7 = removeElements(list7, 10);
        System.out.println("After removing 10: " + printLinkedList(result7));
        System.out.println("Expected: [1, 2, 3, 4, 5]");
        System.out.println("Correct: " + printArray(getValuesFromList(result7)).equals("[1, 2, 3, 4, 5]"));
        System.out.println();
        
        // Test case 8: Single node list
        System.out.println("Test Case 8: Remove from single node [5]");
        ListNode list8 = createLinkedList(new int[]{5});
        System.out.println("Original list: " + printLinkedList(list8));
        
        ListNode result8 = removeElements(list8, 5);
        System.out.println("After removing 5: " + printLinkedList(result8));
        System.out.println("Expected: []");
        System.out.println("Correct: " + (result8 == null));
        System.out.println();
        
        // Test case 9: Remove from two node list
        System.out.println("Test Case 9: Remove from [1,2]");
        ListNode list9 = createLinkedList(new int[]{1, 2});
        System.out.println("Original list: " + printLinkedList(list9));
        
        ListNode result9 = removeElements(list9, 1);
        System.out.println("After removing 1: " + printLinkedList(result9));
        System.out.println("Expected: [2]");
        System.out.println("Correct: " + printArray(getValuesFromList(result9)).equals("[2]"));
        System.out.println();
        
        // Test case 10: Step-by-step demonstration
        System.out.println("Test Case 10: Step-by-Step Demonstration");
        ListNode demoList = createLinkedList(new int[]{1, 2, 6, 3, 4, 5, 6});
        System.out.println("Original list: [1, 2, 6, 3, 4, 5, 6]");
        System.out.println("Removing value: 6");
        System.out.println();
        
        System.out.println("Step-by-step process:");
        System.out.println("1. Create sentinel node: [0] -> [1, 2, 6, 3, 4, 5, 6]");
        System.out.println("2. Check current.next.val (1) != 6, move current forward");
        System.out.println("3. Check current.next.val (2) != 6, move current forward");
        System.out.println("4. Check current.next.val (6) == 6, skip this node");
        System.out.println("5. Check current.next.val (3) != 6, move current forward");
        System.out.println("6. Check current.next.val (4) != 6, move current forward");
        System.out.println("7. Check current.next.val (5) != 6, move current forward");
        System.out.println("8. Check current.next.val (6) == 6, skip this node");
        System.out.println("9. Return sentinel.next");
        System.out.println();
        
        ListNode demoResult = removeElements(demoList, 6);
        System.out.println("Final result: " + printLinkedList(demoResult));
        System.out.println();
        
        // Test case 11: Performance demonstration
        System.out.println("Test Case 11: Performance Demonstration");
        int[] largeArray = new int[10000];
        for (int i = 0; i < 10000; i++) {
            largeArray[i] = i % 10; // 0-9 repeating
        }
        ListNode largeList = createLinkedList(largeArray);
        
        long startTime = System.nanoTime();
        ListNode largeResult = removeElements(largeList, 5);
        long endTime = System.nanoTime();
        
        System.out.printf("Large list with 10,000 nodes:%n");
        System.out.printf("Original size: 10,000%n");
        System.out.printf("After removing 5: %d%n", getValuesFromList(largeResult).length);
        System.out.printf("Time taken: %.4f ms%n", (endTime - startTime) / 1_000_000.0);
        System.out.println();
        
        // Test case 12: Edge cases
        System.out.println("Test Case 12: Edge Cases");
        
        // Null head
        System.out.println("Null head:");
        ListNode nullResult = removeElements(null, 5);
        System.out.println("Result: " + printLinkedList(nullResult));
        System.out.println("Correct: " + (nullResult == null));
        System.out.println();
        
        // Remove from list with only target values
        System.out.println("List with only target values [3,3,3]:");
        ListNode onlyTargetList = createLinkedList(new int[]{3, 3, 3});
        ListNode onlyTargetResult = removeElements(onlyTargetList, 3);
        System.out.println("Result: " + printLinkedList(onlyTargetResult));
        System.out.println("Correct: " + (onlyTargetResult == null));
        System.out.println();
        
        // Remove from list with no target values
        System.out.println("List with no target values [1,2,3,4,5]:");
        ListNode noTargetList = createLinkedList(new int[]{1, 2, 3, 4, 5});
        ListNode noTargetResult = removeElements(noTargetList, 10);
        System.out.println("Result: " + printLinkedList(noTargetResult));
        System.out.println("Correct: " + printArray(getValuesFromList(noTargetResult)).equals("[1, 2, 3, 4, 5]"));
        System.out.println();
        
        // Test case 13: Visual representation
        System.out.println("Test Case 13: Visual Representation");
        ListNode visualList = createLinkedList(new int[]{1, 2, 6, 3, 4, 5, 6});
        System.out.println("Original: 1 -> 2 -> 6 -> 3 -> 4 -> 5 -> 6 -> null");
        System.out.println("Removing: 6");
        System.out.println();
        
        System.out.println("Sentinel approach:");
        System.out.println("sentinel -> 1 -> 2 -> 6 -> 3 -> 4 -> 5 -> 6 -> null");
        System.out.println("current points to sentinel");
        System.out.println();
        
        System.out.println("Step 1: current.next.val = 1 != 6, move current");
        System.out.println("sentinel -> 1 -> 2 -> 6 -> 3 -> 4 -> 5 -> 6 -> null");
        System.out.println("         current");
        System.out.println();
        
        System.out.println("Step 2: current.next.val = 2 != 6, move current");
        System.out.println("sentinel -> 1 -> 2 -> 6 -> 3 -> 4 -> 5 -> 6 -> null");
        System.out.println("              current");
        System.out.println();
        
        System.out.println("Step 3: current.next.val = 6 == 6, skip node");
        System.out.println("sentinel -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null");
        System.out.println("              current");
        System.out.println();
        
        System.out.println("Step 4: current.next.val = 3 != 6, move current");
        System.out.println("sentinel -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null");
        System.out.println("                   current");
        System.out.println();
        
        System.out.println("Step 5: current.next.val = 4 != 6, move current");
        System.out.println("sentinel -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null");
        System.out.println("                        current");
        System.out.println();
        
        System.out.println("Step 6: current.next.val = 5 != 6, move current");
        System.out.println("sentinel -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null");
        System.out.println("                             current");
        System.out.println();
        
        System.out.println("Step 7: current.next.val = 6 == 6, skip node");
        System.out.println("sentinel -> 1 -> 2 -> 3 -> 4 -> 5 -> null");
        System.out.println("                             current");
        System.out.println();
        
        System.out.println("Result: sentinel.next = 1 -> 2 -> 3 -> 4 -> 5 -> null");
        System.out.println();
        
        ListNode visualResult = removeElements(visualList, 6);
        System.out.println("Actual result: " + printLinkedList(visualResult));
        System.out.println();
    }
} 