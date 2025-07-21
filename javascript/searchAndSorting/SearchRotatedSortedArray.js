/**
 * SEARCH IN ROTATED SORTED ARRAY
 * 
 * Problem: Given a sorted array that has been rotated at an unknown pivot, find the index of target element.
 * 
 * Approach: Modified Binary Search
 * 1. Find mid element and check if it equals target
 * 2. Check if left half is sorted (nums[left] <= nums[mid])
 * 3. If left half is sorted:
 *    - If target is in left half range, search left
 *    - Else search right
 * 4. If right half is sorted:
 *    - If target is in right half range, search right
 *    - Else search left
 * 5. Continue until target found or search space exhausted
 * 
 * Time Complexity: O(log n) where n is the length of array
 * Space Complexity: O(1) constant space
 */
class SearchRotatedSortedArray {
    
    search(nums, target) {
        let left = 0;
        let right = nums.length - 1;
        
        while (left <= right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            // Found target
            if (nums[mid] === target) {
                return mid;
            }
            
            // Check if left half is sorted
            if (nums[left] <= nums[mid]) {
                // Target is in left half
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // Right half is sorted
                // Target is in right half
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        
        return -1;
    }
    
    // Alternative approach with more explicit conditions
    searchDetailed(nums, target) {
        let left = 0;
        let right = nums.length - 1;
        
        while (left <= right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (nums[mid] === target) {
                return mid;
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
        
        return -1;
    }
}

// Simple test
const solution = new SearchRotatedSortedArray();

// Test case 1
const nums1 = [4, 5, 6, 7, 0, 1, 2];
const target1 = 0;
console.log(solution.search(nums1, target1)); // Expected: 4

// Test case 2
const nums2 = [4, 5, 6, 7, 0, 1, 2];
const target2 = 3;
console.log(solution.search(nums2, target2)); // Expected: -1 