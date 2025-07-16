/**
 * Recursion Example: Print Numbers from n to 1
 * 
 * Recursion is a technique where a function calls itself to solve a problem
 * by breaking it down into smaller sub-problems.
 * 
 * Base Condition:
 * Every function call in recursion is stored in the call stack. If the recursion
 * is too deep or has no base condition, the call stack keeps growing until
 * memory is exhausted, causing a stack overflow error.
 * 
 * A base condition is essential in recursion. It stops the recursion when a
 * certain condition is met. Without it, recursion goes infinite and causes
 * a stack overflow.
 * 
 * Example: Print numbers from n to 1 using recursion
 * 
 * Approach:
 * 1. Print the number
 * 2. Recurse with num - 1
 * 3. Stop when num === 0 (base condition)
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n) – one function call per number from n to 1
 * Space Complexity: O(n) – due to recursive call stack frames
 */

/**
 * Prints numbers from n to 1 using recursion
 * @param {number} num - The starting number
 */
function printDescending(num) {
    // Base condition: stop when num is 0
    if (num === 0) return;
    
    // Print current number
    console.log(num);
    
    // Recursive call with num - 1
    printDescending(num - 1);
}

// Test the function
console.log("Printing numbers from 5 to 1:");
printDescending(5);
/* Output:
5
4
3
2
1
*/

// Example of what happens in the call stack:
/*
printDescending(5)
    console.log(5)
    printDescending(4)
        console.log(4)
        printDescending(3)
            console.log(3)
            printDescending(2)
                console.log(2)
                printDescending(1)
                    console.log(1)
                    printDescending(0)
                        return
*/ 