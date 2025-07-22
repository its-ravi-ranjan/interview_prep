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
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    
    // Approach 1: Iterative BST Traversal (Most Efficient)
    lowestCommonAncestor(root, p, q) {
        while (root !== null) {
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
    lowestCommonAncestorRecursive(root, p, q) {
        if (root === null) return null;
        
        if (p.val < root.val && q.val < root.val) {
            return this.lowestCommonAncestorRecursive(root.left, p, q);
        } else if (p.val > root.val && q.val > root.val) {
            return this.lowestCommonAncestorRecursive(root.right, p, q);
        } else {
            return root;
        }
    }
    
    // Approach 3: Path Finding Approach
    lowestCommonAncestorPath(root, p, q) {
        if (root === null) return null;
        
        const pathP = [];
        const pathQ = [];
        
        // Find paths to p and q using BST property
        this.findPathBST(root, p, pathP);
        this.findPathBST(root, q, pathQ);
        
        // Find LCA by comparing paths
        let i = 0;
        while (i < pathP.length && i < pathQ.length && pathP[i] === pathQ[i]) {
            i++;
        }
        
        return pathP[i - 1];
    }
    
    findPathBST(root, target, path) {
        while (root !== null) {
            path.push(root);
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
    lowestCommonAncestorEnhanced(root, p, q) {
        if (root === null) return null;
        
        // Ensure p.val <= q.val for easier comparison
        if (p.val > q.val) {
            [p, q] = [q, p];
        }
        
        while (root !== null) {
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
    lowestCommonAncestorStack(root, p, q) {
        if (root === null) return null;
        
        const stack = [root];
        
        while (stack.length > 0) {
            const current = stack.pop();
            
            // Check if current node is LCA
            if ((p.val <= current.val && current.val <= q.val) || 
                (q.val <= current.val && current.val <= p.val)) {
                return current;
            }
            
            // Add children based on BST property
            if (p.val < current.val && q.val < current.val && current.left !== null) {
                stack.push(current.left);
            } else if (p.val > current.val && q.val > current.val && current.right !== null) {
                stack.push(current.right);
            }
        }
        
        return null;
    }
    
    // Approach 6: Morris Traversal (Space O(1))
    lowestCommonAncestorMorris(root, p, q) {
        if (root === null) return null;
        
        let current = root;
        
        while (current !== null) {
            // Check if current node is LCA
            if ((p.val <= current.val && current.val <= q.val) || 
                (q.val <= current.val && current.val <= p.val)) {
                return current;
            }
            
            if (current.left === null) {
                // No left child, go right
                if (p.val > current.val && q.val > current.val) {
                    current = current.right;
                } else {
                    break; // Should have gone left but no left child
                }
            } else {
                // Find inorder predecessor
                let predecessor = current.left;
                while (predecessor.right !== null && predecessor.right !== current) {
                    predecessor = predecessor.right;
                }
                
                if (predecessor.right === null) {
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
    lowestCommonAncestorBFS(root, p, q) {
        if (root === null) return null;
        
        const queue = [root];
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            // Check if current node is LCA
            if ((p.val <= current.val && current.val <= q.val) || 
                (q.val <= current.val && current.val <= p.val)) {
                return current;
            }
            
            // Add children based on BST property
            if (p.val < current.val && q.val < current.val && current.left !== null) {
                queue.push(current.left);
            } else if (p.val > current.val && q.val > current.val && current.right !== null) {
                queue.push(current.right);
            }
        }
        
        return null;
    }
    
    // Approach 8: Inorder Traversal with BST Property
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
        
        // Check if current node is LCA using BST property
        if (foundP && foundQ && result[0] === null) {
            if ((p.val <= node.val && node.val <= q.val) || 
                (q.val <= node.val && node.val <= p.val)) {
                result[0] = node;
            }
        }
        
        return { foundP, foundQ };
    }
    
    // Approach 9: Two-Pointer on Sorted Array
    lowestCommonAncestorTwoPointer(root, p, q) {
        if (root === null) return null;
        
        // Convert BST to sorted array using inorder traversal
        const values = [];
        this.inorderTraversal(root, values);
        
        // Find the range between p and q
        const minVal = Math.min(p.val, q.val);
        const maxVal = Math.max(p.val, q.val);
        
        // Find the LCA value in the sorted array
        for (const val of values) {
            if (val >= minVal && val <= maxVal) {
                // Find the node with this value
                return this.findNodeByValue(root, val);
            }
        }
        
        return null;
    }
    
    inorderTraversal(node, values) {
        if (node === null) return;
        
        this.inorderTraversal(node.left, values);
        values.push(node.val);
        this.inorderTraversal(node.right, values);
    }
    
    findNodeByValue(root, val) {
        while (root !== null) {
            if (val < root.val) {
                root = root.left;
            } else if (val > root.val) {
                root = root.right;
            } else {
                return root;
            }
        }
        return null;
    }
}

// Test function
function testLcaBinarySearchTree() {
    const solution = new Solution();
    
    // Test Case 1: Standard BST
    //       6
    //      / \
    //     2   8
    //    / \
    //   0   4
    //      / \
    //     3   5
    const root1 = new TreeNode(6);
    root1.left = new TreeNode(2);
    root1.right = new TreeNode(8);
    root1.left.left = new TreeNode(0);
    root1.left.right = new TreeNode(4);
    root1.left.right.left = new TreeNode(3);
    root1.left.right.right = new TreeNode(5);
    
    const p1 = root1.left; // 2
    const q1 = root1.left.right.right; // 5
    
    console.log("Test Case 1 LCA:", solution.lowestCommonAncestor(root1, p1, q1).val); // Expected: 2
    
    // Test Case 2: LCA is root
    const p2 = root1.left.left; // 0
    const q2 = root1.right; // 8
    
    console.log("Test Case 2 LCA:", solution.lowestCommonAncestor(root1, p2, q2).val); // Expected: 6
    
    // Test Case 3: One node is ancestor of other
    const p3 = root1.left; // 2
    const q3 = root1.left.left; // 0
    
    console.log("Test Case 3 LCA:", solution.lowestCommonAncestor(root1, p3, q3).val); // Expected: 2
    
    // Test Case 4: Same node
    console.log("Test Case 4 LCA:", solution.lowestCommonAncestor(root1, p1, p1).val); // Expected: 2
    
    // Test Case 5: Simple BST
    //       2
    //      / \
    //     1   3
    const root5 = new TreeNode(2);
    root5.left = new TreeNode(1);
    root5.right = new TreeNode(3);
    
    console.log("Test Case 5 LCA:", solution.lowestCommonAncestor(root5, root5.left, root5.right).val); // Expected: 2
    
    // Test Case 6: Single node
    const root6 = new TreeNode(1);
    console.log("Test Case 6 LCA:", solution.lowestCommonAncestor(root6, root6, root6).val); // Expected: 1
    
    // Test Case 7: Left-skewed BST
    const root7 = new TreeNode(4);
    root7.left = new TreeNode(3);
    root7.left.left = new TreeNode(2);
    root7.left.left.left = new TreeNode(1);
    
    const p7 = root7.left.left; // 2
    const q7 = root7.left.left.left; // 1
    
    console.log("Test Case 7 LCA:", solution.lowestCommonAncestor(root7, p7, q7).val); // Expected: 2
    
    // Test Case 8: Right-skewed BST
    const root8 = new TreeNode(1);
    root8.right = new TreeNode(2);
    root8.right.right = new TreeNode(3);
    root8.right.right.right = new TreeNode(4);
    
    const p8 = root8.right; // 2
    const q8 = root8.right.right.right; // 4
    
    console.log("Test Case 8 LCA:", solution.lowestCommonAncestor(root8, p8, q8).val); // Expected: 2
    
    // Test Case 9: Nodes in different subtrees
    const p9 = root1.left.right.left; // 3
    const q9 = root1.right; // 8
    
    console.log("Test Case 9 LCA:", solution.lowestCommonAncestor(root1, p9, q9).val); // Expected: 6
    
    // Test Case 10: Edge case with equal values
    const root10 = new TreeNode(2);
    root10.left = new TreeNode(1);
    root10.right = new TreeNode(2);
    
    const p10 = root10.left; // 1
    const q10 = root10.right; // 2
    
    console.log("Test Case 10 LCA:", solution.lowestCommonAncestor(root10, p10, q10).val); // Expected: 2
    
    console.log("\n--- Testing all approaches ---");
    
    // Recreate test tree for each approach
    let testRoot = new TreeNode(6);
    testRoot.left = new TreeNode(2);
    testRoot.right = new TreeNode(8);
    testRoot.left.left = new TreeNode(0);
    testRoot.left.right = new TreeNode(4);
    testRoot.left.right.left = new TreeNode(3);
    testRoot.left.right.right = new TreeNode(5);
    
    const testP = testRoot.left; // 2
    const testQ = testRoot.left.right.right; // 5
    
    console.log("Iterative BST:", solution.lowestCommonAncestor(testRoot, testP, testQ).val);
    console.log("Recursive BST:", solution.lowestCommonAncestorRecursive(testRoot, testP, testQ).val);
    console.log("Path Finding:", solution.lowestCommonAncestorPath(testRoot, testP, testQ).val);
    console.log("Enhanced Iterative:", solution.lowestCommonAncestorEnhanced(testRoot, testP, testQ).val);
    console.log("Stack-based:", solution.lowestCommonAncestorStack(testRoot, testP, testQ).val);
    console.log("Morris Traversal:", solution.lowestCommonAncestorMorris(testRoot, testP, testQ).val);
    console.log("BFS Approach:", solution.lowestCommonAncestorBFS(testRoot, testP, testQ).val);
    console.log("Inorder Tracking:", solution.lowestCommonAncestorInorder(testRoot, testP, testQ).val);
    console.log("Two-Pointer:", solution.lowestCommonAncestorTwoPointer(testRoot, testP, testQ).val);
}

// Run tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, TreeNode };
} else {
    testLcaBinarySearchTree();
} 