'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  const comments = list.map(createNode);
  const fragment = comments.reduce((fragment, current) => { 
    fragment.appendChild(current);
    return fragment;
  }, document.createDocumentFragment());
  commentsContainer.appendChild(fragment);
}

function createNode(comment) { 
  const photoBlock = create('div', { class: 'photo', title: comment.author.name }, [create('div', { class: 'avatar', style: `background-image: url('${comment.author.pic}')` })]);
  const commentBlock = create('div', { class: 'comment-block' },
    [
      create('p', { class: 'comment-text' }, comment.text.split('\n').map(line => line ? create('p', {}, line) : create('br', {}, ''))),
      create('div', { class: 'bottom-comment' },
        [
          create('div', { class: 'comment-date' }, `${new Date(comment.date).toLocaleString('ru-Ru')}`),
          create('ul', { class: 'comment-actions' },
            [
              create('li', { class: 'complain' }, 'Пожаловаться'),
              create('li', { class: 'reply' }, 'Ответить')
            ])
        ])
    ]);
  const wrapper = document.createElement('div');
  wrapper.classList.add('comment-wrap');
  wrapper.appendChild(photoBlock);
  wrapper.appendChild(commentBlock);
  return wrapper;
}

function create(tagName, attrs, children) { 
  const element = document.createElement(tagName);
  if (typeof attrs === 'object') { 
    Object.keys(attrs).forEach(i => element.setAttribute(i, attrs[i]));
  }
  if (typeof children === 'string') {
    element.textContent = children;
  } else if (children instanceof Array) { 
    children.forEach(child => element.appendChild(child));
  }
  return element;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
