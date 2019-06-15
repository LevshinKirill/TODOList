import Task from './task'
import TaskWithDate from './task_with_date'

export default class TaskList{
    constructor(){
        if(localStorage.getItem("ItemsList")!==null && localStorage.getItem("ItemsList")!==undefined)
        {
            console.log(localStorage.getItem("ItemsList"));
            this.tasks = Array.from(JSON.parse(localStorage.getItem("ItemsList","Task")));
        }
        else
        {
            localStorage.setItem("ItemsList",JSON.stringify([]));
        };
    }

    searchByWord(word){
        if(word!==""){
            var filteredTasks = [];
            this.tasks.forEach(function(task){
                var string = task.name,
                regex = new RegExp(word);
                if(regex.test(string)===true){
                    filteredTasks.push(task);
                }
            });
            return filteredTasks;
        }
        else{
            return this.tasks;
        }
    }

    clearAllTasks(){
        localStorage.clear("ItemList");
        localStorage.setItem("ItemsList",JSON.stringify([]));
        this.tasks = [];
        console.log("ClearAllItems");
    }

    add(name){
        var newTask = new Task(name);
        this.tasks.push(newTask);
        localStorage.setItem("ItemsList",JSON.stringify(this.tasks));
        console.log(this.tasks);
    }

    remove(id){
        for(var i = 0;i<this.tasks.length;i++){
            if(this.tasks[i].id===id){
                this.tasks.splice(i,1);
                localStorage.setItem("ItemsList",JSON.stringify(this.tasks));
                return;
            };
        };
    };

    setActive(id){
        for(var i = 0;i<this.tasks.length;i++){
            if(this.tasks[i].id===id){
                this.tasks[i].isComplete = !this.tasks[i].isComplete;
                console.log(this.tasks[i].isComplete);
                localStorage.setItem("ItemsList",JSON.stringify(this.tasks));
                return;
            }
        }
    }

}