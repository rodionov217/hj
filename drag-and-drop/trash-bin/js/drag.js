'use strict';
let logo = null;
const logos = document.querySelectorAll('.logo');
const bin = document.getElementById('trash_bin'); 

let movedPiece = null;

document.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', moveAt);
document.addEventListener('mouseup', dragStop);

function dragStart(event) {
    if (event.target.classList.contains('logo')) {
        movedPiece = event.target;
        movedPiece.classList.add('moving');
        movedPiece.style.position = 'absolute';
        moveAt(event);
        document.body.appendChild(movedPiece);
    }
};


function moveAt(event) {
    if (!movedPiece) {
        return;
    }
    movedPiece.style.left = event.pageX - movedPiece.offsetWidth / 2 + 'px';
    movedPiece.style.top = event.pageY - movedPiece.offsetHeight / 2 + 'px';
}

function dragStop(event) {
    if (movedPiece) {
        movedPiece.style.visibility = 'hidden';
        const check = document
          .elementFromPoint(event.clientX, event.clientY)
          .closest('#trash_bin');
        movedPiece.style.visibility = 'visible';
        movedPiece.classList.remove('moving');
        if (check) {
            movedPiece.style.display = 'none';
        }
        movedPiece = null;
    }
};