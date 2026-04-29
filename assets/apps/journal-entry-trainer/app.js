/*
  Journal Entry Trainer
  Version 1

  To add more questions:
  1. Copy one of the question objects below.
  2. Paste it into the questionBank array.
  3. Edit the topic, prompt, debit, credit, amount, and explanation.

  Keep the topic names consistent so they appear neatly in the dropdown.
*/

const questionBank = [
  {
    topic: "Basic transactions",
    prompt: "A company receives $5,000 cash from customers for services provided.",
    debit: "Cash",
    credit: "Service Revenue",
    amount: 5000,
    explanation:
      "Cash increases, and cash is an asset with a normal debit balance. Service revenue also increases, and revenue accounts increase with credits."
  },
  {
    topic: "Basic transactions",
    prompt: "A company purchases office supplies for $800 cash.",
    debit: "Supplies",
    credit: "Cash",
    amount: 800,
    explanation:
      "Supplies increase, so the asset account is debited. Cash decreases, and asset decreases are recorded with credits."
  },
  {
    topic: "Basic transactions",
    prompt: "A company receives a $10,000 cash investment from its owner.",
    debit: "Cash",
    credit: "Owner's Capital",
    amount: 10000,
    explanation:
      "Cash increases, so it is debited. Owner's capital increases, and equity increases are recorded with credits."
  },
  {
    topic: "Adjusting entries",
    prompt: "At the end of the month, $600 of supplies have been used.",
    debit: "Supplies Expense",
    credit: "Supplies",
    amount: 600,
    explanation:
      "The used supplies are now an expense, so Supplies Expense is debited. The Supplies asset decreases, so Supplies is credited."
  },
  {
    topic: "Adjusting entries",
    prompt: "Employees earned $2,400 of wages that will not be paid until next month.",
    debit: "Wages Expense",
    credit: "Wages Payable",
    amount: 2400,
    explanation:
      "The company has incurred a wage expense, so Wages Expense is debited. Because the amount has not yet been paid, a liability is created and Wages Payable is credited."
  },
  {
    topic: "Accruals and deferrals",
    prompt: "A company receives $3,000 cash from a customer for services that will be provided next month.",
    debit: "Cash",
    credit: "Unearned Revenue",
    amount: 3000,
    explanation:
      "Cash increases, so Cash is debited. The service has not yet been performed, so the company records a liability called Unearned Revenue."
  },
  {
    topic: "Accruals and deferrals",
    prompt: "A company provides $4,500 of services to a customer on account.",
    debit: "Accounts Receivable",
    credit: "Service Revenue",
    amount: 4500,
    explanation:
      "The company has earned revenue but has not yet received cash. Accounts Receivable increases with a debit, and Service Revenue increases with a credit."
  },
  {
    topic: "Inventory",
    prompt: "A company purchases inventory on account for $7,200.",
    debit: "Inventory",
    credit: "Accounts Payable",
    amount: 7200,
    explanation:
      "Inventory increases, so Inventory is debited. Because the company has not paid yet, Accounts Payable increases and is credited."
  },
  {
    topic: "Inventory",
    prompt: "A company sells inventory that cost $2,000.",
    debit: "Cost of Goods Sold",
    credit: "Inventory",
    amount: 2000,
    explanation:
      "When inventory is sold, the cost becomes an expense. Cost of Goods Sold is debited, and Inventory is credited because the asset decreases."
  },
  {
    topic: "Receivables",
    prompt: "A customer pays $1,500 on account.",
    debit: "Cash",
    credit: "Accounts Receivable",
    amount: 1500,
    explanation:
      "Cash increases, so Cash is debited. Accounts Receivable decreases because the customer has paid part of the amount owed, so it is credited."
  },
  {
    topic: "Receivables",
    prompt: "A company writes off a $900 customer account as uncollectible using the allowance method.",
    debit: "Allowance for Doubtful Accounts",
    credit: "Accounts Receivable",
    amount: 900,
    explanation:
      "Under the allowance method, the write-off reduces the allowance account and removes the receivable. Allowance for Doubtful Accounts is debited, and Accounts Receivable is credited."
  },
  {
    topic: "Depreciation",
    prompt: "A company records $1,200 of depreciation expense for equipment.",
    debit: "Depreciation Expense",
    credit: "Accumulated Depreciation",
    amount: 1200,
    explanation:
      "Depreciation Expense increases with a debit. Accumulated Depreciation, a contra-asset account, increases with a credit."
  },
  {
    topic: "Bonds",
    prompt: "A company issues bonds at face value and receives $50,000 cash.",
    debit: "Cash",
    credit: "Bonds Payable",
    amount: 50000,
    explanation:
      "Cash increases, so Cash is debited. The company now has a bond liability, so Bonds Payable is credited."
  },
  {
    topic: "Leases",
    prompt: "A company records a new lease with a right-of-use asset and lease liability of $30,000.",
    debit: "Right-of-Use Asset",
    credit: "Lease Liability",
    amount: 30000,
    explanation:
      "The company recognizes a right-of-use asset, which increases with a debit. It also recognizes a lease liability, which increases with a credit."
  },
  {
    topic: "Revenue recognition",
    prompt: "A company had previously received $2,000 in advance. It now provides the related services.",
    debit: "Unearned Revenue",
    credit: "Service Revenue",
    amount: 2000,
    explanation:
      "The company no longer owes the service, so Unearned Revenue decreases with a debit. Revenue has now been earned, so Service Revenue is credited."
  }
];

