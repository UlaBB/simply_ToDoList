const app = {

  getElements: function () {
    this.toDoButton = document.querySelector('.toDo__button');
    this.toDoInput = document.querySelector('.toDo__input');
    this.toDoList = document.querySelector('.toDo__container__list');
    console.log(this.toDoList);
  },

  addItemToList: function () {
    this.toDoButton.addEventListener('click', e => {
      e.preventDefault();

      this.createToDoDiv();
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

  init: function () {
    this.getElements();
    this.addItemToList();
  }

};

app.init();

