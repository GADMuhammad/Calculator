const toggleElement = document.querySelector(".themes__toggle");

const toggleTheme = () => toggleElement.classList.toggle("themes__toggle--isActive");

toggleElement.addEventListener("click", toggleTheme);
toggleElement.addEventListener("keydown", (e) => e.key === "Enter" && toggleTheme());

// Logic for calculator:

let storedNumber = "";
let currentNumber = "";
let operation = "";

const resultElement = document.querySelector(".calc__result"),
  keyButtons = document.querySelectorAll("[data-type]");

const updateUI = (value) => {
  resultElement.innerText = !value ? "0" : value;
};

const numberButtonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;

  currentNumber += value;
  updateUI(currentNumber);
};

const resetButtonHandler = () => {
  storedNumber = "";
  currentNumber = "";
  operation = "";
  updateUI(currentNumber);
};

const deleteButtonHandler = () => {
  if (!currentNumber || currentNumber === "0") return;

  if (currentNumber.length === 1) {
    currentNumber = "";
  }

  if (currentNumber > 1) {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }

  updateUI(currentNumber);
};

const executeOperation = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        break;
      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        break;
      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        break;
      case "/":
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        break;

      default:
        break;
    }

    currentNumber = "";
    updateUI(storedNumber);
  }
};

const operationButtonHandler = (operationValue) => {
  if (!storedNumber && !currentNumber) return;

  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;
    if (currentNumber) executeOperation();
  }
};

const keyElementsHandler = (button) => {
  button.addEventListener("click", () => {
    const data = button.dataset;

    if (data.type === "number") {
      numberButtonHandler(button.dataset.value);
    } else if (data.type === "operation") {
      // -----------------------------------------------------------
      switch (data.value) {
        case "c":
          resetButtonHandler();
          break;
        case "Backspace":
          deleteButtonHandler();
          break;
        case "Enter":
          executeOperation();
          break;

        default:
          operationButtonHandler(button.dataset.value);
      }
      // -----------------------------------------------------------
    }
  });
};

keyButtons.forEach(keyElementsHandler);

// Use keyboard to type (as input source) :

const availableNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const availableOperation = ["+", "-", "*", "/"];
const availableKeys = [...availableNumbers, ...availableOperation, "Backspace", "Enter", "c"];

const keyboardWithoutHover = (event) => {
  if (availableNumbers.includes(event.key)) {
    numberButtonHandler(event.key);
  } else if (availableOperation.includes(event.key)) {
    operationButtonHandler(event.key);
  } else if (event.key === "Backspace" || event.key === "Delete") {
    deleteButtonHandler();
  } else if (event.key === "Enter") {
    executeOperation();
  }
};

const keyboardWithHover = (event) => {
  if (availableKeys.includes(event.key)) {
    const element = document.querySelector(`[data-value="${event.key}"]`);

    element.classList.add("hover");
    element.click();
    setTimeout(() => element.classList.remove("hover"), 300);
  }
};

// window.addEventListener("keydown", keyboardWithoutHover);
window.addEventListener("keydown", keyboardWithHover);
