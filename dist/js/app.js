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
      this.createToDoDiv(this.toDoInput.value, true);
      //this.saveLocalToDoList(this.toDoInput.value);
      this.toDoInput.value = '';
    });
  },

  createToDoDiv: function (value, saveToLocal) {

    this.todoDiv = document.createElement('div');
    this.todoDiv.classList.add('todo');

    if(value ==='')
      return;

    const newToDo = document.createElement('li');
    newToDo.innerText = value;
    newToDo.classList.add('toDo__newItem');
    this.todoDiv.appendChild(newToDo);

    if(saveToLocal){
      this.saveLocalTodos(value);
    }

    this.createCompletedBtn();
    this.createTrashBtn();

    this.toDoList.appendChild(this.todoDiv);
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

  getToDoArray: function () {
    let todoArray;

    if(localStorage.getItem('todos') === null){
      todoArray = [];
    } else {
      todoArray =JSON.parse(localStorage.getItem('todos'));
    }
    return todoArray;
  },

  saveLocalTodos: function (todo) {
    let toDoArray = this.getToDoArray();
    toDoArray.push(todo);
    localStorage.setItem('todos', JSON.stringify(toDoArray));
  },

  getLocalTodos: function(){
    document.addEventListener('DOMContentLoaded', e =>{
      e.preventDefault();

      let toDoArray = this.getToDoArray();
      toDoArray.forEach(todo => {
        this.createToDoDiv(todo, false);
      });
    });
  },

  removeLocalStorage: function (todo) {
    let toDoArray = this.getToDoArray();
    const position = toDoArray.indexOf(todo.children[0].innerText);
    toDoArray.splice(position, 1);
    localStorage.setItem('todos', JSON.stringify(toDoArray));
  },

  init: function () {
    this.getElements();
    this.addItemToList();
    this.deleteCheck();
    this.filterList();
    this.getLocalTodos();
  }
};

app.init();

