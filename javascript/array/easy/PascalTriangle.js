/**
 * Pascal's Triangle
 * 
 * Problem:
 * Given an integer numRows, return the first numRows of Pascal's triangle.
 * In Pascal's triangle, each number is the sum of the two numbers directly above it.
 * 
 * Example:
 * Input: numRows = 5
 * Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
 * 
 * Pascal's Triangle Pattern:
 * Row 0:       1
 * Row 1:      1 1
 * Row 2:     1 2 1
 * Row 3:    1 3 3 1
 * Row 4:   1 4 6 4 1
 * 
 * Approach:
 * 1. Create a result array to store all rows
 * 2. For each row i from 0 to numRows-1:
 *    - Create a new array of size i+1 filled with 1s
 *    - For each element j from 1 to i-1 (excluding first and last):
 *      - Set col[j] = result[i-1][j-1] + result[i-1][j]
 *    - Add the row to result
 * 3. Return the result array
 * 
 * Key Insight:
 * Each element (except first and last) is the sum of the two elements
 * directly above it from the previous row.
 * 
 * Dry Run (numRows = 4):
 * 
 * Step 1: i = 0
 *   col = [1] (size 1, filled with 1)
 *   result = [[1]]
 * 
 * Step 2: i = 1
 *   col = [1, 1] (size 2, filled with 1)
 *   j loop doesn't run (j < i, so j < 1, but j starts at 1)
 *   result = [[1], [1, 1]]
 * 
 * Step 3: i = 2
 *   col = [1, 1, 1] (size 3, filled with 1)
 *   j = 1: col[1] = result[1][0] + result[1][1] = 1 + 1 = 2
 *   col = [1, 2, 1]
 *   result = [[1], [1, 1], [1, 2, 1]]
 * 
 * Step 4: i = 3
 *   col = [1, 1, 1, 1] (size 4, filled with 1)
 *   j = 1: col[1] = result[2][0] + result[2][1] = 1 + 2 = 3
 *   j = 2: col[2] = result[2][1] + result[2][2] = 2 + 1 = 3
 *   col = [1, 3, 3, 1]
 *   result = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]]
 * 
 * Output: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]]
 * 
 * Time & Space Complexity:
 * Time Complexity: O(numRows²) - We need to fill each row, and each row i has i+1 elements
 * Space Complexity: O(numRows²) - We store all rows in the result array
 */

/**
 * Generates Pascal's Triangle up to numRows
 * @param {number} numRows - Number of rows to generate
 * @return {number[][]} Pascal's triangle as 2D array
 */
function generate(numRows) {
    let result = [];
    
    for (let i = 0; i < numRows; i++) {
        // Create a new row with i+1 elements, all filled with 1
        let col = new Array(i + 1).fill(1);
        
        // Fill the middle elements (excluding first and last)
        for (let j = 1; j < i; j++) {
            col[j] = result[i - 1][j - 1] + result[i - 1][j];
        }
        
        result.push(col);
    }
    
    return result;
}

/**
 * Alternative approach using mathematical formula
 * Each element at position (i, j) is C(i, j) = i! / (j! * (i-j)!)
 * @param {number} numRows - Number of rows to generate
 * @return {number[][]} Pascal's triangle as 2D array
 */
function generateWithFormula(numRows) {
    let result = [];
    
    for (let i = 0; i < numRows; i++) {
        let row = [];
        for (let j = 0; j <= i; j++) {
            row.push(combination(i, j));
        }
        result.push(row);
    }
    
    return result;
}

/**
 * Calculates combination C(n, r) = n! / (r! * (n-r)!)
 * @param {number} n - Total number of items
 * @param {number} r - Number of items to choose
 * @return {number} Combination value
 */
function combination(n, r) {
    if (r === 0 || r === n) return 1;
    
    let result = 1;
    for (let i = 0; i < r; i++) {
        result = result * (n - i) / (i + 1);
    }
    
    return Math.round(result);
}

/**
 * Prints Pascal's Triangle in a formatted way
 * @param {number[][]} triangle - Pascal's triangle array
 */
function printTriangle(triangle) {
    console.log("Pascal's Triangle:");
    for (let i = 0; i < triangle.length; i++) {
        // Add spaces for alignment
        let spaces = " ".repeat(triangle.length - i - 1);
        console.log(spaces + triangle[i].join(" "));
    }
    console.log();
}

// Test cases
function testPascalTriangle() {
    // Test case 1: Basic case
    console.log("Test case 1:");
    console.log("Input: numRows = 5");
    const result1 = generate(5);
    console.log("Output:", result1);
    console.log("Expected: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]");
    printTriangle(result1);
    
    // Test case 2: Single row
    console.log("Test case 2:");
    console.log("Input: numRows = 1");
    const result2 = generate(1);
    console.log("Output:", result2);
    console.log("Expected: [[1]]");
    printTriangle(result2);
    
    // Test case 3: Two rows
    console.log("Test case 3:");
    console.log("Input: numRows = 2");
    const result3 = generate(2);
    console.log("Output:", result3);
    console.log("Expected: [[1],[1,1]]");
    printTriangle(result3);
    
    // Test case 4: Three rows
    console.log("Test case 4:");
    console.log("Input: numRows = 3");
    const result4 = generate(3);
    console.log("Output:", result4);
    console.log("Expected: [[1],[1,1],[1,2,1]]");
    printTriangle(result4);
    
    // Test case 5: Zero rows
    console.log("Test case 5:");
    console.log("Input: numRows = 0");
    const result5 = generate(0);
    console.log("Output:", result5);
    console.log("Expected: []");
    console.log();
    
    // Test case 6: Large number of rows
    console.log("Test case 6:");
    console.log("Input: numRows = 10");
    const startTime = performance.now();
    const result6 = generate(10);
    const endTime = performance.now();
    console.log(`Time taken: ${(endTime - startTime).toFixed(2)}ms`);
    console.log("First few rows:", result6.slice(0, 5));
    console.log("Last row:", result6[result6.length - 1]);
    console.log();
    
    // Test case 7: Compare with formula approach
    console.log("Test case 7 - Formula Approach:");
    console.log("Input: numRows = 6");
    const result7 = generateWithFormula(6);
    console.log("Output:", result7);
    printTriangle(result7);
    
    // Test case 8: Verify mathematical properties
    console.log("Test case 8 - Mathematical Properties:");
    const result8 = generate(8);
    
    // Check that each row sum equals 2^row
    for (let i = 0; i < result8.length; i++) {
        const rowSum = result8[i].reduce((sum, num) => sum + num, 0);
        const expectedSum = Math.pow(2, i);
        console.log(`Row ${i} sum: ${rowSum} (expected: ${expectedSum}) - ${rowSum === expectedSum ? '✓' : '✗'}`);
    }
    
    // Check that each row is symmetric
    for (let i = 0; i < result8.length; i++) {
        const row = result8[i];
        const isSymmetric = row.every((val, index) => val === row[row.length - 1 - index]);
        console.log(`Row ${i} symmetric: ${isSymmetric ? '✓' : '✗'}`);
    }
    console.log();
}

// Run tests
testPascalTriangle(); 