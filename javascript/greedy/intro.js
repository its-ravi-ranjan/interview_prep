/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation and greedy algorithm learning guide
 * 
 * ========================================
 * GREEDY ALGORITHMS - COMPLETE GUIDE
 * ========================================
 * 
 * What is a Greedy Algorithm?
 * -----------------------------
 * A greedy algorithm makes locally optimal choices at each step to find a global optimum.
 * It never looks back or changes previous decisions.
 * 
 * Key Principles:
 * ---------------
 * 1. Greedy Choice Property: Locally optimal choice leads to globally optimal solution
 * 2. Optimal Substructure: Optimal solution contains optimal sub-solutions
 * 3. No Backtracking: Once a choice is made, it's never reconsidered
 * 4. Simple and Fast: Usually O(n log n) or O(n) time complexity
 * 
 * Visual Example:
 * 
 * Activity Selection: Choose maximum non-overlapping activities
 * 
 * Activities: [1,4], [2,6], [5,7], [3,8], [5,9]
 * Sorted by end time: [1,4], [2,6], [5,7], [3,8], [5,9]
 * Greedy choice: Always pick activity with earliest end time
 * Result: [1,4], [5,7] - 2 activities
 * 
 * ========================================
 * WHEN TO RECOGNIZE GREEDY PROBLEMS
 * ========================================
 * 
 * 🔹 5. Ninja Techniques to Recognize Greedy Problems
 * 
 * ✅ "Activity selection" — pick optimal activities
 *    Examples: Meeting rooms, job scheduling, task assignment
 *    Pattern: Need to select maximum non-overlapping activities
 * 
 * ✅ "Fractional knapsack" — take items partially
 *    Examples: Loading truck, resource allocation, profit maximization
 *    Pattern: Can take fractional amounts of items
 * 
 * ✅ "Huffman coding" — build optimal prefix codes
 *    Examples: Data compression, file encoding, character frequency
 *    Pattern: Need to build optimal binary tree for encoding
 * 
 * ✅ "Minimum spanning tree" — connect all nodes
 *    Examples: Network wiring, road construction, cluster analysis
 *    Pattern: Need to connect all nodes with minimum cost
 * 
 * ✅ "Coin change" — minimum coins for amount
 *    Examples: Vending machine, cash register, payment systems
 *    Pattern: Need minimum number of coins for given amount
 * 
 * ✅ "Interval scheduling" — schedule events optimally
 *    Examples: Class scheduling, meeting rooms, resource booking
 *    Pattern: Need to schedule maximum events without conflicts
 * 
 * ========================================
 * GREEDY ALGORITHM TYPES
 * ========================================
 * 
 * 1. SELECTION PROBLEMS
 * ----------------------
 * Use: Choose optimal subset from given options
 * Strategy: Sort and select based on criteria
 * Time: O(n log n) - sorting
 * Space: O(1) - in-place
 * 
 * Examples:
 * - Activity Selection: Sort by end time, pick earliest ending
 * - Job Scheduling: Sort by deadline, schedule earliest deadline
 * - Meeting Rooms: Sort by start time, assign to available room
 * 
 * 2. OPTIMIZATION PROBLEMS
 * -------------------------
 * Use: Find optimal value (min/max) with constraints
 * Strategy: Make locally optimal choice at each step
 * Time: O(n log n) - usually involves sorting
 * Space: O(1) - constant extra space
 * 
 * Examples:
 * - Fractional Knapsack: Sort by value/weight ratio
 * - Minimum Coins: Use largest denomination first
 * - Maximum Profit: Sort by profit, take highest
 * 
 * 3. CONSTRUCTION PROBLEMS
 * -------------------------
 * Use: Build optimal structure step by step
 * Strategy: Add elements in optimal order
 * Time: O(n log n) - building and maintaining structure
 * Space: O(n) - store the structure
 * 
 * Examples:
 * - Huffman Coding: Build tree from frequency
 * - Minimum Spanning Tree: Add edges in order of weight
 * - Optimal Merge: Merge smallest files first
 * 
 * ========================================
 * COMMON PROBLEM PATTERNS
 * ========================================
 * 
 * Pattern 1: "Activity Selection"
 * --------------------------------
 * Keywords: "activities", "meetings", "events", "non-overlapping"
 * Solution: Sort by end time, pick earliest ending
 * 
 * Pattern 2: "Fractional Knapsack"
 * ----------------------------------
 * Keywords: "fractional", "partial", "ratio", "value per unit"
 * Solution: Sort by value/weight ratio, take highest first
 * 
 * Pattern 3: "Coin Change"
 * -------------------------
 * Keywords: "minimum coins", "change", "denomination"
 * Solution: Use largest denomination first
 * 
 * Pattern 4: "Interval Scheduling"
 * ---------------------------------
 * Keywords: "intervals", "schedule", "conflicts", "overlap"
 * Solution: Sort by end time, select non-overlapping
 * 
 * Pattern 5: "Optimal Merge"
 * ---------------------------
 * Keywords: "merge", "combine", "cost", "minimum cost"
 * Solution: Always merge smallest elements first
 * 
 * Pattern 6: "Resource Allocation"
 * ---------------------------------
 * Keywords: "allocate", "assign", "distribute", "efficient"
 * Solution: Sort by efficiency, allocate to best option
 * 
 * ========================================
 * IMPLEMENTATION STRATEGIES
 * ========================================
 * 
 * JavaScript Greedy Implementation:
 * ----------------------------------
 * 
 * // Activity Selection
 * function maxActivities(activities) {
 *     // Sort by end time
 *     activities.sort((a, b) => a[1] - b[1]);
 *     
 *     let count = 0;
 *     let lastEnd = 0;
 *     
 *     for (const activity of activities) {
 *         if (activity[0] >= lastEnd) {
 *             count++;
 *             lastEnd = activity[1];
 *         }
 *     }
 *     return count;
 * }
 * 
 * // Fractional Knapsack
 * function fractionalKnapsack(weights, values, capacity) {
 *     const n = weights.length;
 *     const items = [];
 *     
 *     for (let i = 0; i < n; i++) {
 *         items.push({
 *             index: i,
 *             ratio: values[i] / weights[i],
 *             weight: weights[i]
 *         });
 *     }
 *     
 *     // Sort by value/weight ratio (descending)
 *     items.sort((a, b) => b.ratio - a.ratio);
 *     
 *     let totalValue = 0;
 *     let remainingCapacity = capacity;
 *     
 *     for (const item of items) {
 *         if (remainingCapacity >= item.weight) {
 *             totalValue += values[item.index];
 *             remainingCapacity -= item.weight;
 *         } else {
 *             totalValue += item.ratio * remainingCapacity;
 *             break;
 *         }
 *     }
 *     return totalValue;
 * }
 * 
 * // Minimum Coins
 * function minCoins(coins, amount) {
 *     coins.sort((a, b) => a - b); // Sort in ascending order
 *     let count = 0;
 *     
 *     for (let i = coins.length - 1; i >= 0; i--) {
 *         while (amount >= coins[i]) {
 *             amount -= coins[i];
 *             count++;
 *         }
 *     }
 *     return amount === 0 ? count : -1;
 * }
 * 
 * ========================================
 * TIME COMPLEXITY GUIDE
 * ========================================
 * 
 * Problem Type        | Time Complexity | Space Complexity
 * --------------------|-----------------|------------------
 * Activity Selection  | O(n log n)     | O(1)
 * Fractional Knapsack | O(n log n)     | O(n)
 * Coin Change         | O(n log n)     | O(1)
 * Interval Scheduling | O(n log n)     | O(1)
 * Huffman Coding      | O(n log n)     | O(n)
 * MST (Kruskal)       | O(E log E)     | O(V)
 * 
 * Optimization        | Time            | Space
 * --------------------|-----------------|------------------
 * In-place sorting    | O(n log n)      | O(1)
 * Heap-based          | O(n log n)      | O(n)
 * Linear scan         | O(n)            | O(1)
 * 
 * ========================================
 * INTERVIEW TIPS
 * ========================================
 * 
 * 1. RECOGNITION TIPS:
 *    - Look for "maximum", "minimum", "optimal" keywords
 *    - Check if problem involves selection or optimization
 *    - Identify if local optimal choice leads to global optimal
 *    - See if problem can be solved by sorting and selecting
 * 
 * 2. IMPLEMENTATION TIPS:
 *    - Start by sorting the input
 *    - Make greedy choice at each step
 *    - Don't look back or change previous decisions
 *    - Consider edge cases and constraints
 *    - Use Array.sort() with custom comparator
 * 
 * 3. OPTIMIZATION TIPS:
 *    - Use in-place sorting when possible
 *    - Consider using heaps for dynamic selection
 *    - Think about early termination conditions
 *    - Optimize space usage
 *    - Use for...of loops for cleaner code
 * 
 * 4. COMMON MISTAKES:
 *    - Not sorting input properly
 *    - Wrong sorting criteria
 *    - Not handling edge cases
 *    - Forgetting to update state after choice
 *    - Not considering all constraints
 *    - Wrong sort order (ascending vs descending)
 * 
 * ========================================
 * PRACTICE PROBLEMS BY DIFFICULTY
 * ========================================
 * 
 * EASY:
 * - Assign Cookies
 * - Lemonade Change
 * - Best Time to Buy/Sell Stock
 * - Can Place Flowers
 * 
 * MEDIUM:
 * - Jump Game
 * - Gas Station
 * - Task Scheduler
 * - Partition Labels
 * 
 * HARD:
 * - Candy
 * - Remove K Digits
 * - Create Maximum Number
 * - Minimum Number of Arrows
 * 
 * ========================================
 * QUICK REFERENCE
 * ========================================
 * 
 * When to use Greedy:
 * - Problem has optimal substructure
 * - Greedy choice property holds
 * - Need to make locally optimal choices
 * - Problem involves selection or optimization
 * - Can be solved by sorting and selecting
 * 
 * Which Strategy to use:
 * - Selection: Sort and pick based on criteria
 * - Optimization: Make locally optimal choice
 * - Construction: Build step by step optimally
 * 
 * Key Steps:
 * 1. Identify the greedy choice property
 * 2. Sort input based on criteria
 * 3. Make greedy choice at each step
 * 4. Update state and continue
 * 5. Handle edge cases
 * 
 * Time Complexity:
 * - Usually O(n log n) due to sorting
 * - Sometimes O(n) for linear scan
 * - Space usually O(1) or O(n)
 * 
 * JavaScript-Specific Notes:
 * - Use Array.sort() with custom comparator
 * - Use for...of loops for cleaner iteration
 * - Use object destructuring for cleaner code
 * - Handle edge cases with proper checks
 * - Use const/let instead of var
 * - Consider using Map/Set for tracking
 * 
 * This guide should help you quickly identify greedy problems and choose the right approach!
 */

/**
 * This is a reference guide for greedy algorithm problems.
 * No implementation needed - just concepts and patterns.
 */

function main() {
    console.log("=== GREEDY ALGORITHMS GUIDE ===");
    console.log("Use this as a quick reference for greedy problems.");
    console.log("Key patterns to recognize:");
    console.log("1. 'Activity selection' problems");
    console.log("2. 'Fractional knapsack' problems");
    console.log("3. 'Huffman coding' problems");
    console.log("4. 'Minimum spanning tree' problems");
    console.log("5. 'Coin change' problems");
    console.log("6. 'Interval scheduling' problems");
    console.log();
    console.log("Choose strategy based on problem:");
    console.log("- Selection: Sort and pick based on criteria");
    console.log("- Optimization: Make locally optimal choice");
    console.log("- Construction: Build step by step optimally");
    console.log();
    console.log("JavaScript Implementation Tips:");
    console.log("- Use Array.sort() with custom comparator");
    console.log("- Use for...of loops for cleaner iteration");
    console.log("- Handle edge cases properly");
    console.log("- Use object destructuring for cleaner code");
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