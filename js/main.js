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
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    if (confirm('Are you sure you whant to remove this item? ')) {
        removeTodo(todoId)
        renderTodos()
    }
}

function onToggleTodo(todoId) {
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
        addTodo(txt, importance)
        renderTodos()
        elTxt.value = ''
    }
}

function onSetFilter(status) {
    if (isTodosHaveItems()) {
        setFilterByStatus(status)
        renderTodos()
    }
}

function onSetFilterByTxt(filterByTxt) {
    if (isTodosHaveItems()) {
        setFilterByTxt(filterByTxt)
        renderTodos()
    }
}

function onSetSort(value) {
    setSorteByStatus(value)
    renderTodos()
}

function foo(ev) {
    ev.preventDefault()
}

function isTodosHaveItems() {
    const todos = getTodosForDisplay()
    return (todos.length) ? true : false
}