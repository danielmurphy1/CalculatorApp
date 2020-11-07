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

//equals functionality
equalBtn.addEventListener("click", calculate);
document.addEventListener("keydown", function(e){
  if(e.keyCode === 13){
    e.preventDefault();
    calculate();
  } else {
    return;
  }
});

//numbers functionality
numberBtns.forEach(function (numButton) {
  numButton.addEventListener("click", function (e) {
    addNumberButton(e.target.textContent);
  });
});
document.addEventListener("keydown", function (e) {
  if(e.keyCode >= 96 && e.keyCode<= 105){
    addNumberButton(e.key);
    }else{
        return;
  }
});

//operators functionality
operatorBtns.forEach(function (button) {
  button.addEventListener("click", function (e) {
    if (operator) {
      calculate();
      num1 = parseFloat(display.textContent);
      return (operator = button.textContent);
    }
    num1 = parseFloat(display.textContent);
    replace = true;
    return (operator = button.textContent);
  });
});
document.addEventListener("keydown", function (e) {
  if (
    e.keyCode === 106 ||
    e.keyCode === 107 ||
    e.keyCode === 109 ||
    e.keyCode === 111
  ) {
    if (operator) {
      calculate();
      num1 = parseFloat(display.textContent);
      keypadOperatorSelect(e);
    }else {
      num1 = parseFloat(display.textContent);
      replace = true;
      keypadOperatorSelect(e);
    }
  } else {
    return;
  }
});

//memory buttons functionality
memAdd.addEventListener("click", function () {
  memory = display.textContent;
});

memClear.addEventListener("click", function () {
  memory = null;
});

memCall.addEventListener("click", function () {
  if (memory) {
    display.textContent = memory;
  }
  return display.textContent;
});

//cear button functionality
clearBtn.addEventListener("click", function () {
  display.textContent = parseFloat(0);
  replace = false;
  operator = null;
  num1 = null;
  num2 = null;
});

//decimal point functionality
decimal.addEventListener("click", function (e) {
  addDecimalPoint(e.target.textContent);
});
document.addEventListener("keydown", function(e){
  if (e.keyCode === 110){
      addDecimalPoint(e.key);
  }
});
