/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation and algorithm practice
 * 
 * Flood Fill Problem
 * 
 * Problem: Given an image represented by an m x n grid of integers image, where image[i][j] 
 * represents the pixel value of the image. You are also given three integers sr, sc, and color. 
 * Your task is to perform a flood fill on the image starting from the pixel image[sr][sc].
 * 
 * To perform a flood fill:
 * 1. Begin with the starting pixel and change its color to color.
 * 2. Perform the same process for each pixel that is directly adjacent (pixels that share a side 
 *    with the original pixel, either horizontally or vertically) and shares the same color as the starting pixel.
 * 3. Keep repeating this process by checking neighboring pixels of the updated pixels and modifying 
 *    their color if it matches the original color of the starting pixel.
 * 4. The process stops when there are no more adjacent pixels of the original color to update.
 * 
 * Examples:
 * 
 * Example 1:
 * Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
 * Output: [[2,2,2],[2,2,0],[2,0,1]]
 * Explanation: Starting from the middle pixel (1,1), all connected 1s are changed to 2
 * 
 * Example 2:
 * Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
 * Output: [[0,0,0],[0,0,0]]
 * Explanation: No change needed since new color equals original color
 * 
 * Example 3:
 * Input: image = [[1,1,1,1],[1,1,1,0],[1,0,1,1]], sr = 1, sc = 1, color = 3
 * Output: [[3,3,3,3],[3,3,3,0],[3,0,3,3]]
 * Explanation: All connected 1s starting from (1,1) are changed to 3
 * 
 * Approaches:
 * 
 * 1. DFS (Depth-First Search) - Recursive approach
 *    - Time: O(m * n), Space: O(m * n)
 * 
 * 2. BFS (Breadth-First Search) - Queue-based approach  
 *    - Time: O(m * n), Space: O(min(m, n))
 * 
 * 3. Iterative DFS - Stack-based approach
 *    - Time: O(m * n), Space: O(m * n)
 */

import java.util.*;

public class FloodFill {
    
    public static void main(String[] args) {
        FloodFill solution = new FloodFill();
        
        // Test cases
        int[][] test1 = {
            {1,1,1},
            {1,1,0},
            {1,0,1}
        };
        
        int[][] test2 = {
            {0,0,0},
            {0,0,0},
            {0,0,0}
        };
        
        int[][] test3 = {
            {1,1,1,1},
            {1,1,1,0},
            {1,0,1,1}
        };
        
        System.out.println("=== Flood Fill Problem ===");
        System.out.println("Test 1 - Starting at (1,1) with color 2:");
        printImage(solution.floodFill(test1, 1, 1, 2));
        
        System.out.println("\nTest 2 - Starting at (0,0) with color 1:");
        printImage(solution.floodFill(test2, 0, 0, 1));
        
        System.out.println("\nTest 3 - Starting at (1,1) with color 3:");
        printImage(solution.floodFill(test3, 1, 1, 3));
        
        System.out.println("\n--- BFS Approach ---");
        System.out.println("Test 1 - Starting at (1,1) with color 2:");
        printImage(solution.floodFillBFS(test1, 1, 1, 2));
        
        System.out.println("\n--- Iterative DFS Approach ---");
        System.out.println("Test 1 - Starting at (1,1) with color 2:");
        printImage(solution.floodFillIterative(test1, 1, 1, 2));
    }
    
    private int originalColor = 0;
    private int m = 0;
    private int n = 0;
    
    /**
     * Approach 1: DFS (Depth-First Search) - Original Solution
     * 
     * Algorithm:
     * 1. Store the original color of the starting pixel
     * 2. Use DFS to recursively fill all connected pixels with the same color
     * 3. Change the color of each visited pixel
     * 4. Stop when we hit boundaries or different colors
     * 
     * Time Complexity: O(m * n) - We visit each pixel at most once
     * Space Complexity: O(m * n) - Worst case recursion stack depth
     */
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        originalColor = image[sr][sc];
        m = image.length;
        n = image[0].length;
        
        // If the new color is the same as the original, no need to do anything
        if (originalColor == color) return image;
        
