/**
 * Inorder Traversal of Binary Tree
 * 
 * Problem:
 * Given the root of a binary tree, return the inorder traversal of its nodes' values.
 * 
 * Example:
 * Input: root = [1,null,2,3]
 * Output: [1,3,2]
 * 
 * Approach:
 * 1. Recursive DFS: Left -> Root -> Right
 * 2. Iterative using Stack
 * 3. Morris Traversal (O(1) space)
 */

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class InorderTraversal {
    // Recursive DFS approach
    inorderTraversal(root) {
        const result = [];
        this.dfs(root, result);
        return result;
    }

    dfs(root, result) {
        if (!root) return;
        this.dfs(root.left, result);
        result.push(root.val);
        this.dfs(root.right, result);
    }

    // Iterative approach using Stack
    inorderTraversalIterative(root) {
        const result = [];
        const stack = [];
        let current = root;
        
        while (current || stack.length > 0) {
            while (current) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            result.push(current.val);
            current = current.right;
        }
        return result;
    }

    // Morris Traversal (O(1) space)
    morrisInorderTraversal(root) {
        const result = [];
        let current = root;
        
        while (current) {
            if (!current.left) {
                result.push(current.val);
                current = current.right;
            } else {
                let predecessor = current.left;
                while (predecessor.right && predecessor.right !== current) {
                    predecessor = predecessor.right;
                }
                if (!predecessor.right) {
                    predecessor.right = current;
                    current = current.left;
                } else {
                    predecessor.right = null;
                    result.push(current.val);
                    current = current.right;
                }
            }
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
    const solution = new InorderTraversal();
    
    // Test case 1: Basic tree
    console.log("Test case 1: Basic tree [1,null,2,3]");
    const root1 = InorderTraversal.createTree([1, null, 2, 3]);
    console.log("Recursive:", solution.inorderTraversal(root1));
    console.log("Iterative:", solution.inorderTraversalIterative(root1));
    console.log("Morris:", solution.morrisInorderTraversal(root1));

    // Test case 2: Empty tree
    console.log("\nTest case 2: Empty tree");
    const root2 = null;
    console.log("Recursive:", solution.inorderTraversal(root2));
    console.log("Iterative:", solution.inorderTraversalIterative(root2));
    console.log("Morris:", solution.morrisInorderTraversal(root2));

    // Test case 3: Single node
    console.log("\nTest case 3: Single node [1]");
    const root3 = InorderTraversal.createTree([1]);
    console.log("Recursive:", solution.inorderTraversal(root3));
    console.log("Iterative:", solution.inorderTraversalIterative(root3));
    console.log("Morris:", solution.morrisInorderTraversal(root3));

    // Test case 4: Complete binary tree
    console.log("\nTest case 4: Complete binary tree [1,2,3,4,5]");
    const root4 = InorderTraversal.createTree([1, 2, 3, 4, 5]);
    console.log("Recursive:", solution.inorderTraversal(root4));
    console.log("Iterative:", solution.inorderTraversalIterative(root4));
    console.log("Morris:", solution.morrisInorderTraversal(root4));
}

// Run the tests
runTests(); 