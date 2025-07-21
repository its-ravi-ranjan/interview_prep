/**
 * HOUSE ROBBER II - DYNAMIC PROGRAMMING PROBLEM (CIRCULAR HOUSES)
 * 
 * 🎯 PROBLEM STATEMENT:
 * You are a professional robber planning to rob houses along a street. 
 * Each house has a certain amount of money stashed. All houses at this 
 * place are arranged in a circle. That means the first house is the 
 * neighbor of the last one. Meanwhile, adjacent houses have a security 
 * system connected, and it will automatically contact the police if two 
 * adjacent houses were broken into on the same night.
 * 
 * Given an integer array nums representing the amount of money of each house, 
 * return the maximum amount of money you can rob tonight without alerting the police.
 * 
 * 📝 EXAMPLES:
 * Input: nums = [2,3,2]
 * Output: 3
 * Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), 
 * because they are adjacent houses. So rob house 2 (money = 3).
 * 
 * Input: nums = [1,2,3,1]
 * Output: 4
 * Explanation: Rob house 2 (money = 2) and house 4 (money = 2).
 * 
 * 🔍 PATTERN RECOGNITION:
 * This is House Robber I with a circular constraint!
 * The key insight is that we can't rob both the first and last house.
 * So we solve two subproblems:
 * 1. Rob houses 0 to n-2 (exclude last house)
 * 2. Rob houses 1 to n-1 (exclude first house)
 * Then take the maximum of these two results.
 * 
 * 🎯 KEY INSIGHT:
 * Since houses are in a circle, we can't rob both first and last house.
 * Therefore: maxMoney = max(robLinear(0, n-2), robLinear(1, n-1))
 * 
 * This breaks the circular constraint into two linear problems!
 */

public class HouseRobber2 {
    
