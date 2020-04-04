//localStorage
let local = document.querySelector('.local-block'),
  textArea = local.querySelector('#local-text'),
  localNav = local.querySelector('.local-nav');
  window.onload = saveHistory(textArea); //init saveHistory func on window's load

function saveHistory(elem) {//save chenges of text in textarea into the localStorage
  const key = elem.tagName.toLowerCase();
  if (localStorage[key]) { // if key exists on localStorage
    showButton(key, elem);
    elem.value = JSON.parse(localStorage[key]).pop();//display last item (history) of elem in LS on textarea
  }
  elem.addEventListener('input', setHistory(key, elem));
}

function setHistory(key, elem) { //set history to the ls
  const arr = [];
  return function () {
    arr.push(elem.value);
    localStorage.setItem(key, JSON.stringify(arr));
    showButton(key, elem);
  };
}

function showButton(key, elem) { //display buttons func
  const buttonPrev = elem.parentElement.querySelector('#prev'),
      buttonNext = elem.parentElement.querySelector('#next');

  addActiveClass(buttonPrev, buttonNext);
  buttonPrev.onclick = prevValue(key, elem);
  buttonNext.onclick = nextValue(key, elem);
}

function nextValue(key, elem) {
  return function () {
    let arrValue = JSON.parse(localStorage[key]);
    var index = arrValue.indexOf(elem.value);
    if (index < arrValue.length - 1) elem.value = arrValue[++index];
  };
}

function prevValue(key, elem) {
  return function () {
    let arrValue = JSON.parse(localStorage[key]);
    arrValue.forEach(function (value, i) {
      if (value === elem.value && i > 0) elem.value = arrValue[--i];
    });
  };
}

function addActiveClass() {
  for (let i = 0; i < arguments.length; i++) {
    if (!arguments[i].classList.contains('active')) arguments[i].classList.add('active');
  }
}
