
let data;
const preloader = document.getElementById('loader');
const contentBox = document.getElementById('content');
const numberInput = document.getElementById('source');
const from = document.getElementById('from');
const to = document.getElementById('to');
const output = document.getElementById('result');

const xhr = new XMLHttpRequest();

function showPreloader() { 
  preloader.classList.remove('hidden');
}

function showMainContent() { 
  preloader.classList.add('hidden');
  contentBox.classList.remove('hidden');
}

xhr.addEventListener('loadstart', showPreloader)
xhr.addEventListener('load', getData);
xhr.addEventListener('error', () => console.log(xhr.status, xhr.statusText));
xhr.addEventListener('loadend', showMainContent);
xhr.addEventListener('loadend', updateResult);
from.addEventListener('change', updateResult);
to.addEventListener('change', updateResult);
numberInput.addEventListener('input', updateResult);

xhr.open('GET', 'https://neto-api.herokuapp.com/currency', true);
xhr.send();

function getData() { 
  try {
    JSON.parse(xhr.responseText);
  }
  catch (e) { 
    console.log(e);
  }

  data = JSON.parse(xhr.responseText);
  let codes = data.map(el => `<option label="${el.code}" value="${el.value}"></option>`);
  from.innerHTML = codes.join('');
  to.innerHTML = codes.join('');
}

function updateResult() { 
  output.value = (numberInput.value * from.value / to.value).toFixed(2);
}

