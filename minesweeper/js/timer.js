export {startTimer };
import { TIME } from './elements.js';

function startTimer () {
  let seconds = 0;
  let treck;
  TIME.textContent = String(seconds).padStart(3, '0')

  let timerId = setInterval(() => {
    if (treck === '10') clearInterval(timerId)
    seconds++
    TIME.textContent = String(seconds).padStart(3, '0')
  }, 1000)
}

// function stopTimer () {
//   clearInterval(timerId)
// }