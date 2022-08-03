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

function createToDoElement(todo, params) {
  if (!todo) return null;

  // find template
  const todoTemplate = document.getElementById('todoTemplate');
  if (!todoTemplate) return null;

  // clone li element
  const todoElement = todoTemplate.content.firstElementChild.cloneNode(true);
  todoElement.dataset.id = todo.id;
  todoElement.dataset.status = todo.status;

  // render todo status
  const divElement = todoElement.firstElementChild;
  if (!divElement) return null;
  const alertClass = todo.status === 'pending' ? 'alert-secondary' : 'alert-success';
  divElement.classList.remove('alert-secondary');
  divElement.classList.add(alertClass);

  // update content where need
  const titleElement = todoElement.querySelector('.todo__title');
  if (titleElement) titleElement.textContent = todo.title;

  // check if should show or not show
  todoElement.hidden = !isMatch(todoElement, params);

  // add click event for mark as done button
  const markAsDoneButton = todoElement.querySelector('button.mark-as-done');
  if (markAsDoneButton) {
    const btnClass = todo.status === 'pending' ? 'btn-dark' : 'btn-success';
    const btnContent = todo.status === 'pending' ? 'Finish' : 'Reset';

    // update button
    markAsDoneButton.classList.remove('btn-success');
    markAsDoneButton.classList.add(btnClass);
    markAsDoneButton.textContent = btnContent;

    markAsDoneButton.addEventListener('click', () => {
      const currentStatus = todoElement.dataset.status;
      const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
      const newAlertClass = currentStatus === 'pending' ? 'alert-success' : 'alert-secondary';
      const newBtnClass = currentStatus === 'pending' ? 'btn-success' : 'btn-dark';
      const newBtnContent = currentStatus === 'pending' ? 'Reset' : 'Finish';

      // get current todo list
      // update status of current todo
      // save to local storage
      const todoList = getTodoList();
      const index = todoList.findIndex((x) => x.id === todo.id);

      if (index >= 0) {
        todoList[index].status = newStatus;
        localStorage.setItem('todo_list', JSON.stringify(todoList));
      }

      // update new status
      todoElement.dataset.status = newStatus;

      // update alert class accordingly
      divElement.classList.remove('alert-success', 'alert-secondary');
      divElement.classList.add(newAlertClass);

      // update btn
      markAsDoneButton.classList.remove('btn-success', 'btn-dark');
      markAsDoneButton.classList.add(newBtnClass);
      markAsDoneButton.textContent = newBtnContent;
    });
  }

  // add click event for remove button
  const removeButton = todoElement.querySelector('button.remove');
  if (removeButton) {
    removeButton.addEventListener('click', () => {
      // save to local storage
      const todoList = getTodoList();
      const newTodoList = todoList.filter((x) => x.id !== todo.id);
      localStorage.setItem('todo_list', JSON.stringify(newTodoList));

      // remove from dom
      todoElement.remove();
    });
  }

  // add click event for edit button
  const editButton = todoElement.querySelector('button.edit');
  if (editButton) {
    editButton.addEventListener('click', () => {
      const todoList = getTodoList();
      const latestTodo = todoList.find((x) => x.id === todo.id);
      if (!latestTodo) return;
      // populate data to form input
      populateTodoForm(latestTodo);
    });
  }
  return todoElement;
}

function populateTodoForm(todo) {
  // query todo form
  // dataset-id = todo.id
  const todoForm = document.getElementById('todoFormId');
  if (!todoForm) return;
  todoForm.dataset.id = todo.id;

  // set value for form control
  const todoInput = document.getElementById('todoText');
  if (todoInput) {
    todoInput.value = todo.title;
  }
}

function renderTodoList(todoList, ulElementId, params) {
  if (!Array.isArray(todoList) || todoList.length === 0) return;

  // Tìm ul element
  // lặp qua todoList --> ứng với mỗi todo --> Tạo li --> Thêm vào ul

  const ulElement = document.getElementById(ulElementId);

  if (!ulElement) return;
  for (const todo of todoList) {
    const liElement = createToDoElement(todo, params);
    ulElement.appendChild(liElement);
  }
}

function getTodoList() {
  try {
    return JSON.parse(localStorage.getItem('todo_list')) || [];
  } catch {
    return [];
  }
}
function handleToDoFormSubmit(event) {
  event.preventDefault();
  const todoForm = document.getElementById('todoFormId');
  const todoInput = document.getElementById('todoText');
  if (!todoInput) return;
  const isEdit = Boolean(todoForm.dataset.id);

  if (isEdit) {
    // Edit
    // find current todo
    const todoList = getTodoList();
    const index = todoList.findIndex((x) => x.id.toString() === todoForm.dataset.id);
    // update content
    todoList[index].title = todoInput.value;
    // save
    localStorage.setItem('todo_list', JSON.stringify(todoList));
    // apply dom
    const liElement = document.querySelector(`ul#todo-list > li[data-id="${todoForm.dataset.id}"]`);
    if (liElement) {
      const titleElement = liElement.querySelector('.todo__title');
      if (titleElement) titleElement.textContent = todoInput.value;
    }
  } else {
    // Add new todo
    // get form values
    // c1. query truc tiep toi id
    // c2. query toi form --> name

    const newTodo = { id: Date.now(), title: todoInput.value, status: 'pending' };

    // save
    const todoList = getTodoList();
    todoList.push(newTodo);
    localStorage.setItem('todo_list', JSON.stringify(todoList));

    // apply dom
    const newLiElement = createToDoElement(newTodo);
    const ulElement = document.getElementById('todo-list');
    if (!ulElement) return;
    ulElement.appendChild(newLiElement);
  }

  // reset value from input
  delete todoForm.dataset.id;
  todoForm.reset();
}

// main
(() => {
  console.log('work!! 19-19-update-todo.js');
  // const todoList = [
  //   { id: 1, title: 'Learn HTML/CSS', status: 'pending' },
  //   { id: 2, title: 'Learn Javascript', status: 'completed' },
  //   { id: 3, title: 'Learn NextJS', status: 'pending' },
  //   { id: 4, title: 'Learn Git', status: 'pending' },
  // ];

  const todoList = getTodoList();
  const params = new URLSearchParams(window.location.search);
  renderTodoList(todoList, 'todo-list', params);

  // register submit event for todo form
  const todoForm = document.getElementById('todoFormId');
  if (todoForm) {
    todoForm.addEventListener('submit', handleToDoFormSubmit);
  }
})();
