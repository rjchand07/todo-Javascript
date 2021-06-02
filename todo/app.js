// create selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterList = document.querySelector('.filter-todos');

// create listeners

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', delTodo);
filterList.addEventListener('click', filterTodo);
// create functions

function addTodo(event) {
    // prevent form from submitting
    event.preventDefault();

    // create div

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo")

    // create list

    const todoItem = document.createElement("li");
    todoItem.innerText = todoInput.value;
    todoItem.classList.add("todo-item");
    todoDiv.appendChild(todoItem);
    // add todo local storage
    saveLocalTodos(todoInput.value);
    // create completed button

    const completedButton = document.createElement('button')
    completedButton.innerHTML = "<i class='fas fa-check'></i>"
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton)

    // create trash button

    const trashButton = document.createElement('button')
    trashButton.innerHTML = "<i class='fas fa-trash'></i>"
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)

    // clear input value
    todoInput.value = "";
}

function delTodo(e) {
    const item = e.target
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // animation
        todo.classList.add('fall');
        todo.remove()
    }

    if (item.classList[0] === 'completed-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;

        }
    })

}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}