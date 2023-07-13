// display variables
const currentScreen = document.querySelector('#input-span');
const prevScreen = document.querySelector('#display-span');

// button variables
const numberKeys = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operator]');
const equals = document.querySelector('[data-equals]');
const clear = document.querySelector('[data-clear]');
const del = document.querySelector('[data-delete]');
const decimal = document.querySelector('[data-decimal');

let operation = "";
let prevVal = null;

del.addEventListener('click', delBtn)
clear.addEventListener('click', clearBtn)
equals.addEventListener('click', assesment)
decimal.addEventListener('click', decimalBtn)

numberKeys.forEach(button => {
    button.addEventListener('click', () => numPress(button.textContent))
})

operators.forEach(operand => {
    operand.addEventListener('click', operatorPress)
})

function numPress(num) {
    currentScreen.textContent += num;
}

function operatorPress() {

    if (currentScreen.textContent === '') {
        if (prevScreen.textContent === '') return;
        operation = this.getAttribute('data-operator');
        prevScreen.textContent = `${prevVal} ${this.textContent}`;
        return;
    }

    if (prevVal === null) {
        prevVal = currentScreen.textContent;
        prevScreen.textContent = `${prevVal} ${this.textContent}`;
        currentScreen.textContent = '';
        operation = this.getAttribute('data-operator');
        return;
    }

    prevVal = operate(operation, prevVal, currentScreen.textContent);
    operation = this.getAttribute('data-operator');
    prevScreen.textContent = `${prevVal} ${this.textContent}`;
    currentScreen.textContent = '';

}   

//Equal Button function 
function assesment() {
    if (currentScreen.textContent === '' || prevVal === null) return;
    if (operation === 'div' && currentScreen.textContent === '0') {
        prevScreen.textContent = `Error, Press Clear`;
        return;
    }

    prevVal = operate(operation, prevVal, parseFloat(currentScreen.textContent))
    prevScreen.textContent = prevVal;
    currentScreen.textContent = '';
}

//Clear Button function
function clearBtn() { 
        currentScreen.textContent = '';
        prevScreen.textContent = '';
        prevVal = null;
}

// Delete button function
function delBtn() {
    currentScreen.textContent = currentScreen.textContent.slice(0, -1)
}

function decimalBtn() {
    if (currentScreen.textContent.includes('.')) return;
    currentScreen.textContent += '.';
}

// Operands function
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    if (b === 0) {
        return null;
    }
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

function percent(a) {
    return a / 100;
}

function operate(operand, firstValue, secondValue) {

firstValue = parseFloat(firstValue);
secondValue = parseFloat(secondValue);

    switch(operand) {
        case 'add':
        return add(firstValue, secondValue);
        case 'minus':
        return subtract(firstValue,secondValue);
        case 'div':
        return divide(firstValue, secondValue);
        case 'times':
        return multiply(firstValue,secondValue);
        case 'percent':
        return percent(firstValue);
    }
}

window.addEventListener('keydown', keyboardHandler)

function keyboardHandler(e) {
    if(e.key >= 0 && e.key <= 9) numPress(e.key);
    if(e.key === '=' || e.key === 'Enter') assesment(e.key);
    if(e.key === 'Backspace') delBtn();
    if(e.key === '.') decimalBtn();
    if(e.key === 'Escape') clearBtn();
    if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') operatorPress();
}



