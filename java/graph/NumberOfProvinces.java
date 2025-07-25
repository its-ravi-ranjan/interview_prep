/**
 * Number of Provinces Problem
 * 
 * Problem: Given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city 
 * and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.
 * Return the total number of provinces.
 * 
 * A province is a group of directly or indirectly connected cities and no other cities outside of the group.
 * 
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation and algorithm practice
 */

import java.util.*;

public class NumberOfProvinces {
    
    public static void main(String[] args) {
        NumberOfProvinces solution = new NumberOfProvinces();
        
        // Test cases
        int[][] test1 = {
            {1,1,0},
            {1,1,0},
            {0,0,1}
        };
        
        int[][] test2 = {
            {1,0,0},
            {0,1,0},
            {0,0,1}
        };
        
        int[][] test3 = {
            {1,1,1},
            {1,1,1},
            {1,1,1}
        };
        
        System.out.println("Test 1 - Expected: 2, Got: " + solution.findCircleNum(test1));
        System.out.println("Test 2 - Expected: 3, Got: " + solution.findCircleNum(test2));
        System.out.println("Test 3 - Expected: 1, Got: " + solution.findCircleNum(test3));
        
        System.out.println("\n--- DFS Approach ---");
        System.out.println("Test 1 - Expected: 2, Got: " + solution.findCircleNumDFS(test1));
        System.out.println("Test 2 - Expected: 3, Got: " + solution.findCircleNumDFS(test2));
        System.out.println("Test 3 - Expected: 1, Got: " + solution.findCircleNumDFS(test3));
        
        System.out.println("\n--- Union Find Approach ---");
        System.out.println("Test 1 - Expected: 2, Got: " + solution.findCircleNumUnionFind(test1));
        System.out.println("Test 2 - Expected: 3, Got: " + solution.findCircleNumUnionFind(test2));
        System.out.println("Test 3 - Expected: 1, Got: " + solution.findCircleNumUnionFind(test3));
    }
    
    /**
     * Approach 1: BFS (Breadth-First Search)
     * 
     * Algorithm:
     * 1. Use a boolean array to track visited cities
     * 2. For each unvisited city, start BFS to find all connected cities
     * 3. Mark all connected cities as visited
     * 4. Count each BFS traversal as one province
     * 
     * Time Complexity: O(n²) - We need to check all n² connections
     * Space Complexity: O(n) - For visited array and queue
     */
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] visited = new boolean[n];
        int count = 0;
        
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                // Start BFS from unvisited city
                Queue<Integer> queue = new LinkedList<>();
                queue.offer(i);
                visited[i] = true;
                
                while (!queue.isEmpty()) {
                    int city = queue.poll();
                    
                    // Check all connections from current city
                    for (int j = 0; j < n; j++) {
                        if (isConnected[city][j] == 1 && !visited[j]) {
                            queue.offer(j);
                            visited[j] = true;
                        }
                    }
                }
                count++; // Increment province count
            }
        }
        return count;
    }
    
    /**
     * Approach 2: DFS (Depth-First Search)
     * 
     * Algorithm:
     * 1. Use a boolean array to track visited cities
     * 2. For each unvisited city, start DFS to find all connected cities
     * 3. Mark all connected cities as visited
     * 4. Count each DFS traversal as one province
     * 
     * Time Complexity: O(n²) - We need to check all n² connections
     * Space Complexity: O(n) - For visited array and recursion stack
     */
    public int findCircleNumDFS(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] visited = new boolean[n];
        int count = 0;
        
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                dfs(isConnected, visited, i);
                count++;
            }
        }
        return count;
    }
    
    private void dfs(int[][] isConnected, boolean[] visited, int city) {
        visited[city] = true;
        
        for (int j = 0; j < isConnected.length; j++) {
            if (isConnected[city][j] == 1 && !visited[j]) {
                dfs(isConnected, visited, j);
            }
        }
    }
    
    /**
     * Approach 3: Union Find (Disjoint Set)
     * 
     * Algorithm:
     * 1. Initialize each city as its own parent
     * 2. For each connection, union the two cities
     * 3. Count the number of unique parents (provinces)
     * 
     * Time Complexity: O(n² * α(n)) where α is the inverse Ackermann function
     * Space Complexity: O(n) - For parent and rank arrays
     */
    public int findCircleNumUnionFind(int[][] isConnected) {
        int n = isConnected.length;
        UnionFind uf = new UnionFind(n);
        
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (isConnected[i][j] == 1) {
                    uf.union(i, j);
                }
            }
        }
        
        return uf.getCount();
    }
    
    /**
     * Union Find Data Structure
     */
    class UnionFind {
        private int[] parent;
        private int[] rank;
        private int count;
        
        public UnionFind(int n) {
            parent = new int[n];
            rank = new int[n];
            count = n;
            
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
        
        public void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            
            if (rootX != rootY) {
                // Union by rank
                if (rank[rootX] < rank[rootY]) {
                    parent[rootX] = rootY;
                } else if (rank[rootX] > rank[rootY]) {
                    parent[rootY] = rootX;
                } else {
                    parent[rootY] = rootX;
                    rank[rootX]++;
                }
                count--;
            }
        }
        
        public int getCount() {
            return count;
        }
    }
}

/**
 * Test Cases and Examples:
 * 
 * Example 1:
 * isConnected = [[1,1,0],[1,1,0],[0,0,1]]
 * Output: 2
 * Explanation: Cities 0 and 1 are connected, city 2 is isolated
 * 
 * Example 2:
 * isConnected = [[1,0,0],[0,1,0],[0,0,1]]
 * Output: 3
 * Explanation: All cities are isolated
 * 
 * Example 3:
 * isConnected = [[1,1,1],[1,1,1],[1,1,1]]
 * Output: 1
 * Explanation: All cities are connected
 * 
 * Complexity Analysis:
 * 
 * BFS/DFS Approach:
 * - Time: O(n²) - We need to check all n² connections in the matrix
 * - Space: O(n) - For visited array and queue/recursion stack
 * 
 * Union Find Approach:
 * - Time: O(n² * α(n)) where α is the inverse Ackermann function (practically constant)
 * - Space: O(n) - For parent and rank arrays
 * 
 * All approaches are optimal for this problem since we must examine the entire adjacency matrix.
 */ 