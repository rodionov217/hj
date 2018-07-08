//'use strict';

const tabLinks = document.querySelectorAll('nav > a');
const content = document.getElementById('content');
const preloader = document.getElementById('preloader');
const xhr = new XMLHttpRequest();


Array.from(tabLinks).forEach(link => link.addEventListener('click', showTab));

function showTab(event) { 
	event.preventDefault();
	Array.from(tabLinks).forEach(link => link.classList.remove('active'));
	event.currentTarget.classList.add('active');
	xhr.open('GET', event.currentTarget.getAttribute('href'), true);
	xhr.responseType = 'text';
	xhr.send(); 
}

xhr.addEventListener('load', onLoad);
xhr.addEventListener('loadstart', () => preloader.classList.remove('hidden'));
xhr.addEventListener('loadend', () => preloader.classList.add('hidden'));
xhr.addEventListener('error', () => console.log(xhr.responseText));


function onLoad() { 
	if (xhr.status !== 200) {
		console.log('error: ', xhr.status);

	} else {
		let result = xhr.responseText;
		console.log(xhr.responseText);
		content.innerHTML = result;
	}
}

document.addEventListener('DOMContentLoaded', openEmail);
function openEmail() { 
	xhr.open('GET', tabLinks[0].getAttribute('href'), true);
	xhr.responseType = 'text';
	xhr.send(); 
}
