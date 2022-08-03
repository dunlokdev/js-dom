function getAllLiElement() {
  return document.querySelectorAll('#todo-list > li');
}

function isMatchStatus(todoElement, filterStatus) {
  return filterStatus === 'all' || todoElement.dataset.status === filterStatus;
}

function isMatchSearch(todoElement, searchTerm) {
  if (searchTerm === '') return true;

  const titleTodo = todoElement.querySelector('.todo__title');

  if (!titleTodo) return false;

  return titleTodo.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

function isMatch(todoElement, params) {
  if (!todoElement) return false;

  return (
    isMatchSearch(todoElement, params.get('searchTerm')) &&
    isMatchStatus(todoElement, params.get('status'))
  );
}
// function searchTodo(searchTerm) {
//   const todoElementList = getAllLiElement();

//   for (const todoElement of todoElementList) {
//     const needToShow = isMatch(todoElement, searchTerm);
//     todoElement.hidden = !needToShow;
//   }
// }

function initSearchInput(params) {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  if (params.get('searchTerm')) {
    searchInput.value = params.get('searchTerm');
  }

  searchInput.addEventListener('input', () => {
    // searchTodo(searchInput.value);
    handleFilterChange('searchTerm', searchInput.value);
  });
}

// function filterTodo(filterStatus) {
//   const todoElementList = getAllLiElement();

//   for (const todoElement of todoElementList) {
//     const needToShow = filterStatus === 'all' || todoElement.dataset.status === filterStatus;
//     todoElement.hidden = !needToShow;
//   }
// }

function initFilterSelect(params) {
  const filterSelect = document.getElementById('filterSelect');
  if (!filterSelect) return;

  if (params.get('status')) {
    filterSelect.value = params.get('status');
  }

  filterSelect.addEventListener('change', () => {
    // filterTodo(filterSelect.value);
    handleFilterChange('status', filterSelect.value);
  });
}

function handleFilterChange(filterName, filterValue) {
  const url = new URL(window.location);
  url.searchParams.set(filterName, filterValue);

  // update query params
  window.history.pushState({}, '', url);

  const todoElementList = getAllLiElement();
  for (const todoElement of todoElementList) {
    const needToShow = isMatch(todoElement, url.searchParams);
    todoElement.hidden = !needToShow;
  }
}

(() => {
  console.log('work! 19-23-persist-filter-todo.js');

  // get query object
  const params = new URLSearchParams(window.location.search);

  initSearchInput(params);
  initFilterSelect(params);
})();
