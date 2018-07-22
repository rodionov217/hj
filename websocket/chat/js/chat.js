'use strict';
const chat = document.querySelector('.chat');
const messageBox = chat.querySelector('.message-box');
const messageInput = chat.querySelector('.message-input');
const sendButton = chat.querySelector('.message-submit');
const templates = chat.querySelector('.messages-templates');
const chatContent = chat.querySelector('.messages-content');
const chatStatus = chat.querySelector('.chat-status');
const messageStatus = chat.querySelector('.message-status');

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');
connection.addEventListener('open', updateStatus);
connection.addEventListener('error', event => console.error(event))
connection.addEventListener('close', updateStatus);

function updateStatus(event) { 
  switch (event.type) { 
    case 'open':
      chatStatus.textContent = chatStatus.dataset.online;
      sendButton.removeAttribute('disabled');
      messageStatus.firstElementChild.textContent = 'Пользователь появился в сети';
      chatContent.appendChild(messageStatus.cloneNode(true));
      break;
    case 'close':
      chatStatus.textContent = chatStatus.dataset.offline;
      sendButton.setAttribute('disabled', 'disabled');
      messageStatus.firstElementChild.textContent = 'Пользователь не в сети';
      chatContent.appendChild(messageStatus.cloneNode(true));
      break;
  }
}

function handleMessage(text, className) { 
  let node = className ? templates.querySelector('.message-personal') : templates.querySelectorAll('.message')[1];
  let time = (new Date()).toTimeString().substr(0, 5);
  node.querySelector('.message-text').textContent = text.data ? text.data : text;
  node.querySelector('.timestamp').textContent = time;
  let clone = node.cloneNode(true);
  chatContent.append(clone);

  //--------удаляю уведомление------
  if (clone.previousElementSibling.classList.contains('loading')) {
    clone.parentElement.removeChild(clone.previousElementSibling);
  }
}

connection.addEventListener('message', receiveMessage);

function receiveMessage(event) { 
  const text = event.data;
  if (text === 'Удачи') { 
    connection.close();
  }
  if (text === '...') {
    let loading = chat.querySelector('.message.loading');
    let clone = loading.cloneNode(true);
    chatContent.append(clone);
  } else { 
    handleMessage(text, false);
  };
}

messageBox.addEventListener('submit', sendMsg);

function sendMsg(event) {
  event.preventDefault();
  const text = messageInput.value;
  if (!text) {
    return;
  }
  connection.send(text);
  messageInput.value = '';
  handleMessage(text, true);
}

