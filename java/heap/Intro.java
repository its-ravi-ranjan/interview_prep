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
 * - Parent: (i-1)/2
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
 * Java PriorityQueue Usage:
 * -------------------------
 * 
 * // Min Heap (default)
 * PriorityQueue<Integer> minHeap = new PriorityQueue<>();
 * 
 * // Max Heap
 * PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
 * 
 * // Custom Comparator
 * PriorityQueue<Point> customHeap = new PriorityQueue<>((a, b) -> a.distance - b.distance);
 * 
 * Common Operations:
 * -----------------
 * heap.offer(element);    // Insert
 * heap.poll();           // Remove and return root
 * heap.peek();           // View root without removing
 * heap.size();           // Number of elements
 * heap.isEmpty();        // Check if empty
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
 * 
 * 3. OPTIMIZATION TIPS:
 *    - Use heap size K instead of all elements when possible
 *    - Consider two heaps for median problems
 *    - Use custom comparators for complex ordering
 *    - Think about early termination conditions
 * 
 * 4. COMMON MISTAKES:
 *    - Forgetting to specify heap type (min vs max)
 *    - Using wrong heap size (K vs n)
 *    - Not handling edge cases (empty heap)
 *    - Incorrect comparator logic
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
 * - offer(): Insert element
 * - poll(): Remove and return root
 * - peek(): View root
 * - size(): Number of elements
 * 
 * Time Complexity:
 * - Insert/Delete: O(log n)
 * - Peek: O(1)
 * - Build: O(n)
 * 
 * This guide should help you quickly identify heap problems and choose the right approach!
 */

public class Intro {
    
    /**
     * This is a reference guide for heap problems.
     * No implementation needed - just concepts and patterns.
     */
    
    public static void main(String[] args) {
        System.out.println("=== HEAP DATA STRUCTURE GUIDE ===");
        System.out.println("Use this as a quick reference for heap problems.");
        System.out.println("Key patterns to recognize:");
        System.out.println("1. 'Top K' problems");
        System.out.println("2. 'Kth largest/smallest' problems");
        System.out.println("3. 'Stream' or 'real-time' problems");
        System.out.println("4. 'Scheduling with priority' problems");
        System.out.println("5. 'Frequent elements' problems");
        System.out.println("6. 'Merge sorted arrays/lists' problems");
        System.out.println();
        System.out.println("Choose heap type based on problem:");
        System.out.println("- Min Heap: K smallest, scheduling");
        System.out.println("- Max Heap: K largest, frequency");
        System.out.println("- Two Heaps: Median problems");
    }
} 