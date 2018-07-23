const tabLinks = document.querySelectorAll('nav > a');
const content = document.getElementById('content');
const preloader = document.getElementById('preloader');
const xhr = new XMLHttpRequest();

xhr.addEventListener('load', onLoad);
xhr.addEventListener('progress', () => preloader.classList.remove('hidden'));
xhr.addEventListener('loadend', () => preloader.classList.add('hidden'));
xhr.addEventListener('error', () => console.log(xhr.status));

Array.from(tabLinks).forEach(link => link.addEventListener('click', showTab));

function showTab(event) { 
	event.preventDefault();
	if (event.currentTarget.classList.contains('active')) { 
		return;
	}
	Array.from(tabLinks).forEach(link => link.classList.remove('active'));
	event.currentTarget.classList.add('active');
	xhr.open('GET', event.currentTarget.getAttribute('href'), true);
	xhr.send(); 
}

function onLoad() { 
	if (xhr.status !== 200) {
		console.log('error: ', xhr.status);
	} else {
		content.innerHTML = xhr.responseText;
	}
} 

document.addEventListener('DOMContentLoaded', openEmail);
function openEmail() { 
	xhr.open('GET', tabLinks[0].getAttribute('href'), true);
	xhr.send(); 
}