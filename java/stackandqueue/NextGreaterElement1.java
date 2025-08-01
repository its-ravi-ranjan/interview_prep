/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Next Greater Element I
 * 
 * Problem: Find the next greater element for each element in nums1
 * where nums1 is a subset of nums2.
 * 
 * Example:
 * Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
 * Output: [-1,3,-1]
 * 
 * Approach 1: Monotonic Stack (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * Approach 2: Brute Force
 * Time Complexity: O(n * m)
 * Space Complexity: O(1)
 * 
 * Approach 3: HashMap with Linear Search
 * Time Complexity: O(n * m)
 * Space Complexity: O(n)
 */

import java.util.*;

public class NextGreaterElement1 {
    
    /**
     * Approach 1: Monotonic Stack (User's Implementation)
     * 
     * Algorithm:
     * 1. Use a monotonic decreasing stack
     * 2. Process nums2 from right to left
     * 3. For each element, pop smaller elements from stack
     * 4. Next greater element is stack top (or -1 if empty)
     * 5. Push current element onto stack
     * 6. Use HashMap to store results for quick lookup
     * 
     * Time Complexity: O(n) - single pass through nums2
     * Space Complexity: O(n) - stack and HashMap
     */
    public static int[] nextGreaterElementMonotonicStack(int[] nums1, int[] nums2) {
        Map<Integer, Integer> map = new HashMap<>();
        Stack<Integer> stack = new Stack<>();
        
        // Process nums2 from right to left
        for (int i = nums2.length - 1; i >= 0; i--) {
            // Pop elements smaller than current element
            while (!stack.isEmpty() && stack.peek() <= nums2[i]) {
                stack.pop();
            }
            
            // Next greater element is stack top (or -1 if empty)
            int nextGreater = stack.isEmpty() ? -1 : stack.peek();
            map.put(nums2[i], nextGreater);
            
            // Push current element onto stack
            stack.push(nums2[i]);
        }
        
        // Build result array
        int[] result = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) {
            result[i] = map.get(nums1[i]);
        }
        
        return result;
    }
    
    /**
     * Approach 2: Brute Force
     * 
     * Algorithm:
     * 1. For each element in nums1, find its position in nums2
     * 2. Search for next greater element from that position
     * 3. Return -1 if no greater element found
     * 
     * Time Complexity: O(n * m) - n = nums1.length, m = nums2.length
     * Space Complexity: O(1) - only result array
     */
    public static int[] nextGreaterElementBruteForce(int[] nums1, int[] nums2) {
        int[] result = new int[nums1.length];
        
        for (int i = 0; i < nums1.length; i++) {
            // Find position of nums1[i] in nums2
            int pos = -1;
            for (int j = 0; j < nums2.length; j++) {
                if (nums2[j] == nums1[i]) {
                    pos = j;
                    break;
                }
            }
            
            // Find next greater element
            result[i] = -1;
            for (int j = pos + 1; j < nums2.length; j++) {
                if (nums2[j] > nums1[i]) {
                    result[i] = nums2[j];
                    break;
                }
            }
        }
        
        return result;
    }
    
    /**
     * Approach 3: HashMap with Linear Search
     * 
     * Algorithm:
     * 1. Create HashMap to store element positions in nums2
     * 2. For each element in nums1, find its position
     * 3. Search for next greater element from that position
     * 
     * Time Complexity: O(n * m) - n = nums1.length, m = nums2.length
     * Space Complexity: O(n) - HashMap for positions
     */
    public static int[] nextGreaterElementHashMap(int[] nums1, int[] nums2) {
        Map<Integer, Integer> positionMap = new HashMap<>();
        
        // Store positions of elements in nums2
        for (int i = 0; i < nums2.length; i++) {
            positionMap.put(nums2[i], i);
        }
        
        int[] result = new int[nums1.length];
        
        for (int i = 0; i < nums1.length; i++) {
            int pos = positionMap.get(nums1[i]);
            result[i] = -1;
            
            // Search for next greater element
            for (int j = pos + 1; j < nums2.length; j++) {
                if (nums2[j] > nums1[i]) {
                    result[i] = nums2[j];
                    break;
                }
            }
        }
        
        return result;
    }
    
    /**
     * Approach 4: Monotonic Stack with Forward Pass
     * 
     * Algorithm:
     * 1. Use monotonic decreasing stack
     * 2. Process nums2 from left to right
     * 3. When popping elements, they found their next greater
     * 4. Store results in HashMap
     * 
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    public static int[] nextGreaterElementForwardStack(int[] nums1, int[] nums2) {
        Map<Integer, Integer> map = new HashMap<>();
        Stack<Integer> stack = new Stack<>();
        
        // Process nums2 from left to right
        for (int num : nums2) {
            // Pop elements that found their next greater
            while (!stack.isEmpty() && stack.peek() < num) {
                map.put(stack.pop(), num);
            }
            stack.push(num);
        }
        
        // Elements remaining in stack have no next greater
        while (!stack.isEmpty()) {
            map.put(stack.pop(), -1);
        }
        
        // Build result array
        int[] result = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) {
            result[i] = map.get(nums1[i]);
        }
        
        return result;
    }
    
    /**
     * Helper method to visualize the monotonic stack process
     */
    public static void visualizeMonotonicStack(int[] nums2) {
        System.out.println("=== Monotonic Stack Visualization ===");
        System.out.println("Array: " + Arrays.toString(nums2));
        System.out.println();
        
        Map<Integer, Integer> map = new HashMap<>();
        Stack<Integer> stack = new Stack<>();
        
        System.out.println("Processing from right to left:");
        System.out.println("Index\tElement\tStack\t\tNext Greater");
        System.out.println("-----\t-------\t-----\t\t------------");
        
        for (int i = nums2.length - 1; i >= 0; i--) {
            int current = nums2[i];
            
            // Show stack before processing
            System.out.print(i + "\t" + current + "\t[");
            for (int j = stack.size() - 1; j >= 0; j--) {
                System.out.print(stack.get(j));
                if (j > 0) System.out.print(", ");
            }
            System.out.print("]\t\t");
            
            // Pop smaller elements
            while (!stack.isEmpty() && stack.peek() <= current) {
                stack.pop();
            }
            
            // Get next greater element
            int nextGreater = stack.isEmpty() ? -1 : stack.peek();
            map.put(current, nextGreater);
            
            // Push current element
            stack.push(current);
            
            System.out.println(nextGreater);
        }
        
        System.out.println("\nFinal HashMap:");
        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
        System.out.println();
    }
    
    /**
     * Performance comparison of different approaches
     */
    public static void compareApproaches(int[] nums1, int[] nums2) {
        System.out.println("=== Performance Comparison ===");
        System.out.println("nums1: " + Arrays.toString(nums1));
        System.out.println("nums2: " + Arrays.toString(nums2));
        System.out.println();
        
        // Test all approaches
        long startTime, endTime;
        
        // Monotonic Stack approach
        startTime = System.nanoTime();
        int[] result1 = nextGreaterElementMonotonicStack(nums1, nums2);
        endTime = System.nanoTime();
        System.out.println("Monotonic Stack Approach:");
        System.out.println("  Result: " + Arrays.toString(result1));
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(n)");
        System.out.println();
        
        // Brute Force approach
        startTime = System.nanoTime();
        int[] result2 = nextGreaterElementBruteForce(nums1, nums2);
        endTime = System.nanoTime();
        System.out.println("Brute Force Approach:");
        System.out.println("  Result: " + Arrays.toString(result2));
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(1)");
        System.out.println();
        
        // HashMap approach
        startTime = System.nanoTime();
        int[] result3 = nextGreaterElementHashMap(nums1, nums2);
        endTime = System.nanoTime();
        System.out.println("HashMap Approach:");
        System.out.println("  Result: " + Arrays.toString(result3));
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(n)");
        System.out.println();
        
        // Forward Stack approach
        startTime = System.nanoTime();
        int[] result4 = nextGreaterElementForwardStack(nums1, nums2);
        endTime = System.nanoTime();
        System.out.println("Forward Stack Approach:");
        System.out.println("  Result: " + Arrays.toString(result4));
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(n)");
        System.out.println();
        
        // Verify all results are same
        boolean allSame = Arrays.equals(result1, result2) && 
                         Arrays.equals(result2, result3) && 
                         Arrays.equals(result3, result4);
        System.out.println("All approaches give same result: " + allSame);
        System.out.println();
    }
    
    /**
     * Demonstrate the monotonic stack concept
     */
    public static void demonstrateMonotonicStack() {
        System.out.println("=== Monotonic Stack Concept ===");
        System.out.println("A monotonic stack maintains elements in a specific order.");
        System.out.println("For next greater element, we use a decreasing stack.");
        System.out.println();
        
        System.out.println("Key Insights:");
        System.out.println("1. Process from right to left for efficiency");
        System.out.println("2. Pop elements smaller than current element");
        System.out.println("3. Stack top becomes next greater element");
        System.out.println("4. Push current element onto stack");
        System.out.println("5. Elements remaining in stack have no next greater");
        System.out.println();
        
        System.out.println("Why does this work?");
        System.out.println("- When we pop an element, we found its next greater");
        System.out.println("- Stack maintains decreasing order");
        System.out.println("- Each element is processed once");
        System.out.println("- Time complexity is O(n)");
        System.out.println();
    }
    
    public static void main(String[] args) {
        // Test cases
        int[][] testCases = {
            {4, 1, 2}, {1, 3, 4, 2},           // Expected: [-1, 3, -1]
            {2, 4}, {1, 2, 3, 4},               // Expected: [3, -1]
            {1, 3, 5, 2, 4}, {6, 5, 4, 3, 2, 1, 7}, // Expected: [7, 7, 7, 7, 7]
            {1, 2, 3}, {1, 2, 3},               // Expected: [2, 3, -1]
            {1}, {1, 2, 3, 4},                   // Expected: [2]
            {4, 1, 2}, {1, 2, 3, 4},            // Expected: [-1, 2, 3]
        };
        
        System.out.println("=== Next Greater Element I - Test Cases ===\n");
        
        for (int i = 0; i < testCases.length; i += 2) {
            int[] nums1 = testCases[i];
            int[] nums2 = testCases[i + 1];
            
            System.out.println("Test Case " + (i/2 + 1) + ":");
            System.out.println("nums1: " + Arrays.toString(nums1));
            System.out.println("nums2: " + Arrays.toString(nums2));
            
            int[] result = nextGreaterElementMonotonicStack(nums1, nums2);
            System.out.println("Output: " + Arrays.toString(result));
            System.out.println();
        }
        
        // Detailed analysis with visualization
        System.out.println("=== Detailed Analysis ===");
        visualizeMonotonicStack(new int[]{1, 3, 4, 2});
        
        // Performance comparison
        compareApproaches(new int[]{4, 1, 2}, new int[]{1, 3, 4, 2});
        
        // Demonstrate concept
        demonstrateMonotonicStack();
        
        System.out.println("=== Key Insights ===");
        System.out.println("1. Monotonic stack is optimal for O(n) time complexity");
        System.out.println("2. Brute force is simple but O(n*m) time complexity");
        System.out.println("3. HashMap approach trades space for time");
        System.out.println("4. Forward and backward stack approaches both work");
        System.out.println("5. Monotonic stack is a common pattern for next greater/smaller problems");
    }
} 