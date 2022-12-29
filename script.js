const keys = document.querySelectorAll('#keys-container div');
const display = document.getElementById('display');

let numberInput = '';
let numbers = [];
let operator = undefined;
let result = undefined;
let lastNumberInput = undefined;
display.innerText = '';

keys.forEach(div => div.addEventListener('mousedown', function (e) {

    switch (this.className) {
        case 'numbers':
            numbersButton(this.innerText);
            break;

        case 'operators':
            operatorsButton();
            numberInput = '';
            operator = this.attributes[1].value;
            break;
    }

    switch (this.id) {
        case 'decimal-separator':
            decimalSeparatorButton();
            break;

        case 'equal':
            equalButton();
            break;
    }
}));





function numbersButton(number) {
    if (String(Number(numberInput)).replace(/[^0-9]/g, '').length < 9) {
        numberInput += number;
        displayNumbers(numberInput);
    }
};

function operatorsButton() {
    if (numberInput !== '' && numbers.length > 0) {
        numbers.push(Number(numberInput));
        operate();
    }
    else if (numberInput === '' && result !== undefined) {
        numbers.push(result);
        result = undefined;
        lastNumberInput = undefined;
    }
    else if (numberInput !== '' && result !== undefined) {
        if (lastNumberInput !== undefined) {
            numbers.push(Number(numberInput));
            result = undefined;
            lastNumberInput = undefined;
        }
        else {
            numbers.push(result, Number(numberInput));
            operate();
        }
    }
    else if (numberInput !== '') {
        numbers.push(Number(numberInput));
    }
}

function equalButton() {
    if (numberInput !== '' && numbers.length > 0) {
        numbers.push(Number(numberInput));
        lastNumberInput = numberInput;
        numberInput = '';
        operate();
    }
    else if (numberInput !== '' && result !== undefined) {
        if (lastNumberInput !== undefined) {
            return;
        }
        else {
            numbers.push(result, Number(numberInput));
            lastNumberInput = numberInput;
            numberInput = '';
            operate();
        }
    }
    else if (result !== undefined && lastNumberInput !== undefined) {
        numbers.push(result, Number(lastNumberInput));
        operate();
    }
};

function decimalSeparatorButton() {
    if (!numberInput.includes('.')) {
        numberInput += '.';
        displayNumbers(numberInput);
    }
}

function operate() {
    switch (operator) {
        case '+':
            result = Math.trunc((numbers.reduce((n1, n2) => n1 + n2) * 100)) / 100;
            numbers = [];
            displayNumbers(String(result));
            break;

        case '-':
            result = Math.trunc((numbers.reduce((n1, n2) => n1 - n2) * 100)) / 100;
            numbers = [];
            displayNumbers(String(result));
            break;

        case '*':
            result = Math.trunc((numbers.reduce((n1, n2) => n1 * n2) * 100)) / 100;
            numbers = [];
            displayNumbers(String(result));
            break;

        case '/':
            result = Math.trunc((numbers.reduce((n1, n2) => n1 / n2) * 100)) / 100;
            numbers = [];
            displayNumbers(String(result));
            break;
    }
};

function displayNumbers(n) {
    if (n === '.') {
        numberInput = '0.';
        display.innerText = numberInput;
    }
    else if (n.indexOf('.') !== -1) {
        display.innerText = Number(n.slice(0, n.indexOf('.'))) + n.substring(n.indexOf('.'));
    }
    else {
        display.innerText = Number(n);
    }
};