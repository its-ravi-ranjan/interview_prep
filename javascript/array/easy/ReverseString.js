/**
 * Reverse String
 * 
 * Problem:
 * Write a function that reverses a string. The input string is given as an array of characters s.
 * You must do this by modifying the input array in-place with O(1) extra memory.
 * 
 * Example:
 * Input: s = ["h","e","l","l","o"]
 * Output: ["o","l","l","e","h"]
 * 
 * Important Points:
 * 1. Input is an array of characters
 * 2. Must modify array in-place
 * 3. Cannot use extra arrays
 * 4. Space complexity must be O(1)
 * 
 * Approach: Two Pointer Technique
 * - Initialize two pointers, one at start and one at end
 * - Swap characters at both pointers
 * - Move pointers towards center until they meet
 * 
 * Time Complexity: O(n/2) = O(n)
 * Space Complexity: O(1)
 */

class ReverseString {
    reverseString(s) {
        let left = 0;
        let right = s.length - 1;
        
        while (left < right) {
            // Swap characters at left and right pointers
            [s[left], s[right]] = [s[right], s[left]];
            
            // Move pointers towards center
            left++;
            right--;
        }
    }

    // Alternative approach using for loop
    reverseStringForLoop(s) {
        const len = s.length;
        const halfLen = Math.floor(len / 2);
        
        for (let i = 0; i < halfLen; i++) {
            [s[i], s[len - i - 1]] = [s[len - i - 1], s[i]];
        }
    }
}

// Test cases
function runTests() {
    const solution = new ReverseString();
    
    // Test case 1: Basic case
    console.log("Test case 1: ['h','e','l','l','o']");
    let s1 = ['h', 'e', 'l', 'l', 'o'];
    solution.reverseString([...s1]);
    console.log("Two pointer approach:", s1);
    solution.reverseStringForLoop([...s1]);
    console.log("For loop approach:", s1);

    // Test case 2: Empty array
    console.log("\nTest case 2: []");
    let s2 = [];
    solution.reverseString([...s2]);
    console.log("Two pointer approach:", s2);
    solution.reverseStringForLoop([...s2]);
    console.log("For loop approach:", s2);

    // Test case 3: Single character
    console.log("\nTest case 3: ['a']");
    let s3 = ['a'];
    solution.reverseString([...s3]);
    console.log("Two pointer approach:", s3);
    solution.reverseStringForLoop([...s3]);
    console.log("For loop approach:", s3);

    // Test case 4: Even length string
    console.log("\nTest case 4: ['a','b','c','d']");
    let s4 = ['a', 'b', 'c', 'd'];
    solution.reverseString([...s4]);
    console.log("Two pointer approach:", s4);
    solution.reverseStringForLoop([...s4]);
    console.log("For loop approach:", s4);

    // Test case 5: Odd length string
    console.log("\nTest case 5: ['a','b','c']");
    let s5 = ['a', 'b', 'c'];
    solution.reverseString([...s5]);
    console.log("Two pointer approach:", s5);
    solution.reverseStringForLoop([...s5]);
    console.log("For loop approach:", s5);

    // Test case 6: Palindrome
    console.log("\nTest case 6: ['r','a','c','e','c','a','r']");
    let s6 = ['r', 'a', 'c', 'e', 'c', 'a', 'r'];
    solution.reverseString([...s6]);
    console.log("Two pointer approach:", s6);
    solution.reverseStringForLoop([...s6]);
    console.log("For loop approach:", s6);
}

// Run the tests
runTests(); 