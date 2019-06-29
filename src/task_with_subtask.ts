import Task from "./task";

export default class TaskWithSubtask extends Task {

    _id: string;
    _name: string;
    _isComplete: boolean;
    _arr_subtask: any[];
    _deadline: string;

    constructor(name: string) {
        super(name);
        this._id = new Date().getTime().toString();
        this._name = name;
        this._isComplete = false;
        this._arr_subtask = [];
        this._deadline = undefined;
    };
}