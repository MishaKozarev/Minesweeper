export { playGame }
import { startTimer } from './timer.js'
import { PLAY } from './elements.js';

let width = 15;
let height = 15;
let bombs_count = 35;

function playGame () {
  PLAY.addEventListener('click', () => {
    startTimer();
  })
}
