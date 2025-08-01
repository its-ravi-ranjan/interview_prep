/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation and heap learning guide
 * 
 * ========================================
 * HEAP DATA STRUCTURE - COMPLETE GUIDE
 * ========================================
 * 
 * What is a Heap?
 * ----------------
 * A heap is a complete binary tree (or array) that satisfies the heap property:
 * 
 * Min Heap: Parent ≤ children → smallest element at root
 * Max Heap: Parent ≥ children → largest element at root
 * 
 * Visual Representation:
 * 
 * Min Heap:                    Max Heap:
 *       1                          9
 *      / \                       / \
 *     3   5                     7   8
 *    / \ / \                   / \ / \
 *   4  6 7  8                 5  6 3  4
 * 
 * Array Representation:
 * Min Heap: [1, 3, 5, 4, 6, 7, 8]
 * Max Heap: [9, 7, 8, 5, 6, 3, 4]
 * 
 * Key Properties:
 * --------------
 * 1. Complete Binary Tree: All levels filled except possibly the last
 * 2. Heap Property: Parent-child relationship maintained
 * 3. Root Access: O(1) access to min/max element
 * 4. Insert/Delete: O(log n) operations
 * 5. Build Heap: O(n) from array
 * 
 * Array Indexing:
 * --------------
 * For element at index i:
 * - Left Child: 2*i + 1
 * - Right Child: 2*i + 2
 * - Parent: Math.floor((i-1)/2)
 * 
 * Basic Operations:
 * ----------------
 * 1. Insert: Add to end, bubble up
 * 2. Delete: Replace root with last, bubble down
 * 3. Peek: Return root element
 * 4. Heapify: Convert array to heap
 * 
 * ========================================
 * WHEN TO RECOGNIZE HEAP PROBLEMS
 * ========================================
 * 
 * 🔹 4. Ninja Techniques to Recognize Heap Problems
 * 
 * ✅ "Top K…" — almost always heap
 *    Examples: Top K frequent elements, Top K largest numbers
 *    Pattern: Need to maintain K elements with specific property
 * 
 * ✅ "Kth largest/smallest" — use heap of size K
 *    Examples: Kth largest element in array, Kth smallest in stream
 *    Pattern: Need to track K elements, heap size = K
 * 
 * ✅ "Stream" or "real-time median" — use two heaps
 *    Examples: Find median of data stream, sliding window median
 *    Pattern: Need to track middle element(s) in dynamic data
 * 
 * ✅ "Scheduling with priority" — custom PriorityQueue
 *    Examples: Task scheduler, meeting rooms, CPU scheduling
 *    Pattern: Elements have priorities, need to process by priority
 * 
 * ✅ "Frequent elements" — count → put in heap
 *    Examples: Top K frequent words, most common elements
 *    Pattern: Count frequencies, then heap for top K
 * 
 * ✅ "Merge sorted arrays/lists" — min heap of head elements
 *    Examples: Merge K sorted lists, merge K sorted arrays
 *    Pattern: Multiple sorted sources, need to merge efficiently
 * 
 * ========================================
 * MIN HEAP vs MAX HEAP USE CASES
 * ========================================
 * 
 * Use Case                    | Use Min Heap | Use Max Heap
 * ----------------------------|--------------|--------------
 * Find K smallest            | ✅           | ❌
 * Find K largest             | ❌           | ✅
 * Running Median             | ✅ (high)    | ✅ (low)
 * Task scheduling            | ✅           | ❌
 * Custom rules (freq, age)   | ✅/custom    | ✅/custom
 * 
 * Detailed Use Cases:
 * -------------------
 * 
 * 1. FIND K SMALLEST ELEMENTS
 *    - Use: Min Heap of size K
 *    - Logic: Keep K smallest elements, replace if smaller found
 *    - Example: [3,1,5,2,4], K=3 → [1,2,3]
 * 
 * 2. FIND K LARGEST ELEMENTS
 *    - Use: Max Heap of size K
 *    - Logic: Keep K largest elements, replace if larger found
 *    - Example: [3,1,5,2,4], K=3 → [5,4,3]
 * 
 * 3. RUNNING MEDIAN
 *    - Use: Two heaps (min + max)
 *    - Logic: Min heap for upper half, max heap for lower half
 *    - Example: Stream [1,2,3,4] → median = 2.5
 * 
 * 4. TASK SCHEDULING
 *    - Use: Min Heap (by end time)
 *    - Logic: Process tasks with earliest deadline first
 *    - Example: Meeting rooms, CPU scheduling
 * 
 * 5. FREQUENCY-BASED PROBLEMS
 *    - Use: Max Heap (by frequency)
 *    - Logic: Count frequencies, heap by count
 *    - Example: Top K frequent words
 * 
 * ========================================
 * COMMON PROBLEM PATTERNS
 * ========================================
 * 
 * Pattern 1: "Top K" Problems
 * ----------------------------
 * Keywords: "top", "most", "frequent", "largest", "smallest"
 * Solution: Maintain heap of size K
 * 
 * Pattern 2: "Stream" Problems
 * ----------------------------
 * Keywords: "stream", "real-time", "online", "continuous"
 * Solution: Two heaps for median, single heap for min/max
 * 
 * Pattern 3: "Scheduling" Problems
 * --------------------------------
 * Keywords: "schedule", "meeting", "room", "task", "priority"
 * Solution: Priority queue based on time/priority
 * 
 * Pattern 4: "Merge" Problems
 * ----------------------------
 * Keywords: "merge", "combine", "multiple sorted"
 * Solution: Min heap of head elements from each source
 * 
 * Pattern 5: "Kth Element" Problems
 * ---------------------------------
 * Keywords: "Kth", "nth", "rank", "order"
 * Solution: Heap of size K or quick select
 * 
 * ========================================
 * IMPLEMENTATION STRATEGIES
 * ========================================
 * 
 * JavaScript Heap Implementation Options:
 * ---------------------------------------
 * 
 * Option 1: Array-based with sort (Simple but inefficient)
 * const minHeap = [];
 * minHeap.push(value);
 * minHeap.sort((a, b) => a - b); // O(n log n) per operation
 * 
 * Option 2: Custom MinHeap Class (Recommended)
 * class MinHeap {
 *   constructor() { this.heap = []; }
 *   push(value) { // bubble up logic }
 *   pop() { // bubble down logic }
 *   peek() { return this.heap[0]; }
 * }
 * 
 * Option 3: Using Priority Queue Library
 * // If using a library like 'priority-queue'
 * const PriorityQueue = require('priority-queue');
 * const pq = new PriorityQueue({comparator: (a, b) => a - b});
 * 
 * Common Operations:
 * -----------------
 * heap.push(element);    // Insert
 * heap.pop();           // Remove and return root
 * heap[0];              // View root without removing
 * heap.length;          // Number of elements
 * heap.length === 0;    // Check if empty
 * 
 * ========================================
 * TIME COMPLEXITY GUIDE
 * ========================================
 * 
 * Operation          | Time Complexity | Space Complexity
 * -------------------|-----------------|------------------
 * Insert            | O(log n)        | O(1)
 * Delete            | O(log n)        | O(1)
 * Peek              | O(1)            | O(1)
 * Build Heap        | O(n)            | O(1)
 * Heap Sort         | O(n log n)      | O(1)
 * 
 * Note: Array-based with sort is O(n log n) per operation
 * 
 * ========================================
 * INTERVIEW TIPS
 * ========================================
 * 
 * 1. RECOGNITION TIPS:
 *    - Look for "K" in problem statement
 *    - Check for "top", "most", "frequent" keywords
 *    - Identify if it's a stream/online problem
 *    - See if multiple sorted sources need merging
 * 
 * 2. IMPLEMENTATION TIPS:
 *    - Always specify heap type (min/max)
 *    - Use appropriate comparator for custom objects
 *    - Consider heap size (K vs all elements)
 *    - Think about when to insert/remove
 *    - Prefer custom heap class over array.sort()
 * 
 * 3. OPTIMIZATION TIPS:
 *    - Use heap size K instead of all elements when possible
 *    - Consider two heaps for median problems
 *    - Use custom comparators for complex ordering
 *    - Think about early termination conditions
 *    - Avoid array.sort() in loops (O(n log n) each time)
 * 
 * 4. COMMON MISTAKES:
 *    - Forgetting to specify heap type (min vs max)
 *    - Using wrong heap size (K vs n)
 *    - Not handling edge cases (empty heap)
 *    - Incorrect comparator logic
 *    - Using array.sort() repeatedly instead of proper heap
 * 
 * ========================================
 * PRACTICE PROBLEMS BY DIFFICULTY
 * ========================================
 * 
 * EASY:
 * - Kth Largest Element in Array
 * - Top K Frequent Elements
 * - Meeting Rooms II
 * 
 * MEDIUM:
 * - Merge K Sorted Lists
 * - Find Median from Data Stream
 * - Task Scheduler
 * 
 * HARD:
 * - Sliding Window Median
 * - Merge K Sorted Arrays
 * - Design Twitter (feed system)
 * 
 * ========================================
 * QUICK REFERENCE
 * ========================================
 * 
 * When to use Heap:
 * - Need to track min/max elements
 * - Processing elements by priority
 * - Finding K largest/smallest
 * - Real-time median calculation
 * - Merging multiple sorted sources
 * 
 * Which Heap to use:
 * - Min Heap: K smallest, scheduling by end time
 * - Max Heap: K largest, frequency-based problems
 * - Two Heaps: Median, balanced partitioning
 * 
 * Key Operations:
 * - push(): Insert element
 * - pop(): Remove and return root
 * - peek(): View root (heap[0])
 * - length: Number of elements
 * 
 * Time Complexity:
 * - Insert/Delete: O(log n)
 * - Peek: O(1)
 * - Build: O(n)
 * 
 * JavaScript-Specific Notes:
 * - No built-in PriorityQueue (need custom implementation)
 * - Array.sort() is O(n log n) - avoid in loops
 * - Use custom heap class for better performance
 * - Consider using libraries for production code
 * 
 * This guide should help you quickly identify heap problems and choose the right approach!
 */

/**
 * This is a reference guide for heap problems.
 * No implementation needed - just concepts and patterns.
 */

function main() {
    console.log("=== HEAP DATA STRUCTURE GUIDE ===");
    console.log("Use this as a quick reference for heap problems.");
    console.log("Key patterns to recognize:");
    console.log("1. 'Top K' problems");
    console.log("2. 'Kth largest/smallest' problems");
    console.log("3. 'Stream' or 'real-time' problems");
    console.log("4. 'Scheduling with priority' problems");
    console.log("5. 'Frequent elements' problems");
    console.log("6. 'Merge sorted arrays/lists' problems");
    console.log();
    console.log("Choose heap type based on problem:");
    console.log("- Min Heap: K smallest, scheduling");
    console.log("- Max Heap: K largest, frequency");
    console.log("- Two Heaps: Median problems");
    console.log();
    console.log("JavaScript Implementation Tips:");
    console.log("- Use custom MinHeap class for better performance");
    console.log("- Avoid array.sort() in loops");
    console.log("- Consider heap size (K vs all elements)");
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