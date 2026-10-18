/*
  The script returns the credit risk category for a given credit score and
  a boolean that indicates whether there are defaults.

  The possible outputs are:
    - Excellent
    - Good
    - Acceptable
    - High Risk
  If there are defaults, the output switches to High Risk, unless it was
  Excellent, in which case it switches to Acceptable.

  Constants and variables:
    - Constants:
      . scoreRange: minimum and maximum valid scores.
      . scoreThresholds: minimum score for each category above High Risk.
      . riskCreditCategories: the possible credit risk categories.
      . invalidScoreOutput: the string returned for invalid scores.
      . testCases: the scores to test.
      . defaultOptions: the values to test for hasDefault (false and true).
*/

const scoreRange = [0, 1000];
const scoreThresholds = [500, 650, 800];
const riskCreditCategories = ["High Risk", "Acceptable", "Good", "Excellent"];
const invalidScoreOutput = "Invalid score!";

function validateScore(score) {
  // Checks whether score is a number.
  if (typeof score !== "number" || Number.isNaN(score)) {
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

  // Checks whether has defaults and switch category if applied
  if (!hasDefault) {
    return riskCreditCategory;
  } else if (riskCreditCategory === riskCreditCategories[3]) {
    return riskCreditCategories[1];
  } else {
    return riskCreditCategories[0];
  }
}

// Test cases
const testCases = [-1, 0, 499, 500, 649, 650, 799, 800, 1000, 1001, "700", NaN];
const defaultOptions = [false, true];

for (const score of testCases) {
  for (const defaultOption of defaultOptions) {
    const riskCreditClassification = riskCreditClassifier(score, defaultOption);
    console.log(`Score: ${score}`);
    console.log(`Has defaults: ${defaultOption}`);
    console.log(`Risk credit classification: ${riskCreditClassification}`);
  }
  console.log("----------------------------------");
}
