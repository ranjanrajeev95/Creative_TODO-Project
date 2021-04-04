
// UI Elements

var form = document.querySelector('form');
var ul = document.querySelector('.todo-list');
var toDo = document.querySelector('.todo-input');
const filterOption = document.querySelector('.filter-todo');
const clear = document.querySelector('.clear-todos');

document.addEventListener('DOMContentLoaded', getTodos);
form.addEventListener('submit', addTask);
ul.addEventListener('click', removeTask);
filterOption.addEventListener('click', filterTodo);
clear.addEventListener('click', clearAllTodo)

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach((todo) => {
        // Create Element
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        
        // Create LI
        const li = document.createElement('li');
        li.innerText = todo;
        li.classList.add('todo-item');

        todoDiv.appendChild(li);

        const link = document.createElement('button');
        link.innerHTML = '<i class = "fas fa-check"></i>';
        link.classList.add('complete-btn');
        todoDiv.appendChild(link);
        const deleteLink = document.createElement('button');
        deleteLink.innerHTML = '<i class = "far fa-times-circle"></i>';
        deleteLink.classList.add('delete-btn');
        todoDiv.appendChild(deleteLink);

        ul.appendChild(todoDiv);
    })
}

function addTask(e) {

    if(validate() == true) {
        
            // Create Element
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");
            
            // Create LI
            const li = document.createElement('li');
            li.innerText = toDo.value;
            li.classList.add('todo-item');
        
            todoDiv.appendChild(li);
        
            const link = document.createElement('button');
            link.innerHTML = '<i class = "fas fa-check"></i>';
            link.classList.add('complete-btn');
            todoDiv.appendChild(link);
            
            const deleteLink = document.createElement('button');
            deleteLink.innerHTML = '<i class = "far fa-times-circle"></i>';
            deleteLink.classList.add('delete-btn');
            todoDiv.appendChild(deleteLink);
        
            ul.appendChild(todoDiv);
        
            todoInLocalStorage(toDo.value);
        
    }

    e.preventDefault();
}

function removeTask(e) {
    const item = e.target;

    // Delete
    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall");

        removeFromLocal(todo);
        
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
    }

    // Check
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = ul.childNodes;

    console.log(todos);

    todos.forEach((todo) => {
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

function todoInLocalStorage(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo)

    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeFromLocal(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;

    todos.splice(todos.indexOf(todoIndex), 1);
    console.log(todoIndex)

    localStorage.setItem('todos', JSON.stringify(todos));

    // todos.forEach((todo, index) => {
    //     if(todoItem)
    // })
}

// Clear all from UI
function clearAllTodo() {
    while(toDo.firstChild) {
        toDo.remove(toDo.firstChild);
    }

    clearAlltodoFromLS();
    location.reload();
}

// Clear all from Local Storage
function clearAlltodoFromLS() {
    localStorage.clear();
}

// For Validation
function validate() {
    if(toDo.value == ''){
        showMessage('Please enter todo name', "red");
        return false;
    } else {
        showMessage("Successfully Added", "green");
        return true;
    }
}

// Show Message
function showMessage(msg, color) {
    // Create Elements
    const div = document.createElement('div');

    const p = document.createElement('p');

    div.className = 'msg';

    p.textContent = msg;
    p.style.color = color;

    div.appendChild(p);

    var after = document.querySelector('.container');
    var before = document.querySelector('form');

    after.insertBefore(div, before);

    setTimeout(function() {
        document.querySelector('.msg').remove();
    }, 1000);

}