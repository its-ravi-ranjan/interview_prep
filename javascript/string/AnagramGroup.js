/**
 * Anagram Grouping Problem
 * 
 * Problem:
 * Given an array of strings, group all strings that have the same set of unique characters.
 * Strings with the same set of unique characters (regardless of frequency) should be grouped together.
 * 
 * Example:
 * Input: words[] = [ "may", "student", "students", "dog",
 *                   "studentssess", "god", "cat", "act",
 *                   "tab", "bat", "flow", "wolf", "lambs",
 *                   "amy", "yam", "balms", "looped", 
 *                   "poodle"]
 * 
 * Output:
 * looped, poodle,
 * lambs, balms,
 * flow, wolf,
 * tab, bat,
 * 
 * Approach:
 * 1. For each word:
 *    - Convert to lowercase
 *    - Get unique characters using Set
 *    - Sort unique characters
 *    - Use sorted unique characters as key in Map
 *    - Add word to list of words with same key
 * 2. Print all groups that have more than one word
 * 
 * Time Complexity: O(n * m * log m)
 * - n = number of words
 * - m = average length of words
 * - For each word:
 *   - Converting to lowercase: O(m)
 *   - Creating Set: O(m)
 *   - Sorting unique characters: O(m log m)
 *   - Map operations: O(1) average case
 * 
 * Space Complexity: O(n * m)
 * - Map stores all words
 * - Each word can be up to m characters
 * - Additional space for temporary arrays and sets
 */

class AnagramGroup {
    /**
     * Groups strings that have the same set of unique characters.
     * @param {string[]} words Array of input strings
     */
    static groupStrings(words) {
        // Map to store groups of words with same unique characters
        // Key: sorted unique characters of a word
        // Value: array of words with those unique characters
        const groups = new Map();
        
        // Process each word
        for (const word of words) {
            // Convert word to lowercase for case-insensitive comparison
            const lowerWord = word.toLowerCase();
            
            // Get unique characters using Set
            const uniqueChars = new Set(lowerWord);
            
            // Sort unique characters to create consistent key
            const sortedChars = Array.from(uniqueChars).sort();
            
            // Create key from sorted unique characters
            const key = sortedChars.join('');
            
            // Add word to appropriate group
            if (!groups.has(key)) {
                groups.set(key, []);
            }
            groups.get(key).push(word);
        }
        
        // Print groups with more than one word
        for (const group of groups.values()) {
            if (group.length > 1) {
                console.log(group.join(', ') + ',');
            }
        }
    }

    /**
     * Alternative implementation using character frequency approach.
     * This approach is more efficient for words with many repeated characters.
     * @param {string[]} words Array of input strings
     */
    static groupStringsUsingFrequency(words) {
        const groups = new Map();
        
        for (const word of words) {
            // Convert to lowercase
            const lowerWord = word.toLowerCase();
            
            // Count frequency of each character
            const charCount = new Array(26).fill(0); // Assuming only lowercase letters
            for (const c of lowerWord) {
                charCount[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
            }
            
            // Create key from character presence (1 if present, 0 if not)
            const key = charCount.map(count => count > 0 ? '1' : '0').join('');
            
            // Add word to appropriate group
            if (!groups.has(key)) {
                groups.set(key, []);
            }
            groups.get(key).push(word);
        }
        
        // Print groups with more than one word
        for (const group of groups.values()) {
            if (group.length > 1) {
                console.log(group.join(', ') + ',');
            }
        }
    }

    /**
     * Run test cases to demonstrate the functionality
     */
    static runTests() {
        // Test case 1: Original example
        console.log("Test case 1: Original example");
        const words1 = [
            "may", "student", "students", "dog",
            "studentssess", "god", "cat", "act",
            "tab", "bat", "flow", "wolf", "lambs",
            "amy", "yam", "balms", "looped", 
            "poodle"
        ];
        console.log("Using unique characters approach:");
        AnagramGroup.groupStrings(words1);
        console.log("\nUsing frequency approach:");
        AnagramGroup.groupStringsUsingFrequency(words1);

        // Test case 2: Empty array
        console.log("\nTest case 2: Empty array");
        const words2 = [];
        console.log("Using unique characters approach:");
        AnagramGroup.groupStrings(words2);
        console.log("\nUsing frequency approach:");
        AnagramGroup.groupStringsUsingFrequency(words2);

        // Test case 3: Single word
        console.log("\nTest case 3: Single word");
        const words3 = ["hello"];
        console.log("Using unique characters approach:");
        AnagramGroup.groupStrings(words3);
        console.log("\nUsing frequency approach:");
        AnagramGroup.groupStringsUsingFrequency(words3);

        // Test case 4: No groups
        console.log("\nTest case 4: No groups");
        const words4 = ["cat", "dog", "bird"];
        console.log("Using unique characters approach:");
        AnagramGroup.groupStrings(words4);
        console.log("\nUsing frequency approach:");
        AnagramGroup.groupStringsUsingFrequency(words4);

        // Test case 5: Case sensitivity
        console.log("\nTest case 5: Case sensitivity");
        const words5 = ["Cat", "cat", "ACT", "act"];
        console.log("Using unique characters approach:");
        AnagramGroup.groupStrings(words5);
        console.log("\nUsing frequency approach:");
        AnagramGroup.groupStringsUsingFrequency(words5);
    }
}

// Run the tests
AnagramGroup.runTests(); 