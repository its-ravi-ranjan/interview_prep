/**
 * Simple Singly Linked List Implementation
 * 
 * Problem:
 * Design and implement a simple singly linked list using basic building blocks like nodes and references.
 * The goal is to:
 * 1. Define a node with a value and a pointer to the next node
 * 2. Create individual nodes and link them together to form a list
 * 3. Traverse the list from the head and print each node's value
 * 
 * Example:
 * Input: Create 3 nodes with values 10, 20, 30 and link them in order
 * Output: Print values in sequence: 10 20 30
 * 
 * Approach:
 * 1. Define a Node class with val and next pointer
 * 2. Create individual nodes (e.g., node1, node2, node3)
 * 3. Link the nodes: node1.next → node2, node2.next → node3
 * 4. Set the head of the list to the first node
 * 5. Traverse the list using a loop until current node becomes null
 * 6. Print the value at each node
 * 
 * Explanation:
 * - Each node stores data and a reference to the next node
 * - The list is connected by linking nodes via the next field
 * - The traversal starts from the head and moves node by node until the end
 * - This basic structure forms the foundation for many advanced data structures
 */

// Node class definition
class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

// LinkedList class definition
class MyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    /**
     * Add a node at the end of the list
     * @param {number} val - Value to add
     */
    addNode(val) {
        const newNode = new Node(val);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        
        this.size++;
    }
    
    /**
     * Add a node at the beginning of the list
     * @param {number} val - Value to add
     */
    addNodeAtBeginning(val) {
        const newNode = new Node(val);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }
    
    /**
     * Print all values in the linked list
     */
    printList() {
        let current = this.head;
        let result = [];
        
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        
        console.log("Linked List:", result.join(" -> "));
        return result;
    }
    
    /**
     * Get the size of the linked list
     * @returns {number} Size of the list
     */
    getSize() {
        return this.size;
    }
    
    /**
     * Check if the list is empty
     * @returns {boolean} True if empty, false otherwise
     */
    isEmpty() {
        return this.size === 0;
    }
    
    /**
     * Search for a value in the linked list
     * @param {number} val - Value to search for
     * @returns {boolean} True if found, false otherwise
     */
    search(val) {
        let current = this.head;
        
        while (current) {
            if (current.val === val) {
                return true;
            }
            current = current.next;
        }
        
        return false;
    }
    
    /**
     * Delete the first occurrence of a value
     * @param {number} val - Value to delete
     * @returns {boolean} True if deleted, false if not found
     */
    deleteNode(val) {
        if (!this.head) {
            return false;
        }
        
        // If head node itself holds the value to be deleted
        if (this.head.val === val) {
            this.head = this.head.next;
            this.size--;
            return true;
        }
        
        // Search for the value to delete
        let current = this.head;
        while (current.next) {
            if (current.next.val === val) {
                current.next = current.next.next;
                this.size--;
                return true;
            }
            current = current.next;
        }
        
        return false;
    }
    
    /**
     * Get the value of the node at the specified index (0-indexed)
     * @param {number} index - Index of the node
     * @returns {number} Value at the index, or -1 if index is invalid
     */
    get(index) {
        if (index < 0 || index >= this.size) {
            return -1;
        }
        
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        
        return current.val;
    }
    
    /**
     * Add a node at the beginning of the list (alias for addNodeAtBeginning)
     * @param {number} val - Value to add
     */
    addAtHead(val) {
        this.addNodeAtBeginning(val);
    }
    
    /**
     * Add a node at the end of the list (alias for addNode)
     * @param {number} val - Value to add
     */
    addAtTail(val) {
        this.addNode(val);
    }
    
    /**
     * Insert a node before the index-th node in the list
     * @param {number} index - Index where to insert
     * @param {number} val - Value to insert
     */
    addAtIndex(index, val) {
        if (index < 0 || index > this.size) {
            return;
        }
        
        if (index === 0) {
            return this.addAtHead(val);
        }
        
        if (index === this.size) {
            return this.addAtTail(val);
        }
        
        const newNode = new Node(val);
        let current = this.head;
        
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        newNode.next = current.next;
        current.next = newNode;
        this.size++;
    }
    
    /**
     * Delete the node at the given index
     * @param {number} index - Index of the node to delete
     */
    deleteAtIndex(index) {
        if (index < 0 || index >= this.size) {
            return;
        }
        
        if (index === 0) {
            this.head = this.head.next;
        } else {
            let current = this.head;
            for (let i = 0; i < index - 1; i++) {
                current = current.next;
            }
            current.next = current.next.next;
        }
        
        this.size--;
    }
}

