/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation and algorithm practice
 * 
 * Rotting Oranges Problem
 * 
 * Problem: You are given an m x n grid where each cell can have one of three values:
 * - 0 representing an empty cell,
 * - 1 representing a fresh orange, or
 * - 2 representing a rotten orange.
 * 
 * Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
 * Return the minimum number of minutes that must elapse until no cell has a fresh orange. 
 * If this is impossible, return -1.
 * 
 * Examples:
 * 
 * Example 1:
 * Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
 * Output: 4
 * Explanation: 
 * - Minute 0: [[2,1,1],[1,1,0],[0,1,1]]
 * - Minute 1: [[2,2,1],[2,1,0],[0,1,1]]
 * - Minute 2: [[2,2,2],[2,2,0],[0,1,1]]
 * - Minute 3: [[2,2,2],[2,2,0],[0,2,1]]
 * - Minute 4: [[2,2,2],[2,2,0],[0,2,2]]
 * 
 * Example 2:
 * Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
 * Output: -1
 * Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten.
 * 
 * Example 3:
 * Input: grid = [[0,2]]
 * Output: 0
 * Explanation: Since there are no fresh oranges, no time needs to pass.
 * 
 * Approaches:
 * 
 * 1. Multi-source BFS - Optimal approach
 *    - Time: O(m * n), Space: O(m * n)
 * 
 * 2. BFS with level tracking - Alternative approach
 *    - Time: O(m * n), Space: O(m * n)
 * 
 * 3. DFS approach - Less efficient
 *    - Time: O((m * n)²), Space: O(m * n)
 */

class RottingOranges {
    
    /**
     * Approach 1: Multi-source BFS (Optimal Solution)
     * 
     * Algorithm:
     * 1. Count fresh oranges and add all rotten oranges to queue
     * 2. Use BFS to process all rotten oranges level by level
     * 3. Each level represents one minute
     * 4. Track fresh oranges count and update when they become rotten
     * 5. Return minutes if all fresh oranges become rotten, else -1
     * 
     * Time Complexity: O(m * n) - We visit each cell at most once
     * Space Complexity: O(m * n) - Queue and grid modification
     */
    orangesRotting(grid) {
        const m = grid.length;
        const n = grid[0].length;
        let timer = 0;
        let freshOr = 0;
        const queue = [];
        
        // Count fresh oranges and add rotten oranges to queue
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === 2) {
                    queue.push([i, j]);
                } else if (grid[i][j] === 1) {
                    freshOr++;
                }
            }
        }
        
        // If no fresh oranges, return 0
        if (freshOr === 0) return timer;
        
        // BFS to rot oranges level by level
        while (queue.length > 0) {
            const size = queue.length;
            
            for (let i = 0; i < size; i++) {
                const [p, q] = queue.shift();
                
                // Check all four directions
                const nbr = [[p-1, q], [p+1, q], [p, q+1], [p, q-1]];
                
                for (let x = 0; x < nbr.length; x++) {
                    const [newX, newY] = nbr[x];
                    
                    // Check bounds and if cell is fresh orange
                    if (newX < 0 || newX >= m || newY < 0 || newY >= n || 
                        grid[newX][newY] === 2 || grid[newX][newY] === 0) {
                        continue;
                    }
                    
                    // Rot the fresh orange
                    grid[newX][newY] = 2;
                    queue.push([newX, newY]);
                }
            }
            
            timer++;
            freshOr -= queue.length;
            
            if (freshOr === 0) break;
        }
        
        return freshOr !== 0 ? -1 : timer;
    }
    
    /**
     * Approach 2: BFS with Level Tracking (Alternative)
     * 
     * Algorithm:
     * 1. Use BFS with explicit level tracking
     * 2. Process each level (minute) separately
     * 3. Track fresh oranges count more accurately
     * 4. Return minutes or -1 if impossible
     * 
     * Time Complexity: O(m * n) - We visit each cell at most once
     * Space Complexity: O(m * n) - Queue and grid modification
     */
    orangesRottingLevelTracking(grid) {
        const m = grid.length;
        const n = grid[0].length;
        const queue = [];
        let freshCount = 0;
        
        // Count fresh oranges and add rotten oranges to queue
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === 2) {
                    queue.push([i, j]);
                } else if (grid[i][j] === 1) {
                    freshCount++;
                }
            }
        }
        
        // If no fresh oranges, return 0
        if (freshCount === 0) return 0;
        
        let minutes = 0;
        const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];
        
        // BFS with level tracking
        while (queue.length > 0 && freshCount > 0) {
            const levelSize = queue.length;
            let rottedThisLevel = false;
            
            // Process current level (one minute)
            for (let i = 0; i < levelSize; i++) {
                const [currentRow, currentCol] = queue.shift();
                
                // Check all four directions
                for (const [dirRow, dirCol] of directions) {
                    const newRow = currentRow + dirRow;
                    const newCol = currentCol + dirCol;
                    
                    // Check bounds and if cell is fresh orange
                    if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && 
                        grid[newRow][newCol] === 1) {
                        
                        // Rot the fresh orange
                        grid[newRow][newCol] = 2;
                        queue.push([newRow, newCol]);
                        freshCount--;
                        rottedThisLevel = true;
                    }
                }
            }
            
            // If no oranges rotted this level, we can't rot any more
            if (!rottedThisLevel && freshCount > 0) {
                return -1;
            }
            
            minutes++;
        }
        
        return freshCount === 0 ? minutes : -1;
    }
    
    /**
     * Approach 3: DFS Approach (Less Efficient)
     * 
     * Algorithm:
     * 1. For each fresh orange, find minimum distance to any rotten orange
     * 2. Use DFS to explore paths to rotten oranges
     * 3. Track minimum time needed for each orange
     * 4. Return maximum time or -1 if impossible
     * 
     * Time Complexity: O((m * n)²) - For each fresh orange, we might visit all cells
     * Space Complexity: O(m * n) - Recursion stack depth
     */
    orangesRottingDFS(grid) {
        const m = grid.length;
        const n = grid[0].length;
        let maxTime = 0;
        
        // For each fresh orange, find minimum time to rot
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === 1) {
                    const time = this.findMinTimeToRot(grid, i, j, m, n);
                    if (time === Infinity) {
                        return -1; // This orange can never rot
                    }
                    maxTime = Math.max(maxTime, time);
                }
            }
        }
        
        return maxTime;
    }
    
    findMinTimeToRot(grid, row, col, m, n) {
        const visited = Array(m).fill().map(() => Array(n).fill(false));
        return this.dfs(grid, row, col, m, n, visited, 0);
    }
    
    dfs(grid, row, col, m, n, visited, time) {
        // Base cases
        if (row < 0 || row >= m || col < 0 || col >= n || visited[row][col]) {
            return Infinity;
        }
        
        if (grid[row][col] === 2) {
            return time; // Found a rotten orange
        }
        
        if (grid[row][col] === 0) {
            return Infinity; // Empty cell
        }
        
        visited[row][col] = true;
        
        // Explore all four directions
        const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];
        let minTime = Infinity;
        
        for (const [dirRow, dirCol] of directions) {
            const newRow = row + dirRow;
            const newCol = col + dirCol;
            
            const result = this.dfs(grid, newRow, newCol, m, n, visited, time + 1);
            minTime = Math.min(minTime, result);
        }
        
        visited[row][col] = false;
        return minTime;
    }
}

