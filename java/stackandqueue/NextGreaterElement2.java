/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Next Greater Element II (Circular Array)
 * 
 * Problem: Find the next greater element for each element in a circular array.
 * The next greater number of a number x is the first greater number to its
 * traversing-order next in the array, which means you could search circularly.
 * 
 * Example:
 * Input: nums = [1,2,1]
 * Output: [2,-1,2]
 * 
 * Approach 1: Monotonic Stack (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * Approach 2: Brute Force
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * Approach 3: Double Array Simulation
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

import java.util.*;

public class NextGreaterElement2 {
    
    /**
     * Approach 1: Monotonic Stack (User's Implementation)
     * 
     * Algorithm:
     * 1. Use a monotonic decreasing stack to store indices
     * 2. Process array twice (2*n) to handle circular nature
     * 3. For each element, pop smaller elements from stack
     * 4. Next greater element is stack top (or -1 if empty)
     * 5. Push current index onto stack
     * 6. Use modulo operation to handle circular indexing
     * 
     * Time Complexity: O(n) - each element processed at most twice
     * Space Complexity: O(n) - stack and result array
     */
    public static int[] nextGreaterElementsMonotonicStack(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        Stack<Integer> stack = new Stack<>();
        
        // Process array twice to handle circular nature
        for (int i = 2 * n - 1; i >= 0; i--) {
            int index = i % n;
            
            // Pop elements smaller than current element
            while (!stack.isEmpty() && nums[stack.peek()] <= nums[index]) {
                stack.pop();
            }
            
            // Next greater element is stack top (or -1 if empty)
            int nextGreater = stack.isEmpty() ? -1 : nums[stack.peek()];
            result[index] = nextGreater;
            
            // Push current index onto stack
            stack.push(index);
        }
        
        return result;
    }
    
    /**
     * Approach 2: Brute Force
     * 
     * Algorithm:
     * 1. For each element, search circularly for next greater
     * 2. Start from next position and wrap around if needed
     * 3. Return -1 if no greater element found
     * 
     * Time Complexity: O(n²) - for each element, search up to n elements
     * Space Complexity: O(1) - only result array
     */
    public static int[] nextGreaterElementsBruteForce(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        
        for (int i = 0; i < n; i++) {
            result[i] = -1;
            
            // Search circularly for next greater element
            for (int j = 1; j < n; j++) {
                int nextIndex = (i + j) % n;
                if (nums[nextIndex] > nums[i]) {
                    result[i] = nums[nextIndex];
                    break;
                }
            }
        }
        
        return result;
    }
    
    /**
     * Approach 3: Double Array Simulation
     * 
     * Algorithm:
     * 1. Create a doubled array [nums, nums]
     * 2. Use monotonic stack on doubled array
     * 3. Take first half of result
     * 
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    public static int[] nextGreaterElementsDoubleArray(int[] nums) {
        int n = nums.length;
        int[] doubled = new int[2 * n];
        
        // Create doubled array
        for (int i = 0; i < n; i++) {
            doubled[i] = nums[i];
            doubled[i + n] = nums[i];
        }
        
        int[] result = new int[n];
        Stack<Integer> stack = new Stack<>();
        
        // Process doubled array
        for (int i = 2 * n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && doubled[stack.peek()] <= doubled[i]) {
                stack.pop();
            }
            
            int nextGreater = stack.isEmpty() ? -1 : doubled[stack.peek()];
            
            // Only store result for first half (original array)
            if (i < n) {
                result[i] = nextGreater;
            }
            
            stack.push(i);
        }
        
        return result;
    }
    
    /**
     * Approach 4: Monotonic Stack with Forward Pass
     * 
     * Algorithm:
     * 1. Use monotonic decreasing stack
     * 2. Process array twice from left to right
     * 3. When popping elements, they found their next greater
     * 4. Store results in HashMap
     * 
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    public static int[] nextGreaterElementsForwardStack(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        Arrays.fill(result, -1);
        Stack<Integer> stack = new Stack<>();
        
        // Process array twice to handle circular nature
        for (int i = 0; i < 2 * n; i++) {
            int index = i % n;
            
            // Pop elements that found their next greater
            while (!stack.isEmpty() && nums[stack.peek()] < nums[index]) {
                int poppedIndex = stack.pop();
                result[poppedIndex] = nums[index];
            }
            
            stack.push(index);
        }
        
        return result;
    }
    
    /**
     * Helper method to visualize the monotonic stack process
     */
    public static void visualizeMonotonicStack(int[] nums) {
        System.out.println("=== Monotonic Stack Visualization (Circular) ===");
        System.out.println("Array: " + Arrays.toString(nums));
        System.out.println("Length: " + nums.length);
        System.out.println();
        
        int n = nums.length;
        int[] result = new int[n];
        Stack<Integer> stack = new Stack<>();
        
        System.out.println("Processing from right to left (2*n times):");
        System.out.println("Index\tElement\tStack\t\tNext Greater");
        System.out.println("-----\t-------\t-----\t\t------------");
        
        for (int i = 2 * n - 1; i >= 0; i--) {
            int index = i % n;
            int current = nums[index];
            
            // Show stack before processing
            System.out.print(i + "(" + index + ")\t" + current + "\t[");
            for (int j = stack.size() - 1; j >= 0; j--) {
                System.out.print(nums[stack.get(j)]);
                if (j > 0) System.out.print(", ");
            }
            System.out.print("]\t\t");
            
            // Pop smaller elements
            while (!stack.isEmpty() && nums[stack.peek()] <= current) {
                stack.pop();
            }
            
            // Get next greater element
            int nextGreater = stack.isEmpty() ? -1 : nums[stack.peek()];
            result[index] = nextGreater;
            
            // Push current index
            stack.push(index);
            
            System.out.println(nextGreater);
        }
        
        System.out.println("\nFinal Result: " + Arrays.toString(result));
        System.out.println();
    }
    
    /**
     * Performance comparison of different approaches
     */
    public static void compareApproaches(int[] nums) {
        System.out.println("=== Performance Comparison ===");
        System.out.println("Array: " + Arrays.toString(nums));
        System.out.println("Array length: " + nums.length);
        System.out.println();
        
        // Test all approaches
        long startTime, endTime;
        
        // Monotonic Stack approach
        startTime = System.nanoTime();
        int[] result1 = nextGreaterElementsMonotonicStack(nums);
        endTime = System.nanoTime();
        System.out.println("Monotonic Stack Approach:");
        System.out.println("  Result: " + Arrays.toString(result1));
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(n)");
        System.out.println();
        
        // Brute Force approach
        startTime = System.nanoTime();
        int[] result2 = nextGreaterElementsBruteForce(nums);
        endTime = System.nanoTime();
        System.out.println("Brute Force Approach:");
        System.out.println("  Result: " + Arrays.toString(result2));
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(1)");
        System.out.println();
        
        // Double Array approach
        startTime = System.nanoTime();
        int[] result3 = nextGreaterElementsDoubleArray(nums);
        endTime = System.nanoTime();
        System.out.println("Double Array Approach:");
        System.out.println("  Result: " + Arrays.toString(result3));
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(n)");
        System.out.println();
        
        // Forward Stack approach
        startTime = System.nanoTime();
        int[] result4 = nextGreaterElementsForwardStack(nums);
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
     * Demonstrate the circular array concept
     */
    public static void demonstrateCircularArray() {
        System.out.println("=== Circular Array Concept ===");
        System.out.println("In a circular array, the next element of nums[n-1] is nums[0].");
        System.out.println("This means we can search circularly for next greater elements.");
        System.out.println();
        
        System.out.println("Key Insights:");
        System.out.println("1. Process array twice (2*n) to handle circular nature");
        System.out.println("2. Use modulo operation (i % n) for circular indexing");
        System.out.println("3. Monotonic stack works the same way as non-circular");
        System.out.println("4. Each element can find next greater in circular manner");
        System.out.println("5. Time complexity remains O(n) despite processing 2*n elements");
        System.out.println();
        
        System.out.println("Why process 2*n times?");
        System.out.println("- First n iterations: handle normal next greater");
        System.out.println("- Second n iterations: handle circular next greater");
        System.out.println("- Ensures all elements find their next greater");
        System.out.println("- Handles cases where next greater is before current element");
        System.out.println();
    }
    
    /**
     * Demonstrate circular search examples
     */
    public static void demonstrateCircularSearch() {
        System.out.println("=== Circular Search Examples ===");
        
        int[][] examples = {
            {1, 2, 1},      // [2, -1, 2]
            {1, 2, 3, 4},   // [2, 3, 4, -1]
            {4, 3, 2, 1},   // [-1, 4, 4, 4]
            {1, 1, 1},      // [-1, -1, -1]
            {5, 4, 3, 2, 1} // [-1, 5, 5, 5, 5]
        };
        
        for (int i = 0; i < examples.length; i++) {
            int[] nums = examples[i];
            System.out.println("Example " + (i + 1) + ":");
            System.out.println("Array: " + Arrays.toString(nums));
            
            // Show circular search for each element
            for (int j = 0; j < nums.length; j++) {
                System.out.print("  " + nums[j] + " -> ");
                
                boolean found = false;
                for (int k = 1; k < nums.length; k++) {
                    int nextIndex = (j + k) % nums.length;
                    if (nums[nextIndex] > nums[j]) {
                        System.out.println(nums[nextIndex]);
                        found = true;
                        break;
                    }
                }
                
                if (!found) {
                    System.out.println("-1");
                }
            }
            
            int[] result = nextGreaterElementsMonotonicStack(nums);
            System.out.println("Result: " + Arrays.toString(result));
            System.out.println();
        }
    }
    
    public static void main(String[] args) {
        // Test cases
        int[][] testCases = {
            {1, 2, 1},           // Expected: [2, -1, 2]
            {1, 2, 3, 4},        // Expected: [2, 3, 4, -1]
            {4, 3, 2, 1},        // Expected: [-1, 4, 4, 4]
            {1, 1, 1},           // Expected: [-1, -1, -1]
            {5, 4, 3, 2, 1},     // Expected: [-1, 5, 5, 5, 5]
            {2, 1, 2, 4, 3},     // Expected: [4, 2, 4, -1, 4]
        };
        
        System.out.println("=== Next Greater Element II - Test Cases ===\n");
        
        for (int i = 0; i < testCases.length; i++) {
            System.out.println("Test Case " + (i + 1) + ":");
            System.out.println("Input: " + Arrays.toString(testCases[i]));
            
            int[] result = nextGreaterElementsMonotonicStack(testCases[i]);
            System.out.println("Output: " + Arrays.toString(result));
            System.out.println();
        }
        
        // Detailed analysis with visualization
        System.out.println("=== Detailed Analysis ===");
        visualizeMonotonicStack(new int[]{1, 2, 1});
        
        // Performance comparison
        compareApproaches(new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10});
        
        // Demonstrate concepts
        demonstrateCircularArray();
        demonstrateCircularSearch();
        
        System.out.println("=== Key Insights ===");
        System.out.println("1. Monotonic stack is optimal for O(n) time complexity");
        System.out.println("2. Process array twice to handle circular nature");
        System.out.println("3. Use modulo operation for circular indexing");
        System.out.println("4. Brute force is O(n²) but easy to understand");
        System.out.println("5. Circular arrays require special handling for next greater elements");
    }
} 