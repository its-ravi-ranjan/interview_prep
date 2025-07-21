/**
 * ASSIGN COOKIES - GREEDY ALGORITHM PROBLEM
 * 
 * 🎯 PROBLEM STATEMENT:
 * Assume you are an awesome parent and want to give your children some cookies. 
 * But, you should give each child at most one cookie.
 * 
 * Each child i has a greed factor g[i], which is the minimum size of a cookie 
 * that the child will be content with; and each cookie j has a size s[j]. 
 * If s[j] >= g[i], we can assign the cookie j to the child i, and the child i 
 * will be content. Your goal is to maximize the number of your content children 
 * and output the maximum number.
 * 
 * 📝 EXAMPLES:
 * Input: g = [1,2,3], s = [1,1] → Output: 1
 * Input: g = [1,2], s = [1,2,3] → Output: 2
 * 
 * 🔍 PATTERN RECOGNITION:
 * This is a classic Greedy Algorithm problem!
 * - Sort both arrays to match smallest cookie with smallest greed factor
 * - Use two pointers to track children and cookies
 * - Assign cookie to child if size >= greed factor
 * 
 * 🎯 KEY INSIGHT:
 * Sort both arrays and use greedy matching: assign smallest cookie 
 * that satisfies each child's greed factor.
 * 
 * ==================== QUICK RECAP - ALL APPROACHES ====================
 * 
 * 🎯 APPROACH 1: GREEDY WITH TWO POINTERS (RECOMMENDED)
 * 💡 IDEA: Sort both arrays, use two pointers to match smallest cookie with smallest greed factor
 * ⏰ TIME: O(n log n + m log m) - Sorting dominates
 * 🏠 SPACE: O(1) - In-place sorting
 * ✅ BEST FOR: Interviews, most practical
 * 
 * 🎯 APPROACH 2: GREEDY WITH BINARY SEARCH
 * 💡 IDEA: Sort cookies, for each child find smallest cookie using binary search
 * ⏰ TIME: O(m log m + n log m) - Binary search for each child
 * 🏠 SPACE: O(m) - Boolean array to track used cookies
 * ✅ BEST FOR: Understanding binary search applications
 * 
 * 🎯 APPROACH 3: GREEDY WITH PRIORITY QUEUE
 * 💡 IDEA: Use min heaps to maintain sorted order, extract minimums
 * ⏰ TIME: O(n log n + m log m) - Heap operations
 * 🏠 SPACE: O(n + m) - Two priority queues
 * ✅ BEST FOR: Understanding data structures
 * 
 * 📊 COMPARISON TABLE:
 * ┌─────────────────┬─────────────────┬─────────────┬─────────────┬─────────────┐
 * │    APPROACH     │   TIME COMPLEXITY│SPACE COMPLEXITY│  PRACTICAL  │  INTERVIEW  │
 * ├─────────────────┼─────────────────┼─────────────┼─────────────┼─────────────┤
 * │ Two Pointers    │ O(n log n + m log m) │     O(1)     │    ⭐⭐⭐⭐⭐   │    ⭐⭐⭐⭐⭐   │
 * │ Binary Search   │ O(m log m + n log m) │     O(m)     │    ⭐⭐⭐⭐    │    ⭐⭐⭐⭐    │
 * │ Priority Queue  │ O(n log n + m log m) │   O(n + m)   │    ⭐⭐⭐     │    ⭐⭐⭐     │
 * └─────────────────┴─────────────────┴─────────────┴─────────────┴─────────────┘
 * 
 * 🎯 INTERVIEW ANSWER: "This is a greedy problem. Sort both arrays and use 
 * two pointers to match smallest cookie with smallest greed factor. Time 
 * complexity is O(n log n + m log m) and space is O(1)."
 * 
 * 🔑 KEY POINTS TO REMEMBER:
 * 1. Sort both arrays (children by greed, cookies by size)
 * 2. Use two pointers (i for children, j for cookies)
 * 3. Assign cookie if s[j] >= g[i], move both pointers
 * 4. If cookie too small, only move cookie pointer
 * 5. Return count of assigned children
 */

