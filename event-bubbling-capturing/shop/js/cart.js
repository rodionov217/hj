'use strict';
function add(event) {
  event.preventDefault();
  if (event.target.classList.contains('add-to-cart')) {
    addToCart({ title: event.target.dataset.title, price: event.target.dataset.price });
  }
}
//измененное решение
const itemsList = document.querySelector('main.items-list');
itemsList.addEventListener('click', add);


/* let buttons = document.getElementsByClassName('add-to-cart');

document.addEventListener('DOMContentLoaded', () => { 
  buttons = document.getElementsByClassName('add-to-cart');
  Array.from(buttons).forEach(button => button.addEventListener('click', add)); 
})

showMore.addEventListener('click', event => {
  event.preventDefault();
  buttons = document.getElementsByClassName('add-to-cart');
  Array.from(buttons).forEach(button => button.addEventListener('click', add)); 
}); */
