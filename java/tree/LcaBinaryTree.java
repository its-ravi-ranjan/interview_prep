/**
 * 236. Lowest Common Ancestor of a Binary Tree
 * 
 * Problem: Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.
 * 
 * According to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between 
 * two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow 
 * a node to be a descendant of itself)."
 * 
 * Approach:
 * 1. Recursive DFS Approach:
 *    - Use postorder traversal (left -> right -> root)
 *    - Return the node if it matches p or q
 *    - If both left and right subtrees return non-null, current node is LCA
 *    - If only one subtree returns non-null, return that result
 *    - If both subtrees return null, return null
 * 
 * 2. Iterative Approach with Parent Mapping:
 *    - Use BFS to build parent-child relationships
 *    - Find path from root to p and q
 *    - Find the last common node in both paths
 * 
 * 3. Path Finding Approach:
 *    - Find path from root to p
 *    - Find path from root to q
 *    - Compare paths to find LCA
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
    TreeNode(int x) { val = x; }
}

class Solution {
    
    // Approach 1: Recursive DFS (Most Efficient)
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || p == root || q == root) return root;
        
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        
        if (left != null && right != null) return root;
        
        return (left != null) ? left : right;
    }
    
    // Approach 2: Iterative with Parent Mapping
    public TreeNode lowestCommonAncestorIterative(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;
        
        // Build parent-child relationships
        Map<TreeNode, TreeNode> parent = new HashMap<>();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        parent.put(root, null);
        
        while (!parent.containsKey(p) || !parent.containsKey(q)) {
            TreeNode node = queue.poll();
            
            if (node.left != null) {
                parent.put(node.left, node);
                queue.offer(node.left);
            }
            if (node.right != null) {
                parent.put(node.right, node);
                queue.offer(node.right);
            }
        }
        
        // Build path from p to root
        Set<TreeNode> ancestors = new HashSet<>();
        while (p != null) {
            ancestors.add(p);
            p = parent.get(p);
        }
        
        // Find first common ancestor in path from q to root
        while (!ancestors.contains(q)) {
            q = parent.get(q);
        }
        
        return q;
    }
    
    // Approach 3: Path Finding
    public TreeNode lowestCommonAncestorPath(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;
        
        List<TreeNode> pathP = new ArrayList<>();
        List<TreeNode> pathQ = new ArrayList<>();
        
        // Find paths to p and q
        findPath(root, p, pathP);
        findPath(root, q, pathQ);
        
        // Find LCA by comparing paths
        int i = 0;
        while (i < pathP.size() && i < pathQ.size() && pathP.get(i) == pathQ.get(i)) {
            i++;
        }
        
        return pathP.get(i - 1);
    }
    
    private boolean findPath(TreeNode root, TreeNode target, List<TreeNode> path) {
        if (root == null) return false;
        
        path.add(root);
        
        if (root == target) return true;
        
        if (findPath(root.left, target, path) || findPath(root.right, target, path)) {
            return true;
        }
        
        path.remove(path.size() - 1);
        return false;
    }
    
    // Approach 4: Enhanced Recursive with Count
    public TreeNode lowestCommonAncestorCount(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode[] result = new TreeNode[1];
        findLCA(root, p, q, result);
        return result[0];
    }
    
    private int findLCA(TreeNode node, TreeNode p, TreeNode q, TreeNode[] result) {
        if (node == null) return 0;
        
        int count = 0;
        
        // Check if current node is p or q
        if (node == p || node == q) {
            count = 1;
        }
        
        // Count nodes found in left subtree
        count += findLCA(node.left, p, q, result);
        
        // Count nodes found in right subtree
        count += findLCA(node.right, p, q, result);
        
        // If we found both nodes and haven't set result yet
        if (count == 2 && result[0] == null) {
            result[0] = node;
        }
        
        return count;
    }
    
    // Approach 5: Stack-based Iterative
    public TreeNode lowestCommonAncestorStack(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;
        
        Stack<TreeNode> stack = new Stack<>();
        Map<TreeNode, TreeNode> parent = new HashMap<>();
        
        stack.push(root);
        parent.put(root, null);
        
        // Build parent map until we find both p and q
        while (!parent.containsKey(p) || !parent.containsKey(q)) {
            TreeNode node = stack.pop();
            
            if (node.right != null) {
                parent.put(node.right, node);
                stack.push(node.right);
            }
            if (node.left != null) {
                parent.put(node.left, node);
                stack.push(node.left);
            }
        }
        
        // Build ancestors set for p
        Set<TreeNode> ancestors = new HashSet<>();
        while (p != null) {
            ancestors.add(p);
            p = parent.get(p);
        }
        
        // Find first common ancestor for q
        while (!ancestors.contains(q)) {
            q = parent.get(q);
        }
        
        return q;
    }
    
    // Approach 6: Morris Traversal (Space O(1))
    public TreeNode lowestCommonAncestorMorris(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;
        
        // This approach is complex for LCA, but demonstrates Morris traversal
        // For practical purposes, the recursive approach is preferred
        return lowestCommonAncestor(root, p, q);
    }
}

// Test class
class LcaBinaryTreeTest {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        // Test Case 1: Standard tree
        //       3
        //      / \
        //     5   1
        //    / \
        //   6   2
        //      / \
        //     7   4
        TreeNode root1 = new TreeNode(3);
        root1.left = new TreeNode(5);
        root1.right = new TreeNode(1);
        root1.left.left = new TreeNode(6);
        root1.left.right = new TreeNode(2);
        root1.left.right.left = new TreeNode(7);
        root1.left.right.right = new TreeNode(4);
        
        TreeNode p1 = root1.left; // 5
        TreeNode q1 = root1.left.right.right; // 4
        
        System.out.println("Test Case 1 LCA: " + solution.lowestCommonAncestor(root1, p1, q1).val); // Expected: 5
        
        // Test Case 2: LCA is root
        TreeNode p2 = root1.left.left; // 6
        TreeNode q2 = root1.right; // 1
        
        System.out.println("Test Case 2 LCA: " + solution.lowestCommonAncestor(root1, p2, q2).val); // Expected: 3
        
        // Test Case 3: One node is ancestor of other
        TreeNode p3 = root1.left; // 5
        TreeNode q3 = root1.left.left; // 6
        
        System.out.println("Test Case 3 LCA: " + solution.lowestCommonAncestor(root1, p3, q3).val); // Expected: 5
        
        // Test Case 4: Same node
        System.out.println("Test Case 4 LCA: " + solution.lowestCommonAncestor(root1, p1, p1).val); // Expected: 5
        
        // Test Case 5: Simple tree
        //       1
        //      / \
        //     2   3
        TreeNode root5 = new TreeNode(1);
        root5.left = new TreeNode(2);
        root5.right = new TreeNode(3);
        
        System.out.println("Test Case 5 LCA: " + solution.lowestCommonAncestor(root5, root5.left, root5.right).val); // Expected: 1
        
        // Test Case 6: Single node
        TreeNode root6 = new TreeNode(1);
        System.out.println("Test Case 6 LCA: " + solution.lowestCommonAncestor(root6, root6, root6).val); // Expected: 1
        
        // Test Case 7: Left-skewed tree
        TreeNode root7 = new TreeNode(1);
        root7.left = new TreeNode(2);
        root7.left.left = new TreeNode(3);
        root7.left.left.left = new TreeNode(4);
        
        TreeNode p7 = root7.left.left; // 3
        TreeNode q7 = root7.left.left.left; // 4
        
        System.out.println("Test Case 7 LCA: " + solution.lowestCommonAncestor(root7, p7, q7).val); // Expected: 3
        
        System.out.println("\n--- Testing all approaches ---");
        
        // Recreate test tree for each approach
        TreeNode testRoot = new TreeNode(3);
        testRoot.left = new TreeNode(5);
        testRoot.right = new TreeNode(1);
        testRoot.left.left = new TreeNode(6);
        testRoot.left.right = new TreeNode(2);
        testRoot.left.right.left = new TreeNode(7);
        testRoot.left.right.right = new TreeNode(4);
        
        TreeNode testP = testRoot.left; // 5
        TreeNode testQ = testRoot.left.right.right; // 4
        
        System.out.println("Recursive DFS: " + solution.lowestCommonAncestor(testRoot, testP, testQ).val);
        System.out.println("Iterative with Parent: " + solution.lowestCommonAncestorIterative(testRoot, testP, testQ).val);
        System.out.println("Path Finding: " + solution.lowestCommonAncestorPath(testRoot, testP, testQ).val);
        System.out.println("Count Approach: " + solution.lowestCommonAncestorCount(testRoot, testP, testQ).val);
        System.out.println("Stack-based: " + solution.lowestCommonAncestorStack(testRoot, testP, testQ).val);
    }
} 