let startTime, elapsedTime = 0, interval;
let laps = [];
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

// Format time in HH:MM:SS
function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

// Update stopwatch display
function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Start stopwatch
startBtn.addEventListener('click', () => {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTime, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
});

// Stop stopwatch
stopBtn.addEventListener('click', () => {
    clearInterval(interval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

// Reset stopwatch
resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    elapsedTime = 0;
    display.textContent = '00:00:00';
    laps = [];
    lapsContainer.innerHTML = '';
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
});

// Record lap
lapBtn.addEventListener('click', () => {
    const lapTime = formatTime(elapsedTime);
    const lapName = prompt('Enter a name for this lap:', `Lap ${laps.length + 1}`);

    const lapDiv = document.createElement('div');
    lapDiv.classList.add('lap');

    const lapNameDiv = document.createElement('div');
    lapNameDiv.classList.add('lap-name');
    lapNameDiv.textContent = lapName;

    const lapTimeDiv = document.createElement('div');
    lapTimeDiv.textContent = lapTime;

    lapDiv.appendChild(lapNameDiv);
    lapDiv.appendChild(lapTimeDiv);
    lapsContainer.appendChild(lapDiv);
});
