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

class LevelOrderTraversal {
    // Simple level order traversal (all nodes in a single list)
    public List<Integer> levelOrderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            result.add(node.val);
            
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        return result;
    }

    // Level order traversal level by level
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> levelItems = new ArrayList<>();
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                levelItems.add(node.val);
                
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            
            result.add(levelItems);
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
        LevelOrderTraversal solution = new LevelOrderTraversal();
        
        // Test case 1: Basic tree
        System.out.println("Test case 1: Basic tree [3,9,20,null,null,15,7]");
        TreeNode root1 = createTree(new Integer[]{3, 9, 20, null, null, 15, 7});
        System.out.println("Simple level order: " + solution.levelOrderTraversal(root1));
        System.out.println("Level by level: " + solution.levelOrder(root1));

        // Test case 2: Empty tree
        System.out.println("\nTest case 2: Empty tree");
        TreeNode root2 = null;
        System.out.println("Simple level order: " + solution.levelOrderTraversal(root2));
        System.out.println("Level by level: " + solution.levelOrder(root2));

        // Test case 3: Single node
        System.out.println("\nTest case 3: Single node [1]");
        TreeNode root3 = createTree(new Integer[]{1});
        System.out.println("Simple level order: " + solution.levelOrderTraversal(root3));
        System.out.println("Level by level: " + solution.levelOrder(root3));

        // Test case 4: Complete binary tree
        System.out.println("\nTest case 4: Complete binary tree [1,2,3,4,5]");
        TreeNode root4 = createTree(new Integer[]{1, 2, 3, 4, 5});
        System.out.println("Simple level order: " + solution.levelOrderTraversal(root4));
        System.out.println("Level by level: " + solution.levelOrder(root4));
    }
} 