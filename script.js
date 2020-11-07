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

function addDecimalPoint(decimalTarget){
  if (replace) {
    display.textContent = null;
    replace = false;
  }
  
  if (display.textContent.includes(".")) {
    return display.textContent;
  } else {
    display.textContent = display.textContent + decimalTarget;
  }
}

function keypadOperatorSelect(e){
  switch (e.keyCode) {
    case 107:
      operator = "+";
      return operator;
    case 109:
      operator = "-";
      return operator;

    case 111:
      operator = "/";
      return operator;

    case 106:
      operator = "*";
      return operator;
      default:
    }
}

function addNumberButton (numberTarget){
  if (replace) {
      display.textContent = null;
      replace = false;
  }
  if (display.textContent === "0") {
    display.textContent = numberTarget;
  } else {
    display.textContent = (display.textContent + numberTarget);
  }
}


function calculate() {
  num2 = parseFloat(display.textContent);
  let result = "";
  switch (operator) {
    case "+":
      result = num1 + num2;
      display.textContent = Number.parseFloat(result).toPrecision(10) / 1;
      replace = true;
      operator = null;
      num2 = null;
      return result;
    case "-":
      result = num1 - num2;
      display.textContent = Number.parseFloat(result).toPrecision(10) / 1;
      replace = true;
      operator = null;
      num2 = null;
      return result;
    case "/":
      result = num1 / num2;
      if (num2 === 0) {
        alert("Cannot divide by 0! Are you trying to create a black hole?");
        return;
      }
      display.textContent = Number.parseFloat(result).toPrecision(10) / 1;
      replace = true;
      operator = null;
      num2 = null;
      return result;
    case "x":
    case "*":
      result = num1 * num2;
      display.textContent = Number.parseFloat(result).toPrecision(10) / 1;
      replace = true;
      operator = null;
      num2 = null;
      return result;
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