let filteredQuestions = [];
let currentQuestionIndex = 0;
let correctCount = 0;
let attemptedCount = 0;
let currentQuestionMarked = false;

const topicSelect = document.getElementById("topicSelect");
const topicLabel = document.getElementById("topicLabel");
const questionNumber = document.getElementById("questionNumber");
const transactionPrompt = document.getElementById("transactionPrompt");

const answerSection = document.getElementById("answerSection");
const debitAccount = document.getElementById("debitAccount");
const creditAccount = document.getElementById("creditAccount");
const debitAmount = document.getElementById("debitAmount");
const creditAmount = document.getElementById("creditAmount");
const explanationText = document.getElementById("explanationText");

const showAnswerBtn = document.getElementById("showAnswerBtn");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");
const markCorrectBtn = document.getElementById("markCorrectBtn");
const markIncorrectBtn = document.getElementById("markIncorrectBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");

const correctCountDisplay = document.getElementById("correctCount");
const attemptedCountDisplay = document.getElementById("attemptedCount");
const scorePercentDisplay = document.getElementById("scorePercent");

function getUniqueTopics() {
  const topics = questionBank.map(question => question.topic);
  return ["All topics", ...new Set(topics)];
}

function populateTopicDropdown() {
  const topics = getUniqueTopics();

  topics.forEach(topic => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    topicSelect.appendChild(option);
  });
}

function setFilteredQuestions() {
  const selectedTopic = topicSelect.value;

  if (selectedTopic === "All topics") {
    filteredQuestions = questionBank;
  } else {
    filteredQuestions = questionBank.filter(question => question.topic === selectedTopic);
  }

  currentQuestionIndex = 0;
  currentQuestionMarked = false;
}

function formatMoney(amount) {
  return "$" + amount.toLocaleString();
}

function showQuestion() {
  const currentQuestion = filteredQuestions[currentQuestionIndex];

  topicLabel.textContent = currentQuestion.topic;
  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${filteredQuestions.length}`;
  transactionPrompt.textContent = currentQuestion.prompt;

  debitAccount.textContent = currentQuestion.debit;
  creditAccount.textContent = currentQuestion.credit;
  debitAmount.textContent = formatMoney(currentQuestion.amount);
  creditAmount.textContent = formatMoney(currentQuestion.amount);
  explanationText.textContent = currentQuestion.explanation;

  answerSection.classList.add("hidden");
  showAnswerBtn.disabled = false;
  currentQuestionMarked = false;
}

function showAnswer() {
  answerSection.classList.remove("hidden");
  showAnswerBtn.disabled = true;
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex >= filteredQuestions.length) {
    currentQuestionIndex = 0;
  }

  showQuestion();
}

function markCorrect() {
  if (currentQuestionMarked) {
    return;
  }

  correctCount++;
  attemptedCount++;
  currentQuestionMarked = true;
  updateScore();
}

function markIncorrect() {
  if (currentQuestionMarked) {
    return;
  }

  attemptedCount++;
  currentQuestionMarked = true;
  updateScore();
}

function resetScore() {
  correctCount = 0;
  attemptedCount = 0;
  currentQuestionMarked = false;
  updateScore();
}

function updateScore() {
  correctCountDisplay.textContent = correctCount;
  attemptedCountDisplay.textContent = attemptedCount;

  if (attemptedCount === 0) {
    scorePercentDisplay.textContent = "0%";
  } else {
    const percentage = Math.round((correctCount / attemptedCount) * 100);
    scorePercentDisplay.textContent = percentage + "%";
  }
}

topicSelect.addEventListener("change", () => {
  setFilteredQuestions();
  showQuestion();
});

showAnswerBtn.addEventListener("click", showAnswer);
nextQuestionBtn.addEventListener("click", nextQuestion);
markCorrectBtn.addEventListener("click", markCorrect);
markIncorrectBtn.addEventListener("click", markIncorrect);
resetScoreBtn.addEventListener("click", resetScore);

populateTopicDropdown();
setFilteredQuestions();
showQuestion();
updateScore();