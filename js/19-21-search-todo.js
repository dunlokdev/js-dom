function getAllLiElement() {
  return document.querySelectorAll('#todo-list > li');
}

function isMatch(todoElement, searchTerm) {
  if (searchTerm === '') return true;

  const titleTodo = todoElement.querySelector('.todo__title');

  if (!titleTodo) return false;

  return titleTodo.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

function searchTodo(searchTerm) {
  const todoElementList = getAllLiElement();

  for (const todoElement of todoElementList) {
    const needToShow = isMatch(todoElement, searchTerm);
    todoElement.hidden = !needToShow;
  }
}

function initSearchInput() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    searchTodo(searchInput.value);
  });
}

(() => {
  console.log('work! 19-21-search-todo.js');
  initSearchInput();
})();
