'use strict';
const buttons = document.getElementsByClassName('drum-kit__drum');

for (const btn of buttons) {
	const player = btn.getElementsByTagName('audio')[0];
	btn.onclick = function() {
		player.currentTime = 0;
		player.play();
	}
}