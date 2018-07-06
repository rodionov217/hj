'use strict';

const addButtons = document.getElementsByClassName('add');
const count = document.getElementById('cart-count');
const totalPrice = document.getElementById('cart-total-price');

function addToCart(event) { 
  let price = +event.currentTarget.dataset.price;
  let currentCartTotal = +totalPrice.innerText.replace(/\s/g, '') + price;
  totalPrice.innerText = getPriceFormatted(currentCartTotal);
  count.innerText = +count.innerText + 1;
}

Array.from(addButtons)
  .forEach(button => button.addEventListener('click', addToCart));