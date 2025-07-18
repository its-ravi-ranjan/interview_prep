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

import java.util.*;

/**
 * Stack Implementation using ArrayList
 */
class Stack<T> {
    private List<T> items;
    
    public Stack() {
        this.items = new ArrayList<>();
    }
    
    /**
     * Add element to the top of stack
     * @param element Element to add
     */
    public void push(T element) {
        items.add(element);
    }
    
    /**
     * Remove and return the top element
     * @return The top element or null if stack is empty
     */
    public T pop() {
        if (isEmpty()) {
            return null;
        }
        return items.remove(items.size() - 1);
    }
    
    /**
     * View the top element without removing it
     * @return The top element or null if stack is empty
     */
    public T peek() {
        if (isEmpty()) {
            return null;
        }
        return items.get(items.size() - 1);
    }
    
    /**
     * Check if stack is empty
     * @return True if stack is empty, false otherwise
     */
    public boolean isEmpty() {
        return items.isEmpty();
    }
    
    /**
     * Get the size of stack
     * @return Number of elements in stack
     */
    public int size() {
        return items.size();
    }
    
    /**
     * Clear all elements from stack
     */
    public void clear() {
        items.clear();
    }
    
    /**
     * Convert stack to string for display
     * @return String representation of stack
     */
    @Override
    public String toString() {
        return items.toString();
    }
}

/**
 * Queue Implementation using LinkedList
 */
class Queue<T> {
    private LinkedList<T> items;
    
    public Queue() {
        this.items = new LinkedList<>();
    }
    
    /**
     * Add element to the end of queue
     * @param element Element to add
     */
    public void enqueue(T element) {
        items.addLast(element);
    }
    
    /**
     * Remove and return the front element
     * @return The front element or null if queue is empty
     */
    public T dequeue() {
        if (isEmpty()) {
            return null;
        }
        return items.removeFirst();
    }
    
    /**
     * View the front element without removing it
     * @return The front element or null if queue is empty
     */
    public T peek() {
        if (isEmpty()) {
            return null;
        }
        return items.getFirst();
    }
    
    /**
     * Check if queue is empty
     * @return True if queue is empty, false otherwise
     */
    public boolean isEmpty() {
        return items.isEmpty();
    }
    
    /**
     * Get the size of queue
     * @return Number of elements in queue
     */
    public int size() {
        return items.size();
    }
    
    /**
     * Clear all elements from queue
     */
    public void clear() {
        items.clear();
    }
    
    /**
     * Convert queue to string for display
     * @return String representation of queue
     */
    @Override
    public String toString() {
        return items.toString();
    }
}

/**
 * Priority Queue Implementation
 * Elements are dequeued based on their priority (lower number = higher priority)
 */
class PriorityQueue<T> {
    private List<QueueElement<T>> items;
    
    private static class QueueElement<T> {
        T element;
        int priority;
        
        QueueElement(T element, int priority) {
            this.element = element;
            this.priority = priority;
        }
    }
    
    public PriorityQueue() {
        this.items = new ArrayList<>();
    }
    
    /**
     * Add element with priority to queue
     * @param element Element to add
     * @param priority Priority of element (lower = higher priority)
     */
    public void enqueue(T element, int priority) {
        QueueElement<T> queueElement = new QueueElement<>(element, priority);
        boolean added = false;
        
        for (int i = 0; i < items.size(); i++) {
            if (queueElement.priority < items.get(i).priority) {
                items.add(i, queueElement);
                added = true;
                break;
            }
        }
        
        if (!added) {
            items.add(queueElement);
        }
    }
    
    /**
     * Remove and return the highest priority element
     * @return The highest priority element or null if queue is empty
     */
    public T dequeue() {
        if (isEmpty()) {
            return null;
        }
        return items.remove(0).element;
    }
    
    /**
     * View the highest priority element without removing it
     * @return The highest priority element or null if queue is empty
     */
    public T peek() {
        if (isEmpty()) {
            return null;
        }
        return items.get(0).element;
    }
    
    /**
     * Check if priority queue is empty
     * @return True if queue is empty, false otherwise
     */
    public boolean isEmpty() {
        return items.isEmpty();
    }
    
    /**
     * Get the size of priority queue
     * @return Number of elements in queue
     */
    public int size() {
        return items.size();
    }
    
    /**
     * Clear all elements from priority queue
     */
    public void clear() {
        items.clear();
    }
    
    /**
     * Convert priority queue to string for display
     * @return String representation of priority queue
     */
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < items.size(); i++) {
            QueueElement<T> item = items.get(i);
            sb.append(item.element).append(":").append(item.priority);
            if (i < items.size() - 1) {
                sb.append(", ");
            }
        }
        return sb.toString();
    }
}

/**
 * Circular Queue Implementation
 * Fixed-size queue that reuses space when elements are dequeued
 */
class CircularQueue<T> {
    private T[] items;
    private int front;
    private int rear;
    private int size;
    private int capacity;
    
