let container;

function loadContacts() {
  return '[{"name":"Василий Николаев","email":"vnikola9999@gmail.com","phone":"+7 999 777 34 34"},{"name":"Елена Вишневская","email":"lenochka22333@yandex.ru","phone":"+7 888 777 11 11"},{"name":"Артём Кузнецов","email":"kuznya_foreva@gmail.com","phone":"+7 222 555 76 67"},{"name":"Алексей Гусенко","email":"jiznboliyaetoznayu@mail.com","phone":"+7 333 545 12 34"},{"name":"Маргарита Сотникова","email":"pobeditelnicapojizni111@gmail.com","phone":"+7 323 534 32 12"}]';
} 

const contacts = JSON.parse(loadContacts());
const list = document.getElementsByClassName('contacts-list')[0];
list.innerHTML = createList(contacts);

function createList(contacts) {
  return contacts.reduce((prev, cur, i) => {
    if (i === 1) {
      prev = `<li data-email="${prev.email}" data-phone="${prev.phone}"><strong>${prev.name}</strong></li>`;
    }
    return prev + `<li data-email="${cur.email}" data-phone="${cur.phone}"><strong>${cur.name}</strong></li>`;
  });
}



function contactClick(event) {
  let target = null;
  if (event.target.tagName === 'LI') {
    target = event.target;
  }
  if (event.target.parentNode.tagName === 'LI') {
    target = event.target.parentNode;
  }

  if (target) {
    target.classList.add('active');
    document.getElementById('card-email').innerHTML = target.dataset.email;
    document.getElementById('card-phone').innerHTML = target.dataset.phone;
    container.classList.add('details');
  }
}

function backClick() {
  container.classList.remove('details');
  const items = document.querySelectorAll('.list-view li');
  for (let item of items) {
      item.classList.remove('active');
  }
}

function init() {
  container = document.getElementById('container');
  container.querySelector('.list-view').addEventListener('click', contactClick);
  container.querySelector('.back').addEventListener('click', backClick);
}

document.addEventListener('DOMContentLoaded', init);
