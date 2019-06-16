import Task from './task'

export default class TaskList{
    constructor(){
        if(localStorage.getItem("ItemsList")!==null && localStorage.getItem("ItemsList")!==undefined)
        {
            this.tasks = Array.from(JSON.parse(localStorage.getItem("ItemsList","Task")));
        }
        else
        {
            localStorage.setItem("ItemsList",JSON.stringify([]));
            this.tasks = [];
        };
    };

    searchByWord(word){
        if(word!==""){
            var filteredTasks = [];
            this.tasks.forEach(function(task){
                var string = String(task._name).toLocaleLowerCase(),
                regex = new RegExp(String(word).toLocaleLowerCase());
                if(regex.test(string)===true){
                    filteredTasks.push(task);
                }
            });
            return filteredTasks;
        }
        else{
            return this.tasks;
        };
    };

    clearAllTasks(){
        localStorage.clear("ItemList");
        localStorage.setItem("ItemsList",JSON.stringify([]));
        this.tasks = [];
        console.log("ClearAllItems");
    };

    add(name){
        var newTask = new Task(name);
        this.tasks.push(newTask);
        localStorage.setItem("ItemsList",JSON.stringify(this.tasks));
    };


    remove(id){
        for(var i = 0;i<this.tasks.length;i++){
            if(this.tasks[i]._id===id){
                this.tasks.splice(i,1);
                localStorage.setItem("ItemsList",JSON.stringify(this.tasks));
                return;
            };
        };
    };

    setActive(id){
        for(var i = 0;i<this.tasks.length;i++){
            if(this.tasks[i]._id===id){
                this.tasks[i]._isComplete = !this.tasks[i]._isComplete;
                localStorage.setItem("ItemsList",JSON.stringify(this.tasks));
                return;
            }
        }
    };

}