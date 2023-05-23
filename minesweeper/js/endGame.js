export {winsGame, looseGame };
import { RESULT, LIST_RESULT } from './elements.js';

function winsGame (seconds, move, width) {
  RESULT.innerHTML = `Hooray! You found all mines in ${seconds } seconds and ${move} moves!`
  RESULT.style.display = 'block'
  let bestResults = JSON.parse(localStorage.getItem('bestResults')) || [];
  bestResults.push(`     Victory for ${seconds } seconds and ${move} moves!`);
  if (bestResults.length > 11) {
    bestResults.shift()
  }
  localStorage.setItem('bestResults', JSON.stringify(bestResults));
  LIST_RESULT.innerHTML = bestResults.join(',');
  // LIST_RESULT.innerHTML = JSON.parse(localStorage.getItem('bestResults'));
  console.log(bestResults.join(','))
}

function looseGame () {
  RESULT.style.display = 'block'
  RESULT.innerHTML = `Game over. Try again`
}

