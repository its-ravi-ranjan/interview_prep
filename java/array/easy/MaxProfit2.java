package array.easy;

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
public class MaxProfit2 {
    
    /**
     * Calculates the maximum profit possible from buying and selling stocks
     * @param prices Array of stock prices
     * @return Maximum profit possible
     */
    public static int maxProfit(int[] prices) {
        int maxProfit = 0;
        
        // Start from index 1 to compare with previous day
        for (int i = 1; i < prices.length; i++) {
            // If current price is higher than previous day, add the difference to profit
            if (prices[i] > prices[i - 1]) {
                maxProfit += prices[i] - prices[i - 1];
            }
        }
        
        return maxProfit;
    }
    
    public static void main(String[] args) {
        // Test case 1: Example case
        int[] prices1 = {7, 1, 5, 3, 6, 4};
        System.out.println("Test case 1:");
        System.out.println("Input: " + arrayToString(prices1));
        System.out.println("Output: " + maxProfit(prices1));  // Expected: 7
        System.out.println("Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 4");
        System.out.println("Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 3");
        System.out.println("Total profit = 7\n");
        
        // Test case 2: Increasing prices
        int[] prices2 = {1, 2, 3, 4, 5};
        System.out.println("Test case 2:");
        System.out.println("Input: " + arrayToString(prices2));
        System.out.println("Output: " + maxProfit(prices2));  // Expected: 4
        System.out.println("Explanation: Buy on day 1 and sell on day 5, profit = 4\n");
        
        // Test case 3: Decreasing prices
        int[] prices3 = {5, 4, 3, 2, 1};
        System.out.println("Test case 3:");
        System.out.println("Input: " + arrayToString(prices3));
        System.out.println("Output: " + maxProfit(prices3));  // Expected: 0
        System.out.println("Explanation: No profit possible as prices are decreasing\n");
        
        // Test case 4: Same prices
        int[] prices4 = {2, 2, 2, 2, 2};
        System.out.println("Test case 4:");
        System.out.println("Input: " + arrayToString(prices4));
        System.out.println("Output: " + maxProfit(prices4));  // Expected: 0
        System.out.println("Explanation: No profit possible as prices are constant\n");
        
        // Test case 5: Single day
        int[] prices5 = {1};
        System.out.println("Test case 5:");
        System.out.println("Input: " + arrayToString(prices5));
        System.out.println("Output: " + maxProfit(prices5));  // Expected: 0
        System.out.println("Explanation: Need at least 2 days to make a profit\n");
        
        // Test case 6: Empty array
        int[] prices6 = {};
        System.out.println("Test case 6:");
        System.out.println("Input: " + arrayToString(prices6));
        System.out.println("Output: " + maxProfit(prices6));  // Expected: 0
        System.out.println("Explanation: Empty array, no profit possible\n");
    }
    
    /**
     * Helper method to convert array to string representation
     * @param arr The array to convert
     * @return String representation of the array
     */
    private static String arrayToString(int[] arr) {
        if (arr.length == 0) return "[]";
        
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < arr.length; i++) {
            sb.append(arr[i]);
            if (i < arr.length - 1) {
                sb.append(", ");
            }
        }
        sb.append("]");
        return sb.toString();
    }
} 