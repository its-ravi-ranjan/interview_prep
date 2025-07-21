/**
 * SEARCH IN ROTATED SORTED ARRAY II (WITH DUPLICATES)
 * 
 * Problem: Given a sorted array with duplicates that has been rotated at an unknown pivot, 
 * find if target element exists in the array.
 * 
 * Approach: Modified Binary Search with Duplicate Handling
 * 1. Find mid element and check if it equals target
 * 2. Handle duplicates: if nums[left] == nums[mid] == nums[right], 
 *    increment left and decrement right to skip duplicates
 * 3. Check if left half is sorted (nums[left] <= nums[mid])
 * 4. If left half is sorted:
 *    - If target is in left half range, search left
 *    - Else search right
 * 5. If right half is sorted:
 *    - If target is in right half range, search right
 *    - Else search left
 * 6. Continue until target found or search space exhausted
 * 
 * Time Complexity: O(n) worst case when all elements are duplicates
 * Space Complexity: O(1) constant space
 */
class SearchRotatedSortedArrayType2 {
    
    search(nums, target) {
        let left = 0;
        let right = nums.length - 1;
        
        while (left <= right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            // Found target
            if (nums[mid] === target) {
                return true;
            }
            
            // Handle duplicates: skip duplicates from both ends
            if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
                left++;
                right--;
            }
            // Check if left half is sorted
            else if (nums[left] <= nums[mid]) {
                // Target is in left half
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // Right half is sorted
                // Target is in right half
                if (target <= nums[right] && target > nums[mid]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        
        return false;
    }
    
    // Alternative approach with more explicit duplicate handling
    searchDetailed(nums, target) {
        let left = 0;
        let right = nums.length - 1;
        
        while (left <= right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (nums[mid] === target) {
                return true;
            }
            
            // Handle the case where all three elements are equal
            if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
                // Skip duplicates from both ends
                left++;
                right--;
                continue;
            }
            
            // Determine which half is sorted
            const leftSorted = nums[left] <= nums[mid];
            
            if (leftSorted) {
                // Left half is sorted
                if (nums[left] <= target && target < nums[mid]) {
                    // Target is in sorted left half
                    right = mid - 1;
                } else {
                    // Target is in unsorted right half
                    left = mid + 1;
                }
            } else {
                // Right half is sorted
                if (nums[mid] < target && target <= nums[right]) {
                    // Target is in sorted right half
                    left = mid + 1;
                } else {
                    // Target is in unsorted left half
                    right = mid - 1;
                }
            }
        }
        
        return false;
    }
}

// Simple test
const solution = new SearchRotatedSortedArrayType2();

// Test case 1
const nums1 = [2, 5, 6, 0, 0, 1, 2];
const target1 = 0;
console.log(solution.search(nums1, target1)); // Expected: true

// Test case 2
const nums2 = [2, 5, 6, 0, 0, 1, 2];
const target2 = 3;
console.log(solution.search(nums2, target2)); // Expected: false 