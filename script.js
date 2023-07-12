// display variables
const input = document.querySelector('#input-span');
const display = document.querySelector('#display-span');

// button variables
const keys = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operator]');
const equals = document.querySelector('[data-equals]');
const clear = document.querySelector('[data-clear]');
const del = document.querySelector('[data-delete]');

let prevVal = null;
let currentVal = null;

del.addEventListener('click', delBtn)

clear.addEventListener('click', clearBtn)

keys.forEach(key => {
    key.addEventListener('click', numPress)
})

function numPress(val) {

    if (val.target.textContent === '.' && input.textContent.includes('.')) return;

    input.textContent += val.target.textContent;
}

operators.forEach(operand => {
    operand.addEventListener('click', operatorPress)
})

function operatorPress(e) {

    if (prevVal === null) {
        prevVal = parseFloat(input.textContent);
        display.textContent = `${prevVal} ${this.textContent}`;
        input.textContent = '';
        return;
    }
    if (prevVal !== null) {
        return;
    }

    prevVal = operator(this.getAttribute('data-operator'), prevVal, currentVal);
    currentVal = parseFloat(input.textContent);
    
    display.textContent = `${prevVal} ${this.textContent}`;
    input.textContent = '';

}   

//Clear Button function
function clearBtn() { 
        input.textContent = '';
        display.textContent = '';
        prevVal = null;
        currentVal = null;
}

// Delete button function
function delBtn() {
    input.textContent = input.textContent.slice(0, -1)
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
        return 'null';
    }
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

function operator(operand, firstValue, secondValue) {

    switch(operand) {
        case 'add':
        return add(firstValue, secondValue);
        case 'minus':
        return subtract(firstValue,secondValue);
        case 'div':
        return divide(firstValue, secondValue);
        case 'times':
        return multiply(firstValue,secondValue);
    }
}