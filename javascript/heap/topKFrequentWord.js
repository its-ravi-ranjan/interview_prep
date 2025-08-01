/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Top K Frequent Words problem
 * 
 * Problem: Top K Frequent Words
 * ------------------------------
 * Given an array of strings words and an integer k, return the k most frequent strings.
 * Return the answer sorted by the frequency from highest to lowest. 
 * Sort the words with the same frequency by their lexicographical order.
 * 
 * Example 1:
 * Input: words = ["i","love","leetcode","i","love","coding"], k = 2
 * Output: ["i","love"]
 * Explanation: "i" and "love" are the two most frequent words.
 * Note that "i" comes before "love" due to a lower alphabetical order.
 * 
 * Example 2:
 * Input: words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4
 * Output: ["the","is","sunny","day"]
 */

/**
 * MinHeap class for JavaScript implementation with custom comparator
 */
class MinHeap {
    constructor(comparator) {
        this.heap = [];
        this.comparator = comparator;
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
        
        while (this.hasParent(index) && this.comparator(this.getParent(index), this.heap[index]) > 0) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }
    
    // Bubble down element to maintain heap property
    heapifyDown() {
        let index = 0;
        
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            
            if (this.hasRightChild(index) && this.comparator(this.getRightChild(index), this.getLeftChild(index)) < 0) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            
            if (this.comparator(this.heap[index], this.heap[smallerChildIndex]) < 0) {
                break;
            }
            
            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }
    
    // Get heap elements as array (for debugging)
    getElements() {
        return this.heap.map(item => ({ word: item.word, frequency: item.frequency }));
    }
}

/**
 * MaxHeap class for JavaScript implementation with custom comparator
 */
class MaxHeap {
    constructor(comparator) {
        this.heap = [];
        this.comparator = comparator;
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
        
        while (this.hasParent(index) && this.comparator(this.getParent(index), this.heap[index]) < 0) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }
    
    // Bubble down element to maintain heap property
    heapifyDown() {
        let index = 0;
        
        while (this.hasLeftChild(index)) {
            let largerChildIndex = this.getLeftChildIndex(index);
            
            if (this.hasRightChild(index) && this.comparator(this.getRightChild(index), this.getLeftChild(index)) > 0) {
                largerChildIndex = this.getRightChildIndex(index);
            }
            
            if (this.comparator(this.heap[index], this.heap[largerChildIndex]) > 0) {
                break;
            }
            
            this.swap(index, largerChildIndex);
            index = largerChildIndex;
        }
    }
    
    // Get heap elements as array (for debugging)
    getElements() {
        return this.heap.map(item => ({ word: item.word, frequency: item.frequency }));
    }
}

/**
 * Approach 1: Min Heap with Custom Comparator - Most Efficient
 * 
 * Algorithm:
 * 1. Count frequency of each word using Map
 * 2. Use min heap with custom comparator:
 *    - Primary: frequency (ascending)
 *    - Secondary: lexicographical order (descending for same frequency)
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
function topKFrequent(words, k) {
    // Count frequency of each word
    const frequencyMap = new Map();
    for (const word of words) {
        frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    }
    
    // Custom comparator for min heap
    const minHeapComparator = (a, b) => {
        // Primary: frequency (ascending)
        if (a.frequency !== b.frequency) {
            return a.frequency - b.frequency;
        }
        // Secondary: lexicographical order (descending for same frequency)
        return b.word.localeCompare(a.word);
    };
    
    // Min heap to keep top k frequent words
    const minHeap = new MinHeap(minHeapComparator);
    
    // Add entries to heap, maintain size k
    for (const [word, frequency] of frequencyMap) {
        minHeap.add({ word, frequency });
        if (minHeap.size() > k) {
            minHeap.poll(); // Remove least frequent (or lexicographically larger)
        }
    }
    
    // Extract elements in reverse order (most frequent first)
    const result = new Array(k);
    for (let i = k - 1; i >= 0; i--) {
        result[i] = minHeap.poll().word;
    }
    
    return result;
}

/**
 * Approach 2: Max Heap with Custom Comparator (Alternative)
 * 
 * Algorithm:
 * 1. Count frequency of each word
 * 2. Build max heap with custom comparator:
 *    - Primary: frequency (descending)
 *    - Secondary: lexicographical order (ascending for same frequency)
 * 3. Extract top k elements
 * 
 * Time Complexity: O(n + k log n)
 * - Counting frequencies: O(n)
 * - Building max heap: O(n)
 * - Extracting k elements: O(k log n)
 * 
 * Space Complexity: O(n) - Map + MaxHeap
 */
function topKFrequentMaxHeap(words, k) {
    // Count frequency of each word
    const frequencyMap = new Map();
    for (const word of words) {
        frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    }
    
    // Custom comparator for max heap
    const maxHeapComparator = (a, b) => {
        // Primary: frequency (descending)
        if (a.frequency !== b.frequency) {
            return b.frequency - a.frequency;
        }
        // Secondary: lexicographical order (ascending for same frequency)
        return a.word.localeCompare(b.word);
    };
    
    // Max heap to get most frequent words
    const maxHeap = new MaxHeap(maxHeapComparator);
    
    // Add all entries to max heap
    for (const [word, frequency] of frequencyMap) {
        maxHeap.add({ word, frequency });
    }
    
    // Extract top k elements
    const result = new Array(k);
    for (let i = 0; i < k; i++) {
        result[i] = maxHeap.poll().word;
    }
    
    return result;
}

