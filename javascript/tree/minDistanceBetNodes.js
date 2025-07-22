/**
 * 783. Minimum Distance Between BST Nodes
 * 
 * Problem: Given the root of a Binary Search Tree (BST), return the minimum 
 * difference between the values of any two different nodes in the tree.
 * 
 * Note: This question is the same as 530: Minimum Absolute Difference in BST
 * 
 * Approach:
 * 1. Inorder Traversal (Most Efficient):
 *    - Use inorder traversal to get nodes in sorted order
 *    - Keep track of previous node value
 *    - Calculate difference between current and previous node
 *    - Update minimum difference
 *    - Works because inorder traversal of BST gives sorted sequence
 * 
 * 2. Inorder Traversal with List:
 *    - Store all values in a list during inorder traversal
 *    - Find minimum difference between consecutive elements
 *    - Uses extra space but easier to understand
 * 
 * 3. Iterative Inorder Traversal:
 *    - Same logic as recursive but using stack
 *    - Avoids recursion stack space
 * 
 * 4. Morris Inorder Traversal:
 *    - Space-optimized inorder traversal
 *    - Uses O(1) space by modifying tree structure temporarily
 * 
 * 5. BFS with Sorting:
 *    - Collect all values using BFS
 *    - Sort the values
 *    - Find minimum difference
 *    - Less efficient but demonstrates BFS approach
 * 
 * Time Complexity: O(n) where n is the number of nodes
 *                  Inorder traversal visits each node once
 * Space Complexity: O(h) where h is the height of the tree
 *                   O(n) in worst case (skewed tree)
 *                   O(log n) in best case (balanced tree)
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
    
    // Approach 1: Inorder Traversal (Most Efficient)
    constructor() {
        this.min = Number.MAX_SAFE_INTEGER;
        this.prev = null;
    }
    
    minDiffInBST(root) {
        this.min = Number.MAX_SAFE_INTEGER;
        this.prev = null;
        this.inOrder(root);
        return this.min;
    }
    
    inOrder(root) {
        if (root === null) return;
        this.inOrder(root.left);
        if (this.prev !== null) {
            this.min = Math.min(this.min, root.val - this.prev);
        }
        this.prev = root.val;
        this.inOrder(root.right);
    }
    
    // Approach 2: Inorder Traversal with List
    minDiffInBSTWithList(root) {
        const values = [];
        this.inOrderCollect(root, values);
        
        let minDiff = Number.MAX_SAFE_INTEGER;
        for (let i = 1; i < values.length; i++) {
            minDiff = Math.min(minDiff, values[i] - values[i - 1]);
        }
        
        return minDiff;
    }
    
    inOrderCollect(root, values) {
        if (root === null) return;
        this.inOrderCollect(root.left, values);
        values.push(root.val);
        this.inOrderCollect(root.right, values);
    }
    
    // Approach 3: Iterative Inorder Traversal
    minDiffInBSTIterative(root) {
        if (root === null) return 0;
        
        const stack = [];
        let current = root;
        let prev = null;
        let minDiff = Number.MAX_SAFE_INTEGER;
        
        while (current !== null || stack.length > 0) {
            while (current !== null) {
                stack.push(current);
                current = current.left;
            }
            
            current = stack.pop();
            
            if (prev !== null) {
                minDiff = Math.min(minDiff, current.val - prev);
            }
            prev = current.val;
            
            current = current.right;
        }
        
        return minDiff;
    }
    
    // Approach 4: Morris Inorder Traversal (Space O(1))
    minDiffInBSTMorris(root) {
        if (root === null) return 0;
        
        let current = root;
        let prev = null;
        let minDiff = Number.MAX_SAFE_INTEGER;
        
        while (current !== null) {
            if (current.left === null) {
                // Process current node
                if (prev !== null) {
                    minDiff = Math.min(minDiff, current.val - prev);
                }
                prev = current.val;
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
                    if (prev !== null) {
                        minDiff = Math.min(minDiff, current.val - prev);
                    }
                    prev = current.val;
                    current = current.right;
                }
            }
        }
        
        return minDiff;
    }
    
    // Approach 5: BFS with Sorting
    minDiffInBSTBFS(root) {
        if (root === null) return 0;
        
        const values = [];
        const queue = [root];
        
        while (queue.length > 0) {
            const current = queue.shift();
            values.push(current.val);
            
            if (current.left !== null) {
                queue.push(current.left);
            }
            if (current.right !== null) {
                queue.push(current.right);
            }
        }
        
        values.sort((a, b) => a - b);
        
        let minDiff = Number.MAX_SAFE_INTEGER;
        for (let i = 1; i < values.length; i++) {
            minDiff = Math.min(minDiff, values[i] - values[i - 1]);
        }
        
        return minDiff;
    }
    
    // Approach 6: Enhanced Inorder with Early Termination
    minDiffInBSTEnhanced(root) {
        if (root === null) return 0;
        
        const result = [Number.MAX_SAFE_INTEGER];
        const prev = [null];
        
        this.inOrderEnhanced(root, result, prev);
        return result[0];
    }
    
    inOrderEnhanced(root, result, prev) {
        if (root === null) return;
        
        this.inOrderEnhanced(root.left, result, prev);
        
        if (prev[0] !== null) {
            result[0] = Math.min(result[0], root.val - prev[0]);
        }
        prev[0] = root.val;
        
        this.inOrderEnhanced(root.right, result, prev);
    }
    
    // Approach 7: Postorder with Range Tracking
    minDiffInBSTPostorder(root) {
        if (root === null) return 0;
        
        const result = [Number.MAX_SAFE_INTEGER];
        this.postorderMinDiff(root, result);
        return result[0];
    }
    
    postorderMinDiff(root, result) {
        if (root === null) return [-1, -1]; // [min, max]
        
        const left = this.postorderMinDiff(root.left, result);
        const right = this.postorderMinDiff(root.right, result);
        
        let min = root.val;
        let max = root.val;
        
        // Update min and max from left subtree
        if (left[0] !== -1) {
            min = Math.min(min, left[0]);
            result[0] = Math.min(result[0], root.val - left[1]);
        }
        
        // Update min and max from right subtree
        if (right[0] !== -1) {
            max = Math.max(max, right[1]);
            result[0] = Math.min(result[0], right[0] - root.val);
        }
        
        return [min, max];
    }
    
    // Approach 8: DFS with Global Variables
    minDiffInBSTDFS(root) {
        if (root === null) return 0;
        
        const minDiff = [Number.MAX_SAFE_INTEGER];
        const lastVal = [null];
        
        this.dfsMinDiff(root, minDiff, lastVal);
        return minDiff[0];
    }
    
    dfsMinDiff(root, minDiff, lastVal) {
        if (root === null) return;
        
        // Inorder traversal: left -> root -> right
        this.dfsMinDiff(root.left, minDiff, lastVal);
        
        if (lastVal[0] !== null) {
            minDiff[0] = Math.min(minDiff[0], root.val - lastVal[0]);
        }
        lastVal[0] = root.val;
        
        this.dfsMinDiff(root.right, minDiff, lastVal);
    }
    
    // Approach 9: Inorder with Array Reference
    minDiffInBSTArrayRef(root) {
        if (root === null) return 0;
        
        const state = {
            minDiff: Number.MAX_SAFE_INTEGER,
            prev: null
        };
        
        this.inOrderArrayRef(root, state);
        return state.minDiff;
    }
    
    inOrderArrayRef(root, state) {
        if (root === null) return;
        
        this.inOrderArrayRef(root.left, state);
        
        if (state.prev !== null) {
            state.minDiff = Math.min(state.minDiff, root.val - state.prev);
        }
        state.prev = root.val;
        
        this.inOrderArrayRef(root.right, state);
    }
    
    // Approach 10: Level Order with Inorder Check
    minDiffInBSTLevelOrder(root) {
        if (root === null) return 0;
        
        // First, get all values using level order
        const values = [];
        const queue = [root];
        
        while (queue.length > 0) {
            const current = queue.shift();
            values.push(current.val);
            
            if (current.left !== null) {
                queue.push(current.left);
            }
            if (current.right !== null) {
                queue.push(current.right);
            }
        }
        
        // Sort values (simulating inorder traversal)
        values.sort((a, b) => a - b);
        
        // Find minimum difference
        let minDiff = Number.MAX_SAFE_INTEGER;
        for (let i = 1; i < values.length; i++) {
            minDiff = Math.min(minDiff, values[i] - values[i - 1]);
        }
        
        return minDiff;
    }
    
    // Approach 11: Recursive with Closure
    minDiffInBSTClosure(root) {
        if (root === null) return 0;
        
        let minDiff = Number.MAX_SAFE_INTEGER;
        let prev = null;
        
        const inorder = (node) => {
            if (node === null) return;
            
            inorder(node.left);
            
            if (prev !== null) {
                minDiff = Math.min(minDiff, node.val - prev);
            }
            prev = node.val;
            
            inorder(node.right);
        };
        
        inorder(root);
        return minDiff;
    }
    
    // Approach 12: Two-Pass Approach
    minDiffInBSTTwoPass(root) {
        if (root === null) return 0;
        
        // First pass: collect all values
        const values = [];
        this.collectValues(root, values);
        
        // Second pass: find minimum difference
        if (values.length < 2) return 0;
        
        values.sort((a, b) => a - b);
        let minDiff = Number.MAX_SAFE_INTEGER;
        
        for (let i = 1; i < values.length; i++) {
            minDiff = Math.min(minDiff, values[i] - values[i - 1]);
        }
        
        return minDiff;
    }
    
    collectValues(root, values) {
        if (root === null) return;
        
        this.collectValues(root.left, values);
        values.push(root.val);
        this.collectValues(root.right, values);
    }
}

// Test function
function testMinDistanceBetNodes() {
    const solution = new Solution();
    
    // Test Case 1: Standard BST
    //       4
    //      / \
    //     2   6
    //    / \
    //   1   3
    const root1 = new TreeNode(4);
    root1.left = new TreeNode(2);
    root1.right = new TreeNode(6);
    root1.left.left = new TreeNode(1);
    root1.left.right = new TreeNode(3);
    
    console.log("Test Case 1 Min Diff:", solution.minDiffInBST(root1)); // Expected: 1
    
    // Test Case 2: Simple BST
    //       1
    //        \
    //         3
    //        /
    //       2
    const root2 = new TreeNode(1);
    root2.right = new TreeNode(3);
    root2.right.left = new TreeNode(2);
    
    console.log("Test Case 2 Min Diff:", solution.minDiffInBST(root2)); // Expected: 1
    
    // Test Case 3: Single node
    const root3 = new TreeNode(1);
    console.log("Test Case 3 Min Diff:", solution.minDiffInBST(root3)); // Expected: Number.MAX_SAFE_INTEGER (no difference)
    
    // Test Case 4: Left-skewed BST
    const root4 = new TreeNode(4);
    root4.left = new TreeNode(3);
    root4.left.left = new TreeNode(2);
    root4.left.left.left = new TreeNode(1);
    
    console.log("Test Case 4 Min Diff:", solution.minDiffInBST(root4)); // Expected: 1
    
    // Test Case 5: Right-skewed BST
    const root5 = new TreeNode(1);
    root5.right = new TreeNode(2);
    root5.right.right = new TreeNode(3);
    root5.right.right.right = new TreeNode(4);
    
    console.log("Test Case 5 Min Diff:", solution.minDiffInBST(root5)); // Expected: 1
    
    // Test Case 6: Balanced BST with larger differences
    //       10
    //      /  \
    //     5    15
    //    / \   / \
    //   3   7 12  18
    const root6 = new TreeNode(10);
    root6.left = new TreeNode(5);
    root6.right = new TreeNode(15);
    root6.left.left = new TreeNode(3);
    root6.left.right = new TreeNode(7);
    root6.right.left = new TreeNode(12);
    root6.right.right = new TreeNode(18);
    
    console.log("Test Case 6 Min Diff:", solution.minDiffInBST(root6)); // Expected: 2 (12-10)
    
    // Test Case 7: BST with duplicate-like values
    //       5
    //      / \
    //     4   6
    //    /     \
    //   3       7
    const root7 = new TreeNode(5);
    root7.left = new TreeNode(4);
    root7.right = new TreeNode(6);
    root7.left.left = new TreeNode(3);
    root7.right.right = new TreeNode(7);
    
    console.log("Test Case 7 Min Diff:", solution.minDiffInBST(root7)); // Expected: 1
    
    // Test Case 8: Large BST
    //       50
    //      /  \
    //     30   70
    //    /  \  / \
    //   20  40 60 80
    const root8 = new TreeNode(50);
    root8.left = new TreeNode(30);
    root8.right = new TreeNode(70);
    root8.left.left = new TreeNode(20);
    root8.left.right = new TreeNode(40);
    root8.right.left = new TreeNode(60);
    root8.right.right = new TreeNode(80);
    
    console.log("Test Case 8 Min Diff:", solution.minDiffInBST(root8)); // Expected: 10
    
    // Test Case 9: Edge case with equal values
    const root9 = new TreeNode(2);
    root9.left = new TreeNode(2);
    root9.right = new TreeNode(2);
    
    console.log("Test Case 9 Min Diff:", solution.minDiffInBST(root9)); // Expected: 0
    
    // Test Case 10: Null root
    console.log("Test Case 10 Min Diff:", solution.minDiffInBSTIterative(null)); // Expected: 0
    
    console.log("\n--- Testing all approaches ---");
    
    // Recreate test tree for each approach
    const testRoot = new TreeNode(4);
    testRoot.left = new TreeNode(2);
    testRoot.right = new TreeNode(6);
    testRoot.left.left = new TreeNode(1);
    testRoot.left.right = new TreeNode(3);
    
    console.log("Inorder Traversal:", solution.minDiffInBST(testRoot));
    console.log("Inorder with List:", solution.minDiffInBSTWithList(testRoot));
    console.log("Iterative Inorder:", solution.minDiffInBSTIterative(testRoot));
    console.log("Morris Traversal:", solution.minDiffInBSTMorris(testRoot));
    console.log("BFS with Sorting:", solution.minDiffInBSTBFS(testRoot));
    console.log("Enhanced Inorder:", solution.minDiffInBSTEnhanced(testRoot));
    console.log("Postorder Range:", solution.minDiffInBSTPostorder(testRoot));
    console.log("DFS Global:", solution.minDiffInBSTDFS(testRoot));
    console.log("Array Reference:", solution.minDiffInBSTArrayRef(testRoot));
    console.log("Level Order:", solution.minDiffInBSTLevelOrder(testRoot));
    console.log("Closure Approach:", solution.minDiffInBSTClosure(testRoot));
    console.log("Two-Pass:", solution.minDiffInBSTTwoPass(testRoot));
}

// Run tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, TreeNode };
} else {
    testMinDistanceBetNodes();
} 