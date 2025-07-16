/**
 * Q2. Add Two Numbers
 * 
 * Problem:
 * You are given two non-empty linked lists representing two non-negative integers.
 * The digits are stored in reverse order, and each of their nodes contains a single digit.
 * Add the two numbers and return the sum as a linked list.
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
 * 
 * Example:
 * Input: l1 = [2,4,3], l2 = [5,6,4]
 * Output: [7,0,8]
 * Explanation: 342 + 465 = 807.
 * 
 * Approach:
 * 1. Create a dummy node to handle the result list
 * 2. Initialize carry as 0
 * 3. Traverse both lists simultaneously:
 *    - Add corresponding digits and carry
 *    - Create new node with sum % 10
 *    - Update carry as sum / 10
 * 4. If there's remaining carry, create a new node
 * 5. Return the next of dummy node (to skip the initial 0)
 * 
 * Time Complexity: O(max(N,M)) where N and M are the lengths of the input lists
 * Space Complexity: O(max(N,M)) to store the result
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class AddTwoNumbers {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Create a dummy node to handle the result list
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        int carry = 0;

        // Traverse both lists
        while (l1 != null || l2 != null) {
            // Get values from both lists (use 0 if list is exhausted)
            int val1 = (l1 != null) ? l1.val : 0;
            int val2 = (l2 != null) ? l2.val : 0;

            // Calculate sum and new carry
            int sum = val1 + val2 + carry;
            carry = sum / 10;

            // Create new node with current digit
            current.next = new ListNode(sum % 10);
            current = current.next;

            // Move to next nodes if available
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }

        // Handle remaining carry
        if (carry > 0) {
            current.next = new ListNode(carry);
        }

        return dummy.next;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Create first list: 2->4->3 (represents 342)
        ListNode l1 = new ListNode(2);
        l1.next = new ListNode(4);
        l1.next.next = new ListNode(3);

        // Create second list: 5->6->4 (represents 465)
        ListNode l2 = new ListNode(5);
        l2.next = new ListNode(6);
        l2.next.next = new ListNode(4);

        // Add the numbers
        AddTwoNumbers solution = new AddTwoNumbers();
        ListNode result = solution.addTwoNumbers(l1, l2);

        // Print the result
        System.out.print("Result: ");
        while (result != null) {
            System.out.print(result.val + " -> ");
            result = result.next;
        }
        System.out.println("null");
    }
} 