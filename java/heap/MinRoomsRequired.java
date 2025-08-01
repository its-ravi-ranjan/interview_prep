/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation and algorithm practice
 * 
 * Minimum Rooms Required for Surgery Scheduling
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

import java.util.*;

public class MinRoomsRequired {
    
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
    public static int minRoomsRequired(int[][] intervals) {
        if (intervals == null || intervals.length == 0) return 0;
        
        // Step 1: Sort intervals by start time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        
        // Step 2: Min-heap to track end times of ongoing surgeries
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        
        for (int[] interval : intervals) {
            int startTime = interval[0];
            int endTime = interval[1];
            
            // If a room is free (end time <= current start time), reuse it
            if (!minHeap.isEmpty() && startTime >= minHeap.peek()) {
                minHeap.poll(); // Remove the finished surgery, reuse room
            }
            
            // Add current surgery's end time to heap
            minHeap.offer(endTime);
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
    public static int minRoomsRequiredChronological(int[][] intervals) {
        if (intervals == null || intervals.length == 0) return 0;
        
        int n = intervals.length;
        int[] startTimes = new int[n];
        int[] endTimes = new int[n];
        
        // Separate start and end times
        for (int i = 0; i < n; i++) {
            startTimes[i] = intervals[i][0];
            endTimes[i] = intervals[i][1];
        }
        
        // Sort both arrays
        Arrays.sort(startTimes);
        Arrays.sort(endTimes);
        
        int rooms = 0;
        int maxRooms = 0;
        int startPtr = 0;
        int endPtr = 0;
        
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
    public static int minRoomsRequiredBruteForce(int[][] intervals) {
        if (intervals == null || intervals.length == 0) return 0;
        
        // Try different numbers of rooms
        for (int rooms = 1; rooms <= intervals.length; rooms++) {
            if (canScheduleWithRooms(intervals, rooms)) {
                return rooms;
            }
        }
        
        return intervals.length;
    }
    
    private static boolean canScheduleWithRooms(int[][] intervals, int rooms) {
        // This is a simplified version - in practice, this would be much more complex
        // and would require backtracking or other advanced techniques
        return false; // Placeholder
    }
    
    /**
     * Helper method to visualize the scheduling
     */
    public static void visualizeScheduling(int[][] intervals) {
        System.out.println("Surgery Schedule Visualization:");
        System.out.println("Time: 0 1 2 3 4 5 6 7 8 9");
        System.out.println("------------------------");
        
        for (int i = 0; i < intervals.length; i++) {
            System.out.print("S" + (i+1) + ":   ");
            for (int time = 0; time <= 9; time++) {
                if (time >= intervals[i][0] && time < intervals[i][1]) {
                    System.out.print("█ ");
                } else {
                    System.out.print("  ");
                }
            }
            System.out.println("[" + intervals[i][0] + "," + intervals[i][1] + "]");
        }
        System.out.println();
    }
    
    // Test cases
    public static void runTests() {
        System.out.println("=== Minimum Rooms Required Tests ===");
        
        // Test Case 1: Basic overlapping
        int[][] test1 = {{1,4}, {2,5}, {7,9}, {3,6}};
        System.out.println("Test 1: " + Arrays.deepToString(test1));
        visualizeScheduling(test1);
        System.out.println("Min rooms (Heap): " + minRoomsRequired(test1));
        System.out.println("Min rooms (Chronological): " + minRoomsRequiredChronological(test1));
        System.out.println("Expected: 3\n");
        
        // Test Case 2: No overlapping
        int[][] test2 = {{1,2}, {3,4}, {5,6}, {7,8}};
        System.out.println("Test 2: " + Arrays.deepToString(test2));
        System.out.println("Min rooms (Heap): " + minRoomsRequired(test2));
        System.out.println("Min rooms (Chronological): " + minRoomsRequiredChronological(test2));
        System.out.println("Expected: 1\n");
        
        // Test Case 3: All overlapping
        int[][] test3 = {{1,5}, {2,6}, {3,7}, {4,8}};
        System.out.println("Test 3: " + Arrays.deepToString(test3));
        System.out.println("Min rooms (Heap): " + minRoomsRequired(test3));
        System.out.println("Min rooms (Chronological): " + minRoomsRequiredChronological(test3));
        System.out.println("Expected: 4\n");
        
        // Test Case 4: Edge cases
        int[][] test4 = {{1,1}}; // Same start and end
        System.out.println("Test 4: " + Arrays.deepToString(test4));
        System.out.println("Min rooms (Heap): " + minRoomsRequired(test4));
        System.out.println("Min rooms (Chronological): " + minRoomsRequiredChronological(test4));
        System.out.println("Expected: 1\n");
        
        // Test Case 5: Complex overlapping
        int[][] test5 = {{0,30}, {5,10}, {15,20}, {25,35}, {30,40}};
        System.out.println("Test 5: " + Arrays.deepToString(test5));
        System.out.println("Min rooms (Heap): " + minRoomsRequired(test5));
        System.out.println("Min rooms (Chronological): " + minRoomsRequiredChronological(test5));
        System.out.println("Expected: 2\n");
    }
    
    public static void main(String[] args) {
        runTests();
        
        // Performance comparison
        System.out.println("=== Performance Comparison ===");
        int[][] largeTest = generateLargeTest(1000);
        
        long startTime = System.nanoTime();
        int result1 = minRoomsRequired(largeTest);
        long heapTime = System.nanoTime() - startTime;
        
        startTime = System.nanoTime();
        int result2 = minRoomsRequiredChronological(largeTest);
        long chronoTime = System.nanoTime() - startTime;
        
        System.out.println("Large test (1000 surgeries):");
        System.out.println("Heap approach: " + result1 + " rooms, " + heapTime/1000000 + "ms");
        System.out.println("Chronological: " + result2 + " rooms, " + chronoTime/1000000 + "ms");
        System.out.println("Results match: " + (result1 == result2));
    }
    
    private static int[][] generateLargeTest(int size) {
        int[][] test = new int[size][2];
        Random random = new Random();
        for (int i = 0; i < size; i++) {
            int start = random.nextInt(1000);
            int duration = random.nextInt(100) + 1;
            test[i][0] = start;
            test[i][1] = start + duration;
        }
        return test;
    }
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
 */ 