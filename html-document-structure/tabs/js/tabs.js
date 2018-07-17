const container = document.getElementById('tabs');
const tabsnav = container.querySelector('ul.tabs-nav');
const tabContent = container.querySelector('.tabs-content');
const tabs = tabsnav.children;

Array.from(tabContent.children).forEach(article => { 
  const title = article.dataset.tabTitle;
  const icon = article.dataset.tabIcon;
  const clone = tabsnav.firstElementChild.cloneNode(true);
  tabsnav.appendChild(clone);
  const tab = tabsnav.lastElementChild;
  tab.firstElementChild.textContent = title;
  tab.firstElementChild.classList.add(icon);
})

tabsnav.removeChild(tabsnav.firstElementChild);
Array.from(tabContent.children).forEach(article => article.classList.add('hidden'));
Array.from(tabs).forEach(a => a.firstElementChild.addEventListener('click', showArticle));

function showArticle(event) { 
  event.preventDefault();
  Array.from(tabs).forEach(a => a.classList.remove('ui-tabs-active'));
  event.currentTarget.parentElement.classList.add('ui-tabs-active');
  Array.from(tabContent.children).forEach(article => { 
    article.classList.add('hidden');
    if (event.currentTarget.classList.contains(article.dataset.tabIcon)) { 
      article.classList.remove('hidden');
    }
  })
}

document.addEventListener('DOMContentLoaded', () => { 
  tabs[0].classList.add('ui-tabs-active');
  tabContent.children[0].classList.remove('hidden');
});
