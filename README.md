# 🕒 Calculate Time Function

This project contains a JavaScript function `calculateTime` that calculates the time taken to sum numbers from `1` to `n`.

## 📂 File Structure

- `times.js`: Contains the `calculateTime` function.
- `tests`: (Optional) Add test files here if you want to test the function.

## 🚀 Function Overview

The `calculateTime` function calculates the time (in seconds) it takes to sum all numbers from `1` to `n`.

### 🛠️ Usage

```javascript
const calculateTime = require('./times');

const timeTaken = calculateTime(1000000); // Replace 1000000 with your desired value of n
console.log(`Time taken: ${timeTaken} seconds`);
