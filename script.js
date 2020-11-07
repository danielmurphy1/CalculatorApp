const display = document.getElementById("display");
const equalBtn = document.getElementById("equal-button");
const decimal = document.getElementById("decimal");
const memAdd = document.getElementById("memory-add");
const memClear = document.getElementById("memory-clear");
const memCall = document.getElementById("memory-call");
const clearBtn = document.getElementById("clear");
const operatorBtns = document.querySelectorAll(".operator-button");
const numberBtns = document.querySelectorAll(".number-button");
let replace = false;
let num1 = null;
let num2 = null;
let operator = null;
let memory = null;

function addDecimalPoint(){
  if (replace) {
    display.textContent = null;
    replace = false;
  }

  display.textContent.includes(".") ? display.textContent : display.textContent = display.textContent + ".";
}

function getOperandSymbol(keycode){
  switch(keycode){
    case 106: //multiplication
      return "*";
    case 107: //addition
      return "+";
    case 109: //subtraction
      return "-";
    case 111: //division
      return "/";
    default:
      return;
  }
}

function keypadOperatorSelect(symbol){
  switch (symbol) {
    case "+":
      operator = "+";
      break;
    case "-":
      operator = "-";
      break;
    case "/":
      operator = "/";
      break;
    case "x":
    case "*":
      operator = "*";
      break;
    default:
      break;
    }
}

function addNumberButton (numberTarget){
  if (replace) {
    display.textContent = null;
    replace = false;
  }

  display.textContent === "0" ? display.textContent = numberTarget : display.textContent = (display.textContent + numberTarget);
}

function add() {
  result = num1 + num2;
  display.textContent = Number.parseFloat(result).toPrecision(10) / 1;
  replace = true;
  operator = null;
  num2 = null;
}

function subtract() {
  result = num1 - num2;
  display.textContent = Number.parseFloat(result).toPrecision(10) / 1;
  replace = true;
  operator = null;
  num2 = null;
}

function multiply() {
  result = num1 * num2;
  display.textContent = Number.parseFloat(result).toPrecision(10) / 1;
  replace = true;
  operator = null;
  num2 = null;
}

function divide() {
  result = num1 / num2;
  if (num2 === 0) {
    alert("Cannot divide by 0! Are you trying to create a black hole?");
    return;
  }
  display.textContent = Number.parseFloat(result).toPrecision(10) / 1;
  replace = true;
  operator = null;
  num2 = null;
}

function calculate() {
  num2 = parseFloat(display.textContent);
  let result = "";
  switch (operator) {
    case "+":
      add();
      break;
    case "-":
      subtract();
      break;
    case "/":
      divide();
      break;
    case "x":
    case "*":
      multiply();
      break;
  }
}

function actionWithNoOperator(symbol) {
  num1 = parseFloat(display.textContent);
  replace = true;
  keypadOperatorSelect(symbol);
}

function actionWithOperator(symbol) {
  calculate();
  num1 = parseFloat(display.textContent);
  keypadOperatorSelect(symbol);
}

//equals functionality
equalBtn.addEventListener("click", calculate);
document.addEventListener("keydown", e => e.keyCode === 13 ? calculate() : null);

//numbers functionality
numberBtns.forEach(numButton => {
  numButton.addEventListener("click", function (e) {
    addNumberButton(e.target.textContent);
  });
});

document.addEventListener("keydown", e => (e.keyCode >= 96 && e.keyCode<= 105) ? addNumberButton(e.key) : null);

//operators functionality
operatorBtns.forEach(button => {
  button.addEventListener("click", e => {
    const symbol = button.textContent;
    if (operator) {
      actionWithOperator(symbol);
    } else {
      actionWithNoOperator(symbol);
    }
  });
});

document.addEventListener("keydown", e => {
  const symbol = getOperandSymbol(e.keyCode);
  if(symbol){
    if(operator){
      actionWithOperator(symbolk);
    } else {
      actionWithNoOperator(symbol);
    }
  }
});

//memory buttons functionality
memAdd.addEventListener("click", () => memory = display.textContent);

memClear.addEventListener("click", () => memory = null);

memCall.addEventListener("click", () => memory ? display.textContent = memory : display.textContent);

//cear button functionality
clearBtn.addEventListener("click", () => {
  display.textContent = parseFloat(0);
  replace = false;
  operator = null;
  num1 = null;
  num2 = null;
});

//decimal point functionality
decimal.addEventListener("click", e =>  addDecimalPoint(e.target.textContent));

document.addEventListener("keydown", e => e.keyCode === 110? addDecimalPoint() : null);
