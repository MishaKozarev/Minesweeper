export {winsGame, looseGame };
import { RESULT, LIST_RESULT } from './elements.js';

function winsGame (seconds, move) {
  RESULT.innerHTML = `Hooray! You found all mines in ${seconds } seconds and ${move} moves!`
  LIST_RESULT.innerHTML = `Мictory for ${seconds } seconds and ${move} moves!`
}

function looseGame () {
  RESULT.innerHTML = `Game over. Try again`
}