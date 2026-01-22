/**
 * stats.js
 * Reads integers from the user until they type 'q', then computes mean and median.
 * Includes input validation and friendly error handling.
 */

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Store valid integers here
const numbers = [];

/**
 * Compute the mean (average) of an array of numbers.
 */
function mean(arr) {
  const sum = arr.reduce((acc, n) => acc + n, 0);
  return sum / arr.length;
}

/**
 * Compute the median of an array of numbers.
 * Steps:
 * 1) Copy and sort the array
 * 2) If odd length -> middle element
 * 3) If even length -> average of the two middle elements
 */
function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 1) {
    return sorted[mid];
  } else {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
}

/**
 * Repeatedly prompt the user for an integer or 'q' to quit.
 * Uses recursion with rl.question to keep asking.
 */
function promptForNumber() {
  rl.question("Enter an integer (or 'q' to quit): ", (input) => {
    const trimmed = input.trim();

    // Quit condition
    if (trimmed.toLowerCase() === "q") {
      if (numbers.length === 0) {
        console.log("\nNo numbers entered. Exiting.");
        rl.close();
        return;
      }

      const avg = mean(numbers);
      const med = median(numbers);

      console.log("\nResults:");
      console.log("Numbers:", numbers.join(", "));
      console.log("Mean:", avg);
      console.log("Median:", med);

      rl.close();
      return;
    }

    // Validate integer input:
    // - Number() converts; Number.isInteger checks integer
    // - Reject empty strings, NaN, decimals, etc.
    const value = Number(trimmed);

    if (!Number.isInteger(value)) {
      console.log("Invalid input. Please enter a whole integer (e.g., 5, -2) or 'q' to quit.");
      return promptForNumber();
    }

    // Store valid integer
    numbers.push(value);
    return promptForNumber();
  });
}

// Start the program
console.log("Mean/Median Calculator (integers only). Type 'q' to quit.\n");
promptForNumber();
