package array.easy;

/**
 * Maximum Consecutive Ones
 * 
 * Problem:
 * Given a binary array nums, return the maximum number of consecutive 1's in the array.
 * 
 * Example:
 * Input: nums = [1,1,0,1,1,1]
 * Output: 3
 * Explanation: The first two digits or the last three digits are consecutive 1s.
 * The maximum number of consecutive 1s is 3.
 * 
 * Optimal Approach – Single Pass:
 * 1. Initialize two variables:
 *    - currentCount → to count current streak of 1s
 *    - maxCount → to keep track of the maximum streak seen so far
 * 
 * 2. Traverse the array:
 *    - If nums[i] == 1, increment currentCount
 *    - If nums[i] == 0, compare currentCount with maxCount, update maxCount,
 *      then reset currentCount to 0
 * 
 * 3. After the loop, return the maximum of maxCount and currentCount
 *    (to handle case where array ends in 1s)
 * 
 * Time Complexity: O(n) → One pass through the array of n elements
 * Space Complexity: O(1) → No extra space used beyond a few variables
 */
public class MaxConsecutiveOnes {
    
    /**
     * Optimal Solution - Single Pass
     * Time: O(n), Space: O(1)
     * 
     * @param nums Binary array containing only 0s and 1s
     * @return Maximum number of consecutive 1's
     */
    public int findMaxConsecutiveOnes(int[] nums) {
        // Step 1: Initialize counters
        int currentCount = 0;  // Count of current streak of 1s
        int maxCount = 0;      // Maximum streak of 1s seen so far
        
        // Step 2: Traverse the array
        for (int num : nums) {
            if (num == 1) {
                // Increment current streak
                currentCount++;
            } else {
                // Update max streak and reset current streak
                maxCount = Math.max(currentCount, maxCount);
                currentCount = 0;
            }
        }
        
        // Step 3: Return maximum of maxCount and currentCount
        // (to handle case where array ends in 1s)
        return Math.max(maxCount, currentCount);
    }
    
    /**
     * Alternative Solution - Using Stream
     * Time: O(n), Space: O(1)
     * Note: This is less efficient than the optimal solution due to stream overhead
     */
    public int findMaxConsecutiveOnesStream(int[] nums) {
        return java.util.Arrays.stream(nums)
            .collect(() -> new int[]{0, 0},  // [current, max]
                (acc, curr) -> {
                    if (curr == 1) {
                        acc[0]++;
                        acc[1] = Math.max(acc[0], acc[1]);
                    } else {
                        acc[0] = 0;
                    }
                },
                (acc1, acc2) -> {
                    acc1[1] = Math.max(acc1[1], acc2[1]);
                    acc1[0] = Math.max(acc1[0], acc2[0]);
                })[1];
    }
    
    // Test cases
    public static void main(String[] args) {
        MaxConsecutiveOnes solution = new MaxConsecutiveOnes();
        
        // Test case 1: Basic case
        int[] nums1 = {1, 1, 0, 1, 1, 1};
        System.out.println("Test 1: " + solution.findMaxConsecutiveOnes(nums1));  // Expected: 3
        
        // Test case 2: All ones
        int[] nums2 = {1, 1, 1, 1};
        System.out.println("Test 2: " + solution.findMaxConsecutiveOnes(nums2));  // Expected: 4
        
        // Test case 3: All zeros
        int[] nums3 = {0, 0, 0, 0};
        System.out.println("Test 3: " + solution.findMaxConsecutiveOnes(nums3));  // Expected: 0
        
        // Test case 4: Single element
        int[] nums4 = {1};
        System.out.println("Test 4: " + solution.findMaxConsecutiveOnes(nums4));  // Expected: 1
        
        // Test case 5: Empty array
        int[] nums5 = {};
        System.out.println("Test 5: " + solution.findMaxConsecutiveOnes(nums5));  // Expected: 0
        
        // Test case 6: Alternating ones and zeros
        int[] nums6 = {1, 0, 1, 0, 1};
        System.out.println("Test 6: " + solution.findMaxConsecutiveOnes(nums6));  // Expected: 1
        
        // Test case 7: Ones at the end
        int[] nums7 = {0, 0, 1, 1, 1};
        System.out.println("Test 7: " + solution.findMaxConsecutiveOnes(nums7));  // Expected: 3
        
        // Test case 8: Ones at the beginning
        int[] nums8 = {1, 1, 1, 0, 0};
        System.out.println("Test 8: " + solution.findMaxConsecutiveOnes(nums8));  // Expected: 3
        
        // Test stream solution
        System.out.println("\nTesting stream solution:");
        System.out.println("Test 1 (stream): " + solution.findMaxConsecutiveOnesStream(nums1));  // Expected: 3
        System.out.println("Test 2 (stream): " + solution.findMaxConsecutiveOnesStream(nums2));  // Expected: 4
        
        // Performance comparison
        System.out.println("\nPerformance comparison with large array:");
        int[] largeArray = new int[1000000];
        java.util.Random random = new java.util.Random();
        
        // Fill array with random binary numbers
        for (int i = 0; i < largeArray.length; i++) {
            largeArray[i] = random.nextInt(2);
        }
        
        // Test both solutions
        long startTime = System.nanoTime();
        solution.findMaxConsecutiveOnes(largeArray);
        long endTime = System.nanoTime();
        System.out.println("Optimal solution time: " + (endTime - startTime) / 1000000.0 + " ms");
        
        startTime = System.nanoTime();
        solution.findMaxConsecutiveOnesStream(largeArray);
        endTime = System.nanoTime();
        System.out.println("Stream solution time: " + (endTime - startTime) / 1000000.0 + " ms");
    }
} 