/**
 * Level Order Traversal of Binary Tree
 * 
 * Problem 1:
 * Given the root of a binary tree, return the level order traversal of its nodes' values.
 * (i.e., from left to right, level by level).
 * 
 * Example:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: [[3],[9,20],[15,7]]
 * 
 * Problem 2:
 * Given the root of a binary tree, return the level order traversal of its nodes' values.
 * (i.e., from left to right, all nodes in a single list)
 * 
 * Example:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: [3,9,20,15,7]
 * 
 * Approach:
 * 1. Use BFS with Queue
 * 2. For level-by-level, keep track of level size
 */

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class LevelOrderTraversal {
    // Simple level order traversal (all nodes in a single list)
    levelOrderTraversal(root) {
        const result = [];
        if (!root) return result;
        
        const queue = [root];
        
        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return result;
    }

    // Level order traversal level by level
    levelOrder(root) {
        const result = [];
        if (!root) return result;
        
        const queue = [root];
        
        while (queue.length > 0) {
            const levelSize = queue.length;
            const levelItems = [];
            
            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();
                levelItems.push(node.val);
                
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            
            result.push(levelItems);
        }
        return result;
    }

    // Helper method to create a binary tree from array
    static createTree(arr) {
        if (!arr || arr.length === 0) return null;
        
        const root = new TreeNode(arr[0]);
        const queue = [root];
        let i = 1;
        
        while (queue.length > 0 && i < arr.length) {
            const current = queue.shift();
            
            if (i < arr.length && arr[i] !== null) {
                current.left = new TreeNode(arr[i]);
                queue.push(current.left);
            }
            i++;
            
            if (i < arr.length && arr[i] !== null) {
                current.right = new TreeNode(arr[i]);
                queue.push(current.right);
            }
            i++;
        }
        
        return root;
    }
}

// Test cases
function runTests() {
    const solution = new LevelOrderTraversal();
    
    // Test case 1: Basic tree
    console.log("Test case 1: Basic tree [3,9,20,null,null,15,7]");
    const root1 = LevelOrderTraversal.createTree([3, 9, 20, null, null, 15, 7]);
    console.log("Simple level order:", solution.levelOrderTraversal(root1));
    console.log("Level by level:", solution.levelOrder(root1));

    // Test case 2: Empty tree
    console.log("\nTest case 2: Empty tree");
    const root2 = null;
    console.log("Simple level order:", solution.levelOrderTraversal(root2));
    console.log("Level by level:", solution.levelOrder(root2));

    // Test case 3: Single node
    console.log("\nTest case 3: Single node [1]");
    const root3 = LevelOrderTraversal.createTree([1]);
    console.log("Simple level order:", solution.levelOrderTraversal(root3));
    console.log("Level by level:", solution.levelOrder(root3));

    // Test case 4: Complete binary tree
    console.log("\nTest case 4: Complete binary tree [1,2,3,4,5]");
    const root4 = LevelOrderTraversal.createTree([1, 2, 3, 4, 5]);
    console.log("Simple level order:", solution.levelOrderTraversal(root4));
    console.log("Level by level:", solution.levelOrder(root4));
}

// Run the tests
runTests(); 