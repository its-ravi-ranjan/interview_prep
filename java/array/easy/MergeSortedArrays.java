package array.easy;

/**
 * Merge Sorted Arrays
 * 
 * Problem:
 * You are given two integer arrays nums1 and nums2, sorted in non-decreasing order,
 * and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
 * 
 * Merge nums1 and nums2 into a single array sorted in non-decreasing order.
 * The final sorted array should be stored inside the array nums1.
 * 
 * Optimal Approach:
 * We have two sorted arrays:
 * - nums1 with length m + n where the first m elements are valid
 * - nums2 with n elements
 * 
 * The goal: merge nums2 into nums1 in sorted order in-place
 * 
 * Steps:
 * 1. Start filling nums1 from the end (index m + n - 1), comparing the last elements
 *    of both arrays (nums1[m-1] and nums2[n-1])
 * 2. Place the larger element at the current last position
 * 3. Move pointers accordingly:
 *    - Decrement the pointer in nums1 or nums2
 *    - Decrement the position pointer for placement
 * 4. If nums2 is exhausted first, merging is done
 * 5. If nums1 is exhausted first, copy remaining elements of nums2
 * 
 * Time Complexity: O(m + n), where m and n are the lengths of nums1 and nums2
 * Space Complexity: O(1), as we modify nums1 in-place
 */
public class MergeSortedArrays {
    
    /**
     * Optimal Solution - O(m + n) time, O(1) space
     * 
     * @param nums1 First sorted array with extra space at the end
     * @param m Number of elements in nums1
     * @param nums2 Second sorted array
     * @param n Number of elements in nums2
     */
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        // Step 1: Initialize pointers for the end of each array
        int p1 = m - 1;  // Pointer for nums1
        int p2 = n - 1;  // Pointer for nums2
        
        // Start from the end of the merged array
        for (int i = m + n - 1; i >= 0; i--) {
            // If nums2 is exhausted, we're done
            if (p2 < 0) break;
            
            // Compare elements from both arrays and place the larger one
            if (p1 >= 0 && nums1[p1] > nums2[p2]) {
                nums1[i] = nums1[p1--];
            } else {
                nums1[i] = nums2[p2--];
            }
        }
    }
    
    /**
     * Alternative Solution 1 - Brute Force
     * Time: O((m+n) log(m+n)), Space: O(1)
     */
    public void mergeBruteForce(int[] nums1, int m, int[] nums2, int n) {
        // Copy nums2 into nums1
        for (int i = m; i < nums1.length; i++) {
            nums1[i] = nums2[i - m];
        }
        // Sort the entire array
        java.util.Arrays.sort(nums1);
    }
    
    /**
     * Alternative Solution 2 - Two Pointer with Extra Space
     * Time: O(m + n), Space: O(m)
     */
    public void mergeWithExtraSpace(int[] nums1, int m, int[] nums2, int n) {
        int[] nums1Copy = new int[m];
        System.arraycopy(nums1, 0, nums1Copy, 0, m);
        
        int p1 = 0;  // Pointer for nums1Copy
        int p2 = 0;  // Pointer for nums2
        
        for (int i = 0; i < m + n; i++) {
            if (p2 >= n || (p1 < m && nums1Copy[p1] < nums2[p2])) {
                nums1[i] = nums1Copy[p1++];
            } else {
                nums1[i] = nums2[p2++];
            }
        }
    }
    
    // Test cases
    public static void main(String[] args) {
        MergeSortedArrays solution = new MergeSortedArrays();
        
        // Test case 1
        int[] nums1 = {1, 2, 3, 0, 0, 0};
        int[] nums2 = {2, 5, 6};
        solution.merge(nums1, 3, nums2, 3);
        System.out.println("Test 1: " + java.util.Arrays.toString(nums1));  // Expected: [1, 2, 2, 3, 5, 6]
        
        // Test case 2
        nums1 = new int[]{1};
        nums2 = new int[]{};
        solution.merge(nums1, 1, nums2, 0);
        System.out.println("Test 2: " + java.util.Arrays.toString(nums1));  // Expected: [1]
        
        // Test case 3
        nums1 = new int[]{0};
        nums2 = new int[]{1};
        solution.merge(nums1, 0, nums2, 1);
        System.out.println("Test 3: " + java.util.Arrays.toString(nums1));  // Expected: [1]
        
        // Test case 4
        nums1 = new int[]{2, 0};
        nums2 = new int[]{1};
        solution.merge(nums1, 1, nums2, 1);
        System.out.println("Test 4: " + java.util.Arrays.toString(nums1));  // Expected: [1, 2]
        
        // Test all solutions
        System.out.println("\nTesting all solutions with the same input:");
        int[] testNums1 = {1, 2, 3, 0, 0, 0};
        int[] testNums2 = {2, 5, 6};
        
        // Test optimal solution
        solution.merge(testNums1, 3, testNums2, 3);
        System.out.println("Optimal Solution: " + java.util.Arrays.toString(testNums1));
        
        // Reset arrays
        testNums1 = new int[]{1, 2, 3, 0, 0, 0};
        testNums2 = new int[]{2, 5, 6};
        
        // Test brute force solution
        solution.mergeBruteForce(testNums1, 3, testNums2, 3);
        System.out.println("Brute Force Solution: " + java.util.Arrays.toString(testNums1));
        
        // Reset arrays
        testNums1 = new int[]{1, 2, 3, 0, 0, 0};
        testNums2 = new int[]{2, 5, 6};
        
        // Test solution with extra space
        solution.mergeWithExtraSpace(testNums1, 3, testNums2, 3);
        System.out.println("Solution with Extra Space: " + java.util.Arrays.toString(testNums1));
    }
} 