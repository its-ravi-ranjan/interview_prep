/**
 * Palindrome List
 * 
 * Problem:
 * Given the head of a singly linked list, return true if it is a palindrome or false otherwise.
 * 
 * Example:
 * Input: head = [1,2,2,1]
 * Output: true
 * Explanation:
 * - The list reads the same forwards and backwards
 * - 1->2->2->1 is a palindrome
 * 
 * Approach:
 * 1. Find the middle of the list using slow and fast pointers
 * 2. Reverse the second half of the list
 * 3. Compare the first half with the reversed second half
 * 4. Restore the list (optional)
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

class PalindromeList {
    /**
     * @param {ListNode} head
     * @return {boolean}
     */
    isPalindrome(head) {
        if (!head || !head.next) return true;

        // Find middle of the list
        let slow = head;
        let fast = head;
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // Reverse second half
        let reversedSecondHalf = this.reverse(slow);

        // Compare first half with reversed second half
        let current = head;
        while (reversedSecondHalf) {
            if (current.val !== reversedSecondHalf.val) {
                return false;
            }
            current = current.next;
            reversedSecondHalf = reversedSecondHalf.next;
        }

        return true;
    }

    /**
     * Reverse a linked list
     * @param {ListNode} head
     * @return {ListNode}
     */
    reverse(head) {
        let prev = null;
        let current = head;
        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return prev;
    }

    /**
     * Approach 2: Using Array to store values
     * 
     * Approach:
     * Traverse the linked list and store values in an array.
     * Check whether the array is a palindrome by comparing elements from start and end moving towards the center.
     * 
     * Time Complexity: O(n), where n is the number of nodes.
     * Space Complexity: O(n), for the array storage.
     * 
     * @param {ListNode} head
     * @return {boolean}
     */
    isPalindromeUsingArray(head) {
        let arr = [];
        let curr = head;
        while (curr !== null) {
            arr.push(curr.val);
            curr = curr.next;
        }
        let left = 0, right = arr.length - 1;
        while (left < right) {
            if (arr[left++] !== arr[right--]) return false;
        }
        return true;
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

    // Helper method to print the list
    static printList(head) {
        let current = head;
        const values = [];
        while (current) {
            values.push(current.val);
            current = current.next;
        }
        console.log(values.join(' -> '));
    }
}

// Test cases
function runTests() {
    const solution = new PalindromeList();

    // Test case 1: Regular palindrome
    console.log("Test case 1: Regular palindrome");
    const list1 = PalindromeList.createList([1, 2, 2, 1]);
    console.log("List:");
    PalindromeList.printList(list1);
    console.log("Is palindrome:", solution.isPalindrome(list1));

    // Test case 2: Non-palindrome
    console.log("\nTest case 2: Non-palindrome");
    const list2 = PalindromeList.createList([1, 2, 3, 4]);
    console.log("List:");
    PalindromeList.printList(list2);
    console.log("Is palindrome:", solution.isPalindrome(list2));

    // Test case 3: Single node
    console.log("\nTest case 3: Single node");
    const list3 = PalindromeList.createList([1]);
    console.log("List:");
    PalindromeList.printList(list3);
    console.log("Is palindrome:", solution.isPalindrome(list3));

    // Test case 4: Empty list
    console.log("\nTest case 4: Empty list");
    const list4 = null;
    console.log("List: null");
    console.log("Is palindrome:", solution.isPalindrome(list4));

    // Test case 5: Odd length palindrome
    console.log("\nTest case 5: Odd length palindrome");
    const list5 = PalindromeList.createList([1, 2, 3, 2, 1]);
    console.log("List:");
    PalindromeList.printList(list5);
    console.log("Is palindrome:", solution.isPalindrome(list5));

    // Test case 6: Even length palindrome with repeated numbers
    console.log("\nTest case 6: Even length palindrome with repeated numbers");
    const list6 = PalindromeList.createList([1, 1, 1, 1]);
    console.log("List:");
    PalindromeList.printList(list6);
    console.log("Is palindrome:", solution.isPalindrome(list6));

    // Test case 7: Non-palindrome with repeated numbers
    console.log("\nTest case 7: Non-palindrome with repeated numbers");
    const list7 = PalindromeList.createList([1, 1, 2, 1]);
    console.log("List:");
    PalindromeList.printList(list7);
    console.log("Is palindrome:", solution.isPalindrome(list7));
}

// Run the tests
runTests(); 