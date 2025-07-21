/**
 * HOUSE ROBBER - DYNAMIC PROGRAMMING PROBLEM
 * 
 * 🎯 PROBLEM STATEMENT:
 * You are a professional robber planning to rob houses along a street. 
 * Each house has a certain amount of money stashed, the only constraint 
 * stopping you from robbing each of them is that adjacent houses have 
 * security systems connected and it will automatically contact the police 
 * if two adjacent houses were broken into on the same night.
 * 
 * Given an integer array nums representing the amount of money of each house, 
 * return the maximum amount of money you can rob tonight without alerting the police.
 * 
 * 📝 EXAMPLES:
 * Input: nums = [1,2,3,1]
 * Output: 4
 * Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
 * Total amount you can rob = 1 + 3 = 4.
 * 
 * Input: nums = [2,7,9,3,1]
 * Output: 12
 * Explanation: Rob house 1 (money = 2), rob house 3 (money = 9), and rob house 5 (money = 1).
 * Total amount you can rob = 2 + 9 + 1 = 12.
 * 
 * 🔍 PATTERN RECOGNITION:
 * This is a variation of the maximum subarray problem with constraints!
 * At each house, we have two choices:
 * 1. Rob this house + money from house i-2
 * 2. Skip this house + money from house i-1
 * 
 * 🎯 KEY INSIGHT:
 * For each house i, the maximum money we can rob is:
 * dp[i] = max(dp[i-1], nums[i] + dp[i-2])
 * 
 * This means: max(skip current house, rob current house + money from 2 houses back)
 */

public class HouseRobber {
    
