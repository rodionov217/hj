document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.slides > .slide').classList.add('slide-current');
  disable(prev, first);
});

const buttons = Array.from(document.querySelector('.slider-nav').children);
const next = buttons.find(btn => btn.dataset.action === 'next');
const prev = buttons.find(btn => btn.dataset.action === 'prev');
const first = buttons.find(btn => btn.dataset.action === 'first');
const last = buttons.find(btn => btn.dataset.action === 'last');

buttons.forEach(btn => btn.addEventListener('click', moveSlide));

function moveSlide(event) {
  const target = event.currentTarget;
  const actionType = target.dataset.action;
  let current = document.querySelector('li.slide-current');
  let activatedSlide;
  
  switch (actionType) {
    case 'prev': activatedSlide = current.previousElementSibling;
      break;
    case 'next': activatedSlide = current.nextElementSibling;
      break;
    case 'first': activatedSlide = current.parentElement.firstElementChild;
      break;
    case 'last': activatedSlide = current.parentElement.lastElementChild;
      break;
  }

  current.classList.remove('slide-current');
  activatedSlide.classList.add('slide-current');

  activatedSlide.previousElementSibling ? enable(prev, first) : disable(prev, first);
  activatedSlide.nextElementSibling ? enable(next, last) : disable(next, last);
}

function disable(...buttons) {
  buttons.forEach(btn => {
    btn.removeEventListener('click', moveSlide);
    btn.classList.add('disabled');
  });
}

function enable(...buttons) { 
  buttons.forEach(btn => {
    btn.addEventListener('click', moveSlide);
    btn.classList.remove('disabled');
  });
}
