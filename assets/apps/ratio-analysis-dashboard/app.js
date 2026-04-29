/*
  Ratio Analysis Dashboard
  Version 1

  This app is intentionally written in plain JavaScript so it works on GitHub Pages
  without a backend, database, build system, Node, React, or external dependencies.

  To edit or add ratios later:
  1. Find the ratioDefinitions array below.
  2. Copy one ratio object.
  3. Edit the name, category, formula, calculation, interpretation, and studentNote.
*/

const inputIds = [
  "netSales",
  "costOfGoodsSold",
  "grossProfit",
  "operatingIncome",
  "netIncome",
  "interestExpense",
  "cash",
  "accountsReceivable",
  "inventory",
  "currentAssets",
  "totalAssets",
  "currentLiabilities",
  "totalLiabilities",
  "totalEquity",
  "beginningTotalAssets",
  "beginningEquity",
  "beginningInventory",
  "endingInventory",
  "beginningAccountsReceivable",
  "endingAccountsReceivable"
];

const sampleCompanyData = {
  netSales: "1,000,000",
  costOfGoodsSold: "600,000",
  grossProfit: "",
  operatingIncome: "140,000",
  netIncome: "90,000",
  interestExpense: "20,000",
  cash: "80,000",
  accountsReceivable: "120,000",
  inventory: "160,000",
  currentAssets: "420,000",
  totalAssets: "900,000",
  currentLiabilities: "210,000",
  totalLiabilities: "400,000",
  totalEquity: "500,000",
  beginningTotalAssets: "800,000",
  beginningEquity: "460,000",
  beginningInventory: "140,000",
  endingInventory: "160,000",
  beginningAccountsReceivable: "100,000",
  endingAccountsReceivable: "120,000"
};

