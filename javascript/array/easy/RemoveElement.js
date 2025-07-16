/**
 * Remove Element
 * 
 * Problem:
 * Given an integer array nums and an integer val, remove all occurrences of val in-place.
 * The order of the elements may be changed. Then return the number of elements in nums
 * which are not equal to val.
 * 
 * Example:
 * Input: nums = [3,2,2,3], val = 3
 * Output: 2, nums = [2,2,_,_]
 * 
 * Important Points:
 * 1. Must modify array in-place
 * 2. Cannot use extra arrays
 * 3. Return value k represents number of elements not equal to val
 * 4. First k elements should contain elements not equal to val
 * 5. Order of elements can be changed
 * 
 * Approach: Two Pointer Technique
 * - Use pointer x to track where next non-val element should go
 * - Traverse array with index i
 * - If nums[i] != val, assign nums[x] = nums[i] and increment x
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

class RemoveElement {
    removeElement(nums, val) {
        let x = 0; // Pointer to track position for next non-val element
        
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] !== val) {
                nums[x] = nums[i];
                x++;
            }
        }
        
        return x;
    }
}

// Test cases
function runTests() {
    const solution = new RemoveElement();
    
    // Test case 1: Basic case
    console.log("Test case 1: nums = [3,2,2,3], val = 3");
    let nums1 = [3, 2, 2, 3];
    console.log("Result:", solution.removeElement([...nums1], 3));

    // Test case 2: No occurrences of val
    console.log("\nTest case 2: nums = [1,2,3,4], val = 5");
    let nums2 = [1, 2, 3, 4];
    console.log("Result:", solution.removeElement([...nums2], 5));

    // Test case 3: All elements equal to val
    console.log("\nTest case 3: nums = [2,2,2,2], val = 2");
    let nums3 = [2, 2, 2, 2];
    console.log("Result:", solution.removeElement([...nums3], 2));

    // Test case 4: Empty array
    console.log("\nTest case 4: nums = [], val = 1");
    let nums4 = [];
    console.log("Result:", solution.removeElement([...nums4], 1));

    // Test case 5: Single element not equal to val
    console.log("\nTest case 5: nums = [1], val = 2");
    let nums5 = [1];
    console.log("Result:", solution.removeElement([...nums5], 2));

    // Test case 6: Single element equal to val
    console.log("\nTest case 6: nums = [1], val = 1");
    let nums6 = [1];
    console.log("Result:", solution.removeElement([...nums6], 1));

    // Test case 7: Multiple occurrences at different positions
    console.log("\nTest case 7: nums = [0,1,2,2,3,0,4,2], val = 2");
    let nums7 = [0, 1, 2, 2, 3, 0, 4, 2];
    console.log("Result:", solution.removeElement([...nums7], 2));
}

// Run the tests
runTests(); 