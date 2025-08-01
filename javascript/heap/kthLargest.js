/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Kth Largest Element in a Stream problem
 * 
 * Problem: Kth Largest Element in a Stream
 * -----------------------------------------
 * You are part of a university admissions office and need to keep track of the kth highest 
 * test score from applicants in real-time. This helps to determine cut-off marks for 
 * interviews and admissions dynamically as new applicants submit their scores.
 * 
 * You are tasked to implement a class which, for a given integer k, maintains a stream of 
 * test scores and continuously returns the kth highest test score after a new score has 
 * been submitted. More specifically, we are looking for the kth highest score in the 
 * sorted list of all scores.
 * 
 * Implement the KthLargest class:
 * - KthLargest(int k, int[] nums) - Initializes the object with the integer k and the 
 *   stream of test scores nums.
 * - int add(int val) - Adds a new test score val to the stream and returns the element 
 *   representing the kth largest element in the pool of test scores so far.
 * 
 * Example:
 * Input: ["KthLargest", "add", "add", "add", "add", "add"]
 *        [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
 * Output: [null, 4, 5, 5, 8, 8]
 * 
 * Explanation:
 * KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
 * kthLargest.add(3); // return 4
 * kthLargest.add(5); // return 5
 * kthLargest.add(10); // return 5
 * kthLargest.add(9); // return 8
 * kthLargest.add(4); // return 8
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
 * KthLargest class using Min Heap approach
 * 
 * Approach: Min Heap (Priority Queue)
 * 
 * Key Insight: To find the kth largest element, we maintain a min heap of size k
 * containing the k largest elements. The root of this heap will always be the kth largest.
 * 
 * Algorithm:
 * 1. Initialize a min heap of size k
 * 2. For each new element:
 *    - Add it to the heap
 *    - If heap size exceeds k, remove the smallest element (root)
 *    - Return the root (kth largest)
 * 
 * Why Min Heap of size k?
 * - We only need to track the k largest elements
 * - Min heap root is the smallest among k largest = kth largest overall
 * - Efficient O(log k) operations for add/remove
 * 
 * Time Complexity:
 * - Constructor: O(n log k) where n is the length of nums
 * - add(): O(log k) for heap operations
 * 
 * Space Complexity: O(k) - heap stores at most k elements
 */
class KthLargest {
    constructor(k, nums) {
        this.k = k;
        this.minHeap = new MinHeap();
        
        // Add all initial numbers to the heap
        for (const num of nums) {
            this.add(num);
        }
    }
    
    /**
     * Adds a new value to the stream and returns the kth largest element
     * 
     * @param {number} val The new value to add
     * @returns {number} The kth largest element in the stream
     */
    add(val) {
        // Add the new value to the heap
        this.minHeap.add(val);
        
        // If heap size exceeds k, remove the smallest element
        if (this.minHeap.size() > this.k) {
            this.minHeap.poll();
        }
        
        // Return the root (kth largest element)
        return this.minHeap.peek();
    }
    
    /**
     * Visualize the heap state for debugging
     */
    visualizeHeap() {
        console.log("Current heap size:", this.minHeap.size());
        console.log("k:", this.k);
        console.log("Heap elements:", this.minHeap.getElements());
        console.log("kth largest:", this.minHeap.peek());
        console.log();
    }
    
    /**
     * Get current heap elements (for debugging)
     */
    getHeapElements() {
        return this.minHeap.getElements();
    }
}

/**
 * Alternative Approach: Using Max Heap (Less efficient)
 * 
 * This approach uses a max heap and removes elements until we have k elements left.
 * It's less efficient because we need to remove (n-k) elements for each add operation.
 * 
 * Time Complexity: O(n log n) for add operations
 * Space Complexity: O(n) - stores all elements
 */
class KthLargestMaxHeap {
    constructor(k, nums) {
        this.k = k;
        this.maxHeap = [];
        
        // Add all initial numbers
        for (const num of nums) {
            this.maxHeap.push(num);
        }
        
        // Build max heap
        this.buildMaxHeap();
    }
    
    buildMaxHeap() {
        for (let i = Math.floor(this.maxHeap.length / 2) - 1; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }
    
    heapifyDown(index) {
        let largest = index;
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        
        if (left < this.maxHeap.length && this.maxHeap[left] > this.maxHeap[largest]) {
            largest = left;
        }
        
        if (right < this.maxHeap.length && this.maxHeap[right] > this.maxHeap[largest]) {
            largest = right;
        }
        
        if (largest !== index) {
            [this.maxHeap[index], this.maxHeap[largest]] = [this.maxHeap[largest], this.maxHeap[index]];
            this.heapifyDown(largest);
        }
    }
    
    poll() {
        if (this.maxHeap.length === 0) return null;
        if (this.maxHeap.length === 1) return this.maxHeap.pop();
        
        const max = this.maxHeap[0];
        this.maxHeap[0] = this.maxHeap.pop();
        this.heapifyDown(0);
        
        return max;
    }
    
    peek() {
        return this.maxHeap.length > 0 ? this.maxHeap[0] : null;
    }
    
    size() {
        return this.maxHeap.length;
    }
    
    add(val) {
        this.maxHeap.push(val);
        
        // Remove elements until we have exactly k elements
        while (this.maxHeap.length > this.k) {
            this.poll();
        }
        
        return this.peek();
    }
}

/**
 * Simple approach using Array.sort() (Least efficient)
 * 
 * Time Complexity: O(n log n) for each add operation
 * Space Complexity: O(n)
 */
class KthLargestSimple {
    constructor(k, nums) {
        this.k = k;
        this.nums = [...nums];
    }
    
    add(val) {
        this.nums.push(val);
        this.nums.sort((a, b) => b - a); // Sort in descending order
        
        return this.nums[this.k - 1] || null;
    }
}

// Test cases
function runTests() {
    console.log("=== Kth Largest Element in a Stream Problem ===\n");
    
    // Test case 1: Example from problem
    console.log("Test Case 1:");
    const nums1 = [4, 5, 8, 2];
    const kthLargest1 = new KthLargest(3, nums1);
    
    console.log("Initial heap:", kthLargest1.getHeapElements());
    console.log("kth largest:", kthLargest1.minHeap.peek());
    
    const additions1 = [3, 5, 10, 9, 4];
    for (const val of additions1) {
        const result = kthLargest1.add(val);
        console.log(`Add ${val} -> kth largest: ${result}`);
        console.log("Heap:", kthLargest1.getHeapElements());
    }
    console.log();
    
    // Test case 2: Single element
    console.log("Test Case 2:");
    const nums2 = [1];
    const kthLargest2 = new KthLargest(1, nums2);
    console.log("Initial:", kthLargest2.add(2));
    console.log("Add 3:", kthLargest2.add(3));
    console.log();
    
    // Test case 3: Empty initial array
    console.log("Test Case 3:");
    const nums3 = [];
    const kthLargest3 = new KthLargest(2, nums3);
    console.log("Add 1:", kthLargest3.add(1));
    console.log("Add 2:", kthLargest3.add(2));
    console.log("Add 3:", kthLargest3.add(3));
    console.log();
    
    // Performance comparison
    console.log("=== Performance Comparison ===");
    const largeNums = Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));
    
    const startTime1 = performance.now();
    const efficient = new KthLargest(10, largeNums);
    const endTime1 = performance.now();
    console.log(`Min Heap approach time: ${(endTime1 - startTime1).toFixed(2)} ms`);
    
    const startTime2 = performance.now();
    const inefficient = new KthLargestMaxHeap(10, largeNums);
    const endTime2 = performance.now();
    console.log(`Max Heap approach time: ${(endTime2 - startTime2).toFixed(2)} ms`);
    
    const startTime3 = performance.now();
    const simple = new KthLargestSimple(10, largeNums);
    const endTime3 = performance.now();
    console.log(`Array.sort() approach time: ${(endTime3 - startTime3).toFixed(2)} ms`);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        KthLargest,
        KthLargestMaxHeap,
        KthLargestSimple,
        MinHeap,
        runTests
    };
} else {
    // Run if executed directly
    runTests();
} 