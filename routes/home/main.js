const express = require('express');
const router = express.Router();
const Post = require('../../models/Posts');
const Category= require('../../models/Category');

router.all('/*',function(req,res,next){
    req.app.locals.layout="home"; // resetting defaultlayout to be admin when this route is run
    next();
});

router.get('/',function(req,res){
   Post.find({}).then(posts => {
       Category.find({}).then(categories=>{
           res.render('home/index', {posts: posts,categories:categories});
       })

      // res.render('home/index', {posts: posts});  //
   });
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
router.get('/post/:id',function (req,res){
    Post.findOne({_id:req.params.id}).then(post=>{
        Category.find({}).then(categories=> {
res.render('home/post',{post:post,categories:categories})
        })
    });

});
module.exports=router;
