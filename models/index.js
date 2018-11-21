const MONGOOSE = require('mongoose');
const DOTENV = require('dotenv').config()

MONGOOSE.set('debug', true);
//MONGOOSE.connect('mongodb://localhost/todo-api', { useNewUrlParser: true });
MONGOOSE.connect(process.env.DB_HOST, { useNewUrlParser: true });

MONGOOSE.Promise = Promise;

module.exports.TASK = require('./task');
module.exports.USER = require('./user');

// mongodb://jessicakwalters:password8414@ds039017.mlab.com:39017/inspiretodo