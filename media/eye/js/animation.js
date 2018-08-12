'use strict';
 
let eye = document.querySelector('.big-book__pupil');

document.addEventListener('DOMContentLoaded', () => { 

  document.addEventListener('mousemove', move);
})

function rand(min, max) {
  return Math.random() * (max - min) + min;
}


let pupilCenterX = eye.getClientRects()[0].left + eye.getClientRects()[0].width / 2;
let pupilCenterY = eye.getClientRects()[0].top + eye.getClientRects()[0].height / 2;

function move(event) { 
  let x, y;
  x = 30 * event.pageX / window.innerWidth;
  y = 30 * event.pageY / window.innerHeight;
  if (event.pageX >= pupilCenterX && event.pageY >= pupilCenterY) {
    eye.style.setProperty('--pupil-x', `${x}px`);
    eye.style.setProperty('--pupil-y', `${y}px`);
  } else if (event.pageX >= pupilCenterX && event.pageY <= pupilCenterY) { 
    eye.style.setProperty('--pupil-x', `${x}px`);
    eye.style.setProperty('--pupil-y', `${-y}px`);
  } else if (event.pageX <= pupilCenterX && event.pageY <= pupilCenterY) { 
    eye.style.setProperty('--pupil-x', `${-x}px`);
    eye.style.setProperty('--pupil-y', `${-y}px`);
  } else if (event.pageX <= pupilCenterX && event.pageY >= pupilCenterY) { 
    eye.style.setProperty('--pupil-x', `${-x}px`);
    eye.style.setProperty('--pupil-y', `${y}px`);
  } 

  if (event.pageX < window.innerWidth / 5 || event.pageX > window.innerWidth * 4 / 5 || event.pageY < window.innerHeight / 5 || event.pageY > window.innerHeight * 4 / 5) { 

  }
  //eye.style.setProperty('--p
}
