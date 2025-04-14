/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/
function findLargestElement(numbers) {
    if (numbers.length === 0) {
        return undefined; // Return undefined if the array is empty
    }
    return Math.max(...numbers); // Use Math.max with spread operator to find the largest element
}

module.exports = findLargestElement;
// function findLargestElement(numbers) {
    
// }

// module.exports = findLargestElement;