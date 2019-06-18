import TaskList from './task_list'
import Task from './task'

const taskList = new TaskList();

document.onload = new function () {
    updateView(taskList.tasks);
};

document.getElementById("clear_all_button")!.onclick = function () {
    if (confirm("DELETE TASKS ?")) {
        taskList.clearAllTasks();
        var tasklistDiv = document.getElementById("task_list");
        tasklistDiv.innerHTML = "";
    };
};

document.getElementById("add_button")!.onclick = function () {
    var newTask = prompt("Please enter task name");
    if (newTask) {
        taskList.add(newTask);
        (document.getElementById("search_input") as HTMLInputElement).value = "";
        updateView(taskList.tasks);
    };
};

document.getElementById("search_input")!.onkeyup = function () {
    let filteredTaskList = taskList.searchByWord((document.getElementById("search_input")! as HTMLInputElement).value);
    updateView(filteredTaskList);
};

function updateView(tasks: any[]) {
    let tasklistDiv = document.getElementById("task_list");
    tasklistDiv!.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        let isChecked = (tasks[i]._isComplete === true) ? "checked" : "";
        let days;
        if (tasks[i]._deadline) {
            let date = Date.now() - tasks[i]._deadline;
            days = date / 86400000;
            if (-days >= 0) {
                days = " (Days left:" + (-Number.parseInt(days)) + ")";
            }
            else {
                days = " (Deadline)";
            }
        } else {
            days = "";
        };
        document.getElementById("task_list")!.insertAdjacentHTML('afterbegin',
            `<div id="div` + tasks[i]._id + `">  
                <input type="checkbox"` + isChecked + ` id="setActive` + tasks[i]._id + `"></input>
                <label>`+ tasks[i]._name + days + `</label>
                <button class="btn btn-large btn-outline-primary text-success" id="addSubtask`+ tasks[i]._id + `"> + Subtask</button>   
                <button class="btn btn-large btn-outline-primary text-primary" id="addDate`+ tasks[i]._id + `"> + Date</button>  
                <button class="btn btn-large btn-outline-primary text-danger" id="remove`+ tasks[i]._id + `">x</button>
            </div>`
        );
        document.getElementById("setActive" + tasks[i]._id)!.onclick = function () {
            taskList.setActive(tasks[i]._id);
        };
        document.getElementById("remove" + tasks[i]._id)!.onclick = function () {
            document.getElementById("div" + tasks[i]._id)!.remove();
            taskList.remove(tasks[i]._id);
        };
        document.getElementById("addSubtask" + tasks[i]._id)!.onclick = function () {
            let name = prompt("Please enter subtask name");
            if (name) {
                taskList.addSubtask(tasks[i]._id, name);
                updateView(taskList.tasks);
            };
        };
        document.getElementById("addDate" + tasks[i]._id)!.onclick = function () {
            let date = prompt("Please enter date");
            if (Date.parse(date)) {
                taskList.addDate(tasks[i]._id, date);
                updateView(taskList.tasks);
            }
            else {
                alert("This is not a date!!!");
            };
        };
        if (tasks[i]._arr_subtask.length > 0) {
            console.log(tasks[i]._arr_subtask.length);
            document.getElementById("div" + tasks[i]._id)!.insertAdjacentHTML('beforeend', '<h3>Subtasks</h3>');
            for (let y = 0; y < tasks[i]._arr_subtask.length; y++) {
                let isChecked = (tasks[i]._arr_subtask[y]._isComplete === true) ? "checked" : "";
                document.getElementById("div" + tasks[i]._id)!.insertAdjacentHTML('beforeend',
                    `<div id="subdiv` + tasks[i]._arr_subtask[y]._id + `" class="subtask"> 
                        <input type="checkbox"` + isChecked + ` id="subSetActive` + tasks[i]._arr_subtask[y]._id + `"></input>
                        <label>`+ tasks[i]._arr_subtask[y]._name + `</label>
                        <button class="btn btn-large text-danger" id="subRemove`+ tasks[i]._arr_subtask[y]._id + `">x</button>
                    </div>`
                );
                document.getElementById("subSetActive" + tasks[i]._arr_subtask[y]._id)!.onclick = function () {
                    taskList.setActiveSubtask(tasks[i]._id, tasks[i]._arr_subtask[y]._id);
                };
                document.getElementById("subRemove" + tasks[i]._arr_subtask[y]._id)!.onclick = function () {
                    taskList.removeSubtask(tasks[i]._id, tasks[i]._arr_subtask[y]._id);
                    updateView(tasks);
                };
            };
        };
    };
};