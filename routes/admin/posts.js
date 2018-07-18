const express=require('express');
const router = express.Router();
const Post = require('../../models/Posts');

router.all('/*',function(req,res,next) {
    req.app.locals.layout = "admin"; // resetting defaultlayout to be admin when this route is run
    next();
});

router.get('/',function(req,res) {
    Post.find({}).then(posts => {
        res.render('admin/posts/index', {posts: posts});
    });

});


router.get('/edit/:id',function(req,res){
    Post.findOne({_id:req.params.id}).then(post=>{
        res.render('admin/posts/edit',{post:post});
    })


});
router.put('/edit/:id',function(req,res) {
    Post.findOne({_id: req.params.id}).then(post => {
        // res.send("update route works");
        if (req.body.allowComments) {
            allowComments = true;
        }
        else {
            allowComments = false;
        }
// set data coming from form to the data in the database
        post.title = req.body.title;
        post.status = req.body.post;
        post.allowComments = req.body.allowComments;
        post.body = req.body.body;
// data coming from database    // data coming from form


        post.save().then(updatedpost => {
            res.redirect('/admin/posts');
        })

    })
});


    router.get('/create', function (req, res) {
        res.render('admin/posts/create');
    })

    router.post('/create', function (req, res) {
        let allowComments = true;
        if (req.body.allowComments) {
            allowComments = true;
        }
        else {
            allowComments = false;
        }

        const newPost = new Post({

            title: req.body.title,
            status: req.body.status,
            allowComments: allowComments, // instead of passing values from from we pass them from above check becooz by default req.body.allowcomments is gonna return on instead of a boolean
            body: req.body.body


        });
        newPost.save().then(savedPost => {
            console.log(savedPost);
            res.redirect('/admin/posts');
        }).catch(error => {
            console.log("could not save post");
        })
    })

    module.exports = router
