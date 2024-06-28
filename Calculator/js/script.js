const answer = document.getElementById('answer');
const buttons = document.querySelectorAll('.calculator button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.value;

        if (button.classList.contains('operator')) {
            handleOperator(buttonValue);
        } else {
            handleNumber(buttonValue);
        }
        adjustFontSize(); // Call adjustFontSize after updating the answer
        limitCharacters()
    });
});

function handleOperator(value) {
    switch (value) {
        case 'C':
            answer.textContent = '0';
            break;
        case '%':
            // Convert the current number to percentage
            answer.textContent = parseFloat(answer.textContent) / 100;
            break;
        case '/':
        case '*':
        case '+':
        case '-':
            if (answer.textContent !== '0') {
                let currentText = answer.textContent.trim();
                if (currentText.endsWith('/') || currentText.endsWith('*') || currentText.endsWith('+') || currentText.endsWith('-')) {
                    answer.textContent = currentText.slice(0, -1) + value;
                } else {
                    answer.textContent += value;
                }
            }
            break;
        case '=':
            try {
                answer.textContent = formatResult(eval(answer.textContent));
            } catch (error) {
                answer.textContent = 'Error';
            }
            break;
        case '+/-':
            // Toggle between positive and negative
            if (answer.textContent !== 'Error' && answer.textContent !== '0') {
                answer.textContent = parseFloat(answer.textContent) * -1;
            } else if (answer.textContent === '0') {
                answer.textContent = '-' + answer.textContent;
            }
            break;
        default:
            break;
    }
}

function handleNumber(value) {
    if (answer.textContent === '0' || answer.textContent === 'Error') {
        answer.textContent = value;
    } else if (answer.textContent.startsWith('-0')) {
        answer.textContent = '-' + value;
    } else if (answer.textContent === '.') {
        answer.textContent = '0.' + value;
    } else {
        answer.textContent += value;
    }
}

function formatResult(result) {
    if (result.toString().length > 7) {
        return result.toPrecision(7);
    }
    return result;
}

function adjustFontSize() {
    if (answer.textContent.length > 9) {
        answer.style.fontSize = '40px';
    } else if (answer.textContent.length > 7) {
        answer.style.fontSize = '50px';
    } else {
        answer.style.fontSize = '65px'; // Reset to default size or your preferred default size
    }
}

function limitCharacters() {
    const maxLength = 60;

    if (answer.textContent.length > maxLength) {
        answer.textContent = answer.textContent.slice(0, maxLength);
    }
}
