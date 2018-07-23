'use strict';
const menu = document.getElementsByClassName('wrapper-dropdown')[0];
menu.onclick = function () {
	this.classList.toggle('active');
}