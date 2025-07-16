/**
 * Maximum Depth of Binary Tree
 * 
 * Problem:
 * Given the root of a binary tree, return its maximum depth.
 * A binary tree's maximum depth is the number of nodes along the longest path
 * from the root node down to the farthest leaf node.
 * 
 * Example:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: 3
 * 
 * Approach:
 * 1. BFS: Count levels while traversing
 * 2. DFS: Recursively find max depth of left and right subtrees
 */

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class MaxDepth {
    // BFS approach
    maxDepth(root) {
        let depth = 0;
        if (!root) return depth;
        
        const queue = [root];
        
        while (queue.length > 0) {
            const size = queue.length;
            for (let i = 0; i < size; i++) {
                const node = queue.shift();
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            depth++;
        }
        return depth;
    }

    // DFS approach
    maxDepthDFS(root) {
        if (!root) return 0;
        return Math.max(this.maxDepthDFS(root.left), this.maxDepthDFS(root.right)) + 1;
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
    const solution = new MaxDepth();
    
    // Test case 1: Basic tree
    console.log("Test case 1: Basic tree [3,9,20,null,null,15,7]");
    const root1 = MaxDepth.createTree([3, 9, 20, null, null, 15, 7]);
    console.log("BFS approach:", solution.maxDepth(root1));
    console.log("DFS approach:", solution.maxDepthDFS(root1));

    // Test case 2: Empty tree
    console.log("\nTest case 2: Empty tree");
    const root2 = null;
    console.log("BFS approach:", solution.maxDepth(root2));
    console.log("DFS approach:", solution.maxDepthDFS(root2));

    // Test case 3: Single node
    console.log("\nTest case 3: Single node [1]");
    const root3 = MaxDepth.createTree([1]);
    console.log("BFS approach:", solution.maxDepth(root3));
    console.log("DFS approach:", solution.maxDepthDFS(root3));

    // Test case 4: Left skewed tree
    console.log("\nTest case 4: Left skewed tree [1,2,null,3]");
    const root4 = MaxDepth.createTree([1, 2, null, 3]);
    console.log("BFS approach:", solution.maxDepth(root4));
    console.log("DFS approach:", solution.maxDepthDFS(root4));

    // Test case 5: Right skewed tree
    console.log("\nTest case 5: Right skewed tree [1,null,2,null,3]");
    const root5 = MaxDepth.createTree([1, null, 2, null, 3]);
    console.log("BFS approach:", solution.maxDepth(root5));
    console.log("DFS approach:", solution.maxDepthDFS(root5));
}

// Run the tests
runTests(); 