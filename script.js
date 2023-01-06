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
            this.classList.add('press-div');
            numbersButton(this.innerText);
            break;

        case 'operators':
            this.classList.add('press-div');
            operatorsButton();
            numberInput = '';
            operator = this.attributes[1].value;
            break;
    }

    switch (this.id) {
        case 'decimal-separator':
            this.classList.add('press-div');
            decimalSeparatorButton();
            break;

        case 'plus-or-minus':
            this.classList.add('press-div');
            plusOrMinusButton();
            break;

        case 'equal':
            this.classList.add('press-div');
            equalButton();
            break;

        case 'CE':
            this.classList.add('press-div');
            backspaceButton();
            break;
    }
}));

keys.forEach(div => div.addEventListener('mouseup', function () {

    switch (this.className) {
        case 'numbers press-div':
            this.classList.remove('press-div');
            break;

        case 'operators press-div':
            this.classList.remove('press-div');
            break;
    }

    switch (this.id) {
        case 'ON-C':
            this.classList.remove('press-div');
            playSounds(1);
            break;

        case 'decimal-separator':
            this.classList.remove('press-div');
            break;

        case 'plus-or-minus':
            this.classList.remove('press-div');
            break;

        case 'equal':
            this.classList.remove('press-div');
            break;

        case 'CE':
            this.classList.remove('press-div');
            break;
    }
}));




window.addEventListener('keydown', function (e) {

    switch (e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            numbersButton(e.key);
            break;

        case '+':
        case '-':
        case '*':
        case '/':
            operatorsButton();
            numberInput = '';
            operator = e.key;
            break;

        case '=':
            equalButton();
            break;

        case '.':
            decimalSeparatorButton();
            break;

        case 'Backspace':
            backspaceButton();
            break;
    }
});





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

function plusOrMinusButton() {
    if (result && !numberInput) {
        result = result * -1
        displayNumbers(String(result));
    }
    else {
        numberInput = String(numberInput * -1);
        displayNumbers(numberInput);
    }
};

function backspaceButton() {
    if (numberInput) {
        numberInput = numberInput.slice(0, numberInput.length - 1);
        displayNumbers(numberInput);
    }
};

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
    else if (n === '' || n === '-') {
        numberInput = '0';
        display.innerText = Number(numberInput);
    }
    else {
        display.innerText = Number(n);
    }
};