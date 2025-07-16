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
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// Basic Node Structure for Doubly Linked List
class DoublyNode {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

// Basic Singly Linked List Implementation
class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    // Add a node at the end
    append(value) {
        const newNode = new Node(value);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        
        this.size++;
    }
    
    // Add a node at the beginning
    prepend(value) {
        const newNode = new Node(value);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        
        this.size++;
    }
    
    // Print the linked list
    print() {
        let current = this.head;
        let result = [];
        
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        
        return result.join(" -> ");
    }
    
    // Get the size of the linked list
    getSize() {
        return this.size;
    }
    
    // Check if the linked list is empty
    isEmpty() {
        return this.size === 0;
    }
}

// Basic Doubly Linked List Implementation
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    // Add a node at the end
    append(value) {
        const newNode = new DoublyNode(value);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        
        this.size++;
    }
    
    // Add a node at the beginning
    prepend(value) {
        const newNode = new DoublyNode(value);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        
        this.size++;
    }
    
    // Print the linked list forward
    printForward() {
        let current = this.head;
        let result = [];
        
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        
        return result.join(" <-> ");
    }
    
    // Print the linked list backward
    printBackward() {
        let current = this.tail;
        let result = [];
        
        while (current) {
            result.push(current.value);
            current = current.prev;
        }
        
        return result.join(" <-> ");
    }
}

/**
 * Array vs Linked List — Comparison Table:
 * 
 * Feature                    | Array                    | Linked List
 * --------------------------|-------------------------- |--------------------------
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

// Demonstration and Examples
function demonstrateLinkedList() {
    console.log("=== Linked List Introduction ===\n");
    
    // Singly Linked List Example
    console.log("1. Singly Linked List Example:");
    const singlyList = new SinglyLinkedList();
    singlyList.append(10);
    singlyList.append(20);
    singlyList.append(30);
    singlyList.prepend(5);
    
    console.log("Singly Linked List:", singlyList.print());
    console.log("Size:", singlyList.getSize());
    console.log("Is Empty:", singlyList.isEmpty());
    console.log();
    
    // Doubly Linked List Example
    console.log("2. Doubly Linked List Example:");
    const doublyList = new DoublyLinkedList();
    doublyList.append(100);
    doublyList.append(200);
    doublyList.append(300);
    doublyList.prepend(50);
    
    console.log("Forward traversal:", doublyList.printForward());
    console.log("Backward traversal:", doublyList.printBackward());
    console.log();
    
    // Memory Layout Comparison
    console.log("3. Memory Layout Comparison:");
    console.log("Array: [1, 2, 3, 4, 5]");
    console.log("Memory: [1][2][3][4][5] (contiguous)");
    console.log();
    console.log("Linked List: 1 -> 2 -> 3 -> 4 -> 5");
    console.log("Memory: [1|ptr] -> [2|ptr] -> [3|ptr] -> [4|ptr] -> [5|null] (scattered)");
    console.log();
    
    // Time Complexity Comparison
    console.log("4. Time Complexity Comparison:");
    console.log("Operation          | Array    | Linked List");
    console.log("-------------------|----------|------------");
    console.log("Access by index    | O(1)     | O(n)");
    console.log("Insert at beginning| O(n)     | O(1)");
    console.log("Insert at end      | O(1)     | O(1)");
    console.log("Insert in middle   | O(n)     | O(n)");
    console.log("Delete at beginning| O(n)     | O(1)");
    console.log("Delete at end      | O(1)     | O(1)");
    console.log("Delete in middle   | O(n)     | O(n)");
    console.log();
    
    // Use Case Examples
    console.log("5. Use Case Examples:");
    console.log("Use Array when:");
    console.log("- You need fast random access (e.g., lookup table)");
    console.log("- Size is known and fixed");
    console.log("- Memory efficiency is crucial");
    console.log("- You frequently access elements by index");
    console.log();
    console.log("Use Linked List when:");
    console.log("- You frequently insert/delete at beginning/end");
    console.log("- Size is unknown or changes frequently");
    console.log("- You need to traverse and manipulate the structure");
    console.log("- You want to avoid resizing overhead");
    console.log();
}

// Run the demonstration
demonstrateLinkedList(); 