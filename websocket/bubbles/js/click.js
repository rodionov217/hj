'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

connection.addEventListener('open', (event) => showBubbles(event.currentTarget));

document.addEventListener('click', (event) => { 
  let x = event.clientX;
  let y = event.clientY;
  connection.send(JSON.stringify({x: x, y: y}));
})
