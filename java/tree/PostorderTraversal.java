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

    // Iterative approach using two stacks
    public List<Integer> iterativePostorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        
        Stack<TreeNode> stack1 = new Stack<>();
        Stack<TreeNode> stack2 = new Stack<>();
        stack1.push(root);
        
        while (!stack1.isEmpty()) {
            TreeNode node = stack1.pop();
            stack2.push(node);
            
            if (node.left != null) stack1.push(node.left);
            if (node.right != null) stack1.push(node.right);
        }
        
        while (!stack2.isEmpty()) {
            result.add(stack2.pop().val);
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
        System.out.println("Iterative: " + solution.iterativePostorderTraversal(root4));
    }
} 