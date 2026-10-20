/*
  The script computes the following statistics over the dailyPrices array:
    - The total sum of the prices.
    - The maximum price over the series.
    - The minimum price.
    - The average price.
  The script also finds the day of the maximum price in the series.

  Then, the script builds an array containing the daily price variations.
  The resulting array's length is equal to dailyPrices minus one.

  Finally, it logs the statistics, the day of the maximum price, and the daily variations
  to the console.

  Constants and variables:
  - Constants:
      - dailyPrices: an array containing the daily prices.
      - average: holds the series average.
      - dailyPriceVariations: an array to hold each price's daily variation.
  - Variables:
      - sum: the sum of the prices.
      - maximum: the maximum price.
      - maximumPosition: the day number of the maximum price.
      - idx: a counter to track the maximumPosition.
      - dayNumber: a counter to log the day number.
*/

const dailyPrices = [102.5, 99.8, 101.2, 105.6, 98.4, 103.9, 107.1];

let sum = 0;
let maximum = 0;
let maximunPosition;
let idx = 0;

for (const price of dailyPrices) {
  sum += price;
  if (price > maximum) {
    maximum = price;
    maximunPosition = idx;
  }
  idx += 1;
}

// Compute the minimum
let minimum = maximum;
for (const price of dailyPrices) {
  minimum = price < minimum ? price : minimum;
}

// Compute average
const average = Math.round((sum / dailyPrices.length) * 100) / 100;

// Calculate daily price variation
const dailyPriceVariations = [];
for (let index = 1; index < dailyPrices.length; index++) {
  dailyPriceVariations.push(dailyPrices[index] - dailyPrices[index - 1]);
}

console.log("Daily Prices statiticts");
console.log("-----------------------");
console.log(`Sum: ${sum.toFixed(2)}`);
console.log(`Maximun: ${maximum.toFixed(2)}`);
console.log(`Minimum: ${minimum.toFixed(2)}`);
console.log(`Average: ${average.toFixed(2)}`);
console.log(`Maximum price on day: ${maximunPosition + 1}`);
console.log("----------------------");
console.log("Daily price varation:");

let dayNumber = 2;
for (const variation of dailyPriceVariations) {
  console.log(`Day ${dayNumber} price variation: ${variation.toFixed(2)}`);
  dayNumber += 1;
}