import java.util.Arrays;

public class AssignCookies {
    
    public static void main(String[] args) {
        System.out.println("=== ASSIGN COOKIES - GREEDY ALGORITHM ===");
        
        int[][][] testCases = {
            {{1, 2, 3}, {1, 1}},           // Expected: 1
            {{1, 2}, {1, 2, 3}},           // Expected: 2
            {{1, 2, 3}, {1, 2, 3}},        // Expected: 3
            {{1, 2, 3}, {3, 2, 1}},        // Expected: 3
            {{1, 1, 1}, {1, 1, 1}},        // Expected: 3
            {{1, 2, 3}, {}},                // Expected: 0
            {{}, {1, 2, 3}},                // Expected: 0
            {{1}, {1}},                     // Expected: 1
            {{2}, {1}},                     // Expected: 0
            {{1, 2, 3, 4, 5}, {1, 2, 3, 4, 5}} // Expected: 5
        };
        
        for (int i = 0; i < testCases.length; i++) {
            int[] g = testCases[i][0];
            int[] s = testCases[i][1];
            System.out.println("\n--- Test Case " + (i + 1) + " ---");
            System.out.println("Input: g = " + arrayToString(g) + ", s = " + arrayToString(s));
            
            // Approach 1: Greedy with Two Pointers
            long startTime = System.nanoTime();
            int result1 = findContentChildren(g, s);
            long endTime = System.nanoTime();
            System.out.println("Greedy Two Pointers: " + result1 + " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            // Approach 2: Greedy with Binary Search
            startTime = System.nanoTime();
            int result2 = findContentChildrenBinarySearch(g, s);
            endTime = System.nanoTime();
            System.out.println("Greedy Binary Search: " + result2 + " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            // Approach 3: Greedy with Priority Queue
            startTime = System.nanoTime();
            int result3 = findContentChildrenPriorityQueue(g, s);
            endTime = System.nanoTime();
            System.out.println("Greedy Priority Queue: " + result3 + " (Time: " + (endTime - startTime) / 1000 + " μs)");
            
            if (result1 == result2 && result2 == result3) {
                System.out.println("✅ All approaches agree!");
            } else {
                System.out.println("❌ Results don't match!");
            }
        }
    }
    
    // ==================== APPROACH 1: GREEDY WITH TWO POINTERS ====================
    /**
     * 🎯 APPROACH: Greedy with Two Pointers
     * 
     * 💡 IDEA: 
     * - Sort both arrays in ascending order
     * - Use two pointers to track children and cookies
     * - Assign smallest cookie that satisfies each child's greed factor
     * - Move pointer based on whether assignment is possible
     * 
     * ⏰ TIME COMPLEXITY: O(n log n + m log m)
     *    - Sorting children array: O(n log n)
     *    - Sorting cookies array: O(m log m)
     *    - Two pointer traversal: O(min(n, m))
     *    - Total: O(n log n + m log m)
     * 
     * 🏠 SPACE COMPLEXITY: O(1)
     *    - Only uses constant extra space
     *    - Sorting is in-place
     */
    public static int findContentChildren(int[] g, int[] s) {
        Arrays.sort(g);  // Sort children by greed factor
        Arrays.sort(s);  // Sort cookies by size
        
        int i = 0;  // Pointer for children
        int j = 0;  // Pointer for cookies
        int contentChildren = 0;
        
        while (i < g.length && j < s.length) {
            if (s[j] >= g[i]) {
                contentChildren++;  // Assign cookie to child
                i++;  // Move to next child
            }
            j++;  // Always move to next cookie
        }
        
        return contentChildren;
    }
    
    // ==================== APPROACH 2: GREEDY WITH BINARY SEARCH ====================
    /**
     * 🎯 APPROACH: Greedy with Binary Search
     * 
     * 💡 IDEA:
     * - Sort cookies array
     * - For each child, find smallest cookie that satisfies their greed factor
     * - Use binary search to find optimal cookie
     * - Mark used cookies to avoid reuse
     * 
     * ⏰ TIME COMPLEXITY: O(m log m + n log m)
     *    - Sorting cookies: O(m log m)
     *    - Binary search for each child: O(n log m)
     *    - Total: O(m log m + n log m)
     * 
     * 🏠 SPACE COMPLEXITY: O(m)
     *    - Boolean array to track used cookies
     */
    public static int findContentChildrenBinarySearch(int[] g, int[] s) {
        if (s.length == 0) return 0;
        
        Arrays.sort(s);  // Sort cookies by size
        boolean[] used = new boolean[s.length];
        int contentChildren = 0;
        
        for (int greed : g) {
            int cookieIndex = findSmallestCookie(s, used, greed);
            if (cookieIndex != -1) {
                used[cookieIndex] = true;
                contentChildren++;
            }
        }
        
        return contentChildren;
    }
    
    private static int findSmallestCookie(int[] s, boolean[] used, int greed) {
        int left = 0;
        int right = s.length - 1;
        int result = -1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (s[mid] >= greed) {
                // Check if this cookie is available and find smallest available
                result = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        
        // Find first unused cookie from result onwards
        if (result != -1) {
            while (result < s.length && used[result]) {
                result++;
            }
            if (result < s.length) {
                return result;
            }
        }
        
        return -1;
    }
    
    // ==================== APPROACH 3: GREEDY WITH PRIORITY QUEUE ====================
    /**
     * 🎯 APPROACH: Greedy with Priority Queue
     * 
     * 💡 IDEA:
     * - Use priority queues to maintain sorted order
     * - Extract minimum values from both queues
     * - Match children with cookies greedily
     * 
     * ⏰ TIME COMPLEXITY: O(n log n + m log m)
     *    - Building priority queues: O(n log n + m log m)
     *    - Extraction operations: O(min(n, m) * log n + min(n, m) * log m)
     * 
     * 🏠 SPACE COMPLEXITY: O(n + m)
     *    - Two priority queues
     */
    public static int findContentChildrenPriorityQueue(int[] g, int[] s) {
        java.util.PriorityQueue<Integer> children = new java.util.PriorityQueue<>();
        java.util.PriorityQueue<Integer> cookies = new java.util.PriorityQueue<>();
        
        // Add all children and cookies to priority queues
        for (int greed : g) {
            children.offer(greed);
        }
        for (int size : s) {
            cookies.offer(size);
        }
        
        int contentChildren = 0;
        
        while (!children.isEmpty() && !cookies.isEmpty()) {
            int childGreed = children.peek();
            int cookieSize = cookies.peek();
            
            if (cookieSize >= childGreed) {
                contentChildren++;
                children.poll();  // Remove child
                cookies.poll();   // Remove cookie
            } else {
                cookies.poll();   // Remove cookie (too small)
            }
        }
        
        return contentChildren;
    }
    
    // ==================== UTILITY METHODS ====================
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
     * 📊 COMPARISON OF APPROACHES:
     * 
     * 1. TWO POINTERS (RECOMMENDED):
     *    ✅ Time: O(n log n + m log m), Space: O(1)
     *    ✅ Most efficient and simple
     *    ✅ Best for interviews
     * 
     * 2. BINARY SEARCH:
     *    ✅ Time: O(m log m + n log m), Space: O(m)
     *    ✅ Good for understanding binary search
     *    ❌ More complex implementation
     * 
     * 3. PRIORITY QUEUE:
     *    ✅ Time: O(n log n + m log m), Space: O(n + m)
     *    ✅ Good for understanding data structures
     *    ❌ More space usage
     * 
     * 🎯 INTERVIEW ANSWER: "This is a greedy problem. Sort both arrays and use 
     * two pointers to match smallest cookie with smallest greed factor. Time 
     * complexity is O(n log n + m log m) and space is O(1)."
     */
} 