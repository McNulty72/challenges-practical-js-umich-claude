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
      . riskCreditClassification: the possible credit risk categories and their score thresholds.
      . invalidScoreOutput: the string returned for invalid scores.
      . testCases: the scores to test.
      . defaultOptions: the values to test for hasDefault (false and true).
*/

const scoreRange = [0, 1000];
const invalidScoreOutput = "Invalid score!";
const riskCreditClassification = {
  Acceptable: {
    scoreThreshold: 500,
    classification: "Acceptable",
  },
  Excellent: {
    scoreThreshold: 800,
    classification: "Excellent",
  },
  HighRisk: {
    scoreThreshold: 0,
    classification: "High Risk",
  },
  Good: {
    scoreThreshold: 650,
    classification: "Good",
  },
};

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
  let bestCategory = "HighRisk";
  let highThreshold = riskCreditClassification[bestCategory].scoreThreshold;
  for (const category in riskCreditClassification) {
    if (
      score >= riskCreditClassification[category].scoreThreshold &&
      riskCreditClassification[category].scoreThreshold > highThreshold
    ) {
      bestCategory = category;
      highThreshold = riskCreditClassification[category].scoreThreshold;
    }
  }

  // Checks whether has defaults and switch category if applied
  if (!hasDefault) {
    return riskCreditClassification[bestCategory].classification;
  } else if (
    riskCreditClassification[bestCategory].classification ===
    riskCreditClassification.Excellent.classification
  ) {
    return riskCreditClassification.Acceptable.classification;
  } else {
    return riskCreditClassification.HighRisk.classification;
  }
}

// Test cases
const testCases = [-1, 0, 499, 500, 649, 650, 799, 800, 1000, 1001, "700", NaN];
const defaultOptions = [false, true];

for (const score of testCases) {
  for (const defaultOption of defaultOptions) {
    const riskCategory = riskCreditClassifier(score, defaultOption);
    console.log(`Score: ${score}`);
    console.log(`Has defaults: ${defaultOption}`);
    console.log(`Risk credit classification: ${riskCategory}`);
  }
  console.log("----------------------------------");
}
