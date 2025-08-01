/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Find Kth Largest Element in Array problem
 * 
 * Problem: Find Kth Largest Element in Array
 * ------------------------------------------
 * Given an integer array nums and an integer k, return the kth largest element in the array.
 * Note that it is the kth largest element in the sorted order, not the kth distinct element.
 * 
 * Can you solve it without sorting?
 * 
 * Example 1:
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 * 
 * Example 2:
 * Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
 * Output: 4
 */

import java.util.*;

public class FindKthLargestInArray {
    
    /**
     * Approach 1: Min Heap (Priority Queue)
     * 
     * Algorithm:
     * 1. Build a min heap from all elements
     * 2. Remove elements until heap size becomes k
     * 3. Return the root (kth largest element)
     * 
     * Time Complexity: O(n log n)
     * - Building heap: O(n log n)
     * - Removing elements: O((n-k) log n)
     * 
     * Space Complexity: O(n) - heap stores all elements
     */
    public static int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        
        // Add all elements to min heap
        for (int num : nums) {
            minHeap.add(num);
        }
        
        // Remove elements until heap size becomes k
        while (minHeap.size() > k) {
            minHeap.poll();
        }
        
        // Return the kth largest element
        return minHeap.poll();
    }
    
    /**
     * Approach 2: Max Heap (More Efficient)
     * 
     * Algorithm:
     * 1. Build a max heap from all elements
     * 2. Remove k-1 elements
     * 3. Return the kth element
     * 
     * Time Complexity: O(n + k log n)
     * - Building heap: O(n)
     * - Removing k elements: O(k log n)
     * 
     * Space Complexity: O(n) - heap stores all elements
     */
    public static int findKthLargestMaxHeap(int[] nums, int k) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        
        // Add all elements to max heap
        for (int num : nums) {
            maxHeap.add(num);
        }
        
        // Remove k-1 elements
        for (int i = 0; i < k - 1; i++) {
            maxHeap.poll();
        }
        
        // Return the kth largest element
        return maxHeap.poll();
    }
    
    /**
     * Approach 3: QuickSelect Algorithm (Most Efficient)
     * 
     * Algorithm:
     * 1. Use partition similar to quicksort
     * 2. If pivot position == k-1, return pivot
     * 3. If pivot position < k-1, search right half
     * 4. If pivot position > k-1, search left half
     * 
     * Time Complexity: O(n) average case, O(n²) worst case
     * Space Complexity: O(1) - in-place
     */
    public static int findKthLargestQuickSelect(int[] nums, int k) {
        return quickSelect(nums, 0, nums.length - 1, nums.length - k);
    }
    
    private static int quickSelect(int[] nums, int left, int right, int k) {
        if (left == right) {
            return nums[left];
        }
        
        int pivotIndex = partition(nums, left, right);
        
        if (pivotIndex == k) {
            return nums[pivotIndex];
        } else if (pivotIndex < k) {
            return quickSelect(nums, pivotIndex + 1, right, k);
        } else {
            return quickSelect(nums, left, pivotIndex - 1, k);
        }
    }
    
    private static int partition(int[] nums, int left, int right) {
        int pivot = nums[right];
        int i = left - 1;
        
        for (int j = left; j < right; j++) {
            if (nums[j] <= pivot) {
                i++;
                swap(nums, i, j);
            }
        }
        
        swap(nums, i + 1, right);
        return i + 1;
    }
    
    private static void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
    
    /**
     * Approach 4: Min Heap of Size K (Most Space Efficient)
     * 
     * Algorithm:
     * 1. Maintain a min heap of size k
     * 2. Add elements to heap, remove smallest if size > k
     * 3. Return the root (kth largest)
     * 
     * Time Complexity: O(n log k)
     * Space Complexity: O(k) - heap stores only k elements
     */
    public static int findKthLargestMinHeapK(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        
        for (int num : nums) {
            minHeap.add(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        
        return minHeap.poll();
    }
    
    /**
     * Approach 5: Using Arrays.sort() (Simple but less efficient)
     * 
     * Time Complexity: O(n log n)
     * Space Complexity: O(1) - in-place sorting
     */
    public static int findKthLargestSort(int[] nums, int k) {
        Arrays.sort(nums);
        return nums[nums.length - k];
    }
    
    /**
     * Visualize the heap state for debugging
     */
    public static void visualizeHeap(int[] nums, int k) {
        System.out.println("Original array: " + Arrays.toString(nums));
        System.out.println("k: " + k);
        
        // Min heap approach
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : nums) {
            minHeap.add(num);
        }
        
        System.out.println("Min heap after building: " + minHeap);
        
        while (minHeap.size() > k) {
            int removed = minHeap.poll();
            System.out.println("Removed: " + removed + ", Heap: " + minHeap);
        }
        
        System.out.println("Final result: " + minHeap.poll());
    }
    
    // Test cases
    public static void main(String[] args) {
        System.out.println("=== Find Kth Largest Element in Array Problem ===\n");
        
        // Test case 1
        int[] nums1 = {3, 2, 1, 5, 6, 4};
        int k1 = 2;
        System.out.println("Test Case 1:");
        System.out.println("Input: nums = " + Arrays.toString(nums1) + ", k = " + k1);
        System.out.println("Expected: 5");
        System.out.println("Min Heap Output: " + findKthLargest(nums1.clone(), k1));
        System.out.println("Max Heap Output: " + findKthLargestMaxHeap(nums1.clone(), k1));
        System.out.println("QuickSelect Output: " + findKthLargestQuickSelect(nums1.clone(), k1));
        System.out.println("Min Heap K Output: " + findKthLargestMinHeapK(nums1.clone(), k1));
        System.out.println("Sort Output: " + findKthLargestSort(nums1.clone(), k1));
        System.out.println();
        
        // Test case 2
        int[] nums2 = {3, 2, 3, 1, 2, 4, 5, 5, 6};
        int k2 = 4;
        System.out.println("Test Case 2:");
        System.out.println("Input: nums = " + Arrays.toString(nums2) + ", k = " + k2);
        System.out.println("Expected: 4");
        System.out.println("Min Heap Output: " + findKthLargest(nums2.clone(), k2));
        System.out.println("Max Heap Output: " + findKthLargestMaxHeap(nums2.clone(), k2));
        System.out.println("QuickSelect Output: " + findKthLargestQuickSelect(nums2.clone(), k2));
        System.out.println("Min Heap K Output: " + findKthLargestMinHeapK(nums2.clone(), k2));
        System.out.println("Sort Output: " + findKthLargestSort(nums2.clone(), k2));
        System.out.println();
        
        // Test case 3
        int[] nums3 = {1};
        int k3 = 1;
        System.out.println("Test Case 3:");
        System.out.println("Input: nums = " + Arrays.toString(nums3) + ", k = " + k3);
        System.out.println("Expected: 1");
        System.out.println("Min Heap Output: " + findKthLargest(nums3.clone(), k3));
        System.out.println("Max Heap Output: " + findKthLargestMaxHeap(nums3.clone(), k3));
        System.out.println("QuickSelect Output: " + findKthLargestQuickSelect(nums3.clone(), k3));
        System.out.println("Min Heap K Output: " + findKthLargestMinHeapK(nums3.clone(), k3));
        System.out.println("Sort Output: " + findKthLargestSort(nums3.clone(), k3));
        System.out.println();
        
        // Visualization
        System.out.println("=== Visualization ===");
        visualizeHeap(nums1, k1);
    }
} 