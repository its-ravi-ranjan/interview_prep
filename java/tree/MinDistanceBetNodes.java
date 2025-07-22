/**
 * 783. Minimum Distance Between BST Nodes
 * 
 * Problem: Given the root of a Binary Search Tree (BST), return the minimum 
 * difference between the values of any two different nodes in the tree.
 * 
 * Note: This question is the same as 530: Minimum Absolute Difference in BST
 * 
 * Approach:
 * 1. Inorder Traversal (Most Efficient):
 *    - Use inorder traversal to get nodes in sorted order
 *    - Keep track of previous node value
 *    - Calculate difference between current and previous node
 *    - Update minimum difference
 *    - Works because inorder traversal of BST gives sorted sequence
 * 
 * 2. Inorder Traversal with List:
 *    - Store all values in a list during inorder traversal
 *    - Find minimum difference between consecutive elements
 *    - Uses extra space but easier to understand
 * 
 * 3. Iterative Inorder Traversal:
 *    - Same logic as recursive but using stack
 *    - Avoids recursion stack space
 * 
 * 4. Morris Inorder Traversal:
 *    - Space-optimized inorder traversal
 *    - Uses O(1) space by modifying tree structure temporarily
 * 
 * 5. BFS with Sorting:
 *    - Collect all values using BFS
 *    - Sort the values
 *    - Find minimum difference
 *    - Less efficient but demonstrates BFS approach
 * 
 * Time Complexity: O(n) where n is the number of nodes
 *                  Inorder traversal visits each node once
 * Space Complexity: O(h) where h is the height of the tree
 *                   O(n) in worst case (skewed tree)
 *                   O(log n) in best case (balanced tree)
 */

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
    
    // Approach 1: Inorder Traversal (Most Efficient)
    int min = Integer.MAX_VALUE;
    Integer prev = null;
    
    public int minDiffInBST(TreeNode root) {
        inOrder(root);
        return min;
    }
    
    private void inOrder(TreeNode root) {
        if (root == null) return;
        inOrder(root.left);
        if (prev != null) {
            min = Math.min(min, root.val - prev);
        }
        prev = root.val;
        inOrder(root.right);
    }
    
    // Approach 2: Inorder Traversal with List
    public int minDiffInBSTWithList(TreeNode root) {
        List<Integer> values = new ArrayList<>();
        inOrderCollect(root, values);
        
        int minDiff = Integer.MAX_VALUE;
        for (int i = 1; i < values.size(); i++) {
            minDiff = Math.min(minDiff, values.get(i) - values.get(i - 1));
        }
        
        return minDiff;
    }
    
    private void inOrderCollect(TreeNode root, List<Integer> values) {
        if (root == null) return;
        inOrderCollect(root.left, values);
        values.add(root.val);
        inOrderCollect(root.right, values);
    }
    
    // Approach 3: Iterative Inorder Traversal
    public int minDiffInBSTIterative(TreeNode root) {
        if (root == null) return 0;
        
        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;
        Integer prev = null;
        int minDiff = Integer.MAX_VALUE;
        
        while (current != null || !stack.isEmpty()) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            
            current = stack.pop();
            
            if (prev != null) {
                minDiff = Math.min(minDiff, current.val - prev);
            }
            prev = current.val;
            
            current = current.right;
        }
        
        return minDiff;
    }
    
    // Approach 4: Morris Inorder Traversal (Space O(1))
    public int minDiffInBSTMorris(TreeNode root) {
        if (root == null) return 0;
        
        TreeNode current = root;
        Integer prev = null;
        int minDiff = Integer.MAX_VALUE;
        
        while (current != null) {
            if (current.left == null) {
                // Process current node
                if (prev != null) {
                    minDiff = Math.min(minDiff, current.val - prev);
                }
                prev = current.val;
                current = current.right;
            } else {
                // Find inorder predecessor
                TreeNode predecessor = current.left;
                while (predecessor.right != null && predecessor.right != current) {
                    predecessor = predecessor.right;
                }
                
                if (predecessor.right == null) {
                    // Make current as right child of predecessor
                    predecessor.right = current;
                    current = current.left;
                } else {
                    // Revert the changes and process current node
                    predecessor.right = null;
                    if (prev != null) {
                        minDiff = Math.min(minDiff, current.val - prev);
                    }
                    prev = current.val;
                    current = current.right;
                }
            }
        }
        
        return minDiff;
    }
    
    // Approach 5: BFS with Sorting
    public int minDiffInBSTBFS(TreeNode root) {
        if (root == null) return 0;
        
        List<Integer> values = new ArrayList<>();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();
            values.add(current.val);
            
            if (current.left != null) {
                queue.offer(current.left);
            }
            if (current.right != null) {
                queue.offer(current.right);
            }
        }
        
        Collections.sort(values);
        
        int minDiff = Integer.MAX_VALUE;
        for (int i = 1; i < values.size(); i++) {
            minDiff = Math.min(minDiff, values.get(i) - values.get(i - 1));
        }
        
        return minDiff;
    }
    
    // Approach 6: Enhanced Inorder with Early Termination
    public int minDiffInBSTEnhanced(TreeNode root) {
        if (root == null) return 0;
        
        int[] result = {Integer.MAX_VALUE};
        Integer[] prev = {null};
        
        inOrderEnhanced(root, result, prev);
        return result[0];
    }
    
    private void inOrderEnhanced(TreeNode root, int[] result, Integer[] prev) {
        if (root == null) return;
        
        inOrderEnhanced(root.left, result, prev);
        
        if (prev[0] != null) {
            result[0] = Math.min(result[0], root.val - prev[0]);
        }
        prev[0] = root.val;
        
        inOrderEnhanced(root.right, result, prev);
    }
    
    // Approach 7: Postorder with Range Tracking
    public int minDiffInBSTPostorder(TreeNode root) {
        if (root == null) return 0;
        
        int[] result = {Integer.MAX_VALUE};
        postorderMinDiff(root, result);
        return result[0];
    }
    
    private int[] postorderMinDiff(TreeNode root, int[] result) {
        if (root == null) return new int[]{-1, -1}; // {min, max}
        
        int[] left = postorderMinDiff(root.left, result);
        int[] right = postorderMinDiff(root.right, result);
        
        int min = root.val;
        int max = root.val;
        
        // Update min and max from left subtree
        if (left[0] != -1) {
            min = Math.min(min, left[0]);
            result[0] = Math.min(result[0], root.val - left[1]);
        }
        
        // Update min and max from right subtree
        if (right[0] != -1) {
            max = Math.max(max, right[1]);
            result[0] = Math.min(result[0], right[0] - root.val);
        }
        
        return new int[]{min, max};
    }
    
    // Approach 8: DFS with Global Variables
    public int minDiffInBSTDFS(TreeNode root) {
        if (root == null) return 0;
        
        int[] minDiff = {Integer.MAX_VALUE};
        Integer[] lastVal = {null};
        
        dfsMinDiff(root, minDiff, lastVal);
        return minDiff[0];
    }
    
    private void dfsMinDiff(TreeNode root, int[] minDiff, Integer[] lastVal) {
        if (root == null) return;
        
        // Inorder traversal: left -> root -> right
        dfsMinDiff(root.left, minDiff, lastVal);
        
        if (lastVal[0] != null) {
            minDiff[0] = Math.min(minDiff[0], root.val - lastVal[0]);
        }
        lastVal[0] = root.val;
        
        dfsMinDiff(root.right, minDiff, lastVal);
    }
}

