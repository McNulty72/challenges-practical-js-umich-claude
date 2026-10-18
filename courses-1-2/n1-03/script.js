/*
  The script computes the total months needed to achieve a savings goal with
  a 300 monthly deposit and 0.25% monthly interest rate over the current savings
  amount at the end of the month.

  The script logs to the console the number of months needed to achieve our
  target and the final amount. Also log the total amount for each of the first
  twelve months.

  Use a while loop to compute the months needed as the total months is unknown
  and a for loop to log each end month savings amount since the total months to
  log is certain.

  Constants and variables:
  - Constants:
      . monthlyInterestRate: monthly interest percentage rate.
      . monthlyDeposit: amount deposit at the end of each month.
      . savingsTarget: the total savings amount goal.
      . monthEndSavings: the total saving amount at the end of each month.
      . numberOfMonthsToLog: the number of month for which log the amount save.
  - Variables:
      . savings: the current savings amount.
      . currentMonth: number of months passed.
*/

const monthlyInterestRate = 0.0025;
const monthlyDeposit = 300;
const savingsTarget = 10000;
const monthEndSavings = [];
const numberOfMonthsToLog = 12;

let savings = 0;
let currentMonth = 0;
while (savings < savingsTarget) {
  if (monthlyDeposit <= 0) break;
  savings *= 1 + monthlyInterestRate;
  savings += monthlyDeposit;
  savings = Math.round(savings * 100) / 100;
  monthEndSavings.push(savings);
  currentMonth += 1;
}

const summary =
  `With a monthly deposit of ${monthlyDeposit.toFixed(2)}€ and monthly ` +
  `interest rate of ${monthlyInterestRate * 100}%, we would need ` +
  `${currentMonth} months to achieve our goal of getting at least ` +
  `${savingsTarget.toFixed(2)}€ in savings. Total amount: ${savings.toFixed(2)} €`;
console.log(summary);

console.log("Savings amount at the end of each of the first twelve months:");
for (let idx = 0; idx < monthEndSavings.length; idx++) {
  if (idx === numberOfMonthsToLog) break;
  const monthSummary =
    `total savings amount at the end of Month ${idx + 1}: ` +
    `${monthEndSavings[idx].toFixed(2)} €`;
  console.log(monthSummary);
}
