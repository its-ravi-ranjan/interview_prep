/**
 * Stack and Queue Data Structures Introduction
 * 
 * What is a Stack?
 * Stack follows the LIFO (Last-In-First-Out) principle. The last element added is the first one to come out.
 * 
 * Stack Operations:
 * - Push: Add an element to the top
 * - Pop: Remove the top element
 * - Peek/Top: View the top-most element
 * 
 * Example Flow:
 * stack.push(1) → [1]
 * stack.push(3) → [1, 3]
 * stack.pop() → returns 3 → [1]
 * stack.peek() → returns 1
 * 
 * Examples:
 * - Stacks of Books
 * - Undo/Redo feature
 * - Recursion (Function Call Stack)
 * - Browsing History
 * 
 * What is a Queue?
 * Queue follows the FIFO (First-In-First-Out) principle. The first element added is the first to be removed.
 * 
 * Queue Operations:
 * - Enqueue: Add an element to the end
 * - Dequeue: Remove element from the front
 * - Peek/Front: View the front-most element
 * 
 * Examples:
 * - Ticket Counter
 * - OS Task Scheduling
 * - Printers
 * - Queues (in general)
 * 
 * Why Use Stack and Queue?
 * - Organize data logically (based on problem's need)
 * - Order of Operations Matter
 * - Optimize time & memory for specific scenarios
 * 
 * Use Cases:
 * - Recursion (stack)
 * - Level Order Traversal (queue)
 * - BFS (queue)
 * - DFS (stack)
 */

/**
 * Stack Implementation using Array
 */
class Stack {
    constructor() {
        this.items = [];
    }

    /**
     * Add element to the top of stack
     * @param {*} element - Element to add
     */
    push(element) {
        this.items.push(element);
    }

    /**
     * Remove and return the top element
     * @returns {*} The top element or undefined if stack is empty
     */
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.pop();
    }

    /**
     * View the top element without removing it
     * @returns {*} The top element or undefined if stack is empty
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.items.length - 1];
    }

    /**
     * Check if stack is empty
     * @returns {boolean} True if stack is empty, false otherwise
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Get the size of stack
     * @returns {number} Number of elements in stack
     */
    size() {
        return this.items.length;
    }

    /**
     * Clear all elements from stack
     */
    clear() {
        this.items = [];
    }

    /**
     * Convert stack to string for display
     * @returns {string} String representation of stack
     */
    toString() {
        return this.items.toString();
    }
}

/**
 * Queue Implementation using Array
 */
class Queue {
    constructor() {
        this.items = [];
    }

    /**
     * Add element to the end of queue
     * @param {*} element - Element to add
     */
    enqueue(element) {
        this.items.push(element);
    }

    /**
     * Remove and return the front element
     * @returns {*} The front element or undefined if queue is empty
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.shift();
    }

    /**
     * View the front element without removing it
     * @returns {*} The front element or undefined if queue is empty
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[0];
    }

    /**
     * Check if queue is empty
     * @returns {boolean} True if queue is empty, false otherwise
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Get the size of queue
     * @returns {number} Number of elements in queue
     */
    size() {
        return this.items.length;
    }

    /**
     * Clear all elements from queue
     */
    clear() {
        this.items = [];
    }

    /**
     * Convert queue to string for display
     * @returns {string} String representation of queue
     */
    toString() {
        return this.items.toString();
    }
}

/**
 * Priority Queue Implementation
 * Elements are dequeued based on their priority (lower number = higher priority)
 */
class PriorityQueue {
    constructor() {
        this.items = [];
    }

    /**
     * Add element with priority to queue
     * @param {*} element - Element to add
     * @param {number} priority - Priority of element (lower = higher priority)
     */
    enqueue(element, priority) {
        const queueElement = { element, priority };
        let added = false;

        for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority < this.items[i].priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }

        if (!added) {
            this.items.push(queueElement);
        }
    }

    /**
     * Remove and return the highest priority element
     * @returns {*} The highest priority element or undefined if queue is empty
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.shift().element;
    }

    /**
     * View the highest priority element without removing it
     * @returns {*} The highest priority element or undefined if queue is empty
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[0].element;
    }

    /**
     * Check if priority queue is empty
     * @returns {boolean} True if queue is empty, false otherwise
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Get the size of priority queue
     * @returns {number} Number of elements in queue
     */
    size() {
        return this.items.length;
    }

    /**
     * Clear all elements from priority queue
     */
    clear() {
        this.items = [];
    }

    /**
     * Convert priority queue to string for display
     * @returns {string} String representation of priority queue
     */
    toString() {
        return this.items.map(item => `${item.element}:${item.priority}`).join(', ');
    }
}

/**
 * Circular Queue Implementation
 * Fixed-size queue that reuses space when elements are dequeued
 */
class CircularQueue {
    constructor(capacity) {
        this.capacity = capacity;
        this.items = new Array(capacity);
        this.front = -1;
        this.rear = -1;
        this.size = 0;
    }

    /**
     * Add element to the end of circular queue
     * @param {*} element - Element to add
     * @returns {boolean} True if successful, false if queue is full
     */
    enqueue(element) {
        if (this.isFull()) {
            return false;
        }

        if (this.isEmpty()) {
            this.front = 0;
        }

        this.rear = (this.rear + 1) % this.capacity;
        this.items[this.rear] = element;
        this.size++;
        return true;
    }