const ratioDefinitions = [
  {
    category: "Liquidity Ratios",
    name: "Current Ratio",
    formula: "Current assets ÷ Current liabilities",
    format: "ratio",
    calculate: data => safeDivide(data.currentAssets, data.currentLiabilities),
    interpretation:
      "A higher current ratio generally suggests stronger short-term liquidity, but too high a ratio may also suggest inefficient use of assets.",
    studentNote:
      "This ratio helps students evaluate whether current assets are sufficient to cover current liabilities."
  },
  {
    category: "Liquidity Ratios",
    name: "Quick Ratio",
    formula: "(Cash + Accounts receivable) ÷ Current liabilities",
    format: "ratio",
    calculate: data => safeDivide(data.cash + data.accountsReceivable, data.currentLiabilities),
    interpretation:
      "The quick ratio focuses on more liquid current assets by excluding inventory.",
    studentNote:
      "This matters because inventory may take longer to sell or may not be easily converted into cash."
  },
  {
    category: "Profitability Ratios",
    name: "Gross Margin",
    formula: "Gross profit ÷ Net sales",
    format: "percent",
    calculate: data => safeDivide(data.grossProfit, data.netSales),
    interpretation:
      "Gross margin shows how much of each sales dollar remains after covering cost of goods sold.",
    studentNote:
      "This ratio helps students see the relationship between sales prices, product costs, and profitability."
  },
  {
    category: "Profitability Ratios",
    name: "Operating Margin",
    formula: "Operating income ÷ Net sales",
    format: "percent",
    calculate: data => safeDivide(data.operatingIncome, data.netSales),
    interpretation:
      "Operating margin shows how much of each sales dollar remains after operating expenses.",
    studentNote:
      "This ratio focuses on the profitability of normal operations before interest and taxes."
  },
  {
    category: "Profitability Ratios",
    name: "Net Profit Margin",
    formula: "Net income ÷ Net sales",
    format: "percent",
    calculate: data => safeDivide(data.netIncome, data.netSales),
    interpretation:
      "Net profit margin shows how much of each sales dollar becomes bottom-line profit.",
    studentNote:
      "This ratio captures the overall profitability of the company after expenses, interest, taxes, gains, and losses."
  },
  {
    category: "Profitability Ratios",
    name: "Return on Assets",
    formula: "Net income ÷ Average total assets",
    format: "percent",
    calculate: data => safeDivide(data.netIncome, average(data.beginningTotalAssets, data.totalAssets)),
    interpretation:
      "Return on assets measures how effectively the company uses its assets to generate profit.",
    studentNote:
      "This ratio connects the income statement to the balance sheet by comparing earnings to assets used."
  },
  {
    category: "Profitability Ratios",
    name: "Return on Equity",
    formula: "Net income ÷ Average total equity",
    format: "percent",
    calculate: data => safeDivide(data.netIncome, average(data.beginningEquity, data.totalEquity)),
    interpretation:
      "Return on equity measures the return generated for owners based on average equity.",
    studentNote:
      "This ratio is useful for thinking about profitability from the owners' perspective."
  },
  {
    category: "Solvency Ratios",
    name: "Debt-to-Equity Ratio",
    formula: "Total liabilities ÷ Total equity",
    format: "ratio",
    calculate: data => safeDivide(data.totalLiabilities, data.totalEquity),
    interpretation:
      "Debt-to-equity helps evaluate how much the company relies on creditors versus owners.",
    studentNote:
      "A higher ratio usually indicates greater financial leverage and potentially greater financial risk."
  },
  {
    category: "Solvency Ratios",
    name: "Debt Ratio",
    formula: "Total liabilities ÷ Total assets",
    format: "percent",
    calculate: data => safeDivide(data.totalLiabilities, data.totalAssets),
    interpretation:
      "The debt ratio shows the percentage of assets financed by liabilities.",
    studentNote:
      "This ratio helps students understand the company's capital structure and long-term risk."
  },
  {
    category: "Solvency Ratios",
    name: "Times Interest Earned",
    formula: "Operating income ÷ Interest expense",
    format: "times",
    calculate: data => safeDivide(data.operatingIncome, data.interestExpense),
    interpretation:
      "Times interest earned measures the company's ability to cover interest payments from operating income.",
    studentNote:
      "A higher value generally suggests more room to cover interest obligations."
  },
  {
    category: "Efficiency Ratios",
    name: "Inventory Turnover",
    formula: "Cost of goods sold ÷ Average inventory",
    format: "times",
    calculate: data => safeDivide(data.costOfGoodsSold, average(data.beginningInventory, data.endingInventory)),
    interpretation:
      "Inventory turnover shows how many times inventory is sold and replaced during the period.",
    studentNote:
      "This ratio helps students evaluate how efficiently inventory is managed."
  },
  {
    category: "Efficiency Ratios",
    name: "Receivables Turnover",
    formula: "Net sales ÷ Average accounts receivable",
    format: "times",
    calculate: data => safeDivide(data.netSales, average(data.beginningAccountsReceivable, data.endingAccountsReceivable)),
    interpretation:
      "Receivables turnover shows how efficiently the company collects from customers.",
    studentNote:
      "This ratio is useful when thinking about credit sales, collections, and cash flow."
  },
  {
    category: "Efficiency Ratios",
    name: "Asset Turnover",
    formula: "Net sales ÷ Average total assets",
    format: "times",
    calculate: data => safeDivide(data.netSales, average(data.beginningTotalAssets, data.totalAssets)),
    interpretation:
      "Asset turnover measures how efficiently the company uses assets to generate sales.",
    studentNote:
      "This ratio helps students connect operating activity to the asset base needed to support that activity."
  }
];

const calculateBtn = document.getElementById("calculateBtn");
const sampleBtn = document.getElementById("sampleBtn");
const clearBtn = document.getElementById("clearBtn");
const resultsContainer = document.getElementById("resultsContainer");

calculateBtn.addEventListener("click", calculateRatios);
sampleBtn.addEventListener("click", loadSampleData);
clearBtn.addEventListener("click", clearInputs);

function parseNumber(value) {
  if (value === null || value === undefined) {
    return null;
  }

  const cleanedValue = String(value).replace(/,/g, "").trim();

  if (cleanedValue === "") {
    return null;
  }

  const number = Number(cleanedValue);

  if (Number.isNaN(number)) {
    return null;
  }

  return number;
}