// Test cases and examples
function testLinkedList() {
    console.log("=== Simple Singly Linked List Implementation ===\n");
    
    // Test case 1: Basic node creation and linking
    console.log("Test Case 1: Basic Node Creation and Linking");
    console.log("Creating nodes with values: 10, 20, 30");
    
    const list = new MyLinkedList();
    
    // Method 1: Manual node creation and linking
    const node1 = new Node(10);
    const node2 = new Node(20);
    const node3 = new Node(30);
    
    // Link the nodes
    node1.next = node2;
    node2.next = node3;
    
    // Set head and size
    list.head = node1;
    list.size = 3;
    
    console.log("Manual linking result:");
    list.printList();
    console.log("Size:", list.getSize());
    console.log();
    
    // Test case 2: Using addNode method
    console.log("Test Case 2: Using addNode Method");
    const list2 = new MyLinkedList();
    
    list2.addNode(10);
    list2.addNode(20);
    list2.addNode(30);
    
    console.log("Using addNode method:");
    list2.printList();
    console.log("Size:", list2.getSize());
    console.log();
    
    // Test case 3: Adding node at beginning
    console.log("Test Case 3: Adding Node at Beginning");
    const list3 = new MyLinkedList();
    
    list3.addNode(20);
    list3.addNode(30);
    list3.addNodeAtBeginning(10);
    
    console.log("After adding 10 at beginning:");
    list3.printList();
    console.log();
    
    // Test case 4: Search functionality
    console.log("Test Case 4: Search Functionality");
    console.log("Searching for 20:", list3.search(20));
    console.log("Searching for 50:", list3.search(50));
    console.log();
    
    // Test case 5: Delete functionality
    console.log("Test Case 5: Delete Functionality");
    console.log("Before deletion:");
    list3.printList();
    
    list3.deleteNode(20);
    console.log("After deleting 20:");
    list3.printList();
    
    list3.deleteNode(10);
    console.log("After deleting 10:");
    list3.printList();
    console.log();
    
    // Test case 6: Empty list operations
    console.log("Test Case 6: Empty List Operations");
    const emptyList = new MyLinkedList();
    console.log("Is empty:", emptyList.isEmpty());
    console.log("Size:", emptyList.getSize());
    console.log("Search 10:", emptyList.search(10));
    console.log("Delete 10:", emptyList.deleteNode(10));
    console.log();
    
    // Test case 7: Large list
    console.log("Test Case 7: Large List");
    const largeList = new MyLinkedList();
    
    for (let i = 1; i <= 10; i++) {
        largeList.addNode(i * 10);
    }
    
    console.log("Large list (1-10 * 10):");
    largeList.printList();
    console.log("Size:", largeList.getSize());
    console.log();
    
    // Test case 8: Traversal demonstration
    console.log("Test Case 8: Traversal Demonstration");
    console.log("Traversing the list step by step:");
    
    let current = largeList.head;
    let step = 1;
    
    while (current) {
        console.log(`Step ${step}: Current value = ${current.val}, Next = ${current.next ? current.next.val : 'null'}`);
        current = current.next;
        step++;
    }
    console.log();
    
    // Test case 9: Get method functionality
    console.log("Test Case 9: Get Method Functionality");
    const getList = new MyLinkedList();
    getList.addNode(10);
    getList.addNode(20);
    getList.addNode(30);
    getList.addNode(40);
    
    console.log("List:", getList.printList());
    console.log("Get at index 0:", getList.get(0));
    console.log("Get at index 1:", getList.get(1));
    console.log("Get at index 2:", getList.get(2));
    console.log("Get at index 3:", getList.get(3));
    console.log("Get at index 4 (invalid):", getList.get(4));
    console.log("Get at index -1 (invalid):", getList.get(-1));
    console.log();
    
    // Test case 10: AddAtIndex functionality
    console.log("Test Case 10: AddAtIndex Functionality");
    const addAtIndexList = new MyLinkedList();
    addAtIndexList.addNode(10);
    addAtIndexList.addNode(30);
    
    console.log("Original list:");
    addAtIndexList.printList();
    
    addAtIndexList.addAtIndex(1, 20);
    console.log("After addAtIndex(1, 20):");
    addAtIndexList.printList();
    
    addAtIndexList.addAtIndex(0, 5);
    console.log("After addAtIndex(0, 5):");
    addAtIndexList.printList();
    
    addAtIndexList.addAtIndex(4, 40);
    console.log("After addAtIndex(4, 40):");
    addAtIndexList.printList();
    
    addAtIndexList.addAtIndex(2, 15);
    console.log("After addAtIndex(2, 15):");
    addAtIndexList.printList();
    console.log();
    
    // Test case 11: DeleteAtIndex functionality
    console.log("Test Case 11: DeleteAtIndex Functionality");
    const deleteAtIndexList = new MyLinkedList();
    deleteAtIndexList.addNode(10);
    deleteAtIndexList.addNode(20);
    deleteAtIndexList.addNode(30);
    deleteAtIndexList.addNode(40);
    deleteAtIndexList.addNode(50);
    
    console.log("Original list:");
    deleteAtIndexList.printList();
    
    deleteAtIndexList.deleteAtIndex(2);
    console.log("After deleteAtIndex(2):");
    deleteAtIndexList.printList();
    
    deleteAtIndexList.deleteAtIndex(0);
    console.log("After deleteAtIndex(0):");
    deleteAtIndexList.printList();
    
    deleteAtIndexList.deleteAtIndex(2);
    console.log("After deleteAtIndex(2):");
    deleteAtIndexList.printList();
    
    deleteAtIndexList.deleteAtIndex(1);
    console.log("After deleteAtIndex(1):");
    deleteAtIndexList.printList();
    console.log();
    
    // Test case 12: Edge cases for new methods
    console.log("Test Case 12: Edge Cases for New Methods");
    const edgeList = new MyLinkedList();
    
    console.log("Empty list operations:");
    console.log("Get at index 0:", edgeList.get(0));
    edgeList.addAtIndex(0, 100);
    console.log("After addAtIndex(0, 100):");
    edgeList.printList();
    
    edgeList.deleteAtIndex(0);
    console.log("After deleteAtIndex(0):");
    edgeList.printList();
    
    console.log("Invalid operations:");
    edgeList.addAtIndex(5, 200); // Should do nothing
    edgeList.deleteAtIndex(5);   // Should do nothing
    console.log("List remains empty:", edgeList.isEmpty());
    console.log();
    
    // Test case 13: Comprehensive test with all new methods
    console.log("Test Case 13: Comprehensive Test with All New Methods");
    const comprehensiveList = new MyLinkedList();
    
    console.log("Step 1: Add elements using addAtHead and addAtTail");
    comprehensiveList.addAtHead(30);
    comprehensiveList.addAtHead(20);
    comprehensiveList.addAtHead(10);
    comprehensiveList.addAtTail(40);
    comprehensiveList.addAtTail(50);
    comprehensiveList.printList();
    
    console.log("Step 2: Get values at different indices");
    for (let i = 0; i < comprehensiveList.getSize(); i++) {
        console.log(`Index ${i}: ${comprehensiveList.get(i)}`);
    }
    
    console.log("Step 3: Insert at specific indices");
    comprehensiveList.addAtIndex(1, 15);
    comprehensiveList.addAtIndex(3, 25);
    comprehensiveList.addAtIndex(6, 45);
    comprehensiveList.printList();
    
    console.log("Step 4: Delete at specific indices");
    comprehensiveList.deleteAtIndex(1);
    comprehensiveList.deleteAtIndex(3);
    comprehensiveList.deleteAtIndex(5);
    comprehensiveList.printList();
    
    console.log("Step 5: Final state");
    console.log("Size:", comprehensiveList.getSize());
    console.log("Is empty:", comprehensiveList.isEmpty());
    console.log();
}

// Run the tests
testLinkedList(); 