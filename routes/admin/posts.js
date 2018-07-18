const express=require('express');
const router = express.Router();
const Post = require('../../models/Posts');

router.all('/*',function(req,res,next) {
    req.app.locals.layout = "admin"; // resetting defaultlayout to be admin when this route is run
    next();
});

router.get('/',function(req,res) {
    Post.find({}).then(posts => {
        res.render('admin/posts', {posts: posts});
    });

});


router.get('/edit/:id',function(req,res){
    res.render('admin/posts/edit');
})





router.get('/create',function(req,res){
res.render('admin/posts/create');
})
router.post('/create',function(req,res) {
let allowComments=true;
if(req.body.allowComments){
    allowComments=true;
}
else{
    allowComments=false;
}

  const newPost=new Post({

    title:req.body.title,
    status:req.body.status,
    allowComments:allowComments, // instead of passing values from from we pass them from above check becooz by default req.body.allowcomments is gonna return on instead of a boolean
    body:req.body.body





});
    newPost.save().then(savedPost=>{
     console.log(savedPost);
        res.redirect('/admin/posts');
    }).catch(error=>{
        console.log("could not save post");
    })
})
module.exports=router;
