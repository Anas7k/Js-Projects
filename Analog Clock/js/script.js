/*==================== NUMBERS & MINUTE LINES ====================*/

const numHours = document.querySelector('.num-hours')
const minuteLines = document.querySelector('.minute-lines')

const hours = []
const minutes = []

for (let i = 1; i <= 12; i++){
    hours.push(`<span style="--n:${i};"><b>${i}</b></span>`);
}

numHours.innerHTML+=(hours.join(""));

for (let i = 1; i <= 60; i++) {
    minutes.push(`<span style="--n:${i};"><p></p></span>`);
}

minuteLines.innerHTML+=(minutes.join(""));

/*==================== CLOCK ====================*/
const hourHand = document.querySelector('.hour-hand')
const minuteHand = document.querySelector('.minute-hand')
const secondHand = document.querySelector('.second-hand')

function clock() {
    let date = new Date();

    // Calculate the degrees for the hour, minute, and second hands
    let hh = date.getHours() * 30 + date.getMinutes() * 0.5;
    /* The hour hand moves 30 degrees per hour. Since there are 60 minutes in an hour, 
    30 degrees per hour / 60 minutes = 0.5 degrees per minute. 
    So, the hour hand will move 0.5 degrees per minute, allowing it to move smoothly. */

    let mm = date.getMinutes() * 6 + date.getSeconds() * 0.1; 
    /* The minute hand moves 6 degrees per minute. Since there are 60 seconds in a minute, 
    6 degrees per minute / 60 seconds = 0.1 degrees per second. 
    So, the minute hand will move 0.1 degrees per second, allowing it to move smoothly. */
    
    let ss = date.getSeconds() * 6 + date.getMilliseconds() * 0.006;
    /* The second hand moves 6 degrees per second. Since there are 1000 milliseconds in a second, 
    6 degrees per second / 1000 milliseconds = 0.006 degrees per millisecond. 
    So, the second hand will move 0.006 degrees per millisecond, allowing it to move smoothly. */
     
    hourHand.style.transform = `rotate(${hh}deg )`
    minuteHand.style.transform = `rotate(${mm}deg)`
    secondHand.style.transform = `rotate(${ss}deg)`
    
    requestAnimationFrame(clock)
}


/*==================== THEMES & BUTTONS ====================*/

function setTheme(theme) {
    document.body.className = theme + '-theme';
    document.body.style.transition = `0.3s linear`;
    document.querySelectorAll('.btns button').forEach(btn => {
        btn.classList.remove('selected');
        /* SHADOWS */
        if (theme === 'dark') {
            btn.style.boxShadow = '0 0 5px #fff'; // White shadow for dark theme button
        } else {
            btn.style.boxShadow = '0 0 5px #000'; // Reset button shadow for other themes
        }
    });

    let selectedBtn = document.querySelector('#' + theme + '-theme-toggle');
    selectedBtn.classList.add('selected');
    if (theme === 'dark') {
        selectedBtn.style.boxShadow = '0 0 15px #fff'; // Increase shadow blur for selected button
    } else {
        selectedBtn.style.boxShadow = '0 0 10px #000'; // Increase shadow blur for selected button
    }
}

/* EACH THEME ADD EVENT LISTENER TO APPLY THE THEME */
const themes = ['dark', 'white', 'green', 'red', 'blue', 'yellow']
themes.forEach(theme => {
    document.querySelector(`#${theme}-theme-toggle`).addEventListener('click', () => setTheme(theme));
});


// Apply the green theme by default
setTheme('green');

/* START THE CLOCK */
requestAnimationFrame(clock)

