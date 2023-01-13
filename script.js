const keys = document.querySelectorAll('#keys-container div');
const display = document.getElementById('display');

let numberInput = '';
let numbers = [];
let operator = undefined;
let result = undefined;
let lastNumberInput = undefined;
display.innerText = '';

keys.forEach(div => div.addEventListener('mousedown', function (e) {
    this.classList.add('press-div');

    switch (this.className) {
        case 'numbers press-div':
            numbersButton(this.innerText);
            break;

        case 'operators press-div':
            operatorsButton();
            numberInput = '';
            operator = this.attributes[3].value;
            break;
    }

    switch (this.id) {
        case 'decimal-separator':
            decimalSeparatorButton();
            break;

        case 'plus-or-minus':
            plusOrMinusButton();
            break;

        case 'equal':
            equalButton();
            break;

        case 'CE':
            backspaceButton();
            break;
    }
}));

keys.forEach(div => div.addEventListener('mouseup', function () {
    this.classList.remove('press-div');
}));




window.addEventListener('keydown', function (e) {
    if (Array.from(keys).find(div => (Number(div.attributes[0].value) === e.keyCode) || (Number(div.attributes[1].value) === e.keyCode))) {
        Array.from(keys).find(div => (Number(div.attributes[0].value) === e.keyCode) || (Number(div.attributes[1].value) === e.keyCode)).classList.add('press-div');
    }

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

window.addEventListener('keyup', function (e) {

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
            Array.from(keys).find(div => div.id === e.key).classList.remove('press-div');
            break;

        case '+':
        case '-':
        case '*':
        case '/':
            Array.from(keys).filter(div => div.className === 'operators press-div').find(div => div.attributes[1].value === e.key).classList.remove('press-div');
            break;

        case '=':
            Array.from(keys).find(div => div.id === 'equal').classList.remove('press-div');
            break;

        case '.':
            Array.from(keys).find(div => div.id === 'decimal-separator').classList.remove('press-div');
            break;

        case 'Backspace':
            Array.from(keys).find(div => div.id === 'CE').classList.remove('press-div');
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
            checkNumberLength();
            break;

        case '-':
            result = Math.trunc((numbers.reduce((n1, n2) => n1 - n2) * 100)) / 100;
            numbers = [];
            checkNumberLength();
            break;

        case '*':
            result = Math.trunc((numbers.reduce((n1, n2) => n1 * n2) * 100)) / 100;
            numbers = [];
            checkNumberLength();
            break;

        case '/':
            result = Math.trunc((numbers.reduce((n1, n2) => n1 / n2) * 100)) / 100;
            numbers = [];
            checkNumberLength();
            break;
    }
};

function checkNumberLength() {
    if (result <= 999999999) {
        displayNumbers(String(result));
    }
    else {
        displayNumbers(Intl.NumberFormat(undefined, { notation: 'scientific' }).format(result).replace('E', 'e'));
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
    else if (n.includes('e')) {
        display.innerText = n;
    }
    else {
        display.innerText = Number(n);
    }
};