/**
 * 671. Second Minimum Node In a Binary Tree
 * 
 * Problem: Given a non-empty special binary tree consisting of nodes with non-negative values,
 * where each node has exactly two or zero sub-nodes. If a node has two sub-nodes, then this 
 * node's value is the smaller value among its two sub-nodes.
 * 
 * Find the second minimum value in the set of all nodes' values in the whole tree.
 * If no such second minimum value exists, output -1.
 * 
 * Approach:
 * 1. BFS/Level Order Traversal: Use queue to traverse the tree level by level
 *    - Keep track of the minimum value (root.val)
 *    - Find the second minimum value that is greater than the minimum
 *    - Only explore children of nodes with value equal to minimum (optimization)
 * 
 * 2. DFS/Recursive Approach: Traverse the entire tree and collect all unique values
 *    - Use a set to store unique values
 *    - Find the second minimum from the set
 * 
 * 3. Optimized DFS: Early termination when we find second minimum
 *    - Stop exploring when we find a value greater than minimum
 *    - Keep track of the smallest value greater than minimum
 * 
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(w) where w is the maximum width of the tree (for BFS)
 *                  O(h) where h is the height of the tree (for DFS recursion stack)
 */

import java.util.*;

// Definition for a binary tree node
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

class Solution {
    
    // Approach 1: BFS/Level Order Traversal (Optimized)
    public int findSecondMinimumValue(TreeNode root) {
        if (root == null) return -1;
        
        int min = root.val;
        long second = Long.MAX_VALUE;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (node != null) {
                    if (node.val > min && node.val < second) {
                        second = node.val;
                    } else if (node.val == min) {
                        // Only explore children if current node has minimum value
                        if (node.left != null) queue.offer(node.left);
                        if (node.right != null) queue.offer(node.right);
                    }
                }
            }
        }
        
        return (second < Long.MAX_VALUE) ? (int) second : -1;
    }
    
    // Approach 2: DFS with Set (Collect all unique values)
    public int findSecondMinimumValueDFS(TreeNode root) {
        if (root == null) return -1;
        
        Set<Integer> values = new HashSet<>();
        collectValues(root, values);
        
        if (values.size() < 2) return -1;
        
        // Find second minimum
        int min = root.val;
        int secondMin = Integer.MAX_VALUE;
        
        for (int val : values) {
            if (val > min && val < secondMin) {
                secondMin = val;
            }
        }
        
        return (secondMin < Integer.MAX_VALUE) ? secondMin : -1;
    }
    
    private void collectValues(TreeNode node, Set<Integer> values) {
        if (node == null) return;
        
        values.add(node.val);
        collectValues(node.left, values);
        collectValues(node.right, values);
    }
    
    // Approach 3: Optimized DFS (Early termination)
    public int findSecondMinimumValueOptimized(TreeNode root) {
        if (root == null) return -1;
        
        int min = root.val;
        long secondMin = Long.MAX_VALUE;
        
        findSecondMinHelper(root, min, secondMin);
        
        return (secondMin < Long.MAX_VALUE) ? (int) secondMin : -1;
    }
    
    private void findSecondMinHelper(TreeNode node, int min, long secondMin) {
        if (node == null) return;
        
        if (node.val > min && node.val < secondMin) {
            secondMin = node.val;
        }
        
        // Only explore if current node has minimum value
        if (node.val == min) {
            findSecondMinHelper(node.left, min, secondMin);
            findSecondMinHelper(node.right, min, secondMin);
        }
    }
    
    // Approach 4: Inorder Traversal with Early Termination
    public int findSecondMinimumValueInorder(TreeNode root) {
        if (root == null) return -1;
        
        int min = root.val;
        long secondMin = Long.MAX_VALUE;
        
        inorderTraversal(root, min, secondMin);
        
        return (secondMin < Long.MAX_VALUE) ? (int) secondMin : -1;
    }
    
    private void inorderTraversal(TreeNode node, int min, long secondMin) {
        if (node == null) return;
        
        inorderTraversal(node.left, min, secondMin);
        
        if (node.val > min && node.val < secondMin) {
            secondMin = node.val;
        }
        
        inorderTraversal(node.right, min, secondMin);
    }
}

// Test class
class SecondMinNodeInBSTTest {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test Case 1: [2,2,5,null,null,5,7]
        //       2
        //      / \
        //     2   5
        //        / \
        //       5   7
        TreeNode root1 = new TreeNode(2);
        root1.left = new TreeNode(2);
        root1.right = new TreeNode(5);
        root1.right.left = new TreeNode(5);
        root1.right.right = new TreeNode(7);
        
        System.out.println("Test Case 1: " + solution.findSecondMinimumValue(root1)); // Expected: 5
        
        // Test Case 2: [2,2,2]
        //       2
        //      / \
        //     2   2
        TreeNode root2 = new TreeNode(2);
        root2.left = new TreeNode(2);
        root2.right = new TreeNode(2);
        
        System.out.println("Test Case 2: " + solution.findSecondMinimumValue(root2)); // Expected: -1
        
        // Test Case 3: [1,1,3,1,1,3,4,3,1,1,1,3,8,4,8,3,3,1,6,2,1]
        // Complex tree with multiple levels
        TreeNode root3 = new TreeNode(1);
        root3.left = new TreeNode(1);
        root3.right = new TreeNode(3);
        root3.left.left = new TreeNode(1);
        root3.left.right = new TreeNode(1);
        root3.right.left = new TreeNode(3);
        root3.right.right = new TreeNode(4);
        
        System.out.println("Test Case 3: " + solution.findSecondMinimumValue(root3)); // Expected: 3
        
        // Test Case 4: Single node
        TreeNode root4 = new TreeNode(1);
        System.out.println("Test Case 4: " + solution.findSecondMinimumValue(root4)); // Expected: -1
        
        // Test Case 5: [2,2,2147483647]
        // Edge case with INT_MAX
        TreeNode root5 = new TreeNode(2);
        root5.left = new TreeNode(2);
        root5.right = new TreeNode(2147483647);
        
        System.out.println("Test Case 5: " + solution.findSecondMinimumValue(root5)); // Expected: 2147483647
        
        System.out.println("\n--- Testing all approaches ---");
        System.out.println("BFS Approach: " + solution.findSecondMinimumValue(root1));
        System.out.println("DFS with Set: " + solution.findSecondMinimumValueDFS(root1));
        System.out.println("Optimized DFS: " + solution.findSecondMinimumValueOptimized(root1));
        System.out.println("Inorder DFS: " + solution.findSecondMinimumValueInorder(root1));
    }
} 