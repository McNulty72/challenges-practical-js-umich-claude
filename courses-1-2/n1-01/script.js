/*
  This script computes the total amount of an invoice, showing:
    - Net amount
    - Discount applied
    - Net amount after discount
    - IVA (VAT) amount
    - Total invoice amount

  It declares the following constants and variables:
  - Constants:
    . ivaPct: IVA percentage to apply
    . quantity: product quantity
    . pricePerUnit: price per product unit
    . discountThresholds: quantity thresholds that determine the discount percentage
    . discountPcts: discount percentages, one per quantity tier
    . netInvoice: invoice amount before discount and IVA
    . discountAmount: discount amount applied
    . netAfterDiscount: invoice amount after applying the discount
    . ivaAmount: IVA amount
    . invoiceTotal: total amount to pay
  - Variables:
    . discountPct: discount percentage applied
*/

// Variables declarations

const ivaPct = 0.21;
const quantity = 50;
const pricePerUnit = 8.25;
const discountThresholds = [50, 100];
const discountPcts = [0, 0.07, 0.12];

const netInvoice = Math.round((quantity * pricePerUnit) * 100) / 100;

// Set discout percentage
let discountPct;
if (quantity < discountThresholds[0]) {
  discountPct = discountPcts[0];
} else if (quantity < discountThresholds[1]) {
  discountPct = discountPcts[1];
} else {
  discountPct = discountPcts[2];
}

// Calculate and apply discount amount
const discountAmount = Math.round((netInvoice * discountPct) * 100) / 100;
const netAfterDiscount  = netInvoice - discountAmount;

// Compute IVA amount
const ivaAmount = Math.round((netAfterDiscount * ivaPct) * 100) / 100;

// Compute total invoice amount
const invoiceTotal = netAfterDiscount + ivaAmount;

// Generate invoice ID
const middleID = String(Math.floor(Math.random() * 100000)).padStart(5, '0');
const suffixID = String.fromCharCode(Math.floor(Math.random() * 26 + 65)) + String.fromCharCode(Math.floor(Math.random() * 26 + 65));
const invoiceID = `INV-${middleID}-${suffixID}`;

// Log results to the console.
console.log("Invoice details");
console.log("----------------------------------------");
console.log(`Invoice ID: ${invoiceID}`);
console.log(`Quantity: ${quantity}`);
console.log(`Price per unit: ${pricePerUnit.toFixed(2)}€`);
console.log(`Net invoice amount: ${netInvoice.toFixed(2)}€`);
console.log(`Discount percentage: ${(discountPct * 100).toFixed(2)}%`);
console.log(`Discount amount: ${discountAmount.toFixed(2)}€`);
console.log(`Invoice - discount: ${netAfterDiscount.toFixed(2)}€`);
console.log(`IVA percentage applied: ${(ivaPct * 100).toFixed(2)}%`);
console.log(`IVA amount: ${ivaAmount.toFixed(2)}€`);
console.log(`Total invoice amount: ${invoiceTotal.toFixed(2)}€`);
console.log("----------------------------------------");
