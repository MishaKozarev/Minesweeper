export {startTimer, stopTimer };
import { TIME } from './elements.js';

function startTimer () {
  let seconds = 0;
  // let treck;
  TIME.textContent = String(seconds).padStart(3, '0')

  let timerId = setInterval(() => {
    seconds++
    TIME.textContent = String(seconds).padStart(3, '0')
      if (seconds === 999) clearInterval(timerId)
  }, 1000)
}

function stopTimer (timerId) {
  clearInterval(timerId)
}

