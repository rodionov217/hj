document.addEventListener('DOMContentLoaded', () => document.querySelector('.slides > .slide').classList.add('slide-current'));
let nav = document.querySelector('nav');
const buttons = Array.from(nav.children);
buttons.forEach(btn => btn.addEventListener('click', moveSlide));

let current = document.querySelector('.slide-current');
function moveSlide(event) { 
  let actionType = event.currentTarget.dataset.action;
  switch (actionType) { 
    case 'prev':
      
      current.previousSibling ? goToPrev() : event.currentTarget.classList.add('disabled');
        //current.previousSibling.classList.add('slide-current') : 
      break; 
    case 'next': 
      //current.nextSibling ? 
}




const slider = document.querySelector('.slider');
//Array.from(sliders).forEach(item => Slider(item));