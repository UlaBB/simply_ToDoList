const app = {

  getElements: function () {
    this.toDoButton = document.querySelector('.toDo__button');
    this.toDoInput = document.querySelector('.toDo__input');
    this.toDoList = document.querySelector('.toDo__container__list');
    this.filterContainer = document.querySelector('.filter-todos');
  },

  addItemToList: function () {
    this.toDoButton.addEventListener('click', e => {
      e.preventDefault();

      this.createToDoDiv();
      this.saveLocalToDoList(this.toDoInput.value);
      this.createCompletedBtn();
      this.createTrashBtn();

      this.toDoList.appendChild(this.todoDiv);
      this.toDoInput.value = '';
    });
  },

  createToDoDiv: function () {

    this.todoDiv = document.createElement('div');
    this.todoDiv.classList.add('todo');
    const newToDo = document.createElement('li');
    newToDo.innerText = this.toDoInput.value;
    newToDo.classList.add('toDo__newItem');
    this.todoDiv.appendChild(newToDo);
  },

  createCompletedBtn: function () {

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    this.todoDiv.appendChild(completedButton);
  },

  createTrashBtn: function () {

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    this.todoDiv.appendChild(trashButton);
  },

  deleteCheck: function () {
    this.toDoList.addEventListener('click', e => {
      const item = e.target;

      if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        this.removeLocalStorage(todo);
        todo.addEventListener('transitionend', function () {
          todo.remove();
        });
      }

      if (item.classList[0] === 'completed-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
      }
    });
  },

  filterList: function () {
    this.filterContainer.addEventListener('click', e => {
      const options = this.toDoList.childNodes;
      for (let option of options) {
        switch (e.target.value) {
          case 'all':
            option.style.display = 'flex';
            break;
          case 'completed':
            if (option.classList.contains('completed')) {
              option.style.display = 'flex';
            } else {
              option.style.display = 'none';
            }
            break;
          case 'uncompleted':
            if (!option.classList.contains('completed')) {
              option.style.display = 'flex';
            } else {
              option.style.display = 'none';
            }
        }
      }
    });
  },

  saveLocalToDoList: function (todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  },

  saveLocalStorage: function () {
    document.addEventListener('DOMContentLoaded', e => {
      let todos;
      if (localStorage.getItem('todos') === null) {
        todos = [];
      }
      else {
        todos = JSON.parse(localStorage.getItem('todos'));
      }
      for (let todo of todos) {
        this.todoDiv = document.createElement('div');
        this.todoDiv.classList.add('todo');
        const newToDo = document.createElement('li');
        newToDo.innerText = todo;
        newToDo.classList.add('toDo__newItem');
        this.todoDiv.appendChild(newToDo);
        this.createCompletedBtn();
        this.createTrashBtn();

        this.toDoList.appendChild(this.todoDiv);
        this.saveLocalToDoList(this.toDoInput.value);
        this.toDoInput.value = '';
      }
    });
  },

  removeLocalStorage: function (todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
      todos = [];
    }
    else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
  },


  init: function () {
    this.getElements();
    this.addItemToList();
    this.deleteCheck();
    this.filterList();
    this.saveLocalStorage();
    localStorage.clear();
    //this.saveLocalStorage();
  }
};

app.init();

