export default class Task{
    constructor(name){
        this._id = new Date().getTime();
        this._name = name;
        this._isComplete = false;
    };
}