/*
  The script manages the positions on a shares portfolio. Defines the following functions:
    - positionValue: Computes a position value.
    - buy:Returns a new position after a purchase.
    - portfolioValue: Calculates the total portfolio value.
  It declares the following constants and variables:
  - Constants:
    . portfolio: an example portfolio to test the script.
    . portfolioAfter: a  portfolio to hold new purchase.
    . posIdx: the index of the position for which makes a new purchase.
*/

/**
 * Represents the current position for a ticker.
 *
 * @typedef {object} TickerPosition
 * @property {string} ticker - The ticker of the share.
 * @property {number} quantity - The number of shares.
 * @property {number} averagePrice - The shares purchase average price.
 */

/**
 * Calculates the current value of TickerPosition.
 *
 * @param {TickerPosition} pos - The position to calculate.
 * @param {number} currentPrice - The current price of the TickerPosition.ticker
 * @returns {number} The current position value rounded to two decimal places.
 */
function positionValue(pos, currentPrice) {
  return roundToFixedDecimals(pos.quantity * currentPrice, 2);
}

/**
 * Creates a new TickerPosition and returns it.
 *
 * @param {TickerPosition} pos - The current tickers position.
 * @param {number} quantity - The total shares buy.
 * @param {number} price - The ticker purchase price
 * @returns {TickerPosition} - A new TickerPosition Object including the total shares holding and the average purchase price
 * @throws {RangeError} If the buy quantity or price are zero or negative
 */
function buy(pos, quantity, price) {
  if (quantity <= 0 || price <= 0) {
    throw new RangeError(
      "Invalid quantity or price, both must be greater than zero",
    );
  }

  return {
    ...pos,
    quantity: pos.quantity + quantity,
    averagePrice:
      (pos.quantity * pos.averagePrice + quantity * price) /
      (pos.quantity + quantity),
  };
}

/**
 * Calculate the total value of tickers portfolio
 *
 * @param {TickerPosition[]} portfolio - The tickers positions to compute total value.
 * @param {Object<string, number>} prices - The current prices of each ticker in the portfolio.
 * @returns {number} - The current value of the portfolio.
 */
function portfolioValue(portfolio, prices) {
  let totalValue = 0;
  for (const pos of portfolio) {
    totalValue += positionValue(pos, prices[pos.ticker]);
  }
  return roundToFixedDecimals(totalValue, 2);
}

/**
 * Rounds a number to given decimal positions.
 *
 * @param {number} number - The number to round
 * @param {number} decimals - The number of digit after the float point
 * @returns {number} - The number round to the given decimals.
 *
 * @example
 * roundToFixedDecimals(134.3463, 3); // 134.346
 * roundToFixedDecimals(8.247, 2);    // 8.25
 * roundToFixedDecimals(75, 2);       // 75
 */
function roundToFixedDecimals(number, decimals) {
  return Math.round(number * 10 ** decimals) / 10 ** decimals;
}

const portfolio = [
  { ticker: "AAPL", quantity: 75, averagePrice: 338.98 },
  { ticker: "AMD", quantity: 50, averagePrice: 615.52 },
  { ticker: "MRNA", quantity: 125, averagePrice: 172.94 },
  { ticker: "IOVA", quantity: 1000, averagePrice: 10.19 },
  { ticker: "NEE", quantity: 150, averagePrice: 79.63 },
];

const posIdx = portfolio.findIndex((pos) => pos.ticker === "AMD");
const portfolioAfter = [
  ...portfolio.slice(0, posIdx),
  buy(portfolio[posIdx], 25, 550.42),
  ...portfolio.slice(posIdx + 1),
];

// Log to console
console.log(portfolio.find((ele) => ele.ticker === "AMD"));
console.log(portfolioAfter.find((ele) => ele.ticker === "AMD"));
console.log(
  portfolioValue(portfolioAfter, {
    AAPL: 350.25,
    AMD: 570.83,
    MRNA: 235.18,
    IOVA: 15.09,
    NEE: 77.47,
  }),
);
