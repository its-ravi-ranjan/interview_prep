package array.easy;

import java.util.*;

/**
 * Pascal's Triangle
 * 
 * Problem:
 * Given an integer numRows, return the first numRows of Pascal's triangle.
 * In Pascal's triangle, each number is the sum of the two numbers directly above it.
 * 
 * Example:
 * Input: numRows = 5
 * Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
 * 
 * Pascal's Triangle Pattern:
 * Row 0:       1
 * Row 1:      1 1
 * Row 2:     1 2 1
 * Row 3:    1 3 3 1
 * Row 4:   1 4 6 4 1
 * 
 * Approach:
 * 1. Create a result list to store all rows
 * 2. For each row i from 0 to numRows-1:
 *    - Create a new list of size i+1 filled with 1s
 *    - For each element j from 1 to i-1 (excluding first and last):
 *      - Set row.set(j, result.get(i-1).get(j-1) + result.get(i-1).get(j))
 *    - Add the row to result
 * 3. Return the result list
 * 
 * Key Insight:
 * Each element (except first and last) is the sum of the two elements
 * directly above it from the previous row.
 * 
 * Dry Run (numRows = 4):
 * 
 * Step 1: i = 0
 *   row = [1] (size 1, filled with 1)
 *   result = [[1]]
 * 
 * Step 2: i = 1
 *   row = [1, 1] (size 2, filled with 1)
 *   j loop doesn't run (j < i, so j < 1, but j starts at 1)
 *   result = [[1], [1, 1]]
 * 
 * Step 3: i = 2
 *   row = [1, 1, 1] (size 3, filled with 1)
 *   j = 1: row.set(1, result.get(1).get(0) + result.get(1).get(1)) = 1 + 1 = 2
 *   row = [1, 2, 1]
 *   result = [[1], [1, 1], [1, 2, 1]]
 * 
 * Step 4: i = 3
 *   row = [1, 1, 1, 1] (size 4, filled with 1)
 *   j = 1: row.set(1, result.get(2).get(0) + result.get(2).get(1)) = 1 + 2 = 3
 *   j = 2: row.set(2, result.get(2).get(1) + result.get(2).get(2)) = 2 + 1 = 3
 *   row = [1, 3, 3, 1]
 *   result = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]]
 * 
 * Output: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]]
 * 
 * Time & Space Complexity:
 * Time Complexity: O(numRows²) - We need to fill each row, and each row i has i+1 elements
 * Space Complexity: O(numRows²) - We store all rows in the result list
 */
public class PascalTriangle {
    
    /**
     * Generates Pascal's Triangle up to numRows
     * @param numRows Number of rows to generate
     * @return Pascal's triangle as List of Lists
     */
    public static List<List<Integer>> generate(int numRows) {
        List<List<Integer>> result = new ArrayList<>();
        
        for (int i = 0; i < numRows; i++) {
            // Create a new row with i+1 elements, all filled with 1
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j <= i; j++) {
                row.add(1);
            }
            
            // Fill the middle elements (excluding first and last)
            for (int j = 1; j < i; j++) {
                row.set(j, result.get(i - 1).get(j - 1) + result.get(i - 1).get(j));
            }
            
            result.add(row);
        }
        
