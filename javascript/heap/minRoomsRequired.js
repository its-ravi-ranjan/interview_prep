/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation and algorithm practice
 * 
 * Minimum Rooms Required for Surgery Scheduling (asked in amazon)
 * 
 * Problem: Given a list of surgeries, each with a start time and end time (within the same day),
 * find the minimum number of surgery rooms required so that no two overlapping surgeries 
 * share the same room.
 * 
 * Example:
 * Input: [[1,4], [2,5], [7,9], [3,6]]
 * Output: 3
 * 
 * Explanation:
 * Surgery 1: [1,4] - Room 1
 * Surgery 2: [2,5] - Room 2 (overlaps with Surgery 1)
 * Surgery 3: [7,9] - Room 1 (can reuse, no overlap)
 * Surgery 4: [3,6] - Room 3 (overlaps with both Surgery 1 and 2)
 * 
 * Approach 1: Min-Heap (Optimal)
 * 1. Sort intervals by start time
 * 2. Use min-heap to track end times of ongoing surgeries
 * 3. For each surgery:
 *    - If a room is free (end time <= current start time), reuse it
 *    - Otherwise, allocate a new room
 * 4. Return heap size (number of rooms used)
 * 
 * Time Complexity: O(n log n) - sorting + heap operations
 * Space Complexity: O(n) - heap storage
 * 
 * Approach 2: Chronological Ordering (Alternative)
 * 1. Create separate arrays for start and end times
 * 2. Sort both arrays
 * 3. Use two pointers to track ongoing surgeries
 * 4. Count maximum concurrent surgeries
 * 
 * Time Complexity: O(n log n) - sorting
 * Space Complexity: O(n) - separate arrays
 */

/**
 * Approach 1: Min-Heap Solution (Optimal)
 * 
 * Algorithm:
 * 1. Sort intervals by start time to process in chronological order
 * 2. Use min-heap to track end times of currently occupied rooms
 * 3. For each surgery:
 *    - Check if any room is free (end time <= current start time)
 *    - If yes, reuse that room by removing it from heap
 *    - Add current surgery's end time to heap
 * 4. Heap size represents minimum rooms needed
 * 
 * Why this works:
 * - We always try to reuse the room that becomes free earliest
 * - Min-heap ensures we check the earliest ending surgery first
 * - This greedy approach gives optimal solution
 */
function minRoomsRequired(intervals) {
    if (!intervals || intervals.length === 0) return 0;
    
    // Step 1: Sort intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    // Step 2: Min-heap to track end times of ongoing surgeries
    const minHeap = [];
    
    for (const interval of intervals) {
        const [startTime, endTime] = interval;
        
        // If a room is free (end time <= current start time), reuse it
        if (minHeap.length > 0 && startTime >= minHeap[0]) {
            minHeap.shift(); // Remove the finished surgery, reuse room
        }
        
        // Add current surgery's end time to heap
        minHeap.push(endTime);
        minHeap.sort((a, b) => a - b); // Keep heap sorted (min-heap)
    }
    
    // Heap size = number of rooms currently in use
    return minHeap.length;
}

/**
 * Approach 1b: Min-Heap with Priority Queue (More Efficient)
 * 
 * Using a proper min-heap implementation for better performance
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    push(value) {
        this.heap.push(value);
        this._bubbleUp();
    }
    
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._bubbleDown();
        return min;
    }
    
    peek() {
        return this.heap[0];
    }
    
    size() {
        return this.heap.length;
    }
    
    _bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) break;
            
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }
    
    _bubbleDown() {
        let index = 0;
        while (true) {
            let smallest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            
            if (leftChild < this.heap.length && this.heap[leftChild] < this.heap[smallest]) {
                smallest = leftChild;
            }
            
            if (rightChild < this.heap.length && this.heap[rightChild] < this.heap[smallest]) {
                smallest = rightChild;
            }
            
            if (smallest === index) break;
            
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

function minRoomsRequiredWithHeap(intervals) {
    if (!intervals || intervals.length === 0) return 0;
    
    // Step 1: Sort intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    // Step 2: Min-heap to track end times of ongoing surgeries
    const minHeap = new MinHeap();
    
    for (const interval of intervals) {
        const [startTime, endTime] = interval;
        
        // If a room is free (end time <= current start time), reuse it
        if (minHeap.size() > 0 && startTime >= minHeap.peek()) {
            minHeap.pop(); // Remove the finished surgery, reuse room
        }
        
        // Add current surgery's end time to heap
        minHeap.push(endTime);
    }
    
    // Heap size = number of rooms currently in use
    return minHeap.size();
}

/**
 * Approach 2: Chronological Ordering (Alternative Solution)
 * 
 * Algorithm:
 * 1. Create separate arrays for start and end times
 * 2. Sort both arrays
 * 3. Use two pointers to track ongoing surgeries
 * 4. Count maximum concurrent surgeries
 * 
 * This approach is more intuitive but slightly more complex
 */
