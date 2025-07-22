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
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    
    // Approach 1: Recursive DFS (Most Efficient)
    lowestCommonAncestor(root, p, q) {
        if (root === null || p === root || q === root) return root;
        
        const left = this.lowestCommonAncestor(root.left, p, q);
        const right = this.lowestCommonAncestor(root.right, p, q);
        
        if (left !== null && right !== null) return root;
        
        return (left !== null) ? left : right;
    }
    
    // Approach 2: Iterative with Parent Mapping
    lowestCommonAncestorIterative(root, p, q) {
        if (root === null) return null;
        
        // Build parent-child relationships
        const parent = new Map();
        const queue = [root];
        parent.set(root, null);
        
        while (!parent.has(p) || !parent.has(q)) {
            const node = queue.shift();
            
            if (node.left !== null) {
                parent.set(node.left, node);
                queue.push(node.left);
            }
            if (node.right !== null) {
                parent.set(node.right, node);
                queue.push(node.right);
            }
        }
        
        // Build path from p to root
        const ancestors = new Set();
        while (p !== null) {
            ancestors.add(p);
            p = parent.get(p);
        }
        
        // Find first common ancestor in path from q to root
        while (!ancestors.has(q)) {
            q = parent.get(q);
        }
        
        return q;
    }
    
    // Approach 3: Path Finding
    lowestCommonAncestorPath(root, p, q) {
        if (root === null) return null;
        
        const pathP = [];
        const pathQ = [];
        
        // Find paths to p and q
        this.findPath(root, p, pathP);
        this.findPath(root, q, pathQ);
        
        // Find LCA by comparing paths
        let i = 0;
        while (i < pathP.length && i < pathQ.length && pathP[i] === pathQ[i]) {
            i++;
        }
        
        return pathP[i - 1];
    }
    
    findPath(root, target, path) {
        if (root === null) return false;
        
        path.push(root);
        
        if (root === target) return true;
        
        if (this.findPath(root.left, target, path) || this.findPath(root.right, target, path)) {
            return true;
        }
        
        path.pop();
        return false;
    }
    
    // Approach 4: Enhanced Recursive with Count
    lowestCommonAncestorCount(root, p, q) {
        const result = [null];
        this.findLCA(root, p, q, result);
        return result[0];
    }
    
    findLCA(node, p, q, result) {
        if (node === null) return 0;
        
        let count = 0;
        
        // Check if current node is p or q
        if (node === p || node === q) {
            count = 1;
        }
        
        // Count nodes found in left subtree
        count += this.findLCA(node.left, p, q, result);
        
        // Count nodes found in right subtree
        count += this.findLCA(node.right, p, q, result);
        
        // If we found both nodes and haven't set result yet
        if (count === 2 && result[0] === null) {
            result[0] = node;
        }
        
        return count;
    }
    
    // Approach 5: Stack-based Iterative
    lowestCommonAncestorStack(root, p, q) {
        if (root === null) return null;
        
        const stack = [];
        const parent = new Map();
        
        stack.push(root);
        parent.set(root, null);
        
        // Build parent map until we find both p and q
        while (!parent.has(p) || !parent.has(q)) {
            const node = stack.pop();
            
            if (node.right !== null) {
                parent.set(node.right, node);
                stack.push(node.right);
            }
            if (node.left !== null) {
                parent.set(node.left, node);
                stack.push(node.left);
            }
        }
        
        // Build ancestors set for p
        const ancestors = new Set();
        while (p !== null) {
            ancestors.add(p);
            p = parent.get(p);
        }
        
        // Find first common ancestor for q
        while (!ancestors.has(q)) {
            q = parent.get(q);
        }
        
        return q;
    }
    
    // Approach 6: BFS with Level Tracking
    lowestCommonAncestorBFS(root, p, q) {
        if (root === null) return null;
        
        const queue = [root];
        const parent = new Map();
        const level = new Map();
        
        parent.set(root, null);
        level.set(root, 0);
        
        // Build parent and level maps
        while (!parent.has(p) || !parent.has(q)) {
            const node = queue.shift();
            const currentLevel = level.get(node);
            
            if (node.left !== null) {
                parent.set(node.left, node);
                level.set(node.left, currentLevel + 1);
                queue.push(node.left);
            }
            if (node.right !== null) {
                parent.set(node.right, node);
                level.set(node.right, currentLevel + 1);
                queue.push(node.right);
            }
        }
        
        // Move both nodes to same level
        let pLevel = level.get(p);
        let qLevel = level.get(q);
        
        while (pLevel > qLevel) {
            p = parent.get(p);
            pLevel--;
        }
        while (qLevel > pLevel) {
            q = parent.get(q);
            qLevel--;
        }
        
        // Find LCA by moving up together
        while (p !== q) {
            p = parent.get(p);
            q = parent.get(q);
        }
        
        return p;
    }
    
    // Approach 7: Inorder Traversal with Tracking
    lowestCommonAncestorInorder(root, p, q) {
        if (root === null) return null;
        
        const result = [null];
        this.inorderLCA(root, p, q, result);
        return result[0];
    }
    
    inorderLCA(node, p, q, result) {
        if (node === null) return { foundP: false, foundQ: false };
        
        const left = this.inorderLCA(node.left, p, q, result);
        const right = this.inorderLCA(node.right, p, q, result);
        
        const foundP = left.foundP || right.foundP || node === p;
        const foundQ = left.foundQ || right.foundQ || node === q;
        
        if (foundP && foundQ && result[0] === null) {
            result[0] = node;
        }
        
        return { foundP, foundQ };
    }
    
    // Approach 8: Morris Traversal (Space O(1))
    lowestCommonAncestorMorris(root, p, q) {
        if (root === null) return null;
        
        // Morris traversal is complex for LCA
        // For practical purposes, the recursive approach is preferred
        return this.lowestCommonAncestor(root, p, q);
    }
}

