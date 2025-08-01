/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Top K Frequent Elements problem
 * 
 * Problem: Top K Frequent Elements
 * --------------------------------
 * Given an integer array nums and an integer k, return the k most frequent elements. 
 * You may return the answer in any order.
 * 
 * Example 1:
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 * 
 * Example 2:
 * Input: nums = [1], k = 1
 * Output: [1]
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
        
        while (this.hasParent(index) && this.getParent(index).frequency > this.heap[index].frequency) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }
    
    // Bubble down element to maintain heap property
    heapifyDown() {
        let index = 0;
        
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            
            if (this.hasRightChild(index) && this.getRightChild(index).frequency < this.getLeftChild(index).frequency) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            
            if (this.heap[index].frequency < this.heap[smallerChildIndex].frequency) {
                break;
            }
            
            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }
    
    // Get heap elements as array (for debugging)
    getElements() {
        return this.heap.map(item => ({ num: item.num, frequency: item.frequency }));
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
        
        while (this.hasParent(index) && this.getParent(index).frequency < this.heap[index].frequency) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }
    
    // Bubble down element to maintain heap property
    heapifyDown() {
        let index = 0;
        
        while (this.hasLeftChild(index)) {
            let largerChildIndex = this.getLeftChildIndex(index);
            
            if (this.hasRightChild(index) && this.getRightChild(index).frequency > this.getLeftChild(index).frequency) {
                largerChildIndex = this.getRightChildIndex(index);
            }
            
            if (this.heap[index].frequency > this.heap[largerChildIndex].frequency) {
                break;
            }
            
            this.swap(index, largerChildIndex);
            index = largerChildIndex;
        }
    }
    
    // Get heap elements as array (for debugging)
    getElements() {
        return this.heap.map(item => ({ num: item.num, frequency: item.frequency }));
    }
}

/**
 * Approach 1: Min Heap (Priority Queue) - Most Efficient
 * 
 * Algorithm:
 * 1. Count frequency of each element using Map
 * 2. Use min heap to keep top k frequent elements
 * 3. Add entries to heap, remove smallest if size > k
 * 4. Extract elements from heap in reverse order
 * 
 * Time Complexity: O(n log k)
 * - Counting frequencies: O(n)
 * - Building heap: O(n log k)
 * - Extracting result: O(k log k)
 * 
 * Space Complexity: O(n) - Map + Heap
 */
function topKFrequent(nums, k) {
    // Count frequency of each element
    const frequencyMap = new Map();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }
    
    // Min heap to keep top k frequent elements
    const minHeap = new MinHeap();
    
    // Add entries to heap, maintain size k
    for (const [num, frequency] of frequencyMap) {
        minHeap.add({ num, frequency });
        if (minHeap.size() > k) {
            minHeap.poll(); // Remove least frequent
        }
    }
    
    // Extract elements in reverse order (most frequent first)
    const result = new Array(k);
    for (let i = k - 1; i >= 0; i--) {
        result[i] = minHeap.poll().num;
    }
    
    return result;
}

/**
 * Approach 2: Max Heap (Alternative)
 * 
 * Algorithm:
 * 1. Count frequency of each element
 * 2. Build max heap with all entries
 * 3. Extract top k elements
 * 
 * Time Complexity: O(n + k log n)
 * - Counting frequencies: O(n)
 * - Building max heap: O(n)
 * - Extracting k elements: O(k log n)
 * 
 * Space Complexity: O(n) - Map + MaxHeap
 */
function topKFrequentMaxHeap(nums, k) {
    // Count frequency of each element
    const frequencyMap = new Map();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }
    
    // Max heap to get most frequent elements
    const maxHeap = new MaxHeap();
    
    // Add all entries to max heap
    for (const [num, frequency] of frequencyMap) {
        maxHeap.add({ num, frequency });
    }
    
    // Extract top k elements
    const result = new Array(k);
    for (let i = 0; i < k; i++) {
        result[i] = maxHeap.poll().num;
    }
    
    return result;
}

/**
 * Approach 3: Bucket Sort (Most Efficient for Small Range)
 * 
 * Algorithm:
 * 1. Count frequency of each element
 * 2. Create buckets based on frequency
 * 3. Extract elements from highest frequency buckets
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function topKFrequentBucketSort(nums, k) {
    // Count frequency of each element
    const frequencyMap = new Map();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }
    
    // Create buckets: index = frequency, value = array of elements
    const buckets = new Array(nums.length + 1).fill().map(() => []);
    
    // Add elements to buckets based on frequency
    for (const [num, frequency] of frequencyMap) {
        buckets[frequency].push(num);
    }
    
    // Extract elements from highest frequency buckets
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        for (const num of buckets[i]) {
            if (result.length < k) {
                result.push(num);
            }
        }
    }
    
    return result;
}

/**
 * Approach 4: Using Array.sort() (Simple but less efficient)
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function topKFrequentSort(nums, k) {
    // Count frequency of each element
    const frequencyMap = new Map();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }
    
    // Convert to array and sort by frequency
    const entries = Array.from(frequencyMap.entries());
    entries.sort((a, b) => b[1] - a[1]);
    
    // Extract top k elements
    const result = new Array(k);
    for (let i = 0; i < k; i++) {
        result[i] = entries[i][0];
    }
    
    return result;
}

/**
 * Approach 5: Simple Min Heap using Array (Alternative implementation)
 * 
 * Time Complexity: O(n log k)
 * Space Complexity: O(n)
 */
