package linkedlist;

import java.util.*;

/**
 * Linked List Introduction
 * 
 * A Linked List is a linear data structure in which elements (called nodes) 
 * are connected using pointers. Each node contains:
 * - A value (the actual data)
 * - A reference (or pointer) to the next node (and optionally to the previous node in doubly linked lists)
 * 
 * Types of Linked Lists:
 * 
 * 1. Singly Linked List
 *    - value: the data part
 *    - next: a pointer/reference to the next node
 *    - It moves only in one direction (forward)
 *    - Structure: [value | next] -> [value | next] -> [value | null]
 * 
 * 2. Doubly Linked List
 *    - value: the data
 *    - next: pointer to the next node
 *    - prev: pointer to the previous node
 *    - Allows bidirectional traversal
 *    - Structure: null <- [prev | value | next] <-> [prev | value | next] -> null
 * 
 * Key Terminologies:
 * - Head: The first node of a linked list. It marks the entry point and points to the next node.
 * - Tail: The last node of a linked list. It points to null because there's no node after it.
 * - Linked List Representation: It is typically represented using its head node.
 */

// Basic Node Structure for Singly Linked List
class Node {
    int value;
    Node next;
    
    Node(int value) {
        this.value = value;
        this.next = null;
    }
}

// Basic Node Structure for Doubly Linked List
class DoublyNode {
    int value;
    DoublyNode next;
    DoublyNode prev;
    
