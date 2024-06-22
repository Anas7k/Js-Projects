function convert() {
    const temp = parseFloat(document.getElementById('temp').value);
    const from = document.querySelector('.from').value;
    const to = document.querySelector('.to').value;
    const convertedDegree = document.getElementById('convertedDegree');
    const convertedUnit = document.querySelector('#convertedUnit')

    let result;
    if (isNaN(temp)) {
        convertedDegree.textContent = '';
        convertedUnit.textContent = '';
    } else {
        if (from === 'cel' && to === 'fahrenheit') {
            result = (temp * 9/5) + 32;
            convertedUnit.textContent = '\u00B0F';
        } else if (from === 'cel' && to === 'kelvin') {
            result = temp + 273.15;
            convertedUnit.textContent = '\u00B0K';
        } else if (from === 'fah' && to === 'celsius') {
            result = (temp - 32) * 5/9;
            convertedUnit.textContent = '\u00B0C';
        }  else if (from === 'fah' && to === 'kelvin') {
            result = ((temp - 32) * 5/9) + 273.15;
            convertedUnit.textContent = '\u00B0K';
        } else if (from === 'kel' && to === 'celsius') {
            result = temp - 273.15;
            convertedUnit.textContent = '\u00B0C';
        } else if (from === 'kel' && to === 'fahrenheit') {
            result = ((temp - 273.15) * 9/5) + 32;
            convertedUnit.textContent = '\u00B0F';
        } else {
            convertedDegree.textContent = temp;
            convertedUnit.textContent = (to === 'celsius') ? '\u00B0C' : (to === 'fahrenheit') ? '\u00B0F' : '\u00B0K';
        }

        convertedDegree.textContent = result.toFixed(1);
    }
}
// Add event listeners to input and select elements to trigger conversion automatically
document.getElementById('temp').addEventListener('input', convert);
document.querySelector('.from').addEventListener('change', convert);
document.querySelector('.to').addEventListener('change', convert);

document.getElementById('btn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission
    convert();
});

// Initial conversion when the page loads
convert();