    @SuppressWarnings("unchecked")
    public CircularQueue(int capacity) {
        this.capacity = capacity;
        this.items = (T[]) new Object[capacity];
        this.front = -1;
        this.rear = -1;
        this.size = 0;
    }
    
    /**
     * Add element to the end of circular queue
     * @param element Element to add
     * @return True if successful, false if queue is full
     */
    public boolean enqueue(T element) {
        if (isFull()) {
            return false;
        }
        
        if (isEmpty()) {
            front = 0;
        }
        
        rear = (rear + 1) % capacity;
        items[rear] = element;
        size++;
        return true;
    }
    
    /**
     * Remove and return the front element
     * @return The front element or null if queue is empty
     */
    public T dequeue() {
        if (isEmpty()) {
            return null;
        }
        
        T element = items[front];
        
        if (front == rear) {
            front = -1;
            rear = -1;
        } else {
            front = (front + 1) % capacity;
        }
        
        size--;
        return element;
    }
    
    /**
     * View the front element without removing it
     * @return The front element or null if queue is empty
     */
    public T peek() {
        if (isEmpty()) {
            return null;
        }
        return items[front];
    }
    
    /**
     * Check if circular queue is empty
     * @return True if queue is empty, false otherwise
     */
    public boolean isEmpty() {
        return size == 0;
    }
    
    /**
     * Check if circular queue is full
     * @return True if queue is full, false otherwise
     */
    public boolean isFull() {
        return size == capacity;
    }
    
    /**
     * Get the size of circular queue
     * @return Number of elements in queue
     */
    public int getSize() {
        return size;
    }
    
    /**
     * Clear all elements from circular queue
     */
    public void clear() {
        Arrays.fill(items, null);
        front = -1;
        rear = -1;
        size = 0;
    }
    
    /**
     * Convert circular queue to string for display
     * @return String representation of circular queue
     */
    @Override
    public String toString() {
        if (isEmpty()) {
            return "[]";
        }
        
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        
        int count = 0;
        int index = front;
        
        while (count < size) {
            sb.append(items[index]);
            count++;
            if (count < size) {
                sb.append(", ");
            }
            index = (index + 1) % capacity;
        }
        
        sb.append("]");
        return sb.toString();
    }
}

/**
 * Main class to demonstrate Stack and Queue operations
 */
public class intro {
    
    /**
     * Demonstrate Stack operations
     */
    public static void demonstrateStack() {
        System.out.println("=== Stack Demonstration ===");
        
        Stack<Integer> stack = new Stack<>();
        
        System.out.println("Initial stack: " + stack);
        System.out.println("Is empty: " + stack.isEmpty());
        
        // Push operations
        stack.push(1);
        System.out.println("After push(1): " + stack);
        
        stack.push(3);
        System.out.println("After push(3): " + stack);
        
        stack.push(5);
        System.out.println("After push(5): " + stack);
        
        // Peek operation
        System.out.println("Peek: " + stack.peek());
        System.out.println("Stack after peek: " + stack);
        
        // Pop operations
        System.out.println("Pop: " + stack.pop());
        System.out.println("After pop: " + stack);
        
        System.out.println("Pop: " + stack.pop());
        System.out.println("After pop: " + stack);
        
        System.out.println("Size: " + stack.size());
        System.out.println("Is empty: " + stack.isEmpty());
    }
    
    /**
     * Demonstrate Queue operations
     */
    public static void demonstrateQueue() {
        System.out.println("\n=== Queue Demonstration ===");
        
        Queue<String> queue = new Queue<>();
        
        System.out.println("Initial queue: " + queue);
        System.out.println("Is empty: " + queue.isEmpty());
        
        // Enqueue operations
        queue.enqueue("Alice");
        System.out.println("After enqueue('Alice'): " + queue);
        
        queue.enqueue("Bob");
        System.out.println("After enqueue('Bob'): " + queue);
        
        queue.enqueue("Charlie");
        System.out.println("After enqueue('Charlie'): " + queue);
        
        // Peek operation
        System.out.println("Peek: " + queue.peek());
        System.out.println("Queue after peek: " + queue);
        
        // Dequeue operations
        System.out.println("Dequeue: " + queue.dequeue());
        System.out.println("After dequeue: " + queue);
        
        System.out.println("Dequeue: " + queue.dequeue());
        System.out.println("After dequeue: " + queue);
        
        System.out.println("Size: " + queue.size());
        System.out.println("Is empty: " + queue.isEmpty());
    }
    
    /**
     * Demonstrate Priority Queue operations
     */
    public static void demonstratePriorityQueue() {
        System.out.println("\n=== Priority Queue Demonstration ===");
        
        PriorityQueue<String> pq = new PriorityQueue<>();
        
        // Enqueue with priorities (lower number = higher priority)
        pq.enqueue("Task A", 3);
        pq.enqueue("Task B", 1);
        pq.enqueue("Task C", 2);
        pq.enqueue("Task D", 1);
        
        System.out.println("Priority Queue: " + pq);
        
        // Dequeue all elements
        while (!pq.isEmpty()) {
            System.out.println("Dequeue: " + pq.dequeue());
        }
    }
    
