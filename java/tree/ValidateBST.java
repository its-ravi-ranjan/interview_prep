/**
 * 98. Validate Binary Search Tree
 * 
 * Approach:
 * 1. Inorder Traversal Approach: Perform inorder traversal of the BST
 *    - Inorder traversal of a valid BST should give elements in ascending order
 *    - If we find any element that is less than or equal to the previous element, it's not a valid BST
 * 
 * 2. Recursive Approach with Range Validation:
 *    - Each node should be within a valid range (min, max)
 *    - Left child should be less than current node
 *    - Right child should be greater than current node
 *    - Pass down the valid range for each subtree
 * 
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(h) where h is the height of the tree (due to recursion stack)
 *                  In worst case (skewed tree): O(n)
 *                  In best case (balanced tree): O(log n)
 */

import java.util.*;

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
    
    // Approach 1: Inorder Traversal (Iterative)
    public boolean isValidBST(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode node = root;
        
        while (node != null || !stack.isEmpty()) {
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
            node = stack.pop();
            
            int size = result.size();
            if (size == 0) {
                result.add(node.val);
            } else {
                if (result.get(size - 1) >= node.val) {
                    return false;
                }
                result.add(node.val);
            }
            node = node.right;
        }
        return true;
    }
    
    // Approach 2: Inorder Traversal (Recursive)
    private TreeNode prev = null;
    
    public boolean isValidBSTRecursive(TreeNode root) {
        return inorderTraversal(root);
    }
    
    private boolean inorderTraversal(TreeNode node) {
        if (node == null) {
            return true;
        }
        
        // Check left subtree
        if (!inorderTraversal(node.left)) {
            return false;
        }
        
        // Check current node
        if (prev != null && prev.val >= node.val) {
            return false;
        }
        prev = node;
        
        // Check right subtree
        return inorderTraversal(node.right);
    }
    
    // Approach 3: Range Validation (Recursive)
    public boolean isValidBSTRange(TreeNode root) {
        return isValidBSTHelper(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    
    private boolean isValidBSTHelper(TreeNode node, long min, long max) {
        if (node == null) {
            return true;
        }
        
        // Check if current node is within valid range
        if (node.val <= min || node.val >= max) {
            return false;
        }
        
        // Recursively check left and right subtrees
        return isValidBSTHelper(node.left, min, node.val) && 
               isValidBSTHelper(node.right, node.val, max);
    }
}

// Test class
class ValidateBSTTest {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test Case 1: Valid BST
        //       5
        //      / \
        //     3   7
        //    / \
        //   1   4
        TreeNode root1 = new TreeNode(5);
        root1.left = new TreeNode(3);
        root1.right = new TreeNode(7);
        root1.left.left = new TreeNode(1);
        root1.left.right = new TreeNode(4);
        
        System.out.println("Test Case 1 (Valid BST): " + solution.isValidBST(root1)); // Expected: true
        
        // Test Case 2: Invalid BST
        //       5
        //      / \
        //     3   7
        //    / \
        //   1   6  (6 > 5, which violates BST property)
        TreeNode root2 = new TreeNode(5);
        root2.left = new TreeNode(3);
        root2.right = new TreeNode(7);
        root2.left.left = new TreeNode(1);
        root2.left.right = new TreeNode(6);
        
        System.out.println("Test Case 2 (Invalid BST): " + solution.isValidBST(root2)); // Expected: false
        
        // Test Case 3: Empty tree
        System.out.println("Test Case 3 (Empty tree): " + solution.isValidBST(null)); // Expected: true
        
        // Test Case 4: Single node
        TreeNode root4 = new TreeNode(1);
        System.out.println("Test Case 4 (Single node): " + solution.isValidBST(root4)); // Expected: true
        
        // Test Case 5: Duplicate values (should be invalid)
        //       2
        //      / \
        //     2   2
        TreeNode root5 = new TreeNode(2);
        root5.left = new TreeNode(2);
        root5.right = new TreeNode(2);
        
        System.out.println("Test Case 5 (Duplicate values): " + solution.isValidBST(root5)); // Expected: false
    }
} 