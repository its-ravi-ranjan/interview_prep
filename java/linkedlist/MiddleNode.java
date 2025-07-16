package linkedlist;

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
    int val;
    Node next;
    
    Node(int val) {
        this.val = val;
        this.next = null;
    }
}

public class middleNode {
    
    /**
     * Find the middle node of a singly linked list using slow and fast pointer approach
     * @param head Head of the linked list
     * @return Middle node of the linked list
     */
    public static Node middleNode(Node head) {
        if (head == null || head.next == null) {
            return head;
        }
        
        Node slow = head;
        Node fast = head;
        
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return slow;
    }
    
    /**
     * Helper function to create a linked list from an array
     * @param arr Array of values
     * @return Head of the created linked list
     */
    public static Node createLinkedList(int[] arr) {
        if (arr == null || arr.length == 0) {
            return null;
        }
        
        Node head = new Node(arr[0]);
        Node current = head;
        
        for (int i = 1; i < arr.length; i++) {
            current.next = new Node(arr[i]);
            current = current.next;
        }
        
        return head;
    }
    
    /**
     * Helper function to print a linked list
     * @param head Head of the linked list
     * @return String representation of the linked list
     */
    public static String printLinkedList(Node head) {
        if (head == null) {
            return "null";
        }
        
        StringBuilder result = new StringBuilder();
        Node current = head;
        
        while (current != null) {
            result.append(current.val);
            if (current.next != null) {
                result.append(" -> ");
            }
            current = current.next;
        }
        
        return result.toString();
    }
    
    /**
     * Helper function to get values from a linked list starting from a given node
     * @param node Starting node
     * @return Array of values from the node onwards
     */
    public static int[] getValuesFromNode(Node node) {
        if (node == null) {
            return new int[0];
        }
        
        // First, count the number of nodes
        int count = 0;
        Node current = node;
        while (current != null) {
            count++;
            current = current.next;
        }
        
        // Then, collect the values
        int[] values = new int[count];
        current = node;
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
        System.out.println("=== Find Middle Node of Singly Linked List ===\n");
        
        // Test case 1: Odd length list
        System.out.println("Test Case 1: Odd Length List [1,2,3,4,5]");
        Node list1 = createLinkedList(new int[]{1, 2, 3, 4, 5});
        System.out.println("Original list: " + printLinkedList(list1));
        
        Node middle1 = middleNode(list1);
        System.out.println("Middle node value: " + middle1.val);
        System.out.println("Middle node onwards: " + printLinkedList(middle1));
        System.out.println("Values from middle: " + printArray(getValuesFromNode(middle1)));
        System.out.println();
        
        // Test case 2: Even length list
        System.out.println("Test Case 2: Even Length List [1,2,3,4,5,6]");
        Node list2 = createLinkedList(new int[]{1, 2, 3, 4, 5, 6});
        System.out.println("Original list: " + printLinkedList(list2));
        
        Node middle2 = middleNode(list2);
        System.out.println("Middle node value: " + middle2.val);
        System.out.println("Middle node onwards: " + printLinkedList(middle2));
        System.out.println("Values from middle: " + printArray(getValuesFromNode(middle2)));
        System.out.println();
        
        // Test case 3: Single node
        System.out.println("Test Case 3: Single Node [42]");
        Node list3 = createLinkedList(new int[]{42});
        System.out.println("Original list: " + printLinkedList(list3));
        
        Node middle3 = middleNode(list3);
        System.out.println("Middle node value: " + middle3.val);
        System.out.println("Middle node onwards: " + printLinkedList(middle3));
        System.out.println();
        
        // Test case 4: Two nodes
        System.out.println("Test Case 4: Two Nodes [10, 20]");
        Node list4 = createLinkedList(new int[]{10, 20});
        System.out.println("Original list: " + printLinkedList(list4));
        
        Node middle4 = middleNode(list4);
        System.out.println("Middle node value: " + middle4.val);
        System.out.println("Middle node onwards: " + printLinkedList(middle4));
        System.out.println();
        
        // Test case 5: Three nodes
        System.out.println("Test Case 5: Three Nodes [100, 200, 300]");
        Node list5 = createLinkedList(new int[]{100, 200, 300});
        System.out.println("Original list: " + printLinkedList(list5));
        
        Node middle5 = middleNode(list5);
        System.out.println("Middle node value: " + middle5.val);
        System.out.println("Middle node onwards: " + printLinkedList(middle5));
        System.out.println();
        
        // Test case 6: Four nodes
        System.out.println("Test Case 6: Four Nodes [1, 2, 3, 4]");
        Node list6 = createLinkedList(new int[]{1, 2, 3, 4});
        System.out.println("Original list: " + printLinkedList(list6));
        
        Node middle6 = middleNode(list6);
        System.out.println("Middle node value: " + middle6.val);
        System.out.println("Middle node onwards: " + printLinkedList(middle6));
        System.out.println();
        
        // Test case 7: Large odd list
        System.out.println("Test Case 7: Large Odd List [1,2,3,4,5,6,7,8,9]");
        Node list7 = createLinkedList(new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9});
        System.out.println("Original list: " + printLinkedList(list7));
        
        Node middle7 = middleNode(list7);
        System.out.println("Middle node value: " + middle7.val);
        System.out.println("Middle node onwards: " + printLinkedList(middle7));
        System.out.println();
        
