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
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

// Definition for a binary tree node
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    
    // Global head pointer for inorder traversal approach
    constructor() {
        this.head = null;
    }
    
    // Approach 1: Inorder Traversal with Global Head Pointer (Most Efficient)
    sortedListToBST(head) {
        if (head === null) return null;
        
        // Get the size of the linked list
        const size = this.getSize(head);
        this.head = head;
        
        // Convert to BST using inorder traversal
        return this.convert(0, size - 1);
    }
    
    getSize(node) {
        let count = 0;
        while (node !== null) {
            count++;
            node = node.next;
        }
        return count;
    }
    
    convert(left, right) {
        if (left > right) return null;
        
        const mid = Math.floor((left + right) / 2);
        
        // Build left subtree first (inorder traversal)
        const leftTree = this.convert(left, mid - 1);
        
        // Create current node
        const node = new TreeNode(this.head.val);
        node.left = leftTree;
        
        // Move head pointer to next element
        this.head = this.head.next;
        
        // Build right subtree
        const rightTree = this.convert(mid + 1, right);
        node.right = rightTree;
        
        return node;
    }
    
    // Approach 2: Convert to Array First
    sortedListToBSTArray(head) {
        if (head === null) return null;
        
        // Convert linked list to array
        const values = [];
        let current = head;
        while (current !== null) {
            values.push(current.val);
            current = current.next;
        }
        
        // Build BST from array
        return this.buildBSTFromArray(values, 0, values.length - 1);
    }
    
    buildBSTFromArray(values, left, right) {
        if (left > right) return null;
        
        const mid = Math.floor((left + right) / 2);
        
        const node = new TreeNode(values[mid]);
        node.left = this.buildBSTFromArray(values, left, mid - 1);
        node.right = this.buildBSTFromArray(values, mid + 1, right);
        
        return node;
    }
    
    // Approach 3: Two-Pointer Approach (Find Middle)
    sortedListToBSTTwoPointer(head) {
        if (head === null) return null;
        if (head.next === null) return new TreeNode(head.val);
        
        // Find middle element using two pointers
        let slow = head;
        let fast = head;
        let prev = null;
        
        while (fast !== null && fast.next !== null) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // Create root node
        const root = new TreeNode(slow.val);
        
        // Split the list
        if (prev !== null) {
            prev.next = null;
            root.left = this.sortedListToBSTTwoPointer(head);
        }
        
        root.right = this.sortedListToBSTTwoPointer(slow.next);
        
        return root;
    }
    
    // Approach 4: Optimized Two-Pointer with Tail Pointer
    sortedListToBSTOptimized(head) {
        if (head === null) return null;
        
        // Find the tail of the list
        let tail = head;
        while (tail.next !== null) {
            tail = tail.next;
        }
        
        return this.buildBST(head, tail);
    }
    
    buildBST(head, tail) {
        if (head === null || head.val > tail.val) return null;
        if (head === tail) return new TreeNode(head.val);
        
        // Find middle element
        let slow = head;
        let fast = head;
        let prev = null;
        
        while (fast !== tail && fast.next !== tail) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // Create root node
        const root = new TreeNode(slow.val);
        
        // Build left subtree
        if (prev !== null) {
            root.left = this.buildBST(head, prev);
        }
        
        // Build right subtree
        root.right = this.buildBST(slow.next, tail);
        
        return root;
    }
    
    // Approach 5: Iterative Approach with Stack
    sortedListToBSTIterative(head) {
        if (head === null) return null;
        
        // Convert to array first
        const values = [];
        let current = head;
        while (current !== null) {
            values.push(current.val);
            current = current.next;
        }
        
        // Build BST iteratively using stack
        const stack = [];
        const root = new TreeNode(values[Math.floor(values.length / 2)]);
        stack.push({ node: root, left: 0, right: values.length - 1 });
        
        while (stack.length > 0) {
            const { node, left, right } = stack.pop();
            const mid = Math.floor((left + right) / 2);
            
            // Build left subtree
            if (left < mid) {
                const leftMid = Math.floor((left + mid - 1) / 2);
                node.left = new TreeNode(values[leftMid]);
                stack.push({ node: node.left, left, right: mid - 1 });
            }
            
            // Build right subtree
            if (mid + 1 < right) {
                const rightMid = Math.floor((mid + 1 + right) / 2);
                node.right = new TreeNode(values[rightMid]);
                stack.push({ node: node.right, left: mid + 1, right });
            }
        }
        
        return root;
    }
    
    // Approach 6: Morris-like Traversal (Space O(1) but modifies original list)
    sortedListToBSTMorris(head) {
        if (head === null) return null;
        
        const size = this.getSize(head);
        return this.buildBSTMorris(head, 0, size - 1);
    }
    
    buildBSTMorris(head, left, right) {
        if (left > right) return null;
        
        const mid = Math.floor((left + right) / 2);
        
        // Find the middle node
        let current = head;
        for (let i = 0; i < mid; i++) {
            current = current.next;
        }
        
        const root = new TreeNode(current.val);
        root.left = this.buildBSTMorris(head, left, mid - 1);
        root.right = this.buildBSTMorris(head, mid + 1, right);
        
        return root;
    }
}

