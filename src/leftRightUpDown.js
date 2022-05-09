export default function leftRightUpDown(btn) {
  const textArea = document.querySelector('.text');
  const pos = textArea.selectionStart;

  if (btn === 'left') {
    if (pos > 0) {
      textArea.selectionStart = pos - 1;
      textArea.selectionEnd = pos - 1;
    }
  } else if (btn === 'right') {
    textArea.selectionStart = pos + 1;
    textArea.selectionEnd = pos + 1;
  } else if (btn === 'up') {
    const strLeft = document.querySelector('.text').value.slice(0, pos);
    const arr = strLeft.split('\n');
    if (arr.length > 1) {
      const posStr = arr[arr.length - 1].length;
      const posPrev = (arr[arr.length - 2].length > posStr) ? posStr : arr[arr.length - 2].length;
      textArea.selectionStart = arr.filter((el, index) => index < arr.length - 2).join('').length + (arr.length - 2) + posPrev;
      textArea.selectionEnd = textArea.selectionStart;
    } else {
      textArea.selectionStart = 0;
      textArea.selectionEnd = 0;
    }
  } else if (btn === 'down') {
    const strRight = document.querySelector('.text').value.slice(pos);
    const arr = strRight.split('\n');
    if (arr.length > 1) {
      const posStr = arr[0].length;
      const posNext = (arr[1].length > posStr) ? posStr : arr[1].length;

      textArea.selectionStart = document.querySelector('.text').value.length - arr.filter((el, index) => index > 1).join('').length - (arr.length - 2) - posNext;
      textArea.selectionEnd = textArea.selectionStart;
    } else {
      textArea.selectionStart = document.querySelector('.text').value.length;
      textArea.selectionEnd = textArea.selectionStart;
    }
  }
  textArea.focus();
}
