'use strict'

const STORAGE_KEY = 'todoDB'
var gTodos
var gFilterBy = {
    txt: '',
    status: '',
    createTime: '',
}

_createTodos()

function setTodosForDisplay(todos) {
    if (todos.length === gTodos.length) {
        gTodos = todos
    }
}

function getTodosForDisplay() {
    var todos = gTodos

    if (gFilterBy.status) {
        todos = todos.filter(todo =>
            todo.isDone && gFilterBy.status === 'done' ||
            !todo.isDone && gFilterBy.status === 'active')
    }
    todos = todos.filter(todo => todo.txt.includes(gFilterBy.txt))

    return todos
}

function getTotalCount() {
    return gTodos.length
}

function getActiveCount() {
    const activeTodos = gTodos.filter(todo => !todo.isDone)
    return activeTodos.length
}

function removeTodo(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(idx, 1)

    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}

function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance)
    gTodos.push(todo)
    _saveTodosToStorage()
}

function setFilterByStatus(status) {
    gFilterBy.status = status
}

function setFilterByTxt(txt) {
    gFilterBy.txt = txt
}

function _createTodo(txt, importance) {
    const todo = {
        id: _makeId(),
        txt,
        isDone: false,
        createTime: new Date(),
        importance
    }
    return todo
}

function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY)

    if (!todos || !todos.length) {
        const txts = ['Learn HTML', 'Study CSS', 'Master JS']
        todos = txts.map(_createTodo)
    }

    gTodos = todos
    _saveTodosToStorage()
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos)
}

function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
