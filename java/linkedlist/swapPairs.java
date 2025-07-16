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
    int val;
    ListNode next;
    
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

public class swapPairs {
    
    /**
     * Swap every two adjacent nodes in the linked list (Iterative approach)
     * @param head Head of the linked list
     * @return New head of the linked list
     */
    public static ListNode swapPairs(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;

        while (prev.next != null && prev.next.next != null) {
            ListNode first = prev.next;
            ListNode second = first.next;

            first.next = second.next;
            second.next = first;
            prev.next = second;

            prev = first;
        }
        return dummy.next;
    }
    
    /**
     * Swap every two adjacent nodes in the linked list (Recursive approach)
     * @param head Head of the linked list
     * @return New head of the linked list
     */
    public static ListNode swapPairsRecursive(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode l = head;
        ListNode r = head.next;

        l.next = swapPairsRecursive(r.next);
        r.next = l;
        return r;
    }
    
    /**
     * Helper method to create a linked list from an array
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
     * Helper method to print a linked list
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
     * Helper method to get values from a linked list as array
     * @param head Head of the linked list
     * @return Array of values
     */
    public static int[] getValuesFromList(ListNode head) {
        if (head == null) {
            return new int[0];
        }
        
        // Count nodes
        int count = 0;
        ListNode current = head;
        while (current != null) {
            count++;
            current = current.next;
        }
        
        // Create array and fill values
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
     * Helper method to check if two arrays are equal
     * @param arr1 First array
     * @param arr2 Second array
     * @return true if arrays are equal, false otherwise
     */
    public static boolean arraysEqual(int[] arr1, int[] arr2) {
        if (arr1.length != arr2.length) {
            return false;
        }
        for (int i = 0; i < arr1.length; i++) {
            if (arr1[i] != arr2[i]) {
                return false;
            }
        }
        return true;
    }
    
    // Main method for testing
    public static void main(String[] args) {
        System.out.println("=== Swap Nodes in Pairs ===\n");
        
        // Test case 1: Even number of nodes
        System.out.println("Test Case 1: Even number of nodes [1,2,3,4]");
        ListNode list1 = createLinkedList(new int[]{1, 2, 3, 4});
        System.out.println("Original list: " + printLinkedList(list1));
        
        ListNode result1 = swapPairs(list1);
        System.out.println("After swapping pairs: " + printLinkedList(result1));
        System.out.println("Expected: [2, 1, 4, 3]");
        System.out.println("Correct: " + arraysEqual(getValuesFromList(result1), new int[]{2, 1, 4, 3}));
        System.out.println();
        
        // Test case 2: Odd number of nodes
        System.out.println("Test Case 2: Odd number of nodes [1,2,3,4,5]");
        ListNode list2 = createLinkedList(new int[]{1, 2, 3, 4, 5});
        System.out.println("Original list: " + printLinkedList(list2));
        
        ListNode result2 = swapPairs(list2);
        System.out.println("After swapping pairs: " + printLinkedList(result2));
        System.out.println("Expected: [2, 1, 4, 3, 5]");
        System.out.println("Correct: " + arraysEqual(getValuesFromList(result2), new int[]{2, 1, 4, 3, 5}));
        System.out.println();
        
        // Test case 3: Empty list
        System.out.println("Test Case 3: Empty list []");
        ListNode list3 = createLinkedList(new int[]{});
        System.out.println("Original list: " + printLinkedList(list3));
        
        ListNode result3 = swapPairs(list3);
        System.out.println("After swapping pairs: " + printLinkedList(result3));
        System.out.println("Expected: []");
        System.out.println("Correct: " + (result3 == null));
        System.out.println();
        
        // Test case 4: Single node
        System.out.println("Test Case 4: Single node [1]");
        ListNode list4 = createLinkedList(new int[]{1});
        System.out.println("Original list: " + printLinkedList(list4));
        
        ListNode result4 = swapPairs(list4);
        System.out.println("After swapping pairs: " + printLinkedList(result4));
        System.out.println("Expected: [1]");
        System.out.println("Correct: " + arraysEqual(getValuesFromList(result4), new int[]{1}));
        System.out.println();
        
        // Test case 5: Two nodes
        System.out.println("Test Case 5: Two nodes [1,2]");
        ListNode list5 = createLinkedList(new int[]{1, 2});
        System.out.println("Original list: " + printLinkedList(list5));
        
        ListNode result5 = swapPairs(list5);
        System.out.println("After swapping pairs: " + printLinkedList(result5));
        System.out.println("Expected: [2, 1]");
        System.out.println("Correct: " + arraysEqual(getValuesFromList(result5), new int[]{2, 1}));
        System.out.println();
        
        // Test case 6: Step-by-step demonstration
        System.out.println("Test Case 6: Step-by-Step Demonstration");
        ListNode demoList = createLinkedList(new int[]{1, 2, 3, 4});
        System.out.println("Original list: [1, 2, 3, 4]");
        System.out.println();
        
        System.out.println("Step-by-step process:");
        System.out.println("1. Create dummy node: dummy -> 1 -> 2 -> 3 -> 4");
        System.out.println("2. First iteration: swap 1 and 2");
        System.out.println("   - first = 1, second = 2");
        System.out.println("   - first.next = second.next (3)");
        System.out.println("   - second.next = first (1)");
        System.out.println("   - prev.next = second (2)");
        System.out.println("   - Result: dummy -> 2 -> 1 -> 3 -> 4");
        System.out.println("3. Second iteration: swap 3 and 4");
        System.out.println("   - first = 3, second = 4");
        System.out.println("   - first.next = second.next (null)");
        System.out.println("   - second.next = first (3)");
        System.out.println("   - prev.next = second (4)");
        System.out.println("   - Result: dummy -> 2 -> 1 -> 4 -> 3");
        System.out.println();
        
        ListNode demoResult = swapPairs(demoList);
        System.out.println("Final result: " + printLinkedList(demoResult));
        System.out.println();
        
        // Test case 7: Large list
        System.out.println("Test Case 7: Large list [1,2,3,4,5,6,7,8]");
        ListNode largeList = createLinkedList(new int[]{1, 2, 3, 4, 5, 6, 7, 8});
        System.out.println("Original list: " + printLinkedList(largeList));
        
        ListNode largeResult = swapPairs(largeList);
        System.out.println("After swapping pairs: " + printLinkedList(largeResult));
        System.out.println("Expected: [2, 1, 4, 3, 6, 5, 8, 7]");
        System.out.println("Correct: " + arraysEqual(getValuesFromList(largeResult), new int[]{2, 1, 4, 3, 6, 5, 8, 7}));
        System.out.println();
        
        // Test case 8: Recursive approach
        System.out.println("Test Case 8: Recursive Approach [1,2,3,4]");
        ListNode recursiveList = createLinkedList(new int[]{1, 2, 3, 4});
        System.out.println("Original list: " + printLinkedList(recursiveList));
        
        ListNode recursiveResult = swapPairsRecursive(recursiveList);
        System.out.println("After swapping pairs (recursive): " + printLinkedList(recursiveResult));
        System.out.println("Expected: [2, 1, 4, 3]");
        System.out.println("Correct: " + arraysEqual(getValuesFromList(recursiveResult), new int[]{2, 1, 4, 3}));
        System.out.println();
    }
} 