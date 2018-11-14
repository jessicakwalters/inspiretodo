const MONGOOSE = require('mongoose');
MONGOOSE.set('debug', true);
MONGOOSE.connect('mongodb://localhost/todo-api', { useNewUrlParser: true });

MONGOOSE.Promise = Promise;

module.exports.TASK = require('./task');