function minRoomsRequiredChronological(intervals) {
    if (!intervals || intervals.length === 0) return 0;
    
    const n = intervals.length;
    const startTimes = intervals.map(interval => interval[0]);
    const endTimes = intervals.map(interval => interval[1]);
    
    // Sort both arrays
    startTimes.sort((a, b) => a - b);
    endTimes.sort((a, b) => a - b);
    
    let rooms = 0;
    let maxRooms = 0;
    let startPtr = 0;
    let endPtr = 0;
    
    while (startPtr < n) {
        // If current surgery starts before any ongoing surgery ends
        if (startTimes[startPtr] < endTimes[endPtr]) {
            rooms++; // Need a new room
            startPtr++;
        } else {
            rooms--; // A room becomes free
            endPtr++;
        }
        maxRooms = Math.max(maxRooms, rooms);
    }
    
    return maxRooms;
}

/**
 * Approach 3: Brute Force (For understanding)
 * 
 * Check all possible room assignments - not efficient but helps understand the problem
 */
function minRoomsRequiredBruteForce(intervals) {
    if (!intervals || intervals.length === 0) return 0;
    
    // Try different numbers of rooms
    for (let rooms = 1; rooms <= intervals.length; rooms++) {
        if (canScheduleWithRooms(intervals, rooms)) {
            return rooms;
        }
    }
    
    return intervals.length;
}

function canScheduleWithRooms(intervals, rooms) {
    // This is a simplified version - in practice, this would be much more complex
    // and would require backtracking or other advanced techniques
    return false; // Placeholder
}

/**
 * Helper method to visualize the scheduling
 */
function visualizeScheduling(intervals) {
    console.log("Surgery Schedule Visualization:");
    console.log("Time: 0 1 2 3 4 5 6 7 8 9");
    console.log("------------------------");
    
    for (let i = 0; i < intervals.length; i++) {
        let timeline = "S" + (i+1) + ":   ";
        for (let time = 0; time <= 9; time++) {
            if (time >= intervals[i][0] && time < intervals[i][1]) {
                timeline += "█ ";
            } else {
                timeline += "  ";
            }
        }
        console.log(timeline + "[" + intervals[i][0] + "," + intervals[i][1] + "]");
    }
    console.log();
}

/**
 * Test cases
 */
function runTests() {
    console.log("=== Minimum Rooms Required Tests ===");
    
    // Test Case 1: Basic overlapping
    const test1 = [[1,4], [2,5], [7,9], [3,6]];
    console.log("Test 1:", JSON.stringify(test1));
    visualizeScheduling(test1);
    console.log("Min rooms (Heap):", minRoomsRequired(test1));
    console.log("Min rooms (Heap Class):", minRoomsRequiredWithHeap(test1));
    console.log("Min rooms (Chronological):", minRoomsRequiredChronological(test1));
    console.log("Expected: 3\n");
    
    // Test Case 2: No overlapping
    const test2 = [[1,2], [3,4], [5,6], [7,8]];
    console.log("Test 2:", JSON.stringify(test2));
    console.log("Min rooms (Heap):", minRoomsRequired(test2));
    console.log("Min rooms (Heap Class):", minRoomsRequiredWithHeap(test2));
    console.log("Min rooms (Chronological):", minRoomsRequiredChronological(test2));
    console.log("Expected: 1\n");
    
    // Test Case 3: All overlapping
    const test3 = [[1,5], [2,6], [3,7], [4,8]];
    console.log("Test 3:", JSON.stringify(test3));
    console.log("Min rooms (Heap):", minRoomsRequired(test3));
    console.log("Min rooms (Heap Class):", minRoomsRequiredWithHeap(test3));
    console.log("Min rooms (Chronological):", minRoomsRequiredChronological(test3));
    console.log("Expected: 4\n");
    
    // Test Case 4: Edge cases
    const test4 = [[1,1]]; // Same start and end
    console.log("Test 4:", JSON.stringify(test4));
    console.log("Min rooms (Heap):", minRoomsRequired(test4));
    console.log("Min rooms (Heap Class):", minRoomsRequiredWithHeap(test4));
    console.log("Min rooms (Chronological):", minRoomsRequiredChronological(test4));
    console.log("Expected: 1\n");
    
    // Test Case 5: Complex overlapping
    const test5 = [[0,30], [5,10], [15,20], [25,35], [30,40]];
    console.log("Test 5:", JSON.stringify(test5));
    console.log("Min rooms (Heap):", minRoomsRequired(test5));
    console.log("Min rooms (Heap Class):", minRoomsRequiredWithHeap(test5));
    console.log("Min rooms (Chronological):", minRoomsRequiredChronological(test5));
    console.log("Expected: 2\n");
}

