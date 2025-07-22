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
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    
    // Approach 1: Iterative BST Traversal (Most Efficient)
    closestValue(root, target) {
        if (root === null) return Number.MIN_SAFE_INTEGER;
        
        let closest = root.val;
        
        while (root !== null) {
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
    closestValueRecursive(root, target) {
        if (root === null) return Number.MIN_SAFE_INTEGER;
        
        return this.findClosest(root, target, root.val);
    }
    
    findClosest(node, target, closest) {
        if (node === null) return closest;
        
        // Update closest if current node is closer
        if (Math.abs(node.val - target) < Math.abs(closest - target)) {
            closest = node.val;
        }
        
        // Use BST property to decide direction
        if (target > node.val) {
            return this.findClosest(node.right, target, closest);
        } else {
            return this.findClosest(node.left, target, closest);
        }
    }
    
    // Approach 3: Inorder Traversal with Linear Search
    closestValueInorder(root, target) {
        if (root === null) return Number.MIN_SAFE_INTEGER;
        
        // Collect all values using inorder traversal
        const values = [];
        this.inorderTraversal(root, values);
        
        // Find closest value using linear search
        return this.findClosestInArray(values, target);
    }
    
    inorderTraversal(node, values) {
        if (node === null) return;
        
        this.inorderTraversal(node.left, values);
        values.push(node.val);
        this.inorderTraversal(node.right, values);
    }
    
    findClosestInArray(values, target) {
        if (values.length === 0) return Number.MIN_SAFE_INTEGER;
        
        let closest = values[0];
        
        for (const val of values) {
            if (Math.abs(val - target) < Math.abs(closest - target)) {
                closest = val;
            }
        }
        
        return closest;
    }
    
    // Approach 4: Enhanced Iterative with Early Termination
    closestValueEnhanced(root, target) {
        if (root === null) return Number.MIN_SAFE_INTEGER;
        
        let closest = root.val;
        let minDiff = Math.abs(root.val - target);
        
        while (root !== null) {
            const currentDiff = Math.abs(root.val - target);
            
            // Update closest if current node is closer
            if (currentDiff < minDiff) {
                minDiff = currentDiff;
                closest = root.val;
            }
            
            // Early termination if we find exact match
            if (currentDiff === 0) {
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
    
    // Approach 5: Binary Search on Sorted Array
    closestValueBinarySearch(root, target) {
        if (root === null) return Number.MIN_SAFE_INTEGER;
        
        // Convert to sorted array
        const values = [];
        this.inorderTraversal(root, values);
        
        // Use binary search to find closest
        let left = 0, right = values.length - 1;
        let closest = values[0];
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const midVal = values[mid];
            
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
    closestValueMorris(root, target) {
        if (root === null) return Number.MIN_SAFE_INTEGER;
        
        let closest = root.val;
        let minDiff = Math.abs(root.val - target);
        let current = root;
        
        while (current !== null) {
            if (current.left === null) {
                // Process current node
                const currentDiff = Math.abs(current.val - target);
                if (currentDiff < minDiff) {
                    minDiff = currentDiff;
                    closest = current.val;
                }
                current = current.right;
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
                    // Revert the changes and process current node
                    predecessor.right = null;
                    const currentDiff = Math.abs(current.val - target);
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
    
    // Approach 7: Iterative with Stack (Alternative)
    closestValueStack(root, target) {
        if (root === null) return Number.MIN_SAFE_INTEGER;
        
        let closest = root.val;
        const stack = [root];
        
        while (stack.length > 0) {
            const node = stack.pop();
            
            // Update closest if current node is closer
            if (Math.abs(node.val - target) < Math.abs(closest - target)) {
                closest = node.val;
            }
            
            // Add children based on BST property
            if (target > node.val && node.right !== null) {
                stack.push(node.right);
            } else if (target <= node.val && node.left !== null) {
                stack.push(node.left);
            }
        }
        
        return closest;
    }
    
    // Approach 8: Two-Pointer on Sorted Array
    closestValueTwoPointer(root, target) {
        if (root === null) return Number.MIN_SAFE_INTEGER;
        
        // Convert to sorted array
        const values = [];
        this.inorderTraversal(root, values);
        
        if (values.length === 0) return Number.MIN_SAFE_INTEGER;
        if (values.length === 1) return values[0];
        
        // Find the two closest values using two pointers
        let left = 0, right = values.length - 1;
        let closest = values[0];
        
        while (left <= right) {
            const leftDiff = Math.abs(values[left] - target);
            const rightDiff = Math.abs(values[right] - target);
            
            if (leftDiff < Math.abs(closest - target)) {
                closest = values[left];
            }
            if (rightDiff < Math.abs(closest - target)) {
                closest = values[right];
            }
            
            if (leftDiff < rightDiff) {
                left++;
            } else {
                right--;
            }
        }
        
        return closest;
    }
}

// Test function
function testClosetNode() {
    const solution = new Solution();
    
    // Test Case 1: Standard BST
    //       4
    //      / \
    //     2   5
    //    / \
    //   1   3
    const root1 = new TreeNode(4);
    root1.left = new TreeNode(2);
    root1.right = new TreeNode(5);
    root1.left.left = new TreeNode(1);
    root1.left.right = new TreeNode(3);
    
    console.log("Test Case 1 (target=3.714286):", solution.closestValue(root1, 3.714286)); // Expected: 4
    console.log("Test Case 1 (target=2.1):", solution.closestValue(root1, 2.1)); // Expected: 2
    console.log("Test Case 1 (target=1.5):", solution.closestValue(root1, 1.5)); // Expected: 1
    
    // Test Case 2: Single node
    const root2 = new TreeNode(1);
    console.log("Test Case 2 (target=4.428571):", solution.closestValue(root2, 4.428571)); // Expected: 1
    
    // Test Case 3: Left-skewed tree
    const root3 = new TreeNode(5);
    root3.left = new TreeNode(3);
    root3.left.left = new TreeNode(1);
    root3.left.left.left = new TreeNode(0);
    
    console.log("Test Case 3 (target=2.1):", solution.closestValue(root3, 2.1)); // Expected: 1
    console.log("Test Case 3 (target=4.9):", solution.closestValue(root3, 4.9)); // Expected: 5
    
    // Test Case 4: Right-skewed tree
    const root4 = new TreeNode(1);
    root4.right = new TreeNode(3);
    root4.right.right = new TreeNode(5);
    root4.right.right.right = new TreeNode(7);
    
    console.log("Test Case 4 (target=4.1):", solution.closestValue(root4, 4.1)); // Expected: 5
    console.log("Test Case 4 (target=0.5):", solution.closestValue(root4, 0.5)); // Expected: 1
    
    // Test Case 5: Perfect BST
    const root5 = new TreeNode(4);
    root5.left = new TreeNode(2);
    root5.right = new TreeNode(6);
    root5.left.left = new TreeNode(1);
    root5.left.right = new TreeNode(3);
    root5.right.left = new TreeNode(5);
    root5.right.right = new TreeNode(7);
    
    console.log("Test Case 5 (target=3.5):", solution.closestValue(root5, 3.5)); // Expected: 3 or 4
    console.log("Test Case 5 (target=6.1):", solution.closestValue(root5, 6.1)); // Expected: 6
    
    // Test Case 6: Edge cases
    console.log("Test Case 6 (null root):", solution.closestValue(null, 5.0)); // Expected: Number.MIN_SAFE_INTEGER
    
    // Test Case 7: Exact match
    console.log("Test Case 7 (exact match):", solution.closestValue(root1, 3.0)); // Expected: 3
    
    console.log("\n--- Testing all approaches ---");
    
    // Recreate test tree for each approach
    let testRoot = new TreeNode(4);
    testRoot.left = new TreeNode(2);
    testRoot.right = new TreeNode(5);
    testRoot.left.left = new TreeNode(1);
    testRoot.left.right = new TreeNode(3);
    
    const testTarget = 3.714286;
    
    console.log("Iterative Approach:", solution.closestValue(testRoot, testTarget));
    console.log("Recursive Approach:", solution.closestValueRecursive(testRoot, testTarget));
    console.log("Inorder Approach:", solution.closestValueInorder(testRoot, testTarget));
    console.log("Enhanced Iterative:", solution.closestValueEnhanced(testRoot, testTarget));
    console.log("Binary Search:", solution.closestValueBinarySearch(testRoot, testTarget));
    console.log("Morris Traversal:", solution.closestValueMorris(testRoot, testTarget));
    console.log("Stack Approach:", solution.closestValueStack(testRoot, testTarget));
    console.log("Two-Pointer:", solution.closestValueTwoPointer(testRoot, testTarget));
}

// Run tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, TreeNode };
} else {
    testClosetNode();
} 