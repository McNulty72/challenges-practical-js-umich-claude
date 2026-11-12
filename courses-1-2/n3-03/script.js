const bodyEle = document.querySelector("body");

const initialTransactions = [
  {
    date: "2026-10-30",
    description: "Salary Payment",
    amount: "2337.43",
    "transaction-type": "salary",
  },
  {
    date: "2026-11-03",
    description: "Cash withdrawal",
    amount: "-350.00",
    "transaction-type": "debit",
  },
  {
    date: "2026-11-06",
    description: "Direct debit - Endesa",
    amount: "-91.70",
    "transaction-type": "debit",
  },
];

function roundToFixedDecimals(number, decimals) {
  return Math.round(number * 10 ** decimals) / 10 ** decimals;
}

function adjustAmountSign(amount, transactionType) {
  return transactionType !== "debit" ? amount : -amount;
}

function createColumnsIndex() {
  const columnsHeads = [...document.querySelectorAll("thead th")];
  columnsHeads.forEach((head) => {
    const headText = head.textContent.trim().toLocaleLowerCase();
    columnsIndex[headText] = columnsHeads.findIndex(
      (head) => head.textContent.trim().toLocaleLowerCase() === headText,
    );
  });
}

function setDefaultDateToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  inputDate.value = `${year}-${month}-${day}`;
}

function createChild(ele, classes = [], attrs = {}, text = "") {
  const domEle = document.createElement(ele);
  if (typeof classes === "string" && classes.trim().length !== 0) {
    classes = [classes];
  }
  if (Array.isArray(classes) && classes.length !== 0) {
    domEle.classList.add(...classes);
  }
  if (attrs && Object.keys(attrs).length !== 0) {
    Object.keys(attrs).forEach((key) => {
      domEle.setAttribute(key, attrs[key]);
    });
  }
  if (text.trim()) domEle.textContent = text;
  return domEle;
}

// Save original table rows order
const originalRowsOrder = new Array();
function addTransaction(transactionData) {
  const trEle = document.createElement("tr");
  let trEleChild = null;
  Object.keys(transactionData).forEach((key) => {
    if (key === "transaction-type") return;
    let cellText = transactionData[key];
    if (key === "date") {
      trEleChild = createChild("th", undefined, { scope: "row" });
    } else if (key === "description") {
      trEleChild = createChild("td");
    } else if (key === "amount") {
      trEleChild = createChild("td", undefined, {
        "data-amount": transactionData[key],
      });
      cellText = Number(cellText).toFixed(2);
    }
    trEleChild.textContent = cellText;
    trEle.append(trEleChild);
  });

  // Add buttons
  const highlightedBtn = createChild(
    "button",
    "highlight-btn",
    { "data-action": "highlight" },
    "Highlight",
  );
  const deletedBtn = createChild(
    "button",
    "delete-btn",
    { "data-action": "delete" },
    "Delete",
  );
  trEleChild = createChild("td");
  trEleChild.append(...[highlightedBtn, deletedBtn]);
  trEle.append(trEleChild);

  // Add transaction type getAttribute
  const dataType = transactionData["transaction-type"];
  trEle.setAttribute("data-type", dataType);
  tableBody.append(trEle);

  // Add row to originalRowsOrder
  originalRowsOrder.push(trEle);

  // Update account balance
  updateAccountTotalBalance();
  if (dataType === "salary") setOverdraftLimit();
  setAvailableBalance();
}

const overdraftPercentage = 0.25;
let overdraftLimit = 0;
function setOverdraftLimit() {
  let averageSalary = 0;
  const salaryRows = tableBody.querySelectorAll('tr[data-type="salary"]');
  const rows = Array.from(salaryRows);
  averageSalary =
    rows.reduce(
      (total, row) =>
        total + Number(row.cells[columnsIndex["amount"]].textContent),
      0,
    ) / rows.length;
  overdraftLimit = averageSalary
    ? roundToFixedDecimals(averageSalary * overdraftPercentage, 2)
    : 0;
}

let availableBalance = 0;
function setAvailableBalance() {
  availableBalance = accountBalance + overdraftLimit;
}

function onSubmit(event) {
  event.preventDefault();
  if (!validateAmount()) {
    inputAmount.focus();
    return;
  }
  const transactionType = document.querySelector(
    'input[name="transaction-type"]:checked',
  ).value;
  const formData = new Object();
  formData["date"] = inputDate.value;
  formData["description"] = inputDescription.value;
  formData["amount"] = adjustAmountSign(
    Number(inputAmount.value),
    transactionType,
  );
  formData["transaction-type"] = transactionType;
  addTransaction(formData);
  // Clear input fields and set input date to today
  inputDescription.value = "";
  inputAmount.value = "";
  setDefaultDateToday();
}

function sortByColumn(data, column, order) {
  return data.sort((a, b) => {
    let valA = null;
    let valB = null;
    if (column === 0) {
      valA = Date.parse(a.cells[column].textContent.trim());
      valB = Date.parse(b.cells[column].textContent.trim());
    } else {
      valA = Number(a.cells[column].textContent.trim());
      valB = Number(b.cells[column].textContent.trim());
    }
    if (valA < valB) {
      return order === "ascending" ? -1 : 1;
    } else if (valA > valB) {
      return order === "ascending" ? 1 : -1;
    }
    return 0;
  });
}

