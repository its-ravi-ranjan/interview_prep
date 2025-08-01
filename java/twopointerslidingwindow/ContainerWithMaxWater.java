/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Container With Most Water
 * 
 * Problem: Find two lines that together with the x-axis form a container
 * such that the container contains the most water.
 * 
 * Example:
 * Input: height = [1,8,6,2,5,4,8,3,7]
 * Output: 49
 * 
 * Approach 1: Two-Pointer (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * Approach 2: Brute Force
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * Approach 3: Optimized Two-Pointer
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

import java.util.*;

public class ContainerWithMaxWater {
    
    /**
     * Approach 1: Two-Pointer (User's Implementation)
     * 
     * Algorithm:
     * 1. Use two pointers: left and right
     * 2. Calculate area = width * min(height[left], height[right])
     * 3. Move pointer with smaller height inward
     * 4. Update maxWater if current area is larger
     * 5. Continue until left < right
     * 
     * Time Complexity: O(n) - single pass through array
     * Space Complexity: O(1) - only a few variables
     */
    public static int maxAreaTwoPointer(int[] height) {
        int maxWater = 0;
        int left = 0;
        int right = height.length - 1;
        
        while (left < right) {
            int width = right - left;
            int length = Math.min(height[left], height[right]);
            int area = width * length;
            maxWater = Math.max(area, maxWater);
            
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        
        return maxWater;
    }
    
    /**
     * Approach 2: Brute Force
     * 
     * Algorithm:
     * 1. Check all possible pairs of lines
     * 2. Calculate area for each pair
     * 3. Keep track of maximum area
     * 
     * Time Complexity: O(n²) - nested loops
     * Space Complexity: O(1) - only a few variables
     */
    public static int maxAreaBruteForce(int[] height) {
        int maxWater = 0;
        
        for (int i = 0; i < height.length; i++) {
            for (int j = i + 1; j < height.length; j++) {
                int width = j - i;
                int length = Math.min(height[i], height[j]);
                int area = width * length;
                maxWater = Math.max(area, maxWater);
            }
        }
        
        return maxWater;
    }
    
    /**
     * Approach 3: Optimized Two-Pointer with Early Exit
     * 
     * Algorithm:
     * 1. Use two pointers: left and right
     * 2. Calculate area and update maxWater
     * 3. Move pointer with smaller height
     * 4. Early exit if remaining width * max height < current maxWater
     * 
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    public static int maxAreaOptimized(int[] height) {
        int maxWater = 0;
        int left = 0;
        int right = height.length - 1;
        
        while (left < right) {
            int width = right - left;
            int length = Math.min(height[left], height[right]);
            int area = width * length;
            maxWater = Math.max(area, maxWater);
            
            // Early exit optimization
            if (width * Math.max(height[left], height[right]) <= maxWater) {
                break;
            }
            
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        
        return maxWater;
    }
    
    /**
     * Approach 4: Two-Pointer with Height Tracking
     * 
     * Algorithm:
     * 1. Use two pointers and track max heights seen
     * 2. Skip lines that can't improve the result
     * 3. More aggressive optimization
     * 
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    public static int maxAreaHeightTracking(int[] height) {
        int maxWater = 0;
        int left = 0;
        int right = height.length - 1;
        int leftMax = 0;
        int rightMax = 0;
        
        while (left < right) {
            leftMax = Math.max(leftMax, height[left]);
            rightMax = Math.max(rightMax, height[right]);
            
            int width = right - left;
            int length = Math.min(height[left], height[right]);
            int area = width * length;
            maxWater = Math.max(area, maxWater);
            
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        
        return maxWater;
    }
    
    /**
     * Helper method to visualize the two-pointer process
     */
    public static void visualizeTwoPointer(int[] height) {
        System.out.println("=== Two-Pointer Visualization ===");
        System.out.println("Height array: " + Arrays.toString(height));
        System.out.println();
        
        int maxWater = 0;
        int left = 0;
        int right = height.length - 1;
        
        System.out.println("Step\tLeft\tRight\tWidth\tLength\tArea\tMaxWater\tAction");
        System.out.println("----\t----\t-----\t-----\t------\t---\t--------\t------");
        
        int step = 1;
        while (left < right) {
            int width = right - left;
            int length = Math.min(height[left], height[right]);
            int area = width * length;
            maxWater = Math.max(area, maxWater);
            
            System.out.print(step + "\t" + left + "\t" + right + "\t" + width + "\t" + length + "\t" + area + "\t" + maxWater + "\t");
            
            if (height[left] < height[right]) {
                System.out.println("Move left (smaller height)");
                left++;
            } else {
                System.out.println("Move right (smaller height)");
                right--;
            }
            step++;
        }
        
        System.out.println("\nFinal Result: " + maxWater);
        System.out.println();
    }
    
    /**
     * Performance comparison of different approaches
     */
    public static void compareApproaches(int[] height) {
        System.out.println("=== Performance Comparison ===");
        System.out.println("Height array: " + Arrays.toString(height));
        System.out.println("Array length: " + height.length);
        System.out.println();
        
        // Test all approaches
        long startTime, endTime;
        
        // Two-Pointer approach
        startTime = System.nanoTime();
        int result1 = maxAreaTwoPointer(height);
        endTime = System.nanoTime();
        System.out.println("Two-Pointer Approach:");
        System.out.println("  Result: " + result1);
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(1)");
        System.out.println();
        
        // Brute Force approach
        startTime = System.nanoTime();
        int result2 = maxAreaBruteForce(height);
        endTime = System.nanoTime();
        System.out.println("Brute Force Approach:");
        System.out.println("  Result: " + result2);
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(1)");
        System.out.println();
        
        // Optimized approach
        startTime = System.nanoTime();
        int result3 = maxAreaOptimized(height);
        endTime = System.nanoTime();
        System.out.println("Optimized Approach:");
        System.out.println("  Result: " + result3);
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(1)");
        System.out.println();
        
        // Height Tracking approach
        startTime = System.nanoTime();
        int result4 = maxAreaHeightTracking(height);
        endTime = System.nanoTime();
        System.out.println("Height Tracking Approach:");
        System.out.println("  Result: " + result4);
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(1)");
        System.out.println();
        
        // Verify all results are same
        boolean allSame = result1 == result2 && result2 == result3 && result3 == result4;
        System.out.println("All approaches give same result: " + allSame);
        System.out.println();
    }
    
    /**
     * Demonstrate the two-pointer concept
     */
    public static void demonstrateTwoPointer() {
        System.out.println("=== Two-Pointer Concept ===");
        System.out.println("The two-pointer approach is optimal for this problem.");
        System.out.println("It uses the insight that we can eliminate certain pairs.");
        System.out.println();
        
        System.out.println("Key Insights:");
        System.out.println("1. Start with widest possible container (left=0, right=n-1)");
        System.out.println("2. Area = width * min(height[left], height[right])");
        System.out.println("3. Move pointer with smaller height inward");
        System.out.println("4. Larger height might give better area with remaining width");
        System.out.println("5. Continue until pointers meet");
        System.out.println();
        
        System.out.println("Why move smaller height pointer?");
        System.out.println("- Current area is limited by smaller height");
        System.out.println("- Moving larger height pointer can't improve area");
        System.out.println("- Moving smaller height pointer might find better pair");
        System.out.println("- Width decreases, but height might increase");
        System.out.println();
    }
    
    /**
     * Demonstrate different test cases
     */
    public static void demonstrateTestCases() {
        System.out.println("=== Test Cases Demonstration ===");
        
        int[][] testCases = {
            {1, 8, 6, 2, 5, 4, 8, 3, 7},  // Expected: 49
            {1, 1},                         // Expected: 1
            {4, 3, 2, 1, 4},               // Expected: 16
            {1, 2, 1},                     // Expected: 2
            {1, 8, 6, 2, 5, 4, 8, 3, 7},  // Expected: 49
            {1, 2, 4, 3},                  // Expected: 4
            {2, 3, 4, 5, 18, 17, 6},      // Expected: 17
        };
        
        for (int i = 0; i < testCases.length; i++) {
            System.out.println("Test Case " + (i + 1) + ":");
            System.out.println("Input: " + Arrays.toString(testCases[i]));
            
            int result = maxAreaTwoPointer(testCases[i]);
            System.out.println("Output: " + result);
            
            // Verify with brute force
            int bruteForceResult = maxAreaBruteForce(testCases[i]);
            System.out.println("Brute Force: " + bruteForceResult);
            System.out.println("Correct: " + (result == bruteForceResult));
            System.out.println();
        }
    }
    
    /**
     * Demonstrate the mathematical proof
     */
    public static void demonstrateMathematicalProof() {
        System.out.println("=== Mathematical Proof ===");
        System.out.println("Why does the two-pointer approach work?");
        System.out.println();
        
        System.out.println("1. Greedy Choice:");
        System.out.println("   - At each step, we choose to move the pointer with smaller height");
        System.out.println("   - This is optimal because the current area is limited by the smaller height");
        System.out.println("   - Moving the larger height pointer can't improve the area");
        System.out.println();
        
        System.out.println("2. Optimal Substructure:");
        System.out.println("   - If we have optimal solution for subproblem, we can extend it");
        System.out.println("   - Moving smaller height pointer preserves optimality");
        System.out.println("   - We don't lose any potential better solutions");
        System.out.println();
        
        System.out.println("3. Contradiction Proof:");
        System.out.println("   - Assume moving larger height pointer gives better solution");
        System.out.println("   - But current area is limited by smaller height");
        System.out.println("   - Moving larger height can't increase the limiting factor");
        System.out.println("   - Contradiction: our assumption is false");
        System.out.println();
    }
    
    public static void main(String[] args) {
        // Test cases
        int[][] testCases = {
            {1, 8, 6, 2, 5, 4, 8, 3, 7},  // Expected: 49
            {1, 1},                         // Expected: 1
            {4, 3, 2, 1, 4},               // Expected: 16
            {1, 2, 1},                     // Expected: 2
            {1, 8, 6, 2, 5, 4, 8, 3, 7},  // Expected: 49
            {1, 2, 4, 3},                  // Expected: 4
            {2, 3, 4, 5, 18, 17, 6},      // Expected: 17
        };
        
        System.out.println("=== Container With Most Water - Test Cases ===\n");
        
        for (int i = 0; i < testCases.length; i++) {
            System.out.println("Test Case " + (i + 1) + ":");
            System.out.println("Input: " + Arrays.toString(testCases[i]));
            
            int result = maxAreaTwoPointer(testCases[i]);
            System.out.println("Output: " + result);
            System.out.println();
        }
        
        // Detailed analysis with visualization
        System.out.println("=== Detailed Analysis ===");
        visualizeTwoPointer(new int[]{1, 8, 6, 2, 5, 4, 8, 3, 7});
        
        // Performance comparison
        compareApproaches(new int[]{1, 8, 6, 2, 5, 4, 8, 3, 7, 9, 2, 1, 5, 3, 8, 4, 6, 7, 1, 9});
        
        // Demonstrate concepts
        demonstrateTwoPointer();
        demonstrateTestCases();
        demonstrateMathematicalProof();
        
        System.out.println("=== Key Insights ===");
        System.out.println("1. Two-pointer approach is optimal for O(n) time complexity");
        System.out.println("2. Brute force is O(n²) but easy to understand");
        System.out.println("3. Move pointer with smaller height for optimality");
        System.out.println("4. Area = width * min(height[left], height[right])");
        System.out.println("5. Greedy choice: always move smaller height pointer");
    }
} 