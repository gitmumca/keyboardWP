import {
  btnNavi, getKeys, keysNavi, isNavi, SpeechRecognition,
} from './keys';
// import { refreshKeys } from './createBody';

export function clearArea() {
  document.querySelector('.text').value = '';
  document.querySelector('.text').focus();
}

function refreshKeys() {
  document.querySelectorAll('.btn_base').forEach((el) => {
    const keys = getKeys();
    el.textContent = keys[el.indI][el.indJ];
    if (isNavi(el.textContent)) { el.innerHTML = keysNavi[el.textContent]; }
    if (el.textContent === 'Shift2') { el.textContent = 'Shift'; }
    if (el.textContent === 'Space') { el.textContent = ''; }
  });
}

export function initBtn() {
  if (document.documentElement.clientWidth < 799) {
    document.querySelector('.micro_img').src = (btnNavi.microphone) ? './src/assets/micro24.png' : './src/assets/microOff24.png';
    document.querySelector('.sound_img').src = (btnNavi.soundOff) ? './src/assets/soundOff24.png' : './src/assets/sound24.png';
    document.querySelector('.lang_img').src = (btnNavi.english) ? './src/assets/english24.png' : './src/assets/russian24.png';
    document.querySelector('.clean_img').src = './src/assets/clean24.png';
    document.querySelector('.hide_img').src = (btnNavi.hideKeys) ? './src/assets/hide24.png' : './src/assets/show24.png';
  } else {
    document.querySelector('.micro_img').src = (btnNavi.microphone) ? './src/assets/micro.png' : './src/assets/microOff.png';
    document.querySelector('.sound_img').src = (btnNavi.soundOff) ? './src/assets/soundOff.png' : './src/assets/sound.png';
    document.querySelector('.lang_img').src = (btnNavi.english) ? './src/assets/english.png' : './src/assets/russian.png';
    document.querySelector('.clean_img').src = './src/assets/clean.png';
    document.querySelector('.hide_img').src = (btnNavi.hideKeys) ? './src/assets/hide.png' : './src/assets/show.png';
  }
  refreshKeys();
}

export function soundImg() {
  btnNavi.soundOff = !btnNavi.soundOff;
  initBtn();
}

export function hideKeyBoard() {
  btnNavi.hideKeys = !btnNavi.hideKeys;
  if (btnNavi.hideKeys) { document.querySelector('.key_body').style.visibility = 'hidden'; } else { document.querySelector('.key_body').style.visibility = 'visible'; }
  initBtn();
}

export function microOnOff() {
  btnNavi.microphone = !btnNavi.microphone;
  initBtn();

  if (btnNavi.microphone) {
    SpeechRecognition.lang = (btnNavi.english) ? 'en-US' : 'ru-RU';
    SpeechRecognition.start();
  } else {
    SpeechRecognition.stop();
  }
}
