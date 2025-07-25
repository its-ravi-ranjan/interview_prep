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

class NumberOfProvinces {
    
    /**
     * Approach 1: BFS (Breadth-First Search)
     * 
     * Algorithm:
     * 1. Use a Set to track visited cities
     * 2. For each unvisited city, start BFS to find all connected cities
     * 3. Mark all connected cities as visited
     * 4. Count each BFS traversal as one province
     * 
     * Time Complexity: O(n²) - We need to check all n² connections
     * Space Complexity: O(n) - For visited Set and queue
     */
    findCircleNum(isConnected) {
        const n = isConnected.length;
        const visited = new Set();
        let count = 0;
        
        for (let i = 0; i < n; i++) {
            if (!visited.has(i)) {
                // Start BFS from unvisited city
                const queue = [i];
                visited.add(i);
                
                while (queue.length > 0) {
                    const city = queue.shift();
                    
                    // Check all connections from current city
                    for (let j = 0; j < n; j++) {
                        if (isConnected[city][j] === 1 && !visited.has(j)) {
                            queue.push(j);
                            visited.add(j);
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
     * 1. Use a Set to track visited cities
     * 2. For each unvisited city, start DFS to find all connected cities
     * 3. Mark all connected cities as visited
     * 4. Count each DFS traversal as one province
     * 
     * Time Complexity: O(n²) - We need to check all n² connections
     * Space Complexity: O(n) - For visited Set and recursion stack
     */
    findCircleNumDFS(isConnected) {
        const n = isConnected.length;
        const visited = new Set();
        let count = 0;
        
        for (let i = 0; i < n; i++) {
            if (!visited.has(i)) {
                this.dfs(isConnected, visited, i);
                count++;
            }
        }
        return count;
    }
    
    dfs(isConnected, visited, city) {
        visited.add(city);
        
        for (let j = 0; j < isConnected.length; j++) {
            if (isConnected[city][j] === 1 && !visited.has(j)) {
                this.dfs(isConnected, visited, j);
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
    findCircleNumUnionFind(isConnected) {
        const n = isConnected.length;
        const uf = new UnionFind(n);
        
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (isConnected[i][j] === 1) {
                    uf.union(i, j);
                }
            }
        }
        
        return uf.getCount();
    }
}

/**
 * Union Find Data Structure
 */
class UnionFind {
    constructor(n) {
        this.parent = new Array(n);
        this.rank = new Array(n);
        this.count = n;
        
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
        
        if (rootX !== rootY) {
            // Union by rank
            if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
            this.count--;
        }
    }
    
    getCount() {
        return this.count;
    }
}

/**
 * Test function
 */
function testNumberOfProvinces() {
    const solution = new NumberOfProvinces();
    
    // Test cases
    const test1 = [
        [1,1,0],
        [1,1,0],
        [0,0,1]
    ];
    
    const test2 = [
        [1,0,0],
        [0,1,0],
        [0,0,1]
    ];
    
    const test3 = [
        [1,1,1],
        [1,1,1],
        [1,1,1]
    ];
    
    console.log("=== Number of Provinces Problem ===");
    console.log("Test 1 - Expected: 2, Got:", solution.findCircleNum(test1));
    console.log("Test 2 - Expected: 3, Got:", solution.findCircleNum(test2));
    console.log("Test 3 - Expected: 1, Got:", solution.findCircleNum(test3));
    
    console.log("\n--- DFS Approach ---");
    console.log("Test 1 - Expected: 2, Got:", solution.findCircleNumDFS(test1));
    console.log("Test 2 - Expected: 3, Got:", solution.findCircleNumDFS(test2));
    console.log("Test 3 - Expected: 1, Got:", solution.findCircleNumDFS(test3));
    
    console.log("\n--- Union Find Approach ---");
    console.log("Test 1 - Expected: 2, Got:", solution.findCircleNumUnionFind(test1));
    console.log("Test 2 - Expected: 3, Got:", solution.findCircleNumUnionFind(test2));
    console.log("Test 3 - Expected: 1, Got:", solution.findCircleNumUnionFind(test3));
}

// Run tests
testNumberOfProvinces();

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
 * - Space: O(n) - For visited Set and queue/recursion stack
 * 
 * Union Find Approach:
 * - Time: O(n² * α(n)) where α is the inverse Ackermann function (practically constant)
 * - Space: O(n) - For parent and rank arrays
 * 
 * All approaches are optimal for this problem since we must examine the entire adjacency matrix.
 * 
 * Key Insights:
 * 1. This is essentially finding the number of connected components in an undirected graph
 * 2. The adjacency matrix representation makes it easy to check connections
 * 3. BFS/DFS are natural choices for graph traversal
 * 4. Union Find is efficient for dynamic connectivity problems
 * 5. All approaches have the same time complexity since we must examine the entire matrix
 */

module.exports = NumberOfProvinces; 