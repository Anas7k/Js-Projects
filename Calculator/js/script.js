const answer = document.getElementById('answer');
const buttons = document.querySelectorAll('.calculator button');
let lastOperationWasEqual = false;
let currentOperation = '';
let currentNumber = '';
let operatorTapped = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.value;

        if (button.classList.contains('operator')) {
            handleOperator(button);
        } else {
            handleNumber(buttonValue);
        }
        adjustFontSize(); // Call adjustFontSize after updating the answer
        limitCharacters();
    });
});

function handleOperator(button) {
    const value = button.value;
    lastOperationWasEqual = false; // Reset flag for operators

    // Change button color on click
    buttons.forEach(btn => btn.classList.remove('active-operator'));
    button.classList.add('active-operator');
    operatorTapped = true; // Flag to indicate an operator was tapped

    switch (value) {
        case 'C':
            answer.textContent = '0';
            currentOperation = '';
            currentNumber = '';
            operatorTapped = false;
            break;
        case '%':
            if (answer.textContent !== '0' && !isNaN(answer.textContent.replace(/,/g, ''))) {
                answer.textContent = (parseFloat(answer.textContent.replace(/,/g, '')) / 100).toLocaleString('en-US');
            }
            operatorTapped = false;
            break;
        case '/':
        case '*':
        case '+':
        case '-':
            if (answer.textContent !== '0' && !isNaN(answer.textContent.replace(/,/g, ''))) {
                currentOperation = value;
                currentNumber = answer.textContent.replace(/,/g, ''); // Remove commas for calculation
                operatorTapped = true;
            }
            break;
        case '=':
            if (currentOperation && currentNumber) {
                try {
                    const result = eval(`${currentNumber} ${currentOperation} ${parseFloat(answer.textContent.replace(/,/g, ''))}`);
                    answer.textContent = formatResult(result);
                } catch (error) {
                    answer.textContent = 'Error';
                }
                lastOperationWasEqual = true; // Set flag when '=' is pressed
                currentOperation = '';
                currentNumber = '';
                operatorTapped = false;
            }
            break;
        case '+/-':
            if (answer.textContent !== 'Error' && answer.textContent !== '0') {
                answer.textContent = (parseFloat(answer.textContent.replace(/,/g, '')) * -1).toLocaleString('en-US');
            } else if (answer.textContent === '0') {
                answer.textContent = '-' + answer.textContent;
            }
            operatorTapped = false;
            break;
        default:
            break;
    }
}

function handleNumber(value) {
    // Remove commas and add current value
    let currentAnswer = answer.textContent.replace(/,/g, '');

    if (lastOperationWasEqual) {
        if (value === '.') {
            answer.textContent = '0.';
        } else {
            answer.textContent = addCommas(value);
        }
        lastOperationWasEqual = false; // Reset the flag
    } else if (operatorTapped) {
        if (value === '.') {
            answer.textContent = '0.'; // Start a new decimal number
        } else {
            answer.textContent = addCommas(value); // Clear the display for new number
        }
        operatorTapped = false; // Reset the flag
    } else {
        if (value === '.') {
            if (!currentAnswer.includes('.')) {
                answer.textContent += value;
            } else if (currentAnswer === '0' || currentAnswer === 'Error') {
                answer.textContent = '0.';
            }
        } else if (currentAnswer === '0' || currentAnswer === 'Error') {
            answer.textContent = addCommas(value);
        } else if (currentAnswer.startsWith('-0')) {
            answer.textContent = '-' + addCommas(value);
        } else {
            answer.textContent = addCommas(currentAnswer + value);
        }
    }
}

function formatResult(result) {
    if (isNaN(result)) {
        return 'Error';
    }
    return parseFloat(result).toLocaleString('en-US');
}

function addCommas(value) {
    return parseFloat(value).toLocaleString('en-US');
}

function adjustFontSize() {
    if (answer.textContent.length > 9) {
        answer.style.fontSize = '40px';
    } else if (answer.textContent.length > 7) {
        answer.style.fontSize = '50px';
    } else {
        answer.style.fontSize = '65px'; 
    }
}

function limitCharacters() {
    const maxLength = 9;

    if (answer.textContent.length > maxLength) {
        answer.textContent = answer.textContent.slice(0, maxLength);
    }
}
