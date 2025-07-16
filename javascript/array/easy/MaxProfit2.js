/**
 * Best Time to Buy and Sell Stock II
 * 
 * Problem:
 * Given an array of stock prices where prices[i] is the price on the ith day,
 * find the maximum profit possible by buying and selling stocks multiple times.
 * You can hold at most one share at a time, but can buy and sell on the same day.
 * 
 * Example:
 * Input: prices = [7,1,5,3,6,4]
 * Output: 7
 * Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
 * Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
 * Total profit is 4 + 3 = 7.
 * 
 * Approach:
 * 1. Since we can buy and sell on the same day, we can capture all possible profits
 * 2. For each day, if the price is higher than the previous day, add the difference to profit
 * 3. This works because we can buy and sell multiple times
 * 
 * Time & Space Complexity:
 * Time Complexity: O(n) - single pass through the array
 * Space Complexity: O(1) - constant space used
 */

/**
 * Calculates the maximum profit possible from buying and selling stocks
 * @param {number[]} prices - Array of stock prices
 * @return {number} Maximum profit possible
 */
function maxProfit(prices) {
    let maxProfit = 0;
    
    // Start from index 1 to compare with previous day
    for (let i = 1; i < prices.length; i++) {
        // If current price is higher than previous day, add the difference to profit
        if (prices[i] > prices[i - 1]) {
            maxProfit += prices[i] - prices[i - 1];
        }
    }
    
    return maxProfit;
}

// Test cases
function testMaxProfit() {
    // Test case 1: Example case
    const prices1 = [7, 1, 5, 3, 6, 4];
    console.log("Test case 1:");
    console.log("Input:", prices1);
    console.log("Output:", maxProfit(prices1));  // Expected: 7
    console.log("Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 4");
    console.log("Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 3");
    console.log("Total profit = 7\n");
    
    // Test case 2: Increasing prices
    const prices2 = [1, 2, 3, 4, 5];
    console.log("Test case 2:");
    console.log("Input:", prices2);
    console.log("Output:", maxProfit(prices2));  // Expected: 4
    console.log("Explanation: Buy on day 1 and sell on day 5, profit = 4\n");
    
    // Test case 3: Decreasing prices
    const prices3 = [5, 4, 3, 2, 1];
    console.log("Test case 3:");
    console.log("Input:", prices3);
    console.log("Output:", maxProfit(prices3));  // Expected: 0
    console.log("Explanation: No profit possible as prices are decreasing\n");
    
    // Test case 4: Same prices
    const prices4 = [2, 2, 2, 2, 2];
    console.log("Test case 4:");
    console.log("Input:", prices4);
    console.log("Output:", maxProfit(prices4));  // Expected: 0
    console.log("Explanation: No profit possible as prices are constant\n");
    
    // Test case 5: Single day
    const prices5 = [1];
    console.log("Test case 5:");
    console.log("Input:", prices5);
    console.log("Output:", maxProfit(prices5));  // Expected: 0
    console.log("Explanation: Need at least 2 days to make a profit\n");
    
    // Test case 6: Empty array
    const prices6 = [];
    console.log("Test case 6:");
    console.log("Input:", prices6);
    console.log("Output:", maxProfit(prices6));  // Expected: 0
    console.log("Explanation: Empty array, no profit possible\n");
}

// Run tests
testMaxProfit(); 