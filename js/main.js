'use strict'

function onInit() {
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay()
    const strHTMLs =
        todos.map(todo =>
            `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
                ${todo.txt} <a>Importance: ${todo.importance}</a>
                <br/>
                <span class="create-at"> ${todo.createTime}</span>
                <button class="btn btn-remove" onclick="onRemoveTodo(event, '${todo.id}')">x</button>
            </li>`)

    document.querySelector('ul').innerHTML = strHTMLs.join('')
    document.querySelector('.total-count').innerText = getTotalCount()
    document.querySelector('.active-count').innerText = getActiveCount()
    if (isTodosHaveItems()) {
        // document.querySelector('.todo-list).innerHTML = (!todos.length) ? `<h2> No todos</h2>` : ' '
    }
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    if (confirm('Are you sure you whant to remove this item? ')) {
        console.log('Removing', todoId)
        removeTodo(todoId)
        renderTodos()
    }
}

function onToggleTodo(todoId) {
    console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('[name=txt]')
    const txt = elTxt.value

    const elImportance = document.querySelector('.importance')
    const importance = +elImportance.value
    if (txt) {
        console.log('Adding todo..', txt, importance)
        addTodo(txt, importance)
        renderTodos()
        elTxt.value = ''
    }
    else {
        console.log('Enter todo txt...')
        //TODO: add red color to place holder 
        //add span |+ set Time out
    }
}

function onSetFilter(status) {
    console.log('Filtering by', status)
    if (isTodosHaveItems()) {
        setFilterByStatus(status)
        renderTodos()
    }
}

function onSetFilterByTxt(filterByTxt) {
    console.log('Filtering by txt', filterByTxt)
    if (isTodosHaveItems()) {
        setFilterByTxt(filterByTxt)
        renderTodos()
    }
}

function onSetSort(value) {
    console.log('On sort by value..', value)
    const todos = getTodosForDisplay()

    switch (value) {
        case 'txt': getTodosByTxt(todos)
            break;
        case 'created': getTodosByCreated(todos)
            break;
        case 'importance': getTodosByImportance(todos)
            break;
    }
    setTodosForDisplay(todos)
    renderTodos()
}

function getTodosByTxt(todos) {
    return todos.sort((t1, t2) => t1.txt.toUpperCase().localeCompare(t2.txt.toUpperCase()))
}

function getTodosByImportance(todos) {
    return todos.sort((t1, t2) => t1.importance - t2.importance)
}

function getTodosByCreated(todos) {
    return todos.sort((t1, t2) => {
        if (t1.createTime > t2.createTime) return 1
        else if (t1.createTime < t2.createTime) return -1
        else return 0
    })
}

function foo(ev) {
    ev.preventDefault()
    console.log('Foo!')
}

function isTodosHaveItems() {
    const todos = getTodosForDisplay()
    return (todos.length) ? true : false
}