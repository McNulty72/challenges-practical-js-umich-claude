const bodyEle = document.querySelector("body");

const initialTransactions = [
  { date: "2026-10-30", description: "Salary Payment", amount: "2337.43" },
  { date: "2026-11-03", description: "Cash withdrawal", amount: "-350.00" },
  {
    date: "2026-11-06",
    description: "Direct debit - Endesa",
    amount: "-91.70",
  },
];

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
function addTrasantion(transactionData) {
  const trEle = document.createElement("tr");
  let trEleChild = null;
  Object.keys(transactionData).forEach((key) => {
    if (key === "date") {
      trEleChild = createChild(
        (ele = "th"),
        undefined,
        (attrs = { scope: "row" }),
      );
    } else if (key === "description") {
      trEleChild = createChild((ele = "td"));
    } else if (key === "amount") {
      trEleChild = createChild(
        (ele = "td"),
        undefined,
        (attrs = { "data-amount": transactionData[key] }),
      );
      updateAccountTotalBalance(Number(transactionData[key]));
    }
    trEleChild.textContent = transactionData[key];
    trEle.append(trEleChild);
  });

  // Add buttons
  const higlightedBtn = createChild(
    (ele = "button"),
    (classes = "higlight-btn"),
    undefined,
    (text = "Highlight"),
  );
  const deletedBtn = createChild(
    (ele = "button"),
    (classes = "delete-btn"),
    undefined,
    (text = "Delete"),
  );
  trEleChild = createChild((ele = "td"));
  trEleChild.append(...[higlightedBtn, deletedBtn]);
  trEle.append(trEleChild);
  tableBody.append(trEle);

  // Add row to originalRowsOrder
  originalRowsOrder.push(trEle);
}

function onSubmit(event) {
  event.preventDefault();
  const formData = new Object();
  formData["date"] = inputDate.value;
  formData["description"] = inputDescription.value;
  formData["amount"] = Number(inputAmount.value);
  addTrasantion(formData);
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

let accountBalance = null;
function updateAccountTotalBalance(amount) {
  console.log(amount, typeof amount);
  const balanceTd = document.querySelector(".total-balance");
  accountBalance += amount;
  balanceTd.textContent = accountBalance.toFixed(2);
}

function highlightRow(row) {
  row.classList.toggle("is-highlighted");
}

function deleteRow(row) {
  row.remove();
  updateAccountTotalBalance(
    -Number(row.cells[columnsIndex["amount"]].textContent),
  );
}

const btnsActions = {
  highlight: highlightRow,
  delete: deleteRow,
};
function handleActions(event) {
  const action = btnsActions[event.target.textContent.trim().toLowerCase()];
  if (!action) return;
  const targetRow = event.target.parentElement.parentElement;
  action(targetRow);
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

// Add initial transactions
for (const transaction of initialTransactions) {
  addTrasantion(transaction);
}

// Create a columns headers index for indexing and ordering purposes
const columnsIndex = {};
createColumnsIndex();

const orderingColumnsIndexes = {
  date: columnsIndex["date"],
  amount: columnsIndex["amount"],
};
// Manage new trasanctions
const newTransactionForm = document.querySelector("form");
const inputDate = document.querySelector("#date");
const inputDescription = document.querySelector("#description");
const inputAmount = document.querySelector("#amount");
newTransactionForm.addEventListener("submit", onSubmit);

// Set form default date to today on page load
document.addEventListener("DOMContentLoaded", setDefaultDateToday);

// Add listeners to the table to handle ordering and rows actions.
tableBody.addEventListener("click", handleActions);
tableHeader.addEventListener("click", handleRowsOrdering);
