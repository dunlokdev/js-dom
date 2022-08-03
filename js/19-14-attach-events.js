function createToDoElement(todo) {
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

  // attach event for button
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

  return todoElement;
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

function getTodoList() {
  try {
    return JSON.parse(localStorage.getItem('todo_list')) || [];
  } catch {
    return [];
  }
}

// main
(() => {
  console.log('work!! 19-14-attach-events.js');
  // const todoList = [
  //   { id: 1, title: 'Learn HTML/CSS', status: 'pending' },
  //   { id: 2, title: 'Learn Javascript', status: 'completed' },
  //   { id: 3, title: 'Learn NextJS', status: 'pending' },
  //   { id: 4, title: 'Learn Git', status: 'pending' },
  // ];

  const todoList = getTodoList();

  renderTodoList(todoList, 'todo-list');
})();
