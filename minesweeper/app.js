import { creatField, createCells, addCells } from './js/field.js'
import { playGame } from './js/play.js'
import { FIELD, TIME, COUNT} from './js/elements.js';

creatField();
playGame();
startGame (15, 15, 35);

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
    open(row, column)
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
    } else {
      cell.innerHTML = '🚩';
    }
  }

  function open (row, column) {
    if (!isValid(row, column)) return;
    let indexBombs = row * width + column;
    let cell = cells[indexBombs];
    cell.classList.add('active')
    if (cell.disabled === true) return;
    cell.disabled = true;
    if (isBomb(row, column)) {
      for (let i = 0; i < bombs_count; i ++) {
        cells[bombs[i]].innerHTML = '💣';
      }
      return;
    }
    closeCount --;
    if (closeCount <= bombs_count) {
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

  function isBomb (row, column) {
    if (!isValid (row, column)) return false;
    let indexBombs = row * width + column;
    return bombs.includes(indexBombs);
  }
}


