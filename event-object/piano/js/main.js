'use strict';
const sounds = { 
	middle: ['./sounds/middle/first.mp3', './sounds/middle/second.mp3', './sounds/middle/third.mp3', './sounds/middle/fourth.mp3', './sounds/middle/fifth.mp3'],
	lower: ['./sounds/lower/first.mp3', './sounds/lower/second.mp3', './sounds/lower/third.mp3', './sounds/lower/fourth.mp3', './sounds/lower/fifth.mp3'],
	higher: ['./sounds/higher/first.mp3', './sounds/higher/second.mp3', './sounds/higher/third.mp3', './sounds/higher/fourth.mp3', './sounds/higher/fifth.mp3']
}

const pianoSet = document.getElementsByClassName('set')[0];
const keys = Array.from(document.getElementsByTagName('li'));
const players = Array.from(document.getElementsByTagName('audio'));


function checkSet() {
	if (pianoSet.classList.contains('middle')) {
		return 'middle';
	}
	if (pianoSet.classList.contains('lower')) {
		return 'lower';
	}
	if (pianoSet.classList.contains('higher')) {
		return 'higher';
	}
}

function changeSet(event) {
	pianoSet.classList.remove('middle');
	switch (event.key) {
		case 'Shift':
			pianoSet.classList.remove('higher');
			pianoSet.classList.add('lower');
			break;
		case 'Alt':
			pianoSet.classList.remove('lower');
			pianoSet.classList.add('higher');
			break;
	}
}

function returnDefaultSet() {
	pianoSet.classList.remove('higher');
	pianoSet.classList.remove('lower');
	pianoSet.classList.add('middle');
}

document.addEventListener('keydown', changeSet);

keys.forEach(key => key.addEventListener('click', () => {
	players.forEach((player, i) => player.src = sounds[checkSet()][i]);
	key.getElementsByTagName('audio')[0].currentTime = 0;
	key.getElementsByTagName('audio')[0].play();
}));

document.addEventListener('keyup', returnDefaultSet);