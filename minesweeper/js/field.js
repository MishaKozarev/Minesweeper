export {creatHtmlField, createCells, addCells, changeStyle};
import { BODY, FIELD, WRAPPER, HEADER, MAIN, FOOTER,
         TIME, NEW_GAME, COUNT, SWITCH, CHECKBOX, CHECKBOX_CHECK,
         RESULT, LIST_RESULT} from './elements.js';

function creatHtmlField () {
  WRAPPER.classList.add('wrapper');
  FIELD.classList.add('field');
  HEADER.classList.add('header');
  MAIN.classList.add('main');
  FOOTER.classList.add('footer');
  FIELD.classList.add('field');
  TIME.classList.add('time');
  NEW_GAME.classList.add('play');
  COUNT.classList.add('count');
  RESULT.classList.add('result');
  LIST_RESULT.classList.add('list__result');
  SWITCH.classList.add('swich');
  CHECKBOX.classList.add('swich__input');
  CHECKBOX_CHECK.classList.add('swich__check');
  CHECKBOX.setAttribute("type", "checkbox");
  BODY.append(WRAPPER);
  WRAPPER.append(HEADER, MAIN, FOOTER, LIST_RESULT);
  HEADER.append(TIME, NEW_GAME, SWITCH, COUNT);
  SWITCH.append(CHECKBOX, CHECKBOX_CHECK);
  MAIN.append(FIELD, RESULT);
  NEW_GAME.innerHTML = 'New Game'
  COUNT.innerHTML = '000';
  TIME.innerHTML = '000';
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
    if (cellsCount === 625) {
      BUTTON.style.width = `15px`
      BUTTON.style.height = `15px`
      BUTTON.style.fontSize = `7px`
    }
  }
}

function changeStyle (width, height) {
  FIELD.style.gridTemplateColumns = `repeat(${width}, 30px)`
  FIELD.style.width = `${width * 30}px`
  FIELD.style.height = `${height * 30}px`
  if (width === 25) {
    FIELD.style.width = `${width * 15}px`
    FIELD.style.height = `${height * 15}px`
    FIELD.style.gridTemplateColumns = `repeat(${width}, 15px)`
    FIELD.style.marginTop = `${height * 4}px auto`
  }
}
