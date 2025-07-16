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
 * 1. Using array to store diameter (given solution)
 * 2. Using class variable to store diameter
 * Both approaches use DFS to calculate depths and update diameter
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

class DiameterOfBinaryTree {
    // Approach 1: Using array to store diameter (given solution)
    public int diameterOfBinaryTree(TreeNode root) {
        int[] diameter = new int[1];
        depth(root, diameter);
        return diameter[0];
    }

    private int depth(TreeNode node, int[] diameter) {
        if (node == null) return 0;
        int left = depth(node.left, diameter);
        int right = depth(node.right, diameter);
        diameter[0] = Math.max(diameter[0], left + right);
        return Math.max(left, right) + 1;
    }

    // Approach 2: Using class variable
    private int maxDiameter = 0;
    
    public int diameterOfBinaryTreeClassVar(TreeNode root) {
        maxDiameter = 0;
        depthClassVar(root);
        return maxDiameter;
    }

    private int depthClassVar(TreeNode node) {
        if (node == null) return 0;
        int left = depthClassVar(node.left);
        int right = depthClassVar(node.right);
        maxDiameter = Math.max(maxDiameter, left + right);
        return Math.max(left, right) + 1;
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
        DiameterOfBinaryTree solution = new DiameterOfBinaryTree();
        
        // Test case 1: Basic tree from example
        System.out.println("Test case 1: Basic tree [1,2,3,4,5]");
        TreeNode root1 = createTree(new Integer[]{1, 2, 3, 4, 5});
        System.out.println("Array approach: " + solution.diameterOfBinaryTree(root1));
        System.out.println("Class variable approach: " + solution.diameterOfBinaryTreeClassVar(root1));

        // Test case 2: Empty tree
        System.out.println("\nTest case 2: Empty tree");
        TreeNode root2 = null;
        System.out.println("Array approach: " + solution.diameterOfBinaryTree(root2));
        System.out.println("Class variable approach: " + solution.diameterOfBinaryTreeClassVar(root2));

        // Test case 3: Single node
        System.out.println("\nTest case 3: Single node [1]");
        TreeNode root3 = createTree(new Integer[]{1});
        System.out.println("Array approach: " + solution.diameterOfBinaryTree(root3));
        System.out.println("Class variable approach: " + solution.diameterOfBinaryTreeClassVar(root3));

        // Test case 4: Left skewed tree
        System.out.println("\nTest case 4: Left skewed tree [1,2,null,3]");
        TreeNode root4 = createTree(new Integer[]{1, 2, null, 3});
        System.out.println("Array approach: " + solution.diameterOfBinaryTree(root4));
        System.out.println("Class variable approach: " + solution.diameterOfBinaryTreeClassVar(root4));

        // Test case 5: Right skewed tree
        System.out.println("\nTest case 5: Right skewed tree [1,null,2,null,3]");
        TreeNode root5 = createTree(new Integer[]{1, null, 2, null, 3});
        System.out.println("Array approach: " + solution.diameterOfBinaryTree(root5));
        System.out.println("Class variable approach: " + solution.diameterOfBinaryTreeClassVar(root5));

        // Test case 6: Complex tree
        System.out.println("\nTest case 6: Complex tree [1,2,3,4,5,6,7,8,9]");
        TreeNode root6 = createTree(new Integer[]{1, 2, 3, 4, 5, 6, 7, 8, 9});
        System.out.println("Array approach: " + solution.diameterOfBinaryTree(root6));
        System.out.println("Class variable approach: " + solution.diameterOfBinaryTreeClassVar(root6));
    }
} 