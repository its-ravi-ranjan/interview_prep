/**
 * Closest Node in a Binary Search Tree
 * 
 * Problem: Given a binary search tree and a target value, find the node in the BST 
 * that is closest to the target value.
 * 
 * Approach:
 * 1. Iterative BST Traversal:
 *    - Start from root and traverse down the tree
 *    - Keep track of the closest value found so far
 *    - Compare current node's value with target
 *    - Use BST property to decide which direction to go
 *    - Continue until we reach a leaf node
 * 
 * 2. Recursive BST Traversal:
 *    - Use recursion to traverse the tree
 *    - Pass the closest value as parameter
 *    - Update closest value when a better match is found
 * 
 * 3. Inorder Traversal Approach:
 *    - Perform inorder traversal to get sorted values
 *    - Find the closest value in the sorted array
 *    - Less efficient but easier to understand
 * 
 * Time Complexity: O(h) where h is the height of the tree
 *                  In worst case (skewed tree): O(n)
 *                  In best case (balanced tree): O(log n)
 * Space Complexity: O(1) for iterative approach
 *                   O(h) for recursive approach (recursion stack)
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
    
    // Approach 1: Iterative BST Traversal (Most Efficient)
    public int closestValue(TreeNode root, double target) {
        if (root == null) return Integer.MIN_VALUE;
        
        int closest = root.val;
        
        while (root != null) {
            // Update closest if current node is closer to target
            if (Math.abs(root.val - target) < Math.abs(closest - target)) {
                closest = root.val;
            }
            
            // Use BST property to decide direction
            if (target > root.val) {
                root = root.right;
            } else {
                root = root.left;
            }
        }
        
        return closest;
    }
    
    // Approach 2: Recursive BST Traversal
    public int closestValueRecursive(TreeNode root, double target) {
        if (root == null) return Integer.MIN_VALUE;
        
        return findClosest(root, target, root.val);
    }
    
    private int findClosest(TreeNode node, double target, int closest) {
        if (node == null) return closest;
        
        // Update closest if current node is closer
        if (Math.abs(node.val - target) < Math.abs(closest - target)) {
            closest = node.val;
        }
        
        // Use BST property to decide direction
        if (target > node.val) {
            return findClosest(node.right, target, closest);
        } else {
            return findClosest(node.left, target, closest);
        }
    }
    
    // Approach 3: Inorder Traversal with Binary Search
    public int closestValueInorder(TreeNode root, double target) {
        if (root == null) return Integer.MIN_VALUE;
        
        // Collect all values using inorder traversal
        List<Integer> values = new ArrayList<>();
        inorderTraversal(root, values);
        
        // Find closest value using binary search
        return findClosestInArray(values, target);
    }
    
    private void inorderTraversal(TreeNode node, List<Integer> values) {
        if (node == null) return;
        
        inorderTraversal(node.left, values);
        values.add(node.val);
        inorderTraversal(node.right, values);
    }
    
    private int findClosestInArray(List<Integer> values, double target) {
        if (values.isEmpty()) return Integer.MIN_VALUE;
        
        int closest = values.get(0);
        
        for (int val : values) {
            if (Math.abs(val - target) < Math.abs(closest - target)) {
                closest = val;
            }
        }
        
        return closest;
    }
    
    // Approach 4: Enhanced Iterative with Early Termination
    public int closestValueEnhanced(TreeNode root, double target) {
        if (root == null) return Integer.MIN_VALUE;
        
        int closest = root.val;
        double minDiff = Math.abs(root.val - target);
        
        while (root != null) {
            double currentDiff = Math.abs(root.val - target);
            
            // Update closest if current node is closer
            if (currentDiff < minDiff) {
                minDiff = currentDiff;
                closest = root.val;
            }
            
            // Early termination if we find exact match
            if (currentDiff == 0) {
                return root.val;
            }
            
            // Use BST property to decide direction
            if (target > root.val) {
                root = root.right;
            } else {
                root = root.left;
            }
        }
        
        return closest;
    }
    
    // Approach 5: Two-Pointer Approach (for sorted array)
    public int closestValueTwoPointer(TreeNode root, double target) {
        if (root == null) return Integer.MIN_VALUE;
        
        // Convert to sorted array
        List<Integer> values = new ArrayList<>();
        inorderTraversal(root, values);
        
        // Use two pointers to find closest
        int left = 0, right = values.size() - 1;
        int closest = values.get(0);
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int midVal = values.get(mid);
            
            if (Math.abs(midVal - target) < Math.abs(closest - target)) {
                closest = midVal;
            }
            
            if (midVal < target) {
                left = mid + 1;
            } else if (midVal > target) {
                right = mid - 1;
            } else {
                return midVal; // Exact match found
            }
        }
        
        return closest;
    }
    
    // Approach 6: Morris Traversal (Space O(1))
    public int closestValueMorris(TreeNode root, double target) {
        if (root == null) return Integer.MIN_VALUE;
        
        int closest = root.val;
        double minDiff = Math.abs(root.val - target);
        TreeNode current = root;
        
        while (current != null) {
            if (current.left == null) {
                // Process current node
                double currentDiff = Math.abs(current.val - target);
                if (currentDiff < minDiff) {
                    minDiff = currentDiff;
                    closest = current.val;
                }
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
                    double currentDiff = Math.abs(current.val - target);
                    if (currentDiff < minDiff) {
                        minDiff = currentDiff;
                        closest = current.val;
                    }
                    current = current.right;
                }
            }
        }
        
        return closest;
    }
}

// Test class
class ClosetNodeTest {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test Case 1: Standard BST
        //       4
        //      / \
        //     2   5
        //    / \
        //   1   3
        TreeNode root1 = new TreeNode(4);
        root1.left = new TreeNode(2);
        root1.right = new TreeNode(5);
        root1.left.left = new TreeNode(1);
        root1.left.right = new TreeNode(3);
        
        System.out.println("Test Case 1 (target=3.714286): " + solution.closestValue(root1, 3.714286)); // Expected: 4
        System.out.println("Test Case 1 (target=2.1): " + solution.closestValue(root1, 2.1)); // Expected: 2
        System.out.println("Test Case 1 (target=1.5): " + solution.closestValue(root1, 1.5)); // Expected: 1
        
        // Test Case 2: Single node
        TreeNode root2 = new TreeNode(1);
        System.out.println("Test Case 2 (target=4.428571): " + solution.closestValue(root2, 4.428571)); // Expected: 1
        
        // Test Case 3: Left-skewed tree
        TreeNode root3 = new TreeNode(5);
        root3.left = new TreeNode(3);
        root3.left.left = new TreeNode(1);
        root3.left.left.left = new TreeNode(0);
        
        System.out.println("Test Case 3 (target=2.1): " + solution.closestValue(root3, 2.1)); // Expected: 1
        System.out.println("Test Case 3 (target=4.9): " + solution.closestValue(root3, 4.9)); // Expected: 5
        
        // Test Case 4: Right-skewed tree
        TreeNode root4 = new TreeNode(1);
        root4.right = new TreeNode(3);
        root4.right.right = new TreeNode(5);
        root4.right.right.right = new TreeNode(7);
        
        System.out.println("Test Case 4 (target=4.1): " + solution.closestValue(root4, 4.1)); // Expected: 5
        System.out.println("Test Case 4 (target=0.5): " + solution.closestValue(root4, 0.5)); // Expected: 1
        
        // Test Case 5: Perfect BST
        TreeNode root5 = new TreeNode(4);
        root5.left = new TreeNode(2);
        root5.right = new TreeNode(6);
        root5.left.left = new TreeNode(1);
        root5.left.right = new TreeNode(3);
        root5.right.left = new TreeNode(5);
        root5.right.right = new TreeNode(7);
        
        System.out.println("Test Case 5 (target=3.5): " + solution.closestValue(root5, 3.5)); // Expected: 3 or 4
        System.out.println("Test Case 5 (target=6.1): " + solution.closestValue(root5, 6.1)); // Expected: 6
        
        // Test Case 6: Edge cases
        System.out.println("Test Case 6 (null root): " + solution.closestValue(null, 5.0)); // Expected: Integer.MIN_VALUE
        
        System.out.println("\n--- Testing all approaches ---");
        
        // Recreate test tree for each approach
        TreeNode testRoot = new TreeNode(4);
        testRoot.left = new TreeNode(2);
        testRoot.right = new TreeNode(5);
        testRoot.left.left = new TreeNode(1);
        testRoot.left.right = new TreeNode(3);
        
        double testTarget = 3.714286;
        
        System.out.println("Iterative Approach: " + solution.closestValue(testRoot, testTarget));
        System.out.println("Recursive Approach: " + solution.closestValueRecursive(testRoot, testTarget));
        System.out.println("Inorder Approach: " + solution.closestValueInorder(testRoot, testTarget));
        System.out.println("Enhanced Iterative: " + solution.closestValueEnhanced(testRoot, testTarget));
        System.out.println("Two-Pointer: " + solution.closestValueTwoPointer(testRoot, testTarget));
        System.out.println("Morris Traversal: " + solution.closestValueMorris(testRoot, testTarget));
    }
} 