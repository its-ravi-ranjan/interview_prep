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

class PreorderTraversal {
    // Recursive DFS approach
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        dfsPre(root, result);
        return result;
    }

    private void dfsPre(TreeNode root, List<Integer> result) {
        if (root == null) return;
        result.add(root.val);
        dfsPre(root.left, result);
        dfsPre(root.right, result);
    }

    // Iterative approach using Stack
    public List<Integer> iterativePreorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            result.add(node.val);
            
            if (node.right != null) stack.push(node.right);
            if (node.left != null) stack.push(node.left);
        }
        return result;
    }

    // Morris Traversal (O(1) space)
    public List<Integer> morrisPreorderTraversal(TreeNode root) {
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
                    result.add(current.val);
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
        PreorderTraversal solution = new PreorderTraversal();
        
        // Test case 1: Basic tree
        System.out.println("Test case 1: Basic tree [1,null,2,3]");
        TreeNode root1 = createTree(new Integer[]{1, null, 2, 3});
        System.out.println("Recursive: " + solution.preorderTraversal(root1));
        System.out.println("Iterative: " + solution.iterativePreorderTraversal(root1));
        System.out.println("Morris: " + solution.morrisPreorderTraversal(root1));

        // Test case 2: Empty tree
        System.out.println("\nTest case 2: Empty tree");
        TreeNode root2 = null;
        System.out.println("Recursive: " + solution.preorderTraversal(root2));
        System.out.println("Iterative: " + solution.iterativePreorderTraversal(root2));
        System.out.println("Morris: " + solution.morrisPreorderTraversal(root2));

        // Test case 3: Single node
        System.out.println("\nTest case 3: Single node [1]");
        TreeNode root3 = createTree(new Integer[]{1});
        System.out.println("Recursive: " + solution.preorderTraversal(root3));
        System.out.println("Iterative: " + solution.iterativePreorderTraversal(root3));
        System.out.println("Morris: " + solution.morrisPreorderTraversal(root3));

        // Test case 4: Complete binary tree
        System.out.println("\nTest case 4: Complete binary tree [1,2,3,4,5]");
        TreeNode root4 = createTree(new Integer[]{1, 2, 3, 4, 5});
        System.out.println("Recursive: " + solution.preorderTraversal(root4));
        System.out.println("Iterative: " + solution.iterativePreorderTraversal(root4));
        System.out.println("Morris: " + solution.morrisPreorderTraversal(root4));
    }
} 