/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation and algorithm practice
 * 
 * 01 Matrix Problem (Distance to Nearest 0)
 * 
 * Problem: Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.
 * The distance between two cells sharing a common edge is 1.
 * 
 * Examples:
 * 
 * Example 1:
 * Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
 * Output: [[0,0,0],[0,1,0],[0,0,0]]
 * Explanation: All 1s are adjacent to at least one 0, so their distance is 1
 * 
 * Example 2:
 * Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
 * Output: [[0,0,0],[0,1,0],[1,2,1]]
 * Explanation: 
 * - The 1 at (1,1) has distance 1 to nearest 0
 * - The 1s at (2,0) and (2,2) have distance 1 to nearest 0
 * - The 1 at (2,1) has distance 2 to nearest 0
 * 
 * Example 3:
 * Input: mat = [[1,1,1],[1,1,1],[1,1,0]]
 * Output: [[4,3,2],[3,2,1],[2,1,0]]
 * Explanation: All 1s have increasing distance to the single 0
 * 
 * Approaches:
 * 
 * 1. BFS from all 0s (Multi-source BFS) - Optimal approach
 *    - Time: O(m * n), Space: O(m * n)
 * 
 * 2. BFS from each 1 individually - Brute force
 *    - Time: O((m * n)²), Space: O(m * n)
 * 
 * 3. Dynamic Programming - Two-pass approach
 *    - Time: O(m * n), Space: O(1) - in-place modification
 */

class UpdateMatrix {
    
    /**
     * Approach 1: Multi-source BFS (Optimal Solution)
     * 
     * Algorithm:
     * 1. Start BFS from all 0s simultaneously
     * 2. Use queue to process cells level by level
     * 3. Each level represents distance + 1 from previous level
     * 4. Mark visited cells to avoid reprocessing
     * 
     * Time Complexity: O(m * n) - We visit each cell at most once
     * Space Complexity: O(m * n) - Queue and visited array
     */
    updateMatrix(mat) {
        const m = mat.length;
        const n = mat[0].length;
        const isVisited = Array(m).fill().map(() => Array(n).fill(false));
        const result = Array(m).fill().map(() => Array(n).fill(0));
        const queue = [];
        
        // Add all 0s to queue and mark as visited
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (mat[i][j] === 0) {
                    queue.push([i, j]);
                    isVisited[i][j] = true;
                }
            }
        }
        
        // BFS from all 0s simultaneously
        while (queue.length > 0) {
            const [row, col] = queue.shift();
            
            // Check all four directions
            const directions = [[row-1, col], [row+1, col], [row, col+1], [row, col-1]];
            
            for (const [newRow, newCol] of directions) {
                // Check bounds and if already visited
                if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n || 
                    isVisited[newRow][newCol]) {
                    continue;
                }
                
                // Update distance and add to queue
                result[newRow][newCol] = result[row][col] + 1;
                queue.push([newRow, newCol]);
                isVisited[newRow][newCol] = true;
            }
        }
        
        return result;
    }
    
    /**
     * Approach 2: BFS from each 1 individually (Brute Force)
     * 
     * Algorithm:
     * 1. For each 1, perform BFS to find nearest 0
     * 2. Use queue to explore cells level by level
     * 3. Stop when first 0 is found
     * 4. Return the distance
     * 
     * Time Complexity: O((m * n)²) - For each 1, we might visit all cells
     * Space Complexity: O(m * n) - Queue and visited array for each BFS
     */
    updateMatrixBruteForce(mat) {
        const m = mat.length;
        const n = mat[0].length;
        const result = Array(m).fill().map(() => Array(n).fill(0));
        
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (mat[i][j] === 1) {
                    result[i][j] = this.findNearestZero(mat, i, j);
                }
            }
        }
        
        return result;
    }
    
    findNearestZero(mat, startRow, startCol) {
        const m = mat.length;
        const n = mat[0].length;
        const visited = Array(m).fill().map(() => Array(n).fill(false));
        const queue = [];
        
        queue.push([startRow, startCol, 0]); // [row, col, distance]
        visited[startRow][startCol] = true;
        
        const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];
        
        while (queue.length > 0) {
            const [row, col, distance] = queue.shift();
            
            // If we found a 0, return the distance
            if (mat[row][col] === 0) {
                return distance;
            }
            
            // Explore all four directions
            for (const [dirRow, dirCol] of directions) {
                const newRow = row + dirRow;
                const newCol = col + dirCol;
                
                if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && 
                    !visited[newRow][newCol]) {
                    queue.push([newRow, newCol, distance + 1]);
                    visited[newRow][newCol] = true;
                }
            }
        }
        
        return Infinity; // Should not reach here
    }
    
    /**
     * Approach 3: Dynamic Programming (Two-pass)
     * 
     * Algorithm:
     * 1. First pass: Update distances from top-left to bottom-right
     * 2. Second pass: Update distances from bottom-right to top-left
     * 3. Take minimum of both passes for each cell
     * 
     * Time Complexity: O(m * n) - Two passes through the matrix
     * Space Complexity: O(1) - In-place modification (excluding output array)
     */
    updateMatrixDP(mat) {
        const m = mat.length;
        const n = mat[0].length;
        const result = Array(m).fill().map(() => Array(n).fill(0));
        
        // Initialize result array
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (mat[i][j] === 0) {
                    result[i][j] = 0;
                } else {
                    result[i][j] = Infinity - 1; // Avoid overflow
                }
            }
        }
        
        // First pass: top-left to bottom-right
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (mat[i][j] === 1) {
                    // Check top neighbor
                    if (i > 0) {
                        result[i][j] = Math.min(result[i][j], result[i-1][j] + 1);
                    }
                    // Check left neighbor
                    if (j > 0) {
                        result[i][j] = Math.min(result[i][j], result[i][j-1] + 1);
                    }
                }
            }
        }
        
        // Second pass: bottom-right to top-left
        for (let i = m - 1; i >= 0; i--) {
            for (let j = n - 1; j >= 0; j--) {
                if (mat[i][j] === 1) {
                    // Check bottom neighbor
                    if (i < m - 1) {
                        result[i][j] = Math.min(result[i][j], result[i+1][j] + 1);
                    }
                    // Check right neighbor
                    if (j < n - 1) {
                        result[i][j] = Math.min(result[i][j], result[i][j+1] + 1);
                    }
                }
            }
        }
        
        return result;
    }
}

