/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Majority Element II (Elements appearing more than ⌊n/3⌋ times)
 * 
 * Problem: Given an integer array of size n, find all elements that appear more than ⌊n/3⌋ times.
 * 
 * Example:
 * Input: nums = [3,2,3]
 * Output: [3]
 * 
 * Input: nums = [1,1,1,3,3,2,2,2]
 * Output: [1,2]
 * 
 * Approach 1: HashMap (User's Solution)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * Approach 2: Boyer-Moore Voting Algorithm (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * Approach 3: Sorting
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) (excluding sorting space)
 */

import java.util.*;

public class MajorityElementII {
    
    /**
     * Approach 1: HashMap Solution (User's Implementation)
     * 
     * Algorithm:
     * 1. Use HashMap to count frequency of each element
     * 2. Check if frequency > n/3 for each element
     * 3. Add to result list if condition is met
     * 
     * Time Complexity: O(n) - single pass through array
     * Space Complexity: O(n) - HashMap to store frequencies
     */
    public static List<Integer> majorityElementHashMap(int[] nums) {
        Map<Integer, Integer> map = new HashMap<>();
        List<Integer> result = new ArrayList<>();
        int threshold = nums.length / 3;
        
        for (int num : nums) {
            map.put(num, map.getOrDefault(num, 0) + 1);
            if (map.get(num) > threshold && !result.contains(num)) {
                result.add(num);
            }
        }
        
        return result;
    }
    
    /**
     * Approach 2: Boyer-Moore Voting Algorithm (Optimal)
     * 
     * Algorithm:
     * 1. Since we need elements appearing > n/3 times, there can be at most 2 such elements
     * 2. Use two candidates and their counters
     * 3. First pass: find potential candidates
     * 4. Second pass: verify candidates appear > n/3 times
     * 
     * Time Complexity: O(n) - two passes through array
     * Space Complexity: O(1) - only constant extra space
     */
    public static List<Integer> majorityElementBoyerMoore(int[] nums) {
        List<Integer> result = new ArrayList<>();
        
        if (nums == null || nums.length == 0) {
            return result;
        }
        
        // Step 1: Find potential candidates
        int candidate1 = 0, candidate2 = 0;
        int count1 = 0, count2 = 0;
        
        for (int num : nums) {
            if (num == candidate1) {
                count1++;
            } else if (num == candidate2) {
                count2++;
            } else if (count1 == 0) {
                candidate1 = num;
                count1 = 1;
            } else if (count2 == 0) {
                candidate2 = num;
                count2 = 1;
            } else {
                count1--;
                count2--;
            }
        }
        
        // Step 2: Verify candidates appear more than n/3 times
        count1 = 0;
        count2 = 0;
        
        for (int num : nums) {
            if (num == candidate1) {
                count1++;
            } else if (num == candidate2) {
                count2++;
            }
        }
        
        int threshold = nums.length / 3;
        
        if (count1 > threshold) {
            result.add(candidate1);
        }
        if (count2 > threshold) {
            result.add(candidate2);
        }
        
        return result;
    }
    
