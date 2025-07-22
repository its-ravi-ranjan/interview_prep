/**
 * 110. Balanced Binary Tree
 * 
 * Problem: Given a binary tree, determine if it is height-balanced.
 * 
 * A height-balanced binary tree is a binary tree in which the depth of the two subtrees 
 * of every node never differs by more than one.
 * 
 * Approach:
 * 1. Bottom-Up DFS with Height Calculation:
 *    - Use DFS to calculate height of each subtree
 *    - Return -1 if any subtree is unbalanced
 *    - Return actual height if subtree is balanced
 *    - Check balance condition: |left_height - right_height| <= 1
 * 
 * 2. Top-Down DFS with Height Calculation:
 *    - Calculate height for each node separately
 *    - Check balance condition at each node
 *    - Less efficient as height is calculated multiple times
 * 
 * 3. Iterative Approach with Stack:
 *    - Use postorder traversal with stack
 *    - Track heights and balance condition
 *    - More complex but avoids recursion
 * 
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(h) where h is the height of the tree (recursion stack)
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
    
    // Approach 1: Bottom-Up DFS with Height Calculation (Most Efficient)
    isBalanced(root) {
        return this.dfs(root) !== -1;
    }
    
    dfs(root) {
        if (root === null) return 0;
        
        // Check left subtree
        const left = this.dfs(root.left);
        if (left === -1) return -1; // Left subtree is unbalanced
        
        // Check right subtree
        const right = this.dfs(root.right);
        if (right === -1) return -1; // Right subtree is unbalanced
        
        // Check balance condition
        if (Math.abs(left - right) > 1) return -1; // Current node is unbalanced
        
        // Return height of current subtree
        return Math.max(left, right) + 1;
    }
    
    // Approach 2: Top-Down DFS with Height Calculation
    isBalancedTopDown(root) {
        if (root === null) return true;
        
        // Check balance condition at current node
        if (Math.abs(this.getHeight(root.left) - this.getHeight(root.right)) > 1) {
            return false;
        }
        
        // Recursively check left and right subtrees
        return this.isBalancedTopDown(root.left) && this.isBalancedTopDown(root.right);
    }
    
    getHeight(node) {
        if (node === null) return 0;
        return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }
    
    // Approach 3: Iterative Approach with Stack
    isBalancedIterative(root) {
        if (root === null) return true;
        
        const stack = [];
        const heights = new Map();
        
        // Postorder traversal
        let current = root;
        let lastVisited = null;
        
        while (current !== null || stack.length > 0) {
            // Go to leftmost node
            while (current !== null) {
                stack.push(current);
                current = current.left;
            }
            
            current = stack[stack.length - 1];
            
            // Check if right subtree is processed
            if (current.right === null || current.right === lastVisited) {
                stack.pop();
                
                // Calculate height of current node
                const leftHeight = heights.get(current.left) || 0;
                const rightHeight = heights.get(current.right) || 0;
                
                // Check balance condition
                if (Math.abs(leftHeight - rightHeight) > 1) {
                    return false;
                }
                
                heights.set(current, Math.max(leftHeight, rightHeight) + 1);
                lastVisited = current;
                current = null;
            } else {
                current = current.right;
            }
        }
        
        return true;
    }
    
    // Approach 4: Enhanced Bottom-Up with Early Termination
    isBalancedEnhanced(root) {
        return this.checkBalance(root) !== -1;
    }
    
    checkBalance(node) {
        if (node === null) return 0;
        
        // Check left subtree first
        const leftHeight = this.checkBalance(node.left);
        if (leftHeight === -1) return -1;
        
        // Check right subtree
        const rightHeight = this.checkBalance(node.right);
        if (rightHeight === -1) return -1;
        
        // Check balance condition
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }
        
        // Return height of current subtree
        return Math.max(leftHeight, rightHeight) + 1;
    }
    
    // Approach 5: BFS with Level Tracking (Alternative approach)
    isBalancedBFS(root) {
        if (root === null) return true;
        
        const queue = [root];
        
        while (queue.length > 0) {
            const node = queue.shift();
            
            // Check balance at current node
            if (!this.isNodeBalanced(node)) {
                return false;
            }
            
            // Add children to queue
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
        
        return true;
    }
    
    isNodeBalanced(node) {
        if (node === null) return true;
        
        const leftHeight = this.getHeightRecursive(node.left);
        const rightHeight = this.getHeightRecursive(node.right);
        
        return Math.abs(leftHeight - rightHeight) <= 1;
    }
    
    getHeightRecursive(node) {
        if (node === null) return 0;
        return Math.max(this.getHeightRecursive(node.left), this.getHeightRecursive(node.right)) + 1;
    }
    
    // Approach 6: Morris Traversal (Space O(1))
    isBalancedMorris(root) {
        if (root === null) return true;
        
        const heights = new Map();
        let current = root;
        
        while (current !== null) {
            if (current.left === null) {
                // Process current node
                if (!this.checkNodeBalance(current, heights)) {
                    return false;
                }
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
                    if (!this.checkNodeBalance(current, heights)) {
                        return false;
                    }
                    current = current.right;
                }
            }
        }
        
        return true;
    }
    
    checkNodeBalance(node, heights) {
        const leftHeight = heights.get(node.left) || 0;
        const rightHeight = heights.get(node.right) || 0;
        
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        }
        
        heights.set(node, Math.max(leftHeight, rightHeight) + 1);
        return true;
    }
    
    // Approach 7: Level Order Traversal with Height Tracking
    isBalancedLevelOrder(root) {
        if (root === null) return true;
        
        const queue = [root];
        const levels = new Map();
        levels.set(root, 0);
        
        while (queue.length > 0) {
            const node = queue.shift();
            const level = levels.get(node);
            
            // Check balance at current node
            if (!this.checkBalanceAtLevel(node, level, levels)) {
                return false;
            }
            
            // Add children to queue
            if (node.left !== null) {
                queue.push(node.left);
                levels.set(node.left, level + 1);
            }
            if (node.right !== null) {
                queue.push(node.right);
                levels.set(node.right, level + 1);
            }
        }
        
        return true;
    }
    
    checkBalanceAtLevel(node, level, levels) {
        const leftHeight = this.getHeightFromLevel(node.left, level + 1, levels);
        const rightHeight = this.getHeightFromLevel(node.right, level + 1, levels);
        
        return Math.abs(leftHeight - rightHeight) <= 1;
    }
    
    getHeightFromLevel(node, startLevel, levels) {
        if (node === null) return 0;
        
        let maxLevel = startLevel;
        const queue = [node];
        const nodeLevels = new Map();
        nodeLevels.set(node, startLevel);
        
        while (queue.length > 0) {
            const current = queue.shift();
            const currentLevel = nodeLevels.get(current);
            maxLevel = Math.max(maxLevel, currentLevel);
            
            if (current.left !== null) {
                queue.push(current.left);
                nodeLevels.set(current.left, currentLevel + 1);
            }
            if (current.right !== null) {
                queue.push(current.right);
                nodeLevels.set(current.right, currentLevel + 1);
            }
        }
        
        return maxLevel - startLevel + 1;
    }
}

// Test function
function testBalanceTree() {
    const solution = new Solution();
    
    // Test Case 1: Balanced tree
    //       3
    //      / \
    //     9  20
    //        / \
    //       15  7
    const root1 = new TreeNode(3);
    root1.left = new TreeNode(9);
    root1.right = new TreeNode(20);
    root1.right.left = new TreeNode(15);
    root1.right.right = new TreeNode(7);
    
    console.log("Test Case 1 (Balanced):", solution.isBalanced(root1)); // Expected: true
    
    // Test Case 2: Unbalanced tree
    //       1
    //      / \
    //     2   2
    //    / \
    //   3   3
    //  / \
    // 4   4
    const root2 = new TreeNode(1);
    root2.left = new TreeNode(2);
    root2.right = new TreeNode(2);
    root2.left.left = new TreeNode(3);
    root2.left.right = new TreeNode(3);
    root2.left.left.left = new TreeNode(4);
    root2.left.left.right = new TreeNode(4);
    
    console.log("Test Case 2 (Unbalanced):", solution.isBalanced(root2)); // Expected: false
    
    // Test Case 3: Empty tree
    console.log("Test Case 3 (Empty):", solution.isBalanced(null)); // Expected: true
    
    // Test Case 4: Single node
    const root4 = new TreeNode(1);
    console.log("Test Case 4 (Single node):", solution.isBalanced(root4)); // Expected: true
    
    // Test Case 5: Left-skewed tree
    const root5 = new TreeNode(1);
    root5.left = new TreeNode(2);
    root5.left.left = new TreeNode(3);
    root5.left.left.left = new TreeNode(4);
    
    console.log("Test Case 5 (Left-skewed):", solution.isBalanced(root5)); // Expected: false
    
    // Test Case 6: Right-skewed tree
    const root6 = new TreeNode(1);
    root6.right = new TreeNode(2);
    root6.right.right = new TreeNode(3);
    root6.right.right.right = new TreeNode(4);
    
    console.log("Test Case 6 (Right-skewed):", solution.isBalanced(root6)); // Expected: false
    
    // Test Case 7: Perfectly balanced tree
    const root7 = new TreeNode(1);
    root7.left = new TreeNode(2);
    root7.right = new TreeNode(3);
    root7.left.left = new TreeNode(4);
    root7.left.right = new TreeNode(5);
    root7.right.left = new TreeNode(6);
    root7.right.right = new TreeNode(7);
    
    console.log("Test Case 7 (Perfectly balanced):", solution.isBalanced(root7)); // Expected: true
    
    console.log("\n--- Testing all approaches ---");
    
    // Recreate test cases for each approach
    let testRoot = new TreeNode(3);
    testRoot.left = new TreeNode(9);
    testRoot.right = new TreeNode(20);
    testRoot.right.left = new TreeNode(15);
    testRoot.right.right = new TreeNode(7);
    
    console.log("Bottom-Up DFS:", solution.isBalanced(testRoot));
    console.log("Top-Down DFS:", solution.isBalancedTopDown(testRoot));
    console.log("Iterative:", solution.isBalancedIterative(testRoot));
    console.log("Enhanced Bottom-Up:", solution.isBalancedEnhanced(testRoot));
    console.log("BFS Approach:", solution.isBalancedBFS(testRoot));
    console.log("Morris Traversal:", solution.isBalancedMorris(testRoot));
    console.log("Level Order:", solution.isBalancedLevelOrder(testRoot));
}

// Run tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, TreeNode };
} else {
    testBalanceTree();
} 