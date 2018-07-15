const express=require('express');
const router = express.Router();

router.all('/*',function(req,res,next){
    req.app.locals.layout="admin"; // resetting defaultlayout to be admin when this route is run
next();
});


router.get('/',function(req,res){
    res.render('admin/index');  //
});



module.exports=router;