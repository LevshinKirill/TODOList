import TaskList from './task_list'
window.taskList = new TaskList();

document.onload = new function(){
    updateView(window.taskList.tasks);
};

document.getElementById("clear_all_button").onclick = function(){   
    taskList.clearAllTasks();
    var tasklistDiv = document.getElementById("task_list");
    tasklistDiv.innerHTML = "";
};

document.getElementById("add_button").onclick = function(){   
    window.taskList.add(document.getElementById("task_name_input").value);
    var currentTaskId = taskList.tasks[taskList.tasks.length-1].id;
    document.getElementById("task_list").insertAdjacentHTML('afterbegin', 
        `<div>
            <input type="checkbox"></input>
            <label width="100px" style="width:100px">`+ document.getElementById("task_name_input").value+`</label>
            <button onclick="
                new function(){
                    parentNode.remove();
                    window.taskList.remove(`+currentTaskId+`);}">x</button>
         </div> `
    );
};

document.getElementById("search_input").onkeyup = function(){
   var filteredTaskList =  window.taskList.searchByWord(document.getElementById("search_input").value);
   var tasklistDiv = document.getElementById("task_list");
   tasklistDiv.innerHTML = "";
   updateView(filteredTaskList);
};

function updateView(tasks){
    for(var i=0;i<tasks.length;i++)
    {
        document.getElementById("task_list").insertAdjacentHTML('afterbegin', 
        `<div>  
        <input type="checkbox"></input>
        <label width="100px" style="width:100px">`+ tasks[i].name+`</label>
        <button onclick="
            new function(){
                parentNode.remove();
                window.taskList.remove(`+ tasks[i].id+`);}">x</button>
        </div>`
        );
    };  
}