const orderingStates = ["unordered", "descending", "ascending"];
function handleRowsOrdering(event) {
  const targetColumn = event.target.textContent.trim().toLocaleLowerCase();
  const orderingColumnIdx = orderingColumnsIndexes[targetColumn];
  if (orderingColumnIdx === undefined) return;
  const currentOrdering = event.target.getAttribute("data-order");
  const newOrder =
    orderingStates[
      (orderingStates.indexOf(currentOrdering) + 1) % orderingStates.length
    ];
  if (newOrder === "unordered") {
    tableBody.append(...originalRowsOrder);
  } else {
    const tableData = tableBody.children;
    const rows = Array.from(tableData);
    const sortedRows = sortByColumn(rows, orderingColumnIdx, newOrder);
    tableBody.append(...sortedRows);
  }
  event.target.setAttribute("data-order", newOrder);
}

let accountBalance = 0;
function updateAccountTotalBalance() {
  accountBalance = 0;
  const rows = tableBody.rows;
  const amountCellsIndex = columnsIndex["amount"];
  Array.from(rows).forEach((row) => {
    accountBalance += Number(row.cells[amountCellsIndex].textContent);
  });
  accountBalance = roundToFixedDecimals(accountBalance, 2);
  const balanceTd = document.querySelector(".total-balance");
  balanceTd.textContent = accountBalance.toFixed(2);
  balanceTd.setAttribute("data-amount", accountBalance);
}

function highlightRow(row) {
  row.classList.toggle("is-highlighted");
}

function deleteRow(row) {
  const rowIdx = originalRowsOrder.indexOf(row);
  if (rowIdx !== -1) {
    originalRowsOrder.splice(rowIdx, 1);
  }
  row.remove();
  updateAccountTotalBalance();
  if (row.dataset.type === "salary") setOverdraftLimit();
  setAvailableBalance();
}

const btnsActions = {
  highlight: highlightRow,
  delete: deleteRow,
};
function handleActions(event) {
  const action = btnsActions[event.target.dataset.action];
  if (!action) return;
  const targetRow = event.target.closest("tr");
  action(targetRow);
}

function validateAmount() {
  const submitBtn = document.querySelector(".submit-btn");
  const msgContainer = document.querySelector(".insufficient-funds");
  const transactionType = document.querySelector(
    'input[name="transaction-type"]:checked',
  ).value;

  // Allow always to add Salary and Credit transactions
  let isValid = false;
  if (transactionType !== "debit") {
    isValid = true;
  } else {
    isValid =
      adjustAmountSign(Number(inputAmount.value), transactionType) +
        availableBalance >=
      0;
  }

  // Disabled submit button whether if not isValid
  submitBtn.disabled = !isValid;

  // Show insufficient available balance message
  msgContainer.hidden = isValid;

  return isValid;
}

function setAmountInputAvailability(event) {
  inputAmount.disabled = false;
  //   !(
  //   document.querySelector('input[name="transaction-type"]:checked') !== null
  // );
  validateAmount();
}

const transactionsTable = createChild("table");
const tableCaption = createChild("caption");
const tableHeader = createChild("thead");
const tableHeaderRow = createChild("tr");
const tableBody = createChild("tbody");
const tableFoot = createChild("tfoot");
const tableFootRow = createChild("tr");

// Create table elements
tableCaption.textContent = "Bank Account Transactions";
const tableHeadColumns = ["Date", "Description", "Amount", "Actions"];
const orderingColumns = new Set(["Date", "Amount"]);
for (const item of tableHeadColumns) {
  const thAttrs = { scope: "row" };
  if (orderingColumns.has(item)) thAttrs["data-order"] = "unordered";
  const thEle = createChild("th", undefined, thAttrs);
  thEle.textContent = item;
  tableHeaderRow.append(thEle);
}
tableHeader.append(tableHeaderRow);
const footRowTh = createChild("th", undefined, { scope: "row", colspan: "2" });
footRowTh.textContent = "Account Balance";
tableFootRow.append(footRowTh);
const footRowTd = createChild("td", "total-balance");
tableFootRow.append(footRowTd);
tableFoot.append(tableFootRow);

// Append table elements
transactionsTable.append(tableCaption);
transactionsTable.append(tableHeader);
transactionsTable.append(tableBody);
transactionsTable.append(tableFoot);

// Add table
bodyEle.append(transactionsTable);

// Create a columns headers index for indexing and ordering purposes
const columnsIndex = {};
createColumnsIndex();

const orderingColumnsIndexes = {
  date: columnsIndex["date"],
  amount: columnsIndex["amount"],
};

// Add initial transactions
for (const transaction of initialTransactions) {
  addTransaction(transaction);
}

// Manage new trasanctions
const newTransactionForm = document.querySelector("form");
const inputDate = document.querySelector("#date");
const inputDescription = document.querySelector("#description");
const inputAmount = document.querySelector("#amount");
const transactionTypeContainer = document.querySelector("#transaction-type");
transactionTypeContainer.addEventListener("change", setAmountInputAvailability);
newTransactionForm.addEventListener("submit", onSubmit);

// Set form default date to today on page load
setDefaultDateToday();

// Add listeners to the table to handle ordering and rows actions.
tableBody.addEventListener("click", handleActions);
tableHeader.addEventListener("click", handleRowsOrdering);

// Add listener to validate transaction amount
inputAmount.addEventListener("input", validateAmount);