    /**
     * Remove and return the front element
     * @returns {*} The front element or undefined if queue is empty
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }

        const element = this.items[this.front];
        
        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.capacity;
        }
        
        this.size--;
        return element;
    }

    /**
     * View the front element without removing it
     * @returns {*} The front element or undefined if queue is empty
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.front];
    }

    /**
     * Check if circular queue is empty
     * @returns {boolean} True if queue is empty, false otherwise
     */
    isEmpty() {
        return this.size === 0;
    }

    /**
     * Check if circular queue is full
     * @returns {boolean} True if queue is full, false otherwise
     */
    isFull() {
        return this.size === this.capacity;
    }

    /**
     * Get the size of circular queue
     * @returns {number} Number of elements in queue
     */
    getSize() {
        return this.size;
    }

    /**
     * Clear all elements from circular queue
     */
    clear() {
        this.items = new Array(this.capacity);
        this.front = -1;
        this.rear = -1;
        this.size = 0;
    }
}

// Demonstration and Examples
function demonstrateStack() {
    console.log("=== Stack Demonstration ===");
    
    const stack = new Stack();
    
    console.log("Initial stack:", stack.toString());
    console.log("Is empty:", stack.isEmpty());
    
    // Push operations
    stack.push(1);
    console.log("After push(1):", stack.toString());
    
    stack.push(3);
    console.log("After push(3):", stack.toString());
    
    stack.push(5);
    console.log("After push(5):", stack.toString());
    
    // Peek operation
    console.log("Peek:", stack.peek());
    console.log("Stack after peek:", stack.toString());
    
    // Pop operations
    console.log("Pop:", stack.pop());
    console.log("After pop:", stack.toString());
    
    console.log("Pop:", stack.pop());
    console.log("After pop:", stack.toString());
    
    console.log("Size:", stack.size());
    console.log("Is empty:", stack.isEmpty());
}

function demonstrateQueue() {
    console.log("\n=== Queue Demonstration ===");
    
    const queue = new Queue();
    
    console.log("Initial queue:", queue.toString());
    console.log("Is empty:", queue.isEmpty());
    
    // Enqueue operations
    queue.enqueue("Alice");
    console.log("After enqueue('Alice'):", queue.toString());
    
    queue.enqueue("Bob");
    console.log("After enqueue('Bob'):", queue.toString());
    
    queue.enqueue("Charlie");
    console.log("After enqueue('Charlie'):", queue.toString());
    
    // Peek operation
    console.log("Peek:", queue.peek());
    console.log("Queue after peek:", queue.toString());
    
    // Dequeue operations
    console.log("Dequeue:", queue.dequeue());
    console.log("After dequeue:", queue.toString());
    
    console.log("Dequeue:", queue.dequeue());
    console.log("After dequeue:", queue.toString());
    
    console.log("Size:", queue.size());
    console.log("Is empty:", queue.isEmpty());
}

function demonstratePriorityQueue() {
    console.log("\n=== Priority Queue Demonstration ===");
    
    const pq = new PriorityQueue();
    
    // Enqueue with priorities (lower number = higher priority)
    pq.enqueue("Task A", 3);
    pq.enqueue("Task B", 1);
    pq.enqueue("Task C", 2);
    pq.enqueue("Task D", 1);
    
    console.log("Priority Queue:", pq.toString());
    
    // Dequeue all elements
    while (!pq.isEmpty()) {
        console.log("Dequeue:", pq.dequeue());
    }
}

function demonstrateCircularQueue() {
    console.log("\n=== Circular Queue Demonstration ===");
    
    const cq = new CircularQueue(3);
    
    console.log("Enqueue 1:", cq.enqueue(1));
    console.log("Enqueue 2:", cq.enqueue(2));
    console.log("Enqueue 3:", cq.enqueue(3));
    console.log("Enqueue 4 (should fail):", cq.enqueue(4));
    
    console.log("Dequeue:", cq.dequeue());
    console.log("Enqueue 4:", cq.enqueue(4));
    
    console.log("Size:", cq.getSize());
    console.log("Is full:", cq.isFull());
}

// Real-world examples
function demonstrateRealWorldExamples() {
    console.log("\n=== Real-World Examples ===");
    
    // Browser History (Stack)
    console.log("1. Browser History (Stack):");
    const browserHistory = new Stack();
    browserHistory.push("google.com");
    browserHistory.push("github.com");
    browserHistory.push("stackoverflow.com");
    console.log("Current page:", browserHistory.peek());
    console.log("Go back:", browserHistory.pop());
    console.log("Current page:", browserHistory.peek());
    
    // Print Queue (Queue)
    console.log("\n2. Print Queue:");
    const printQueue = new Queue();
    printQueue.enqueue("Document1.pdf");
    printQueue.enqueue("Document2.pdf");
    printQueue.enqueue("Document3.pdf");
    console.log("Next to print:", printQueue.peek());
    console.log("Printing:", printQueue.dequeue());
    console.log("Next to print:", printQueue.peek());
    
    // Undo/Redo (Stack)
    console.log("\n3. Undo/Redo (Stack):");
    const undoStack = new Stack();
    undoStack.push("Type 'Hello'");
    undoStack.push("Type 'World'");
    undoStack.push("Delete 'World'");
    console.log("Undo:", undoStack.pop());
    console.log("Undo:", undoStack.pop());
    console.log("Current state:", undoStack.peek());
}

// Run demonstrations
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Stack, Queue, PriorityQueue, CircularQueue };
} else {
    demonstrateStack();
    demonstrateQueue();
    demonstratePriorityQueue();
    demonstrateCircularQueue();
    demonstrateRealWorldExamples();
} 