function topKFrequentSimple(nums, k) {
    // Count frequency of each element
    const frequencyMap = new Map();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }
    
    // Use array as min heap with custom comparator
    const minHeap = [];
    
    // Add entries to heap, maintain size k
    for (const [num, frequency] of frequencyMap) {
        minHeap.push({ num, frequency });
        minHeap.sort((a, b) => a.frequency - b.frequency); // Sort by frequency
        
        if (minHeap.length > k) {
            minHeap.shift(); // Remove least frequent
        }
    }
    
    // Extract elements in reverse order
    const result = new Array(k);
    for (let i = k - 1; i >= 0; i--) {
        result[i] = minHeap.pop().num;
    }
    
    return result;
}

/**
 * Visualize the frequency counting and heap operations
 */
function visualizeTopK(nums, k) {
    console.log("Original array:", nums);
    console.log("k:", k);
    
    // Count frequencies
    const frequencyMap = new Map();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }
    
    console.log("Frequency map:", Object.fromEntries(frequencyMap));
    
    // Min heap approach
    const minHeap = new MinHeap();
    
    for (const [num, frequency] of frequencyMap) {
        minHeap.add({ num, frequency });
        if (minHeap.size() > k) {
            const removed = minHeap.poll();
            console.log("Removed:", removed.num, "(freq:", removed.frequency + ")");
        }
    }
    
    console.log("Final heap size:", minHeap.size());
    
    // Extract result
    const result = new Array(k);
    for (let i = k - 1; i >= 0; i--) {
        result[i] = minHeap.poll().num;
    }
    
    console.log("Result:", result);
}

// Test cases
function runTests() {
    console.log("=== Top K Frequent Elements Problem ===\n");
    
    // Test case 1
    const nums1 = [1, 1, 1, 2, 2, 3];
    const k1 = 2;
    console.log("Test Case 1:");
    console.log("Input: nums =", nums1, ", k =", k1);
    console.log("Expected: [1, 2]");
    console.log("Min Heap Output:", topKFrequent([...nums1], k1));
    console.log("Max Heap Output:", topKFrequentMaxHeap([...nums1], k1));
    console.log("Bucket Sort Output:", topKFrequentBucketSort([...nums1], k1));
    console.log("Sort Output:", topKFrequentSort([...nums1], k1));
    console.log("Simple Output:", topKFrequentSimple([...nums1], k1));
    console.log();
    
    // Test case 2
    const nums2 = [1];
    const k2 = 1;
    console.log("Test Case 2:");
    console.log("Input: nums =", nums2, ", k =", k2);
    console.log("Expected: [1]");
    console.log("Min Heap Output:", topKFrequent([...nums2], k2));
    console.log("Max Heap Output:", topKFrequentMaxHeap([...nums2], k2));
    console.log("Bucket Sort Output:", topKFrequentBucketSort([...nums2], k2));
    console.log("Sort Output:", topKFrequentSort([...nums2], k2));
    console.log("Simple Output:", topKFrequentSimple([...nums2], k2));
    console.log();
    
    // Test case 3
    const nums3 = [1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4];
    const k3 = 3;
    console.log("Test Case 3:");
    console.log("Input: nums =", nums3, ", k =", k3);
    console.log("Expected: [4, 3, 1] (or any order)");
    console.log("Min Heap Output:", topKFrequent([...nums3], k3));
    console.log("Max Heap Output:", topKFrequentMaxHeap([...nums3], k3));
    console.log("Bucket Sort Output:", topKFrequentBucketSort([...nums3], k3));
    console.log("Sort Output:", topKFrequentSort([...nums3], k3));
    console.log("Simple Output:", topKFrequentSimple([...nums3], k3));
    console.log();
    
    // Visualization
    console.log("=== Visualization ===");
    visualizeTopK(nums1, k1);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        topKFrequent,
        topKFrequentMaxHeap,
        topKFrequentBucketSort,
        topKFrequentSort,
        topKFrequentSimple,
        MinHeap,
        MaxHeap,
        visualizeTopK,
        runTests
    };
} else {
    // Run if executed directly
    runTests();
} 