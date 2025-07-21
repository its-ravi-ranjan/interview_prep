/**
 * RANGE SUM QUERY - IMMUTABLE
 * 
 * Problem: Given an integer array nums, handle multiple queries of the following type:
 * Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
 * 
 * Approach: Prefix Sum (Cumulative Sum)
 * 1. Create a prefix sum array of size n+1
 * 2. prefix[0] = 0 (base case)
 * 3. prefix[i+1] = prefix[i] + nums[i] for all i
 * 4. To get sum from left to right: prefix[right+1] - prefix[left]
 * 5. This gives O(1) query time after O(n) preprocessing
 * 
 * Note: If i and j are excluded, use: prefix[right] - prefix[left+1]
 * 
 * Time Complexity: O(n) for constructor, O(1) for sumRange
 * Space Complexity: O(n) for prefix array
 */
class RangeSumQuery {
    constructor(nums) {
        this.prefix = new Array(nums.length + 1);
        this.prefix[0] = 0;
        for (let i = 0; i < nums.length; i++) {
            this.prefix[i + 1] = this.prefix[i] + nums[i];
        }
    }
    
    sumRange(left, right) {
        return this.prefix[right + 1] - this.prefix[left];
    }
}

// Simple test
const nums = [1, 2, 3, 4, 5];
const obj = new RangeSumQuery(nums);
console.log(obj.sumRange(0, 2)); // 6
console.log(obj.sumRange(1, 3)); // 9 