/*
  Join Explorer

  This mini-app is designed to be embedded inside a blog post.

  To add another example later:
  1. Copy one full scenario inside the scenarios object.
  2. Give it a new key.
  3. Add an option for it in index.html.
  4. Make sure the left table and right table share a common key field.
*/

const scenarios = {
  shipments: {
    leftTitle: "tblShipProduct",
    rightTitle: "tblReceiveCash",
    key: "Shipping#",
    unmatchedLabel: "shipments with no cash receipt",
    leftRows: [
      {
        "Shipping#": "1001",
        "Shipping Date": "2026-04-01",
        "Customer#": "201",
        "Sales Order#": "5001",
        "Shipment Amount": "1,250"
      },
      {
        "Shipping#": "1002",
        "Shipping Date": "2026-04-03",
        "Customer#": "202",
        "Sales Order#": "5002",
        "Shipment Amount": "2,400"
      },
      {
        "Shipping#": "1003",
        "Shipping Date": "2026-04-05",
        "Customer#": "203",
        "Sales Order#": "5003",
        "Shipment Amount": "875"
      },
      {
        "Shipping#": "1004",
        "Shipping Date": "2026-04-07",
        "Customer#": "204",
        "Sales Order#": "5004",
        "Shipment Amount": "3,100"
      },
      {
        "Shipping#": "1005",
        "Shipping Date": "2026-04-08",
        "Customer#": "205",
        "Sales Order#": "5005",
        "Shipment Amount": "1,760"
      },
      {
        "Shipping#": "1006",
        "Shipping Date": "2026-04-10",
        "Customer#": "206",
        "Sales Order#": "5006",
        "Shipment Amount": "950"
      },
      {
        "Shipping#": "1007",
        "Shipping Date": "2026-04-12",
        "Customer#": "207",
        "Sales Order#": "5007",
        "Shipment Amount": "4,200"
      }
    ],
    rightRows: [
      {
        "Receipt#": "9001",
        "Receipt Date": "2026-04-06",
        "Shipping#": "1001",
        "Receipt Amount": "1,250"
      },
      {
        "Receipt#": "9002",
        "Receipt Date": "2026-04-09",
        "Shipping#": "1002",
        "Receipt Amount": "1,400"
      },
      {
        "Receipt#": "9003",
        "Receipt Date": "2026-04-11",
        "Shipping#": "1002",
        "Receipt Amount": "1,000"
      },
      {
        "Receipt#": "9004",
        "Receipt Date": "2026-04-13",
        "Shipping#": "1004",
        "Receipt Amount": "3,100"
      },
      {
        "Receipt#": "9005",
        "Receipt Date": "2026-04-15",
        "Shipping#": "1005",
        "Receipt Amount": "1,760"
      },
      {
        "Receipt#": "9006",
        "Receipt Date": "2026-04-16",
        "Shipping#": "1007",
        "Receipt Amount": "2,000"
      },
      {
        "Receipt#": "9007",
        "Receipt Date": "2026-04-18",
        "Shipping#": "1007",
        "Receipt Amount": "2,200"
      }
    ],
    resultColumns: [
      "Shipping#",
      "Shipping Date",
      "Customer#",
      "Shipment Amount",
      "Receipt#",
      "Receipt Amount"
    ],
    explanations: {
      inner:
        "The inner join keeps only shipments that have at least one matching cash receipt.",
      left:
        "The left outer join keeps every shipment. If a shipment has no matching receipt, the receipt fields are blank.",
      unmatched:
        "This result uses a left outer join and then keeps only the shipments where the receipt is missing."
    }
  },

  employees: {
    leftTitle: "tblEmployee",
    rightTitle: "tblSale",
    key: "Employee#",
    unmatchedLabel: "employees with no sales",
    leftRows: [
      {
        "Employee#": "301",
        "Employee Name": "Anderson",
        "Department": "Sales",
        "Hire Date": "2025-08-15"
      },
      {
        "Employee#": "302",
        "Employee Name": "Bennett",
        "Department": "Sales",
        "Hire Date": "2024-11-02"
      },
      {
        "Employee#": "303",
        "Employee Name": "Chen",
        "Department": "Sales",
        "Hire Date": "2026-01-10"
      },
      {
        "Employee#": "304",
        "Employee Name": "Diaz",
        "Department": "Sales",
        "Hire Date": "2023-06-21"
      },
      {
        "Employee#": "305",
        "Employee Name": "Evans",
        "Department": "Sales",
        "Hire Date": "2025-02-19"
      },
      {
        "Employee#": "306",
        "Employee Name": "Foster",
        "Department": "Sales",
        "Hire Date": "2024-03-07"
      },
      {
        "Employee#": "307",
        "Employee Name": "Garcia",
        "Department": "Sales",
        "Hire Date": "2026-04-01"
      }
    ],
    rightRows: [
      {
        "Sale#": "7001",
        "Sale Date": "2026-04-02",
        "Employee#": "301",
        "Sale Amount": "3,200"
      },
      {
        "Sale#": "7002",
        "Sale Date": "2026-04-03",
        "Employee#": "302",
        "Sale Amount": "1,850"
      },
      {
        "Sale#": "7003",
        "Sale Date": "2026-04-05",
        "Employee#": "302",
        "Sale Amount": "2,400"
      },
      {
        "Sale#": "7004",
        "Sale Date": "2026-04-07",
        "Employee#": "304",
        "Sale Amount": "5,100"
      },
      {
        "Sale#": "7005",
        "Sale Date": "2026-04-10",
        "Employee#": "305",
        "Sale Amount": "2,750"
      },
      {
        "Sale#": "7006",
        "Sale Date": "2026-04-11",
        "Employee#": "306",
        "Sale Amount": "1,400"
      },
      {
        "Sale#": "7007",
        "Sale Date": "2026-04-12",
        "Employee#": "306",
        "Sale Amount": "3,900"
      }
    ],
    resultColumns: [
      "Employee#",
      "Employee Name",
      "Department",
      "Sale#",
      "Sale Amount"
    ],
    explanations: {
      inner:
        "The inner join keeps only employees who have at least one matching sale.",
      left:
        "The left outer join keeps every employee. If an employee has no matching sale, the sale fields are blank.",
      unmatched:
        "This result uses a left outer join and then keeps only the employees with no matching sales."
    }
  },

  orders: {
    leftTitle: "tblPurchaseOrder",
    rightTitle: "tblReceiveInventory",
    key: "Purchase Order#",
    unmatchedLabel: "product orders not yet received",
    leftRows: [
      {
        "Purchase Order#": "8001",
        "Order Date": "2026-04-01",
        "Vendor#": "401",
        "Product#": "P-100",
        "Order Amount": "2,500"
      },
      {
        "Purchase Order#": "8002",
        "Order Date": "2026-04-02",
        "Vendor#": "402",
        "Product#": "P-210",
        "Order Amount": "4,800"
      },
      {
        "Purchase Order#": "8003",
        "Order Date": "2026-04-04",
        "Vendor#": "403",
        "Product#": "P-315",
        "Order Amount": "1,200"
      },
      {
        "Purchase Order#": "8004",
        "Order Date": "2026-04-06",
        "Vendor#": "404",
        "Product#": "P-410",
        "Order Amount": "6,300"
      },
      {
        "Purchase Order#": "8005",
        "Order Date": "2026-04-08",
        "Vendor#": "405",
        "Product#": "P-520",
        "Order Amount": "900"
      },
      {
        "Purchase Order#": "8006",
        "Order Date": "2026-04-09",
        "Vendor#": "406",
        "Product#": "P-615",
        "Order Amount": "3,750"
      },
      {
        "Purchase Order#": "8007",
        "Order Date": "2026-04-12",
        "Vendor#": "407",
        "Product#": "P-720",
        "Order Amount": "5,200"
      }
    ],
    rightRows: [
      {
        "Receiving Report#": "9501",
        "Received Date": "2026-04-05",
        "Purchase Order#": "8001",
        "Received Amount": "2,500"
      },
      {
        "Receiving Report#": "9502",
        "Received Date": "2026-04-06",
        "Purchase Order#": "8002",
        "Received Amount": "2,800"
      },
      {
        "Receiving Report#": "9503",
        "Received Date": "2026-04-09",
        "Purchase Order#": "8002",
        "Received Amount": "2,000"
      },
      {
        "Receiving Report#": "9504",
        "Received Date": "2026-04-10",
        "Purchase Order#": "8004",
        "Received Amount": "6,300"
      },
      {
        "Receiving Report#": "9505",
        "Received Date": "2026-04-12",
        "Purchase Order#": "8005",
        "Received Amount": "900"
      },
      {
        "Receiving Report#": "9506",
        "Received Date": "2026-04-14",
        "Purchase Order#": "8007",
        "Received Amount": "3,000"
      },
      {
        "Receiving Report#": "9507",
        "Received Date": "2026-04-16",
        "Purchase Order#": "8007",
        "Received Amount": "2,200"
      }
    ],
    resultColumns: [
      "Purchase Order#",
      "Order Date",
      "Vendor#",
      "Product#",
      "Order Amount",
      "Receiving Report#",
      "Received Amount"
    ],
    explanations: {
      inner:
        "The inner join keeps only purchase orders that have at least one matching receiving report.",
      left:
        "The left outer join keeps every purchase order. If an order has not been received, the receiving fields are blank.",
      unmatched:
        "This result uses a left outer join and then keeps only product orders with no matching receiving report."
    }
  }
};

