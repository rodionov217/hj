'use strict';
const image = document.getElementById('view');
const previewLinks = document.getElementById('nav').getElementsByTagName('a');

function updateClass(event) { 
  Array.from(previewLinks).forEach(link => link.classList.remove('gallery-current'));
  event.currentTarget.classList.add('gallery-current');
}

function show(event) { 
  event.preventDefault();
  updateClass(event);
  image.src = event.currentTarget.href;
}

Array.from(previewLinks).forEach(link => link.addEventListener('click', show));