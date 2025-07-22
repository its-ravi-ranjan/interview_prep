/**
 * 110. Balanced Binary Tree
 * 
 * Problem: Given a binary tree, determine if it is height-balanced.
 * 
 * A height-balanced binary tree is a binary tree in which the depth of the two subtrees 
 * of every node never differs by more than one.
 * 
 * Approach:
 * 1. Bottom-Up DFS with Height Calculation:
 *    - Use DFS to calculate height of each subtree
 *    - Return -1 if any subtree is unbalanced
 *    - Return actual height if subtree is balanced
 *    - Check balance condition: |left_height - right_height| <= 1
 * 
 * 2. Top-Down DFS with Height Calculation:
 *    - Calculate height for each node separately
 *    - Check balance condition at each node
 *    - Less efficient as height is calculated multiple times
 * 
 * 3. Iterative Approach with Stack:
 *    - Use postorder traversal with stack
 *    - Track heights and balance condition
 *    - More complex but avoids recursion
 * 
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(h) where h is the height of the tree (recursion stack)
 *                  In worst case (skewed tree): O(n)
 *                  In best case (balanced tree): O(log n)
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
    
    // Approach 1: Bottom-Up DFS with Height Calculation (Most Efficient)
    public boolean isBalanced(TreeNode root) {
        return dfs(root) != -1;
    }
    
    private int dfs(TreeNode root) {
        if (root == null) return 0;
        
        // Check left subtree
        int left = dfs(root.left);
        if (left == -1) return -1; // Left subtree is unbalanced
        
        // Check right subtree
        int right = dfs(root.right);
        if (right == -1) return -1; // Right subtree is unbalanced
        
        // Check balance condition
        if (Math.abs(left - right) > 1) return -1; // Current node is unbalanced
        
        // Return height of current subtree
        return Math.max(left, right) + 1;
    }
    
    // Approach 2: Top-Down DFS with Height Calculation
    public boolean isBalancedTopDown(TreeNode root) {
        if (root == null) return true;
        
        // Check balance condition at current node
        if (Math.abs(getHeight(root.left) - getHeight(root.right)) > 1) {
            return false;
        }
        
        // Recursively check left and right subtrees
        return isBalancedTopDown(root.left) && isBalancedTopDown(root.right);
    }
    
    private int getHeight(TreeNode node) {
        if (node == null) return 0;
        return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
    }
    
    // Approach 3: Iterative Approach with Stack
    public boolean isBalancedIterative(TreeNode root) {
        if (root == null) return true;
        
        Stack<TreeNode> stack = new Stack<>();
        Map<TreeNode, Integer> heights = new HashMap<>();
        
        // Postorder traversal
        TreeNode current = root;
        TreeNode lastVisited = null;
        
        while (current != null || !stack.isEmpty()) {
            // Go to leftmost node
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            
            current = stack.peek();
            
            // Check if right subtree is processed
            if (current.right == null || current.right == lastVisited) {
                stack.pop();
                
                // Calculate height of current node
                int leftHeight = heights.getOrDefault(current.left, 0);
                int rightHeight = heights.getOrDefault(current.right, 0);
                
                // Check balance condition
                if (Math.abs(leftHeight - rightHeight) > 1) {
                    return false;
                }
                
                heights.put(current, Math.max(leftHeight, rightHeight) + 1);
                lastVisited = current;
                current = null;
            } else {
                current = current.right;
            }
        }
        
        return true;
    }
    
    // Approach 4: Enhanced Bottom-Up with Early Termination
    public boolean isBalancedEnhanced(TreeNode root) {
        return checkBalance(root) != -1;
    }
    
    private int checkBalance(TreeNode node) {
        if (node == null) return 0;
        
        // Check left subtree first
        int leftHeight = checkBalance(node.left);
        if (leftHeight == -1) return -1;
        
        // Check right subtree
        int rightHeight = checkBalance(node.right);
        if (rightHeight == -1) return -1;
        
        // Check balance condition
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }
        
        // Return height of current subtree
        return Math.max(leftHeight, rightHeight) + 1;
    }
    
    // Approach 5: BFS with Level Tracking (Alternative approach)
    public boolean isBalancedBFS(TreeNode root) {
        if (root == null) return true;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            
            // Check balance at current node
            if (!isNodeBalanced(node)) {
                return false;
            }
            
            // Add children to queue
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        
        return true;
    }
    
    private boolean isNodeBalanced(TreeNode node) {
        if (node == null) return true;
        
        int leftHeight = getHeightRecursive(node.left);
        int rightHeight = getHeightRecursive(node.right);
        
        return Math.abs(leftHeight - rightHeight) <= 1;
    }
    
    private int getHeightRecursive(TreeNode node) {
        if (node == null) return 0;
        return Math.max(getHeightRecursive(node.left), getHeightRecursive(node.right)) + 1;
    }
}

// Test class
class BalanceTreeTest {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test Case 1: Balanced tree
        //       3
        //      / \
        //     9  20
        //        / \
        //       15  7
        TreeNode root1 = new TreeNode(3);
        root1.left = new TreeNode(9);
        root1.right = new TreeNode(20);
        root1.right.left = new TreeNode(15);
        root1.right.right = new TreeNode(7);
        
        System.out.println("Test Case 1 (Balanced): " + solution.isBalanced(root1)); // Expected: true
        
        // Test Case 2: Unbalanced tree
        //       1
        //      / \
        //     2   2
        //    / \
        //   3   3
        //  / \
        // 4   4
        TreeNode root2 = new TreeNode(1);
        root2.left = new TreeNode(2);
        root2.right = new TreeNode(2);
        root2.left.left = new TreeNode(3);
        root2.left.right = new TreeNode(3);
        root2.left.left.left = new TreeNode(4);
        root2.left.left.right = new TreeNode(4);
        
        System.out.println("Test Case 2 (Unbalanced): " + solution.isBalanced(root2)); // Expected: false
        
        // Test Case 3: Empty tree
        System.out.println("Test Case 3 (Empty): " + solution.isBalanced(null)); // Expected: true
        
        // Test Case 4: Single node
        TreeNode root4 = new TreeNode(1);
        System.out.println("Test Case 4 (Single node): " + solution.isBalanced(root4)); // Expected: true
        
        // Test Case 5: Left-skewed tree
        TreeNode root5 = new TreeNode(1);
        root5.left = new TreeNode(2);
        root5.left.left = new TreeNode(3);
        root5.left.left.left = new TreeNode(4);
        
        System.out.println("Test Case 5 (Left-skewed): " + solution.isBalanced(root5)); // Expected: false
        
        // Test Case 6: Right-skewed tree
        TreeNode root6 = new TreeNode(1);
        root6.right = new TreeNode(2);
        root6.right.right = new TreeNode(3);
        root6.right.right.right = new TreeNode(4);
        
        System.out.println("Test Case 6 (Right-skewed): " + solution.isBalanced(root6)); // Expected: false
        
        // Test Case 7: Perfectly balanced tree
        TreeNode root7 = new TreeNode(1);
        root7.left = new TreeNode(2);
        root7.right = new TreeNode(3);
        root7.left.left = new TreeNode(4);
        root7.left.right = new TreeNode(5);
        root7.right.left = new TreeNode(6);
        root7.right.right = new TreeNode(7);
        
        System.out.println("Test Case 7 (Perfectly balanced): " + solution.isBalanced(root7)); // Expected: true
        
        System.out.println("\n--- Testing all approaches ---");
        
        // Recreate test cases for each approach
        TreeNode testRoot = new TreeNode(3);
        testRoot.left = new TreeNode(9);
        testRoot.right = new TreeNode(20);
        testRoot.right.left = new TreeNode(15);
        testRoot.right.right = new TreeNode(7);
        
        System.out.println("Bottom-Up DFS: " + solution.isBalanced(testRoot));
        System.out.println("Top-Down DFS: " + solution.isBalancedTopDown(testRoot));
        System.out.println("Iterative: " + solution.isBalancedIterative(testRoot));
        System.out.println("Enhanced Bottom-Up: " + solution.isBalancedEnhanced(testRoot));
        System.out.println("BFS Approach: " + solution.isBalancedBFS(testRoot));
    }
} 