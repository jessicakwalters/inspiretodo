const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = 3000;
const BODYPARSER = require('body-parser');

const TASKROUTES = require('./routes/tasks');

APP.use(BODYPARSER.json());
APP.use(BODYPARSER.urlencoded({extended: true}));
APP.use(EXPRESS.static('/public'))
APP.use(EXPRESS.static(__dirname + '/views'))

APP.listen(PORT, () => {
    console.log('App is running on Port 3000');
});

APP.use('/api/tasks', TASKROUTES);

APP.get('/', (req, res) => {
    res.sendFile('index.html');
});