const scenarioSelect = document.getElementById("scenarioSelect");
const joinSelect = document.getElementById("joinSelect");
const runJoinBtn = document.getElementById("runJoinBtn");

const leftTableTitle = document.getElementById("leftTableTitle");
const rightTableTitle = document.getElementById("rightTableTitle");
const leftTableContainer = document.getElementById("leftTableContainer");
const rightTableContainer = document.getElementById("rightTableContainer");
const resultTableContainer = document.getElementById("resultTableContainer");
const joinExplanation = document.getElementById("joinExplanation");

scenarioSelect.addEventListener("change", updateActivity);
joinSelect.addEventListener("change", updateActivity);
runJoinBtn.addEventListener("click", updateActivity);

function updateActivity() {
  const scenario = scenarios[scenarioSelect.value];
  const joinType = joinSelect.value;

  leftTableTitle.textContent = scenario.leftTitle;
  rightTableTitle.textContent = scenario.rightTitle;

  renderTable(leftTableContainer, scenario.leftRows);
  renderTable(rightTableContainer, scenario.rightRows);

  const resultRows = getJoinResult(scenario, joinType);

  renderTable(resultTableContainer, resultRows, scenario.resultColumns);

  const rowWord = resultRows.length === 1 ? "row" : "rows";
  joinExplanation.textContent = `${scenario.explanations[joinType]} The result has ${resultRows.length} ${rowWord}.`;
}

