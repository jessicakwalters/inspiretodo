const DB = require('../models');

exports.getTasks = (req, res) => {
    console.log(req.user._id);
    DB.TASK.find()
    .then((tasks)=>{
        console.log(tasks);
        let newTasks = tasks.filter(task => (task.author.id.equals(req.user._id)));        
        console.log(newTasks);
        res.json(newTasks);

    })
    .catch((err) => {
        res.send(err);
    })
}

exports.createTask = (req, res) => {
    
    DB.TASK.create(req.body)
    .then((newTask) => {
        newTask.author.id = req.user._id;
        newTask.author.username = req.user.username;
        newTask.save();
        res.json(newTask);
    })
    .catch((err) => {
        res.send(err);
    })
}

exports.getTask = (req, res) => {
    DB.TASK.findById(req.params.taskID)
    .then((foundTask) => {
        res.status(201).json(foundTask);
    })
    .catch((err) => {
        res.send(err);
    })
}

exports.updateTask = (req, res) => {
    DB.TASK.findOneAndUpdate({_id: req.params.taskID}, req.body, {new: true})
    .then((task) => {
        res.json(task);
    })
    .catch((err) => {
        res.send(err);
    })
}

exports.deleteTask = (req, res) => {
    DB.TASK.deleteOne({_id: req.params.taskID})
    .then(() => {
        res.json({message: 'Task Deleted!'})
    })
    .catch((err) => {
        res.send(err);
    })
}



module.exports = exports;