    public static void main(String[] args) {
        System.out.println("=== HOUSE ROBBER II - CIRCULAR HOUSES ===");
        
        // Test cases
        int[][] testCases = {
            {2, 3, 2},           // Expected: 3
            {1, 2, 3, 1},        // Expected: 4
            {1, 2, 3, 4, 5},     // Expected: 8
            {2, 1, 1, 2},        // Expected: 3
            {1},                 // Expected: 1
            {1, 2},              // Expected: 2
            {},                  // Expected: 0
            {5, 1, 2, 6, 20, 2}, // Expected: 25
            {2, 7, 9, 3, 1},     // Expected: 11
            {1, 3, 1, 3, 100}    // Expected: 103
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
        
        // Demonstrate the circular constraint
        System.out.println("\n=== CIRCULAR CONSTRAINT DEMONSTRATION ===");
        int[] demoNums = {2, 7, 9, 3, 1};
        System.out.println("Input: " + arrayToString(demoNums));
        System.out.println("Subproblem 1 (houses 0 to 3): " + robLinear(0, 3, demoNums));
        System.out.println("Subproblem 2 (houses 1 to 4): " + robLinear(1, 4, demoNums));
        System.out.println("Final result: " + robIterative(demoNums));
    }
    
    // ==================== APPROACH 1: ITERATIVE (SPACE OPTIMIZED) ====================
    /**
     * 🎯 APPROACH: Iterative with Constant Space
     * 
     * 💡 IDEA: 
     * - Break the circular problem into two linear subproblems
     * - Solve each subproblem using the same approach as House Robber I
     * - Take the maximum of the two results
     * 
     * 🔄 ALGORITHM:
     * 1. Handle base cases: empty array = 0, single house = house value
     * 2. For circular constraint, solve two subproblems:
     *    - Subproblem 1: robLinear(0, n-2) - exclude last house
     *    - Subproblem 2: robLinear(1, n-1) - exclude first house
     * 3. Return max(subproblem1, subproblem2)
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Two linear passes through the array
     *    - Each pass takes O(n) time
     *    - Total: O(n)
     * 
     * 🏠 SPACE COMPLEXITY: O(1)
     *    - Only uses constant space for variables
     *    - No additional arrays needed
     * 
     * 🎯 INTERVIEW ANSWER: "This approach breaks the circular constraint into 
     * two linear subproblems. We solve House Robber I twice - once excluding 
     * the last house and once excluding the first house, then take the maximum. 
     * Time complexity is O(n) and space complexity is O(1)."
     */
    public static int robIterative(int[] nums) {
        int n = nums.length;
        if (n == 0) return 0;
        if (n == 1) return nums[0];
        if (n == 2) return Math.max(nums[0], nums[1]);
        
        // Solve two subproblems and take the maximum
        return Math.max(
            robLinear(0, n - 2, nums),  // Exclude last house
            robLinear(1, n - 1, nums)   // Exclude first house
        );
    }
    
    /**
     * Helper method to solve linear house robber problem
     * This is the same as House Robber I
     */
    private static int robLinear(int start, int end, int[] nums) {
        int prev1 = 0;  // Maximum money from 2 houses back
        int prev2 = 0;  // Maximum money from 1 house back
        
        for (int i = start; i <= end; i++) {
            int current = Math.max(prev2, nums[i] + prev1);
            prev1 = prev2;
            prev2 = current;
        }
        
        return prev2;
    }
    
    // ==================== APPROACH 2: RECURSIVE WITH MEMOIZATION ====================
    /**
     * 🎯 APPROACH: Recursive with Memoization (Top-down DP)
     * 
     * 💡 IDEA:
     * - Use recursion to break down the problem
     * - Cache results to avoid recalculating subproblems
     * - Apply the same circular constraint logic
     * 
     * 🔄 ALGORITHM:
     * 1. Handle base cases
     * 2. Create memo arrays for both subproblems
     * 3. Solve two recursive subproblems:
     *    - helper(nums, 0, n-2, memo1)
     *    - helper(nums, 1, n-1, memo2)
     * 4. Return maximum of the two results
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Each subproblem is solved only once
     *    - Two subproblems of size n-1 each
     *    - Total: O(n)
     * 
     * 🏠 SPACE COMPLEXITY: O(n)
     *    - Two memo arrays of size n
     *    - Recursion call stack: O(n) in worst case
     *    - Total: O(n)
     * 
     * 🎯 INTERVIEW ANSWER: "This approach uses recursion with memoization for 
     * both subproblems. It has O(n) time and space complexity, where space is 
     * used for memo arrays and recursion stack."
     */
    public static int robMemoization(int[] nums) {
        int n = nums.length;
        if (n == 0) return 0;
        if (n == 1) return nums[0];
        if (n == 2) return Math.max(nums[0], nums[1]);
        
        // Create memo arrays for both subproblems
        int[] memo1 = new int[n];
        int[] memo2 = new int[n];
        
        // Solve two subproblems
        int result1 = helper(nums, 0, n - 2, memo1);
        int result2 = helper(nums, 1, n - 1, memo2);
        
        return Math.max(result1, result2);
    }
    
    private static int helper(int[] nums, int start, int end, int[] memo) {
        // Base cases
        if (start > end) return 0;
        if (start == end) return nums[start];
        if (start == end - 1) return Math.max(nums[start], nums[end]);
        
        // Check if result is already cached
        if (memo[start] != 0) return memo[start];
        
        // Calculate and cache result
        memo[start] = Math.max(
            helper(nums, start + 1, end, memo),  // Skip current house
            nums[start] + helper(nums, start + 2, end, memo)  // Rob current house
        );
        return memo[start];
    }
    
    // ==================== APPROACH 3: TABULATION (BOTTOM-UP DP) ====================
    /**
     * 🎯 APPROACH: Tabulation (Bottom-up Dynamic Programming)
     * 
     * 💡 IDEA:
     * - Build solution from base cases up to target
     * - Use arrays to store intermediate results for both subproblems
     * - Apply the same circular constraint logic
     * 
     * 🔄 ALGORITHM:
     * 1. Handle base cases
     * 2. Create DP arrays for both subproblems
     * 3. Fill both arrays using bottom-up approach
     * 4. Return maximum of the two final results
     * 
     * ⏰ TIME COMPLEXITY: O(n)
     *    - Two linear passes through the array
     *    - Each pass takes O(n) time
     *    - Total: O(n)
     * 
     * 🏠 SPACE COMPLEXITY: O(n)
     *    - Two DP arrays of size n
     *    - No recursion stack overhead
     * 
     * 🎯 INTERVIEW ANSWER: "This bottom-up approach builds solutions for both 
     * subproblems iteratively. It has O(n) time and O(n) space complexity, 
     * where space is used for the DP arrays."
     */
    public static int robTabulation(int[] nums) {
        int n = nums.length;
        if (n == 0) return 0;
        if (n == 1) return nums[0];
        if (n == 2) return Math.max(nums[0], nums[1]);
        
        // Create DP arrays for both subproblems
        int[] dp1 = new int[n - 1];  // For houses 0 to n-2
        int[] dp2 = new int[n - 1];  // For houses 1 to n-1
        
        // Fill first DP array (houses 0 to n-2)
        dp1[0] = nums[0];
        if (n > 2) dp1[1] = Math.max(nums[0], nums[1]);
        
        for (int i = 2; i < n - 1; i++) {
            dp1[i] = Math.max(dp1[i - 1], nums[i] + dp1[i - 2]);
        }
        
        // Fill second DP array (houses 1 to n-1)
        dp2[0] = nums[1];
        if (n > 2) dp2[1] = Math.max(nums[1], nums[2]);
        
        for (int i = 2; i < n - 1; i++) {
            dp2[i] = Math.max(dp2[i - 1], nums[i + 1] + dp2[i - 2]);
        }
        
        // Return maximum of the two results
        return Math.max(dp1[n - 2], dp2[n - 2]);
    }
    
    // ==================== BONUS: TRACKING OPTIMAL PATH ====================
    /**
     * 🎯 BONUS: Track which houses to rob for maximum profit
     * 
     * 💡 IDEA:
     * - Use the same DP approach but track decisions
     * - Compare results of both subproblems
     * - Show which subproblem gives better result
     */
    public static String getOptimalPath(int[] nums) {
        if (nums.length == 0) return "No houses to rob";
        if (nums.length == 1) return "Rob house 1";
        if (nums.length == 2) return "Rob house " + (nums[0] > nums[1] ? "1" : "2");
        
        int n = nums.length;
        
        // Solve both subproblems with path tracking
        String path1 = getLinearPath(0, n - 2, nums);
        String path2 = getLinearPath(1, n - 1, nums);
        
        int result1 = robLinear(0, n - 2, nums);
        int result2 = robLinear(1, n - 1, nums);
        
        if (result1 >= result2) {
            return "Subproblem 1: " + path1 + " (Total: $" + result1 + ")";
        } else {
            return "Subproblem 2: " + path2 + " (Total: $" + result2 + ")";
        }
    }
    
    private static String getLinearPath(int start, int end, int[] nums) {
        if (start > end) return "No houses";
        if (start == end) return "house " + (start + 1) + "($" + nums[start] + ")";
        
        int n = end - start + 1;
        int[] dp = new int[n];
        boolean[] robbed = new boolean[n];
        
        // Base cases
        dp[0] = nums[start];
        robbed[0] = true;
        
        if (n > 1) {
            if (nums[start + 1] > nums[start]) {
                dp[1] = nums[start + 1];
                robbed[0] = false;
                robbed[1] = true;
            } else {
                dp[1] = nums[start];
                robbed[1] = false;
            }
        }
        
        // Fill DP array
        for (int i = 2; i < n; i++) {
            if (dp[i - 1] > nums[start + i] + dp[i - 2]) {
                dp[i] = dp[i - 1];
                robbed[i] = false;
            } else {
                dp[i] = nums[start + i] + dp[i - 2];
                robbed[i] = true;
            }
        }
        
        // Build result string
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (robbed[i]) {
                if (result.length() > 0) result.append(" + ");
                result.append("house ").append(start + i + 1).append("($").append(nums[start + i]).append(")");
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
     * 
     * 🔑 KEY DIFFERENCE FROM HOUSE ROBBER I:
     * - Circular constraint: can't rob both first and last house
     * - Solution: solve two linear subproblems and take maximum
     * - This is a common pattern for circular/cyclic problems
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