function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    if (b===0) 
        alert("divide by 0 = infinity\nCLEAR calculator to reset");
    return a / b;
}

//initalize variables
let operator = "";
let leftNum = "";
let rightNum = "";
let operatorPressed = false;
//tracks when display stores for right number
//so evaluates when operator press or equal sign press
let storeRightNum = false;

function operate(operator, leftNum, rightNum){
    leftNum = leftNum.toString().includes(".")? parseFloat(leftNum):parseInt(leftNum);
    rightNum = rightNum.toString().includes(".")? parseFloat(rightNum):parseInt(rightNum);
    switch(operator){
        case "+":
            return add(leftNum,rightNum);
        case "-":
            return subtract(leftNum,rightNum);
        case "*":
            return multiply(leftNum,rightNum);
        case "/":
            return divide(leftNum,rightNum);
    }
}

const display = document.getElementById("display");

function updateDisplay(num){
    //replace first digit is zero
    //because 05 and 5 are same value
    if(display.textContent[0]==='0'){
        display.textContent ='';
    }
    display.textContent += num;
}

const zero = document.getElementById("0");
zero.addEventListener("click",() => pressZero());
function pressZero(){
    //check if first digit zero so don't add more zeros
    //because 0, 00, 000... are all the same value
    if(display.textContent[0]!=='0'){
        checkOperatorPress();
        updateDisplay(0);
    }
}

const one = document.getElementById("1");
one.addEventListener("click",() => pressOne());
function pressOne(){
    checkOperatorPress();
    updateDisplay(1);
}

const two = document.getElementById("2");
two.addEventListener("click",() => pressTwo());
function pressTwo(){
    checkOperatorPress();
    updateDisplay(2);
};

const three = document.getElementById("3");
three.addEventListener("click",() => pressThree());
function pressThree(){
    checkOperatorPress();
    updateDisplay(3);
};

const four = document.getElementById("4");
four.addEventListener("click",() => pressFour());
function pressFour(){
    checkOperatorPress();
    updateDisplay(4);
};

const five = document.getElementById("5");
five.addEventListener("click",() => pressFive());
function pressFive(){
    checkOperatorPress();
    updateDisplay(5);
};

const six = document.getElementById("6");
six.addEventListener("click",() => pressSix());
function pressSix(){
    checkOperatorPress();
    updateDisplay(6);
};

const seven = document.getElementById("7");
seven.addEventListener("click",() => pressSeven());
function pressSeven(){
    checkOperatorPress();
    updateDisplay(7);
};

const eight = document.getElementById("8");
eight.addEventListener("click",() => pressEight());
function pressEight(){
    checkOperatorPress();
    updateDisplay(8);
};

const nine = document.getElementById("9");
nine.addEventListener("click",() => pressNine());
function pressNine(){
    checkOperatorPress();
    updateDisplay(9);
};

const dot = document.getElementById(".");
dot.addEventListener("click",() => pressDot());
function pressDot(){
    checkOperatorPress();
    if(!display.textContent.includes("."))
        updateDisplay(".");
};

const AC = document.getElementById("AC");
AC.addEventListener("click",() => pressAC());
function pressAC(){
    display.textContent = "0";
    leftNum = "";
    operatorPressed = false;
    storeRightNum = false;
};

const CE = document.getElementById("CE");
CE.addEventListener("click",() => pressCE());
function pressCE(){
    display.textContent = display.textContent.slice(0,-1);
    if(display.textContent.length==0)
        display.textContent = "0";
};

const divideButton = document.getElementById("÷");
divideButton.addEventListener("click", () => pressDivide());
function pressDivide(){
    operatorButton();
    operator = "/";
};
const multiplyButton = document.getElementById("x");
multiplyButton.addEventListener("click", () => pressMultiply());
function pressMultiply(){
    operatorButton();
    operator = "*";
};
const subtractButton = document.getElementById("-");
subtractButton.addEventListener("click", () => pressSubtract());
function pressSubtract(){
    operatorButton();
    operator = "-";
};
const addButton = document.getElementById("+");
addButton.addEventListener("click", () => pressAdd());
function pressAdd(){
    operatorButton();
    operator = "+";
};

const equal = document.getElementById("=");
equal.addEventListener("click", () => pressEqual());
function pressEqual(){
    if(storeRightNum) 
        calculate();
    operatorPressed = false;
};

document.addEventListener('keydown',function(event){
    //log key press
    console.log("Key pressed:", event.key);

    if(event.key === '0') pressZero();
    if(event.key === '1') pressOne();
    if(event.key === '2') pressTwo();
    if(event.key === '3') pressThree();
    if(event.key === '4') pressFour();
    if(event.key === '5') pressFive();
    if(event.key === '6') pressSix();
    if(event.key === '7') pressSeven();
    if(event.key === '8') pressEight();
    if(event.key === '9') pressNine();
    if(event.key === '.') pressDot();
    if(event.key === '/') pressDivide();
    if(event.key === '*') pressMultiply();
    if(event.key === '-') pressSubtract();
    if(event.key === '+') pressAdd();
    if(event.key === '=') pressEqual();
    if(event.key === 'Enter') pressEqual();
    if(event.key === 'Backspace') pressCE();
    if(event.key === 'Delete') pressAC();
    
});

function operatorButton(){
    if(storeRightNum) 
        calculate();
    else{
        leftNum = display.textContent;
    }
    operatorPressed = true;
}

function checkOperatorPress(){
    if(operatorPressed){
        operatorPressed = false;
        storeRightNum = true;
        display.textContent = '';
    }
}

function calculate(){
    rightNum = display.textContent;
    console.log("pre-operate");
    logger();
    leftNum = operate(operator,leftNum,rightNum);
    display.textContent = leftNum;
    console.log("post-operate");
    logger();
    storeRightNum = false;
}

//function to debug code
function logger(){
    console.log("operator = " + operator);
    console.log("leftNum = " + leftNum);
    console.log("rightNum = " + rightNum);
}