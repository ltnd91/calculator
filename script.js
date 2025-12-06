//initalize variables
let firstOperand = "";
let secondOperand = "";
let operator = null;
let shouldResetDisplay = false;

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const display = document.getElementById("display");
const dot = document.getElementById(".");
const clearButton = document.getElementById("CLEAR");
const deleteButton = document.getElementById("DELETE");
const equal = document.getElementById("=");

window.addEventListener('keydown',handleKeyboardInput);
dot.addEventListener("click",() => pressDot());
clearButton.addEventListener("click",() => clear());
deleteButton.addEventListener("click",() => deleteNumber());
equal.addEventListener("click", () => evaluate());

numberButtons.forEach((button) =>
    button.addEventListener('click',() => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
    button.addEventListener('click', () => setOperator(convertOperator(button.textContent)))
)

function operate(operator, a, b){
    a = Number(a);
    b = Number(b);
    switch(operator){
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
    }
}

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
    return a / b;
}

function appendNumber(num){
    //if 0, clear screen to append value
    //or reset screen after storing first operand and operator
    if(display.textContent === '0' || shouldResetDisplay)
        resetDisplay();
    display.textContent += num;
}

function resetDisplay(){
    display.textContent = '';
    shouldResetDisplay = false;
}

function setOperator(op){
    if (operator!== null) evaluate();
    firstOperand = display.textContent;
    operator = op;
    shouldResetDisplay = true;
}

function convertOperator(op){
    if(op==='÷') return '/';
    if(op==='x') return '*';
    return op;
}

function evaluate(){
    if (operator=== null || shouldResetDisplay) return;
    if (operator === '/' && display.textContent === '0'){
        alert("You can't divide by 0!");
        return;
    }
    secondOperand = display.textContent;
    display.textContent = roundResult(
        operate(operator, firstOperand, secondOperand)
    );
    operator = null;
}

function roundResult(number){
    return Math.round(number * 1000)/1000
}

function pressDot(){
    if(shouldResetDisplay) resetDisplay();
    if(display.textContent === '')
        display.textContent = '0';
    if(!display.textContent.includes("."))
        display.textContent += ".";
};

function clear(){
    display.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    operator = null;
    shouldResetDisplay = false;
};

function deleteNumber(){
    display.textContent = display.textContent.slice(0,-1);
    if(display.textContent.length==0)
        display.textContent = "0";
};

function handleKeyboardInput(event){
    //log key press
    console.log("Key pressed:", event.key);

    if(event.key >= 0 && event.key <= 9) 
        appendNumber(event.key);
    if(event.key === '.') pressDot();
    if(event.key === '/'||event.key === '*'||
       event.key === '-'|| event.key === '+') 
       setOperator(event.key);
    if(event.key === '='|| event.key === 'Enter') evaluate();
    if(event.key === 'Backspace') deleteNumber();
    if(event.key === 'Delete') clear();
}