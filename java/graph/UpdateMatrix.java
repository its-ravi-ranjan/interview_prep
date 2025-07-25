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

import java.util.*;

public class UpdateMatrix {
    
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
    public int[][] updateMatrix(int[][] mat) {
        int m = mat.length;
        int n = mat[0].length;
        boolean[][] isVisited = new boolean[m][n];
        int[][] result = new int[m][n];
        Queue<int[]> queue = new LinkedList<>();
        
        // Add all 0s to queue and mark as visited
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 0) {
                    queue.offer(new int[]{i, j});
                    isVisited[i][j] = true;
                }
            }
        }
        
        // BFS from all 0s simultaneously
        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int row = current[0];
            int col = current[1];
            
            // Check all four directions
            int[][] directions = {{row-1, col}, {row+1, col}, {row, col+1}, {row, col-1}};
            
            for (int[] dir : directions) {
                int newRow = dir[0];
                int newCol = dir[1];
                
                // Check bounds and if already visited
                if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n || 
                    isVisited[newRow][newCol]) {
                    continue;
                }
                
                // Update distance and add to queue
                result[newRow][newCol] = result[row][col] + 1;
                queue.offer(new int[]{newRow, newCol});
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
    public int[][] updateMatrixBruteForce(int[][] mat) {
        int m = mat.length;
        int n = mat[0].length;
        int[][] result = new int[m][n];
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 1) {
                    result[i][j] = findNearestZero(mat, i, j);
                }
            }
        }
        
        return result;
    }
    
    private int findNearestZero(int[][] mat, int startRow, int startCol) {
        int m = mat.length;
        int n = mat[0].length;
        boolean[][] visited = new boolean[m][n];
        Queue<int[]> queue = new LinkedList<>();
        
        queue.offer(new int[]{startRow, startCol, 0}); // {row, col, distance}
        visited[startRow][startCol] = true;
        
        int[][] directions = {{-1, 0}, {1, 0}, {0, 1}, {0, -1}};
        
        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int row = current[0];
            int col = current[1];
            int distance = current[2];
            
            // If we found a 0, return the distance
            if (mat[row][col] == 0) {
                return distance;
            }
            
            // Explore all four directions
            for (int[] dir : directions) {
                int newRow = row + dir[0];
                int newCol = col + dir[1];
                
                if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && 
                    !visited[newRow][newCol]) {
                    queue.offer(new int[]{newRow, newCol, distance + 1});
                    visited[newRow][newCol] = true;
                }
            }
        }
        
        return Integer.MAX_VALUE; // Should not reach here
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
    public int[][] updateMatrixDP(int[][] mat) {
        int m = mat.length;
        int n = mat[0].length;
        int[][] result = new int[m][n];
        
        // Initialize result array
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 0) {
                    result[i][j] = 0;
                } else {
                    result[i][j] = Integer.MAX_VALUE - 1; // Avoid overflow
                }
            }
        }
        
        // First pass: top-left to bottom-right
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 1) {
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
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                if (mat[i][j] == 1) {
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
    
    /**
     * Helper method to print the matrix
     */
    private static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            System.out.print("[");
            for (int i = 0; i < row.length; i++) {
                System.out.print(row[i]);
                if (i < row.length - 1) System.out.print(",");
            }
            System.out.println("]");
        }
    }
    
    /**
     * Test function
     */
    public static void main(String[] args) {
        UpdateMatrix solution = new UpdateMatrix();
        
        // Test cases
        int[][] test1 = {
            {0,0,0},
            {0,1,0},
            {0,0,0}
        };
        
        int[][] test2 = {
            {0,0,0},
            {0,1,0},
            {1,1,1}
        };
        
        int[][] test3 = {
            {1,1,1},
            {1,1,1},
            {1,1,0}
        };
        
        System.out.println("=== 01 Matrix Problem ===");
        System.out.println("Test 1 - All 1s adjacent to 0s:");
        printMatrix(solution.updateMatrix(test1));
        
        System.out.println("\nTest 2 - Mixed distances:");
        printMatrix(solution.updateMatrix(test2));
        
        System.out.println("\nTest 3 - Single 0 with increasing distances:");
        printMatrix(solution.updateMatrix(test3));
        
        System.out.println("\n--- BFS from each 1 (Brute Force) ---");
        System.out.println("Test 2 - Mixed distances:");
        printMatrix(solution.updateMatrixBruteForce(test2));
        
        System.out.println("\n--- Dynamic Programming Approach ---");
        System.out.println("Test 2 - Mixed distances:");
        printMatrix(solution.updateMatrixDP(test2));
    }
}

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