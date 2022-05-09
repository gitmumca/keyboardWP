export function playSound(backSpace, english) {
  let numberSound = (english) ? 2 : 7;
  if (backSpace) { numberSound = 5; }

  const audio = new Audio();
  audio.src = `./src/sound${numberSound}.mp3`;
  audio.autoplay = true;
}

export function refreshFocus(code, keysCode) {
  for (let i = 0; i < 5; i += 1) {
    for (let j = 0; j < keysCode[i].length; j += 1) {
      if ((code !== '20') && (keysCode[i][j] === code)) {
        document.getElementById(`${i}${j}`).style.borderColor = 'lightgreen';
        setTimeout(() => { document.getElementById(`${i}${j}`).style.borderColor = ''; }, 200);
      }
    }
  }
}
