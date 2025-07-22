/**
 * 671. Second Minimum Node In a Binary Tree
 * 
 * Problem: Given a non-empty special binary tree consisting of nodes with non-negative values,
 * where each node has exactly two or zero sub-nodes. If a node has two sub-nodes, then this 
 * node's value is the smaller value among its two sub-nodes.
 * 
 * Find the second minimum value in the set of all nodes' values in the whole tree.
 * If no such second minimum value exists, output -1.
 * 
 * Approach:
 * 1. BFS/Level Order Traversal: Use queue to traverse the tree level by level
 *    - Keep track of the minimum value (root.val)
 *    - Find the second minimum value that is greater than the minimum
 *    - Only explore children of nodes with value equal to minimum (optimization)
 * 
 * 2. DFS/Recursive Approach: Traverse the entire tree and collect all unique values
 *    - Use a set to store unique values
 *    - Find the second minimum from the set
 * 
 * 3. Optimized DFS: Early termination when we find second minimum
 *    - Stop exploring when we find a value greater than minimum
 *    - Keep track of the smallest value greater than minimum
 * 
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(w) where w is the maximum width of the tree (for BFS)
 *                  O(h) where h is the height of the tree (for DFS recursion stack)
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
    
    // Approach 1: BFS/Level Order Traversal (Optimized)
    findSecondMinimumValue(root) {
        if (root === null) return -1;
        
        const min = root.val;
        let second = Number.MAX_SAFE_INTEGER;
        const queue = [root];
        
        while (queue.length > 0) {
            const size = queue.length;
            for (let i = 0; i < size; i++) {
                const node = queue.shift();
                if (node !== null) {
                    if (node.val > min && node.val < second) {
                        second = node.val;
                    } else if (node.val === min) {
                        // Only explore children if current node has minimum value
                        if (node.left !== null) queue.push(node.left);
                        if (node.right !== null) queue.push(node.right);
                    }
                }
            }
        }
        
        return (second < Number.MAX_SAFE_INTEGER) ? second : -1;
    }
    
    // Approach 2: DFS with Set (Collect all unique values)
    findSecondMinimumValueDFS(root) {
        if (root === null) return -1;
        
        const values = new Set();
        this.collectValues(root, values);
        
        if (values.size < 2) return -1;
        
        // Find second minimum
        const min = root.val;
        let secondMin = Number.MAX_SAFE_INTEGER;
        
        for (const val of values) {
            if (val > min && val < secondMin) {
                secondMin = val;
            }
        }
        
        return (secondMin < Number.MAX_SAFE_INTEGER) ? secondMin : -1;
    }
    
    collectValues(node, values) {
        if (node === null) return;
        
        values.add(node.val);
        this.collectValues(node.left, values);
        this.collectValues(node.right, values);
    }
    
    // Approach 3: Optimized DFS (Early termination)
    findSecondMinimumValueOptimized(root) {
        if (root === null) return -1;
        
        const min = root.val;
        let secondMin = Number.MAX_SAFE_INTEGER;
        
        this.findSecondMinHelper(root, min, secondMin);
        
        return (secondMin < Number.MAX_SAFE_INTEGER) ? secondMin : -1;
    }
    
    findSecondMinHelper(node, min, secondMin) {
        if (node === null) return;
        
        if (node.val > min && node.val < secondMin) {
            secondMin = node.val;
        }
        
        // Only explore if current node has minimum value
        if (node.val === min) {
            this.findSecondMinHelper(node.left, min, secondMin);
            this.findSecondMinHelper(node.right, min, secondMin);
        }
    }
    
    // Approach 4: Inorder Traversal with Early Termination
    findSecondMinimumValueInorder(root) {
        if (root === null) return -1;
        
        const min = root.val;
        let secondMin = Number.MAX_SAFE_INTEGER;
        
        this.inorderTraversal(root, min, secondMin);
        
        return (secondMin < Number.MAX_SAFE_INTEGER) ? secondMin : -1;
    }
    
    inorderTraversal(node, min, secondMin) {
        if (node === null) return;
        
        this.inorderTraversal(node.left, min, secondMin);
        
        if (node.val > min && node.val < secondMin) {
            secondMin = node.val;
        }
        
        this.inorderTraversal(node.right, min, secondMin);
    }
    
    // Approach 5: Iterative DFS with Stack
    findSecondMinimumValueIterative(root) {
        if (root === null) return -1;
        
        const min = root.val;
        let secondMin = Number.MAX_SAFE_INTEGER;
        const stack = [root];
        
        while (stack.length > 0) {
            const node = stack.pop();
            
            if (node.val > min && node.val < secondMin) {
                secondMin = node.val;
            }
            
            // Only explore children if current node has minimum value
            if (node.val === min) {
                if (node.right !== null) stack.push(node.right);
                if (node.left !== null) stack.push(node.left);
            }
        }
        
        return (secondMin < Number.MAX_SAFE_INTEGER) ? secondMin : -1;
    }
    
    // Approach 6: Priority Queue (Min Heap) approach
    findSecondMinimumValueHeap(root) {
        if (root === null) return -1;
        
        const minHeap = [];
        this.collectValuesForHeap(root, minHeap);
        
        if (minHeap.length < 2) return -1;
        
        // Remove duplicates and find second minimum
        const uniqueValues = [...new Set(minHeap)].sort((a, b) => a - b);
        
        return uniqueValues.length >= 2 ? uniqueValues[1] : -1;
    }
    
    collectValuesForHeap(node, heap) {
        if (node === null) return;
        
        heap.push(node.val);
        this.collectValuesForHeap(node.left, heap);
        this.collectValuesForHeap(node.right, heap);
    }
}

// Test function
function testSecondMinNodeInBST() {
    const solution = new Solution();
    
    // Test Case 1: [2,2,5,null,null,5,7]
    //       2
    //      / \
    //     2   5
    //        / \
    //       5   7
    const root1 = new TreeNode(2);
    root1.left = new TreeNode(2);
    root1.right = new TreeNode(5);
    root1.right.left = new TreeNode(5);
    root1.right.right = new TreeNode(7);
    
    console.log("Test Case 1:", solution.findSecondMinimumValue(root1)); // Expected: 5
    
    // Test Case 2: [2,2,2]
    //       2
    //      / \
    //     2   2
    const root2 = new TreeNode(2);
    root2.left = new TreeNode(2);
    root2.right = new TreeNode(2);
    
    console.log("Test Case 2:", solution.findSecondMinimumValue(root2)); // Expected: -1
    
    // Test Case 3: [1,1,3,1,1,3,4,3,1,1,1,3,8,4,8,3,3,1,6,2,1]
    // Complex tree with multiple levels
    const root3 = new TreeNode(1);
    root3.left = new TreeNode(1);
    root3.right = new TreeNode(3);
    root3.left.left = new TreeNode(1);
    root3.left.right = new TreeNode(1);
    root3.right.left = new TreeNode(3);
    root3.right.right = new TreeNode(4);
    
    console.log("Test Case 3:", solution.findSecondMinimumValue(root3)); // Expected: 3
    
    // Test Case 4: Single node
    const root4 = new TreeNode(1);
    console.log("Test Case 4:", solution.findSecondMinimumValue(root4)); // Expected: -1
    
    // Test Case 5: [2,2,2147483647]
    // Edge case with INT_MAX
    const root5 = new TreeNode(2);
    root5.left = new TreeNode(2);
    root5.right = new TreeNode(2147483647);
    
    console.log("Test Case 5:", solution.findSecondMinimumValue(root5)); // Expected: 2147483647
    
    // Test Case 6: [1,1,1,1,3,3,3]
    //       1
    //      / \
    //     1   1
    //    / \ / \
    //   1  3 3  3
    const root6 = new TreeNode(1);
    root6.left = new TreeNode(1);
    root6.right = new TreeNode(1);
    root6.left.left = new TreeNode(1);
    root6.left.right = new TreeNode(3);
    root6.right.left = new TreeNode(3);
    root6.right.right = new TreeNode(3);
    
    console.log("Test Case 6:", solution.findSecondMinimumValue(root6)); // Expected: 3
    
    console.log("\n--- Testing all approaches ---");
    console.log("BFS Approach:", solution.findSecondMinimumValue(root1));
    console.log("DFS with Set:", solution.findSecondMinimumValueDFS(root1));
    console.log("Optimized DFS:", solution.findSecondMinimumValueOptimized(root1));
    console.log("Inorder DFS:", solution.findSecondMinimumValueInorder(root1));
    console.log("Iterative DFS:", solution.findSecondMinimumValueIterative(root1));
    console.log("Heap Approach:", solution.findSecondMinimumValueHeap(root1));
}

// Run tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, TreeNode };
} else {
    testSecondMinNodeInBST();
} 