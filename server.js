const express= require('express');
const app= express();
const path =require('path');
const exphbs= require('express-handlebars');
const home= require('./routes/home/main');
const admin= require('./routes/admin/main');
const posts = require('./routes/admin/posts');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const methodOverride= require('method-override');

mongoose.connect('mongodb://localhost:27017/cms',{useMongoClient:true}).then(db=>{
    console.log('mongo connected');
}).catch(error=>console.log(error));


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(methodOverride('_method'));



app.use('/',home);
app.use('/admin',admin);
app.use('/admin/posts',posts);
app.use(express.static(path.join(__dirname, 'public')));

// configuration of handlebars
app.engine('handlebars',exphbs({defaultLayout:'home'})); // by default hbs is gonna look into views directory and in layouts folder
app.set('view engine','handlebars');










app.listen(5000,function(req,res){
    console.log("server is working");
})