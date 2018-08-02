'use strict';
const xhrP = new XMLHttpRequest();
xhrP.addEventListener('load', showP);
xhrP.addEventListener('error', e => console.error(e));

function showP(event) { 
  let number = xhrP.responseText;
  console.log(number + ' P');

  const cards = document.querySelectorAll('.pooling > div');
  Array.from(cards).forEach(card => card.classList.remove('flip-it'));
  
  const current = Array.from(cards).find(el => el.textContent === number);
  current.classList.add('flip-it');
}

let inter = setInterval(() => {
  xhrP.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
    xhrP.send();
}, 6000); 