/**
 * Merge K Sorted Lists
 * 
 * Problem:
 * You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
 * Merge all the linked-lists into one sorted linked-list and return it.
 * 
 * Example:
 * Input: lists = [[1,4,5],[1,3,4],[2,6]]
 * Output: [1,1,2,3,4,4,5,6]
 * Explanation:
 * - List 1: 1->4->5
 * - List 2: 1->3->4
 * - List 3: 2->6
 * - Merged: 1->1->2->3->4->4->5->6
 * 
 * Approach:
 * 1. Use a min heap to efficiently get the smallest node
 * 2. Add the head of each list to the heap
 * 3. While heap is not empty:
 *    - Extract minimum node
 *    - Add it to result list
 *    - Add its next node to heap if exists
 * 4. Return the merged list
 * 
 * Time Complexity: O(N log k) where N is total number of nodes and k is number of lists
 * Space Complexity: O(k) for the heap
 */

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    push(node) {
        this.heap.push(node);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].val <= this.heap[index].val) break;
            
            [this.heap[parentIndex], this.heap[index]] = 
            [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    bubbleDown(index) {
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (left < this.heap.length && 
                this.heap[left].val < this.heap[smallest].val) {
                smallest = left;
            }

            if (right < this.heap.length && 
                this.heap[right].val < this.heap[smallest].val) {
                smallest = right;
            }

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = 
            [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

class MergeKSortedLists {
    /**
     * @param {ListNode[]} lists
     * @return {ListNode}
     */
    mergeKLists(lists) {
        if (!lists || lists.length === 0) return null;

        // Create min heap and add first node of each list
        const minHeap = new MinHeap();
        for (const list of lists) {
            if (list) minHeap.push(list);
        }

        // Create dummy node for result
        const dummy = new ListNode(0);
        let current = dummy;

        // Merge lists
        while (minHeap.size() > 0) {
            const node = minHeap.pop();
            current.next = node;
            current = current.next;

            if (node.next) {
                minHeap.push(node.next);
            }
        }

        return dummy.next;
    }

    // Helper method to create a linked list
    static createList(values) {
        if (!values || values.length === 0) return null;
        
        const head = new ListNode(values[0]);
        let current = head;
        
        for (let i = 1; i < values.length; i++) {
            current.next = new ListNode(values[i]);
            current = current.next;
        }
        
        return head;
    }

    // Helper method to print the list
    static printList(head) {
        let current = head;
        const values = [];
        while (current) {
            values.push(current.val);
            current = current.next;
        }
        console.log(values.join(' -> '));
    }
}

// Test cases
function runTests() {
    const solution = new MergeKSortedLists();

    // Test case 1: Regular case with 3 lists
    console.log("Test case 1: Regular case with 3 lists");
    const lists1 = [
        MergeKSortedLists.createList([1, 4, 5]),
        MergeKSortedLists.createList([1, 3, 4]),
        MergeKSortedLists.createList([2, 6])
    ];
    console.log("Original lists:");
    lists1.forEach((list, i) => {
        console.log(`List ${i + 1}:`);
        MergeKSortedLists.printList(list);
    });
    console.log("Merged list:");
    MergeKSortedLists.printList(solution.mergeKLists(lists1));

    // Test case 2: Empty array of lists
    console.log("\nTest case 2: Empty array of lists");
    const lists2 = [];
    console.log("Original lists: []");
    console.log("Merged list:");
    MergeKSortedLists.printList(solution.mergeKLists(lists2));

    // Test case 3: Single list
    console.log("\nTest case 3: Single list");
    const lists3 = [MergeKSortedLists.createList([1, 2, 3])];
    console.log("Original list:");
    MergeKSortedLists.printList(lists3[0]);
    console.log("Merged list:");
    MergeKSortedLists.printList(solution.mergeKLists(lists3));

    // Test case 4: Lists with different lengths
    console.log("\nTest case 4: Lists with different lengths");
    const lists4 = [
        MergeKSortedLists.createList([1, 3, 5, 7]),
        MergeKSortedLists.createList([2, 4]),
        MergeKSortedLists.createList([6, 8, 9, 10])
    ];
    console.log("Original lists:");
    lists4.forEach((list, i) => {
        console.log(`List ${i + 1}:`);
        MergeKSortedLists.printList(list);
    });
    console.log("Merged list:");
    MergeKSortedLists.printList(solution.mergeKLists(lists4));

    // Test case 5: Lists with negative numbers
    console.log("\nTest case 5: Lists with negative numbers");
    const lists5 = [
        MergeKSortedLists.createList([-3, -1, 1]),
        MergeKSortedLists.createList([-2, 0, 2]),
        MergeKSortedLists.createList([-4, -2, 0])
    ];
    console.log("Original lists:");
    lists5.forEach((list, i) => {
        console.log(`List ${i + 1}:`);
        MergeKSortedLists.printList(list);
    });
    console.log("Merged list:");
    MergeKSortedLists.printList(solution.mergeKLists(lists5));

    // Test case 6: Lists with duplicate values
    console.log("\nTest case 6: Lists with duplicate values");
    const lists6 = [
        MergeKSortedLists.createList([1, 1, 2, 2]),
        MergeKSortedLists.createList([1, 2, 2, 3]),
        MergeKSortedLists.createList([2, 3, 3, 4])
    ];
    console.log("Original lists:");
    lists6.forEach((list, i) => {
        console.log(`List ${i + 1}:`);
        MergeKSortedLists.printList(list);
    });
    console.log("Merged list:");
    MergeKSortedLists.printList(solution.mergeKLists(lists6));
}

// Run the tests
runTests(); 