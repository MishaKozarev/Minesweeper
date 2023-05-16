export {creatField, createCells, addCells};
import { BODY, FIELD, WRAPPER, HEADER, MAIN, TIME,
         PLAY, COUNT, SWITCH, CHECKBOX, CHECKBOX_CHECK,
         RESULT} from './elements.js';

function creatField () {
  WRAPPER.classList.add('wrapper');
  FIELD.classList.add('field');
  HEADER.classList.add('header');
  MAIN.classList.add('main');
  FIELD.classList.add('field');
  TIME.classList.add('time');
  PLAY.classList.add('play');
  COUNT.classList.add('count');
  RESULT.classList.add('result');
  SWITCH.classList.add('swich');
  CHECKBOX.classList.add('swich__input');
  CHECKBOX_CHECK.classList.add('swich__check');
  CHECKBOX.setAttribute("type", "checkbox");
  BODY.append(WRAPPER);
  WRAPPER.append(HEADER, MAIN);
  HEADER.append(TIME, PLAY, RESULT, SWITCH, COUNT);
  SWITCH.append(CHECKBOX, CHECKBOX_CHECK);
  MAIN.append(FIELD);
  PLAY.innerHTML = 'New Game'
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

