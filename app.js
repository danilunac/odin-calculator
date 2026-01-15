// Variables to store the calculator operations
let firstNumber;
let operator;
let secondNumber;
let totalResult;

// Array to store the digits entered by the user
let currentNumber = [];

// Booleans to know where to store the digits pressed
let firstNumberFunction = true;
let secondNumberFunction = false;

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
    currentNumber.push(digit);
    console.log(currentNumber);
    if (firstNumberFunction && !secondNumberFunction) {
        storeFirstNumber();
    }
    if (secondNumberFunction && !firstNumberFunction) {
        storeSecondNumber();
    }
}

// Stores the digits as the first operand
function storeFirstNumber() {
    firstNumber = Number(currentNumber.join(''));
    display.textContent = firstNumber;
    console.log(firstNumber);
    console.log(typeof(firstNumber));
}

// Stores the digits as the second operand
function storeSecondNumber() {
    secondNumber = Number(currentNumber.join(''));
    display.textContent = secondNumber;
    console.log(secondNumber);
}

// Saves the operator chosen by the user
function setOperator(operatorSymbol) {
    if (operator === undefined) {
        operator = operatorSymbol;
        console.log(operator);
        display.textContent = operator;
    }

    // Clears the digits array to start the second operand
    currentNumber = [];
    // Switches the flags to store the second operand
    firstNumberFunction = false;
    secondNumberFunction = true;
}

// Calculates and shows the result of the operation
function getResult() {
    const result = operate(firstNumber, operator, secondNumber);
    totalResult = result;
    console.log(totalResult);
    console.log(typeof(totalResult));
    if (totalResult == null) {
        display.textContent = 'Error';
    } else {
        display.textContent = result;
    }
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
        setOperator(event.target.textContent);
    });
});

// Event: when the equal key (=) is pressed
document.querySelector('#keyEqual').addEventListener('click', getResult);