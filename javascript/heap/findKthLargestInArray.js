/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Find Kth Largest Element in Array problem
 * 
 * Problem: Find Kth Largest Element in Array
 * ------------------------------------------
 * Given an integer array nums and an integer k, return the kth largest element in the array.
 * Note that it is the kth largest element in the sorted order, not the kth distinct element.
 * 
 * Can you solve it without sorting?
 * 
 * Example 1:
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 * 
 * Example 2:
 * Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
 * Output: 4
 */

/**
 * MinHeap class for JavaScript implementation
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    // Get parent index
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    
    // Get left child index
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }
    
    // Get right child index
    getRightChildIndex(index) {
        return 2 * index + 2;
    }
    
    // Check if node has parent
    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }
    
    // Check if node has left child
    hasLeftChild(index) {
        return this.getLeftChildIndex(index) < this.heap.length;
    }
    
    // Check if node has right child
    hasRightChild(index) {
        return this.getRightChildIndex(index) < this.heap.length;
    }
    
    // Get parent value
    getParent(index) {
        return this.heap[this.getParentIndex(index)];
    }
    
    // Get left child value
    getLeftChild(index) {
        return this.heap[this.getLeftChildIndex(index)];
    }
    
    // Get right child value
    getRightChild(index) {
        return this.heap[this.getRightChildIndex(index)];
    }
    
    // Swap two elements
    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }
    
    // Add element to heap
    add(value) {
        this.heap.push(value);
        this.heapifyUp();
    }
    
    // Remove and return min element
    poll() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        
        return min;
    }
    
    // Get min element without removing
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }
    
    // Get heap size
    size() {
        return this.heap.length;
    }
    
    // Check if heap is empty
    isEmpty() {
        return this.heap.length === 0;
    }
    
    // Bubble up element to maintain heap property
    heapifyUp() {
        let index = this.heap.length - 1;
        
        while (this.hasParent(index) && this.getParent(index) > this.heap[index]) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }
    
    // Bubble down element to maintain heap property
    heapifyDown() {
        let index = 0;
        
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            
            if (this.hasRightChild(index) && this.getRightChild(index) < this.getLeftChild(index)) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            
            if (this.heap[index] < this.heap[smallerChildIndex]) {
                break;
            }
            
            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }
    
    // Get heap elements as array (for debugging)
    getElements() {
        return [...this.heap];
    }
}

/**
 * MaxHeap class for JavaScript implementation
 */
class MaxHeap {
    constructor() {
        this.heap = [];
    }
    
    // Get parent index
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    
    // Get left child index
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }
    
    // Get right child index
    getRightChildIndex(index) {
        return 2 * index + 2;
    }
    
    // Check if node has parent
    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }
    
    // Check if node has left child
    hasLeftChild(index) {
        return this.getLeftChildIndex(index) < this.heap.length;
    }
    
    // Check if node has right child
    hasRightChild(index) {
        return this.getRightChildIndex(index) < this.heap.length;
    }
    
    // Get parent value
    getParent(index) {
        return this.heap[this.getParentIndex(index)];
    }
    
    // Get left child value
    getLeftChild(index) {
        return this.heap[this.getLeftChildIndex(index)];
    }
    
    // Get right child value
    getRightChild(index) {
        return this.heap[this.getRightChildIndex(index)];
    }
    
    // Swap two elements
    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }
    
    // Add element to heap
    add(value) {
        this.heap.push(value);
        this.heapifyUp();
    }
    
    // Remove and return max element
    poll() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        
        return max;
    }
    
    // Get max element without removing
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }
    
    // Get heap size
    size() {
        return this.heap.length;
    }
    
    // Check if heap is empty
    isEmpty() {
        return this.heap.length === 0;
    }
    
    // Bubble up element to maintain heap property
    heapifyUp() {
        let index = this.heap.length - 1;
        
        while (this.hasParent(index) && this.getParent(index) < this.heap[index]) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }
    
    // Bubble down element to maintain heap property
    heapifyDown() {
        let index = 0;
        
        while (this.hasLeftChild(index)) {
            let largerChildIndex = this.getLeftChildIndex(index);
            
            if (this.hasRightChild(index) && this.getRightChild(index) > this.getLeftChild(index)) {
                largerChildIndex = this.getRightChildIndex(index);
            }
            
            if (this.heap[index] > this.heap[largerChildIndex]) {
                break;
            }
            
            this.swap(index, largerChildIndex);
            index = largerChildIndex;
        }
    }
    
    // Get heap elements as array (for debugging)
    getElements() {
        return [...this.heap];
    }
}

/**
 * Approach 1: Min Heap (Priority Queue)
 * 
 * Algorithm:
 * 1. Build a min heap from all elements
 * 2. Remove elements until heap size becomes k
 * 3. Return the root (kth largest element)
 * 
 * Time Complexity: O(n log n)
 * - Building heap: O(n log n)
 * - Removing elements: O((n-k) log n)
 * 
 * Space Complexity: O(n) - heap stores all elements
 */
function findKthLargest(nums, k) {
    const minHeap = new MinHeap();
    
    // Add all elements to min heap
    for (const num of nums) {
        minHeap.add(num);
    }
    
    // Remove elements until heap size becomes k
    while (minHeap.size() > k) {
        minHeap.poll();
    }
    
    // Return the kth largest element
    return minHeap.poll();
}

/**
 * Approach 2: Max Heap (More Efficient)
 * 
 * Algorithm:
 * 1. Build a max heap from all elements
 * 2. Remove k-1 elements
 * 3. Return the kth element
 * 
 * Time Complexity: O(n + k log n)
 * - Building heap: O(n)
 * - Removing k elements: O(k log n)
 * 
 * Space Complexity: O(n) - heap stores all elements
 */
