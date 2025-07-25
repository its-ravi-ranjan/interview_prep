/**
 * Number of Islands Problem
 * 
 * Problem: Given an m x n 2D binary grid grid which represents a map of '1's (land) 
 * and '0's (water), return the number of islands.
 * 
 * An island is surrounded by water and is formed by connecting adjacent lands 
 * horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
 * 
 * Reference: https://www.youtube.com/watch?v=A5jgfPYxwgA
 * 
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation and algorithm practice
 */

class NumberOfIslands {
    
    constructor() {
        this.n = 0;
        this.m = 0;
    }
    
    /**
     * Approach 1: DFS (Depth-First Search) - Original Solution
     * 
     * Algorithm:
     * 1. Iterate through each cell in the grid
     * 2. When we find a '1' (land), start DFS to mark all connected land cells
     * 3. Mark visited cells as '2' to avoid revisiting
     * 4. Count each DFS traversal as one island
     * 
     * Time Complexity: O(m * n) - We visit each cell at most once
     * Space Complexity: O(m * n) - Worst case recursion stack depth
     */
    numIslands(grid) {
        this.n = grid.length;
        this.m = grid[0].length;
        let count = 0;
        
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.m; j++) {
                if (grid[i][j] === '1') {
                    this.dfs(grid, i, j);
                    count++;
                }
            }
        }
        return count;
    }
    
    dfs(grid, i, j) {
        // Base cases: out of bounds or water/visited
        if (i < 0 || i >= this.n || j < 0 || j >= this.m) return;
        if (grid[i][j] === '0' || grid[i][j] === '2') return;
        
        // Mark current cell as visited
        grid[i][j] = '2';
        
        // Explore all four directions
        this.dfs(grid, i - 1, j); // up
        this.dfs(grid, i + 1, j); // down
        this.dfs(grid, i, j - 1); // left
        this.dfs(grid, i, j + 1); // right
    }
    
    /**
     * Approach 2: BFS (Breadth-First Search)
     * 
     * Algorithm:
     * 1. Iterate through each cell in the grid
     * 2. When we find a '1' (land), start BFS to mark all connected land cells
     * 3. Use queue to process cells level by level
     * 4. Mark visited cells as '2' to avoid revisiting
     * 5. Count each BFS traversal as one island
     * 
     * Time Complexity: O(m * n) - We visit each cell at most once
     * Space Complexity: O(min(m, n)) - Queue size in worst case
     */
    numIslandsBFS(grid) {
        const n = grid.length;
        const m = grid[0].length;
        let count = 0;
        
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (grid[i][j] === '1') {
                    this.bfs(grid, i, j);
                    count++;
                }
            }
        }
        return count;
    }
    
    bfs(grid, i, j) {
        const queue = [[i, j]];
        grid[i][j] = '2'; // Mark as visited
        
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right
        
        while (queue.length > 0) {
            const [currentRow, currentCol] = queue.shift();
            
            for (const [dirRow, dirCol] of directions) {
                const newRow = currentRow + dirRow;
                const newCol = currentCol + dirCol;
                
                if (newRow >= 0 && newRow < grid.length && 
                    newCol >= 0 && newCol < grid[0].length && 
                    grid[newRow][newCol] === '1') {
                    queue.push([newRow, newCol]);
                    grid[newRow][newCol] = '2'; // Mark as visited
                }
            }
        }
    }
    
    /**
     * Approach 3: Union Find (Disjoint Set)
     * 
     * Algorithm:
     * 1. Initialize Union Find with size m * n
     * 2. For each land cell, union with adjacent land cells
     * 3. Count the number of unique connected components
     * 
     * Time Complexity: O(m * n * α(m*n)) where α is the inverse Ackermann function
     * Space Complexity: O(m * n) - For parent and rank arrays
     */
    numIslandsUnionFind(grid) {
        if (!grid || grid.length === 0) return 0;
        
        const n = grid.length;
        const m = grid[0].length;
        const uf = new UnionFind(n * m);
        
        let count = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (grid[i][j] === '1') {
                    count++;
                    const current = i * m + j;
                    
                    // Check all four directions
                    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                    for (const [dirRow, dirCol] of directions) {
                        const newRow = i + dirRow;
                        const newCol = j + dirCol;
                        
                        if (newRow >= 0 && newRow < n && 
                            newCol >= 0 && newCol < m && 
                            grid[newRow][newCol] === '1') {
                            const neighbor = newRow * m + newCol;
                            if (uf.union(current, neighbor)) {
                                count--; // Reduce count when we merge islands
                            }
                        }
                    }
                }
            }
        }
        return count;
    }
}