function getInputData() {
  const data = {};

  inputIds.forEach(id => {
    const input = document.getElementById(id);
    data[id] = parseNumber(input.value);
  });

  /*
    If gross profit is blank, calculate it from:
    Net sales - Cost of goods sold

    If either amount is missing, gross profit remains null.
  */
  if (data.grossProfit === null) {
    if (data.netSales !== null && data.costOfGoodsSold !== null) {
      data.grossProfit = data.netSales - data.costOfGoodsSold;
    }
  }

  /*
    If ending inventory is blank, use the Inventory input as ending inventory.
    This makes the app easier for students who enter only one inventory amount.
  */
  if (data.endingInventory === null && data.inventory !== null) {
    data.endingInventory = data.inventory;
  }

  /*
    If ending accounts receivable is blank, use the Accounts Receivable input.
  */
  if (data.endingAccountsReceivable === null && data.accountsReceivable !== null) {
    data.endingAccountsReceivable = data.accountsReceivable;
  }

  return data;
}

function safeDivide(numerator, denominator) {
  if (
    numerator === null ||
    numerator === undefined ||
    denominator === null ||
    denominator === undefined ||
    denominator === 0
  ) {
    return null;
  }

  return numerator / denominator;
}

function average(firstAmount, secondAmount) {
  if (
    firstAmount === null ||
    firstAmount === undefined ||
    secondAmount === null ||
    secondAmount === undefined
  ) {
    return null;
  }

  return (firstAmount + secondAmount) / 2;
}

function formatResult(value, format) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "Need more data";
  }

  if (format === "percent") {
    return (value * 100).toFixed(1) + "%";
  }

  if (format === "times") {
    return value.toFixed(2) + " times";
  }

  return value.toFixed(2);
}

function calculateRatios() {
  const data = getInputData();
  resultsContainer.innerHTML = "";

  const categories = getRatioCategories();

  categories.forEach(category => {
    const categorySection = document.createElement("section");
    categorySection.className = "ratio-category";

    const categoryHeading = document.createElement("h3");
    categoryHeading.textContent = category;
    categorySection.appendChild(categoryHeading);

    const ratioGrid = document.createElement("div");
    ratioGrid.className = "ratio-grid";

    const ratiosInCategory = ratioDefinitions.filter(ratio => ratio.category === category);

    ratiosInCategory.forEach(ratio => {
      const rawValue = ratio.calculate(data);
      const formattedValue = formatResult(rawValue, ratio.format);

      const ratioCard = createRatioCard(ratio, formattedValue);
      ratioGrid.appendChild(ratioCard);
    });

    categorySection.appendChild(ratioGrid);
    resultsContainer.appendChild(categorySection);
  });
}

function getRatioCategories() {
  const categories = ratioDefinitions.map(ratio => ratio.category);
  return [...new Set(categories)];
}

function createRatioCard(ratio, formattedValue) {
  const card = document.createElement("article");
  card.className = "ratio-card";

  const title = document.createElement("h4");
  title.textContent = ratio.name;

  const value = document.createElement("p");
  value.className = "ratio-value";
  value.textContent = formattedValue;

  if (formattedValue === "Need more data") {
    value.classList.add("need-data");
  }

  const formula = document.createElement("p");
  formula.className = "formula";
  formula.innerHTML = `<strong>Formula:</strong> ${ratio.formula}`;

  const interpretation = document.createElement("p");
  interpretation.className = "interpretation";
  interpretation.innerHTML = `<strong>Interpretation:</strong> ${ratio.interpretation}`;

  const studentNote = document.createElement("p");
  studentNote.className = "student-note";
  studentNote.innerHTML = `<strong>Student note:</strong> ${ratio.studentNote}`;

  card.appendChild(title);
  card.appendChild(value);
  card.appendChild(formula);
  card.appendChild(interpretation);
  card.appendChild(studentNote);

  return card;
}

function loadSampleData() {
  inputIds.forEach(id => {
    const input = document.getElementById(id);
    input.value = sampleCompanyData[id] || "";
  });

  calculateRatios();
}

function clearInputs() {
  inputIds.forEach(id => {
    const input = document.getElementById(id);
    input.value = "";
  });

  resultsContainer.innerHTML = `
    <div class="empty-results">
      <p>Enter financial statement amounts and click <strong>Calculate Ratios</strong> to see results.</p>
    </div>
  `;
}

clearInputs();