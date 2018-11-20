const MONGOOSE = require('mongoose');
MONGOOSE.set('debug', true);
//MONGOOSE.connect('mongodb://localhost/todo-api', { useNewUrlParser: true });
MONGOOSE.connect('mongodb://jessicakwalters:password8414@ds039017.mlab.com:39017/inspiretodo', { useNewUrlParser: true });

MONGOOSE.Promise = Promise;

module.exports.TASK = require('./task');
module.exports.USER = require('./user');