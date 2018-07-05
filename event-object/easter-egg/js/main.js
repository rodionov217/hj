'use strict';
const menu = document.getElementsByTagName('nav')[0];
const secret = document.getElementsByClassName('secret')[0];

function openMenu(event) { 
	if (!(event.ctrlKey && event.altKey)) { 
		return;
	}
	if (event.code === 'KeyT') { 
		menu.classList.toggle('visible');
	}
}

document.addEventListener('keydown', openMenu);

document.addEventListener('keydown', () => console.log(event.code));

let secretCode = [];
const password = ['KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyJ', 'KeyU', 'KeyB', 'KeyZ'];

function checkSecretCode(event) { 
	if (event.code === 'KeyY') { 
		secretCode = [];
	}
	secretCode.push(event.code);
	if (secretCode.join() === password.join()) { 
		secret.classList.add('visible');
	}
}

document.addEventListener('keypress', checkSecretCode);


