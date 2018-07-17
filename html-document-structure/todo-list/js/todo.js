function TaskList(container) { 
  const done = Array.from(container.children).find(el => el.classList.contains('done'));
  const undone = Array.from(container.children).find(el => el.classList.contains('undone'));
  const tasks = container.getElementsByTagName('label');
  Array.from(tasks).forEach(task => task.addEventListener('click', check));
  
  function check(event) { 
    const input = event.currentTarget.firstElementChild;
    input.checked = input.checked ? false : true;
    input.checked ? done.appendChild(event.currentTarget) : undone.appendChild(event.currentTarget);
  }
}

const taskLists = document.getElementsByClassName('todo-list');
Array.from(taskLists).forEach(item => TaskList(item));