// Test function
function testConvertLinkedToTree() {
    const solution = new Solution();
    
    // Test Case 1: [-10,-3,0,5,9]
    // Expected BST:
    //       0
    //      / \
    //    -3   9
    //    /   /
    //  -10   5
    const head1 = new ListNode(-10);
    head1.next = new ListNode(-3);
    head1.next.next = new ListNode(0);
    head1.next.next.next = new ListNode(5);
    head1.next.next.next.next = new ListNode(9);
    
    const result1 = solution.sortedListToBST(head1);
    console.log("Test Case 1:", result1 !== null ? "BST created successfully" : "Failed");
    
    // Test Case 2: Empty list
    const result2 = solution.sortedListToBST(null);
    console.log("Test Case 2 (Empty):", result2 === null ? "Correct" : "Failed");
    
    // Test Case 3: Single element
    const head3 = new ListNode(1);
    const result3 = solution.sortedListToBST(head3);
    console.log("Test Case 3 (Single):", result3 !== null && result3.val === 1 ? "Correct" : "Failed");
    
    // Test Case 4: Two elements
    const head4 = new ListNode(1);
    head4.next = new ListNode(2);
    const result4 = solution.sortedListToBST(head4);
    console.log("Test Case 4 (Two elements):", result4 !== null ? "BST created successfully" : "Failed");
    
    // Test Case 5: Three elements
    const head5 = new ListNode(1);
    head5.next = new ListNode(2);
    head5.next.next = new ListNode(3);
    const result5 = solution.sortedListToBST(head5);
    console.log("Test Case 5 (Three elements):", result5 !== null ? "BST created successfully" : "Failed");
    
    // Test Case 6: Large list
    const head6 = new ListNode(1);
    let current = head6;
    for (let i = 2; i <= 10; i++) {
        current.next = new ListNode(i);
        current = current.next;
    }
    const result6 = solution.sortedListToBST(head6);
    console.log("Test Case 6 (Large list):", result6 !== null ? "BST created successfully" : "Failed");
    
    console.log("\n--- Testing all approaches ---");
    
    // Recreate test list for each approach
    let testHead = new ListNode(-10);
    testHead.next = new ListNode(-3);
    testHead.next.next = new ListNode(0);
    testHead.next.next.next = new ListNode(5);
    testHead.next.next.next.next = new ListNode(9);
    
    console.log("Inorder Approach:", solution.sortedListToBST(testHead) !== null ? "Success" : "Failed");
    
    // Recreate for array approach
    testHead = new ListNode(-10);
    testHead.next = new ListNode(-3);
    testHead.next.next = new ListNode(0);
    testHead.next.next.next = new ListNode(5);
    testHead.next.next.next.next = new ListNode(9);
    
    console.log("Array Approach:", solution.sortedListToBSTArray(testHead) !== null ? "Success" : "Failed");
    
    // Recreate for two-pointer approach
    testHead = new ListNode(-10);
    testHead.next = new ListNode(-3);
    testHead.next.next = new ListNode(0);
    testHead.next.next.next = new ListNode(5);
    testHead.next.next.next.next = new ListNode(9);
    
    console.log("Two-Pointer Approach:", solution.sortedListToBSTTwoPointer(testHead) !== null ? "Success" : "Failed");
    
    // Recreate for optimized approach
    testHead = new ListNode(-10);
    testHead.next = new ListNode(-3);
    testHead.next.next = new ListNode(0);
    testHead.next.next.next = new ListNode(5);
    testHead.next.next.next.next = new ListNode(9);
    
    console.log("Optimized Approach:", solution.sortedListToBSTOptimized(testHead) !== null ? "Success" : "Failed");
    
    // Recreate for iterative approach
    testHead = new ListNode(-10);
    testHead.next = new ListNode(-3);
    testHead.next.next = new ListNode(0);
    testHead.next.next.next = new ListNode(5);
    testHead.next.next.next.next = new ListNode(9);
    
    console.log("Iterative Approach:", solution.sortedListToBSTIterative(testHead) !== null ? "Success" : "Failed");
    
    // Recreate for Morris approach
    testHead = new ListNode(-10);
    testHead.next = new ListNode(-3);
    testHead.next.next = new ListNode(0);
    testHead.next.next.next = new ListNode(5);
    testHead.next.next.next.next = new ListNode(9);
    
    console.log("Morris Approach:", solution.sortedListToBSTMorris(testHead) !== null ? "Success" : "Failed");
}

// Run tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, ListNode, TreeNode };
} else {
    testConvertLinkedToTree();
} 