/**
 * Test function
 */
function testRottingOranges() {
    const solution = new RottingOranges();
    
    // Test cases
    const test1 = [
        [2,1,1],
        [1,1,0],
        [0,1,1]
    ];
    
    const test2 = [
        [2,1,1],
        [0,1,1],
        [1,0,1]
    ];
    
    const test3 = [
        [0,2]
    ];
    
    const test4 = [
        [1,1,1],
        [1,1,1],
        [1,1,1]
    ];
    
    console.log("=== Rotting Oranges Problem ===");
    console.log("Test 1 - Expected: 4, Got:", solution.orangesRotting(test1));
    
    console.log("\nTest 2 - Expected: -1, Got:", solution.orangesRotting(test2));
    
    console.log("\nTest 3 - Expected: 0, Got:", solution.orangesRotting(test3));
    
    console.log("\nTest 4 - Expected: -1, Got:", solution.orangesRotting(test4));
    
    console.log("\n--- Level Tracking Approach ---");
    console.log("Test 1 - Expected: 4, Got:", solution.orangesRottingLevelTracking(test1));
    
    console.log("\n--- DFS Approach ---");
    console.log("Test 1 - Expected: 4, Got:", solution.orangesRottingDFS(test1));
}

// Run tests
testRottingOranges();

/**
 * Complexity Analysis:
 * 
 * Multi-source BFS Approach:
 * - Time: O(m * n) - We visit each cell at most once
 * - Space: O(m * n) - Queue and grid modification
 * 
 * BFS with Level Tracking:
 * - Time: O(m * n) - We visit each cell at most once
 * - Space: O(m * n) - Queue and grid modification
 * 
 * DFS Approach:
 * - Time: O((m * n)²) - For each fresh orange, we might visit all cells
 * - Space: O(m * n) - Recursion stack depth
 * 
 * Key Insights:
 * 1. Multi-source BFS is the most efficient approach
 * 2. Starting from rotten oranges is optimal
 * 3. Level-by-level processing naturally gives us minutes
 * 4. Tracking fresh orange count is crucial
 * 5. Impossible case: when fresh oranges are isolated
 * 
 * Applications:
 * - Disease spread modeling
 * - Network propagation
 * - Game development (infection mechanics)
 * - Social network analysis (information spread)
 */

module.exports = RottingOranges; 