function findKthLargestMaxHeap(nums, k) {
    const maxHeap = new MaxHeap();
    
    // Add all elements to max heap
    for (const num of nums) {
        maxHeap.add(num);
    }
    
    // Remove k-1 elements
    for (let i = 0; i < k - 1; i++) {
        maxHeap.poll();
    }
    
    // Return the kth largest element
    return maxHeap.poll();
}

/**
 * Approach 3: QuickSelect Algorithm (Most Efficient)
 * 
 * Algorithm:
 * 1. Use partition similar to quicksort
 * 2. If pivot position == k-1, return pivot
 * 3. If pivot position < k-1, search right half
 * 4. If pivot position > k-1, search left half
 * 
 * Time Complexity: O(n) average case, O(n²) worst case
 * Space Complexity: O(1) - in-place
 */
function findKthLargestQuickSelect(nums, k) {
    return quickSelect([...nums], 0, nums.length - 1, nums.length - k);
}

function quickSelect(nums, left, right, k) {
    if (left === right) {
        return nums[left];
    }
    
    const pivotIndex = partition(nums, left, right);
    
    if (pivotIndex === k) {
        return nums[pivotIndex];
    } else if (pivotIndex < k) {
        return quickSelect(nums, pivotIndex + 1, right, k);
    } else {
        return quickSelect(nums, left, pivotIndex - 1, k);
    }
}

function partition(nums, left, right) {
    const pivot = nums[right];
    let i = left - 1;
    
    for (let j = left; j < right; j++) {
        if (nums[j] <= pivot) {
            i++;
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
    }
    
    [nums[i + 1], nums[right]] = [nums[right], nums[i + 1]];
    return i + 1;
}

/**
 * Approach 4: Min Heap of Size K (Most Space Efficient)
 * 
 * Algorithm:
 * 1. Maintain a min heap of size k
 * 2. Add elements to heap, remove smallest if size > k
 * 3. Return the root (kth largest)
 * 
 * Time Complexity: O(n log k)
 * Space Complexity: O(k) - heap stores only k elements
 */
function findKthLargestMinHeapK(nums, k) {
    const minHeap = new MinHeap();
    
    for (const num of nums) {
        minHeap.add(num);
        if (minHeap.size() > k) {
            minHeap.poll();
        }
    }
    
    return minHeap.poll();
}

/**
 * Approach 5: Using Array.sort() (Simple but less efficient)
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) - in-place sorting
 */
function findKthLargestSort(nums, k) {
    const sorted = [...nums].sort((a, b) => a - b);
    return sorted[sorted.length - k];
}

/**
 * Visualize the heap state for debugging
 */
function visualizeHeap(nums, k) {
    console.log("Original array:", nums);
    console.log("k:", k);
    
    // Min heap approach
    const minHeap = new MinHeap();
    for (const num of nums) {
        minHeap.add(num);
    }
    
    console.log("Min heap after building:", minHeap.getElements());
    
    while (minHeap.size() > k) {
        const removed = minHeap.poll();
        console.log("Removed:", removed, "Heap:", minHeap.getElements());
    }
    
    console.log("Final result:", minHeap.poll());
}

// Test cases
function runTests() {
    console.log("=== Find Kth Largest Element in Array Problem ===\n");
    
    // Test case 1
    const nums1 = [3, 2, 1, 5, 6, 4];
    const k1 = 2;
    console.log("Test Case 1:");
    console.log("Input: nums =", nums1, ", k =", k1);
    console.log("Expected: 5");
    console.log("Min Heap Output:", findKthLargest([...nums1], k1));
    console.log("Max Heap Output:", findKthLargestMaxHeap([...nums1], k1));
    console.log("QuickSelect Output:", findKthLargestQuickSelect([...nums1], k1));
    console.log("Min Heap K Output:", findKthLargestMinHeapK([...nums1], k1));
    console.log("Sort Output:", findKthLargestSort([...nums1], k1));
    console.log();
    
    // Test case 2
    const nums2 = [3, 2, 3, 1, 2, 4, 5, 5, 6];
    const k2 = 4;
    console.log("Test Case 2:");
    console.log("Input: nums =", nums2, ", k =", k2);
    console.log("Expected: 4");
    console.log("Min Heap Output:", findKthLargest([...nums2], k2));
    console.log("Max Heap Output:", findKthLargestMaxHeap([...nums2], k2));
    console.log("QuickSelect Output:", findKthLargestQuickSelect([...nums2], k2));
    console.log("Min Heap K Output:", findKthLargestMinHeapK([...nums2], k2));
    console.log("Sort Output:", findKthLargestSort([...nums2], k2));
    console.log();
    
    // Test case 3
    const nums3 = [1];
    const k3 = 1;
    console.log("Test Case 3:");
    console.log("Input: nums =", nums3, ", k =", k3);
    console.log("Expected: 1");
    console.log("Min Heap Output:", findKthLargest([...nums3], k3));
    console.log("Max Heap Output:", findKthLargestMaxHeap([...nums3], k3));
    console.log("QuickSelect Output:", findKthLargestQuickSelect([...nums3], k3));
    console.log("Min Heap K Output:", findKthLargestMinHeapK([...nums3], k3));
    console.log("Sort Output:", findKthLargestSort([...nums3], k3));
    console.log();
    
    // Visualization
    console.log("=== Visualization ===");
    visualizeHeap(nums1, k1);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        findKthLargest,
        findKthLargestMaxHeap,
        findKthLargestQuickSelect,
        findKthLargestMinHeapK,
        findKthLargestSort,
        MinHeap,
        MaxHeap,
        visualizeHeap,
        runTests
    };
} else {
    // Run if executed directly
    runTests();
} 