import Task from './task'
import TaskWithSubtask from './task_with_subtask';

export default class TaskList {
    public tasks: any[];

    constructor() {
        if (localStorage.getItem("ItemsList")) {
            this.tasks = Array.from(JSON.parse(localStorage.getItem("ItemsList")));
        }
        else {
            localStorage.setItem("ItemsList", JSON.stringify([]));
            this.tasks = [];
        };
    };

    searchByWord(word: string) {
        if (word !== "") {
            var filteredTasks = [];
            this.tasks.forEach(function (task) {
                var string = task._name.toLocaleLowerCase(),
                    regex = new RegExp(word.toLocaleLowerCase());
                if (regex.test(string)) {
                    filteredTasks.push(task);
                }
            });
            return filteredTasks;
        }
        else {
            return this.tasks;
        };
    };

    clearAllTasks() {
        localStorage.removeItem("ItemList");
        localStorage.setItem("ItemsList", JSON.stringify([]));
        this.tasks = [];
        console.log("ClearAllItems");
    };

    add(name: string) {
        var newTask = new TaskWithSubtask(name);
        this.tasks.push(newTask);
        localStorage.setItem("ItemsList", JSON.stringify(this.tasks));
    };


    remove(id: string) {
        this.tasks = this.tasks.filter(x=>x._id !== id);
        localStorage.setItem("ItemsList", JSON.stringify(this.tasks));
    };

    setActive(id: string) {
        this.tasks.find(x=>x._id===id)._isComplete = !this.tasks.find(x=>x._id===id)._isComplete;
        localStorage.setItem("ItemsList", JSON.stringify(this.tasks));
    };

    addSubtask(id, name) {
        this.tasks.find(x => x._id === id)._arr_subtask.push(new Task(name));
        localStorage.setItem("ItemsList", JSON.stringify(this.tasks));
    };

    removeSubtask(id, subid) {
        this.tasks.find(x => x._id === id)._arr_subtask = this.tasks.find(x => x._id === id)._arr_subtask.filter(x => x._id !== subid);
        localStorage.setItem("ItemsList", JSON.stringify(this.tasks));
    };

    setActiveSubtask(id: string, subid: string) {
        this.tasks.find(x => x._id === id)._arr_subtask.find(x => x._id === subid)._isComplete = !this.tasks.find(x => x._id === id)._arr_subtask.find(x => x._id === subid)._isComplete;
        localStorage.setItem("ItemsList", JSON.stringify(this.tasks));
    };

    addDate(id: string, date: string) {
        this.tasks.find(x => x._id === id)._deadline = Date.parse(date);
        localStorage.setItem("ItemsList", JSON.stringify(this.tasks));
    };

}