    /**
     * Demonstrate Circular Queue operations
     */
    public static void demonstrateCircularQueue() {
        System.out.println("\n=== Circular Queue Demonstration ===");
        
        CircularQueue<Integer> cq = new CircularQueue<>(3);
        
        System.out.println("Enqueue 1: " + cq.enqueue(1));
        System.out.println("Enqueue 2: " + cq.enqueue(2));
        System.out.println("Enqueue 3: " + cq.enqueue(3));
        System.out.println("Enqueue 4 (should fail): " + cq.enqueue(4));
        
        System.out.println("Dequeue: " + cq.dequeue());
        System.out.println("Enqueue 4: " + cq.enqueue(4));
        
        System.out.println("Size: " + cq.getSize());
        System.out.println("Is full: " + cq.isFull());
        System.out.println("Queue: " + cq);
    }
    
    /**
     * Demonstrate real-world examples
     */
    public static void demonstrateRealWorldExamples() {
        System.out.println("\n=== Real-World Examples ===");
        
        // Browser History (Stack)
        System.out.println("1. Browser History (Stack):");
        Stack<String> browserHistory = new Stack<>();
        browserHistory.push("google.com");
        browserHistory.push("github.com");
        browserHistory.push("stackoverflow.com");
        System.out.println("Current page: " + browserHistory.peek());
        System.out.println("Go back: " + browserHistory.pop());
        System.out.println("Current page: " + browserHistory.peek());
        
        // Print Queue (Queue)
        System.out.println("\n2. Print Queue:");
        Queue<String> printQueue = new Queue<>();
        printQueue.enqueue("Document1.pdf");
        printQueue.enqueue("Document2.pdf");
        printQueue.enqueue("Document3.pdf");
        System.out.println("Next to print: " + printQueue.peek());
        System.out.println("Printing: " + printQueue.dequeue());
        System.out.println("Next to print: " + printQueue.peek());
        
        // Undo/Redo (Stack)
        System.out.println("\n3. Undo/Redo (Stack):");
        Stack<String> undoStack = new Stack<>();
        undoStack.push("Type 'Hello'");
        undoStack.push("Type 'World'");
        undoStack.push("Delete 'World'");
        System.out.println("Undo: " + undoStack.pop());
        System.out.println("Undo: " + undoStack.pop());
        System.out.println("Current state: " + undoStack.peek());
        
        // Task Scheduler (Priority Queue)
        System.out.println("\n4. Task Scheduler (Priority Queue):");
        PriorityQueue<String> taskScheduler = new PriorityQueue<>();
        taskScheduler.enqueue("Low priority task", 3);
        taskScheduler.enqueue("High priority task", 1);
        taskScheduler.enqueue("Medium priority task", 2);
        taskScheduler.enqueue("Critical task", 0);
        
        System.out.println("Processing tasks in priority order:");
        while (!taskScheduler.isEmpty()) {
            System.out.println("Processing: " + taskScheduler.dequeue());
        }
    }
    
    /**
     * Demonstrate Java's built-in Stack and Queue
     */
    public static void demonstrateBuiltInStructures() {
        System.out.println("\n=== Java Built-in Structures ===");
        
        // Java's Stack
        System.out.println("1. Java's Stack:");
        java.util.Stack<Integer> javaStack = new java.util.Stack<>();
        javaStack.push(1);
        javaStack.push(2);
        javaStack.push(3);
        System.out.println("Java Stack: " + javaStack);
        System.out.println("Pop: " + javaStack.pop());
        System.out.println("Peek: " + javaStack.peek());
        
        // Java's PriorityQueue
        System.out.println("\n2. Java's PriorityQueue:");
        java.util.PriorityQueue<Integer> javaPQ = new java.util.PriorityQueue<>();
        javaPQ.offer(3);
        javaPQ.offer(1);
        javaPQ.offer(2);
        System.out.println("Java PriorityQueue: " + javaPQ);
        System.out.println("Poll: " + javaPQ.poll());
        System.out.println("Peek: " + javaPQ.peek());
        
        // Java's LinkedList as Queue
        System.out.println("\n3. Java's LinkedList as Queue:");
        java.util.Queue<String> javaQueue = new java.util.LinkedList<>();
        javaQueue.offer("First");
        javaQueue.offer("Second");
        javaQueue.offer("Third");
        System.out.println("Java Queue: " + javaQueue);
        System.out.println("Poll: " + javaQueue.poll());
        System.out.println("Peek: " + javaQueue.peek());
    }
    
    public static void main(String[] args) {
        demonstrateStack();
        demonstrateQueue();
        demonstratePriorityQueue();
        demonstrateCircularQueue();
        demonstrateRealWorldExamples();
        demonstrateBuiltInStructures();
    }
} 