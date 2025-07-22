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
 * 💡 IDEA: Use stack with [node, depth] pairs to track node and depth
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
 * recursively find max depth. For iterative approach, I use a stack with [node, depth] 
 * pairs to track both node and current depth. Time complexity is O(n) and space is O(h)."
 * 
 * 🔑 KEY POINTS TO REMEMBER:
 * 1. BFS: Count levels while traversing with queue
 * 2. DFS Recursive: max(leftDepth, rightDepth) + 1
 * 3. DFS Iterative: Use stack with [node, depth] pairs
 * 4. Track current depth and update max depth
 * 5. Handle null nodes appropriately
 */

class TreeNode {
    constructor(val, left = null, right = null) {
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
    maxDepth(root) {
        let depth = 0;
        if (!root) return depth;
        
        const queue = [root];
        
        while (queue.length > 0) {
            const size = queue.length;
            for (let i = 0; i < size; i++) {
                const node = queue.shift();
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
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
    maxDepthDFS(root) {
        if (!root) return 0;
        return Math.max(this.maxDepthDFS(root.left), this.maxDepthDFS(root.right)) + 1;
    }
    
    // ==================== APPROACH 3: DFS ITERATIVE WITH STACK ====================
    /**
     * 🎯 APPROACH: DFS Iterative with Stack (RECOMMENDED)
     * 
     * 💡 IDEA: 
     * - Use stack with [node, depth] pairs to track node and current depth
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
    maxDepthIterative(root) {
        if (!root) return 0;

        const stack = [[root, 1]];
        let max = 0;

        while (stack.length > 0) {
            const [node, depth] = stack.pop();

            if (node) {
                max = Math.max(max, depth);
                stack.push([node.left, depth + 1]);
                stack.push([node.right, depth + 1]);
            }
        }

        return max;
    }

    // Helper method to create a binary tree from array
    static createTree(arr) {
        if (!arr || arr.length === 0) return null;
        
        const root = new TreeNode(arr[0]);
        const queue = [root];
        let i = 1;
        
        while (queue.length > 0 && i < arr.length) {
            const current = queue.shift();
            
            if (i < arr.length && arr[i] !== null) {
                current.left = new TreeNode(arr[i]);
                queue.push(current.left);
            }
            i++;
            
            if (i < arr.length && arr[i] !== null) {
                current.right = new TreeNode(arr[i]);
                queue.push(current.right);
            }
            i++;
        }
        
        return root;
    }
}

// Test cases
function runTests() {
    const solution = new MaxDepth();
    
    // Test case 1: Basic tree
    console.log("Test case 1: Basic tree [3,9,20,null,null,15,7]");
    const root1 = MaxDepth.createTree([3, 9, 20, null, null, 15, 7]);
    console.log("BFS approach:", solution.maxDepth(root1));
    console.log("DFS Recursive:", solution.maxDepthDFS(root1));
    console.log("DFS Iterative:", solution.maxDepthIterative(root1));

    // Test case 2: Empty tree
    console.log("\nTest case 2: Empty tree");
    const root2 = null;
    console.log("BFS approach:", solution.maxDepth(root2));
    console.log("DFS Recursive:", solution.maxDepthDFS(root2));
    console.log("DFS Iterative:", solution.maxDepthIterative(root2));

    // Test case 3: Single node
    console.log("\nTest case 3: Single node [1]");
    const root3 = MaxDepth.createTree([1]);
    console.log("BFS approach:", solution.maxDepth(root3));
    console.log("DFS Recursive:", solution.maxDepthDFS(root3));
    console.log("DFS Iterative:", solution.maxDepthIterative(root3));

    // Test case 4: Left skewed tree
    console.log("\nTest case 4: Left skewed tree [1,2,null,3]");
    const root4 = MaxDepth.createTree([1, 2, null, 3]);
    console.log("BFS approach:", solution.maxDepth(root4));
    console.log("DFS Recursive:", solution.maxDepthDFS(root4));
    console.log("DFS Iterative:", solution.maxDepthIterative(root4));

    // Test case 5: Right skewed tree
    console.log("\nTest case 5: Right skewed tree [1,null,2,null,3]");
    const root5 = MaxDepth.createTree([1, null, 2, null, 3]);
    console.log("BFS approach:", solution.maxDepth(root5));
    console.log("DFS Recursive:", solution.maxDepthDFS(root5));
    console.log("DFS Iterative:", solution.maxDepthIterative(root5));
}

// Run the tests
runTests(); 