        return result;
    }
    
    /**
     * Alternative approach using mathematical formula
     * Each element at position (i, j) is C(i, j) = i! / (j! * (i-j)!)
     * @param numRows Number of rows to generate
     * @return Pascal's triangle as List of Lists
     */
    public static List<List<Integer>> generateWithFormula(int numRows) {
        List<List<Integer>> result = new ArrayList<>();
        
        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j <= i; j++) {
                row.add(combination(i, j));
            }
            result.add(row);
        }
        
        return result;
    }
    
    /**
     * Calculates combination C(n, r) = n! / (r! * (n-r)!)
     * @param n Total number of items
     * @param r Number of items to choose
     * @return Combination value
     */
    public static int combination(int n, int r) {
        if (r == 0 || r == n) return 1;
        
        long result = 1;
        for (int i = 0; i < r; i++) {
            result = result * (n - i) / (i + 1);
        }
        
        return (int) result;
    }
    
    /**
     * Prints Pascal's Triangle in a formatted way
     * @param triangle Pascal's triangle list
     */
    public static void printTriangle(List<List<Integer>> triangle) {
        System.out.println("Pascal's Triangle:");
        for (int i = 0; i < triangle.size(); i++) {
            // Add spaces for alignment
            String spaces = " ".repeat(triangle.size() - i - 1);
            System.out.print(spaces);
            for (int j = 0; j < triangle.get(i).size(); j++) {
                System.out.print(triangle.get(i).get(j) + " ");
            }
            System.out.println();
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        // Test case 1: Basic case
        System.out.println("Test case 1:");
        System.out.println("Input: numRows = 5");
        List<List<Integer>> result1 = generate(5);
        System.out.println("Output: " + result1);
        System.out.println("Expected: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]");
        printTriangle(result1);
        
        // Test case 2: Single row
        System.out.println("Test case 2:");
        System.out.println("Input: numRows = 1");
        List<List<Integer>> result2 = generate(1);
        System.out.println("Output: " + result2);
        System.out.println("Expected: [[1]]");
        printTriangle(result2);
        
        // Test case 3: Two rows
        System.out.println("Test case 3:");
        System.out.println("Input: numRows = 2");
        List<List<Integer>> result3 = generate(2);
        System.out.println("Output: " + result3);
        System.out.println("Expected: [[1],[1,1]]");
        printTriangle(result3);
        
        // Test case 4: Three rows
        System.out.println("Test case 4:");
        System.out.println("Input: numRows = 3");
        List<List<Integer>> result4 = generate(3);
        System.out.println("Output: " + result4);
        System.out.println("Expected: [[1],[1,1],[1,2,1]]");
        printTriangle(result4);
        
        // Test case 5: Zero rows
        System.out.println("Test case 5:");
        System.out.println("Input: numRows = 0");
        List<List<Integer>> result5 = generate(0);
        System.out.println("Output: " + result5);
        System.out.println("Expected: []");
        System.out.println();
        
        // Test case 6: Large number of rows
        System.out.println("Test case 6:");
        System.out.println("Input: numRows = 10");
        long startTime = System.nanoTime();
        List<List<Integer>> result6 = generate(10);
        long endTime = System.nanoTime();
        System.out.printf("Time taken: %.2f ms%n", (endTime - startTime) / 1_000_000.0);
        System.out.println("First few rows: " + result6.subList(0, Math.min(5, result6.size())));
        System.out.println("Last row: " + result6.get(result6.size() - 1));
        System.out.println();
        
        // Test case 7: Compare with formula approach
        System.out.println("Test case 7 - Formula Approach:");
        System.out.println("Input: numRows = 6");
        List<List<Integer>> result7 = generateWithFormula(6);
        System.out.println("Output: " + result7);
        printTriangle(result7);
        
        // Test case 8: Verify mathematical properties
        System.out.println("Test case 8 - Mathematical Properties:");
        List<List<Integer>> result8 = generate(8);
        
        // Check that each row sum equals 2^row
        for (int i = 0; i < result8.size(); i++) {
            int rowSum = result8.get(i).stream().mapToInt(Integer::intValue).sum();
            int expectedSum = (int) Math.pow(2, i);
            System.out.printf("Row %d sum: %d (expected: %d) - %s%n", 
                i, rowSum, expectedSum, rowSum == expectedSum ? "✓" : "✗");
        }
        
        // Check that each row is symmetric
        for (int i = 0; i < result8.size(); i++) {
            List<Integer> row = result8.get(i);
            boolean isSymmetric = true;
            for (int j = 0; j < row.size() / 2; j++) {
                if (!row.get(j).equals(row.get(row.size() - 1 - j))) {
                    isSymmetric = false;
                    break;
                }
            }
            System.out.printf("Row %d symmetric: %s%n", i, isSymmetric ? "✓" : "✗");
        }
        System.out.println();
        
        // Test case 9: Performance comparison
        System.out.println("Test case 9 - Performance Comparison:");
        int largeNumRows = 20;
        
        startTime = System.nanoTime();
        generate(largeNumRows);
        endTime = System.nanoTime();
        System.out.printf("Standard approach time: %.2f ms%n", (endTime - startTime) / 1_000_000.0);
        
        startTime = System.nanoTime();
        generateWithFormula(largeNumRows);
        endTime = System.nanoTime();
        System.out.printf("Formula approach time: %.2f ms%n", (endTime - startTime) / 1_000_000.0);
        System.out.println("Explanation: Standard approach is generally faster for larger numbers\n");
        
        // Test case 10: Edge cases
        System.out.println("Test case 10 - Edge Cases:");
        
        // Negative input (should handle gracefully or throw exception)
        try {
            generate(-1);
            System.out.println("Negative input handled gracefully");
        } catch (Exception e) {
            System.out.println("Negative input threw exception: " + e.getMessage());
        }
        
        // Very large input
        try {
            List<List<Integer>> largeResult = generate(30);
            System.out.println("Large input (30 rows) generated successfully");
            System.out.println("Last row has " + largeResult.get(largeResult.size() - 1).size() + " elements");
        } catch (Exception e) {
            System.out.println("Large input failed: " + e.getMessage());
        }
        System.out.println();
    }
} 