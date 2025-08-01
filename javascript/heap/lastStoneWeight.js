/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Last Stone Weight problem
 * 
 * Problem: Last Stone Weight
 * ---------------------------
 * You are given an array of integers stones where stones[i] is the weight of the ith stone.
 * 
 * We are playing a game with the stones. On each turn, we choose the heaviest two stones 
 * and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. 
 * The result of this smash is:
 * 
 * - If x == y, both stones are destroyed
 * - If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x
 * 
 * At the end of the game, there is at most one stone left.
 * Return the weight of the last remaining stone. If there are no stones left, return 0.
 * 
 * Example:
 * Input: stones = [2,7,4,1,8,1]
 * Output: 1
 * 
 * Explanation: 
 * - Combine 7 and 8 to get 1: [2,4,1,1,1]
 * - Combine 2 and 4 to get 2: [2,1,1,1] 
 * - Combine 2 and 1 to get 1: [1,1,1]
 * - Combine 1 and 1 to get 0: [1]
 * - Last stone weight: 1
 */

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
}

/**
 * Approach: Max Heap (Priority Queue)
 * 
 * 1. Build a max heap from all stones
 * 2. While heap has more than 1 stone:
 *    - Extract two heaviest stones (y and x where y >= x)
 *    - If they are equal, both are destroyed
 *    - If they are different, destroy x and add (y-x) back to heap
 * 3. Return the last remaining stone or 0 if none left
 * 
 * Time Complexity: O(n log n)
 * - Building heap: O(n log n)
 * - Each operation (poll/add): O(log n)
 * - In worst case, we do O(n) operations
 * 
 * Space Complexity: O(n)
 * - MaxHeap stores all stones
 */
function lastStoneWeight(stones) {
    // Create max heap
    const maxHeap = new MaxHeap();
    
    // Add all stones to max heap
    for (const stone of stones) {
        maxHeap.add(stone);
    }
    
    // Continue smashing stones until at most 1 remains
    while (maxHeap.size() > 1) {
        const y = maxHeap.poll(); // Heaviest stone
        const x = maxHeap.poll(); // Second heaviest stone
        
        // If stones are different, add the difference back
        if (x !== y) {
            maxHeap.add(y - x);
        }
        // If stones are equal, both are destroyed (no need to add anything)
    }
    
    // Return the last remaining stone or 0 if none left
    return maxHeap.isEmpty() ? 0 : maxHeap.poll();
}

/**
 * Alternative Approach: Using Array.sort() (Less efficient but simpler)
 * 
 * Time Complexity: O(n² log n) - sorting n times
 * Space Complexity: O(1) - in-place sorting
 */
function lastStoneWeightAlternative(stones) {
    const stoneList = [...stones];
    
    while (stoneList.length > 1) {
        stoneList.sort((a, b) => b - a); // Sort in descending order
        const y = stoneList[0];
        const x = stoneList[1];
        
        stoneList.splice(0, 2); // Remove first two elements
        
        if (x !== y) {
            stoneList.push(y - x);
        }
    }
    
    return stoneList.length === 0 ? 0 : stoneList[0];
}

/**
 * Simple approach using built-in array methods
 * 
 * Time Complexity: O(n² log n)
 * Space Complexity: O(n)
 */
function lastStoneWeightSimple(stones) {
    const heap = [...stones];
    
    while (heap.length > 1) {
        heap.sort((a, b) => b - a); // Sort in descending order
        const y = heap.shift(); // Remove and return first element
        const x = heap.shift(); // Remove and return second element
        
        if (x !== y) {
            heap.push(y - x);
        }
    }
    
    return heap.length === 0 ? 0 : heap[0];
}

/**
 * Visualize the smashing process for debugging
 */
function visualizeSmashing(stones) {
    console.log("Original stones:", stones);
    
    const maxHeap = new MaxHeap();
    for (const stone of stones) {
        maxHeap.add(stone);
    }
    
    let step = 1;
    while (maxHeap.size() > 1) {
        const y = maxHeap.poll();
        const x = maxHeap.poll();
        
        console.log(`Step ${step}: Smash ${y} and ${x}`);
        
        if (x !== y) {
            const remaining = y - x;
            maxHeap.add(remaining);
            console.log(`Result: ${remaining} stone remains`);
        } else {
            console.log("Result: Both stones destroyed");
        }
        
        step++;
    }
    
    const result = maxHeap.isEmpty() ? 0 : maxHeap.poll();
    console.log(`Final result: ${result}`);
}

// Test cases
function runTests() {
    console.log("=== Last Stone Weight Problem ===\n");
    
    // Test case 1
    const stones1 = [2, 7, 4, 1, 8, 1];
    console.log("Test Case 1:");
    console.log("Input:", stones1);
    console.log("Expected: 1");
    console.log("Output:", lastStoneWeight(stones1));
    console.log();
    
    // Test case 2
    const stones2 = [1];
    console.log("Test Case 2:");
    console.log("Input:", stones2);
    console.log("Expected: 1");
    console.log("Output:", lastStoneWeight(stones2));
    console.log();
    
    // Test case 3
    const stones3 = [1, 1];
    console.log("Test Case 3:");
    console.log("Input:", stones3);
    console.log("Expected: 0");
    console.log("Output:", lastStoneWeight(stones3));
    console.log();
    
    // Visualization
    console.log("=== Visualization ===");
    visualizeSmashing(stones1);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        lastStoneWeight,
        lastStoneWeightAlternative,
        lastStoneWeightSimple,
        MaxHeap,
        visualizeSmashing,
        runTests
    };
} else {
    // Run if executed directly
    runTests();
} 