/*
  The scripts define the following functions:
    - calculateVAT(base, rate)
    - applyDiscount(amount, pct)
    - formatEuros(amount): returns a string like "1234.50 €"
    - average(numbers)
    - isEven(n)

  Then use the functions computes the total amount of an invoice, showing:
    - Net amount
    - Discount applied
    - Net amount after discount
    - IVA (VAT) amount
    - Total invoice amount

  It declares the following constants and variables:
  - Constants:
    . vatPct: VAT percentage to apply
    . quantity: product quantity
    . pricePerUnit: price per product unit
    . discountThresholds: quantity thresholds that determine the discount percentage
    . discountPcts: discount percentages, one per quantity tier
    - discountPct: discount percentage to applied
    . netInvoice: invoice amount before discount and VAT
    . netAfterDiscount: invoice amount after applying the discount
    . vatAmount: VAT amount
    . invoiceTotal: total amount to pay
*/

function roundToFixedDecimals(number, decimals) {
  return Math.round(number * 10 ** decimals) / 10 ** decimals;
}

function calculateVAT(base, rate) {
  return roundToFixedDecimals(base * rate, 2);
}

function applyDiscount(amount, pct) {
  return roundToFixedDecimals(amount * (1 - pct), 2);
}

function formatEuros(amount) {
  return amount.toFixed(2) + " €";
}

function average(numbers) {
  let sum = 0;
  for (const number of numbers) {
    sum += number;
  }
  return roundToFixedDecimals(sum / numbers.length, 2);
}

function isEven(n) {
  return n % 2 === 0;
}

function getDiscountPct(quantity) {
  if (quantity < discountThresholds[0]) {
    return discountPcts[0];
  } else if (quantity < discountThresholds[1]) {
    return discountPcts[1];
  }
  return discountPcts[2];
}

function randomUppercaseLetter() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}

function generateInvoiceID() {
  const middleID = String(Math.floor(Math.random() * 100000)).padStart(5, "0");
  const suffixID = randomUppercaseLetter() + randomUppercaseLetter();
  return `INV-${middleID}-${suffixID}`;
}

// Variables declarations

const vatPct = 0.21;
const quantity = 50;
const pricePerUnit = 8.25;
const discountThresholds = [50, 100];
const discountPcts = [0, 0.07, 0.12];

const netInvoice = roundToFixedDecimals(quantity * pricePerUnit, 2);

// Calculate and apply discount amount
const discountPct = getDiscountPct(quantity);
const netAfterDiscount = applyDiscount(netInvoice, discountPct);

// Compute VAT amount
const vatAmount = calculateVAT(netAfterDiscount, vatPct);

// Compute total invoice amount
const invoiceTotal = netAfterDiscount + vatAmount;

// Generate invoice ID
const invoiceID = generateInvoiceID();

// Functions tests
console.log("Test calculateVAT...");
console.log(
  `calculateVAT(1253, 0.21) === 263.13: ${calculateVAT(1253, 0.21) === 263.13}`,
);
console.log(
  `calculateVAT(1253, 0.08) === 100.24: ${calculateVAT(1253, 0.08) === 100.24}`,
);
console.log("-----------------------------------------------------");
console.log("Test applyDiscount...");
console.log(
  `applyDiscount(495, 0.07) === 460.35: ${applyDiscount(495, 0.07) === 460.35}`,
);
console.log(
  `applyDiscount(932.25, 0.12) === 820.38: ${applyDiscount(932.25, 0.12) === 820.38}`,
);
console.log("-----------------------------------------------------");
console.log("Test formatEuros...");
console.log(
  `formatEuros(1002.5378) === "1002.54 €": ${formatEuros(1002.5378) === "1002.54 €"}`,
);
console.log(
  `formatEuros(124.30) === "124.30 €": ${formatEuros(124.3) === "124.30 €"}`,
);
console.log("-----------------------------------------------------");
console.log("Test average...");
console.log(
  `average([65.57, 72.89, 77.8, 52.35]) === 67.15: ${average([65.57, 72.89, 77.8, 52.35]) === 67.15}`,
);
console.log(
  `average([6.35, -3.15, 8.75]) === 3.98: ${average([6.35, -3.15, 8.75]) === 3.98}`,
);
console.log("-----------------------------------------------------");
console.log("Test isEven...");
console.log(`isEven(126) === true: ${isEven(126) === true}`);
console.log(`isEven(-17) === false: ${isEven(-17) === false}`);

// Log invoice details to the console.
console.log("Invoice details");
console.log("----------------------------------------");
console.log(`Invoice ID: ${invoiceID}`);
console.log(`Quantity: ${quantity}`);
console.log(`Price per unit: ${formatEuros(pricePerUnit)}`);
console.log(`Net invoice amount: ${formatEuros(netInvoice)}`);
console.log(`Discount percentage: ${(discountPct * 100).toFixed(2)}%`);
console.log(`Discount amount: ${formatEuros(netInvoice - netAfterDiscount)}`);
console.log(`Invoice - discount: ${formatEuros(netAfterDiscount)}`);
console.log(`IVA percentage applied: ${(vatPct * 100).toFixed(2)}%`);
console.log(`IVA amount: ${formatEuros(vatAmount)}`);
console.log(`Total invoice amount: ${formatEuros(invoiceTotal)}`);
console.log("----------------------------------------");
