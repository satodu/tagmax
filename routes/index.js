const express = require('express');
const session = require('express-session')
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
    if (typeof req.session.user === 'undefined') {
        res.render('login/index', {title: 'Login', user : req.user});
    }else{
        res.render('campaigntags/index', {title: 'Campanhas'});
    }
});


router.get('/login', (req, res) => {
    res.render('login/index', {title: 'Login', user : req.user});
});

router.get('/campaign/add', (req, res) => {
    res.render('campaigntags/index', {title: 'Add Campaign URL Form', user : req.user});
});

router.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info){
        if(err){
            //return res.json({errors:[err]});
            return res.redirect('/login');
        }
        if(!user){
            //return res.send({ success : false, message : 'authentication failed' });
            return res.redirect('/login');
        }
        req.login(user, loginErr =>{
            if (loginErr) {
                //return res.json({errors:[loginErr]});
                return res.redirect('/login');
            }
        });
        return res.redirect('/campaign/add');
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});
module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
