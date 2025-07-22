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

// Definition for a binary tree node
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    
    // Approach 1: Inorder Traversal (Iterative)
    isValidBST(root) {
        const result = [];
        const stack = [];
        let node = root;
        
        while (node !== null || stack.length > 0) {
            while (node !== null) {
                stack.push(node);
                node = node.left;
            }
            node = stack.pop();
            
            const size = result.length;
            if (size === 0) {
                result.push(node.val);
            } else {
                if (result[size - 1] >= node.val) {
                    return false;
                }
                result.push(node.val);
            }
            node = node.right;
        }
        return true;
    }
    
    // Approach 2: Inorder Traversal (Recursive)
    isValidBSTRecursive(root) {
        let prev = null;
        
        const inorderTraversal = (node) => {
            if (node === null) {
                return true;
            }
            
            // Check left subtree
            if (!inorderTraversal(node.left)) {
                return false;
            }
            
            // Check current node
            if (prev !== null && prev.val >= node.val) {
                return false;
            }
            prev = node;
            
            // Check right subtree
            return inorderTraversal(node.right);
        };
        
        return inorderTraversal(root);
    }
    
    // Approach 3: Range Validation (Recursive)
    isValidBSTRange(root) {
        const isValidBSTHelper = (node, min, max) => {
            if (node === null) {
                return true;
            }
            
            // Check if current node is within valid range
            if (node.val <= min || node.val >= max) {
                return false;
            }
            
            // Recursively check left and right subtrees
            return isValidBSTHelper(node.left, min, node.val) && 
                   isValidBSTHelper(node.right, node.val, max);
        };
        
        return isValidBSTHelper(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    }
    
    // Approach 4: Morris Inorder Traversal (Space O(1))
    isValidBSTMorris(root) {
        let prev = null;
        let current = root;
        
        while (current !== null) {
            if (current.left === null) {
                // Process current node
                if (prev !== null && prev.val >= current.val) {
                    return false;
                }
                prev = current;
                current = current.right;
            } else {
                // Find inorder predecessor
                let predecessor = current.left;
                while (predecessor.right !== null && predecessor.right !== current) {
                    predecessor = predecessor.right;
                }
                
                if (predecessor.right === null) {
                    // Make current as right child of predecessor
                    predecessor.right = current;
                    current = current.left;
                } else {
                    // Revert the changes and process current node
                    predecessor.right = null;
                    if (prev !== null && prev.val >= current.val) {
                        return false;
                    }
                    prev = current;
                    current = current.right;
                }
            }
        }
        return true;
    }
}

// Test function
function testValidateBST() {
    const solution = new Solution();
    
    // Test Case 1: Valid BST
    //       5
    //      / \
    //     3   7
    //    / \
    //   1   4
    const root1 = new TreeNode(5);
    root1.left = new TreeNode(3);
    root1.right = new TreeNode(7);
    root1.left.left = new TreeNode(1);
    root1.left.right = new TreeNode(4);
    
    console.log("Test Case 1 (Valid BST):", solution.isValidBST(root1)); // Expected: true
    
    // Test Case 2: Invalid BST
    //       5
    //      / \
    //     3   7
    //    / \
    //   1   6  (6 > 5, which violates BST property)
    const root2 = new TreeNode(5);
    root2.left = new TreeNode(3);
    root2.right = new TreeNode(7);
    root2.left.left = new TreeNode(1);
    root2.left.right = new TreeNode(6);
    
    console.log("Test Case 2 (Invalid BST):", solution.isValidBST(root2)); // Expected: false
    
    // Test Case 3: Empty tree
    console.log("Test Case 3 (Empty tree):", solution.isValidBST(null)); // Expected: true
    
    // Test Case 4: Single node
    const root4 = new TreeNode(1);
    console.log("Test Case 4 (Single node):", solution.isValidBST(root4)); // Expected: true
    
    // Test Case 5: Duplicate values (should be invalid)
    //       2
    //      / \
    //     2   2
    const root5 = new TreeNode(2);
    root5.left = new TreeNode(2);
    root5.right = new TreeNode(2);
    
    console.log("Test Case 5 (Duplicate values):", solution.isValidBST(root5)); // Expected: false
    
    // Test Case 6: Edge case with INT_MIN and INT_MAX
    const root6 = new TreeNode(2147483647);
    root6.left = new TreeNode(-2147483648);
    console.log("Test Case 6 (Edge case):", solution.isValidBSTRange(root6)); // Expected: true
    
    console.log("\n--- Testing all approaches ---");
    console.log("Iterative Inorder:", solution.isValidBST(root1));
    console.log("Recursive Inorder:", solution.isValidBSTRecursive(root1));
    console.log("Range Validation:", solution.isValidBSTRange(root1));
    console.log("Morris Traversal:", solution.isValidBSTMorris(root1));
}

// Run tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, TreeNode };
} else {
    testValidateBST();
} 