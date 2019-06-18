import TaskList from './task_list'
import Task from './task'
window.taskList = new TaskList(); 
/**
 * // не стоит засорять window вообще, достаточно было объявить переменную в этом scope
 * const taskList = new TaskList();
 */

document.onload = new function(){
    updateView(window.taskList.tasks);
};

document.getElementById("clear_all_button").onclick = function(){   
    if(confirm("DELETE TASKS ?")){
        taskList.clearAllTasks();
        var tasklistDiv = document.getElementById("task_list");
        tasklistDiv.innerHTML = "";
    };
};

document.getElementById("add_button").onclick = function(){
    var newTask = prompt("Please enter task name");
    if(newTask!=="" && newTask!==null && newTask!==undefined){ // проверку на empty можно сделать просто `if (x)` этого достаточно для проверки на null, undefined, 0, false и '' (пустая строка)
        window.taskList.add(newTask);
        document.getElementById("search_input").value = "";
        updateView(window.taskList.tasks);
    };
};

document.getElementById("search_input").onkeyup = function(){
   var filteredTaskList =  window.taskList.searchByWord(document.getElementById("search_input").value);
   updateView(filteredTaskList);
};

function updateView(tasks){
    var tasklistDiv = document.getElementById("task_list");
    tasklistDiv.innerHTML = "";
    for(var i=0;i<tasks.length;i++)
    {
        var isChecked = (tasks[i]._isComplete ===true) ? "checked" : "";
        document.getElementById("task_list").insertAdjacentHTML('afterbegin', 
        `<div>  
        <input type="checkbox" onclick="window.taskList.setActive(`+tasks[i]._id+`)" ` + isChecked + `></input>
        <label>`+ tasks[i]._name +`</label>
        <button class="btn btn-large text-danger" onclick="
            new function(){
                parentNode.remove();
                window.taskList.remove(`+ tasks[i]._id+`);}">x</button>
        </div>`
        );
    };  
}