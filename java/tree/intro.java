/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation and tree learning guide
 * 
 * ========================================
 * TREE DATA STRUCTURE - COMPLETE GUIDE
 * ========================================
 * 
 * What is a Tree?
 * ----------------
 * A tree is a hierarchical data structure with nodes connected by edges.
 * Each node has a value and references to child nodes.
 * 
 * Tree Types:
 * ------------
 * 1. Binary Tree: Each node has at most 2 children
 * 2. Binary Search Tree (BST): Left < Root < Right
 * 3. AVL Tree: Self-balancing BST
 * 4. Red-Black Tree: Self-balancing BST with color properties
 * 5. B-Tree: Multi-way search tree
 * 6. Trie: Prefix tree for strings
 * 
 * Visual Representation:
 * 
 * Binary Tree:           BST:                AVL:
 *       1                   5                   5
 *      / \                 / \                 / \
 *     2   3               3   7               3   7
 *    / \   \             / \   \             / \   \
 *   4   5   6           1   4   8           1   4   8
 * 
 * Tree Properties:
 * ----------------
 * 1. Root: Topmost node
 * 2. Leaf: Node with no children
 * 3. Internal Node: Node with at least one child
 * 4. Height: Length of longest path from root to leaf
 * 5. Depth: Length of path from root to a node
 * 6. Level: Depth + 1
 * 
 * ========================================
 * WHEN TO RECOGNIZE TREE PROBLEMS
 * ========================================
 * 
 * 🔹 5. Ninja Techniques to Recognize Tree Problems
 * 
 * ✅ "Binary tree traversal" — DFS/BFS
 *    Examples: Inorder, preorder, postorder, level order
 *    Pattern: Need to visit all nodes in specific order
 * 
 * ✅ "Tree construction" — build from array/string
 *    Examples: Construct BST from sorted array, build from preorder
 *    Pattern: Need to build tree structure from given data
 * 
 * ✅ "Tree validation" — check properties
 *    Examples: Validate BST, check if balanced, symmetric tree
 *    Pattern: Need to verify tree satisfies certain conditions
 * 
 * ✅ "Path problems" — root to leaf paths
 *    Examples: Path sum, all paths, longest path
 *    Pattern: Need to find paths with specific properties
 * 
 * ✅ "Ancestor/LCA" — lowest common ancestor
 *    Examples: Find LCA, distance between nodes
 *    Pattern: Need to find common ancestors of nodes
 * 
 * ✅ "Tree modification" — insert/delete/transform
 *    Examples: Insert into BST, delete node, flatten tree
 *    Pattern: Need to modify tree structure
 * 
 * ========================================
 * TREE TRAVERSAL ALGORITHMS
 * ========================================
 * 
 * 1. DEPTH-FIRST SEARCH (DFS)
 * -----------------------------
 * Use: Explore as deep as possible before backtracking
 * Data Structure: Stack (recursion)
 * Time: O(n) - visit each node once
 * Space: O(h) - height of tree (recursion stack)
 * 
 * Types:
 * - Preorder: Root → Left → Right
 * - Inorder: Left → Root → Right (gives sorted order in BST)
 * - Postorder: Left → Right → Root
 * 
 * 2. BREADTH-FIRST SEARCH (BFS)
 * ------------------------------
 * Use: Level-by-level traversal
 * Data Structure: Queue
 * Time: O(n)
 * Space: O(w) - maximum width of tree
 * 
 * When to use:
 * - Level order traversal
 * - Find nodes at specific level
 * - Shortest path in unweighted tree
 * 
 * 3. MORRIS TRAVERSAL
 * ---------------------
 * Use: Inorder traversal without recursion/stack
 * Data Structure: Threaded binary tree
 * Time: O(n)
 * Space: O(1) - constant extra space
 * 
 * When to use:
 * - Memory constraints
 * - Need O(1) space solution
 * - Inorder traversal required
 * 
 * ========================================
 * COMMON PROBLEM PATTERNS
 * ========================================
 * 
 * Pattern 1: "Traversal Problems"
 * --------------------------------
 * Keywords: "inorder", "preorder", "postorder", "level order"
 * Solution: DFS/BFS with specific order
 * 
 * Pattern 2: "Construction Problems"
 * -----------------------------------
 * Keywords: "construct", "build", "create", "from array"
 * Solution: Recursive construction with proper indices
 * 
 * Pattern 3: "Validation Problems"
 * ---------------------------------
 * Keywords: "validate", "check", "is valid", "balanced"
 * Solution: DFS with property checking
 * 
 * Pattern 4: "Path Problems"
 * ---------------------------
 * Keywords: "path", "sum", "target", "root to leaf"
 * Solution: DFS with path tracking
 * 
 * Pattern 5: "Ancestor Problems"
 * -------------------------------
 * Keywords: "ancestor", "LCA", "lowest common", "parent"
 * Solution: Find path to nodes, find intersection
 * 
 * Pattern 6: "Modification Problems"
 * -----------------------------------
 * Keywords: "insert", "delete", "flatten", "transform"
 * Solution: Modify tree structure carefully
 * 
 * ========================================
 * IMPLEMENTATION STRATEGIES
 * ========================================
 * 
 * Java Tree Implementation:
 * --------------------------
 * 
 * // TreeNode class
 * class TreeNode {
 *     int val;
 *     TreeNode left, right;
 *     TreeNode(int val) { this.val = val; }
 * }
 * 
 * // Recursive DFS
 * public void inorder(TreeNode root) {
 *     if (root == null) return;
 *     inorder(root.left);
 *     System.out.print(root.val + " ");
 *     inorder(root.right);
 * }
 * 
 * // Iterative DFS with Stack
 * public void inorderIterative(TreeNode root) {
 *     Stack<TreeNode> stack = new Stack<>();
 *     TreeNode curr = root;
 *     
 *     while (curr != null || !stack.isEmpty()) {
 *         while (curr != null) {
 *             stack.push(curr);
 *             curr = curr.left;
 *         }
 *         curr = stack.pop();
 *         System.out.print(curr.val + " ");
 *         curr = curr.right;
 *     }
 * }
 * 
 * // BFS with Queue
 * public void levelOrder(TreeNode root) {
 *     if (root == null) return;
 *     Queue<TreeNode> queue = new LinkedList<>();
 *     queue.offer(root);
 *     
 *     while (!queue.isEmpty()) {
 *         TreeNode node = queue.poll();
 *         System.out.print(node.val + " ");
 *         
 *         if (node.left != null) queue.offer(node.left);
 *         if (node.right != null) queue.offer(node.right);
 *     }
 * }
 * 
 * ========================================
 * TIME COMPLEXITY GUIDE
 * ========================================
 * 
 * Operation          | Balanced Tree | Unbalanced Tree
 * -------------------|----------------|------------------
 * Search            | O(log n)      | O(n)
 * Insert            | O(log n)      | O(n)
 * Delete            | O(log n)      | O(n)
 * Traversal         | O(n)          | O(n)
 * Height            | O(log n)      | O(n)
 * 
 * Algorithm         | Time Complexity | Space Complexity
 * -------------------|-----------------|------------------
 * DFS (Recursive)   | O(n)           | O(h)
 * DFS (Iterative)   | O(n)           | O(h)
 * BFS               | O(n)           | O(w)
 * Morris Traversal  | O(n)           | O(1)
 * 
 * ========================================
 * INTERVIEW TIPS
 * ========================================
 * 
 * 1. RECOGNITION TIPS:
 *    - Look for hierarchical relationships
 *    - Check for "traversal", "construction" keywords
 *    - Identify if it's a validation problem
 *    - See if you need to find paths or ancestors
 * 
 * 2. IMPLEMENTATION TIPS:
 *    - Always handle null nodes
 *    - Use recursion for natural tree problems
 *    - Consider iterative solutions for space optimization
 *    - Think about traversal order
 * 
 * 3. OPTIMIZATION TIPS:
 *    - Use Morris traversal for O(1) space
 *    - Consider iterative solutions to avoid stack overflow
 *    - Use BFS for level-related problems
 *    - Think about early termination
 * 
 * 4. COMMON MISTAKES:
 *    - Not handling null nodes
 *    - Wrong traversal order
 *    - Not considering tree balance
 *    - Forgetting to update pointers
 *    - Stack overflow in deep trees
 * 
 * ========================================
 * PRACTICE PROBLEMS BY DIFFICULTY
 * ========================================
 * 
 * EASY:
 * - Maximum Depth of Binary Tree
 * - Invert Binary Tree
 * - Same Tree
 * - Symmetric Tree
 * 
 * MEDIUM:
 * - Binary Tree Level Order Traversal
 * - Construct Binary Tree from Preorder and Inorder
 * - Validate Binary Search Tree
 * - Lowest Common Ancestor
 * 
 * HARD:
 * - Serialize and Deserialize Binary Tree
 * - Binary Tree Maximum Path Sum
 * - Recover Binary Search Tree
 * - Binary Tree Cameras
 * 
 * ========================================
 * QUICK REFERENCE
 * ========================================
 * 
 * When to use Tree:
 * - Hierarchical data representation
 * - Need to maintain sorted order (BST)
 * - Search/insert/delete operations
 * - Path finding problems
 * - Ancestor/descendant relationships
 * 
 * Which Traversal to use:
 * - Inorder: Sorted order (BST), validation
 * - Preorder: Tree construction, copying
 * - Postorder: Tree deletion, bottom-up processing
 * - Level Order: Level-by-level processing
 * 
 * Key Operations:
 * - insert(): Add node to tree
 * - delete(): Remove node from tree
 * - search(): Find node in tree
 * - traverse(): Visit all nodes
 * - validate(): Check tree properties
 * 
 * Time Complexity:
 * - Balanced tree: O(log n) for search/insert/delete
 * - Unbalanced tree: O(n) worst case
 * - Traversal: O(n) always
 * 
 * This guide should help you quickly identify tree problems and choose the right approach!
 */

public class intro {
    
    /**
     * This is a reference guide for tree problems.
     * No implementation needed - just concepts and patterns.
     */
    
    public static void main(String[] args) {
        System.out.println("=== TREE DATA STRUCTURE GUIDE ===");
        System.out.println("Use this as a quick reference for tree problems.");
        System.out.println("Key patterns to recognize:");
        System.out.println("1. 'Binary tree traversal' problems");
        System.out.println("2. 'Tree construction' problems");
        System.out.println("3. 'Tree validation' problems");
        System.out.println("4. 'Path problems'");
        System.out.println("5. 'Ancestor/LCA' problems");
        System.out.println("6. 'Tree modification' problems");
        System.out.println();
        System.out.println("Choose traversal based on problem:");
        System.out.println("- Inorder: Sorted order, validation");
        System.out.println("- Preorder: Construction, copying");
        System.out.println("- Postorder: Deletion, bottom-up");
        System.out.println("- Level Order: Level-by-level");
    }
} 