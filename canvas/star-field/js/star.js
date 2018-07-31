'use strict';
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.fillRect(0, 0, 800, 400);
//ctx.save();
ctx.clip();
canvas.addEventListener('click', draw);

function draw() { 
  let ind = [];
  ctx.clearRect(0, 0, 800, 400);
  ctx.beginPath();
  for (let i = 0; i < Math.ceil(rand(0, 200)); i++) {

    //ctx.fill();
    let x = rand(0, canvas.clientWidth);
    let y = rand(0, canvas.clientHeight);
    let radius = rand(4, 5.1);
  
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ffe9c4';
    ind.push(i);
  }
  ctx.closePath();
  console.log(ind.length);
}