/**
 * Union Find Data Structure
 */
class UnionFind {
    constructor(n) {
        this.parent = new Array(n);
        this.rank = new Array(n);
        
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
            this.rank[i] = 0;
        }
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) {
            return false; // Already connected
        }
        
        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        return true; // Successfully merged
    }
}

/**
 * Test function
 */
function testNumberOfIslands() {
    const solution = new NumberOfIslands();
    
    // Test cases
    const test1 = [
        ['1','1','1','1','0'],
        ['1','1','0','1','0'],
        ['1','1','0','0','0'],
        ['0','0','0','0','0']
    ];
    
    const test2 = [
        ['1','1','0','0','0'],
        ['1','1','0','0','0'],
        ['0','0','1','0','0'],
        ['0','0','0','1','1']
    ];
    
    const test3 = [
        ['1','1','1'],
        ['0','1','0'],
        ['1','1','1']
    ];
    
    console.log("=== Number of Islands Problem ===");
    console.log("Test 1 - Expected: 1, Got:", solution.numIslands(test1));
    console.log("Test 2 - Expected: 3, Got:", solution.numIslands(test2));
    console.log("Test 3 - Expected: 1, Got:", solution.numIslands(test3));
    
    console.log("\n--- BFS Approach ---");
    console.log("Test 1 - Expected: 1, Got:", solution.numIslandsBFS(test1));
    console.log("Test 2 - Expected: 3, Got:", solution.numIslandsBFS(test2));
    console.log("Test 3 - Expected: 1, Got:", solution.numIslandsBFS(test3));
    
    console.log("\n--- Union Find Approach ---");
    console.log("Test 1 - Expected: 1, Got:", solution.numIslandsUnionFind(test1));
    console.log("Test 2 - Expected: 3, Got:", solution.numIslandsUnionFind(test2));
    console.log("Test 3 - Expected: 1, Got:", solution.numIslandsUnionFind(test3));
}

// Run tests
testNumberOfIslands();

/**
 * Test Cases and Examples:
 * 
 * Example 1:
 * grid = [
 *   ["1","1","1","1","0"],
 *   ["1","1","0","1","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","0","0","0"]
 * ]
 * Output: 1
 * Explanation: One large island connected by land
 * 
 * Example 2:
 * grid = [
 *   ["1","1","0","0","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","1","0","0"],
 *   ["0","0","0","1","1"]
 * ]
 * Output: 3
 * Explanation: Three separate islands
 * 
 * Example 3:
 * grid = [
 *   ["1","1","1"],
 *   ["0","1","0"],
 *   ["1","1","1"]
 * ]
 * Output: 1
 * Explanation: One island with a hole in the middle
 * 
 * Complexity Analysis:
 * 
 * DFS Approach:
 * - Time: O(m * n) - We visit each cell at most once
 * - Space: O(m * n) - Worst case recursion stack depth (when grid is all land)
 * 
 * BFS Approach:
 * - Time: O(m * n) - We visit each cell at most once
 * - Space: O(min(m, n)) - Queue size in worst case
 * 
 * Union Find Approach:
 * - Time: O(m * n * α(m*n)) where α is the inverse Ackermann function (practically constant)
 * - Space: O(m * n) - For parent and rank arrays
 * 
 * Key Insights:
 * 1. This is a classic connected components problem in a 2D grid
 * 2. DFS/BFS are natural choices for graph traversal
 * 3. Union Find is useful for dynamic connectivity problems
 * 4. BFS has better space complexity for large grids
 * 5. All approaches have optimal time complexity
 * 6. The original DFS solution is the most intuitive and commonly used
 * 
 * Reference: https://www.youtube.com/watch?v=A5jgfPYxwgA
 */

module.exports = NumberOfIslands; 