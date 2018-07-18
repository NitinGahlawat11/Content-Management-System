const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({

    user:{

    },
    title:{
        type:String,
        require:true
    },
    status:{
type:String,
        default:'public'
    },
    allowComments:{
type:Boolean,
        require:true
    },
    body:{
type:String,
        require:true
    }

});
module.exports=mongoose.model('posts',PostSchema);