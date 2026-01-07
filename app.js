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

// Variables to store the calculator operations
let firstNumber;
let secondNumber;
let operator;

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

// const multiplyTest = operate(5, '-', 2);
// console.log(multiplyTest);