function getJoinResult(scenario, joinType) {
  const joinedRows = [];

  scenario.leftRows.forEach(leftRow => {
    const matches = scenario.rightRows.filter(rightRow => {
      return rightRow[scenario.key] === leftRow[scenario.key];
    });

    if (joinType === "inner") {
      matches.forEach(match => {
        joinedRows.push(combineRows(leftRow, match));
      });
    }

    if (joinType === "left") {
      if (matches.length > 0) {
        matches.forEach(match => {
          joinedRows.push(combineRows(leftRow, match));
        });
      } else {
        joinedRows.push(combineRows(leftRow, null));
      }
    }

    if (joinType === "unmatched") {
      if (matches.length === 0) {
        joinedRows.push(combineRows(leftRow, null));
      }
    }
  });

  return joinedRows;
}

function combineRows(leftRow, rightRow) {
  const combined = {};

  Object.keys(leftRow).forEach(column => {
    combined[column] = leftRow[column];
  });

  if (rightRow) {
    Object.keys(rightRow).forEach(column => {
      combined[column] = rightRow[column];
    });
  }

  return combined;
}

function renderTable(container, rows, preferredColumns) {
  container.innerHTML = "";

  if (!rows || rows.length === 0) {
    container.innerHTML = "<p class='empty-message'>No rows returned.</p>";
    return;
  }

  const columns = preferredColumns || Object.keys(rows[0]);

  const table = document.createElement("table");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  columns.forEach(column => {
    const th = document.createElement("th");
    th.textContent = column;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  rows.forEach(row => {
    const tr = document.createElement("tr");

    columns.forEach(column => {
      const td = document.createElement("td");

      if (row[column] === undefined || row[column] === null || row[column] === "") {
        td.textContent = "NULL";
        td.classList.add("null-cell");
      } else {
        td.textContent = row[column];
      }

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

updateActivity();