        // Test case 8: Large even list
        System.out.println("Test Case 8: Large Even List [1,2,3,4,5,6,7,8,9,10]");
        Node list8 = createLinkedList(new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10});
        System.out.println("Original list: " + printLinkedList(list8));
        
        Node middle8 = middleNode(list8);
        System.out.println("Middle node value: " + middle8.val);
        System.out.println("Middle node onwards: " + printLinkedList(middle8));
        System.out.println();
        
        // Test case 9: Empty list
        System.out.println("Test Case 9: Empty List");
        Node list9 = createLinkedList(new int[]{});
        System.out.println("Original list: " + printLinkedList(list9));
        
        Node middle9 = middleNode(list9);
        System.out.println("Middle node: " + (middle9 != null ? middle9.val : "null"));
        System.out.println();
        
        // Test case 10: Null list
        System.out.println("Test Case 10: Null List");
        Node list10 = null;
        System.out.println("Original list: " + printLinkedList(list10));
        
        Node middle10 = middleNode(list10);
        System.out.println("Middle node: " + (middle10 != null ? middle10.val : "null"));
        System.out.println();
        
        // Test case 11: Step-by-step demonstration
        System.out.println("Test Case 11: Step-by-Step Demonstration");
        Node demoList = createLinkedList(new int[]{1, 2, 3, 4, 5, 6});
        System.out.println("List: [1, 2, 3, 4, 5, 6]");
        System.out.println("Length: 6 (even)");
        System.out.println("Expected middle: 4 (second middle node)");
        System.out.println();
        
        System.out.println("Step-by-step pointer movement:");
        Node slow = demoList;
        Node fast = demoList;
        int step = 1;
        
        while (fast != null && fast.next != null) {
            System.out.printf("Step %d:%n", step);
            System.out.printf("  Slow pointer: %d%n", slow.val);
            System.out.printf("  Fast pointer: %d%n", fast.val);
            
            slow = slow.next;
            fast = fast.next.next;
            step++;
        }
        
        System.out.printf("Final step:%n");
        System.out.printf("  Slow pointer: %d (middle node)%n", slow.val);
        System.out.printf("  Fast pointer: %s (reached end)%n", fast != null ? String.valueOf(fast.val) : "null");
        System.out.println();
        
        // Test case 12: Performance demonstration
        System.out.println("Test Case 12: Performance Demonstration");
        int[] largeArray = new int[10000];
        for (int i = 0; i < 10000; i++) {
            largeArray[i] = i + 1;
        }
        Node largeList = createLinkedList(largeArray);
        
        long startTime = System.nanoTime();
        Node largeMiddle = middleNode(largeList);
        long endTime = System.nanoTime();
        
        System.out.printf("Large list with 10,000 nodes:%n");
        System.out.printf("Middle node value: %d%n", largeMiddle.val);
        System.out.printf("Time taken: %.4f ms%n", (endTime - startTime) / 1_000_000.0);
        System.out.println();
        
        // Test case 13: Verification with different approaches
        System.out.println("Test Case 13: Verification with Different Approaches");
        Node verifyList = createLinkedList(new int[]{1, 2, 3, 4, 5, 6, 7, 8});
        
        // Method 1: Slow and fast pointer (our implementation)
        Node middleFast = middleNode(verifyList);
        System.out.println("Fast pointer method - Middle node: " + middleFast.val);
        
        // Method 2: Count nodes and find middle
        int count = 0;
        Node current = verifyList;
        while (current != null) {
            count++;
            current = current.next;
        }
        
        int middleIndex = count / 2;
        current = verifyList;
        for (int i = 0; i < middleIndex; i++) {
            current = current.next;
        }
        System.out.println("Count method - Middle node: " + current.val);
        System.out.println("Both methods give same result: " + (middleFast.val == current.val));
        System.out.println();
        
        // Test case 14: Edge cases with negative numbers
        System.out.println("Test Case 14: Edge Cases with Negative Numbers");
        Node negativeList = createLinkedList(new int[]{-5, -3, -1, 0, 2, 4, 6});
        System.out.println("Original list: " + printLinkedList(negativeList));
        
        Node negativeMiddle = middleNode(negativeList);
        System.out.println("Middle node value: " + negativeMiddle.val);
        System.out.println("Middle node onwards: " + printLinkedList(negativeMiddle));
        System.out.println();
        
        // Test case 15: Dry run with visual representation
        System.out.println("Test Case 15: Dry Run with Visual Representation");
        Node dryRunList = createLinkedList(new int[]{10, 20, 30, 40, 50});
        System.out.println("List: [10, 20, 30, 40, 50]");
        System.out.println("Length: 5 (odd)");
        System.out.println("Expected middle: 30");
        System.out.println();
        
        System.out.println("Visual representation:");
        System.out.println("Initial state:");
        System.out.println("  slow -> 10 -> 20 -> 30 -> 40 -> 50 -> null");
        System.out.println("  fast -> 10 -> 20 -> 30 -> 40 -> 50 -> null");
        System.out.println();
        
        System.out.println("After first iteration:");
        System.out.println("  slow -> 20 -> 30 -> 40 -> 50 -> null");
        System.out.println("  fast -> 30 -> 40 -> 50 -> null");
        System.out.println();
        
        System.out.println("After second iteration:");
        System.out.println("  slow -> 30 -> 40 -> 50 -> null");
        System.out.println("  fast -> 50 -> null");
        System.out.println();
        
        System.out.println("Fast.next is null, loop ends");
        System.out.println("Result: slow points to 30 (middle node)");
        System.out.println();
        
        Node actualMiddle = middleNode(dryRunList);
        System.out.println("Actual result: " + actualMiddle.val);
        System.out.println("Expected result: 30");
        System.out.println("Correct: " + (actualMiddle.val == 30));
        System.out.println();
    }
} 