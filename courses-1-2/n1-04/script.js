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
*/

const dailyPrices = [102.5, 99.8, 101.2, 105.6, 98.4, 103.9, 107.1];

let sum = 0;
let maximum = dailyPrices[0];
let minimum = maximum;
let maximumPosition = 0;

for (let idx = 0; idx < dailyPrices.length; idx++) {
  const price = dailyPrices[idx];
  sum += price;
  if (price > maximum) {
    maximum = price;
    maximumPosition = idx;
  }
  minimum = price < minimum ? price : minimum;
}

// Compute average
const average = Math.round((sum / dailyPrices.length) * 100) / 100;

// Calculate daily price variation
const dailyPriceVariations = [];
for (let idx = 1; idx < dailyPrices.length; idx++) {
  dailyPriceVariations.push(dailyPrices[idx] - dailyPrices[idx - 1]);
}

console.log("Daily Prices statistics");
console.log("-----------------------");
console.log(`Sum: ${sum.toFixed(2)}`);
console.log(`Maximum: ${maximum.toFixed(2)}`);
console.log(`Minimum: ${minimum.toFixed(2)}`);
console.log(`Average: ${average.toFixed(2)}`);
console.log(`Maximum price on day: ${maximumPosition + 1}`);
console.log("----------------------");
console.log("Daily price variation:");

for (let idx = 0; idx < dailyPriceVariations.length; idx++) {
  const dailyVariation = dailyPriceVariations[idx];
  console.log(`Day ${idx + 2} price variation: ${dailyVariation.toFixed(2)}`);
}
