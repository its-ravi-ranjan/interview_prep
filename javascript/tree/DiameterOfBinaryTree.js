/**
 * Diameter of Binary Tree
 * 
 * Problem:
 * Given the root of a binary tree, return the length of the diameter of the tree.
 * The diameter of a binary tree is the length of the longest path between any two nodes in a tree.
 * This path may or may not pass through the root.
 * The length of a path between two nodes is represented by the number of edges between them.
 * 
 * Example:
 * Input: root = [1,2,3,4,5]
 * Output: 3
 * Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
 * 
 * Approach:
 * 1. Using array to store diameter
 * 2. Using class variable to store diameter
 * Both approaches use DFS to calculate depths and update diameter
 */

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class DiameterOfBinaryTree {
    // Approach 1: Using array to store diameter
    diameterOfBinaryTree(root) {
        const diameter = [0];
        this.depth(root, diameter);
        return diameter[0];
    }

    depth(node, diameter) {
        if (!node) return 0;
        const left = this.depth(node.left, diameter);
        const right = this.depth(node.right, diameter);
        diameter[0] = Math.max(diameter[0], left + right);
        return Math.max(left, right) + 1;
    }

    // Approach 2: Using class variable
    constructor() {
        this.maxDiameter = 0;
    }

    diameterOfBinaryTreeClassVar(root) {
        this.maxDiameter = 0;
        this.depthClassVar(root);
        return this.maxDiameter;
    }

    depthClassVar(node) {
        if (!node) return 0;
        const left = this.depthClassVar(node.left);
        const right = this.depthClassVar(node.right);
        this.maxDiameter = Math.max(this.maxDiameter, left + right);
        return Math.max(left, right) + 1;
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
    const solution = new DiameterOfBinaryTree();
    
    // Test case 1: Basic tree from example
    console.log("Test case 1: Basic tree [1,2,3,4,5]");
    const root1 = DiameterOfBinaryTree.createTree([1, 2, 3, 4, 5]);
    console.log("Array approach:", solution.diameterOfBinaryTree(root1));
    console.log("Class variable approach:", solution.diameterOfBinaryTreeClassVar(root1));

    // Test case 2: Empty tree
    console.log("\nTest case 2: Empty tree");
    const root2 = null;
    console.log("Array approach:", solution.diameterOfBinaryTree(root2));
    console.log("Class variable approach:", solution.diameterOfBinaryTreeClassVar(root2));

    // Test case 3: Single node
    console.log("\nTest case 3: Single node [1]");
    const root3 = DiameterOfBinaryTree.createTree([1]);
    console.log("Array approach:", solution.diameterOfBinaryTree(root3));
    console.log("Class variable approach:", solution.diameterOfBinaryTreeClassVar(root3));

    // Test case 4: Left skewed tree
    console.log("\nTest case 4: Left skewed tree [1,2,null,3]");
    const root4 = DiameterOfBinaryTree.createTree([1, 2, null, 3]);
    console.log("Array approach:", solution.diameterOfBinaryTree(root4));
    console.log("Class variable approach:", solution.diameterOfBinaryTreeClassVar(root4));

    // Test case 5: Right skewed tree
    console.log("\nTest case 5: Right skewed tree [1,null,2,null,3]");
    const root5 = DiameterOfBinaryTree.createTree([1, null, 2, null, 3]);
    console.log("Array approach:", solution.diameterOfBinaryTree(root5));
    console.log("Class variable approach:", solution.diameterOfBinaryTreeClassVar(root5));

    // Test case 6: Complex tree
    console.log("\nTest case 6: Complex tree [1,2,3,4,5,6,7,8,9]");
    const root6 = DiameterOfBinaryTree.createTree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    console.log("Array approach:", solution.diameterOfBinaryTree(root6));
    console.log("Class variable approach:", solution.diameterOfBinaryTreeClassVar(root6));
}

// Run the tests
runTests(); 