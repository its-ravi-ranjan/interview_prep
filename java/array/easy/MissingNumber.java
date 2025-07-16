package array.easy;

/**
 * Missing Number
 * 
 * Problem:
 * Given an array nums containing n distinct numbers in the range [0, n],
 * return the only number in the range that is missing from the array.
 * 
 * Example:
 * Input: nums = [3,0,1]
 * Output: 2
 * Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3].
 * 2 is the missing number since it does not appear in nums.
 * 
 * Approaches:
 * 1. Brute-force with Sorting:
 *    - Sort the array
 *    - Check for gaps between consecutive numbers
 *    - Handle edge cases (missing 0 or n)
 *    Time Complexity: O(n log n) - Due to sorting
 *    Space Complexity: O(1) - In-place sorting
 * 
 * 2. Optimal using Sum Formula:
 *    - Calculate expected sum using formula: n * (n + 1) / 2
 *    - Calculate actual sum of array elements
 *    - Missing number = expected sum - actual sum
 *    Time Complexity: O(n) - Single pass through array
 *    Space Complexity: O(1) - Constant extra space
 */
public class MissingNumber {
    
    /**
     * Brute-force Solution using Sorting
     * Time: O(n log n), Space: O(1)
     * 
     * @param nums Array of distinct numbers in range [0, n]
     * @return The missing number
     */
    public int missingNumberBruteForce(int[] nums) {
        // Step 1: Sort the array
        java.util.Arrays.sort(nums);
        
        // Step 2: Check if 0 is missing
        if (nums[0] != 0) return 0;
        
        // Step 3: Check for gaps between consecutive numbers
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[i - 1] + 1) {
                return nums[i - 1] + 1;
            }
        }
        
        // Step 4: If no gap found, n is missing
        return nums.length;
    }
    
    /**
     * Optimal Solution using Sum Formula
     * Time: O(n), Space: O(1)
     * 
     * @param nums Array of distinct numbers in range [0, n]
     * @return The missing number
     */
    public int missingNumber(int[] nums) {
        // Step 1: Calculate expected sum using formula
        int n = nums.length;
        long expectedSum = ((long) n * (n + 1)) / 2;  // Using long to prevent overflow
        
        // Step 2: Calculate actual sum of array elements
        long actualSum = 0;
        for (int num : nums) {
            actualSum += num;
        }
        
        // Step 3: Return the difference
        return (int) (expectedSum - actualSum);
    }
    
    // Test cases
    public static void main(String[] args) {
        MissingNumber solution = new MissingNumber();
        
        // Test case 1: Basic case
        int[] nums1 = {3, 0, 1};
        System.out.println("Test 1 (Optimal): " + solution.missingNumber(nums1));  // Expected: 2
        System.out.println("Test 1 (Brute): " + solution.missingNumberBruteForce(nums1));  // Expected: 2
        
        // Test case 2: Missing 0
        int[] nums2 = {1, 2, 3};
        System.out.println("Test 2 (Optimal): " + solution.missingNumber(nums2));  // Expected: 0
        System.out.println("Test 2 (Brute): " + solution.missingNumberBruteForce(nums2));  // Expected: 0
        
        // Test case 3: Missing last number
        int[] nums3 = {0, 1, 2};
        System.out.println("Test 3 (Optimal): " + solution.missingNumber(nums3));  // Expected: 3
        System.out.println("Test 3 (Brute): " + solution.missingNumberBruteForce(nums3));  // Expected: 3
        
        // Test case 4: Single element
        int[] nums4 = {0};
        System.out.println("Test 4 (Optimal): " + solution.missingNumber(nums4));  // Expected: 1
        System.out.println("Test 4 (Brute): " + solution.missingNumberBruteForce(nums4));  // Expected: 1
        
        // Test case 5: Empty array
        int[] nums5 = {};
        System.out.println("Test 5 (Optimal): " + solution.missingNumber(nums5));  // Expected: 0
        System.out.println("Test 5 (Brute): " + solution.missingNumberBruteForce(nums5));  // Expected: 0
        
        // Performance comparison
        System.out.println("\nPerformance comparison with large array:");
        int[] largeArray = new int[1000000];
        for (int i = 0; i < largeArray.length; i++) {
            largeArray[i] = i;
        }
        // Remove a random number
        int randomIndex = (int) (Math.random() * largeArray.length);
        largeArray[randomIndex] = largeArray[largeArray.length - 1];
        largeArray = java.util.Arrays.copyOf(largeArray, largeArray.length - 1);
        
        // Test optimal solution
        long startTime = System.nanoTime();
        solution.missingNumber(largeArray);
        long endTime = System.nanoTime();
        System.out.println("Optimal solution time: " + (endTime - startTime) / 1000000.0 + " ms");
        
        // Test brute force solution
        startTime = System.nanoTime();
        solution.missingNumberBruteForce(largeArray);
        endTime = System.nanoTime();
        System.out.println("Brute force solution time: " + (endTime - startTime) / 1000000.0 + " ms");
    }
} 