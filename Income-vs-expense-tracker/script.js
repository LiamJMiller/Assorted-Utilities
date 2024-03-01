let totalIncome = 0;
let totalExpenses = 0;
let balance = 0;
let tax = 0;
let history = [];

let incomeOpen = false;
let expenseOpen = false;

function attachEventListeners() {
	document.getElementById("add-income").addEventListener("click", function () {
		if (incomeOpen) {
			document.getElementById("income-section").innerHTML =
				'<h2>Income</h2><button id="add-income">Add Income</button>';
			incomeOpen = false;
			attachEventListeners();
		} else {
			let incomeLabel = document.createElement("input");
			incomeLabel.type = "text";
			incomeLabel.placeholder = "Label income";
			document.getElementById("income-section").appendChild(incomeLabel);

			let incomeInput = document.createElement("input");
			incomeInput.type = "number";
			incomeInput.placeholder = "Enter income";
			document.getElementById("income-section").appendChild(incomeInput);

			let submitIncome = document.createElement("button");
			submitIncome.textContent = "Submit Income";
			submitIncome.onclick = function () {
				totalIncome += Number(incomeInput.value);
				history.push({
					type: "income",
					label: incomeLabel.value,
					amount: Number(incomeInput.value),
				});
				updateDisplay();
			};
			document.getElementById("income-section").appendChild(submitIncome);
			incomeOpen = true;
		}
	});

	document.getElementById("add-expense").addEventListener("click", function () {
		if (expenseOpen) {
			document.getElementById("expense-section").innerHTML =
				'<h2>Expenses</h2><button id="add-expense">Add Expense</button>';
			expenseOpen = false;
			attachEventListeners();
		} else {
			let expenseLabel = document.createElement("input");
			expenseLabel.type = "text";
			expenseLabel.placeholder = "Label expense";
			document.getElementById("expense-section").appendChild(expenseLabel);

			let expenseInput = document.createElement("input");
			expenseInput.type = "number";
			expenseInput.placeholder = "Enter expense";
			document.getElementById("expense-section").appendChild(expenseInput);

			let submitExpense = document.createElement("button");
			submitExpense.textContent = "Submit Expense";
			submitExpense.onclick = function () {
				totalExpenses += Number(expenseInput.value);
				history.push({
					type: "expense",
					label: expenseLabel.value,
					amount: Number(expenseInput.value),
				});
				updateDisplay();
			};
			document.getElementById("expense-section").appendChild(submitExpense);
			expenseOpen = true;
		}
	});
}

attachEventListeners();

function calculateTax(income) {
	let personalAllowance = 12570;
	if (income > 100000) {
		personalAllowance -= Math.min((income - 100000) / 2, personalAllowance);
	}

	if (income <= personalAllowance) {
		return 0;
	} else if (income <= 50270) {
		return (income - personalAllowance) * 0.2;
	} else if (income <= 125140) {
		return (income - 50270) * 0.4 + (50270 - personalAllowance) * 0.2;
	} else {
		return (
			(income - 125140) * 0.45 +
			(125140 - 50270) * 0.4 +
			(50270 - personalAllowance) * 0.2
		);
	}
}

function updateDisplay() {
	balance = totalIncome - totalExpenses;
	tax = calculateTax(totalIncome);
	document.getElementById(
		"income-display"
	).textContent = `Income: £${totalIncome}`;
	document.getElementById(
		"expense-display"
	).textContent = `Expenses: £${totalExpenses}`;
	document.getElementById(
		"balance-display"
	).textContent = `Balance: £${balance}`;
	document.getElementById("tax-display").textContent = `Tax: £${tax}`;

	let historyList = document.getElementById("history-list");
	historyList.innerHTML = "";
	for (let i = 0; i < history.length; i++) {
		let listItem = document.createElement("li");
		listItem.textContent = `${history[i].type} (${history[i].label}): £${history[i].amount}`;

		let deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.onclick = function () {
			if (history[i].type === "income") {
				totalIncome -= history[i].amount;
			} else if (history[i].type === "expense") {
				totalExpenses -= history[i].amount;
			}
			history.splice(i, 1);
			updateDisplay();
		};
		listItem.appendChild(deleteButton);

		historyList.appendChild(listItem);
	}
}
