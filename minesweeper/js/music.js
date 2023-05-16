export {playMusic};
import {PLAY_LIST} from './play-list.js'
function playMusic(treck) {
  let music = new Audio();
  music.src = PLAY_LIST[treck].src;
  music.volume = 0.1;
  music.play();
}