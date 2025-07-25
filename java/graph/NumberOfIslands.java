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

import java.util.*;

public class NumberOfIslands {
    
    public static void main(String[] args) {
        NumberOfIslands solution = new NumberOfIslands();
        
        // Test cases
        char[][] test1 = {
            {'1','1','1','1','0'},
            {'1','1','0','1','0'},
            {'1','1','0','0','0'},
            {'0','0','0','0','0'}
        };
        
        char[][] test2 = {
            {'1','1','0','0','0'},
            {'1','1','0','0','0'},
            {'0','0','1','0','0'},
            {'0','0','0','1','1'}
        };
        
        char[][] test3 = {
            {'1','1','1'},
            {'0','1','0'},
            {'1','1','1'}
        };
        
        System.out.println("=== Number of Islands Problem ===");
        System.out.println("Test 1 - Expected: 1, Got: " + solution.numIslands(test1));
        System.out.println("Test 2 - Expected: 3, Got: " + solution.numIslands(test2));
        System.out.println("Test 3 - Expected: 1, Got: " + solution.numIslands(test3));
        
        System.out.println("\n--- BFS Approach ---");
        System.out.println("Test 1 - Expected: 1, Got: " + solution.numIslandsBFS(test1));
        System.out.println("Test 2 - Expected: 3, Got: " + solution.numIslandsBFS(test2));
        System.out.println("Test 3 - Expected: 1, Got: " + solution.numIslandsBFS(test3));
        
        System.out.println("\n--- Union Find Approach ---");
        System.out.println("Test 1 - Expected: 1, Got: " + solution.numIslandsUnionFind(test1));
        System.out.println("Test 2 - Expected: 3, Got: " + solution.numIslandsUnionFind(test2));
        System.out.println("Test 3 - Expected: 1, Got: " + solution.numIslandsUnionFind(test3));
    }
    
    private int n = 0;
    private int m = 0;
    
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
    public int numIslands(char[][] grid) {
        n = grid.length;
        m = grid[0].length;
        int count = 0;
        
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == '1') {
                    dfs(grid, i, j);
                    count++;
                }
            }
        }
        return count;
    }
    
    private void dfs(char[][] grid, int i, int j) {
        // Base cases: out of bounds or water/visited
        if (i < 0 || i >= n || j < 0 || j >= m) return;
        if (grid[i][j] == '0' || grid[i][j] == '2') return;
        
        // Mark current cell as visited
        grid[i][j] = '2';
        
        // Explore all four directions
        dfs(grid, i - 1, j); // up
        dfs(grid, i + 1, j); // down
        dfs(grid, i, j - 1); // left
        dfs(grid, i, j + 1); // right
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
    public int numIslandsBFS(char[][] grid) {
        int n = grid.length;
        int m = grid[0].length;
        int count = 0;
        
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == '1') {
                    bfs(grid, i, j);
                    count++;
                }
            }
        }
        return count;
    }
    
    private void bfs(char[][] grid, int i, int j) {
        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[]{i, j});
        grid[i][j] = '2'; // Mark as visited
        
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}; // up, down, left, right
        
        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            
            for (int[] dir : directions) {
                int newRow = current[0] + dir[0];
                int newCol = current[1] + dir[1];
                
                if (newRow >= 0 && newRow < grid.length && 
                    newCol >= 0 && newCol < grid[0].length && 
                    grid[newRow][newCol] == '1') {
                    queue.offer(new int[]{newRow, newCol});
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
    public int numIslandsUnionFind(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        
        int n = grid.length;
        int m = grid[0].length;
        UnionFind uf = new UnionFind(n * m);
        
        int count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    int current = i * m + j;
                    
                    // Check all four directions
                    int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
                    for (int[] dir : directions) {
                        int newRow = i + dir[0];
                        int newCol = j + dir[1];
                        
                        if (newRow >= 0 && newRow < n && 
                            newCol >= 0 && newCol < m && 
                            grid[newRow][newCol] == '1') {
                            int neighbor = newRow * m + newCol;
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
    
    /**
     * Union Find Data Structure
     */
    class UnionFind {
        private int[] parent;
        private int[] rank;
        
        public UnionFind(int n) {
            parent = new int[n];
            rank = new int[n];
            
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }
        
        public int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]); // Path compression
            }
            return parent[x];
        }
        
        public boolean union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            
            if (rootX == rootY) {
                return false; // Already connected
            }
            
            // Union by rank
            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
            return true; // Successfully merged
        }
    }
}

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
 * 
 * Reference: https://www.youtube.com/watch?v=A5jgfPYxwgA
 */ 