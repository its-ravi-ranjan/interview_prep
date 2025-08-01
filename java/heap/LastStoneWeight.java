/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Last Stone Weight problem
 * 
 * Problem: Last Stone Weight
 * ---------------------------
 * You are given an array of integers stones where stones[i] is the weight of the ith stone.
 * 
 * We are playing a game with the stones. On each turn, we choose the heaviest two stones 
 * and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. 
 * The result of this smash is:
 * 
 * - If x == y, both stones are destroyed
 * - If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x
 * 
 * At the end of the game, there is at most one stone left.
 * Return the weight of the last remaining stone. If there are no stones left, return 0.
 * 
 * Example:
 * Input: stones = [2,7,4,1,8,1]
 * Output: 1
 * 
 * Explanation: 
 * - Combine 7 and 8 to get 1: [2,4,1,1,1]
 * - Combine 2 and 4 to get 2: [2,1,1,1] 
 * - Combine 2 and 1 to get 1: [1,1,1]
 * - Combine 1 and 1 to get 0: [1]
 * - Last stone weight: 1
 */

import java.util.*;

public class LastStoneWeight {
    
    /**
     * Approach: Max Heap (Priority Queue)
     * 
     * 1. Build a max heap from all stones
     * 2. While heap has more than 1 stone:
     *    - Extract two heaviest stones (y and x where y >= x)
     *    - If they are equal, both are destroyed
     *    - If they are different, destroy x and add (y-x) back to heap
     * 3. Return the last remaining stone or 0 if none left
     * 
     * Time Complexity: O(n log n)
     * - Building heap: O(n log n)
     * - Each operation (poll/add): O(log n)
     * - In worst case, we do O(n) operations
     * 
     * Space Complexity: O(n)
     * - PriorityQueue stores all stones
     */
    public static int lastStoneWeight(int[] stones) {
        // Create max heap using PriorityQueue with reverse order
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        
        // Add all stones to max heap
        for (int stone : stones) {
            maxHeap.add(stone);
        }
        
        // Continue smashing stones until at most 1 remains
        while (maxHeap.size() > 1) {
            int y = maxHeap.poll(); // Heaviest stone
            int x = maxHeap.poll(); // Second heaviest stone
            
            // If stones are different, add the difference back
            if (x != y) {
                maxHeap.add(y - x);
            }
            // If stones are equal, both are destroyed (no need to add anything)
        }
        
        // Return the last remaining stone or 0 if none left
        return maxHeap.isEmpty() ? 0 : maxHeap.poll();
    }
    
    /**
     * Alternative Approach: Using Arrays.sort() (Less efficient but simpler)
     * 
     * Time Complexity: O(n² log n) - sorting n times
     * Space Complexity: O(1) - in-place sorting
     */
    public static int lastStoneWeightAlternative(int[] stones) {
        List<Integer> stoneList = new ArrayList<>();
        for (int stone : stones) {
            stoneList.add(stone);
        }
        
        while (stoneList.size() > 1) {
            Collections.sort(stoneList, Collections.reverseOrder());
            int y = stoneList.get(0);
            int x = stoneList.get(1);
            
            stoneList.remove(0);
            stoneList.remove(0);
            
            if (x != y) {
                stoneList.add(y - x);
            }
        }
        
        return stoneList.isEmpty() ? 0 : stoneList.get(0);
    }
    
    /**
     * Visualize the smashing process for debugging
     */
    public static void visualizeSmashing(int[] stones) {
        System.out.println("Original stones: " + Arrays.toString(stones));
        
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        for (int stone : stones) {
            maxHeap.add(stone);
        }
        
        int step = 1;
        while (maxHeap.size() > 1) {
            int y = maxHeap.poll();
            int x = maxHeap.poll();
            
            System.out.println("Step " + step + ": Smash " + y + " and " + x);
            
            if (x != y) {
                int remaining = y - x;
                maxHeap.add(remaining);
                System.out.println("Result: " + remaining + " stone remains");
            } else {
                System.out.println("Result: Both stones destroyed");
            }
            
            step++;
        }
        
        int result = maxHeap.isEmpty() ? 0 : maxHeap.poll();
        System.out.println("Final result: " + result);
    }
    
    // Test cases
    public static void main(String[] args) {
        System.out.println("=== Last Stone Weight Problem ===\n");
        
        // Test case 1
        int[] stones1 = {2, 7, 4, 1, 8, 1};
        System.out.println("Test Case 1:");
        System.out.println("Input: " + Arrays.toString(stones1));
        System.out.println("Expected: 1");
        System.out.println("Output: " + lastStoneWeight(stones1));
        System.out.println();
        
        // Test case 2
        int[] stones2 = {1};
        System.out.println("Test Case 2:");
        System.out.println("Input: " + Arrays.toString(stones2));
        System.out.println("Expected: 1");
        System.out.println("Output: " + lastStoneWeight(stones2));
        System.out.println();
        
        // Test case 3
        int[] stones3 = {1, 1};
        System.out.println("Test Case 3:");
        System.out.println("Input: " + Arrays.toString(stones3));
        System.out.println("Expected: 0");
        System.out.println("Output: " + lastStoneWeight(stones3));
        System.out.println();
        
        // Visualization
        System.out.println("=== Visualization ===");
        visualizeSmashing(stones1);
    }
} 