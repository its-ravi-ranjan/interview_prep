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

class InorderTraversal {
    // Recursive DFS approach
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        dfs(root, result);
        return result;
    }

    private void dfs(TreeNode root, List<Integer> result) {
        if (root == null) return;
        dfs(root.left, result);
        result.add(root.val);
        dfs(root.right, result);
    }

    // Iterative approach using Stack
    public List<Integer> inorderTraversalIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;
        
        while (current != null || !stack.isEmpty()) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            result.add(current.val);
            current = current.right;
        }
        return result;
    }

    // Morris Traversal (O(1) space)
    public List<Integer> morrisInorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        TreeNode current = root;
        
        while (current != null) {
            if (current.left == null) {
                result.add(current.val);
                current = current.right;
            } else {
                TreeNode predecessor = current.left;
                while (predecessor.right != null && predecessor.right != current) {
                    predecessor = predecessor.right;
                }
                if (predecessor.right == null) {
                    predecessor.right = current;
                    current = current.left;
                } else {
                    predecessor.right = null;
                    result.add(current.val);
                    current = current.right;
                }
            }
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
        InorderTraversal solution = new InorderTraversal();
        
        // Test case 1: Basic tree
        System.out.println("Test case 1: Basic tree [1,null,2,3]");
        TreeNode root1 = createTree(new Integer[]{1, null, 2, 3});
        System.out.println("Recursive: " + solution.inorderTraversal(root1));
        System.out.println("Iterative: " + solution.inorderTraversalIterative(root1));
        System.out.println("Morris: " + solution.morrisInorderTraversal(root1));

        // Test case 2: Empty tree
        System.out.println("\nTest case 2: Empty tree");
        TreeNode root2 = null;
        System.out.println("Recursive: " + solution.inorderTraversal(root2));
        System.out.println("Iterative: " + solution.inorderTraversalIterative(root2));
        System.out.println("Morris: " + solution.morrisInorderTraversal(root2));

        // Test case 3: Single node
        System.out.println("\nTest case 3: Single node [1]");
        TreeNode root3 = createTree(new Integer[]{1});
        System.out.println("Recursive: " + solution.inorderTraversal(root3));
        System.out.println("Iterative: " + solution.inorderTraversalIterative(root3));
        System.out.println("Morris: " + solution.morrisInorderTraversal(root3));

        // Test case 4: Complete binary tree
        System.out.println("\nTest case 4: Complete binary tree [1,2,3,4,5]");
        TreeNode root4 = createTree(new Integer[]{1, 2, 3, 4, 5});
        System.out.println("Recursive: " + solution.inorderTraversal(root4));
        System.out.println("Iterative: " + solution.inorderTraversalIterative(root4));
        System.out.println("Morris: " + solution.morrisInorderTraversal(root4));
    }
} 