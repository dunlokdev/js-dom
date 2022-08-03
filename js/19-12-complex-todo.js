function createToDoElement(todo) {
  if (!todo) return null;

  // find template
  const todoTemplate = document.getElementById('todoTemplate');
  if (!todoTemplate) return null;

  // clone li element
  const todoElement = todoTemplate.content.firstElementChild.cloneNode(true);
  todoElement.dataset.id = todo.id;

  // console.log(todoElement);

  // update content where need
  const titleElement = todoElement.querySelector('.todo__title');
  console.log(titleElement);
  if (titleElement) titleElement.textContent = todo.title;
  // console.log(todo.title);

  // attach event
  return todoElement;
}

function renderTodoList(todoList, ulElementId) {
  if (!Array.isArray(todoList) || todoList.length === 0) return;

  // Tìm ul element
  // lặp qua todoList --> ứng với mỗi todo --> Tạo li --> Thêm vào ul

  const ulElement = document.getElementById(ulElementId);

  if (!ulElement) return;
  for (const todo of todoList) {
    // console.log(todo);
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

  renderTodoList(todoList, 'todo-list');
})();
