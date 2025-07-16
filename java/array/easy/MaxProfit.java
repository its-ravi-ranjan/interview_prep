/**
 * Best Time to Buy and Sell Stock
 * 
 * Problem:
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.
 * You want to maximize your profit by choosing a single day to buy one stock and choosing
 * a different day in the future to sell that stock.
 * Return the maximum profit you can achieve from this transaction.
 * If you cannot achieve any profit, return 0.
 * 
 * Example:
 * Input: prices = [7,1,5,3,6,4]
 * Output: 5
 * Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.
 * 
 * Important Points:
 * 1. Must buy before selling
 * 2. Can only buy and sell once
 * 3. If no profit possible, return 0
 * 4. Prices array can be empty
 * 
 * Approach 1 (Brute Force):
 * - Use two nested loops
 * - Outer loop picks buy day
 * - Inner loop picks sell day
 * - Calculate profit for each pair
 * - Keep track of maximum profit
 * 
 * Approach 2 (Optimal):
 * - Keep track of minimum price seen so far
 * - For each price, calculate potential profit
 * - Update maximum profit if current profit is higher
 * - Update minimum price if current price is lower
 * 
 * Time Complexity:
 * - Brute Force: O(n²)
 * - Optimal: O(n)
 * 
 * Space Complexity: O(1) for both approaches
 */

public class MaxProfit {
    // Approach 1: Brute Force
    public int maxProfitBruteForce(int[] prices) {
        int maxProfit = 0;
        
        for (int i = 0; i < prices.length - 1; i++) {
            for (int j = i + 1; j < prices.length; j++) {
                int profit = prices[j] - prices[i];
                maxProfit = Math.max(maxProfit, profit);
            }
        }
        
        return maxProfit;
    }

    // Approach 2: Optimal Solution
    public int maxProfit(int[] prices) {
        if (prices.length < 2) return 0;
        
        int minPrice = prices[0];
        int maxProfit = 0;
        
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] < minPrice) {
                minPrice = prices[i];
            } else {
                maxProfit = Math.max(maxProfit, prices[i] - minPrice);
            }
        }
        
        return maxProfit;
    }

    public static void main(String[] args) {
        MaxProfit solution = new MaxProfit();
        
        // Test case 1: Basic case with profit
        System.out.println("Test case 1: [7,1,5,3,6,4]");
        int[] prices1 = {7, 1, 5, 3, 6, 4};
        System.out.println("Brute Force: " + solution.maxProfitBruteForce(prices1));
        System.out.println("Optimal: " + solution.maxProfit(prices1));

        // Test case 2: No profit possible
        System.out.println("\nTest case 2: [7,6,4,3,1]");
        int[] prices2 = {7, 6, 4, 3, 1};
        System.out.println("Brute Force: " + solution.maxProfitBruteForce(prices2));
        System.out.println("Optimal: " + solution.maxProfit(prices2));

        // Test case 3: Empty array
        System.out.println("\nTest case 3: []");
        int[] prices3 = {};
        System.out.println("Brute Force: " + solution.maxProfitBruteForce(prices3));
        System.out.println("Optimal: " + solution.maxProfit(prices3));

        // Test case 4: Single element
        System.out.println("\nTest case 4: [1]");
        int[] prices4 = {1};
        System.out.println("Brute Force: " + solution.maxProfitBruteForce(prices4));
        System.out.println("Optimal: " + solution.maxProfit(prices4));

        // Test case 5: Two elements with profit
        System.out.println("\nTest case 5: [1,2]");
        int[] prices5 = {1, 2};
        System.out.println("Brute Force: " + solution.maxProfitBruteForce(prices5));
        System.out.println("Optimal: " + solution.maxProfit(prices5));

        // Test case 6: Two elements with loss
        System.out.println("\nTest case 6: [2,1]");
        int[] prices6 = {2, 1};
        System.out.println("Brute Force: " + solution.maxProfitBruteForce(prices6));
        System.out.println("Optimal: " + solution.maxProfit(prices6));

        // Test case 7: Multiple peaks and valleys
        System.out.println("\nTest case 7: [3,2,6,5,0,3]");
        int[] prices7 = {3, 2, 6, 5, 0, 3};
        System.out.println("Brute Force: " + solution.maxProfitBruteForce(prices7));
        System.out.println("Optimal: " + solution.maxProfit(prices7));
    }
} 