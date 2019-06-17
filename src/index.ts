import TaskList from './task_list'
import Task from './task'

let taskList = new TaskList();

document.onload = new function(){
    taskList = new TaskList;
    updateView(taskList.tasks);
};

document.getElementById("clear_all_button")!.onclick = function(){   
    if(confirm("DELETE TASKS ?")){
        taskList.clearAllTasks();
        var tasklistDiv = document.getElementById("task_list");
        tasklistDiv.innerHTML = "";
    };
};

document.getElementById("add_button")!.onclick = function(){
    var newTask = prompt("Please enter task name");
    if(newTask!=="" && newTask!==null && newTask!==undefined){
        taskList.add(newTask);
        (document.getElementById("search_input") as HTMLInputElement).value = "";
        updateView(taskList.tasks);
    };
};

document.getElementById("search_input")!.onkeyup = function(){
   var filteredTaskList =  taskList.searchByWord((document.getElementById("search_input")! as HTMLInputElement).value);
   updateView(filteredTaskList);
};

function updateView(tasks: any[]){
    var tasklistDiv = document.getElementById("task_list");
    tasklistDiv!.innerHTML = "";
    for(var i=0;i<tasks.length;i++)
    {
        var isChecked = (tasks[i]._isComplete ===true) ? "checked" : "";
        document.getElementById("task_list")!.insertAdjacentHTML('afterbegin', 
        `<div>  
            <input type="checkbox" onclick="taskList.setActive(`+ tasks[i]._id+ `)" ` + isChecked + `></input>
            <label>`+ tasks[i]._name +`</label>
            <button class="btn btn-large text-danger" onclick="
                new function(){
                    parentNode.remove();
                    taskList.remove(` + tasks[i]._id +`)
                    ;}">x</button>
            </div>`
        );
    };  
}