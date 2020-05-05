//Define UI var 
const form = document.querySelector('#task-form');
//const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
//const taskInput = document.querySelector('#task');
const inputTask = document.getElementById('task');

// Load all event listeners
LoadActionLisner();


// Load all event listeners
function LoadActionLisner(){
    //DOM load event
    document.addEventListener('DOMContentLoaded',getTasks)
    // Add task event 
    form.addEventListener('submit', addTask);
    //Clear all tasks event
    clearBtn.addEventListener('click',clearTask);
    //delete task event
    taskList.addEventListener('click',deleteTask);
    //filter tasks event 
    filter.addEventListener('keyup',fiterTasks);
}
//Load tasks from LS(Local Storage)
function getTasks(e){
    let tasks;
    if(localStorage.getItem('tasks') === null ){
        tasks = [];
    }
    else{
        /*A common use of JSON is to exchange data to/from a web server.
        When receiving data from a web server, the data is always a string.
        Parse the data with JSON.parse(), and the data becomes a JavaScript object.*/
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        //create a li node
    const li = document.createElement('li');
    li.className = 'collection-item';

    // Create text node and append to li
    li.appendChild(document.createTextNode(task));

    //create a link node 
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append link node to li
    li.appendChild(link);
    
    //// Append li to ul(taskList)
    taskList.appendChild(li);

    });

}

//add task 
function addTask(e){
    if(inputTask.value === ''){
        alert('Add a Task');
    }else{
    //create a li node
    const li = document.createElement('li');
    li.className = 'collection-item';

    // Create text node and append to li
    li.appendChild(document.createTextNode(inputTask.value));

    //create a link node 
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append link node to li
    li.appendChild(link);

    //// Append li to ul(taskList)
    taskList.appendChild(li);
    storeToLocalStorage(inputTask.value);
    //Clear the input field 
    inputTask.value = '';

    }

    e.preventDefault();

}

function clearTask(e){
    //*Using innerHTML=”” property.
    //taskList.innerHTML = '';
    
    //*OR

    //*Using “removeChild()”
    // var firstchild = taskList.firstChild;
    // while(firstchild){
    //     taskList.removeChild(taskList.firstChild);
    //     firstchild = taskList.firstChild;
    // }

    //*OR
    //*Using “removeChild()”
    //var lastchild = taskList.lastChild;
    // while(lastchild){
    //     taskList.removeChild(taskList..lastChild);
    //     lastchild = taskList.lastChild;
    // }

    //*OR
    //*Using “removeChild()”
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    //clear all task from LS
    clearTasksFromLocalStorage();
    
}
//clear all task from LS'
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function deleteTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?'))
        e.target.parentElement.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement.parentElement.textContent);
    }
    

}

function fiterTasks(e){
    const searchText = e.target.value.toLowerCase();
    document.querySelectorAll('li.collection-item').forEach(function(task){
        if(task.firstChild.textContent.toLowerCase().indexOf(searchText) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });
}
//store task to local storage
function storeToLocalStorage(newTask){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        /*A common use of JSON is to exchange data to/from a web server.
        When receiving data from a web server, the data is always a string.
        Parse the data with JSON.parse(), and the data becomes a JavaScript object.*/
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(newTask);
    //The JSON. stringify() method converts a JavaScript object or value to a JSON string,
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task from local storage
function removeTaskFromLocalStorage(deleteTask){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        /*A common use of JSON is to exchange data to/from a web server.
        When receiving data from a web server, the data is always a string.
        Parse the data with JSON.parse(), and the data becomes a JavaScript object.*/

        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(task === deleteTask){
            /*The splice() method adds/removes items to/from an array, and returns the removed item(s).
            array.splice(index, howmany, item1, ....., itemX)
            index -- Required. An integer that specifies at what position to add/remove items, Use negative values to specify the position from the end of the array
            howmany--Optional. The number of items to be removed. If set to 0, no items will be removed
            item1, ..., itemX --Optional. The new item(s) to be added to the array*/

            tasks.splice(index,1);
        }
        
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));

 }