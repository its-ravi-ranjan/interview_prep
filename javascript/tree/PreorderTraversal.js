/**
 * Preorder Traversal of Binary Tree
 * 
 * Problem:
 * Given the root of a binary tree, return the preorder traversal of its nodes' values.
 * 
 * Example:
 * Input: root = [1,null,2,3]
 * Output: [1,2,3]
 * 
 * Approach:
 * 1. Recursive DFS: Root -> Left -> Right
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

class PreorderTraversal {
    // Recursive DFS approach
    preorderTraversal(root) {
        const result = [];
        this.dfsPre(root, result);
        return result;
    }

    dfsPre(root, result) {
        if (!root) return;
        result.push(root.val);
        this.dfsPre(root.left, result);
        this.dfsPre(root.right, result);
    }

    // Iterative approach using Stack
    iterativePreorderTraversal(root) {
        const result = [];
        if (!root) return result;
        
        const stack = [root];
        
        while (stack.length > 0) {
            const node = stack.pop();
            result.push(node.val);
            
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }
        return result;
    }

    // Morris Traversal (O(1) space)
    morrisPreorderTraversal(root) {
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
                    result.push(current.val);
                    current = current.left;
                } else {
                    predecessor.right = null;
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
    const solution = new PreorderTraversal();
    
    // Test case 1: Basic tree
    console.log("Test case 1: Basic tree [1,null,2,3]");
    const root1 = PreorderTraversal.createTree([1, null, 2, 3]);
    console.log("Recursive:", solution.preorderTraversal(root1));
    console.log("Iterative:", solution.iterativePreorderTraversal(root1));
    console.log("Morris:", solution.morrisPreorderTraversal(root1));

    // Test case 2: Empty tree
    console.log("\nTest case 2: Empty tree");
    const root2 = null;
    console.log("Recursive:", solution.preorderTraversal(root2));
    console.log("Iterative:", solution.iterativePreorderTraversal(root2));
    console.log("Morris:", solution.morrisPreorderTraversal(root2));

    // Test case 3: Single node
    console.log("\nTest case 3: Single node [1]");
    const root3 = PreorderTraversal.createTree([1]);
    console.log("Recursive:", solution.preorderTraversal(root3));
    console.log("Iterative:", solution.iterativePreorderTraversal(root3));
    console.log("Morris:", solution.morrisPreorderTraversal(root3));

    // Test case 4: Complete binary tree
    console.log("\nTest case 4: Complete binary tree [1,2,3,4,5]");
    const root4 = PreorderTraversal.createTree([1, 2, 3, 4, 5]);
    console.log("Recursive:", solution.preorderTraversal(root4));
    console.log("Iterative:", solution.iterativePreorderTraversal(root4));
    console.log("Morris:", solution.morrisPreorderTraversal(root4));
}

// Run the tests
runTests(); 