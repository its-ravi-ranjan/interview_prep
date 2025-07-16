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

class MaxDepth {
    // BFS approach
    public int maxDepth(TreeNode root) {
        int depth = 0;
        if (root == null) return depth;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            depth++;
        }
        return depth;
    }

    // DFS approach
    public int maxDepthDFS(TreeNode root) {
        if (root == null) return 0;
        return Math.max(maxDepthDFS(root.left), maxDepthDFS(root.right)) + 1;
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
        MaxDepth solution = new MaxDepth();
        
        // Test case 1: Basic tree
        System.out.println("Test case 1: Basic tree [3,9,20,null,null,15,7]");
        TreeNode root1 = createTree(new Integer[]{3, 9, 20, null, null, 15, 7});
        System.out.println("BFS approach: " + solution.maxDepth(root1));
        System.out.println("DFS approach: " + solution.maxDepthDFS(root1));

        // Test case 2: Empty tree
        System.out.println("\nTest case 2: Empty tree");
        TreeNode root2 = null;
        System.out.println("BFS approach: " + solution.maxDepth(root2));
        System.out.println("DFS approach: " + solution.maxDepthDFS(root2));

        // Test case 3: Single node
        System.out.println("\nTest case 3: Single node [1]");
        TreeNode root3 = createTree(new Integer[]{1});
        System.out.println("BFS approach: " + solution.maxDepth(root3));
        System.out.println("DFS approach: " + solution.maxDepthDFS(root3));

        // Test case 4: Left skewed tree
        System.out.println("\nTest case 4: Left skewed tree [1,2,null,3]");
        TreeNode root4 = createTree(new Integer[]{1, 2, null, 3});
        System.out.println("BFS approach: " + solution.maxDepth(root4));
        System.out.println("DFS approach: " + solution.maxDepthDFS(root4));

        // Test case 5: Right skewed tree
        System.out.println("\nTest case 5: Right skewed tree [1,null,2,null,3]");
        TreeNode root5 = createTree(new Integer[]{1, null, 2, null, 3});
        System.out.println("BFS approach: " + solution.maxDepth(root5));
        System.out.println("DFS approach: " + solution.maxDepthDFS(root5));
    }
} 