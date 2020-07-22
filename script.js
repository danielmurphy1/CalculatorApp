const display = document.getElementById("display");

const btn = document.getElementById("button");
btn.addEventListener("click", function () {
  numberValue = document.getElementById("display").value;
  console.log(numberValue);
});

let replace = false;
function replaceDisplay(){
    replace = !replace;
    if(replace === true){
        document.addEventListener("keydown", function(e){
            display.value = ""+ e.target.value;
        })
        const numberBtns = document.querySelectorAll(".number-button");
        numberBtns.forEach(function(numButton){
        numButton.addEventListener("click", function(e){
            //  if(e.target.textContent === "1" || "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9" || "0"){
            display.value = ""+ e.target.textContent;
            //  } else {
            //      display.value = display.value;
            //  }
            })
        })    

        
    }
}

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", function () {
  display.value = parseFloat(0);
  //replaceDisplay();
  operator = null;
  num1 = null;
  num2 = null;
});

document.addEventListener("keydown", function () {
  document.getElementById("display").focus();
});
let num1 = null;
let num2 = null;
let operator = null;
const operatorBtns = document.querySelectorAll(".operator-button");
operatorBtns.forEach(function (button) {
  button.addEventListener("click", function (e) {
    if (operator) {
      
        calculate();
        num1 = parseFloat(display.value);
        return operator = button.textContent;
     
    }
    num1 = parseFloat(display.value);
    replaceDisplay();
    return operator = button.textContent;
  }); 
});


const numberBtns = document.querySelectorAll(".number-button");
 numberBtns.forEach(function (numButton){
    numButton.addEventListener("click", function(e){
        if(display.value === "0"){
            display.value = e.target.textContent;
        } else {
            display.value = display.value + e.target.textContent;
            //replaceDisplay();
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
      replaceDisplay();
      operator = null;
      num2 = null;
      return result;
    case "-":
       result = num1 - num2;
       display.value = result;
       replaceDisplay();
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
       replaceDisplay();
       operator = null;
       num2 = null;
       return result;
      
    case "x":
        display.value = result;
        replaceDisplay();
        operator = null;
        num2 = null;
        return result;
      
  }
};
//need to fix being able to click more than 1 digit numbers after operator