import keysCode from './keysCode';
import {
  btnNavi, keysSound, getKeys, isCharShow,
} from './keys';
import { initBtn } from './initBtn';

import { playSound, refreshFocus } from './playRefresh';
import { addToArea, createDocument } from './createBody';
import './css/style.css';

window.addEventListener('load', () => { createDocument(); });

function correctSymbol(newSymbol) {
  const textArea = document.querySelector('.text');
  const { value } = textArea;
  const start = textArea.selectionStart;

  document.querySelector('.text').value = value.slice(0, start - 1) + newSymbol + value.slice(start);
  document.querySelector('.text').selectionStart = start;
  document.querySelector('.text').selectionEnd = start;
}

document.addEventListener('keydown', (e) => {
  if ((e.key === 'Control') && (e.altKey) && (e.ctrlKey)) {
    btnNavi.english = !btnNavi.english;
    localStorage.setItem('english', btnNavi.english);
    initBtn();
  }

  document.querySelector('.text').focus();

  if (!btnNavi.soundOff) { playSound(keysSound.includes(e.key), btnNavi.english); }

  if (e.key === 'CapsLock') {
    document.getElementById('20').classList.toggle('capslock');
    btnNavi.capslock = !btnNavi.capslock;
  } else if (e.key === 'Shift') {
    btnNavi.shift = !btnNavi.shift;
  }
  initBtn();
  refreshFocus(e.keyCode, keysCode);
});

document.addEventListener('keyup', (e) => {
//  console.log(e, e.Code, e.Code === 'Space');
  if (e.code === 'Tab') { addToArea('\t'); return; }
  if (e.code === 'Space') { return; }

  for (let i = 0; i < 5; i += 1) {
    for (let j = 0; j < keysCode[i].length; j += 1) {
      if (keysCode[i][j] === e.keyCode) {
        if (isCharShow(e.keyCode)) { correctSymbol(getKeys()[i][j]); }
      }
    }
  }
});
