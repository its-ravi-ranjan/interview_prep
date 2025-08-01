/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - 4Sum
 * 
 * Problem: Find all unique quadruplets that sum to target
 * 
 * Example:
 * Input: nums = [1,0,-1,0,-2,2], target = 0
 * Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
 * 
 * Approach 1: Optimized Two-Pointer (User's Implementation)
 * Time Complexity: O(n³)
 * Space Complexity: O(1) excluding output
 * 
 * Approach 2: Brute Force
 * Time Complexity: O(n⁴)
 * Space Complexity: O(1) excluding output
 * 
 * Approach 3: HashMap Approach
 * Time Complexity: O(n³)
 * Space Complexity: O(n²)
 */

import java.util.*;

public class FourSum {
    
    /**
     * Approach 1: Optimized Two-Pointer (User's Implementation)
     * 
     * Algorithm:
     * 1. Sort the array
     * 2. Use four nested loops with two-pointer optimization
     * 3. Skip duplicates at each level
     * 4. Use two-pointer for last two elements
     * 5. Handle overflow with long type
     * 
     * Time Complexity: O(n³) - three nested loops
     * Space Complexity: O(1) excluding output
     */
    public static List<List<Integer>> fourSumOptimized(int[] nums, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums);
        int n = nums.length;
        
        for (int i = 0; i < n - 3; i++) {
            // Skip duplicates for first element
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            
            for (int j = i + 1; j < n - 2; j++) {
                // Skip duplicates for second element
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                
                int left = j + 1;
                int right = n - 1;
                
                while (left < right) {
                    long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];
                    
                    if (sum == target) {
                        List<Integer> quadruplet = new ArrayList<>();
                        quadruplet.add(nums[i]);
                        quadruplet.add(nums[j]);
                        quadruplet.add(nums[left]);
                        quadruplet.add(nums[right]);
                        result.add(quadruplet);
                        
                        // Skip duplicates for third and fourth elements
                        while (left < right && nums[left] == nums[left + 1]) left++;
                        while (left < right && nums[right] == nums[right - 1]) right--;
                        left++;
                        right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }
        
        return result;
    }
    
    /**
     * Approach 2: Brute Force
     * 
     * Algorithm:
     * 1. Use four nested loops
     * 2. Check all possible combinations
     * 3. Skip duplicates manually
     * 
     * Time Complexity: O(n⁴) - four nested loops
     * Space Complexity: O(1) excluding output
     */
    public static List<List<Integer>> fourSumBruteForce(int[] nums, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums);
        int n = nums.length;
        
        for (int i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            
            for (int j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                
                for (int k = j + 1; k < n - 1; k++) {
                    if (k > j + 1 && nums[k] == nums[k - 1]) continue;
                    
                    for (int l = k + 1; l < n; l++) {
                        if (l > k + 1 && nums[l] == nums[l - 1]) continue;
                        
                        if (nums[i] + nums[j] + nums[k] + nums[l] == target) {
                            List<Integer> quadruplet = new ArrayList<>();
                            quadruplet.add(nums[i]);
                            quadruplet.add(nums[j]);
                            quadruplet.add(nums[k]);
                            quadruplet.add(nums[l]);
                            result.add(quadruplet);
                        }
                    }
                }
            }
        }
        
        return result;
    }
    
    /**
     * Approach 3: HashMap Approach
     * 
     * Algorithm:
     * 1. Use HashMap to store pair sums
     * 2. Find complementary pairs
     * 3. Handle duplicates carefully
     * 
     * Time Complexity: O(n³)
     * Space Complexity: O(n²)
     */
    public static List<List<Integer>> fourSumHashMap(int[] nums, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums);
        int n = nums.length;
        
        for (int i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            
            for (int j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                
                Map<Integer, List<int[]>> pairSum = new HashMap<>();
                
                for (int k = j + 1; k < n; k++) {
                    if (k > j + 1 && nums[k] == nums[k - 1]) continue;
                    
                    int complement = target - nums[i] - nums[j] - nums[k];
                    
                    if (pairSum.containsKey(complement)) {
                        for (int[] pair : pairSum.get(complement)) {
                            List<Integer> quadruplet = new ArrayList<>();
                            quadruplet.add(nums[i]);
                            quadruplet.add(nums[j]);
                            quadruplet.add(pair[0]);
                            quadruplet.add(pair[1]);
                            result.add(quadruplet);
                        }
                    }
                    
                    // Add current pair
                    int currentSum = nums[j] + nums[k];
                    pairSum.computeIfAbsent(currentSum, k1 -> new ArrayList<>()).add(new int[]{nums[j], nums[k]});
                }
            }
        }
        
        return result;
    }
    
    /**
     * Approach 4: Optimized with Early Exit
     * 
     * Algorithm:
     * 1. Sort array and use two-pointer approach
     * 2. Add early exit conditions
     * 3. More aggressive duplicate skipping
     * 
     * Time Complexity: O(n³)
     * Space Complexity: O(1) excluding output
     */
    public static List<List<Integer>> fourSumOptimizedWithEarlyExit(int[] nums, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums);
        int n = nums.length;
        
        for (int i = 0; i < n - 3; i++) {
            // Early exit conditions
            if (nums[i] * 4 > target) break;
            if (nums[i] + nums[n - 1] * 3 < target) continue;
            
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            
            for (int j = i + 1; j < n - 2; j++) {
                // Early exit conditions
                if (nums[i] + nums[j] * 3 > target) break;
                if (nums[i] + nums[j] + nums[n - 1] * 2 < target) continue;
                
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                
                int left = j + 1;
                int right = n - 1;
                
                while (left < right) {
                    long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];
                    
                    if (sum == target) {
                        List<Integer> quadruplet = new ArrayList<>();
                        quadruplet.add(nums[i]);
                        quadruplet.add(nums[j]);
                        quadruplet.add(nums[left]);
                        quadruplet.add(nums[right]);
                        result.add(quadruplet);
                        
                        // Skip duplicates
                        while (left < right && nums[left] == nums[left + 1]) left++;
                        while (left < right && nums[right] == nums[right - 1]) right--;
                        left++;
                        right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }
        
        return result;
    }
    
    /**
     * Helper method to visualize the optimized approach
     */
    public static void visualizeOptimizedApproach(int[] nums, int target) {
        System.out.println("=== Optimized Approach Visualization ===");
        System.out.println("Array: " + Arrays.toString(nums));
        System.out.println("Target: " + target);
        System.out.println();
        
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums);
        int n = nums.length;
        
        System.out.println("Sorted array: " + Arrays.toString(nums));
        System.out.println();
        
        System.out.println("Step\ti\tj\tleft\tright\tsum\tAction");
        System.out.println("----\t-\t-\t-----\t-----\t---\t------");
        
        int step = 1;
        for (int i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) {
                System.out.println(step + "\t" + i + "\t-\t-\t-\t-\tSkip duplicate i");
                step++;
                continue;
            }
            
            for (int j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) {
                    System.out.println(step + "\t" + i + "\t" + j + "\t-\t-\t-\tSkip duplicate j");
                    step++;
                    continue;
                }
                
                int left = j + 1;
                int right = n - 1;
                
                while (left < right) {
                    long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];
                    
                    System.out.print(step + "\t" + i + "\t" + j + "\t" + left + "\t" + right + "\t" + sum + "\t");
                    
                    if (sum == target) {
                        System.out.println("Found quadruplet: [" + nums[i] + "," + nums[j] + "," + nums[left] + "," + nums[right] + "]");
                        result.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));
                        
                        while (left < right && nums[left] == nums[left + 1]) left++;
                        while (left < right && nums[right] == nums[right - 1]) right--;
                        left++;
                        right--;
                    } else if (sum < target) {
                        System.out.println("Sum < target, move left");
                        left++;
                    } else {
                        System.out.println("Sum > target, move right");
                        right--;
                    }
                    step++;
                }
            }
        }
        
        System.out.println("\nFinal Result: " + result);
        System.out.println();
    }
    
    /**
     * Performance comparison of different approaches
     */
    public static void compareApproaches(int[] nums, int target) {
        System.out.println("=== Performance Comparison ===");
        System.out.println("Array: " + Arrays.toString(nums));
        System.out.println("Target: " + target);
        System.out.println("Array length: " + nums.length);
        System.out.println();
        
        // Test all approaches
        long startTime, endTime;
        
        // Optimized approach
        startTime = System.nanoTime();
        List<List<Integer>> result1 = fourSumOptimized(nums, target);
        endTime = System.nanoTime();
        System.out.println("Optimized Approach:");
        System.out.println("  Result: " + result1);
        System.out.println("  Count: " + result1.size());
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(1) excluding output");
        System.out.println();
        
        // Brute Force approach
        startTime = System.nanoTime();
        List<List<Integer>> result2 = fourSumBruteForce(nums, target);
        endTime = System.nanoTime();
        System.out.println("Brute Force Approach:");
        System.out.println("  Result: " + result2);
        System.out.println("  Count: " + result2.size());
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(1) excluding output");
        System.out.println();
        
        // HashMap approach
        startTime = System.nanoTime();
        List<List<Integer>> result3 = fourSumHashMap(nums, target);
        endTime = System.nanoTime();
        System.out.println("HashMap Approach:");
        System.out.println("  Result: " + result3);
        System.out.println("  Count: " + result3.size());
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(n²)");
        System.out.println();
        
        // Optimized with early exit
        startTime = System.nanoTime();
        List<List<Integer>> result4 = fourSumOptimizedWithEarlyExit(nums, target);
        endTime = System.nanoTime();
        System.out.println("Optimized with Early Exit:");
        System.out.println("  Result: " + result4);
        System.out.println("  Count: " + result4.size());
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(1) excluding output");
        System.out.println();
        
        // Verify all results are same
        boolean allSame = result1.size() == result2.size() && 
                         result2.size() == result3.size() && 
                         result3.size() == result4.size();
        System.out.println("All approaches give same count: " + allSame);
        System.out.println();
    }
    
    /**
     * Demonstrate the 4Sum concept
     */
    public static void demonstrateFourSum() {
        System.out.println("=== 4Sum Concept ===");
        System.out.println("4Sum is an extension of 3Sum and 2Sum problems.");
        System.out.println("It finds all unique quadruplets that sum to target.");
        System.out.println();
        
        System.out.println("Key Insights:");
        System.out.println("1. Sort array first for efficient duplicate skipping");
        System.out.println("2. Use nested loops with two-pointer optimization");
        System.out.println("3. Skip duplicates at each level to avoid duplicates");
        System.out.println("4. Handle integer overflow with long type");
        System.out.println("5. Early exit conditions can improve performance");
        System.out.println();
        
        System.out.println("Algorithm Steps:");
        System.out.println("1. Sort the array");
        System.out.println("2. Fix first two elements (i, j)");
        System.out.println("3. Use two-pointer for remaining two elements (left, right)");
        System.out.println("4. Skip duplicates at each level");
        System.out.println("5. Handle overflow with long arithmetic");
        System.out.println();
    }
    
    /**
     * Demonstrate different test cases
     */
    public static void demonstrateTestCases() {
        System.out.println("=== Test Cases Demonstration ===");
        
        Object[][] testCases = {
            {new int[]{1, 0, -1, 0, -2, 2}, 0, "Basic case"},
            {new int[]{2, 2, 2, 2, 2}, 8, "All same elements"},
            {new int[]{-2, -1, 0, 0, 1, 2}, 0, "Sorted case"},
            {new int[]{1, 1, 1, 1}, 4, "All ones"},
            {new int[]{-1, 0, 1, 2, -1, -4}, 0, "Negative target"},
            {new int[]{1, 2, 3, 4, 5, 6, 7, 8}, 15, "Increasing sequence"},
        };
        
        for (int i = 0; i < testCases.length; i++) {
            int[] nums = (int[]) testCases[i][0];
            int target = (int) testCases[i][1];
            String description = (String) testCases[i][2];
            
            System.out.println("Test Case " + (i + 1) + " (" + description + "):");
            System.out.println("Input: " + Arrays.toString(nums) + ", Target: " + target);
            
            List<List<Integer>> result = fourSumOptimized(nums, target);
            System.out.println("Output: " + result);
            System.out.println("Count: " + result.size());
            System.out.println();
        }
    }
    
    public static void main(String[] args) {
        // Test cases
        Object[][] testCases = {
            {new int[]{1, 0, -1, 0, -2, 2}, 0},  // Expected: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
            {new int[]{2, 2, 2, 2, 2}, 8},        // Expected: [[2,2,2,2]]
            {new int[]{-2, -1, 0, 0, 1, 2}, 0},   // Expected: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
            {new int[]{1, 1, 1, 1}, 4},           // Expected: [[1,1,1,1]]
            {new int[]{-1, 0, 1, 2, -1, -4}, 0},  // Expected: []
        };
        
        System.out.println("=== 4Sum - Test Cases ===\n");
        
        for (int i = 0; i < testCases.length; i++) {
            System.out.println("Test Case " + (i + 1) + ":");
            int[] nums = (int[]) testCases[i][0];
            int target = (int[]) testCases[i][1];
            System.out.println("Input: " + Arrays.toString(nums) + ", Target: " + target);
            
            List<List<Integer>> result = fourSumOptimized(nums, target);
            System.out.println("Output: " + result);
            System.out.println();
        }
        
        // Detailed analysis with visualization
        System.out.println("=== Detailed Analysis ===");
        visualizeOptimizedApproach(new int[]{1, 0, -1, 0, -2, 2}, 0);
        
        // Performance comparison
        compareApproaches(new int[]{1, 0, -1, 0, -2, 2, 3, -3, 4, -4}, 0);
        
        // Demonstrate concepts
        demonstrateFourSum();
        demonstrateTestCases();
        
        System.out.println("=== Key Insights ===");
        System.out.println("1. Optimized approach uses O(n³) time complexity");
        System.out.println("2. Brute force is O(n⁴) but easy to understand");
        System.out.println("3. Sort array first for efficient duplicate skipping");
        System.out.println("4. Use long type to handle integer overflow");
        System.out.println("5. Skip duplicates at each level to avoid duplicate results");
    }
} 