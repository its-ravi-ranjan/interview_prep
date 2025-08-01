/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation and graph learning guide
 * 
 * ========================================
 * GRAPH DATA STRUCTURE - COMPLETE GUIDE
 * ========================================
 * 
 * What is a Graph?
 * ----------------
 * A graph is a collection of vertices (nodes) connected by edges.
 * 
 * Graph Types:
 * ------------
 * 1. Undirected Graph: Edges have no direction
 * 2. Directed Graph (Digraph): Edges have direction
 * 3. Weighted Graph: Edges have weights/costs
 * 4. Unweighted Graph: All edges have same weight
 * 
 * Visual Representation:
 * 
 * Undirected:          Directed:           Weighted:
 *    A -- B              A --> B             A --3-- B
 *    |    |              |     |             |       |
 *    C -- D              C --> D             C --2-- D
 * 
 * Graph Representations:
 * ----------------------
 * 1. Adjacency Matrix: 2D array
 * 2. Adjacency List: Array of arrays/objects
 * 3. Edge List: Array of edge objects
 * 
 * ========================================
 * WHEN TO RECOGNIZE GRAPH PROBLEMS
 * ========================================
 * 
 * 🔹 5. Ninja Techniques to Recognize Graph Problems
 * 
 * ✅ "Connected components" — graph traversal
 *    Examples: Number of islands, provinces, friend circles
 *    Pattern: Need to find groups of connected elements
 * 
 * ✅ "Shortest path" — BFS/Dijkstra/Bellman-Ford
 *    Examples: Word ladder, network delay time, cheapest flights
 *    Pattern: Find minimum distance/cost between points
 * 
 * ✅ "Topological sort" — DAG ordering
 *    Examples: Course schedule, build order, dependency resolution
 *    Pattern: Elements have dependencies, need ordering
 * 
 * ✅ "Cycle detection" — DFS with visited states
 *    Examples: Course prerequisites, deadlock detection
 *    Pattern: Need to detect circular dependencies
 * 
 * ✅ "Minimum spanning tree" — Kruskal/Prim
 *    Examples: Connect all cities, network wiring
 *    Pattern: Connect all nodes with minimum cost
 * 
 * ✅ "Strongly connected components" — Tarjan/Kosaraju
 *    Examples: Social network analysis, web page linking
 *    Pattern: Find groups where everyone can reach everyone
 * 
 * ========================================
 * GRAPH TRAVERSAL ALGORITHMS
 * ========================================
 * 
 * 1. BREADTH-FIRST SEARCH (BFS)
 * ------------------------------
 * Use: Shortest path in unweighted graphs, level-by-level traversal
 * Data Structure: Queue (Array with push/shift)
 * Time: O(V + E)
 * Space: O(V)
 * 
 * When to use:
 * - Shortest path (unweighted)
 * - Level-order traversal
 * - Web crawling
 * - Social network connections
 * 
 * 2. DEPTH-FIRST SEARCH (DFS)
 * ----------------------------
 * Use: Explore as far as possible, backtracking, cycle detection
 * Data Structure: Stack (recursion or array with push/pop)
 * Time: O(V + E)
 * Space: O(V) - recursion stack
 * 
 * When to use:
 * - Cycle detection
 * - Topological sort
 * - Connected components
 * - Backtracking problems
 * 
 * 3. DIJKSTRA'S ALGORITHM
 * ------------------------
 * Use: Shortest path in weighted graphs (positive weights)
 * Data Structure: Priority Queue (Min Heap)
 * Time: O((V + E) log V)
 * Space: O(V)
 * 
 * When to use:
 * - Shortest path with weights
 * - Network routing
 * - GPS navigation
 * 
 * 4. BELLMAN-FORD ALGORITHM
 * --------------------------
 * Use: Shortest path with negative weights, detect negative cycles
 * Data Structure: Array
 * Time: O(VE)
 * Space: O(V)
 * 
 * When to use:
 * - Negative weights allowed
 * - Currency exchange rates
 * - Arbitrage detection
 * 
 * ========================================
 * COMMON PROBLEM PATTERNS
 * ========================================
 * 
 * Pattern 1: "Connected Components"
 * ---------------------------------
 * Keywords: "islands", "provinces", "regions", "connected"
 * Solution: DFS/BFS to count components
 * 
 * Pattern 2: "Shortest Path"
 * ---------------------------
 * Keywords: "shortest", "minimum", "distance", "path"
 * Solution: BFS (unweighted) or Dijkstra (weighted)
 * 
 * Pattern 3: "Topological Sort"
 * ------------------------------
 * Keywords: "order", "schedule", "dependency", "prerequisite"
 * Solution: DFS with cycle detection
 * 
 * Pattern 4: "Cycle Detection"
 * -----------------------------
 * Keywords: "cycle", "loop", "deadlock", "circular"
 * Solution: DFS with visited states
 * 
 * Pattern 5: "Minimum Spanning Tree"
 * -----------------------------------
 * Keywords: "connect all", "minimum cost", "spanning"
 * Solution: Kruskal or Prim's algorithm
 * 
 * ========================================
 * IMPLEMENTATION STRATEGIES
 * ========================================
 * 
 * JavaScript Graph Implementation:
 * --------------------------------
 * 
 * // Adjacency List (Recommended)
 * const graph = new Map();
 * // or
 * const graph = {};
 * 
 * // Adjacency Matrix
 * const graph = Array(n).fill().map(() => Array(n).fill(0));
 * 
 * // Edge List
 * const edges = [{from: 0, to: 1, weight: 5}, ...];
 * 
 * Common Operations:
 * -----------------
 * // Add edge
 * if (!graph[u]) graph[u] = [];
 * graph[u].push(v);
 * 
 * // Check if edge exists
 * graph[u]?.includes(v);
 * 
 * // Get neighbors
 * const neighbors = graph[u] || [];
 * 
 * ========================================
 * TIME COMPLEXITY GUIDE
 * ========================================
 * 
 * Operation          | Adjacency List | Adjacency Matrix
 * -------------------|-----------------|------------------
 * Add Edge          | O(1)           | O(1)
 * Remove Edge       | O(V)           | O(1)
 * Check Edge        | O(V)           | O(1)
 * Get Neighbors     | O(1)           | O(V)
 * Space             | O(V + E)       | O(V²)
 * 
 * Algorithm         | Time Complexity | Space Complexity
 * -------------------|-----------------|------------------
 * BFS               | O(V + E)       | O(V)
 * DFS               | O(V + E)       | O(V)
 * Dijkstra          | O((V+E)logV)   | O(V)
 * Bellman-Ford      | O(VE)          | O(V)
 * Topological Sort  | O(V + E)       | O(V)
 * 
 * ========================================
 * INTERVIEW TIPS
 * ========================================
 * 
 * 1. RECOGNITION TIPS:
 *    - Look for relationships between entities
 *    - Check for "connected", "path", "reachable" keywords
 *    - Identify if it's a dependency/ordering problem
 *    - See if you need to find groups or components
 * 
 * 2. IMPLEMENTATION TIPS:
 *    - Choose right representation (list vs matrix)
 *    - Use appropriate traversal (BFS vs DFS)
 *    - Handle visited states properly
 *    - Consider edge cases (disconnected, cycles)
 *    - Use Set for visited nodes in JavaScript
 * 
 * 3. OPTIMIZATION TIPS:
 *    - Use adjacency list for sparse graphs
 *    - Use adjacency matrix for dense graphs
 *    - Consider bidirectional BFS for shortest path
 *    - Use union-find for connected components
 *    - Use Map/Set for better performance
 * 
 * 4. COMMON MISTAKES:
 *    - Not handling disconnected components
 *    - Forgetting to mark nodes as visited
 *    - Using wrong traversal for the problem
 *    - Not considering edge cases
 *    - Not handling undefined neighbors
 * 
 * ========================================
 * PRACTICE PROBLEMS BY DIFFICULTY
 * ========================================
 * 
 * EASY:
 * - Number of Islands
 * - Flood Fill
 * - Find the Town Judge
 * - Find Center of Star Graph
 * 
 * MEDIUM:
 * - Course Schedule
 * - Number of Provinces
 * - Network Delay Time
 * - All Paths from Source to Target
 * 
 * HARD:
 * - Word Ladder
 * - Cheapest Flights Within K Stops
 * - Redundant Connection
 * - Critical Connections
 * 
 * ========================================
 * QUICK REFERENCE
 * ========================================
 * 
 * When to use Graph:
 * - Entities have relationships/connections
 * - Need to find paths between points
 * - Elements have dependencies
 * - Need to group connected elements
 * - Finding shortest/longest paths
 * 
 * Which Algorithm to use:
 * - BFS: Shortest path (unweighted), level traversal
 * - DFS: Cycle detection, topological sort, components
 * - Dijkstra: Shortest path (weighted, positive)
 * - Bellman-Ford: Shortest path (negative weights)
 * - Union-Find: Connected components
 * 
 * Key Operations:
 * - addEdge(): Add connection between nodes
 * - getNeighbors(): Get connected nodes
 * - isConnected(): Check if path exists
 * - findShortestPath(): BFS/Dijkstra
 * - detectCycle(): DFS with states
 * 
 * Time Complexity:
 * - Traversal: O(V + E)
 * - Shortest Path: O((V+E)logV) or O(VE)
 * - Connected Components: O(V + E)
 * 
 * JavaScript-Specific Notes:
 * - Use Map/Set for better performance than objects
 * - Use Array methods (push, shift, pop) for queue/stack
 * - Handle undefined values with optional chaining (?.)
 * - Use Set for visited nodes to avoid duplicates
 * 
 * This guide should help you quickly identify graph problems and choose the right approach!
 */

/**
 * This is a reference guide for graph problems.
 * No implementation needed - just concepts and patterns.
 */

function main() {
    console.log("=== GRAPH DATA STRUCTURE GUIDE ===");
    console.log("Use this as a quick reference for graph problems.");
    console.log("Key patterns to recognize:");
    console.log("1. 'Connected components' problems");
    console.log("2. 'Shortest path' problems");
    console.log("3. 'Topological sort' problems");
    console.log("4. 'Cycle detection' problems");
    console.log("5. 'Minimum spanning tree' problems");
    console.log("6. 'Strongly connected components' problems");
    console.log();
    console.log("Choose algorithm based on problem:");
    console.log("- BFS: Shortest path (unweighted)");
    console.log("- DFS: Cycle detection, components");
    console.log("- Dijkstra: Shortest path (weighted)");
    console.log("- Union-Find: Connected components");
    console.log();
    console.log("JavaScript Implementation Tips:");
    console.log("- Use Map/Set for better performance");
    console.log("- Handle undefined values with optional chaining");
    console.log("- Use Set for visited nodes");
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        main,
        // Add any helper functions here if needed
    };
} else {
    // Run if executed directly
    main();
} 