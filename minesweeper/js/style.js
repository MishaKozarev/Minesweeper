export { changeStyle };
import { FIELD } from './elements.js';

function changeStyle (width, height) {
  FIELD.style.gridTemplateColumns = `repeat(${width}, 30px)`
  FIELD.style.width = `${width * 30}px`
  FIELD.style.height = `${height * 30}px`
}