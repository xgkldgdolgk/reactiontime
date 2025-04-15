let box = document.getElementById('box');
let results = document.getElementById('results');
let startTime, endTime, timeout, waiting = false;
let times = [];

function startTest() {
  box.style.backgroundColor = '#ccc';
  box.textContent = 'Wait for green...';
  waiting = true;

  const delay = Math.random() * 3000 + 2000; // 2-5 sec
  timeout = setTimeout(() => {
    box.style.backgroundColor = '#4CAF50';
    box.textContent = 'CLICK!';
    startTime = Date.now();
    waiting = false;
  }, delay);
}

box.onclick = () => {
  if (waiting) {
    clearTimeout(timeout);
    box.textContent = 'Too Soon! Try Again';
    box.style.backgroundColor = '#f44336';
    waiting = false;
    setTimeout(startTest, 1500);
  } else if (startTime) {
    endTime = Date.now();
    const reactionTime = endTime - startTime;
    times.push(reactionTime);
    const avg = (times.reduce((a, b) => a + b, 0) / times.length).toFixed(0);
    box.textContent = `Time: ${reactionTime}ms`;
    box.style.backgroundColor = '#ccc';
    results.innerHTML = `Average: ${avg}ms<br>Attempts: ${times.length}`;
    startTime = null;
    setTimeout(startTest, 1500);
  }
};

function reset() {
  times = [];
  results.innerHTML = '';
  startTest();
}

// Start the first test
startTest();
