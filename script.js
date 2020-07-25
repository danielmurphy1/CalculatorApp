
const display = document.getElementById("display");
let replace = false;
let num1 = null;
let num2 = null;
let operator = null;
let memory = null;

const decimal = document.getElementById("decimal");
decimal.addEventListener("click", function (e) {
    addDecimalPoint(e.target.textContent);
});

document.addEventListener("keydown", function(e){
    if (e.keyCode === 110){
        addDecimalPoint(e.key);
    }
});

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

const memAdd = document.getElementById("memory-add");
memAdd.addEventListener("click", function () {
  memory = display.textContent;
});

const memClear = document.getElementById("memory-clear");
memClear.addEventListener("click", function () {
  memory = null;
});

const memCall = document.getElementById("memory-call");
memCall.addEventListener("click", function () {
  if (memory) {
    display.textContent = memory;
  }
  return display.textContent;
});

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", function () {
  display.textContent = parseFloat(0);
  replace = false;
  operator = null;
  num1 = null;
  num2 = null;
});

const operatorBtns = document.querySelectorAll(".operator-button");
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
} else{
    return;
}
})

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

const numberBtns = document.querySelectorAll(".number-button");
numberBtns.forEach(function (numButton) {
  numButton.addEventListener("click", function (e) {
    AddNumberButton(e.target.textContent);
  });
});

document.addEventListener("keydown", function (e) {
    if(e.keyCode >= 96 && e.keyCode<= 105){
        AddNumberButton(e.key);
        }else{
            return;
        }
})

function AddNumberButton (numberTarget){
    if (replace) {
        display.textContent = null;
        replace = false;
      }
      if (display.textContent === "0") {
        display.textContent = parseFloat(numberTarget);
      } else {
        let tempNumber = display.textContent;
        display.textContent = null;
        display.textContent = parseFloat(tempNumber + numberTarget);
      }
}

document.addEventListener("keydown", function(e){
   
    if(e.keyCode === 13){
        e.preventDefault();
        calculate();
    } else{
        return;
    }
})

const equalBtn = document.getElementById("equal-button");
equalBtn.addEventListener("click", calculate);

function calculate() {
  num2 = parseFloat(display.textContent);
  let result = "";
  switch (operator) {
    case "+":
      result = num1 + num2;
      display.textContent = Number.parseFloat(result).toPrecision(3) / 1;
      replace = true;
      operator = null;
      num2 = null;
      return result;
    case "-":
      result = num1 - num2;
      display.textContent = Number.parseFloat(result).toPrecision(3) / 1;
      replace = true;
      operator = null;
      num2 = null;
      return result;

    case "/":
      result = num1 / num2;
      if (num2 === 0) {
        alert("Cannot divide by 0!");
        return;
      }
      display.textContent = Number.parseFloat(result).toPrecision(3) / 1;
      replace = true;
      operator = null;
      num2 = null;
      return result;

    case "x":
    case "*":
      result = num1 * num2;
      display.textContent = Number.parseFloat(result).toPrecision(3) / 1;
      replace = true;
      operator = null;
      num2 = null;
      return result;
  }
}

//bug entering "0" after decimal point. Need to fix.