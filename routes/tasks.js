const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DB = require('../models');
const HELPERS = require('../helpers/tasks');
const MIDDLEWARE = require('../middleware');

//GET & POST
ROUTER.route('/')
    .get(MIDDLEWARE.isLoggedIn, HELPERS.getTasks)
    .post(MIDDLEWARE.isLoggedIn, HELPERS.createTask)

//SHOW & PUT & DELETE
ROUTER.route('/:taskID')
    .get(MIDDLEWARE.checkTaskOwner, HELPERS.getTask)
    .put(MIDDLEWARE.checkTaskOwner, HELPERS.updateTask)
    .delete(MIDDLEWARE.checkTaskOwner, HELPERS.deleteTask)
    

module.exports = ROUTER;