// Test class
class MinDistanceBetNodesTest {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test Case 1: Standard BST
        //       4
        //      / \
        //     2   6
        //    / \
        //   1   3
        TreeNode root1 = new TreeNode(4);
        root1.left = new TreeNode(2);
        root1.right = new TreeNode(6);
        root1.left.left = new TreeNode(1);
        root1.left.right = new TreeNode(3);
        
        System.out.println("Test Case 1 Min Diff: " + solution.minDiffInBST(root1)); // Expected: 1
        
        // Test Case 2: Simple BST
        //       1
        //        \
        //         3
        //        /
        //       2
        TreeNode root2 = new TreeNode(1);
        root2.right = new TreeNode(3);
        root2.right.left = new TreeNode(2);
        
        System.out.println("Test Case 2 Min Diff: " + solution.minDiffInBST(root2)); // Expected: 1
        
        // Test Case 3: Single node
        TreeNode root3 = new TreeNode(1);
        System.out.println("Test Case 3 Min Diff: " + solution.minDiffInBST(root3)); // Expected: Integer.MAX_VALUE (no difference)
        
        // Test Case 4: Left-skewed BST
        TreeNode root4 = new TreeNode(4);
        root4.left = new TreeNode(3);
        root4.left.left = new TreeNode(2);
        root4.left.left.left = new TreeNode(1);
        
