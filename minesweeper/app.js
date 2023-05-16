import { startTimer, stopTimer } from './js/timer.js'
import { PLAY } from './js/elements.js';
import { creatField, addCells } from './js/field.js'
import { FIELD, TIME, COUNT} from './js/elements.js';
import { playMusic } from './js/music.js';
import { changeTheme } from './js/theme.js';
import { winsGame, looseGame } from './js/endGame.js';
let treck = 0;

creatField();
changeTheme();

function playGame () {
  PLAY.addEventListener('click', () => {
    startGame (15, 15, 55);
    treck = 0;
    playMusic(treck);
    startTimer();
  })
}


playGame ();
let move = 0;
let width = 15;
let height = 15;
let cellsCount = width * height;
let bombs = [];
COUNT.innerHTML = move;
TIME.innerHTML = '000';
let closeCount = cellsCount;
addCells (cellsCount);
const cells = [...FIELD.children];


function startGame (width, height, bombs_count) {
  FIELD.addEventListener('click', (event) => {
    if(event.target.tagName !== 'BUTTON') {
      return;
    }
    console.log(treck)
    treck = 1;
    playMusic(treck);
    move ++
    COUNT.innerHTML = move;

    const indexCurrent = cells.indexOf(event.target);
    if (move === 1) {
      bombs = [...Array(cellsCount).keys()]
      .sort(() => Math.random() - 0.5)
      .filter(number => number !==indexCurrent)
      .slice(0, bombs_count);
    }
    let column = indexCurrent % width;
    let row = Math.floor(indexCurrent / width);
    open(row, column);

    function open (row, column) {
      if (!isValid(row, column)) return;
      let indexBombs = row * width + column;
      let cell = cells[indexBombs];
      cell.classList.add('active')
      if (cell.disabled === true) return;
      cell.disabled = true;
      if (isBomb(row, column)) {
        treck = 2;
        for (let i = 0; i < bombs_count; i ++) {
          cells[bombs[i]].innerHTML = '💣';
          playMusic(treck);
          looseGame();
        }
        return;
      }
      closeCount --;

      if (closeCount <= bombs_count) {
        let seconds = TIME.textContent;
        treck = 3;
        playMusic(treck);
        winsGame (seconds, move);
        return;
      }
      const count = getCount (row, column);
      if (count !== 0) {
        cell.innerHTML = count;
        if (cell.innerHTML === '1') {
          cell.classList.add('blue')
        }
        if (cell.innerHTML === '2') {
          cell.classList.add('green')
        }
        if (cell.innerHTML === '3') {
          cell.classList.add('red')
        }
        if (cell.innerHTML === '4') {
          cell.classList.add('blueviolet')
        }
        if (cell.innerHTML === '5') {
          cell.classList.add('brown')
        }
        return;
      }
      for(let x = -1; x <= 1; x ++) {
        for(let y = -1; y <= 1; y ++) {
          open (row + y, column + x);
        }
      }
    }
  });


  FIELD.addEventListener('contextmenu', (event) => {
    event.preventDefault()
    if(event.target.tagName !== 'BUTTON') {
      return;
    }
    const indexCurrent = cells.indexOf(event.target);
    let column = indexCurrent % width;
    let row = Math.floor(indexCurrent / width);
    noteBomb(row, column)
  });

  function isValid (row, column) {
    return row >= 0
    && row < height
    && column >= 0
    && column < width
  }

  function getCount (row, column) {
    let count = 0;
    for(let x = -1; x <= 1; x ++) {
      for(let y = -1; y <= 1; y ++) {
        if (isBomb(row + y, column + x)) {
          count ++;
        }
      }
    }
    return count;
  }

  function noteBomb (row, column) {
    if (!isValid(row, column)) return;
    let indexBombs = row * width + column;
    let cell = cells[indexBombs];
    if (cell.disabled === true) return;
    if (cell.innerHTML === '🚩') {
      cell.innerHTML = ' ';
      treck = 1;
      playMusic(treck);
    } else {
      cell.innerHTML = '🚩';
      treck = 1;
      playMusic(treck);
    }
  }

  

  function isBomb (row, column) {
    if (!isValid (row, column)) return false;
    let indexBombs = row * width + column;
    return bombs.includes(indexBombs);
  }

}




