const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DB = require('../models');
const HELPERS = require('../helpers/users');
const PASSPORT = require('passport');
const LOCALSTRATEGY = require('passport-local');
const USER = require('../models/user');
  
  //handle sign up
  ROUTER.route('/')
    .post(HELPERS.createUser) 
    
  
  //===================
  //Login Routes
  //===================
  
  
  //login logic
  ROUTER.post('/login', PASSPORT.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/'
    }), (req, res) => {
        res.redirect('/');
    });
    

  
  //logout
  ROUTER.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  
  
  
  module.exports = ROUTER;
