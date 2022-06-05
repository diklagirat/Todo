'use strict'

const STORAGE_KEY = 'todoDB'
var gTodos
var gFilterBy = {
    txt: '',
    status: '',
    createTime: '',
}
var gSorteBy = {
    txt: '',
    status: '',
    createTime: '',
    importance: 1
}

_createTodos()

function getTodosForDisplay() {
    var todos = gTodos

    if (gFilterBy.status) {
        todos = todos.filter(todo =>
            todo.isDone && gFilterBy.status === 'done' ||
            !todo.isDone && gFilterBy.status === 'active'
        )
    }
    todos = todos.filter(todo => todo.txt.includes(gFilterBy.txt))

    if (gSorteBy.status) {
        _setSortTodos(gSorteBy.status, todos)
    }
    return todos
}

function _setSortTodos(value, todos) {
    switch (value) {
        case 'txt': getTodosByTxt(todos)
            break;
        case 'created': getTodosByCreated(todos)
            break;
        case 'importance': getTodosByImportance(todos)
            break;
    }
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

function setSorteByStatus(status) {
    gSorteBy.status = status
}

function setFilterByTxt(txt) {
    gFilterBy.txt = txt
}

function setSorteByTxt(txt) {
    gSorteBy.txt = txt
}

function setSorteByImpotance(importance) {
    gSorteBy.importance = importance

}

function setSorteByCreateTime(time) {
    gSorteBy.createTime = time
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
