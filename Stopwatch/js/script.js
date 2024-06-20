let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

const display = document.querySelector('.display');
const startStop = document.querySelector('#start-stop');
const reset = document.querySelector('#reset');
const lapButton = document.querySelector('#lap');
const laps = [document.querySelector('#lap1'), document.querySelector('#lap2'), document.querySelector('#lap3')];

startStop.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startStop.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
        startStop.textContent = 'Stop';
    }
});

reset.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    startStop.textContent = 'Start';
    elapsedTime = 0;
    display.textContent = '00:00:00';
    laps.forEach(lap => lap.textContent = '');
    laps[laps.length - 1].style.borderBottom = 'none';
    lapCounter = 1;
});

lapButton.addEventListener('click', () => {
    if (isRunning && lapCounter <= laps.length) {
        const lapTime = formatTime(elapsedTime);
        laps[lapCounter - 1].innerHTML = `Lap ${lapCounter}: <span>${lapTime}</span>`;
        if (lapCounter === laps.length) {
            laps[laps.length - 1].style.borderBottom = '1px solid rgb(0, 241, 181)';
        }
        lapCounter++;
    }
});

function formatTime(time) {
    let hours = Math.floor(time / (1000 * 60 * 60));
    let minutes = Math.floor(time / (1000 * 60) % 60);
    let seconds = Math.floor(time / 1000 % 60);
    let milliseconds = Math.floor(time % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    if (hours > 0) {
        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    } else {
        return `${minutes}:${seconds}:${milliseconds}`;
    }
}

function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}
