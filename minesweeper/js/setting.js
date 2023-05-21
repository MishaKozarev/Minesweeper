export {creatHtmlSetting}
import {FOOTER, INPUT_EASY, INPUT_MEDIUM,
  INPUT_HARD, INPUT_BOMBS, COUNT_BOMBS, LIST_BTN} from './elements.js'

function creatHtmlSetting () {
  const SETTING = document.createElement('div');
  SETTING.classList.add('setting');

  const LABEL_EASY = document.createElement('label');
  const LABEL_MEDIUM = document.createElement('label');
  const LABEL_HARD = document.createElement('label');
  const LABEL_BOMBS = document.createElement('label');
  const BTN_SETTING = document.createElement('div');

  INPUT_EASY.classList.add("a");
  INPUT_MEDIUM.classList.add("a");
  INPUT_HARD.classList.add("a");
  COUNT_BOMBS.classList.add("count-bombs");
  LIST_BTN.classList.add("count-bombs");
  BTN_SETTING.classList.add("setting__btn");
  LABEL_EASY.classList.add("setting__label");
  LABEL_MEDIUM.classList.add("setting__label");
  LABEL_HARD.classList.add("setting__label");
  LABEL_BOMBS.classList.add("setting__label");
  INPUT_EASY.setAttribute("type", "radio");
  INPUT_MEDIUM.setAttribute("type", "radio");
  INPUT_HARD.setAttribute("type", "radio");
  INPUT_BOMBS.setAttribute("type", "range");
  INPUT_BOMBS.setAttribute("min", "1");
  INPUT_BOMBS.setAttribute("max", "99");
  INPUT_BOMBS.setAttribute("value", "10");
  INPUT_EASY.setAttribute("name", "lavel");
  INPUT_MEDIUM.setAttribute("name", "lavel");
  INPUT_HARD.setAttribute("name", "lavel");
  INPUT_EASY.setAttribute("value", "setting-easy");
  INPUT_MEDIUM.setAttribute("value", "setting-medium");
  INPUT_HARD.setAttribute("value", "setting-hard");
  INPUT_EASY.setAttribute('checked', 'true');
  LABEL_EASY.innerText = 'EASY';
  LABEL_MEDIUM.innerText = 'MEDIUM';
  LABEL_HARD.innerText = 'HARD';
  LABEL_BOMBS.innerText = 'BOMBS';
  COUNT_BOMBS.innerHTML = '10'
  LIST_BTN.innerHTML = 'LIST'
  FOOTER.append(SETTING, BTN_SETTING, COUNT_BOMBS, LIST_BTN)
  SETTING.append(LABEL_EASY, LABEL_MEDIUM, LABEL_HARD,
                LABEL_BOMBS);
  LABEL_EASY.append(INPUT_EASY);
  LABEL_MEDIUM.append(INPUT_MEDIUM);
  LABEL_HARD.append(INPUT_HARD);
  LABEL_BOMBS.append(INPUT_BOMBS);

  BTN_SETTING.addEventListener('click', () => {
    SETTING.classList.toggle('block')
    // SETTING.style.display = 'block'
  })
  }
