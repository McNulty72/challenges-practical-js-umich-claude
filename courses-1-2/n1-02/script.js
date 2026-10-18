/*
  The script returns the credit risk category given the credit score and a
  boolean that indicate whether there are defaults

  The possible outputs are:
    - Excellent
    - Good
    - Acceptable
    - High Risk
  If there are defaults the output switch to High Risk unless it was Excellent
  that switch to Acceptable.

  Constants and variables:
    - Constants:
      . scoreRange: an array with score ranges.
      . scoreThresholds: an array that constains risk credit categories
                         scoreThresholds.
      . riskCreditCategories: an array of different risk credit categories.
      . invalidScoreOutput: a string to retur for invalids scores
      . testCases: an array with each test case.
      . hasDefauls: an array contains false and true.
*/

const scoreRange = [0, 1000];
const scoreThresholds = [500, 650, 800];
const riskCreditCategories = ["High Risk", "Acceptable", "Good", "Excellent"];
const invalidScoreOutput = "Invalid score!";

function validateScore(score) {
  // Checks whether score is a number.
  if (typeof score !== "number") {
    return false;
  }
  // Checks score ranges
  if (score < scoreRange[0] || score > scoreRange[1]) {
    return false;
  }
  return true;
}

function riskCreditClassifier(score, hasDefault) {
  // Checks whether the score is a valid score
  const isValidScore = validateScore(score);
  if (!isValidScore) {
    return invalidScoreOutput;
  }

  // Assign risk credit category
  let riskCreditCategory;
  if (score < scoreThresholds[0]) {
    riskCreditCategory = riskCreditCategories[0];
  } else if (score < scoreThresholds[1]) {
    riskCreditCategory = riskCreditCategories[1];
  } else if (score < scoreThresholds[2]) {
    riskCreditCategory = riskCreditCategories[2];
  } else {
    riskCreditCategory = riskCreditCategories[3];
  }

  // Checks whethe has defauls and switch category if applied
  if (!hasDefault) {
    return riskCreditCategory;
  } else if (riskCreditCategory === riskCreditCategories[3]) {
    return riskCreditCategories[1];
  } else {
    return riskCreditCategories[0];
  }
}

// Test cases
const testCases = [-1, 0, 499, 500, 649, 650, 799, 800, 1000, 1001, "700"];
const hasDefaults = [false, true];

for (const score of testCases) {
  for (const hasDefault of hasDefaults) {
    const riskCreditClassification = riskCreditClassifier(score, hasDefault);
    console.log(`Score: ${score}`);
    console.log(`Has defaults: ${hasDefault}`);
    console.log(`Risk credit classification: ${riskCreditClassification}`);
  }
  console.log("----------------------------------");
}
