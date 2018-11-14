const DB = require('../models');

exports.getTasks = (req, res) => {
    DB.TASK.find()
    .then((todos)=>{
        res.json(todos);
    })
    .catch((err) => {
        res.send(err);
    })
}

exports.createTask = (req, res) => {
    DB.TASK.create(req.body)
    .then((newTask) => {
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
    DB.TASK.remove({_id: req.params.taskID})
    .then(() => {
        res.json({message: 'Task Deleted!'})
    })
    .catch((err) => {
        res.send(err);
    })
}

module.exports = exports;