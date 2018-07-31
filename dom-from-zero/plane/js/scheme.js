'use strict'

const acSelect = document.getElementById('acSelect');
const btnSeatMap = document.getElementById('btnSeatMap');
const btnSetFull = document.getElementById('btnSetFull');
const btnSetEmpty = document.getElementById('btnSetEmpty');
const seatMapTitle = document.getElementById('seatMapTitle');
const seatMapDiv = document.getElementById('seatMapDiv');
const totalPax = document.getElementById('totalPax');
const totalAdult = document.getElementById('totalAdult');
const totalHalf = document.getElementById('totalHalf');
const xhr = new XMLHttpRequest();
xhr.addEventListener('load', showMap);

btnSeatMap.addEventListener('click', getdata);
btnSetEmpty.disabled = true;
btnSetFull.disabled = true;

function getdata(event) { 
  event.preventDefault();
  xhr.open('GET', `https://neto-api.herokuapp.com/plane/${acSelect.value}`, true);
  xhr.send();
}

function setFull(event) { 
  event.preventDefault();
  Array.from(seatMapDiv.querySelectorAll('.seat')).forEach(seat => {
    seat.classList.add('adult');
    seat.classList.remove('half');
  });
  updateTotal();
}

function setEmpty(event) { 
  event.preventDefault();
  Array.from(seatMapDiv.querySelectorAll('.seat')).forEach(seat => {
    seat.classList.remove('adult');
    seat.classList.remove('half');
  });
  updateTotal();
}

function showMap() { 
  Array.from(seatMapDiv.children).forEach(child => child.parentElement.removeChild(child));
  const data = JSON.parse(xhr.responseText);
  seatMapTitle.textContent = data.title + ' (' + data.passengers + ' пассажиров)';
  data.scheme.forEach((row, i) => {
    const newRow = el('div', { class: 'row seating-row text-center' }, 
      [ el('div', { class: 'col-xs-1 row-number' }, 
        [ el('h2', {}, `${i + 1}`) ])
      ]
    );
    const seats = document.createDocumentFragment();
    seats.appendChild(el('div', { class: 'col-xs-5' }, ''));
    seats.appendChild(el('div', { class: 'col-xs-5' }, ''));

    for (let k = 0; k < 6; k++) { 
      const seat = el('div', {class: 'col-xs-4'}, '');
      if (row === 6 || (row === 4 && k !== 0 && k !== 5)) {
        seat.classList.add('seat');
        seat.appendChild(el('span', { class: 'seat-label' }, data.letters6[k]));
      } else { 
        seat.classList.add('no-seat');
      } 
          if (k < 3) {
            seats.firstElementChild.appendChild(seat);
          } else {
            seats.lastElementChild.appendChild(seat);
          }
    }
    newRow.appendChild(seats);
    seatMapDiv.appendChild(newRow);
  });

  updateTotal();
  btnSetFull.disabled = false;
  btnSetEmpty.disabled = false;

  btnSetEmpty.addEventListener('click', setEmpty);
  btnSetFull.addEventListener('click', setFull);
  Array.from(document.querySelectorAll('.seat')).forEach(seat => seat.addEventListener('click', selectSeat));
}

function el(tagName, attributes, children) {
  const element = document.createElement(tagName);
  if (typeof attributes === 'object') {
    element.className = attributes.class;
  }
  if (typeof children === 'string') {
    element.textContent = children;
  } else if (children instanceof Array) {
    children.forEach(child => element.appendChild(child));
  }
  return element;
}

function selectSeat(event) { 
  const target = event.currentTarget;
  if (event.altKey && !target.classList.contains('adult')) {
    target.classList.add('half');
  } else if (target.classList.contains('half')) {
    target.classList.remove('adult');
    target.classList.remove('half');
  } else { 
    target.classList.toggle('adult');
  }
  updateTotal();
}

function updateTotal() { 
  totalPax.textContent = document.querySelectorAll('.adult').length + document.querySelectorAll('.half').length;
  totalAdult.textContent = document.querySelectorAll('.adult').length;
  totalHalf.textContent = document.querySelectorAll('.half').length;
}