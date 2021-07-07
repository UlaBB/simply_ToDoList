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

      const todoDiv = document.createElement('div');
      todoDiv.classList.add('.todo');
      const newToDo = document.createElement('li');
      newToDo.innerText = 'hej';
      newToDo.classList.add('toDo__newItem');
      todoDiv.appendChild(newToDo);

      const completedButton = document.createElement('button');
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add('completed-btn');
      todoDiv.appendChild(completedButton);

      const trashButton = document.createElement('button');
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add('completed-btn');
      todoDiv.appendChild(trashButton);

      this.toDoList.appendChild(todoDiv);
    });
  },

  init: function () {
    this.getElements();
    this.addItemToList();
  }

};

app.init();

