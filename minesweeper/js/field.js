export {creatField, createCells, addCells};
import { BODY, FIELD, WRAPPER, HEADER, MAIN, TIME, PLAY, COUNT} from './elements.js';

function creatField () {
  WRAPPER.classList.add('wrapper');
  FIELD.classList.add('field');
  HEADER.classList.add('header');
  MAIN.classList.add('main');
  FIELD.classList.add('field');
  TIME.classList.add('time');
  PLAY.classList.add('play');
  COUNT.classList.add('count');
  BODY.append(WRAPPER);
  WRAPPER.append(HEADER, MAIN);
  HEADER.append(TIME, PLAY, COUNT);
  MAIN.append(FIELD);
  PLAY.innerHTML = '&#128513;'
}
const createCells = () => {
  const BUTTON = document.createElement('button');
  BUTTON.className = 'button';
  BUTTON.innerText = null;
  return BUTTON;
};

function addCells (cellsCount) {
  for (let i = 0; i < cellsCount; i ++) {
    const BUTTON = createCells();
    FIELD.appendChild(BUTTON);
  }
}