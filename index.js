const EXPRESS = require('express');
const APP = EXPRESS();
const BODYPARSER = require('body-parser');
const PASSPORT = require('passport');
const LOCALSTRATEGY = require('passport-local');
const USER = require('./models/user');
const session = require('express-session');
//const MongoStore = require('connect-mongo')(session);

const TASKROUTES = require('./routes/tasks');
const USERROUTES = require('./routes/users');

APP.use(BODYPARSER.json());
APP.use(BODYPARSER.urlencoded({extended: true}));
APP.use(EXPRESS.static(__dirname + '/public'));
APP.use(EXPRESS.static(__dirname + '/views'));

APP.use(session({
    secret: 'I love TO DO lists',
   // store: new MongoStore({ url: 'mongodb://jessicakwalters:password8414@ds039017.mlab.com:39017/inspiretodo' }),
    resave: false,
    saveUninitialized: false
}));

APP.use(PASSPORT.initialize());
APP.use(PASSPORT.session());
PASSPORT.use(new LOCALSTRATEGY(USER.authenticate()));
PASSPORT.serializeUser(USER.serializeUser());
PASSPORT.deserializeUser(USER.deserializeUser());

APP.listen(process.env.PORT || 3000, () => {
    console.log('App is running on Port 3000');
});

APP.use('/api/tasks', TASKROUTES);
APP.use('/api/users', USERROUTES);

APP.get('/', (req, res) => {
    res.sendFile('index.html');
});
 