/**
 * Approach 3: Bucket Sort with Sorting (Most Efficient for Small Range)
 * 
 * Algorithm:
 * 1. Count frequency of each word
 * 2. Create buckets based on frequency
 * 3. Sort each bucket lexicographically
 * 4. Extract elements from highest frequency buckets
 * 
 * Time Complexity: O(n + m log m) where m is number of unique words
 * Space Complexity: O(n)
 */
function topKFrequentBucketSort(words, k) {
    // Count frequency of each word
    const frequencyMap = new Map();
    for (const word of words) {
        frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    }
    
    // Create buckets: index = frequency, value = array of words
    const buckets = new Array(words.length + 1).fill().map(() => []);
    
    // Add words to buckets based on frequency
    for (const [word, frequency] of frequencyMap) {
        buckets[frequency].push(word);
    }
    
    // Extract elements from highest frequency buckets
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        // Sort words in current bucket lexicographically
        buckets[i].sort();
        for (const word of buckets[i]) {
            if (result.length < k) {
                result.push(word);
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
function topKFrequentSort(words, k) {
    // Count frequency of each word
    const frequencyMap = new Map();
    for (const word of words) {
        frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    }
    
    // Convert to array and sort by frequency and lexicographical order
    const entries = Array.from(frequencyMap.entries());
    entries.sort((a, b) => {
        // Primary: frequency (descending)
        if (a[1] !== b[1]) {
            return b[1] - a[1];
        }
        // Secondary: lexicographical order (ascending for same frequency)
        return a[0].localeCompare(b[0]);
    });
    
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
function topKFrequentSimple(words, k) {
    // Count frequency of each word
    const frequencyMap = new Map();
    for (const word of words) {
        frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    }
    
    // Use array as min heap with custom comparator
    const minHeap = [];
    
    // Custom comparator function
    const compare = (a, b) => {
        if (a.frequency !== b.frequency) {
            return a.frequency - b.frequency;
        }
        return b.word.localeCompare(a.word);
    };
    
    // Add entries to heap, maintain size k
    for (const [word, frequency] of frequencyMap) {
        minHeap.push({ word, frequency });
        minHeap.sort(compare); // Sort by frequency and lexicographical order
        
        if (minHeap.length > k) {
            minHeap.shift(); // Remove least frequent
        }
    }
    
    // Extract elements in reverse order
    const result = new Array(k);
    for (let i = k - 1; i >= 0; i--) {
        result[i] = minHeap.pop().word;
    }
    
    return result;
}

/**
 * Visualize the frequency counting and heap operations
 */
function visualizeTopK(words, k) {
    console.log("Original words:", words);
    console.log("k:", k);
    
    // Count frequencies
    const frequencyMap = new Map();
    for (const word of words) {
        frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    }
    
    console.log("Frequency map:", Object.fromEntries(frequencyMap));
    
    // Min heap approach
    const minHeapComparator = (a, b) => {
        if (a.frequency !== b.frequency) {
            return a.frequency - b.frequency;
        }
        return b.word.localeCompare(a.word);
    };
    
    const minHeap = new MinHeap(minHeapComparator);
    
    for (const [word, frequency] of frequencyMap) {
        minHeap.add({ word, frequency });
        if (minHeap.size() > k) {
            const removed = minHeap.poll();
            console.log("Removed:", removed.word, "(freq:", removed.frequency + ")");
        }
    }
    
    console.log("Final heap size:", minHeap.size());
    
    // Extract result
    const result = new Array(k);
    for (let i = k - 1; i >= 0; i--) {
        result[i] = minHeap.poll().word;
    }
    
    console.log("Result:", result);
}

// Test cases
function runTests() {
    console.log("=== Top K Frequent Words Problem ===\n");
    
    // Test case 1
    const words1 = ["i", "love", "leetcode", "i", "love", "coding"];
    const k1 = 2;
    console.log("Test Case 1:");
    console.log("Input: words =", words1, ", k =", k1);
    console.log("Expected: [i, love]");
    console.log("Min Heap Output:", topKFrequent([...words1], k1));
    console.log("Max Heap Output:", topKFrequentMaxHeap([...words1], k1));
    console.log("Bucket Sort Output:", topKFrequentBucketSort([...words1], k1));
    console.log("Sort Output:", topKFrequentSort([...words1], k1));
    console.log("Simple Output:", topKFrequentSimple([...words1], k1));
    console.log();
    
    // Test case 2
    const words2 = ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"];
    const k2 = 4;
    console.log("Test Case 2:");
    console.log("Input: words =", words2, ", k =", k2);
    console.log("Expected: [the, is, sunny, day]");
    console.log("Min Heap Output:", topKFrequent([...words2], k2));
    console.log("Max Heap Output:", topKFrequentMaxHeap([...words2], k2));
    console.log("Bucket Sort Output:", topKFrequentBucketSort([...words2], k2));
    console.log("Sort Output:", topKFrequentSort([...words2], k2));
    console.log("Simple Output:", topKFrequentSimple([...words2], k2));
    console.log();
    
    // Test case 3
    const words3 = ["a", "b", "c", "a", "b", "a"];
    const k3 = 3;
    console.log("Test Case 3:");
    console.log("Input: words =", words3, ", k =", k3);
    console.log("Expected: [a, b, c]");
    console.log("Min Heap Output:", topKFrequent([...words3], k3));
    console.log("Max Heap Output:", topKFrequentMaxHeap([...words3], k3));
    console.log("Bucket Sort Output:", topKFrequentBucketSort([...words3], k3));
    console.log("Sort Output:", topKFrequentSort([...words3], k3));
    console.log("Simple Output:", topKFrequentSimple([...words3], k3));
    console.log();
    
    // Visualization
    console.log("=== Visualization ===");
    visualizeTopK(words1, k1);
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