    public static void main(String[] args) {
        System.out.println("=== HOUSE ROBBER - DYNAMIC PROGRAMMING ===");
        
        // Test cases
        int[][] testCases = {
            {1, 2, 3, 1},           // Expected: 4
            {2, 7, 9, 3, 1},        // Expected: 12
            {1, 2, 3, 4, 5},        // Expected: 9
            {2, 1, 1, 2},           // Expected: 4
            {1},                    // Expected: 1
            {1, 2},                 // Expected: 2
            {},                     // Expected: 0
            {5, 1, 2, 6, 20, 2}     // Expected: 27
        };
        
        for (int i = 0; i < testCases.length; i++) {
            int[] nums = testCases[i];
            System.out.println("\n--- Test Case " + (i + 1) + " ---");
            System.out.println("Input: " + arrayToString(nums));
            
            // Approach 1: Iterative (Space Optimized)
            long startTime = System.nanoTime();
            int result1 = robIterative(nums);
            long endTime = System.nanoTime();
            System.out.println("Iterative Approach: " + result1 + 
                             " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            // Approach 2: Recursive with Memoization
            startTime = System.nanoTime();
            int result2 = robMemoization(nums);
            endTime = System.nanoTime();
            System.out.println("Memoization Approach: " + result2 + 
                             " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            // Approach 3: Tabulation (Bottom-up DP)
            startTime = System.nanoTime();
            int result3 = robTabulation(nums);
            endTime = System.nanoTime();
            System.out.println("Tabulation Approach: " + result3 + 
                             " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            // Verify all approaches give same result
            if (result1 == result2 && result2 == result3) {
                System.out.println("✅ All approaches agree!");
            } else {
                System.out.println("❌ Results don't match!");
            }
        }
        
        // Demonstrate the pattern with a larger example
        System.out.println("\n=== PATTERN DEMONSTRATION ===");
        int[] demoNums = {2, 7, 9, 3, 1, 8, 4, 6};
        System.out.println("Input: " + arrayToString(demoNums));
        System.out.println("Optimal robbery path: " + getOptimalPath(demoNums));
        System.out.println("Maximum money: " + robIterative(demoNums));
    }
    
    // ==================== APPROACH 1: ITERATIVE (SPACE OPTIMIZED) ====================
    /**
     * 🎯 APPROACH: Iterative with Constant Space
     * 
     * 💡 IDEA: 
     * - Use only two variables to track previous two maximum values
     * - At each step, choose between robbing current house or skipping it
     * - This is the most space-efficient approach
     * 
     * 🔄 ALGORITHM:
     * 1. Handle base cases: empty array = 0, single house = house value
     * 2. Initialize prev2 = nums[0], prev1 = max(nums[0], nums[1])
     * 3. For i from 2 to n-1:
     *    - current = max(prev1, nums[i] + prev2)
     *    - Update prev2 = prev1, prev1 = current
     * 4. Return prev1
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Single loop through the array
     *    - Constant time operations in each iteration
     * 
     * 🏠 SPACE COMPLEXITY: O(1)
     *    - Only uses 3 variables regardless of input size
     *    - Most space-efficient approach
     * 
     * 🎯 INTERVIEW ANSWER: "This is the most efficient approach with O(n) time 
     * and O(1) space. It uses the iterative pattern with constant space by 
     * maintaining only the previous two maximum values."
     */
    public static int robIterative(int[] nums) {
        if (nums.length == 0) return 0;
        if (nums.length == 1) return nums[0];
        
        int prev2 = nums[0];  // Maximum money from 2 houses back
        int prev1 = Math.max(prev2, nums[1]);  // Maximum money from 1 house back
        
        for (int i = 2; i < nums.length; i++) {
            int current = Math.max(prev1, nums[i] + prev2);
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
    
    // ==================== APPROACH 2: RECURSIVE WITH MEMOIZATION ====================
    /**
     * 🎯 APPROACH: Recursive with Memoization (Top-down DP)
     * 
     * 💡 IDEA:
     * - Use recursion to break down the problem
     * - Cache results to avoid recalculating subproblems
     * - Top-down approach: solve from end down to base cases
     * 
     * 🔄 ALGORITHM:
     * 1. Create memo array to cache results
     * 2. Base cases: f(0) = nums[0], f(1) = max(nums[0], nums[1])
     * 3. For each position, check if result is cached
     * 4. If not cached, calculate f(i) = max(f(i-1), nums[i] + f(i-2))
     * 5. Cache and return result
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Each subproblem is solved only once
     *    - Total number of unique subproblems is n
     *    - Without memoization: O(2^n) exponential time
     * 
     * 🏠 SPACE COMPLEXITY: O(n)
     *    - Memo array: O(n)
     *    - Recursion call stack: O(n) in worst case
     *    - Total: O(n)
     * 
     * 🎯 INTERVIEW ANSWER: "This approach uses recursion with memoization to 
     * avoid recalculating subproblems. It has O(n) time and space complexity, 
     * where the space is used for both the memo array and recursion stack."
     */
    public static int robMemoization(int[] nums) {
        if (nums.length == 0) return 0;
        if (nums.length == 1) return nums[0];
        
        int[] memo = new int[nums.length];
        return helper(nums, nums.length - 1, memo);
    }
    
    private static int helper(int[] nums, int index, int[] memo) {
        // Base cases
        if (index == 0) return nums[0];
        if (index == 1) return Math.max(nums[0], nums[1]);
        
        // Check if result is already cached
        if (memo[index] != 0) return memo[index];
        
        // Calculate and cache result
        memo[index] = Math.max(
            helper(nums, index - 1, memo),  // Skip current house
            nums[index] + helper(nums, index - 2, memo)  // Rob current house
        );
        return memo[index];
    }
    
    // ==================== APPROACH 3: TABULATION (BOTTOM-UP DP) ====================
    /**
     * 🎯 APPROACH: Tabulation (Bottom-up Dynamic Programming)
     * 
     * 💡 IDEA:
     * - Build solution from base cases up to target
     * - Use array to store all intermediate results
     * - Bottom-up approach: solve from beginning to end
     * 
     * 🔄 ALGORITHM:
     * 1. Create DP array of size n
     * 2. Set base cases: dp[0] = nums[0], dp[1] = max(nums[0], nums[1])
     * 3. For i from 2 to n-1:
     *    - dp[i] = max(dp[i-1], nums[i] + dp[i-2])
     * 4. Return dp[n-1]
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Single loop through the array
     *    - Constant time operations in each iteration
     * 
     * 🏠 SPACE COMPLEXITY: O(n)
     *    - DP array of size n
     *    - No recursion stack overhead
     * 
     * 🎯 INTERVIEW ANSWER: "This bottom-up approach builds the solution 
     * iteratively from base cases. It has O(n) time and O(n) space complexity, 
     * where space is used for the DP array to store all intermediate results."
     */
    public static int robTabulation(int[] nums) {
        int n = nums.length;
        if (n == 0) return 0;
        if (n == 1) return nums[0];
        
        int[] dp = new int[n];
        dp[0] = nums[0];  // Base case: only first house
        dp[1] = Math.max(nums[0], nums[1]);  // Base case: max of first two houses
        
        for (int i = 2; i < n; i++) {
            dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
        }
        
        return dp[n - 1];
    }
    
    // ==================== BONUS: TRACKING OPTIMAL PATH ====================
    /**
     * 🎯 BONUS: Track which houses to rob for maximum profit
     * 
     * 💡 IDEA:
     * - Use the same DP approach but track decisions
     * - Backtrack through the DP array to find optimal path
     * - Useful for understanding the solution
     */
    public static String getOptimalPath(int[] nums) {
        if (nums.length == 0) return "No houses to rob";
        if (nums.length == 1) return "Rob house 1";
        
        int n = nums.length;
        int[] dp = new int[n];
        boolean[] robbed = new boolean[n];  // Track which houses were robbed
        
        // Base cases
        dp[0] = nums[0];
        robbed[0] = true;
        
        if (nums[1] > nums[0]) {
            dp[1] = nums[1];
            robbed[0] = false;
            robbed[1] = true;
        } else {
            dp[1] = nums[0];
            robbed[1] = false;
        }
        
        // Fill DP array
        for (int i = 2; i < n; i++) {
            if (dp[i - 1] > nums[i] + dp[i - 2]) {
                dp[i] = dp[i - 1];
                robbed[i] = false;  // Skip current house
            } else {
                dp[i] = nums[i] + dp[i - 2];
                robbed[i] = true;   // Rob current house
            }
        }
        
        // Build result string
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (robbed[i]) {
                if (result.length() > 0) result.append(" + ");
                result.append("house ").append(i + 1).append("($").append(nums[i]).append(")");
            }
        }
        
        return result.toString();
    }
    
    // ==================== COMPARISON AND ANALYSIS ====================
    /**
     * 📊 COMPARISON OF APPROACHES:
     * 
     * 1. ITERATIVE (RECOMMENDED):
     *    ✅ Time: O(n), Space: O(1)
     *    ✅ Most efficient for most cases
     *    ✅ Simple to understand and implement
     *    ❌ Doesn't track which houses to rob
     * 
     * 2. MEMOIZATION:
     *    ✅ Time: O(n), Space: O(n)
     *    ✅ Good for understanding recursion
     *    ✅ Can be extended to track decisions
     *    ❌ Recursion stack overhead
     * 
     * 3. TABULATION:
     *    ✅ Time: O(n), Space: O(n)
     *    ✅ No recursion overhead
     *    ✅ Good for understanding DP
     *    ✅ Can be extended to track decisions
     *    ❌ Uses more space than iterative
     * 
     * 🎯 INTERVIEW RECOMMENDATION:
     * - Start with iterative approach (most practical)
     * - Mention memoization if asked about recursion
     * - Discuss tabulation if asked about DP
     * - Show optimal path tracking if asked for details
     */
    
    // ==================== TESTING UTILITIES ====================
    /**
     * Utility method to convert array to string for display
     */
    private static String arrayToString(int[] nums) {
        if (nums.length == 0) return "[]";
        
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < nums.length; i++) {
            sb.append(nums[i]);
            if (i < nums.length - 1) sb.append(", ");
        }
        sb.append("]");
        return sb.toString();
    }
    
    /**
     * Utility method to test all approaches and compare performance
     */
    public static void performanceTest() {
        System.out.println("\n=== PERFORMANCE COMPARISON ===");
        
        // Generate test cases of different sizes
        int[] sizes = {100, 1000, 10000, 100000};
        
        for (int size : sizes) {
            int[] testNums = new int[size];
            for (int i = 0; i < size; i++) {
                testNums[i] = (int) (Math.random() * 1000) + 1;  // Random values 1-1000
            }
            
            System.out.println("\nTesting array of size: " + size);
            
            // Test iterative
            long start = System.nanoTime();
            int result1 = robIterative(testNums);
            long time1 = System.nanoTime() - start;
            
            // Test memoization
            start = System.nanoTime();
            int result2 = robMemoization(testNums);
            long time2 = System.nanoTime() - start;
            
            // Test tabulation
            start = System.nanoTime();
            int result3 = robTabulation(testNums);
            long time3 = System.nanoTime() - start;
            
            System.out.printf("Iterative: %d, %d μs%n", result1, time1 / 1000);
            System.out.printf("Memoization: %d, %d μs%n", result2, time2 / 1000);
            System.out.printf("Tabulation: %d, %d μs%n", result3, time3 / 1000);
        }
    }
} 