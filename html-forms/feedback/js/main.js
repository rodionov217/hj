const messageBlock = document.getElementById('output');
const form = document.getElementsByClassName('contentform')[0];
const inputs = Array.from(form.getElementsByTagName('input'));
const outputs = Array.from(messageBlock.getElementsByTagName('output'));

inputs.forEach(inp => inp.addEventListener('input', addValue));

function addValue(event) { 
  if (event.currentTarget.name === 'zip') { 
    event.currentTarget.value = event.currentTarget.value.replace(/\D/, '');
  } 

  outputs.forEach(el => {
    if (event.currentTarget.name === el.id) { 
      el.value = event.currentTarget.value;
    }
  });
}

const message = form.getElementsByTagName('textarea')[0];
message.addEventListener('input', addValue);

const submitButton = document.querySelector('form > button');
const changeButton = document.querySelector('main > button');

const fieldsets = Array.from(form.getElementsByTagName('fieldset'));
fieldsets.forEach(fs => fs.addEventListener('input', enableSubmitButton));

function enableSubmitButton() { 
  if (inputs.every(inp => inp.value !== '')) {
    submitButton.removeAttribute('disabled');
  } else { 
    submitButton.setAttribute('disabled', true);
  }
}

submitButton.addEventListener('click', showMessageBlock);
changeButton.addEventListener('click', showForm);

function showMessageBlock(event) { 
  event.preventDefault();
  form.classList.add('hidden');
  messageBlock.classList.remove('hidden');
}

function showForm() { 
  form.classList.remove('hidden');
  messageBlock.classList.add('hidden');
}
