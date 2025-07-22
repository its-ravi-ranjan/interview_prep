/**
 * POSTORDER TRAVERSAL - BINARY TREE
 * 
 * 🎯 PROBLEM STATEMENT:
 * Given the root of a binary tree, return the postorder traversal of its nodes' values.
 * 
 * 📝 EXAMPLES:
 * Input: root = [1,null,2,3] → Output: [3,2,1]
 * Input: root = [1,2,3,4,5] → Output: [4,5,2,3,1]
 * 
 * 🔍 PATTERN RECOGNITION:
 * This is a classic Tree Traversal problem!
 * - Postorder: Left → Right → Root
 * - Iterative approaches use stack(s) to simulate recursion
 * - Can be implemented using different stack strategies
 * 
 * 🎯 KEY INSIGHT:
 * 🔁 TWEAK: Postorder is the reverse of modified preorder!
 * Normal Preorder: Root → Left → Right
 * Modified Preorder: Root → Right → Left
 * Postorder: Left → Right → Root (reverse of modified preorder)
 * Use this property for efficient iterative implementation.
 * 
 * ==================== QUICK RECAP - ALL APPROACHES ====================
 * 
 * 🎯 APPROACH 1: RECURSIVE DFS
 * 💡 IDEA: Recursively traverse left subtree, then right subtree, then visit root
 * ⏰ TIME: O(n) - Visit each node once
 * 🏠 SPACE: O(h) - Height of tree (call stack)
 * ✅ BEST FOR: Understanding, simple implementation
 * 
 * 🎯 APPROACH 2: ITERATIVE WITH TWO STACKS
 * 💡 IDEA: 🔁 TWEAK preorder (Root→Right→Left), push to stack1, reverse using stack2
 * ⏰ TIME: O(n) - Single pass through tree
 * 🏠 SPACE: O(n) - Two stacks for all nodes
 * ✅ BEST FOR: Clear understanding of reverse logic
 * 
 * 🎯 APPROACH 3: ITERATIVE WITH LINKEDLIST (RECOMMENDED)
 * 💡 IDEA: 🔁 TWEAK preorder (Root→Right→Left), use unshift() to reverse
 * ⏰ TIME: O(n) - Single pass through tree
 * 🏠 SPACE: O(n) - One stack + result array
 * ✅ BEST FOR: Most efficient iterative approach
 * 
 * 📊 COMPARISON TABLE:
 * ┌─────────────────┬─────────────────┬─────────────┬─────────────┬─────────────┐
 * │    APPROACH     │   TIME COMPLEXITY│SPACE COMPLEXITY│  PRACTICAL  │  INTERVIEW  │
 * ├─────────────────┼─────────────────┼─────────────┼─────────────┼─────────────┤
 * │ Recursive DFS   │       O(n)      │     O(h)     │    ⭐⭐⭐⭐    │    ⭐⭐⭐⭐    │
 * │ Two Stacks      │       O(n)      │     O(n)     │    ⭐⭐⭐⭐    │    ⭐⭐⭐⭐    │
 * │ LinkedList      │       O(n)      │     O(n)     │    ⭐⭐⭐⭐⭐   │    ⭐⭐⭐⭐⭐   │
 * └─────────────────┴─────────────────┴─────────────┴─────────────┴─────────────┘
 * 
 * 🎯 INTERVIEW ANSWER: "🔁 TWEAK: Postorder is reverse of modified preorder! 
 * Normal preorder: Root→Left→Right, but for postorder we use Root→Right→Left and reverse it. 
 * I push nodes in Root→Right→Left order and use unshift() to reverse the result."
 * 
 * 🔑 KEY POINTS TO REMEMBER:
 * 1. 🔁 TWEAK: Postorder = reverse of modified preorder
 * 2. Normal Preorder: Root → Left → Right
 * 3. Modified Preorder: Root → Right → Left
 * 4. Postorder: Left → Right → Root (reverse of #3)
 * 5. Push right child before left child for correct order
 * 6. Array.unshift() efficiently reverses the result
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

    // ==================== APPROACH 2: ITERATIVE WITH TWO STACKS ====================
    /**
     * 🎯 APPROACH: Iterative with Two Stacks
     * 
     * 💡 IDEA: 
     * - Push nodes in Root → Right → Left order to stack1
     * - Transfer to stack2 to reverse the order
     * - Pop from stack2 to get Left → Right → Root (postorder)
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Each node is pushed and popped twice
     *    - Single pass through the tree
     * 
     * 🏠 SPACE COMPLEXITY: O(n)
     *    - Two stacks may contain all nodes in worst case
     */
    iterativePostorderTraversal(root) {
        const result = [];
        if (!root) return result;
        
        const stack1 = [root];
        const stack2 = [];
        
        while (stack1.length > 0) {
            const node = stack1.pop();
            stack2.push(node);
            
            // Push left after right so right is processed first
            if (node.left) stack1.push(node.left);
            if (node.right) stack1.push(node.right);
        }
        
        while (stack2.length > 0) {
            result.push(stack2.pop().val);
        }
        
        return result;
    }
    
    // ==================== APPROACH 3: ITERATIVE WITH LINKEDLIST ====================
    /**
     * 🎯 APPROACH: Iterative with LinkedList (RECOMMENDED)
     * 
     * 💡 IDEA: 
     * - Push nodes in Root → Right → Left order using one stack
     * - Use array.unshift() to reverse the result efficiently
     * - No need for second stack
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Single pass through the tree
     *    - Array.unshift() is O(n) but more efficient than two stacks
     * 
     * 🏠 SPACE COMPLEXITY: O(n)
     *    - One stack + result array
     *    - More space efficient than two stacks
     */
    postorderUsingLinkedList(root) {
        const result = [];
        if (!root) return result;

        const stack = [root];

        while (stack.length > 0) {
            const node = stack.pop();
            result.unshift(node.val); // Reverse by inserting at front

            // Push left after right so right is processed first
            if (node.left) stack.push(node.left);
            if (node.right) stack.push(node.right);
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
    console.log("Two Stacks:", solution.iterativePostorderTraversal(root1));
    console.log("LinkedList:", solution.postorderUsingLinkedList(root1));

    // Test case 2: Empty tree
    console.log("\nTest case 2: Empty tree");
    const root2 = null;
    console.log("Recursive:", solution.postorderTraversal(root2));
    console.log("Two Stacks:", solution.iterativePostorderTraversal(root2));
    console.log("LinkedList:", solution.postorderUsingLinkedList(root2));

    // Test case 3: Single node
    console.log("\nTest case 3: Single node [1]");
    const root3 = PostorderTraversal.createTree([1]);
    console.log("Recursive:", solution.postorderTraversal(root3));
    console.log("Two Stacks:", solution.iterativePostorderTraversal(root3));
    console.log("LinkedList:", solution.postorderUsingLinkedList(root3));

    // Test case 4: Complete binary tree
    console.log("\nTest case 4: Complete binary tree [1,2,3,4,5]");
    const root4 = PostorderTraversal.createTree([1, 2, 3, 4, 5]);
    console.log("Recursive:", solution.postorderTraversal(root4));
    console.log("Two Stacks:", solution.iterativePostorderTraversal(root4));
    console.log("LinkedList:", solution.postorderUsingLinkedList(root4));
}

// Run the tests
runTests(); 