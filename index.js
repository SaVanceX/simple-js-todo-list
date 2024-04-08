const todoForm = document.getElementById('todo-form');
const todosUl = document.getElementById('todo-list');
const input = document.getElementById('todo-input');

todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(this)
  for (var data of formData.entries()) {
    updateTodos(data[1])
    appendListItem(data[1]);
    location.reload()
    input.value = ''
  }
})


const appendListItem = function (item, i) {
  
  const li = document.createElement('li')
  const liText = document.createTextNode(item)
  li.appendChild(liText)

  const button = document.createElement('button')
  button.innerHTML = "Delete";
  button.setAttribute('key', i);
  button.setAttribute('id', 'delete-button')

  li.appendChild(button)

  todosUl.appendChild(li);
}



// grabs todos from local storage
// if todos do not exist on local storage returns empty array else returns array of todos
const getTodos = () => {
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  return todos;
}

// updates todos array
const updateTodos = (inputData) => {
  const todos = getTodos();
  todos.push(inputData)
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Handles rendering todos
const renderTodos = () => {
  const todos = getTodos();
  todos.forEach((item, i) => {
    appendListItem(item,i)
  });
}

renderTodos();

const deleteButtons = document.querySelectorAll('#delete-button')
deleteButtons.forEach((button) => {
  button.addEventListener('click', function(event) {
    const todos = getTodos()
    todos.splice(button.getAttribute('key'), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    location.reload()
  })
});
