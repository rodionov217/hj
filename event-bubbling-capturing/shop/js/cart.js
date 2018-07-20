'use strict';
let buttons = document.getElementsByClassName('add-to-cart');

document.addEventListener('DOMContentLoaded', () => { 
  buttons = document.getElementsByClassName('add-to-cart');
  Array.from(buttons).forEach(button => button.addEventListener('click', add)); 
})

showMore.addEventListener('click', event => {
  event.preventDefault();
  buttons = document.getElementsByClassName('add-to-cart');
  Array.from(buttons).forEach(button => button.addEventListener('click', add)); 
});

function add(event) {
  event.preventDefault();
  addToCart({ title: event.currentTarget.dataset.title, price: event.currentTarget.dataset.price });
}