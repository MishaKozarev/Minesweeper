export {music};
let music = new Audio();
export function playMusic(src) {
  music.pause();
  music = new Audio(src);
  music.volume = 0.5;
  music.play();
}