        System.out.println("Test Case 4 Min Diff: " + solution.minDiffInBST(root4)); // Expected: 1
        
        // Test Case 5: Right-skewed BST
        TreeNode root5 = new TreeNode(1);
        root5.right = new TreeNode(2);
        root5.right.right = new TreeNode(3);
        root5.right.right.right = new TreeNode(4);
        
        System.out.println("Test Case 5 Min Diff: " + solution.minDiffInBST(root5)); // Expected: 1
        
        // Test Case 6: Balanced BST with larger differences
        //       10
        //      /  \
        //     5    15
        //    / \   / \
        //   3   7 12  18
        TreeNode root6 = new TreeNode(10);
        root6.left = new TreeNode(5);
        root6.right = new TreeNode(15);
        root6.left.left = new TreeNode(3);
        root6.left.right = new TreeNode(7);
        root6.right.left = new TreeNode(12);
        root6.right.right = new TreeNode(18);
        
        System.out.println("Test Case 6 Min Diff: " + solution.minDiffInBST(root6)); // Expected: 2 (12-10)
        
        // Test Case 7: BST with duplicate-like values
        //       5
        //      / \
        //     4   6
        //    /     \
        //   3       7
        TreeNode root7 = new TreeNode(5);
        root7.left = new TreeNode(4);
        root7.right = new TreeNode(6);
        root7.left.left = new TreeNode(3);
        root7.right.right = new TreeNode(7);
        
        System.out.println("Test Case 7 Min Diff: " + solution.minDiffInBST(root7)); // Expected: 1
        
        // Test Case 8: Large BST
        //       50
        //      /  \
        //     30   70
        //    /  \  / \
        //   20  40 60 80
        TreeNode root8 = new TreeNode(50);
        root8.left = new TreeNode(30);
        root8.right = new TreeNode(70);
        root8.left.left = new TreeNode(20);
        root8.left.right = new TreeNode(40);
        root8.right.left = new TreeNode(60);
        root8.right.right = new TreeNode(80);
        
        System.out.println("Test Case 8 Min Diff: " + solution.minDiffInBST(root8)); // Expected: 10
        
        System.out.println("\n--- Testing all approaches ---");
        
        // Recreate test tree for each approach
        TreeNode testRoot = new TreeNode(4);
        testRoot.left = new TreeNode(2);
        testRoot.right = new TreeNode(6);
        testRoot.left.left = new TreeNode(1);
        testRoot.left.right = new TreeNode(3);
        
        System.out.println("Inorder Traversal: " + solution.minDiffInBST(testRoot));
        
        // Reset for next test
        solution.min = Integer.MAX_VALUE;
        solution.prev = null;
        
        System.out.println("Inorder with List: " + solution.minDiffInBSTWithList(testRoot));
        System.out.println("Iterative Inorder: " + solution.minDiffInBSTIterative(testRoot));
        System.out.println("Morris Traversal: " + solution.minDiffInBSTMorris(testRoot));
        System.out.println("BFS with Sorting: " + solution.minDiffInBSTBFS(testRoot));
        System.out.println("Enhanced Inorder: " + solution.minDiffInBSTEnhanced(testRoot));
        System.out.println("Postorder Range: " + solution.minDiffInBSTPostorder(testRoot));
        System.out.println("DFS Global: " + solution.minDiffInBSTDFS(testRoot));
        
        // Test edge case: null root
        System.out.println("\nNull root test: " + solution.minDiffInBSTIterative(null)); // Expected: 0
    }
} 