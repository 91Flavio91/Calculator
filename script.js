const keys = document.querySelectorAll('#keys-container div');
const display = document.getElementById('display');

let numberInput = '';
display.innerText = '';

keys.forEach(div => div.addEventListener('mousedown', function (e) {

    switch (this.className) {
        case 'numbers':
            numbersButton(this.innerText);
            break;
    }

    switch (this.id) {
        case 'decimal-separator':
            decimalSeparatorButton();
            break;
    }
}));





function numbersButton(number) {
    if (String(Number(numberInput)).replace(/[^0-9]/g, '').length < 9) {
        numberInput += number;
        displayNumbers(numberInput);
    }
};

function decimalSeparatorButton() {
    if (!numberInput.includes('.')) {
        numberInput += '.';
        displayNumbers(numberInput);
    }
}

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