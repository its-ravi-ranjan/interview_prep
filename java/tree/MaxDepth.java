/**
 * MAXIMUM DEPTH - BINARY TREE
 * 
 * 🎯 PROBLEM STATEMENT:
 * Given the root of a binary tree, return its maximum depth.
 * A binary tree's maximum depth is the number of nodes along the longest path
 * from the root node down to the farthest leaf node.
 * 
 * 📝 EXAMPLES:
 * Input: root = [3,9,20,null,null,15,7] → Output: 3
 * Input: root = [1,null,2] → Output: 2
 * Input: root = [] → Output: 0
 * 
 * 🔍 PATTERN RECOGNITION:
 * This is a classic Tree Traversal problem!
 * - Can be solved using BFS (level counting) or DFS (recursive/iterative)
 * - Need to track depth information during traversal
 * - Multiple approaches with different trade-offs
 * 
 * 🎯 KEY INSIGHT:
 * Maximum depth is the longest path from root to any leaf node.
 * Can be found by counting levels (BFS) or recursive depth calculation (DFS).
 * 
 * ==================== QUICK RECAP - ALL APPROACHES ====================
 * 
 * 🎯 APPROACH 1: BFS (LEVEL COUNTING)
 * 💡 IDEA: Use queue to traverse level by level, count levels
 * ⏰ TIME: O(n) - Visit each node once
 * 🏠 SPACE: O(w) - Width of tree (queue size)
 * ✅ BEST FOR: Understanding level structure, balanced trees
 * 
 * 🎯 APPROACH 2: DFS RECURSIVE
 * 💡 IDEA: Recursively find max depth of left and right subtrees
 * ⏰ TIME: O(n) - Visit each node once
 * 🏠 SPACE: O(h) - Height of tree (call stack)
 * ✅ BEST FOR: Simple implementation, understanding recursion
 * 
 * 🎯 APPROACH 3: DFS ITERATIVE WITH STACK (RECOMMENDED)
 * 💡 IDEA: Use stack with Pair<TreeNode, Integer> to track node and depth
 * ⏰ TIME: O(n) - Visit each node once
 * 🏠 SPACE: O(h) - Height of tree (stack size)
 * ✅ BEST FOR: Most efficient iterative approach, interview favorite
 * 
 * 📊 COMPARISON TABLE:
 * ┌─────────────────┬─────────────────┬─────────────┬─────────────┬─────────────┐
 * │    APPROACH     │   TIME COMPLEXITY│SPACE COMPLEXITY│  PRACTICAL  │  INTERVIEW  │
 * ├─────────────────┼─────────────────┼─────────────┼─────────────┼─────────────┤
 * │ BFS Level Count │       O(n)      │     O(w)     │    ⭐⭐⭐⭐    │    ⭐⭐⭐⭐    │
 * │ DFS Recursive   │       O(n)      │     O(h)     │    ⭐⭐⭐⭐⭐   │    ⭐⭐⭐⭐⭐   │
 * │ DFS Iterative   │       O(n)      │     O(h)     │    ⭐⭐⭐⭐⭐   │    ⭐⭐⭐⭐⭐   │
 * └─────────────────┴─────────────────┴─────────────┴─────────────┴─────────────┘
 * 
 * 🎯 INTERVIEW ANSWER: "I can solve this using BFS to count levels or DFS to 
 * recursively find max depth. For iterative approach, I use a stack with Pair 
 * to track both node and current depth. Time complexity is O(n) and space is O(h)."
 * 
 * 🔑 KEY POINTS TO REMEMBER:
 * 1. BFS: Count levels while traversing with queue
 * 2. DFS Recursive: max(leftDepth, rightDepth) + 1
 * 3. DFS Iterative: Use stack with Pair<TreeNode, Integer>
 * 4. Track current depth and update max depth
 * 5. Handle null nodes appropriately
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
    // ==================== APPROACH 1: BFS (LEVEL COUNTING) ====================
    /**
     * 🎯 APPROACH: BFS (Level Counting)
     * 
     * 💡 IDEA: 
     * - Use queue to traverse level by level
     * - Count the number of levels
     * - Each level represents one depth level
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Visit each node exactly once
     * 
     * 🏠 SPACE COMPLEXITY: O(w)
     *    - w = width of tree (maximum number of nodes at any level)
     *    - Queue may contain all nodes at the widest level
     */
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

    // ==================== APPROACH 2: DFS RECURSIVE ====================
    /**
     * 🎯 APPROACH: DFS Recursive
     * 
     * 💡 IDEA: 
     * - Recursively find max depth of left and right subtrees
     * - Return max(leftDepth, rightDepth) + 1
     * - Base case: null node returns 0
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Visit each node exactly once
     * 
     * 🏠 SPACE COMPLEXITY: O(h)
     *    - h = height of tree (call stack depth)
     *    - Worst case: O(n) for skewed tree
     */
    public int maxDepthDFS(TreeNode root) {
        if (root == null) return 0;
        return Math.max(maxDepthDFS(root.left), maxDepthDFS(root.right)) + 1;
    }
    
    // ==================== APPROACH 3: DFS ITERATIVE WITH STACK ====================
    /**
     * 🎯 APPROACH: DFS Iterative with Stack (RECOMMENDED)
     * 
     * 💡 IDEA: 
     * - Use stack with Pair<TreeNode, Integer> to track node and current depth
     * - Push children with incremented depth
     * - Update max depth when visiting each node
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Visit each node exactly once
     * 
     * 🏠 SPACE COMPLEXITY: O(h)
     *    - h = height of tree (stack size)
     *    - Worst case: O(n) for skewed tree
     */
    public int maxDepthIterative(TreeNode root) {
        if (root == null) return 0;

        Stack<Pair<TreeNode, Integer>> stack = new Stack<>();
        stack.push(new Pair<>(root, 1));
        int max = 0;

        while (!stack.isEmpty()) {
            Pair<TreeNode, Integer> current = stack.pop();
            TreeNode node = current.getKey();
            int depth = current.getValue();

            if (node != null) {
                max = Math.max(max, depth);
                stack.push(new Pair<>(node.left, depth + 1));
                stack.push(new Pair<>(node.right, depth + 1));
            }
        }

        return max;
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
        System.out.println("DFS Recursive: " + solution.maxDepthDFS(root1));
        System.out.println("DFS Iterative: " + solution.maxDepthIterative(root1));

        // Test case 2: Empty tree
        System.out.println("\nTest case 2: Empty tree");
        TreeNode root2 = null;
        System.out.println("BFS approach: " + solution.maxDepth(root2));
        System.out.println("DFS Recursive: " + solution.maxDepthDFS(root2));
        System.out.println("DFS Iterative: " + solution.maxDepthIterative(root2));

        // Test case 3: Single node
        System.out.println("\nTest case 3: Single node [1]");
        TreeNode root3 = createTree(new Integer[]{1});
        System.out.println("BFS approach: " + solution.maxDepth(root3));
        System.out.println("DFS Recursive: " + solution.maxDepthDFS(root3));
        System.out.println("DFS Iterative: " + solution.maxDepthIterative(root3));

        // Test case 4: Left skewed tree
        System.out.println("\nTest case 4: Left skewed tree [1,2,null,3]");
        TreeNode root4 = createTree(new Integer[]{1, 2, null, 3});
        System.out.println("BFS approach: " + solution.maxDepth(root4));
        System.out.println("DFS Recursive: " + solution.maxDepthDFS(root4));
        System.out.println("DFS Iterative: " + solution.maxDepthIterative(root4));

        // Test case 5: Right skewed tree
        System.out.println("\nTest case 5: Right skewed tree [1,null,2,null,3]");
        TreeNode root5 = createTree(new Integer[]{1, null, 2, null, 3});
        System.out.println("BFS approach: " + solution.maxDepth(root5));
        System.out.println("DFS Recursive: " + solution.maxDepthDFS(root5));
        System.out.println("DFS Iterative: " + solution.maxDepthIterative(root5));
    }
} 