/**
 * 109. Convert Sorted List to Binary Search Tree
 * 
 * Problem: Given the head of a singly linked list where elements are sorted in ascending order,
 * convert it to a height-balanced binary search tree.
 * 
 * A height-balanced binary tree is a binary tree in which the depth of the two subtrees of 
 * every node never differs by more than one.
 * 
 * Approach:
 * 1. Inorder Traversal with Global Head Pointer:
 *    - First, find the size of the linked list
 *    - Use inorder traversal to build the BST
 *    - The middle element becomes the root (ensuring height balance)
 *    - Recursively build left and right subtrees
 *    - Use a global head pointer to track current position in linked list
 * 
 * 2. Convert to Array First:
 *    - Convert linked list to array
 *    - Use divide and conquer approach similar to "Convert Sorted Array to BST"
 *    - More straightforward but uses extra space
 * 
 * 3. Two-Pointer Approach:
 *    - Use fast and slow pointers to find middle element
 *    - Recursively build left and right subtrees
 *    - More complex but space efficient
 * 
 * Time Complexity: O(n) where n is the number of nodes in the linked list
 * Space Complexity: O(log n) for the recursion stack (height of the tree)
 *                  O(n) if converting to array first
 */

// Definition for singly-linked list
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

// Definition for a binary tree node
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    
    // Global head pointer for inorder traversal approach
    private ListNode head;
    
    // Approach 1: Inorder Traversal with Global Head Pointer (Most Efficient)
    public TreeNode sortedListToBST(ListNode head) {
        if (head == null) return null;
        
        // Get the size of the linked list
        int size = getSize(head);
        this.head = head;
        
        // Convert to BST using inorder traversal
        return convert(0, size - 1);
    }
    
    private int getSize(ListNode node) {
        int count = 0;
        while (node != null) {
            count++;
            node = node.next;
        }
        return count;
    }
    
    private TreeNode convert(int left, int right) {
        if (left > right) return null;
        
        int mid = (left + right) / 2;
        
        // Build left subtree first (inorder traversal)
        TreeNode leftTree = convert(left, mid - 1);
        
        // Create current node
        TreeNode node = new TreeNode(head.val);
        node.left = leftTree;
        
        // Move head pointer to next element
        head = head.next;
        
        // Build right subtree
        TreeNode rightTree = convert(mid + 1, right);
        node.right = rightTree;
        
        return node;
    }
    
    // Approach 2: Convert to Array First
    public TreeNode sortedListToBSTArray(ListNode head) {
        if (head == null) return null;
        
        // Convert linked list to array
        List<Integer> values = new ArrayList<>();
        ListNode current = head;
        while (current != null) {
            values.add(current.val);
            current = current.next;
        }
        
        // Build BST from array
        return buildBSTFromArray(values, 0, values.size() - 1);
    }
    
    private TreeNode buildBSTFromArray(List<Integer> values, int left, int right) {
        if (left > right) return null;
        
        int mid = (left + right) / 2;
        
        TreeNode node = new TreeNode(values.get(mid));
        node.left = buildBSTFromArray(values, left, mid - 1);
        node.right = buildBSTFromArray(values, mid + 1, right);
        
        return node;
    }
    
    // Approach 3: Two-Pointer Approach (Find Middle)
    public TreeNode sortedListToBSTTwoPointer(ListNode head) {
        if (head == null) return null;
        if (head.next == null) return new TreeNode(head.val);
        
        // Find middle element using two pointers
        ListNode slow = head;
        ListNode fast = head;
        ListNode prev = null;
        
        while (fast != null && fast.next != null) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // Create root node
        TreeNode root = new TreeNode(slow.val);
        
        // Split the list
        if (prev != null) {
            prev.next = null;
            root.left = sortedListToBSTTwoPointer(head);
        }
        
        root.right = sortedListToBSTTwoPointer(slow.next);
        
        return root;
    }
    
    // Approach 4: Optimized Two-Pointer with Tail Pointer
    public TreeNode sortedListToBSTOptimized(ListNode head) {
        if (head == null) return null;
        
        // Find the tail of the list
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
        }
        
        return buildBST(head, tail);
    }
    
    private TreeNode buildBST(ListNode head, ListNode tail) {
        if (head == null || head.val > tail.val) return null;
        if (head == tail) return new TreeNode(head.val);
        
        // Find middle element
        ListNode slow = head;
        ListNode fast = head;
        ListNode prev = null;
        
        while (fast != tail && fast.next != tail) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // Create root node
        TreeNode root = new TreeNode(slow.val);
        
        // Build left subtree
        if (prev != null) {
            root.left = buildBST(head, prev);
        }
        
        // Build right subtree
        root.right = buildBST(slow.next, tail);
        
        return root;
    }
}

