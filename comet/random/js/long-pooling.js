'use strict';
 
function connect() {
  const xhr = new XMLHttpRequest();
  const url = 'https://neto-api.herokuapp.com/comet/long-pooling';

  xhr.onreadystatechange = function() {
    if (this.readyState !== 4) {
      return;
    }
    if (this.status === 200 || this.status === 202) {
      if (this.responseText) { 
        console.log(this.responseText + ' LP');
        showLP(this.responseText);
      }
      connect(); 
      return;
    }
    if (this.status === 502) { 
      console.log(this.statusText);
    }
    setTimeout(connect, 1000);
  }
  xhr.open("GET", url, true);
  xhr.send();
} 

connect();

function showLP(data) { 
  const number = data.split(' ').join('');
  const cards = document.querySelectorAll('.long-pooling > div');
  Array.from(cards).forEach(card => card.classList.remove('flip-it'));
  
  const current = Array.from(cards).find(el => el.textContent === number);
  current.classList.add('flip-it');
}