/**
 * Performance comparison
 */
function runPerformanceComparison() {
    console.log("=== Performance Comparison ===");
    const largeTest = generateLargeTest(1000);
    
    // Test simple heap approach
    const startTime1 = performance.now();
    const result1 = minRoomsRequired(largeTest);
    const heapTime = performance.now() - startTime1;
    
    // Test proper heap class approach
    const startTime2 = performance.now();
    const result2 = minRoomsRequiredWithHeap(largeTest);
    const heapClassTime = performance.now() - startTime2;
    
    // Test chronological approach
    const startTime3 = performance.now();
    const result3 = minRoomsRequiredChronological(largeTest);
    const chronoTime = performance.now() - startTime3;
    
    console.log("Large test (1000 surgeries):");
    console.log("Simple Heap approach:", result1, "rooms,", heapTime.toFixed(2), "ms");
    console.log("Heap Class approach:", result2, "rooms,", heapClassTime.toFixed(2), "ms");
    console.log("Chronological approach:", result3, "rooms,", chronoTime.toFixed(2), "ms");
    console.log("All results match:", result1 === result2 && result2 === result3);
}

/**
 * Generate large test data
 */
function generateLargeTest(size) {
    const test = [];
    for (let i = 0; i < size; i++) {
        const start = Math.floor(Math.random() * 1000);
        const duration = Math.floor(Math.random() * 100) + 1;
        test.push([start, start + duration]);
    }
    return test;
}

/**
 * Main execution
 */
function main() {
    runTests();
    runPerformanceComparison();
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        minRoomsRequired,
        minRoomsRequiredWithHeap,
        minRoomsRequiredChronological,
        minRoomsRequiredBruteForce,
        MinHeap,
        visualizeScheduling,
        runTests,
        runPerformanceComparison
    };
} else {
    // Run tests if executed directly
    main();
}

/**
 * Key Insights:
 * 
 * 1. **Greedy Approach**: Always try to reuse the room that becomes free earliest
 * 2. **Min-Heap**: Perfect data structure to track earliest ending surgeries
 * 3. **Sorting**: Essential to process surgeries in chronological order
 * 4. **Optimality**: This greedy approach gives the optimal solution
 * 
 * Common Interview Questions:
 * 
 * Q: Why does the greedy approach work?
 * A: If we don't reuse the earliest available room, we might need more rooms later.
 * 
 * Q: What if surgeries can span multiple days?
 * A: Need to handle date boundaries and potentially use different data structures.
 * 
 * Q: How to handle room preferences or constraints?
 * A: Would need to modify the algorithm to consider room-specific requirements.
 * 
 * Q: What's the time complexity and why?
 * A: O(n log n) - sorting takes O(n log n) + each heap operation is O(log n) for n surgeries.
 * 
 * JavaScript-Specific Notes:
 * 
 * 1. **Array.sort()**: JavaScript's sort is stable and efficient
 * 2. **MinHeap Implementation**: Custom class for better performance than array-based approach
 * 3. **Performance.now()**: More precise timing than Date.now()
 * 4. **Module Exports**: Supports both Node.js and browser environments
 */ 