        dfs(image, sr, sc, color);
        return image;
    }
    
    private void dfs(int[][] image, int sr, int sc, int color) {
        // Base cases: out of bounds or different color
        if (sr < 0 || sr >= m || sc < 0 || sc >= n) return;
        if (image[sr][sc] == color || image[sr][sc] != originalColor) return;
        
        // Change the color of current pixel
        image[sr][sc] = color;
        
        // Explore all four directions
        dfs(image, sr + 1, sc, color); // down
        dfs(image, sr - 1, sc, color); // up
        dfs(image, sr, sc + 1, color); // right
        dfs(image, sr, sc - 1, color); // left
    }
    
    /**
     * Approach 2: BFS (Breadth-First Search)
     * 
     * Algorithm:
     * 1. Store the original color of the starting pixel
     * 2. Use BFS to fill all connected pixels level by level
     * 3. Use queue to process pixels in breadth-first order
     * 4. Change the color of each visited pixel
     * 
     * Time Complexity: O(m * n) - We visit each pixel at most once
     * Space Complexity: O(min(m, n)) - Queue size in worst case
     */
    public int[][] floodFillBFS(int[][] image, int sr, int sc, int color) {
        int originalColor = image[sr][sc];
        int m = image.length;
        int n = image[0].length;
        
        // If the new color is the same as the original, no need to do anything
        if (originalColor == color) return image;
        
        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[]{sr, sc});
        image[sr][sc] = color; // Change the starting pixel
        
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}; // up, down, left, right
        
        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            
            for (int[] dir : directions) {
                int newRow = current[0] + dir[0];
                int newCol = current[1] + dir[1];
                
                if (newRow >= 0 && newRow < m && 
                    newCol >= 0 && newCol < n && 
                    image[newRow][newCol] == originalColor) {
                    queue.offer(new int[]{newRow, newCol});
                    image[newRow][newCol] = color;
                }
            }
        }
        return image;
    }
    
    /**
     * Approach 3: Iterative DFS (Using Stack)
     * 
     * Algorithm:
     * 1. Store the original color of the starting pixel
     * 2. Use stack to simulate DFS iteratively
     * 3. Process pixels in depth-first order without recursion
     * 4. Change the color of each visited pixel
     * 
     * Time Complexity: O(m * n) - We visit each pixel at most once
     * Space Complexity: O(m * n) - Stack size in worst case
     */
    public int[][] floodFillIterative(int[][] image, int sr, int sc, int color) {
        int originalColor = image[sr][sc];
        int m = image.length;
        int n = image[0].length;
        
        // If the new color is the same as the original, no need to do anything
        if (originalColor == color) return image;
        
        Stack<int[]> stack = new Stack<>();
        stack.push(new int[]{sr, sc});
        
        while (!stack.isEmpty()) {
            int[] current = stack.pop();
            int row = current[0];
            int col = current[1];
            
            // Check if current pixel needs to be filled
            if (row < 0 || row >= m || col < 0 || col >= n || 
                image[row][col] != originalColor) {
                continue;
            }
            
            // Change the color of current pixel
            image[row][col] = color;
            
            // Add all four neighbors to stack
            stack.push(new int[]{row + 1, col}); // down
            stack.push(new int[]{row - 1, col}); // up
            stack.push(new int[]{row, col + 1}); // right
            stack.push(new int[]{row, col - 1}); // left
        }
        return image;
    }
    
    /**
     * Helper method to print the image
     */
    private static void printImage(int[][] image) {
        for (int[] row : image) {
            System.out.print("[");
            for (int i = 0; i < row.length; i++) {
                System.out.print(row[i]);
                if (i < row.length - 1) System.out.print(",");
            }
            System.out.println("]");
        }
    }
}

/**
 * Test Cases and Examples:
 * 
 * Example 1:
 * Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
 * Output: [[2,2,2],[2,2,0],[2,0,1]]
 * Explanation: Starting from the middle pixel, all connected 1s are changed to 2
 * 
 * Example 2:
 * Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
 * Output: [[0,0,0],[0,0,0]]
 * Explanation: No change needed since new color equals original color
 * 
 * Example 3:
 * Input: image = [[1,1,1,1],[1,1,1,0],[1,0,1,1]], sr = 1, sc = 1, color = 3
 * Output: [[3,3,3,3],[3,3,3,0],[3,0,3,3]]
 * Explanation: All connected 1s starting from (1,1) are changed to 3
 * 
 * Complexity Analysis:
 * 
 * DFS Approach:
 * - Time: O(m * n) - We visit each pixel at most once
 * - Space: O(m * n) - Worst case recursion stack depth (when all pixels are connected)
 * 
 * BFS Approach:
 * - Time: O(m * n) - We visit each pixel at most once
 * - Space: O(min(m, n)) - Queue size in worst case
 * 
 * Iterative DFS Approach:
 * - Time: O(m * n) - We visit each pixel at most once
 * - Space: O(m * n) - Stack size in worst case
 * 
 * Key Insights:
 * 1. This is a classic flood fill algorithm used in image editing software
 * 2. DFS/BFS are natural choices for connected component traversal
 * 3. BFS has better space complexity for large images
 * 4. The original color check prevents infinite loops
 * 5. All approaches have optimal time complexity
 * 6. The iterative approach avoids stack overflow for very large images
 * 
 * Applications:
 * - Image editing software (paint bucket tool)
 * - Game development (terrain generation)
 * - Computer vision (region segmentation)
 * - Geographic information systems (area filling)
 */ 