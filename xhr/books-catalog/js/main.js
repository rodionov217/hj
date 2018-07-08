
let books = [];
const content = document.getElementById('content');
const xhr = new XMLHttpRequest();
xhr.addEventListener('load', onLoad);
xhr.open('GET', 'https://neto-api.herokuapp.com/book/', true);
xhr.send();

function onLoad() { 
	books = JSON.parse(xhr.responseText);
	content.innerHTML = '<li></li>'.repeat(books.length);
	let listItems = Array.from(document.querySelectorAll('#content > li'));
	listItems.forEach((item, i) => {
		item.dataset.title = books[i].title;
		item.dataset.author = books[i].author.name;
		item.dataset.info = books[i].info;
		item.dataset.price = books[i].price;
		item.innerHTML = `<img src="${books[i].cover.small}">`;
	}); 
}

