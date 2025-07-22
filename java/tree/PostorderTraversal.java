/**
 * Postorder Traversal of Binary Tree
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
 * 💡 IDEA: 🔁 TWEAK preorder (Root→Right→Left), use LinkedList.addFirst() to reverse
 * ⏰ TIME: O(n) - Single pass through tree
 * 🏠 SPACE: O(n) - One stack + result list
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
 * I push nodes in Root→Right→Left order and use LinkedList.addFirst() to reverse the result."
 * 
 * 🔑 KEY POINTS TO REMEMBER:
 * 1. 🔁 TWEAK: Postorder = reverse of modified preorder
 * 2. Normal Preorder: Root → Left → Right
 * 3. Modified Preorder: Root → Right → Left
 * 4. Postorder: Left → Right → Root (reverse of #3)
 * 5. Push right child before left child for correct order
 * 6. LinkedList.addFirst() efficiently reverses the result
 */

import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class PostorderTraversal {
    // Recursive DFS approach
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        dfsPost(root, result);
        return result;
    }

    private void dfsPost(TreeNode root, List<Integer> result) {
        if (root == null) return;
        dfsPost(root.left, result);
        dfsPost(root.right, result);
        result.add(root.val);
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
    public List<Integer> iterativePostorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        
        Stack<TreeNode> stack1 = new Stack<>();
        Stack<TreeNode> stack2 = new Stack<>();
        stack1.push(root);
        
        while (!stack1.isEmpty()) {
            TreeNode node = stack1.pop();
            stack2.push(node);
            
            // Push left after right so right is processed first
            if (node.left != null) stack1.push(node.left);
            if (node.right != null) stack1.push(node.right);
        }
        
        while (!stack2.isEmpty()) {
            result.add(stack2.pop().val);
        }
        
        return result;
    }
    
    // ==================== APPROACH 3: ITERATIVE WITH LINKEDLIST ====================
    /**
     * 🎯 APPROACH: Iterative with LinkedList (RECOMMENDED)
     * 
     * 💡 IDEA: 
     * - Push nodes in Root → Right → Left order using one stack
     * - Use LinkedList.addFirst() to reverse the result efficiently
     * - No need for second stack
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Single pass through the tree
     *    - LinkedList.addFirst() is O(1) amortized
     * 
     * 🏠 SPACE COMPLEXITY: O(n)
     *    - One stack + result list
     *    - More space efficient than two stacks
     */
    public List<Integer> postorderUsingLinkedList(TreeNode root) {
        LinkedList<Integer> result = new LinkedList<>();
        if (root == null) return result;

        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            result.addFirst(node.val); // Reverse by inserting at front

            // Push left after right so right is processed first
            if (node.left != null) stack.push(node.left);
            if (node.right != null) stack.push(node.right);
        }

        return result;
    }

    // Helper method to create a binary tree from array
    public static TreeNode createTree(Integer[] arr) {
        if (arr == null || arr.length == 0) return null;
        
        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        for (int i = 1; i < arr.length; i += 2) {
            TreeNode current = queue.poll();
            
            if (i < arr.length && arr[i] != null) {
                current.left = new TreeNode(arr[i]);
                queue.offer(current.left);
            }
            
            if (i + 1 < arr.length && arr[i + 1] != null) {
                current.right = new TreeNode(arr[i + 1]);
                queue.offer(current.right);
            }
        }
        
        return root;
    }

    // Test cases
    public static void main(String[] args) {
        PostorderTraversal solution = new PostorderTraversal();
        
        // Test case 1: Basic tree
        System.out.println("Test case 1: Basic tree [1,null,2,3]");
        TreeNode root1 = createTree(new Integer[]{1, null, 2, 3});
        System.out.println("Recursive: " + solution.postorderTraversal(root1));
        System.out.println("Iterative: " + solution.iterativePostorderTraversal(root1));

        // Test case 2: Empty tree
        System.out.println("\nTest case 2: Empty tree");
        TreeNode root2 = null;
        System.out.println("Recursive: " + solution.postorderTraversal(root2));
        System.out.println("Iterative: " + solution.iterativePostorderTraversal(root2));

        // Test case 3: Single node
        System.out.println("\nTest case 3: Single node [1]");
        TreeNode root3 = createTree(new Integer[]{1});
        System.out.println("Recursive: " + solution.postorderTraversal(root3));
        System.out.println("Iterative: " + solution.iterativePostorderTraversal(root3));

        // Test case 4: Complete binary tree
        System.out.println("\nTest case 4: Complete binary tree [1,2,3,4,5]");
        TreeNode root4 = createTree(new Integer[]{1, 2, 3, 4, 5});
        System.out.println("Recursive: " + solution.postorderTraversal(root4));
        System.out.println("Two Stacks: " + solution.iterativePostorderTraversal(root4));
        System.out.println("LinkedList: " + solution.postorderUsingLinkedList(root4));
    }
} 