const MONGOOSE = require('mongoose');
MONGOOSE.set('debug', true);
MONGOOSE.connect('mongodb://localhost/todo-api');

MONGOOSE.Promise = Promise;

module.exports.TODO = require('./todo');