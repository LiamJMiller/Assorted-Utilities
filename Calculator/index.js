const display = document.querySelector(".display");
const buttons = Array.from(document.querySelectorAll("button"));
const operators = ["+", "-", "*", "/"];
let firstValue = "";
let operatorValue = "";
let awaitingNextValue = false;

function calculate(first, operator, second) {
  first = parseFloat(first);
  second = parseFloat(second);
  if (operator === "+") return first + second;
  if (operator === "-") return first - second;
  if (operator === "*") return first * second;
  if (operator === "/") return first / second;
}

function sendNumberValue(number) {
  if (awaitingNextValue) {
    display.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = display.textContent;
    display.textContent = displayValue === "0" ? number : displayValue + number;
  }
}

function sendOperator(operator) {
  const currentValue = display.textContent;
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else if (operatorValue) {
    const calculation = calculate(firstValue, operatorValue, currentValue);
    display.textContent = calculation;
    firstValue = calculation;
  }
  awaitingNextValue = operator !== "=";
  operatorValue = operator;
}

buttons.map((button) => {
  if (button.classList.contains("clear")) {
    button.addEventListener("click", () => {
      display.textContent = "0";
      firstValue = "";
      operatorValue = "";
      awaitingNextValue = false;
    });
  } else if (
    operators.includes(button.textContent) ||
    button.textContent === "="
  ) {
    button.addEventListener("click", () => sendOperator(button.textContent));
  } else {
    button.addEventListener("click", () => sendNumberValue(button.textContent));
  }
});
