//initalize variables
let firstOperand = ""; // Store first number entered
let secondOperand = ""; // Store second number entered
let operator = null; // Store selected operator (+, -, *, /)
let shouldResetDisplay = false; // Determines whether display should be cleared before next number

const numberButtons = document.querySelectorAll('[data-number]'); // Get all number buttons (0-9)
const operatorButtons = document.querySelectorAll('[data-operator]'); // Get all operator buttons
const display = document.getElementById("display"); // Get calculator display
const dot = document.getElementById("."); // Get decimal point button
const clearButton = document.getElementById("CLEAR"); // Get clear button
const deleteButton = document.getElementById("DELETE"); // Get delete button
const equal = document.getElementById("="); // Get equals button

window.addEventListener('keydown',handleKeyboardInput); // Listen for keyboard input
dot.addEventListener("click",() => pressDot()); // Decimal button click
clearButton.addEventListener("click",() => clear()); // Clear button click
deleteButton.addEventListener("click",() => deleteNumber()); // Delete button click
equal.addEventListener("click", () => evaluate()); // Equals button click

/*Loop through every number button.
When clicked:
Read the button text (7, 8, etc.).
Send it to appendNumber(). */
numberButtons.forEach((button) =>
    button.addEventListener('click',() => appendNumber(button.textContent))
)

/*Loop through all operator buttons.
Convert display symbols (÷, x) into JavaScript operators (/, *).
Store selected operator.*/
operatorButtons.forEach((button) =>
    button.addEventListener('click', () => setOperator(convertOperator(button.textContent)))
)

function operate(operator, a, b){
    // Convert strings to numbers
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
    // Clear display if currently 0
    // or after operator was selected
    if(display.textContent === '0' || shouldResetDisplay)
        resetDisplay();
    // Add number to screen
    display.textContent += num;
}
/* appendNumber Example:
Display = 12
Press 3
Display = 123 */

//Used after selecting an operator.
function resetDisplay(){
    // Empty display
    display.textContent = '';
    // Disable reset mode
    shouldResetDisplay = false;
}

function setOperator(op){
    // Calculate previous expression first
    if (operator!== null) evaluate();
    // Save first number
    firstOperand = display.textContent;
    // Save operator
    operator = op;
    // Next number should start fresh
    shouldResetDisplay = true;
}
/* setOperator Example:
5 + 3
firstOperand = "5"
operator = "+" */

//Converts button symbols into JavaScript operators.
function convertOperator(op){
    if(op==='÷') return '/';
    if(op==='x') return '*';
    return op;
}

function evaluate(){
    // Nothing to calculate
    if (operator=== null || shouldResetDisplay) return;
    // Prevent divide by zero
    if (operator === '/' && display.textContent === '0'){
        alert("You can't divide by 0!");
        return;
    }
    // Store second number
    secondOperand = display.textContent;
    // Calculate and display result
    display.textContent = roundResult(
        operate(operator, firstOperand, secondOperand)
    );
    // Clear operator
    operator = null;
}
/*evaluate Example:
5 + 3
firstOperand = 5
secondOperand = 3
Result = 8*/

//Rounds to 3 decimal places
function roundResult(number){
    return Math.round(number * 1000)/1000
}

function pressDot(){
    // Clear display if needed
    if(shouldResetDisplay) resetDisplay();
    // Empty display becomes 0.
    if(display.textContent === '')
        display.textContent = '0';
    // Prevent multiple decimal points
    // Prevents invalid numbers like: 12.3.4
    if(!display.textContent.includes("."))
        display.textContent += ".";
};

//Equivalent to starting over.
function clear(){
    // Reset display
    display.textContent = "0";
    // Clear stored values
    firstOperand = "";
    secondOperand = "";
    // Remove operator
    operator = null;
    // Disable reset mode
    shouldResetDisplay = false;
};

//delete last digit
function deleteNumber(){
    // Remove last character
    display.textContent = display.textContent.slice(0,-1);
    // If empty, show 0
    if(display.textContent.length==0)
        display.textContent = "0";
};
/*deleteNumber Example:
1234 → 123*/

/* Allows:
0-9 → enter numbers
+ - * / → operators
Enter → equals
Backspace → delete digit
Delete → clear calculator */
function handleKeyboardInput(event){
    // Show pressed key in console
    console.log("Key pressed:", event.key);
    // Numbers
    if(event.key >= 0 && event.key <= 9) 
        appendNumber(event.key);
    // Decimal point
    if(event.key === '.') pressDot();
    // Operators
    if(event.key === '/'||event.key === '*'||
       event.key === '-'|| event.key === '+') 
       setOperator(event.key);
    // Equals
    if(event.key === '='|| event.key === 'Enter') evaluate();
    // Backspace
    if(event.key === 'Backspace') deleteNumber();
    // Delete key
    if(event.key === 'Delete') clear();
}

/* overall program flow

User clicks a number
    ↓
appendNumber()
    ↓
Display updates

User clicks +
    ↓
setOperator()
    ↓
Store first number

User enters second number
    ↓
appendNumber()

User presses =
    ↓
evaluate()
    ↓
operate()
    ↓
add/subtract/multiply/divide
    ↓
Display result

*/