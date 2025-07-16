/**
 * Remove Duplicates from Sorted Array
 * 
 * Problem:
 * Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place
 * such that each unique element appears only once. The relative order of the elements should
 * be kept the same. Then return the number of unique elements in nums.
 * 
 * Example:
 * Input: nums = [1,1,2]
 * Output: 2, nums = [1,2,_]
 * 
 * Important Points:
 * 1. Array is sorted in non-decreasing order (nums[i] <= nums[i+1])
 * 2. Must modify array in-place
 * 3. Cannot use extra arrays
 * 4. Return value k represents number of unique elements
 * 5. First k elements should contain unique elements in original order
 * 
 * Approach 1: Using two pointers (i and j)
 * - i tracks position for next unique element
 * - j scans through array
 * - When nums[j] != nums[j-1], we found a new unique element
 * 
 * Approach 2: Using single pointer (x)
 * - x tracks last unique element's position
 * - Compare current element with last unique element
 * - If current > last unique, we found a new unique element
 * 
 * Time Complexity: O(n) for both approaches
 * Space Complexity: O(1) for both approaches
 */

class RemoveDuplicates {
    // Approach 1: Using two pointers (i and j)
    removeDuplicatesTwoPointers(nums) {
        if (nums.length < 2) return nums.length;
        
        let i = 1; // Position for next unique element
        for (let j = 1; j < nums.length; j++) {
            if (nums[j] !== nums[j - 1]) {
                nums[i] = nums[j];
                i++;
            }
        }
        return i;
    }

    // Approach 2: Using single pointer (x)
    removeDuplicatesSinglePointer(nums) {
        if (nums.length < 2) return nums.length;
        
        let x = 0; // Track last unique element's position
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] > nums[x]) {
                x++;
                nums[x] = nums[i];
            }
        }
        return x + 1;
    }
}

// Test cases
function runTests() {
    const solution = new RemoveDuplicates();
    
    // Test case 1: Basic case with duplicates
    console.log("Test case 1: [1,1,2]");
    let nums1 = [1, 1, 2];
    console.log("Two pointers approach:", solution.removeDuplicatesTwoPointers([...nums1]));
    console.log("Single pointer approach:", solution.removeDuplicatesSinglePointer([...nums1]));

    // Test case 2: No duplicates
    console.log("\nTest case 2: [1,2,3]");
    let nums2 = [1, 2, 3];
    console.log("Two pointers approach:", solution.removeDuplicatesTwoPointers([...nums2]));
    console.log("Single pointer approach:", solution.removeDuplicatesSinglePointer([...nums2]));

    // Test case 3: All duplicates
    console.log("\nTest case 3: [1,1,1]");
    let nums3 = [1, 1, 1];
    console.log("Two pointers approach:", solution.removeDuplicatesTwoPointers([...nums3]));
    console.log("Single pointer approach:", solution.removeDuplicatesSinglePointer([...nums3]));

    // Test case 4: Empty array
    console.log("\nTest case 4: []");
    let nums4 = [];
    console.log("Two pointers approach:", solution.removeDuplicatesTwoPointers([...nums4]));
    console.log("Single pointer approach:", solution.removeDuplicatesSinglePointer([...nums4]));

    // Test case 5: Single element
    console.log("\nTest case 5: [1]");
    let nums5 = [1];
    console.log("Two pointers approach:", solution.removeDuplicatesTwoPointers([...nums5]));
    console.log("Single pointer approach:", solution.removeDuplicatesSinglePointer([...nums5]));

    // Test case 6: Multiple duplicates
    console.log("\nTest case 6: [0,0,1,1,1,2,2,3,3,4]");
    let nums6 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
    console.log("Two pointers approach:", solution.removeDuplicatesTwoPointers([...nums6]));
    console.log("Single pointer approach:", solution.removeDuplicatesSinglePointer([...nums6]));
}

// Run the tests
runTests(); 