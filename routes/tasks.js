const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DB = require('../models');
const HELPERS = require('../helpers/tasks');


//GET & POST
ROUTER.route('/')
    .get(HELPERS.getTasks)
    .post(HELPERS.createTask)

//SHOW & PUT & DELETE
ROUTER.route('/:taskID')
    .get(HELPERS.getTask)
    .put(HELPERS.updateTask)
    .delete(HELPERS.deleteTask)

module.exports = ROUTER;