const display = document.getElementById("display");

const btn = document.getElementById("button");
btn.addEventListener("click", function(){
    numberValue = document.getElementById("display").value;
    console.log(numberValue);
})

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", function(){
    document.getElementById("display").valueAsNumber = 0;
})

document.addEventListener("keydown", function(){
    document.getElementById("display").focus();
})



const addBtn = document.getElementById("add-button");
addBtn.addEventListener("click", function(){
    num1 = display.valueAsNumber;
    display.value = "";
    const equalBtn = document.getElementById("equal-button");
    equalBtn.addEventListener("click", function(){
       num2 = display.valueAsNumber;
       const sum = num1 + num2;
       
       display.value = sum;
       
    })
    
});



