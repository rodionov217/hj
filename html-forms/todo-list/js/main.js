const fieldset = document.getElementsByClassName('list-block')[0];
const tasks = fieldset.querySelectorAll('input[type="checkbox"]');
const output = fieldset.getElementsByTagName('output')[0];

document.addEventListener('DOMContentLoaded', updateCounter);

tasks.forEach(task => task.addEventListener('click', updateCounter));

function updateCounter() { 
  let done = Array.from(tasks).filter(task => task.checked);
  if (done.length === tasks.length) {
    fieldset.classList.add('complete');
  } else { 
    fieldset.classList.remove('complete');
  }
  output.value = `${done.length} из ${tasks.length}`;
}