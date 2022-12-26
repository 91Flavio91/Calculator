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
}));





function numbersButton(number) {
    if (String(Number(numberInput)).replace(/[^0-9]/g, '').length < 9) {
        numberInput += number;
        displayNumbers(numberInput);
    }
};

function displayNumbers(n) {
    display.innerText = Number(n);
};