/**
 * Test function
 */
function testUpdateMatrix() {
    const solution = new UpdateMatrix();
    
    // Test cases
    const test1 = [
        [0,0,0],
        [0,1,0],
        [0,0,0]
    ];
    
    const test2 = [
        [0,0,0],
        [0,1,0],
        [1,1,1]
    ];
    
    const test3 = [
        [1,1,1],
        [1,1,1],
        [1,1,0]
    ];
    
    console.log("=== 01 Matrix Problem ===");
    console.log("Test 1 - All 1s adjacent to 0s:");
    printMatrix(solution.updateMatrix(test1));
    
    console.log("\nTest 2 - Mixed distances:");
    printMatrix(solution.updateMatrix(test2));
    
    console.log("\nTest 3 - Single 0 with increasing distances:");
    printMatrix(solution.updateMatrix(test3));
    
    console.log("\n--- BFS from each 1 (Brute Force) ---");
    console.log("Test 2 - Mixed distances:");
    printMatrix(solution.updateMatrixBruteForce(test2));
    
    console.log("\n--- Dynamic Programming Approach ---");
    console.log("Test 2 - Mixed distances:");
    printMatrix(solution.updateMatrixDP(test2));
}

/**
 * Helper function to print the matrix
 */
function printMatrix(matrix) {
    for (const row of matrix) {
        console.log(`[${row.join(',')}]`);
    }
}

// Run tests
testUpdateMatrix();

/**
 * Complexity Analysis:
 * 
 * Multi-source BFS Approach:
 * - Time: O(m * n) - We visit each cell at most once
 * - Space: O(m * n) - Queue and visited array
 * 
 * Brute Force BFS Approach:
 * - Time: O((m * n)²) - For each 1, we might visit all cells
 * - Space: O(m * n) - Queue and visited array for each BFS
 * 
 * Dynamic Programming Approach:
 * - Time: O(m * n) - Two passes through the matrix
 * - Space: O(1) - In-place modification (excluding output array)
 * 
 * Key Insights:
 * 1. Multi-source BFS is the most efficient approach
 * 2. Starting from 0s is better than starting from 1s
 * 3. DP approach works because we can build optimal solution from subproblems
 * 4. The two-pass DP ensures we consider all possible paths
 * 5. BFS naturally gives us the shortest distance
 * 
 * Applications:
 * - Image processing (distance transform)
 * - Game development (pathfinding)
 * - Computer vision (object detection)
 * - Geographic information systems (proximity analysis)
 */

module.exports = UpdateMatrix; 