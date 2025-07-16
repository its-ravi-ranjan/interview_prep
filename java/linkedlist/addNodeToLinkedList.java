package linkedlist;

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
    int val;
    Node next;
    
    Node(int val) {
        this.val = val;
        this.next = null;
    }
}

// LinkedList class definition
class MyLinkedList {
    private Node head;
    private int size;
    
    public MyLinkedList() {
        this.head = null;
        this.size = 0;
    }
    
    /**
     * Add a node at the end of the list
     * @param val Value to add
     */
    public void addNode(int val) {
        Node newNode = new Node(val);
        
        if (head == null) {
            head = newNode;
        } else {
            Node current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
        
        size++;
    }
    
    /**
     * Add a node at the beginning of the list
     * @param val Value to add
     */
    public void addNodeAtBeginning(int val) {
        Node newNode = new Node(val);
        newNode.next = head;
        head = newNode;
        size++;
    }
    
    /**
     * Print all values in the linked list
     */
    public void printList() {
        Node current = head;
        StringBuilder result = new StringBuilder();
        
        while (current != null) {
            result.append(current.val);
            if (current.next != null) {
                result.append(" -> ");
            }
            current = current.next;
        }
        
        System.out.println("Linked List: " + result.toString());
    }
    
    /**
     * Get the size of the linked list
     * @return Size of the list
     */
    public int getSize() {
        return size;
    }
    
    /**
     * Check if the list is empty
     * @return True if empty, false otherwise
     */
    public boolean isEmpty() {
        return size == 0;
    }
    
    /**
     * Search for a value in the linked list
     * @param val Value to search for
     * @return True if found, false otherwise
     */
    public boolean search(int val) {
        Node current = head;
        
        while (current != null) {
            if (current.val == val) {
                return true;
            }
            current = current.next;
        }
        
        return false;
    }
    
    /**
     * Delete the first occurrence of a value
     * @param val Value to delete
     * @return True if deleted, false if not found
     */
    public boolean deleteNode(int val) {
        if (head == null) {
            return false;
        }
        
        // If head node itself holds the value to be deleted
        if (head.val == val) {
            head = head.next;
            size--;
            return true;
        }
        
        // Search for the value to delete
        Node current = head;
        while (current.next != null) {
            if (current.next.val == val) {
                current.next = current.next.next;
                size--;
                return true;
            }
            current = current.next;
        }
        
        return false;
    }
    
    /**
     * Get the value of the node at the specified index (0-indexed)
     * @param index Index of the node
     * @return Value at the index, or -1 if index is invalid
     */
    public int get(int index) {
        if (index < 0 || index >= size) {
            return -1;
        }
        
        Node current = head;
        for (int i = 0; i < index; i++) {
            current = current.next;
        }
        
        return current.val;
    }
    
    /**
     * Add a node at the beginning of the list (alias for addNodeAtBeginning)
     * @param val Value to add
     */
    public void addAtHead(int val) {
        addNodeAtBeginning(val);
    }
    
    /**
     * Add a node at the end of the list (alias for addNode)
     * @param val Value to add
     */
    public void addAtTail(int val) {
        addNode(val);
    }
    
    /**
     * Insert a node before the index-th node in the list
     * @param index Index where to insert
     * @param val Value to insert
     */
    public void addAtIndex(int index, int val) {
        if (index < 0 || index > size) {
            return;
        }
        
        if (index == 0) {
            addAtHead(val);
            return;
        }
        
        if (index == size) {
            addAtTail(val);
            return;
        }
        
        Node newNode = new Node(val);
        Node current = head;
        
        for (int i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        newNode.next = current.next;
        current.next = newNode;
        size++;
    }
    
    /**
     * Delete the node at the given index
     * @param index Index of the node to delete
     */
    public void deleteAtIndex(int index) {
        if (index < 0 || index >= size) {
            return;
        }
        
        if (index == 0) {
            head = head.next;
        } else {
            Node current = head;
            for (int i = 0; i < index - 1; i++) {
                current = current.next;
            }
            current.next = current.next.next;
        }
        
        size--;
    }
    
    /**
     * Get the head node (for testing purposes)
     * @return Head node
     */
    public Node getHead() {
        return head;
    }
    
    /**
     * Set the head node (for testing purposes)
     * @param head Head node to set
     */
    public void setHead(Node head) {
        this.head = head;
    }
    
    /**
     * Set the size (for testing purposes)
     * @param size Size to set
     */
    public void setSize(int size) {
        this.size = size;
    }
}

public class addNodeToLinkedList {
    
    public static void main(String[] args) {
        System.out.println("=== Simple Singly Linked List Implementation ===\n");
        
        // Test case 1: Basic node creation and linking
        System.out.println("Test Case 1: Basic Node Creation and Linking");
        System.out.println("Creating nodes with values: 10, 20, 30");
        
        MyLinkedList list = new MyLinkedList();
        
        // Method 1: Manual node creation and linking
        Node node1 = new Node(10);
        Node node2 = new Node(20);
        Node node3 = new Node(30);
        
        // Link the nodes
        node1.next = node2;
        node2.next = node3;
        
        // Set head and size
        list.setHead(node1);
        list.setSize(3);
        
        System.out.println("Manual linking result:");
        list.printList();
        System.out.println("Size: " + list.getSize());
        System.out.println();
        
        // Test case 2: Using addNode method
        System.out.println("Test Case 2: Using addNode Method");
        MyLinkedList list2 = new MyLinkedList();
        
        list2.addNode(10);
        list2.addNode(20);
        list2.addNode(30);
        
        System.out.println("Using addNode method:");
        list2.printList();
        System.out.println("Size: " + list2.getSize());
        System.out.println();
        
        // Test case 3: Adding node at beginning
        System.out.println("Test Case 3: Adding Node at Beginning");
        MyLinkedList list3 = new MyLinkedList();
        
        list3.addNode(20);
        list3.addNode(30);
        list3.addNodeAtBeginning(10);
        
        System.out.println("After adding 10 at beginning:");
        list3.printList();
        System.out.println();
        
        // Test case 4: Search functionality
        System.out.println("Test Case 4: Search Functionality");
        System.out.println("Searching for 20: " + list3.search(20));
        System.out.println("Searching for 50: " + list3.search(50));
        System.out.println();
        
        // Test case 5: Delete functionality
        System.out.println("Test Case 5: Delete Functionality");
        System.out.println("Before deletion:");
        list3.printList();
        
        list3.deleteNode(20);
        System.out.println("After deleting 20:");
        list3.printList();
        
        list3.deleteNode(10);
        System.out.println("After deleting 10:");
        list3.printList();
        System.out.println();
        
        // Test case 6: Empty list operations
        System.out.println("Test Case 6: Empty List Operations");
        MyLinkedList emptyList = new MyLinkedList();
        System.out.println("Is empty: " + emptyList.isEmpty());
        System.out.println("Size: " + emptyList.getSize());
        System.out.println("Search 10: " + emptyList.search(10));
        System.out.println("Delete 10: " + emptyList.deleteNode(10));
        System.out.println();
        
        // Test case 7: Large list
        System.out.println("Test Case 7: Large List");
        MyLinkedList largeList = new MyLinkedList();
        
        for (int i = 1; i <= 10; i++) {
            largeList.addNode(i * 10);
        }
        
        System.out.println("Large list (1-10 * 10):");
        largeList.printList();
        System.out.println("Size: " + largeList.getSize());
        System.out.println();
        
        // Test case 8: Traversal demonstration
        System.out.println("Test Case 8: Traversal Demonstration");
        System.out.println("Traversing the list step by step:");
        
        Node current = largeList.getHead();
        int step = 1;
        
        while (current != null) {
            System.out.printf("Step %d: Current value = %d, Next = %s%n", 
                step, current.val, current.next != null ? String.valueOf(current.next.val) : "null");
            current = current.next;
            step++;
        }
        System.out.println();
        
        // Test case 9: Memory representation
        System.out.println("Test Case 9: Memory Representation");
        System.out.println("Visual representation of linked list structure:");
        
        Node head = largeList.getHead();
        System.out.println("Head -> " + head.val + " -> " + head.next.val + " -> " + head.next.next.val + " -> ... -> null");
        System.out.println("Each node contains: [value | next_pointer]");
        System.out.println("Last node points to: null");
        System.out.println();
        
        // Test case 10: Performance demonstration
        System.out.println("Test Case 10: Performance Demonstration");
        long startTime = System.nanoTime();
        
        MyLinkedList perfList = new MyLinkedList();
        for (int i = 0; i < 10000; i++) {
            perfList.addNode(i);
        }
        
        long endTime = System.nanoTime();
        System.out.printf("Time to create 10,000 nodes: %.2f ms%n", (endTime - startTime) / 1_000_000.0);
        System.out.println("Final size: " + perfList.getSize());
        System.out.println();
        
        // Test case 11: Get method functionality
        System.out.println("Test Case 11: Get Method Functionality");
        MyLinkedList getList = new MyLinkedList();
        getList.addNode(10);
        getList.addNode(20);
        getList.addNode(30);
        getList.addNode(40);
        
        getList.printList();
        System.out.println("Get at index 0: " + getList.get(0));
        System.out.println("Get at index 1: " + getList.get(1));
        System.out.println("Get at index 2: " + getList.get(2));
        System.out.println("Get at index 3: " + getList.get(3));
        System.out.println("Get at index 4 (invalid): " + getList.get(4));
        System.out.println("Get at index -1 (invalid): " + getList.get(-1));
        System.out.println();
        
        // Test case 12: AddAtIndex functionality
        System.out.println("Test Case 12: AddAtIndex Functionality");
        MyLinkedList addAtIndexList = new MyLinkedList();
        addAtIndexList.addNode(10);
        addAtIndexList.addNode(30);
        
        System.out.println("Original list:");
        addAtIndexList.printList();
        
        addAtIndexList.addAtIndex(1, 20);
        System.out.println("After addAtIndex(1, 20):");
        addAtIndexList.printList();
        
        addAtIndexList.addAtIndex(0, 5);
        System.out.println("After addAtIndex(0, 5):");
        addAtIndexList.printList();
        
        addAtIndexList.addAtIndex(4, 40);
        System.out.println("After addAtIndex(4, 40):");
        addAtIndexList.printList();
        
        addAtIndexList.addAtIndex(2, 15);
        System.out.println("After addAtIndex(2, 15):");
        addAtIndexList.printList();
        System.out.println();
        
        // Test case 13: DeleteAtIndex functionality
        System.out.println("Test Case 13: DeleteAtIndex Functionality");
        MyLinkedList deleteAtIndexList = new MyLinkedList();
        deleteAtIndexList.addNode(10);
        deleteAtIndexList.addNode(20);
        deleteAtIndexList.addNode(30);
        deleteAtIndexList.addNode(40);
        deleteAtIndexList.addNode(50);
        
        System.out.println("Original list:");
        deleteAtIndexList.printList();
        
        deleteAtIndexList.deleteAtIndex(2);
        System.out.println("After deleteAtIndex(2):");
        deleteAtIndexList.printList();
        
        deleteAtIndexList.deleteAtIndex(0);
        System.out.println("After deleteAtIndex(0):");
        deleteAtIndexList.printList();
        
        deleteAtIndexList.deleteAtIndex(2);
        System.out.println("After deleteAtIndex(2):");
        deleteAtIndexList.printList();
        
        deleteAtIndexList.deleteAtIndex(1);
        System.out.println("After deleteAtIndex(1):");
        deleteAtIndexList.printList();
        System.out.println();
        
        // Test case 14: Edge cases for new methods
        System.out.println("Test Case 14: Edge Cases for New Methods");
        MyLinkedList edgeList = new MyLinkedList();
        
        System.out.println("Empty list operations:");
        System.out.println("Get at index 0: " + edgeList.get(0));
        edgeList.addAtIndex(0, 100);
        System.out.println("After addAtIndex(0, 100):");
        edgeList.printList();
        
        edgeList.deleteAtIndex(0);
        System.out.println("After deleteAtIndex(0):");
        edgeList.printList();
        
        System.out.println("Invalid operations:");
        edgeList.addAtIndex(5, 200); // Should do nothing
        edgeList.deleteAtIndex(5);   // Should do nothing
        System.out.println("List remains empty: " + edgeList.isEmpty());
        System.out.println();
        
        // Test case 15: Comprehensive test with all new methods
        System.out.println("Test Case 15: Comprehensive Test with All New Methods");
        MyLinkedList comprehensiveList = new MyLinkedList();
        
        System.out.println("Step 1: Add elements using addAtHead and addAtTail");
        comprehensiveList.addAtHead(30);
        comprehensiveList.addAtHead(20);
        comprehensiveList.addAtHead(10);
        comprehensiveList.addAtTail(40);
        comprehensiveList.addAtTail(50);
        comprehensiveList.printList();
        
        System.out.println("Step 2: Get values at different indices");
        for (int i = 0; i < comprehensiveList.getSize(); i++) {
            System.out.println("Index " + i + ": " + comprehensiveList.get(i));
        }
        
        System.out.println("Step 3: Insert at specific indices");
        comprehensiveList.addAtIndex(1, 15);
        comprehensiveList.addAtIndex(3, 25);
        comprehensiveList.addAtIndex(6, 45);
        comprehensiveList.printList();
        
        System.out.println("Step 4: Delete at specific indices");
        comprehensiveList.deleteAtIndex(1);
        comprehensiveList.deleteAtIndex(3);
        comprehensiveList.deleteAtIndex(5);
        comprehensiveList.printList();
        
        System.out.println("Step 5: Final state");
        System.out.println("Size: " + comprehensiveList.getSize());
        System.out.println("Is empty: " + comprehensiveList.isEmpty());
        System.out.println();
    }
} 