// Test class
class ConvertLinkedToTreeTest {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test Case 1: [-10,-3,0,5,9]
        // Expected BST:
        //       0
        //      / \
        //    -3   9
        //    /   /
        //  -10   5
        ListNode head1 = new ListNode(-10);
        head1.next = new ListNode(-3);
        head1.next.next = new ListNode(0);
        head1.next.next.next = new ListNode(5);
        head1.next.next.next.next = new ListNode(9);
        
        TreeNode result1 = solution.sortedListToBST(head1);
        System.out.println("Test Case 1: " + (result1 != null ? "BST created successfully" : "Failed"));
        
        // Test Case 2: Empty list
        TreeNode result2 = solution.sortedListToBST(null);
        System.out.println("Test Case 2 (Empty): " + (result2 == null ? "Correct" : "Failed"));
        
        // Test Case 3: Single element
        ListNode head3 = new ListNode(1);
        TreeNode result3 = solution.sortedListToBST(head3);
        System.out.println("Test Case 3 (Single): " + (result3 != null && result3.val == 1 ? "Correct" : "Failed"));
        
        // Test Case 4: Two elements
        ListNode head4 = new ListNode(1);
        head4.next = new ListNode(2);
        TreeNode result4 = solution.sortedListToBST(head4);
        System.out.println("Test Case 4 (Two elements): " + (result4 != null ? "BST created successfully" : "Failed"));
        
        // Test Case 5: Three elements
        ListNode head5 = new ListNode(1);
        head5.next = new ListNode(2);
        head5.next.next = new ListNode(3);
        TreeNode result5 = solution.sortedListToBST(head5);
        System.out.println("Test Case 5 (Three elements): " + (result5 != null ? "BST created successfully" : "Failed"));
        
        // Test Case 6: Large list
        ListNode head6 = new ListNode(1);
        ListNode current = head6;
        for (int i = 2; i <= 10; i++) {
            current.next = new ListNode(i);
            current = current.next;
        }
        TreeNode result6 = solution.sortedListToBST(head6);
        System.out.println("Test Case 6 (Large list): " + (result6 != null ? "BST created successfully" : "Failed"));
        
        System.out.println("\n--- Testing all approaches ---");
        
        // Recreate test list for each approach
        ListNode testHead = new ListNode(-10);
        testHead.next = new ListNode(-3);
        testHead.next.next = new ListNode(0);
        testHead.next.next.next = new ListNode(5);
        testHead.next.next.next.next = new ListNode(9);
        
        System.out.println("Inorder Approach: " + (solution.sortedListToBST(testHead) != null ? "Success" : "Failed"));
        
        // Recreate for array approach
        testHead = new ListNode(-10);
        testHead.next = new ListNode(-3);
        testHead.next.next = new ListNode(0);
        testHead.next.next.next = new ListNode(5);
        testHead.next.next.next.next = new ListNode(9);
        
        System.out.println("Array Approach: " + (solution.sortedListToBSTArray(testHead) != null ? "Success" : "Failed"));
        
        // Recreate for two-pointer approach
        testHead = new ListNode(-10);
        testHead.next = new ListNode(-3);
        testHead.next.next = new ListNode(0);
        testHead.next.next.next = new ListNode(5);
        testHead.next.next.next.next = new ListNode(9);
        
        System.out.println("Two-Pointer Approach: " + (solution.sortedListToBSTTwoPointer(testHead) != null ? "Success" : "Failed"));
        
        // Recreate for optimized approach
        testHead = new ListNode(-10);
        testHead.next = new ListNode(-3);
        testHead.next.next = new ListNode(0);
        testHead.next.next.next = new ListNode(5);
        testHead.next.next.next.next = new ListNode(9);
        
        System.out.println("Optimized Approach: " + (solution.sortedListToBSTOptimized(testHead) != null ? "Success" : "Failed"));
    }
} 