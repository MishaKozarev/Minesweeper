import { creatHtmlSetting } from './js/setting.js'
import { creatHtmlField, addCells, changeStyle } from './js/field.js'
import { FIELD, TIME, COUNT, START, NEW_GAME, RADIO, INPUT_BOMBS, COUNT_BOMBS, LIST_BTN, LIST_RESULT, MUTE, FLAG} from './js/elements.js';
import { playMusic } from './js/music.js';
import { changeTheme } from './js/theme.js';
import { winsGame, looseGame } from './js/endGame.js';
let sound;
let width = 10;
let height = 10;
let bombsCount = 10;
let cellsCount = width * height;
let closeCount = cellsCount;
let level = '';
let move = 0;
let bombs = [];
let isSound = true;
let flag = bombsCount;
creatHtmlField();
creatHtmlSetting();
changeTheme();



// ------------------ NEW GAME -------------------------------
function startGame () {
  START.addEventListener('click', () => {
    sound = 0;
    playMusic(sound, isSound);
    choiceLevel (level);
    START.disabled = true;
  });
}
startGame ();

function newGame () {
  NEW_GAME.addEventListener('click', () => {
    location. reload();
  });
}
newGame ();
 // -----------------START TIMER --------------------------
function startTimer () {
  let seconds = 0;
  TIME.textContent = String(seconds).padStart(3, '0')
  let timerId = setInterval(() => {
    seconds++
    TIME.textContent = String(seconds).padStart(3, '0')
      if (sound === 2 || sound === 3) clearInterval(timerId)
  }, 1000)
}

INPUT_BOMBS.addEventListener('input', () => {
  let count = INPUT_BOMBS.value;
  COUNT_BOMBS.innerHTML = count;
  bombsCount = count;
  return bombsCount;
})

// ------------------ CHOICE LEVEL -----------------------
function choiceLevel (level) {
  const SETTING_BTNS  = document.querySelectorAll('.input-btn')
  for (let i = 0; i < SETTING_BTNS.length; i ++) {
    if (SETTING_BTNS[i].checked) {
      level = RADIO[i].value
    }
  }
  if (level === 'setting-easy') {
    width = 10;
    height = 10;
    cellsCount = width * height;
    closeCount = cellsCount;

  }
  if (level === 'setting-medium') {
    width = 15;
    height = 15;
    cellsCount = width * height;
    closeCount = cellsCount;


  }
  if (level === 'setting-hard') {
    width = 25;
    height = 25;
    cellsCount = width * height;
    closeCount = cellsCount;
  }
  game (width, height, bombsCount, cellsCount, closeCount);
}

//  ---------------------- GAME ------------------------
function game (width, height, bombsCount, cellsCount, closeCount) {
  startTimer ();
  changeStyle (width, height);
  addCells (cellsCount);
  let cells = [...FIELD.children];
  FLAG.innerHTML = flag;

  FIELD.addEventListener('click', (event) => {
    console.log(isSound)
    if(event.target.tagName !== 'BUTTON') {
      return;
    }
    sound = 1;
    playMusic(sound, isSound);
    move ++
    COUNT.innerHTML = move;

    const indexCurrent = cells.indexOf(event.target);
    if (move === 1) {
      bombs = [...Array(cellsCount).keys()]
      .sort(() => Math.random() - 0.5)
      .filter(number => number !==indexCurrent)
      .slice(0, bombsCount);
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
        sound = 2;
        for (let i = 0; i < bombsCount; i ++) {
          cells[bombs[i]].innerHTML = '💣';
          cell.style.background = 'red';
          cells[bombs[i]].disabled = true;
          // console.log(cells);
          cells.forEach(element => {
            element.disabled = true;
          });
          playMusic(sound, isSound);
          looseGame();
        }
        return;
      }
      closeCount --;

      if (closeCount <= bombsCount) {
        let seconds = TIME.textContent;
        sound = 3;
        for (let i = 0; i < bombsCount; i ++) {
          cells[bombs[i]].innerHTML = '💣';
          cells[bombs[i]].disabled = true;
        }
        playMusic(sound, isSound);
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
      flag ++;
      FLAG.innerHTML = flag;
      sound = 1;
      playMusic(sound, isSound);
    } else {
      cell.innerHTML = '🚩';
      flag --;
      FLAG.innerHTML = flag;
      sound = 1;
      playMusic(sound, isSound);
    }
  }

  function isBomb (row, column) {
    if (!isValid (row, column)) return false;
    let indexBombs = row * width + column;
    return bombs.includes(indexBombs);
  }
}


LIST_BTN.addEventListener('click', () => {
  LIST_RESULT.classList.toggle('block')
});


LIST_RESULT.innerHTML = JSON.parse(localStorage.getItem('bestResults'))

MUTE.addEventListener('click', () => {
  MUTE.classList.toggle('pause')
  MUTE.classList.contains('pause') ? isSound = false : isSound = true
});

