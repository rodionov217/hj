'use strict';

const card = document.querySelector('.card');
const img = card.querySelector('.firstinfo img');
const name = card.querySelector('.profileinfo h1');
const position = card.querySelector('.profileinfo h3');
const description = card.querySelector('.profileinfo p');
const badges = document.querySelector('.badgescard');
 
function showTech(techs) { 
  let ins = [];
  techs.forEach(tech => ins.push(`<span class="devicons devicons-${tech}"></span>`));
  badges.innerHTML = ins.join(' ');
}

function showUser(user) { 
  img.src = user.pic;
  name.textContent = user.name;
  description.textContent = user.description;
  position.textContent = user.position;
  loadData(`https://neto-api.herokuapp.com/profile/${user.id}/technologies`).then(showTech)
}

function loadData(url) {
  const functionName = 'cb' + String(Math.random()).slice(-4);
  return new Promise((done, fail) => {
    window[functionName] = done;
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

loadData('https://neto-api.herokuapp.com/profile/me')
  .then(showUser);

window.addEventListener('load', () => card.parentElement.style.display = 'initial');
