const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = 3000;
const BODYPARSER = require('body-parser');
const PASSPORT = require('passport');
const LOCALSTRATEGY = require('passport-local');
const USER = require('./models/user');
const MONGOOSE = require('mongoose');

const SESSION = require('express-session'),
MongoStore = require('connect-mongo')(SESSION);
 
APP.use(SESSION({
    secret: process.env.SESSIONSECRET,
    store: new MongoStore({ mongooseConnection: MONGOOSE.connection }),
    resave: false,
    saveUninitialized: false
}));

const TASKROUTES = require('./routes/tasks');
const USERROUTES = require('./routes/users');

APP.use(BODYPARSER.json());
APP.use(BODYPARSER.urlencoded({extended: true}));
APP.use(EXPRESS.static(__dirname + '/public'));
APP.use(EXPRESS.static(__dirname + '/views'));

APP.use(require('express-session')({
    secret: 'I love TO DO lists',
    resave: false,
    saveUninitialized: false
}));

APP.use(PASSPORT.initialize());
APP.use(PASSPORT.session());
PASSPORT.use(new LOCALSTRATEGY(USER.authenticate()));
PASSPORT.serializeUser(USER.serializeUser());
PASSPORT.deserializeUser(USER.deserializeUser());

APP.listen(PORT, () => {
    console.log('App is running on Port 3000');
});

APP.use('/api/tasks', TASKROUTES);
APP.use('/api/users', USERROUTES);

APP.get('/', (req, res) => {
    res.sendFile('index.html');
});
 