let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}:${centiseconds}`;
}

function updateDisplay() {
  document.getElementById('display').innerText = formatTime(elapsedTime);
}

function startPause() {
  const btn = document.getElementById('startPauseBtn');
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    btn.innerText = 'Pause';
    btn.style.background = '#ff9800';
    btn.style.boxShadow = '0 5px 15px rgba(255,152,0,0.3)';
    running = true;
  } else {
    clearInterval(timerInterval);
    btn.innerText = 'Start';
    btn.style.background = '#00ffe0';
    btn.style.boxShadow = '0 5px 15px rgba(0,255,224,0.3)';
    running = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  running = false;
  updateDisplay();
  const btn = document.getElementById('startPauseBtn');
  btn.innerText = 'Start';
  btn.style.background = '#00ffe0';
  btn.style.boxShadow = '0 5px 15px rgba(0,255,224,0.3)';
  document.getElementById('laps').innerHTML = '';
}

function recordLap() {
  if (!running) return;
  const lapTime = formatTime(elapsedTime);
  const lapEl = document.createElement('p');
  lapEl.textContent = `Lap ${document.getElementById('laps').children.length + 1}: ${lapTime}`;
  document.getElementById('laps').prepend(lapEl);
}

updateDisplay();
