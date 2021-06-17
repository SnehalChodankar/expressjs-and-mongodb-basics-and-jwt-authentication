const mongoose = require('mongoose');

const User = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
});

//First parameter of .model function is the name of table which will be created on mongodb,
// and the second parameter is the object that we created above.
module.exports = mongoose.model('User', User);