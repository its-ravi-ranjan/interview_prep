/**
 * Postorder Traversal of Binary Tree
 * 
 * Problem:
 * Given the root of a binary tree, return the postorder traversal of its nodes' values.
 * 
 * Example:
 * Input: root = [1,null,2,3]
 * Output: [3,2,1]
 * 
 * Approach:
 * 1. Recursive DFS: Left -> Right -> Root
 * 2. Iterative using two stacks
 */

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class PostorderTraversal {
    // Recursive DFS approach
    postorderTraversal(root) {
        const result = [];
        this.dfsPost(root, result);
        return result;
    }

    dfsPost(root, result) {
        if (!root) return;
        this.dfsPost(root.left, result);
        this.dfsPost(root.right, result);
        result.push(root.val);
    }

    // Iterative approach using two stacks
    iterativePostorderTraversal(root) {
        const result = [];
        if (!root) return result;
        
        const stack1 = [root];
        const stack2 = [];
        
        while (stack1.length > 0) {
            const node = stack1.pop();
            stack2.push(node);
            
            if (node.left) stack1.push(node.left);
            if (node.right) stack1.push(node.right);
        }
        
        while (stack2.length > 0) {
            result.push(stack2.pop().val);
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
    const solution = new PostorderTraversal();
    
    // Test case 1: Basic tree
    console.log("Test case 1: Basic tree [1,null,2,3]");
    const root1 = PostorderTraversal.createTree([1, null, 2, 3]);
    console.log("Recursive:", solution.postorderTraversal(root1));
    console.log("Iterative:", solution.iterativePostorderTraversal(root1));

    // Test case 2: Empty tree
    console.log("\nTest case 2: Empty tree");
    const root2 = null;
    console.log("Recursive:", solution.postorderTraversal(root2));
    console.log("Iterative:", solution.iterativePostorderTraversal(root2));

    // Test case 3: Single node
    console.log("\nTest case 3: Single node [1]");
    const root3 = PostorderTraversal.createTree([1]);
    console.log("Recursive:", solution.postorderTraversal(root3));
    console.log("Iterative:", solution.iterativePostorderTraversal(root3));

    // Test case 4: Complete binary tree
    console.log("\nTest case 4: Complete binary tree [1,2,3,4,5]");
    const root4 = PostorderTraversal.createTree([1, 2, 3, 4, 5]);
    console.log("Recursive:", solution.postorderTraversal(root4));
    console.log("Iterative:", solution.iterativePostorderTraversal(root4));
}

// Run the tests
runTests(); 