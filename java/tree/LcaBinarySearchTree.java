/**
 * 235. Lowest Common Ancestor of a Binary Search Tree
 * 
 * Problem: Given a binary search tree (BST), find the lowest common ancestor (LCA) 
 * node of two given nodes in the BST.
 * 
 * According to the definition of LCA on Wikipedia: "The lowest common ancestor is 
 * defined between two nodes p and q as the lowest node in T that has both p and q 
 * as descendants (where we allow a node to be a descendant of itself)."
 * 
 * Approach:
 * 1. Iterative BST Traversal (Most Efficient):
 *    - Use BST property: left subtree < root < right subtree
 *    - If both p and q are less than root, go left
 *    - If both p and q are greater than root, go right
 *    - If p and q are on different sides of root, root is LCA
 *    - Continue until we find the LCA
 * 
 * 2. Recursive BST Traversal:
 *    - Same logic as iterative but using recursion
 *    - More elegant but uses recursion stack
 * 
 * 3. Path Finding Approach:
 *    - Find path from root to p and q
 *    - Compare paths to find LCA
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
    TreeNode(int x) { val = x; }
}

class Solution {
    
    // Approach 1: Iterative BST Traversal (Most Efficient)
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        while (root != null) {
            if (p.val < root.val && q.val < root.val) {
                root = root.left;
            } else if (p.val > root.val && q.val > root.val) {
                root = root.right;
            } else {
                return root;
            }
        }
        return null;
    }
    
    // Approach 2: Recursive BST Traversal
    public TreeNode lowestCommonAncestorRecursive(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;
        
        if (p.val < root.val && q.val < root.val) {
            return lowestCommonAncestorRecursive(root.left, p, q);
        } else if (p.val > root.val && q.val > root.val) {
            return lowestCommonAncestorRecursive(root.right, p, q);
        } else {
            return root;
        }
    }
    
    // Approach 3: Path Finding Approach
    public TreeNode lowestCommonAncestorPath(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;
        
        List<TreeNode> pathP = new ArrayList<>();
        List<TreeNode> pathQ = new ArrayList<>();
        
        // Find paths to p and q using BST property
        findPathBST(root, p, pathP);
        findPathBST(root, q, pathQ);
        
        // Find LCA by comparing paths
        int i = 0;
        while (i < pathP.size() && i < pathQ.size() && pathP.get(i) == pathQ.get(i)) {
            i++;
        }
        
        return pathP.get(i - 1);
    }
    
    private void findPathBST(TreeNode root, TreeNode target, List<TreeNode> path) {
        while (root != null) {
            path.add(root);
            if (target.val < root.val) {
                root = root.left;
            } else if (target.val > root.val) {
                root = root.right;
            } else {
                break; // Found target
            }
        }
    }
    
    // Approach 4: Enhanced Iterative with Early Termination
    public TreeNode lowestCommonAncestorEnhanced(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;
        
        // Ensure p.val <= q.val for easier comparison
        if (p.val > q.val) {
            TreeNode temp = p;
            p = q;
            q = temp;
        }
        
        while (root != null) {
            // If root is between p and q (inclusive), it's the LCA
            if (p.val <= root.val && root.val <= q.val) {
                return root;
            }
            
            // If both nodes are less than root, go left
            if (q.val < root.val) {
                root = root.left;
            } else {
                // If both nodes are greater than root, go right
                root = root.right;
            }
        }
        
        return null;
    }
    
    // Approach 5: Stack-based Iterative
    public TreeNode lowestCommonAncestorStack(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;
        
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        
        while (!stack.isEmpty()) {
            TreeNode current = stack.pop();
            
            // Check if current node is LCA
            if ((p.val <= current.val && current.val <= q.val) || 
                (q.val <= current.val && current.val <= p.val)) {
                return current;
            }
            
            // Add children based on BST property
            if (p.val < current.val && q.val < current.val && current.left != null) {
                stack.push(current.left);
            } else if (p.val > current.val && q.val > current.val && current.right != null) {
                stack.push(current.right);
            }
        }
        
        return null;
    }
    
    // Approach 6: Morris Traversal (Space O(1))
    public TreeNode lowestCommonAncestorMorris(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;
        
        TreeNode current = root;
        
        while (current != null) {
            // Check if current node is LCA
            if ((p.val <= current.val && current.val <= q.val) || 
                (q.val <= current.val && current.val <= p.val)) {
                return current;
            }
            
            if (current.left == null) {
                // No left child, go right
                if (p.val > current.val && q.val > current.val) {
                    current = current.right;
                } else {
                    break; // Should have gone left but no left child
                }
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
                    // Revert the changes
                    predecessor.right = null;
                    if (p.val > current.val && q.val > current.val) {
                        current = current.right;
                    } else {
                        break;
                    }
                }
            }
        }
        
        return null;
    }
    
    // Approach 7: BFS with BST Property
    public TreeNode lowestCommonAncestorBFS(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();
            
            // Check if current node is LCA
            if ((p.val <= current.val && current.val <= q.val) || 
                (q.val <= current.val && current.val <= p.val)) {
                return current;
            }
            
            // Add children based on BST property
            if (p.val < current.val && q.val < current.val && current.left != null) {
                queue.offer(current.left);
            } else if (p.val > current.val && q.val > current.val && current.right != null) {
                queue.offer(current.right);
            }
        }
        
        return null;
    }
}

// Test class
class LcaBinarySearchTreeTest {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test Case 1: Standard BST
        //       6
        //      / \
        //     2   8
        //    / \
        //   0   4
        //      / \
        //     3   5
        TreeNode root1 = new TreeNode(6);
        root1.left = new TreeNode(2);
        root1.right = new TreeNode(8);
        root1.left.left = new TreeNode(0);
        root1.left.right = new TreeNode(4);
        root1.left.right.left = new TreeNode(3);
        root1.left.right.right = new TreeNode(5);
        
        TreeNode p1 = root1.left; // 2
        TreeNode q1 = root1.left.right.right; // 5
        
        System.out.println("Test Case 1 LCA: " + solution.lowestCommonAncestor(root1, p1, q1).val); // Expected: 2
        
        // Test Case 2: LCA is root
        TreeNode p2 = root1.left.left; // 0
        TreeNode q2 = root1.right; // 8
        
        System.out.println("Test Case 2 LCA: " + solution.lowestCommonAncestor(root1, p2, q2).val); // Expected: 6
        
        // Test Case 3: One node is ancestor of other
        TreeNode p3 = root1.left; // 2
        TreeNode q3 = root1.left.left; // 0
        
        System.out.println("Test Case 3 LCA: " + solution.lowestCommonAncestor(root1, p3, q3).val); // Expected: 2
        
        // Test Case 4: Same node
        System.out.println("Test Case 4 LCA: " + solution.lowestCommonAncestor(root1, p1, p1).val); // Expected: 2
        
        // Test Case 5: Simple BST
        //       2
        //      / \
        //     1   3
        TreeNode root5 = new TreeNode(2);
        root5.left = new TreeNode(1);
        root5.right = new TreeNode(3);
        
        System.out.println("Test Case 5 LCA: " + solution.lowestCommonAncestor(root5, root5.left, root5.right).val); // Expected: 2
        
        // Test Case 6: Single node
        TreeNode root6 = new TreeNode(1);
        System.out.println("Test Case 6 LCA: " + solution.lowestCommonAncestor(root6, root6, root6).val); // Expected: 1
        
        // Test Case 7: Left-skewed BST
        TreeNode root7 = new TreeNode(4);
        root7.left = new TreeNode(3);
        root7.left.left = new TreeNode(2);
        root7.left.left.left = new TreeNode(1);
        
        TreeNode p7 = root7.left.left; // 2
        TreeNode q7 = root7.left.left.left; // 1
        
        System.out.println("Test Case 7 LCA: " + solution.lowestCommonAncestor(root7, p7, q7).val); // Expected: 2
        
        // Test Case 8: Right-skewed BST
        TreeNode root8 = new TreeNode(1);
        root8.right = new TreeNode(2);
        root8.right.right = new TreeNode(3);
        root8.right.right.right = new TreeNode(4);
        
        TreeNode p8 = root8.right; // 2
        TreeNode q8 = root8.right.right.right; // 4
        
        System.out.println("Test Case 8 LCA: " + solution.lowestCommonAncestor(root8, p8, q8).val); // Expected: 2
        
        // Test Case 9: Nodes in different subtrees
        TreeNode p9 = root1.left.right.left; // 3
        TreeNode q9 = root1.right; // 8
        
        System.out.println("Test Case 9 LCA: " + solution.lowestCommonAncestor(root1, p9, q9).val); // Expected: 6
        
        System.out.println("\n--- Testing all approaches ---");
        
        // Recreate test tree for each approach
        TreeNode testRoot = new TreeNode(6);
        testRoot.left = new TreeNode(2);
        testRoot.right = new TreeNode(8);
        testRoot.left.left = new TreeNode(0);
        testRoot.left.right = new TreeNode(4);
        testRoot.left.right.left = new TreeNode(3);
        testRoot.left.right.right = new TreeNode(5);
        
        TreeNode testP = testRoot.left; // 2
        TreeNode testQ = testRoot.left.right.right; // 5
        
        System.out.println("Iterative BST: " + solution.lowestCommonAncestor(testRoot, testP, testQ).val);
        System.out.println("Recursive BST: " + solution.lowestCommonAncestorRecursive(testRoot, testP, testQ).val);
        System.out.println("Path Finding: " + solution.lowestCommonAncestorPath(testRoot, testP, testQ).val);
        System.out.println("Enhanced Iterative: " + solution.lowestCommonAncestorEnhanced(testRoot, testP, testQ).val);
        System.out.println("Stack-based: " + solution.lowestCommonAncestorStack(testRoot, testP, testQ).val);
        System.out.println("Morris Traversal: " + solution.lowestCommonAncestorMorris(testRoot, testP, testQ).val);
        System.out.println("BFS Approach: " + solution.lowestCommonAncestorBFS(testRoot, testP, testQ).val);
    }
} 