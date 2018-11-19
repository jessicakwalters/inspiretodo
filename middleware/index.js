const middlewareObj = {};
const TASK = require('../models/task');
const USER = require('../models/user');
const DB = require('../models');

middlewareObj.checkTaskOwner = (req, res, next) => {
    DB.TASK.findById(req.params.taskID)
    .then((task) => {
            if(req.isAuthenticated() && task.author.id.equals(req.user._id)) {
                res.json(task);
                next();   
            }
        })
    .catch((err) => {
        res.send(err);
    })
}


middlewareObj.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};


module.exports = middlewareObj;