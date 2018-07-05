'use strict';
const menu = document.getElementsByClassName('wrapper-dropdown');
menu[0].onclick = function () {
	if (this.classList.contains('active')) {
		this.classList.remove('active');
	} else { 
		this.classList.add('active');
	}
}