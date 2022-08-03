function createToDoElement(todo) {
  if (!todo) return null;

  const liElement = document.createElement('li');
  liElement.textContent = todo.title;
  liElement.dataset.id = todo.id;

  return liElement;
}

function renderTodoList(todoList, ulElementId) {
  if (!Array.isArray(todoList) || todoList.length === 0) return;

  // Tìm ul element
  // lặp qua todoList --> ứng với mỗi todo --> Tạo li --> Thêm vào ul

  const ulElement = document.getElementById(ulElementId);

  if (!ulElement) return;
  for (const todo of todoList) {
    const liElement = createToDoElement(todo);

    ulElement.appendChild(liElement);
  }
}

// main
(() => {
  console.log('work!! ');
  const todoList = [
    { id: 1, title: 'Learn HTML/CSS' },
    { id: 2, title: 'Learn Javascript' },
    { id: 3, title: 'Learn NextJS' },
  ];

  renderTodoList(todoList, 'todoList');
})();
