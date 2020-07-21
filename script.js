const display = document.getElementById("display");

const btn = document.getElementById("button");
btn.addEventListener("click", function () {
  numberValue = document.getElementById("display").value;
  console.log(numberValue);
});

let replace = false;
function replaceDisplay(){
    replace = !replace;
    if(replace){
        document.addEventListener("keydown", function(e){
            display.value = ""+ e.target.value;
        })
    }
}

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", function () {
  document.getElementById("display").valueAsNumber = 0;
  replaceDisplay();
});

document.addEventListener("keydown", function () {
  document.getElementById("display").focus();
});


const operatorBtns = document.querySelectorAll(".operator-button");
operatorBtns.forEach(function (button) {
  button.addEventListener("click", function (e) {
    num1 = display.valueAsNumber;
    replaceDisplay();
    
    return operator = button.textContent;
  });
  
});

const equalBtn = document.getElementById("equal-button");
equalBtn.addEventListener("click", calculate);



function calculate() {
  num2 = display.valueAsNumber;
  switch (operator) {
    case "+":
      const sum = num1 + num2;
      display.value = sum;
      replaceDisplay();
      break;
    case "-":
      const difference = num1 - num2;
      display.value = difference;
      replaceDisplay();
      break;
    case "/":
      const quotient = num1 / num2;
      display.value = quotient;
      replaceDisplay();
      break;
    case "x":
      const product = num1 * num2;
      display.value = product;
      replaceDisplay();
      break;
  }
};


//need to add conitnuous functionality (summing after each operator press)