const BODY = document.querySelector('.body');
const FIELD = document.createElement('div');
const HEADER = document.createElement('header');
const MAIN = document.createElement('main');
FIELD.classList.add('field');
HEADER.classList.add('header');
MAIN.classList.add('main');
FIELD.classList.add('field');
BODY.append(HEADER, MAIN);
MAIN.append(FIELD);

let width = 15;
let height = 15;
let bombs_count = 15;
let move = 0;
let cellsCount = width * height;
let closeCount = cellsCount;
startGame (15, 15, 15);


const createCells = () => {
  const BUTTON = document.createElement('button');
  BUTTON.className = 'button';
  BUTTON.innerText = null;
  return BUTTON;
};
for (let i = 0; i < cellsCount; i ++) {
  const BUTTON = createCells();
  FIELD.appendChild(BUTTON);
}


const cells = [...FIELD.children];
console.log(cells)
function startGame (width, height, bombs_count) {
  FIELD.addEventListener('click', (event) => {
    if(event.target.tagName !== 'BUTTON') {
      return;
    }
    move ++

    const indexCurrent = cells.indexOf(event.target);
    if (move === 1) {
      bombs = [...Array(cellsCount).keys()]
      .sort(() => Math.random() - 0.5)
      .filter(number => number !==indexCurrent)
      .slice(0, bombs_count);
    }
    console.log(move)
    console.log(indexCurrent)
    console.log(bombs)
    console.log(closeCount)
    console.log(bombs_count)

    let colum = indexCurrent % width;
    let row = Math.floor(indexCurrent / width);
    open(row, colum)
  });

  FIELD.addEventListener('contextmenu', (event) => {
    event.preventDefault()
    if(event.target.tagName !== 'BUTTON') {
      return;
    }
    const indexCurrent = cells.indexOf(event.target);
    let colum = indexCurrent % width;
    let row = Math.floor(indexCurrent / width);
    noteBomb(row, colum)
  });

  function isValid (row, colum) {
    return row >= 0
    && row < height
    && colum >= 0
    && colum < width
  }

  function getCount (row, colum) {
    let count = 0;
    for(let x = -1; x <= 1; x ++) {
      for(let y = -1; y <= 1; y ++) {
        if (isBomb(row + y, colum + x)) {
          count ++;
        }
      }
    }
    return count;
  }

  function noteBomb (row, colum) {
    if (!isValid(row, colum)) return;
    let indexBombs = row * width + colum;
    let cell = cells[indexBombs];
    if (cell.disabled === true) return;
    if (cell.innerHTML === '🚩') {
      cell.innerHTML = ' ';
    } else {
      cell.innerHTML = '🚩';
    }
  }

  function open (row, colum) {
    if (!isValid(row, colum)) return;
    let indexBombs = row * width + colum;
    let cell = cells[indexBombs];
    if (cell.disabled === true) return;
    cell.disabled = true;

    if (isBomb(row, colum)) {
      for (let i = 0; i < bombs_count; i ++) {
        cells[bombs[i]].innerHTML = '💣';
      }
      return;
    }
    closeCount --;

    if (closeCount <= bombs_count) {
       return;

    }

    const count = getCount (row, colum);
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
        open (row + y, colum + x);
      }
    }
  }

  function isBomb (row, colum) {
    if (!isValid (row, colum)) return false;
    let indexBombs = row * width + colum;
    return bombs.includes(indexBombs);
  }
}



// let music = new Audio();
// export function playMusic(src) {
//   music.pause();
//   music = new Audio(src);
//   music.volume = 0.5;

//   music.play();
// }