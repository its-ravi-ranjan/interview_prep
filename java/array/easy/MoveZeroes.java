package array.easy;

/**
 * Move Zeroes
 * 
 * Problem:
 * Given an integer array nums, move all 0's to the end of it while maintaining
 * the relative order of the non-zero elements.
 * 
 * Note: You must do this in-place without making a copy of the array.
 * 
 * Approach – Two Pointers:
 * 1. Initialize a pointer x = 0
 * 2. Loop through the array:
 *    - If the current element is not 0, assign it to nums[x] and increment x
 * 3. After the loop, from index x to the end of the array, fill all values with 0
 * 
 * Time Complexity: O(n), where n is the length of the array
 * Space Complexity: O(1), as we modify the array in-place
 */
public class MoveZeroes {
    
    /**
     * Optimal Solution - Two Pointers
     * Time: O(n), Space: O(1)
     * 
     * @param nums The input array
     */
    public void moveZeroes(int[] nums) {
        // Step 1: Initialize pointer x for placing non-zero elements
        int x = 0;
        
        // Step 2: First pass - Move all non-zero elements to the front
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                // Place non-zero element at position x and increment x
                nums[x] = nums[i];
                x++;
            }
        }
        
        // Step 3: Second pass - Fill remaining positions with zeros
        for (int i = x; i < nums.length; i++) {
            nums[i] = 0;
        }
    }
    
    /**
     * Alternative Solution - Using Swap
     * Time: O(n), Space: O(1)
     * 
     * @param nums The input array
     */
    public void moveZeroesWithSwap(int[] nums) {
        int lastNonZeroFoundAt = 0;
        
        // Move all non-zero elements to the front
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                // Swap elements
                int temp = nums[lastNonZeroFoundAt];
                nums[lastNonZeroFoundAt] = nums[i];
                nums[i] = temp;
                lastNonZeroFoundAt++;
            }
        }
    }
    
    // Test cases
    public static void main(String[] args) {
        MoveZeroes solution = new MoveZeroes();
        
        // Test case 1
        int[] nums1 = {0, 1, 0, 3, 12};
        solution.moveZeroes(nums1);
        System.out.println("Test 1: " + java.util.Arrays.toString(nums1));  // Expected: [1, 3, 12, 0, 0]
        
        // Test case 2
        int[] nums2 = {0};
        solution.moveZeroes(nums2);
        System.out.println("Test 2: " + java.util.Arrays.toString(nums2));  // Expected: [0]
        
        // Test case 3
        int[] nums3 = {1, 0, 0, 0, 1};
        solution.moveZeroes(nums3);
        System.out.println("Test 3: " + java.util.Arrays.toString(nums3));  // Expected: [1, 1, 0, 0, 0]
        
        // Test case 4
        int[] nums4 = {1, 2, 3, 4, 5};
        solution.moveZeroes(nums4);
        System.out.println("Test 4: " + java.util.Arrays.toString(nums4));  // Expected: [1, 2, 3, 4, 5]
        
        // Test case 5
        int[] nums5 = {0, 0, 0, 0, 0};
        solution.moveZeroes(nums5);
        System.out.println("Test 5: " + java.util.Arrays.toString(nums5));  // Expected: [0, 0, 0, 0, 0]
        
        // Test swap solution
        System.out.println("\nTesting swap solution:");
        int[] nums6 = {0, 1, 0, 3, 12};
        solution.moveZeroesWithSwap(nums6);
        System.out.println("Swap Solution: " + java.util.Arrays.toString(nums6));  // Expected: [1, 3, 12, 0, 0]
        
        // Performance comparison
        System.out.println("\nPerformance comparison with large array:");
        int[] largeArray = new int[1000000];
        java.util.Random random = new java.util.Random();
        
        // Fill array with random numbers and some zeros
        for (int i = 0; i < largeArray.length; i++) {
            largeArray[i] = random.nextInt(10) == 0 ? 0 : random.nextInt(100);
        }
        
        // Test both solutions
        int[] array1 = largeArray.clone();
        int[] array2 = largeArray.clone();
        
        long startTime = System.nanoTime();
        solution.moveZeroes(array1);
        long endTime = System.nanoTime();
        System.out.println("Two-pointer solution time: " + (endTime - startTime) / 1000000.0 + " ms");
        
        startTime = System.nanoTime();
        solution.moveZeroesWithSwap(array2);
        endTime = System.nanoTime();
        System.out.println("Swap solution time: " + (endTime - startTime) / 1000000.0 + " ms");
    }
} 