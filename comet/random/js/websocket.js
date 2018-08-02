'use strict';

const wss = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
wss.addEventListener('open', () => console.log('open'));
wss.addEventListener('message', show);

function show(event) {
  let number = event.data;
  console.log(number + ' WS');

  const cards = document.querySelectorAll('.websocket > div'); 
  Array.from(cards).forEach(card => card.classList.remove('flip-it'));

  const current = Array.from(cards).find(el => el.textContent === number);
  current.classList.add('flip-it');
}