    /**
     * Approach 3: Sorting Solution
     * 
     * Algorithm:
     * 1. Sort the array
     * 2. Count consecutive occurrences of each element
     * 3. Add to result if count > n/3
     * 
     * Time Complexity: O(n log n) - sorting dominates
     * Space Complexity: O(1) - excluding sorting space
     */
    public static List<Integer> majorityElementSorting(int[] nums) {
        List<Integer> result = new ArrayList<>();
        
        if (nums == null || nums.length == 0) {
            return result;
        }
        
        Arrays.sort(nums);
        int threshold = nums.length / 3;
        int count = 1;
        int current = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == current) {
                count++;
            } else {
                if (count > threshold) {
                    result.add(current);
                }
                current = nums[i];
                count = 1;
            }
        }
        
        // Check last element
        if (count > threshold) {
            result.add(current);
        }
        
        return result;
    }
    
    /**
     * Approach 4: HashMap with Single Pass (Optimized)
     * 
     * Algorithm:
     * 1. Use HashMap to count frequencies
     * 2. Check threshold condition in same loop
     * 3. Use Set to avoid duplicates
     * 
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    public static List<Integer> majorityElementHashMapOptimized(int[] nums) {
        Map<Integer, Integer> map = new HashMap<>();
        Set<Integer> result = new HashSet<>();
        int threshold = nums.length / 3;
        
        for (int num : nums) {
            int count = map.getOrDefault(num, 0) + 1;
            map.put(num, count);
            
            if (count > threshold) {
                result.add(num);
            }
        }
        
        return new ArrayList<>(result);
    }
    
    /**
     * Helper method to visualize the voting process
     */
    public static void visualizeBoyerMoore(int[] nums) {
        System.out.println("=== Boyer-Moore Voting Algorithm Visualization ===");
        System.out.println("Array: " + Arrays.toString(nums));
        System.out.println("Threshold: " + nums.length / 3);
        
        int candidate1 = 0, candidate2 = 0;
        int count1 = 0, count2 = 0;
        
        System.out.println("\nStep 1: Finding Candidates");
        System.out.println("Index\tElement\tCandidate1\tCount1\tCandidate2\tCount2");
        System.out.println("-----\t-------\t----------\t------\t----------\t------");
        
        for (int i = 0; i < nums.length; i++) {
            int num = nums[i];
            
            if (num == candidate1) {
                count1++;
            } else if (num == candidate2) {
                count2++;
            } else if (count1 == 0) {
                candidate1 = num;
                count1 = 1;
            } else if (count2 == 0) {
                candidate2 = num;
                count2 = 1;
            } else {
                count1--;
                count2--;
            }
            
            System.out.printf("%d\t%d\t%d\t\t%d\t%d\t\t%d%n", 
                i, num, candidate1, count1, candidate2, count2);
        }
        
        System.out.println("\nCandidates found: " + candidate1 + ", " + candidate2);
        
        // Verify candidates
        count1 = 0;
        count2 = 0;
        
        for (int num : nums) {
            if (num == candidate1) count1++;
            else if (num == candidate2) count2++;
        }
        
        System.out.println("Final counts:");
        System.out.println("Candidate " + candidate1 + ": " + count1 + " times");
        System.out.println("Candidate " + candidate2 + ": " + count2 + " times");
        
        List<Integer> result = new ArrayList<>();
        int threshold = nums.length / 3;
        
        if (count1 > threshold) result.add(candidate1);
        if (count2 > threshold) result.add(candidate2);
        
        System.out.println("Result: " + result);
        System.out.println();
    }
    
    /**
     * Performance comparison of different approaches
     */
    public static void compareApproaches(int[] nums) {
        System.out.println("=== Performance Comparison ===");
        System.out.println("Array: " + Arrays.toString(nums));
        System.out.println("Array length: " + nums.length);
        System.out.println("Threshold: " + nums.length / 3);
        System.out.println();
        
        // Test all approaches
        long startTime, endTime;
        
        // HashMap approach
        startTime = System.nanoTime();
        List<Integer> result1 = majorityElementHashMap(nums);
        endTime = System.nanoTime();
        System.out.println("HashMap Approach:");
        System.out.println("  Result: " + result1);
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(n)");
        System.out.println();
        
        // Boyer-Moore approach
        startTime = System.nanoTime();
        List<Integer> result2 = majorityElementBoyerMoore(nums);
        endTime = System.nanoTime();
        System.out.println("Boyer-Moore Approach:");
        System.out.println("  Result: " + result2);
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(1)");
        System.out.println();
        
        // Sorting approach
        startTime = System.nanoTime();
        List<Integer> result3 = majorityElementSorting(nums);
        endTime = System.nanoTime();
        System.out.println("Sorting Approach:");
        System.out.println("  Result: " + result3);
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(1)");
        System.out.println();
        
        // HashMap Optimized approach
        startTime = System.nanoTime();
        List<Integer> result4 = majorityElementHashMapOptimized(nums);
        endTime = System.nanoTime();
        System.out.println("HashMap Optimized Approach:");
        System.out.println("  Result: " + result4);
        System.out.println("  Time: " + (endTime - startTime) + " ns");
        System.out.println("  Space: O(n)");
        System.out.println();
        
        // Verify all results are same
        boolean allSame = result1.equals(result2) && result2.equals(result3) && result3.equals(result4);
        System.out.println("All approaches give same result: " + allSame);
        System.out.println();
    }
    
    public static void main(String[] args) {
        // Test cases
        int[][] testCases = {
            {3, 2, 3},                    // Expected: [3]
            {1, 1, 1, 3, 3, 2, 2, 2},    // Expected: [1, 2]
            {1, 2, 3},                    // Expected: []
            {1, 1, 1, 1},                // Expected: [1]
            {1, 2, 3, 4, 5, 6},          // Expected: []
            {1, 1, 1, 2, 2, 2, 3},      // Expected: [1, 2]
            {1, 1, 1, 2, 2, 2, 3, 3, 3}, // Expected: []
            {1, 1, 1, 2, 2, 2, 3, 3},   // Expected: [1, 2]
        };
        
        System.out.println("=== Majority Element II - Test Cases ===\n");
        
        for (int i = 0; i < testCases.length; i++) {
            System.out.println("Test Case " + (i + 1) + ":");
            System.out.println("Input: " + Arrays.toString(testCases[i]));
            
            List<Integer> result = majorityElementBoyerMoore(testCases[i]);
            System.out.println("Output: " + result);
            System.out.println();
        }
        
        // Detailed analysis with visualization
        System.out.println("=== Detailed Analysis ===");
        visualizeBoyerMoore(new int[]{1, 1, 1, 3, 3, 2, 2, 2});
        
        // Performance comparison
        compareApproaches(new int[]{1, 1, 1, 3, 3, 2, 2, 2, 4, 4, 4, 5, 5, 5});
        
        System.out.println("=== Key Insights ===");
        System.out.println("1. Boyer-Moore is optimal for space complexity O(1)");
        System.out.println("2. HashMap is simple and efficient for time complexity O(n)");
        System.out.println("3. At most 2 elements can appear more than ⌊n/3⌋ times");
        System.out.println("4. Boyer-Moore requires two passes but uses constant space");
        System.out.println("5. Sorting approach is not optimal but easy to understand");
    }
} 