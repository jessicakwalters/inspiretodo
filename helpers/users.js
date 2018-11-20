const DB = require('../models');
const PASSPORT = require('passport');

exports.createUser = (req, res) => {
    console.log(req.body);
    DB.USER.register({username: req.body.username}, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render('/');
        }
        PASSPORT.authenticate('local')(req, res, () => {
            res.redirect('/');
        });
    });
}

