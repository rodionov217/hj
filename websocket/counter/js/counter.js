'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');
connection.addEventListener('message', recieve);
  
window.addEventListener('unload', () => { 
  connection.addEventListener('error', event => console.error(event));
  connection.close(1000);
})

function recieve(event) { 
  const counter = document.querySelector('.counter');
  const error = document.querySelector('output.errors');
  const message = JSON.parse(event.data);
  counter.textContent = message.connections;
  error.textContent = message.errors;
}