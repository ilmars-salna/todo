const myForm = document.querySelector('#myForm')
const textInput = document.querySelector('#textInput')
const submitBtn = document.querySelector('#submitBtn')
const myList = document.querySelector('#myList')
const returnJSON = document.querySelector('#returnJSON')

let todos = []
class Todo {
    constructor(id, text, isCompleted){
        this.id = id
        this.text = text
        this.isCompleted = isCompleted
    }
}

//2 example list items
let todoExample1 = new Todo(1, 'Item 1', false)
let todoExample2 = new Todo(2, 'Item 2', false)
todos.push(todoExample1)
todos.push(todoExample2)

//on form submit
myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //DATA VALIDATION
    if(textInput.value == ''){
        alert('List Item cannot be empty!')
    }else if(textInput.value.length > 32){
        alert('Cannot exceed 32 characters!')
    }else{ //CORRECT DATA
        //create new todo object
        let id = todos.length + 1
        let text = textInput.value
        let isCompleted = false
        let todo = new Todo(id, text, isCompleted)
        //push to array
        todos.push(todo)
        //append to list
        let li = document.createElement('li')
        li.classList.add('list-group-item', 'd-flex', 'align-items-center')
        let liHTML = `
            <input onclick="onCheck(this)" type="checkbox" class="mr-4 checkbox-lg">
            <span>${todo.text}</span>
            <div class="btn-group ml-auto">
                <button onclick="onEdit(this)" class="btn btn-secondary mr-1">Edit</button>
                <button onclick="onDelete(this)" class="btn btn-danger">Delete</button>
            </div>
            `
        //
        li.insertAdjacentHTML('afterbegin', liHTML)
        myList.appendChild(li)
        //clear form
        textInput.value = ''
    }
    
})

//on checkbox
function onCheck(item){
    let parentLI = item.parentElement
    //get index of LI in UL (from StackOverflow)
    let index = Array.prototype.slice.call(parentLI.parentElement.children).indexOf(parentLI)
    //console.log(index)
    //apply strike through effect and update todo object in array
    if(item.checked){
        todos[index].isCompleted = true
        item.nextElementSibling.classList.add('striked')
        //console.log(todos)
    }else{
        item.nextElementSibling.classList.remove('striked')
        todos[index].isCompleted = false
        //console.log(todos)
    }
}

//on edit
function onEdit(item){
    let btnGroup = item.parentElement
    let parentLI = btnGroup.parentElement
    //get index of LI in UL (from StackOverflow)
    let index = Array.prototype.slice.call(parentLI.parentElement.children).indexOf(parentLI)
    //define "accept" button
    let acceptHTML = `<button onclick="onAccept(this)" class="btn btn-success mr-1">Accept</button>`
    //remove edit button
    item.remove()
    //insert "accept" button
    btnGroup.insertAdjacentHTML('afterbegin', acceptHTML)
    //replace todo text with input field
    //select the span element
    let spanText = btnGroup.previousElementSibling
    spanText.innerHTML = `<input class="form-control" type="text" id="tempInput" value="${spanText.innerText}" autofocus>`
}

//on accept
function onAccept(item){
    //DATA VALIDATION
    if(document.querySelector('#tempInput').value == ''){
        alert('List Item cannot be empty!')
    }else if(document.querySelector('#tempInput').value.length > 32){
        alert('Cannot exceed 32 characters!')
    }else{ //DATA CORRECT
        let btnGroup = item.parentElement
        let parentLI = btnGroup.parentElement
        //get index of LI in UL (from StackOverflow)
        let index = Array.prototype.slice.call(parentLI.parentElement.children).indexOf(parentLI)
        //define "edit" button
        let editHTML = `<button onclick="onEdit(this)" class="btn btn-secondary mr-1">Edit</button>`
        //remove "accept" button
        item.remove()
        //insert "edit" button
        btnGroup.insertAdjacentHTML('afterbegin', editHTML)
        //select input element
        let tempInput = document.querySelector('#tempInput')
        //parent of tempInput is the span
        tempInput.parentElement.innerHTML = `${tempInput.value}`
        //update current todo object in the array
        todos[index].text = tempInput.value
    }
    
}

//on delete
function onDelete(item){
    //VALIDATION
    if(confirm('Are you sure?')){
        let btnGroup = item.parentElement
        let parentLI = btnGroup.parentElement
        //get index of LI in UL (from StackOverflow)
        let index = Array.prototype.slice.call(parentLI.parentElement.children).indexOf(parentLI)
        //remove
        parentLI.remove()
        //remove from array
        todos.splice(index, 1)
        //reasaign id's
        for(let i=0; i<todos.length; i++){
            todos[i].id = i+1
        }
    }
}

//return JSON
returnJSON.addEventListener('click', (e) => {
    let todoJSON = JSON.stringify(todos)
    console.log(todoJSON)
})