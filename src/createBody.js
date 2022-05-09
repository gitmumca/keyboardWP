import {
  keys70, keysSound, keysNavi, btnNavi, getKeys, isNavi, isClickShow,
} from './keys';
import {
  soundImg, hideKeyBoard, microOnOff, clearArea, initBtn,
} from './initBtn';

import leftRightUpDown from './leftRightUpDown';
import { playSound } from './playRefresh';

function refreshKeys() {
  document.querySelectorAll('.btn_base').forEach((el) => {
    const keys = getKeys();
    el.textContent = keys[el.indI][el.indJ];
    if (isNavi(el.textContent)) { el.innerHTML = keysNavi[el.textContent]; }
    if (el.textContent === 'Shift2') { el.textContent = 'Shift'; }
    if (el.textContent === 'Space') { el.textContent = ''; }
  });
}

function changeLanguage() {
  btnNavi.english = !btnNavi.english;
  localStorage.setItem('english', btnNavi.english);

  initBtn();
  refreshKeys();
}

export function addToArea(newSymbol) {
  const textArea = document.querySelector('.text');
  const pos = textArea.selectionStart;

  if (newSymbol === 'Backspace') {
    textArea.value = textArea.value.slice(0, pos - 1)
    + textArea.value.slice(pos, textArea.value.length);
    textArea.selectionStart = pos - 1;
    textArea.selectionEnd = pos - 1;
  } else if (newSymbol === 'Del') {
    textArea.value = textArea.value.slice(0, pos)
    + textArea.value.slice(pos + 1, textArea.value.length);
    textArea.selectionStart = pos;
    textArea.selectionEnd = pos;
  } else { // буквы/цифра/символ
    textArea.value = textArea.value.slice(0, pos) + newSymbol
    + textArea.value.slice(pos, textArea.value.length);
    textArea.selectionStart = pos + 1;
    textArea.selectionEnd = pos + 1;
  }
  textArea.focus();
}

function mouseToArea() {
  const keys = getKeys();
  const mouseKey = keys[this.indI][this.indJ];

  if (!btnNavi.soundOff) { playSound(keysSound.includes(mouseKey), btnNavi.english); }

  if (mouseKey === 'Backspace' || mouseKey === 'Del') { addToArea(mouseKey); } else if (isNavi(mouseKey)) { leftRightUpDown(mouseKey); } else if (mouseKey === 'Caps Lock') {
    document.getElementById('20').classList.toggle('capslock');
    btnNavi.capslock = !btnNavi.capslock;
    refreshKeys();
  } else if ((mouseKey === 'Shift') || (mouseKey === 'Shift2')) {
    document.getElementById('30').classList.toggle('shift');
    document.getElementById('313').classList.toggle('shift');
    btnNavi.shift = !btnNavi.shift;
    refreshKeys();
  } else if (mouseKey === 'Enter') { addToArea('\r\n'); } else if (mouseKey === 'Tab') { addToArea('\t'); } else if (mouseKey === 'Space') { addToArea(' '); } else if (isClickShow(mouseKey)) {
    addToArea(mouseKey);
  }
}

export function createDocument() {
  const body = document.querySelector('.body');
  const script = document.querySelector('.script');

  const divMain = document.createElement('div'); // main
  divMain.classList.add('main');
  body.insertBefore(divMain, script);

  const divTitle = document.createElement('div'); // title
  divTitle.classList.add('title');
  divMain.appendChild(divTitle);

  const flexTitle = document.createElement('div');
  flexTitle.classList.add('flex-title');
  divTitle.appendChild(flexTitle);

  const h1 = document.createElement('h1');
  h1.textContent = 'keyBoard';
  flexTitle.appendChild(h1);

  const flexLang = document.createElement('div');
  flexLang.classList.add('flex-lang');
  flexTitle.appendChild(flexLang);

  const MicroOnBtn = document.createElement('button');
  MicroOnBtn.classList.add('micro');
  MicroOnBtn.onclick = microOnOff;
  flexLang.appendChild(MicroOnBtn);

  const MicroOnImg = document.createElement('img');
  MicroOnImg.classList.add('micro_img');
  MicroOnBtn.appendChild(MicroOnImg);

  const SoundOnBtn = document.createElement('button');
  SoundOnBtn.classList.add('sound');
  SoundOnBtn.onclick = soundImg;
  flexLang.appendChild(SoundOnBtn);

  const SoundOnImg = document.createElement('img');
  SoundOnImg.classList.add('sound_img');
  SoundOnBtn.appendChild(SoundOnImg);

  const languageBtn = document.createElement('button');
  languageBtn.classList.add('language');
  languageBtn.onclick = changeLanguage;
  flexLang.appendChild(languageBtn);

  const languageImg = document.createElement('img');
  languageImg.classList.add('lang_img');
  languageBtn.appendChild(languageImg);

  const clearBtn = document.createElement('button');
  clearBtn.classList.add('clean');
  clearBtn.onclick = clearArea;
  flexLang.appendChild(clearBtn);

  const clearImg = document.createElement('img');
  clearImg.classList.add('clean_img');
  clearBtn.appendChild(clearImg);

  const hideBtn = document.createElement('button');
  hideBtn.classList.add('hide');
  hideBtn.onclick = hideKeyBoard;
  flexLang.appendChild(hideBtn);

  const hideImg = document.createElement('img');
  hideImg.classList.add('hide_img');
  hideBtn.appendChild(hideImg);

  const h2 = document.createElement('h2');
  h2.textContent = 'переключение языка Ctrl + Alt';
  divTitle.appendChild(h2);

  const divContainer = document.createElement('div'); // container
  divContainer.classList.add('container');
  divMain.appendChild(divContainer);

  const flexKey = document.createElement('div');
  flexKey.classList.add('flex_key');
  divContainer.appendChild(flexKey);

  const textArea = document.createElement('textarea');
  textArea.classList.add('text');
  //  textArea.disabled = 'true';
  flexKey.appendChild(textArea);

  const keyBody = document.createElement('div');
  keyBody.classList.add('key_body');
  flexKey.appendChild(keyBody);

  const keys = getKeys();

  for (let i = 0; i < 5; i += 1) {
    const keyLine = document.createElement('div');
    keyLine.classList.add('key_line');
    keyBody.appendChild(keyLine);

    for (let j = 0; j < keys[i].length; j += 1) {
      const btnBase = document.createElement('button');
      btnBase.classList.add('btn_base');
      if (keys70.includes(keys[i][j])) { btnBase.classList.add('btn_base70'); }

      btnBase.textContent = keys[i][j];

      if (isNavi(keys[i][j])) { btnBase.innerHTML = keysNavi[keys[i][j]]; }

      if (keys[i][j] === 'Shift2') { btnBase.textContent = 'Shift'; }
      if (keys[i][j] === 'Space') {
        btnBase.classList.add('btn_baseSpace');
        btnBase.textContent = '';
      }

      btnBase.indI = i;
      btnBase.indJ = j;
      btnBase.id = `${i}${j}`;

      btnBase.onclick = mouseToArea;
      keyLine.appendChild(btnBase);
    }
  }

  initBtn();
//  refreshKeys();
}
