const MONGOOSE = require('mongoose');
const PASSPORTLOCALMONGOOSE = require('passport-local-mongoose');

const USERSCHEMA = new MONGOOSE.Schema({
    username: String,
    password: String
});

USERSCHEMA.plugin(PASSPORTLOCALMONGOOSE);

const USER = MONGOOSE.model('User', USERSCHEMA);


module.exports = USER;