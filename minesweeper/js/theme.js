export {changeTheme}
import { BODY, SWITCH, WRAPPER } from './elements.js';

function changeTheme () {
  SWITCH.addEventListener('change', ()=>{
    BODY.classList.toggle('darck');
    WRAPPER.classList.toggle('darck');
  })
}

