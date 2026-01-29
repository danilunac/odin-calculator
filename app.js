// Variables to store the calculator operations
let firstNumber = null;
let operator = null;
let secondNumber = null;
let totalResult = null;

// Array to store the digits entered by the user
let currentNumber = [];

// Booleans to know where to store the digits pressed
let secondNumberFlag = false;
let operatorFlag = false;
let errorState = false;

// Reference to the display to show results
const display = document.querySelector('#display');
// Reference to the container with all the calculator keys
const keysContainer = document.querySelector('#keys');
// Reference to the dot button
const dot = document.querySelector('#keyDot');
const keyCE = document.querySelector('#keyCE');

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

// The calculator starts with the backspace key disabled 
keyCE.disabled = true;
// keyCE.style.display = 'none';

// Captures the digits pressed and stores them in the right operand
function appendDigit(digit) {
    // If there was a previous error (like division by zero), reset the calculator
    if (errorState) {
        resetState();
    }
    
    // When a digit is entered, the backspace key is enabled to allow deleting the input
    keyCE.disabled = false;
    // keyCE.style.display = 'inline-block';

    // Adds the pressed digit to the array forming the current number
    currentNumber.push(digit);
    if (currentNumber[0] === '.') {
        currentNumber.pop();
        return;
    } 
    
    // When a dot is added, it disables further dot input
    if (currentNumber.includes('.')) {
        dot.classList.remove('num');
        console.log(currentNumber);
    }
    
    // If the second number flag is false
    // Stores the entered digits as the first operand
    if (!secondNumberFlag) {
        storeFirstNumber();
    } else {
        // Otherwise, stores the entered digits as the second operand
        storeSecondNumber();
    }
}

// Stores the digits as the first operand
function storeFirstNumber() {
    // Converts the string of digits into a number
    firstNumber = Number(currentNumber.join(''));

    // If there are no digits, display '0'
    if (currentNumber.join('') === '') {
        showDisplay('0');
    } else {
        // Displays the entered digits on the screen
        showDisplay(currentNumber.join(''));
    }    

    // Set the operator flag to allow storing the operator
    operatorFlag = true;
}

// Stores the digits as the second operand
function storeSecondNumber() {
    // Converts the entered digits to a number only if currentNumber is not empty
    if (currentNumber.length === 0) {
        secondNumber = null;
    } else {
        secondNumber = Number(currentNumber.join(''));
    }

    // If there are no digits, display '0'
    if (currentNumber.join('') === '') {
        showDisplay(operator);
    } else {
        // Displays the entered digits on the screen
        showDisplay(currentNumber.join(''));
    }

    // Avoid clearing the operator when user deletes digits from secondNumber
    // operatorFlag = true;
}

// Saves the operator chosen by the user
function setOperator(operatorSymbol) {
    // After an error, do not allow entering an operator
    if (errorState) {
        return;
    }
    // If the operator flag is true, stores the pressed operator
    if (operatorFlag) {
        operator = operatorSymbol;
        showDisplay(operator);
        keyCE.disabled = true;
    }
    
    // Clears the digits array to start the second operand
    currentNumber = [];
    // Switches the flags to store the second operand
    secondNumberFlag = true;
    operatorFlag = false;
    dot.classList.add('num');
}

function showDisplay(item) {
    display.textContent = item;
}

// Calculates and shows the result of the operation
function getResult() {
    // Executes the operation only if both operands are present
    if ((firstNumber || firstNumber === 0) && operator && (secondNumber || secondNumber === 0)) {
        const result = operate(firstNumber, operator, secondNumber);
        const decimals = 2;
        // Always rounds the result to two decimals, but doesn't show unnecessary decimals if the number is an integer
        totalResult = Math.round(result * Math.pow(10, 2)) / Math.pow(10, 2);
        console.log(`num1: ${firstNumber}, operator: ${operator}, num2: ${secondNumber} = result: ${totalResult}`);

        if (totalResult || totalResult === 0){
            keyCE.disabled = true;
        }

        // Resets the array storing the digits and the operands
        currentNumber = [];
        firstNumber = totalResult;
        secondNumber = null;
    }

    if (totalResult === null) {
        if ((firstNumber || firstNumber === 0) && operator) {
            showDisplay(operator);
        } else {
            showDisplay(firstNumber || '0')
        }
    } else {
        showDisplay(totalResult);
    }

    if (totalResult === Infinity) {
        showDisplay('Are you serious?');
        errorState = true;
    }
}

// Resets the calculator's internal state without touching the display
function resetState() {
    firstNumber = null;
    operator = null;
    secondNumber = null;
    totalResult = null;
    currentNumber = [];
    secondNumberFlag = false;
    operatorFlag = false;
    errorState = false;
    dot.classList.add('num');
    keyCE.disabled = true;
}

// Remove the last digit entered
function clearDigit() {
    if (currentNumber.length > 0) {
        currentNumber.pop();
        dot.classList.add('num');
    }
}

// Remove the operator
// function clearOperator() {
//     operatorFlag = true;
//     operator = null;
//     if (operator) {
//         showDisplay(operator);
//     } else {
//         showDisplay(firstNumber);
//     }
//     keyCE.disabled = true;
// }

// Clears the calculator completely (display and state)
function clearCalculator() {
    showDisplay('0');
    resetState();
}

// Event: when a digit key is pressed (0–9)
document.querySelectorAll('.num').forEach(btn => {
    btn.addEventListener('click', (event) => {
        if (btn.classList.contains('num')) {
            // Stores the pressed digit in the current number
            appendDigit(event.target.textContent);
        }
    });
});

// Event: when an operator key is pressed
document.querySelectorAll('.operator').forEach(symbol => {
    symbol.addEventListener('click', (event) => {
        // Only stores the operator if allowed
        if (operatorFlag) {
            // Stores the operator selected by the user
            setOperator(event.target.textContent);
        } else {
            // Executes the operation only if there's a valid second operand
            if (secondNumber || secondNumber === 0) {
                getResult();
                operator = event.target.textContent;
            } 
        }
    });
});

// Event: when the equal key (=) is pressed
document.querySelector('#keyEqual').addEventListener('click', () => {
    // After an error, pressing the equals sign (=) is not allowed
    if (errorState) {
        return;
    }
    
    // Executes the operation only if there's a valid second operand
    if (secondNumber || secondNumber === 0) {
        getResult();

        // Resets the flags to start a new operation
        secondNumberFlag = false;
        // Setting operatorFlag to true allows continuing with operations after pressing an operator
        operatorFlag = true;
        dot.classList.add('num');
    }
});

// Event: when an clear key is pressed
document.querySelector('#keyAC').addEventListener('click', clearCalculator);

// Event: when an backspace button is pressed
document.querySelector('#keyCE').addEventListener('click', () => {
    if (!secondNumberFlag) {
        clearDigit();
        storeFirstNumber();
    } else {
        clearDigit();
        storeSecondNumber();
    }
});