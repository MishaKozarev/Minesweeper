export {playMusic};
import {PLAY_LIST} from './play-list.js'

function playMusic(sound, isSound) {
  let music = new Audio();
  music.src = PLAY_LIST[sound].src;
  music.volume = 0.1;
  if (isSound === true) {
    music.play();
  } else {
    music.pause();
  }
}

