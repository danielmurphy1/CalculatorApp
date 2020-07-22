const display = document.getElementById("display");
display.readOnly = true;
let replace = false;
let num1 = null;
let num2 = null;
let operator = null;

const btn = document.getElementById("button");
btn.addEventListener("click", function () {
  numberValue = document.getElementById("display").value;
  console.log(numberValue);
});

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", function () {
  display.value = parseFloat(0);
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
        num1 = parseFloat(display.value);
        return operator = button.textContent;
     
    }
    num1 = parseFloat(display.value);
    replace = true;
    return operator = button.textContent;
  }); 
});

const numberBtns = document.querySelectorAll(".number-button");
 numberBtns.forEach(function (numButton){
    numButton.addEventListener("click", function(e){
        if(replace){
            display.value = null;
            replace = false;
        }
        if(display.value === "0"){
            display.value = parseFloat(e.target.textContent);
        } else {
            let tempNumber = display.value;
            display.value = null;
            display.value = parseFloat(tempNumber + e.target.textContent);
        }
        
    })
   
})

const equalBtn = document.getElementById("equal-button");
equalBtn.addEventListener("click", calculate);

function calculate() {
  num2 = parseFloat(display.value);
  let result = "";
  switch (operator) {
    case "+":
    result = num1 + num2;
      display.value = result;
      replace = true;
      operator = null;
      num2 = null;
      return result;
    case "-":
       result = num1 - num2;
       display.value = result;
       replace = true;
       operator = null;
       num2 = null;
       return result;
     
    case "/":
       result = num1 / num2;
       if( num2 === 0){
        alert("Cannot divide by 0!");
           return;
       }
       display.value = result;
       replace = true;
       operator = null;
       num2 = null;
       return result;
      
    case "x":
        result = num1 * num2;
        display.value = result;
        replace = true;
        operator = null;
        num2 = null;
        return result;
      
  }
};