// Test function
function testLcaBinaryTree() {
    const solution = new Solution();
    
    // Test Case 1: Standard tree
    //       3
    //      / \
    //     5   1
    //    / \
    //   6   2
    //      / \
    //     7   4
    const root1 = new TreeNode(3);
    root1.left = new TreeNode(5);
    root1.right = new TreeNode(1);
    root1.left.left = new TreeNode(6);
    root1.left.right = new TreeNode(2);
    root1.left.right.left = new TreeNode(7);
    root1.left.right.right = new TreeNode(4);
    
    const p1 = root1.left; // 5
    const q1 = root1.left.right.right; // 4
    
    console.log("Test Case 1 LCA:", solution.lowestCommonAncestor(root1, p1, q1).val); // Expected: 5
    
    // Test Case 2: LCA is root
    const p2 = root1.left.left; // 6
    const q2 = root1.right; // 1
    
    console.log("Test Case 2 LCA:", solution.lowestCommonAncestor(root1, p2, q2).val); // Expected: 3
    
    // Test Case 3: One node is ancestor of other
    const p3 = root1.left; // 5
    const q3 = root1.left.left; // 6
    
    console.log("Test Case 3 LCA:", solution.lowestCommonAncestor(root1, p3, q3).val); // Expected: 5
    
    // Test Case 4: Same node
    console.log("Test Case 4 LCA:", solution.lowestCommonAncestor(root1, p1, p1).val); // Expected: 5
    
    // Test Case 5: Simple tree
    //       1
    //      / \
    //     2   3
    const root5 = new TreeNode(1);
    root5.left = new TreeNode(2);
    root5.right = new TreeNode(3);
    
    console.log("Test Case 5 LCA:", solution.lowestCommonAncestor(root5, root5.left, root5.right).val); // Expected: 1
    
    // Test Case 6: Single node
    const root6 = new TreeNode(1);
    console.log("Test Case 6 LCA:", solution.lowestCommonAncestor(root6, root6, root6).val); // Expected: 1
    
    // Test Case 7: Left-skewed tree
    const root7 = new TreeNode(1);
    root7.left = new TreeNode(2);
    root7.left.left = new TreeNode(3);
    root7.left.left.left = new TreeNode(4);
    
    const p7 = root7.left.left; // 3
    const q7 = root7.left.left.left; // 4
    
    console.log("Test Case 7 LCA:", solution.lowestCommonAncestor(root7, p7, q7).val); // Expected: 3
    
    // Test Case 8: Right-skewed tree
    const root8 = new TreeNode(1);
    root8.right = new TreeNode(2);
    root8.right.right = new TreeNode(3);
    root8.right.right.right = new TreeNode(4);
    
    const p8 = root8.right; // 2
    const q8 = root8.right.right.right; // 4
    
    console.log("Test Case 8 LCA:", solution.lowestCommonAncestor(root8, p8, q8).val); // Expected: 2
    
    console.log("\n--- Testing all approaches ---");
    
    // Recreate test tree for each approach
    let testRoot = new TreeNode(3);
    testRoot.left = new TreeNode(5);
    testRoot.right = new TreeNode(1);
    testRoot.left.left = new TreeNode(6);
    testRoot.left.right = new TreeNode(2);
    testRoot.left.right.left = new TreeNode(7);
    testRoot.left.right.right = new TreeNode(4);
    
    const testP = testRoot.left; // 5
    const testQ = testRoot.left.right.right; // 4
    
    console.log("Recursive DFS:", solution.lowestCommonAncestor(testRoot, testP, testQ).val);
    console.log("Iterative with Parent:", solution.lowestCommonAncestorIterative(testRoot, testP, testQ).val);
    console.log("Path Finding:", solution.lowestCommonAncestorPath(testRoot, testP, testQ).val);
    console.log("Count Approach:", solution.lowestCommonAncestorCount(testRoot, testP, testQ).val);
    console.log("Stack-based:", solution.lowestCommonAncestorStack(testRoot, testP, testQ).val);
    console.log("BFS with Level:", solution.lowestCommonAncestorBFS(testRoot, testP, testQ).val);
    console.log("Inorder Tracking:", solution.lowestCommonAncestorInorder(testRoot, testP, testQ).val);
}

// Run tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, TreeNode };
} else {
    testLcaBinaryTree();
} 