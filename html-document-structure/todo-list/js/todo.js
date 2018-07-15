const container = document.getElementsByClassName('todo-list')[0];
const done = Array.from(container.children).find(el => el.classList.contains('done'));
const undone = Array.from(container.children).find(el => el.classList.contains('undone'));

let tasks = container.getElementsByTagName('label');
Array.from(tasks).forEach(task => task.addEventListener('click', check));

function check(event) { 
  let input = event.currentTarget.children[0];
  
  if (input.checked) {
    input.checked = false;
  } else { 
    input.checked = true;
  }
  input.checked ? done.appendChild(event.currentTarget) : undone.appendChild(event.currentTarget);
}
