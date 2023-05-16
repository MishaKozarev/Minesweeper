export {startTimer};
import { TIME } from './elements.js';

function startTimer () {
  let seconds = 0

  TIME.textContent = String(seconds).padStart(3, '0')

  setInterval(() => {
    seconds++
    TIME.textContent = String(seconds).padStart(3, '0')
  }, 1000)
}
