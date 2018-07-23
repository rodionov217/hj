'use strict';
const mediaplayer = document.getElementsByClassName('mediaplayer')[0];
const player = mediaplayer.getElementsByTagName('audio')[0];
const titleBox = mediaplayer.getElementsByClassName('title')[0];
const playstateButton = mediaplayer.getElementsByClassName('playstate')[0];
const stopButton = mediaplayer.getElementsByClassName('stop')[0];
const nextButton = mediaplayer.getElementsByClassName('next')[0];
const backButton = mediaplayer.getElementsByClassName('back')[0];
const tracks = ['mp3/LA Chill Tour.mp3', 'mp3/LA Fusion Jam.mp3', 'mp3/This is it band.mp3'];

stopButton.onclick = function() {
	player.pause();
	player.currentTime = 0;
	mediaplayer.classList.remove('play');
}

playstateButton.onclick = function() {
	if (!(mediaplayer.classList.contains('play'))) {
		player.play();
		mediaplayer.classList.add('play');
	} else {
		player.pause();
		mediaplayer.classList.remove('play');
	}
}

let i = 0;
nextButton.onclick = function() {
	if (i === tracks.length - 1) {
			i = -1;
	}
	player.src = tracks[++i];
	cutTitle(tracks[i]);
	if (mediaplayer.classList.contains('play')) {
		player.play();
	}
}

backButton.onclick = function() {
	if (i === 0) {
		i = tracks.length;
	}
	player.src = tracks[--i];
	cutTitle(tracks[i]);
	if (mediaplayer.classList.contains('play')) {
		player.play();
	}
}

player.onended = function() {
	mediaplayer.classList.remove('play');
} 

function cutTitle(track) { 
	titleBox.title = track.slice().substring(track.indexOf('/') + 1, track.indexOf('.'));
}