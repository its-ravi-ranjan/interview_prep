/**
 * CHECK IF ARRAY IS SORTED AND ROTATED
 * 
 * Problem: Given an array nums, return true if the array was originally sorted in non-decreasing order, 
 * then rotated some number of positions (including zero). Otherwise, return false.
 * 
 * Approach: Count Inversions
 * 1. Count the number of times an element is greater than the next element
 * 2. For the last element, compare with the first element
 * 3. If count <= 1, the array can be sorted and rotated
 * 4. If count > 1, the array cannot be sorted and rotated
 * 
 * Note: A sorted and rotated array has at most one inversion point
 * 
 * Time Complexity: O(n) where n is the length of array
 * Space Complexity: O(1) constant space
 */
class CheckArraySortedAndRotated {
    
    check(nums) {
        let count = 0;
        
        for (let i = 0; i < nums.length; i++) {
            if (i === nums.length - 1) {
                // Compare last element with first element
                if (nums[i] > nums[0]) {
                    count++;
                }
            } else {
                // Compare current element with next element
                if (nums[i] > nums[i + 1]) {
                    count++;
                }
            }
        }
        
        return count <= 1;
    }
    
    // Alternative approach with more explicit logic
    checkDetailed(nums) {
        let inversions = 0;
        
        for (let i = 0; i < nums.length; i++) {
            const nextIndex = (i + 1) % nums.length; // Handle wrap-around
            const current = nums[i];
            const next = nums[nextIndex];
            
            if (current > next) {
                inversions++;
            }
        }
        
        // Array is sorted and rotated if there's at most one inversion
        return inversions <= 1;
    }
    
    // Another approach using separate loops for clarity
    checkSeparate(nums) {
        let count = 0;
        
        // Check inversions in the middle of array
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                count++;
            }
        }
        
        // Check inversion between last and first element
        if (nums[nums.length - 1] > nums[0]) {
            count++;
        }
        
        return count <= 1;
    }
}

// Simple test
const solution = new CheckArraySortedAndRotated();

// Test case 1
const nums1 = [3, 4, 5, 1, 2];
console.log(solution.check(nums1)); // Expected: true

// Test case 2
const nums2 = [2, 1, 3, 4];
console.log(solution.check(nums2)); // Expected: false 