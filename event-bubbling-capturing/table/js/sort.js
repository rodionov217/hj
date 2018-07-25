'use strict';

function handleTableClick(event) {
  if (!(event.target.classList.contains('prop__name'))) {
    return;
  }
  table.dataset.sortBy = event.target.dataset.propName;
  event.target.dataset.dir = (event.target.dataset.dir === '1') ? '-1' : '1'; 
  sortTable(event.target.dataset.propName, event.target.dataset.dir);
}