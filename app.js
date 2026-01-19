// Variables to store the calculator operations
let firstNumber = null;
let operator = null;
let secondNumber = null;
let totalResult = null;

// Array to store the digits entered by the user
let currentNumber = [];

// Booleans to know where to store the digits pressed
let firstNumberFunction = true;
let secondNumberFunction = false;
let operatorFunction = true;

// Reference to the display to show results
let display = document.querySelector('#display');
// Reference to the container with all the calculator keys
let keysContainer = document.querySelector('#keys');

// Basic math functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// Performs the operation based on the operator
function operate(firstValue, symbol, secondValue) {
    switch (symbol) {
        case '+':
            return add(firstValue, secondValue);
        case '-':
            return subtract(firstValue, secondValue);
        case '*':
            return multiply(firstValue, secondValue);
        case '/':
            return divide(firstValue, secondValue);
    }
}

// Captures the digits pressed and stores them in the right operand
function appendDigit(digit) {
    // Adds the pressed digit to the array forming the current number
    currentNumber.push(digit);
    
    // If the first number boolean is true and the second is false
    // Stores the entered digits as the first operand
    if (firstNumberFunction && !secondNumberFunction) {
        storeFirstNumber();
    }
    // Otherwise, stores the entered digits as the second operand
    if (secondNumberFunction && !firstNumberFunction) {
        storeSecondNumber();
    }
}

// Stores the digits as the first operand
function storeFirstNumber() {
    // Converts the string of digits into a number
    firstNumber = Number(currentNumber.join(''));
    showDisplay(firstNumber);
}

// Stores the digits as the second operand
function storeSecondNumber() {
    // Converts the string of digits into a number
    secondNumber = Number(currentNumber.join(''));
    showDisplay(secondNumber);
}

// Saves the operator chosen by the user
function setOperator(operatorSymbol) {
    // If the operator flag is true, stores the pressed operator
    if (operatorFunction) {
        operator = operatorSymbol;
        showDisplay(operator);
    }

    // Clears the digits array to start the second operand
    currentNumber = [];
    // Switches the flags to store the second operand
    firstNumberFunction = false;
    secondNumberFunction = true;
    operatorFunction = false;
}

function showDisplay(item) {
    display.textContent = item;
}

// Calculates and shows the result of the operation
function getResult() {
    // Executes the operation only if both operands are present
    if ((firstNumber || firstNumber === 0) && (secondNumber || secondNumber === 0)) {
        const result = operate(firstNumber, operator, secondNumber);
        const decimals = 2;
        // Always rounds the result to two decimals, but doesn't show unnecessary decimals if the number is an integer
        totalResult = Math.round(result * Math.pow(10, 2)) / Math.pow(10, 2);
    }

    if (totalResult == null) {
        showDisplay('Error');
    } else {
        showDisplay(totalResult);
    }
    
    // Resets the array storing the digits and the operands
    currentNumber = [];
    firstNumber = totalResult;
    secondNumber = null;
}

// Clears the calculator
function clearCalculator() {
    // Resets all the calculator variables
    showDisplay('0');
    firstNumber = null;
    operator = null;
    secondNumber = null;
    currentNumber = [];
    firstNumberFunction = true;
    secondNumberFunction = false;
    operatorFunction = true;
}

// Event: when a digit key is pressed (0–9)
document.querySelectorAll('.num').forEach(btn => {
    btn.addEventListener('click', (event) => {
        appendDigit(event.target.textContent);
    });
});

// Event: when an operator key is pressed
document.querySelectorAll('.operator').forEach(symbol => {
    symbol.addEventListener('click', (event) => {
        if (operatorFunction) {
            setOperator(event.target.textContent);
        } else {
            getResult();
            operator = event.target.textContent;
        }
    });
});

// Event: when the equal key (=) is pressed
document.querySelector('#keyEqual').addEventListener('click', getResult);

// Event: when an clear key is pressed
document.querySelector('#keyC').addEventListener('click', clearCalculator);