const express = require('express');
const router = express.Router();

router.all('/*',function(req,res,next){
    req.app.locals.layout="home"; // resetting defaultlayout to be admin when this route is run
    next();
});

router.get('/',function(req,res){
    res.render('home/index');  //
});
router.get('/about',function(req,res){
    res.render('home/about');  //
});
router.get('/login',function(req,res){
    res.render('home/login');  //
});
router.get('/register',function(req,res){
    res.render('home/register');  //
});
module.exports=
    router;