    DoublyNode(int value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

// Basic Singly Linked List Implementation
class SinglyLinkedList {
    private Node head;
    private Node tail;
    private int size;
    
    public SinglyLinkedList() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    // Add a node at the end
    public void append(int value) {
        Node newNode = new Node(value);
        
        if (head == null) {
            head = newNode;
            tail = newNode;
        } else {
            tail.next = newNode;
            tail = newNode;
        }
        
        size++;
    }
    
    // Add a node at the beginning
    public void prepend(int value) {
        Node newNode = new Node(value);
        
        if (head == null) {
            head = newNode;
            tail = newNode;
        } else {
            newNode.next = head;
            head = newNode;
        }
        
        size++;
    }
    
    // Print the linked list
    public String print() {
        Node current = head;
        StringBuilder result = new StringBuilder();
        
        while (current != null) {
            result.append(current.value);
            if (current.next != null) {
                result.append(" -> ");
            }
            current = current.next;
        }
        
        return result.toString();
    }
    
    // Get the size of the linked list
    public int getSize() {
        return size;
    }
    
    // Check if the linked list is empty
    public boolean isEmpty() {
        return size == 0;
    }
}

// Basic Doubly Linked List Implementation
class DoublyLinkedList {
    private DoublyNode head;
    private DoublyNode tail;
    private int size;
    
    public DoublyLinkedList() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    // Add a node at the end
    public void append(int value) {
        DoublyNode newNode = new DoublyNode(value);
        
        if (head == null) {
            head = newNode;
            tail = newNode;
        } else {
            newNode.prev = tail;
            tail.next = newNode;
            tail = newNode;
        }
        
        size++;
    }
    
    // Add a node at the beginning
    public void prepend(int value) {
        DoublyNode newNode = new DoublyNode(value);
        
        if (head == null) {
            head = newNode;
            tail = newNode;
        } else {
            newNode.next = head;
            head.prev = newNode;
            head = newNode;
        }
        
        size++;
    }
    
    // Print the linked list forward
    public String printForward() {
        DoublyNode current = head;
        StringBuilder result = new StringBuilder();
        
        while (current != null) {
            result.append(current.value);
            if (current.next != null) {
                result.append(" <-> ");
            }
            current = current.next;
        }
        
        return result.toString();
    }
    
    // Print the linked list backward
    public String printBackward() {
        DoublyNode current = tail;
        StringBuilder result = new StringBuilder();
        
        while (current != null) {
            result.append(current.value);
            if (current.prev != null) {
                result.append(" <-> ");
            }
            current = current.prev;
        }
        
        return result.toString();
    }
}

/**
 * Array vs Linked List — Comparison Table:
 * 
 * Feature                    | Array                    | Linked List
 * --------------------------|--------------------------|--------------------------
 * Type                      | Linear data structure where elements are arranged in a sequence using indexes. | Linear data structure where each element (node) points to the next, forming a chain.
 * Memory Layout             | Elements are stored in a contiguous (adjacent) block of memory. | Each node is stored separately and connected via pointers, allowing scattered memory locations.
 * Size                      | Size must be known or defined initially. Resizing is expensive if needed later. | Size is dynamic. Nodes can be added or removed without knowing the size in advance.
 * Data Stored               | Only values are stored (e.g., integers, strings, etc.) | Each node stores a value along with one or more pointers (to next and/or previous nodes).
 * Access Time (Indexing)    | Direct access using index (e.g., arr[3]) is fast with time complexity O(1). | Sequential access only. To get a value, you must start at the head and traverse node by node. Time complexity O(n).
 * Insertion/Deletion        | Inserting or deleting in the middle requires shifting elements. Can be time-consuming. | Insertion and deletion are faster, especially at the beginning or end, as it only involves pointer changes.
 * Memory Efficiency         | Efficient memory usage as no extra space is needed for pointers. | Extra memory is used to store pointers (next/prev), making it less memory efficient.
 */

/**
 * Use Cases: When to Use What?
 * 
 * Use Case                                    | Prefer
 * -------------------------------------------|-------------------------------------------
 * Access elements by index fast              | Array – Arrays provide direct access to elements using an index, making it very fast (O(1)). Ideal when random access is frequent.
 * Frequent insertions/deletions at head or tail | Linked List – Inserting or removing nodes at the beginning or end is efficient in linked lists since you just change a few pointers (O(1)).
 * Static-sized data with memory-efficient storage | Array – Arrays are more memory-efficient as they don't use extra space for pointers. Best when the number of elements is fixed or predictable.
 * Unknown size or avoid resizing overhead    | Linked List – Since linked lists grow as needed, they are a better choice when the size of the data is not known upfront or changes frequently.
 * Do a lot of traversal or manipulation      | Linked List – When you need to move around, insert or remove nodes repeatedly, linked lists offer better flexibility for such operations.
 */

public class Intro {
    
    // Demonstration and Examples
    public static void demonstrateLinkedList() {
        System.out.println("=== Linked List Introduction ===\n");
        
        // Singly Linked List Example
        System.out.println("1. Singly Linked List Example:");
        SinglyLinkedList singlyList = new SinglyLinkedList();
        singlyList.append(10);
        singlyList.append(20);
        singlyList.append(30);
        singlyList.prepend(5);
        
        System.out.println("Singly Linked List: " + singlyList.print());
        System.out.println("Size: " + singlyList.getSize());
        System.out.println("Is Empty: " + singlyList.isEmpty());
        System.out.println();
        
        // Doubly Linked List Example
        System.out.println("2. Doubly Linked List Example:");
        DoublyLinkedList doublyList = new DoublyLinkedList();
        doublyList.append(100);
        doublyList.append(200);
        doublyList.append(300);
        doublyList.prepend(50);
        
        System.out.println("Forward traversal: " + doublyList.printForward());
        System.out.println("Backward traversal: " + doublyList.printBackward());
        System.out.println();
        
        // Memory Layout Comparison
        System.out.println("3. Memory Layout Comparison:");
        System.out.println("Array: [1, 2, 3, 4, 5]");
        System.out.println("Memory: [1][2][3][4][5] (contiguous)");
        System.out.println();
        System.out.println("Linked List: 1 -> 2 -> 3 -> 4 -> 5");
        System.out.println("Memory: [1|ptr] -> [2|ptr] -> [3|ptr] -> [4|ptr] -> [5|null] (scattered)");
        System.out.println();
        
        // Time Complexity Comparison
        System.out.println("4. Time Complexity Comparison:");
        System.out.println("Operation          | Array    | Linked List");
        System.out.println("-------------------|----------|------------");
        System.out.println("Access by index    | O(1)     | O(n)");
        System.out.println("Insert at beginning| O(n)     | O(1)");
        System.out.println("Insert at end      | O(1)     | O(1)");
        System.out.println("Insert in middle   | O(n)     | O(n)");
        System.out.println("Delete at beginning| O(n)     | O(1)");
        System.out.println("Delete at end      | O(1)     | O(1)");
        System.out.println("Delete in middle   | O(n)     | O(n)");
        System.out.println();
        
        // Use Case Examples
        System.out.println("5. Use Case Examples:");
        System.out.println("Use Array when:");
        System.out.println("- You need fast random access (e.g., lookup table)");
        System.out.println("- Size is known and fixed");
        System.out.println("- Memory efficiency is crucial");
        System.out.println("- You frequently access elements by index");
        System.out.println();
        System.out.println("Use Linked List when:");
        System.out.println("- You frequently insert/delete at beginning/end");
        System.out.println("- Size is unknown or changes frequently");
        System.out.println("- You need to traverse and manipulate the structure");
        System.out.println("- You want to avoid resizing overhead");
        System.out.println();
        
        // Performance Comparison Example
        System.out.println("6. Performance Comparison Example:");
        comparePerformance();
    }
    
    // Performance comparison between Array and LinkedList
    private static void comparePerformance() {
        System.out.println("Performance Test with 100,000 elements:");
        
        // Array operations
        long startTime = System.nanoTime();
        int[] array = new int[100000];
        for (int i = 0; i < 100000; i++) {
            array[i] = i;
        }
        long arrayCreationTime = System.nanoTime() - startTime;
        
        // Array access test
        startTime = System.nanoTime();
        int sum = 0;
        for (int i = 0; i < 100000; i++) {
            sum += array[i];
        }
        long arrayAccessTime = System.nanoTime() - startTime;
        
        // LinkedList operations
        startTime = System.nanoTime();
        SinglyLinkedList list = new SinglyLinkedList();
        for (int i = 0; i < 100000; i++) {
            list.append(i);
        }
        long listCreationTime = System.nanoTime() - startTime;
        
        System.out.printf("Array creation time: %.2f ms%n", arrayCreationTime / 1_000_000.0);
        System.out.printf("Array access time: %.2f ms%n", arrayAccessTime / 1_000_000.0);
        System.out.printf("LinkedList creation time: %.2f ms%n", listCreationTime / 1_000_000.0);
        System.out.println("Note: LinkedList access would be much slower due to O(n) traversal");
        System.out.println();
    }
    
    public static void main(String[] args) {
        demonstrateLinkedList();
    }
} 