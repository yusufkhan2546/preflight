const mongoose = require('mongoose');
//creating the user schema
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullname:{type:String,required:true},
    phone:{type:String, unique:true,required:true},
    email:{type:String,
         required:true,
         unique:true,
    match:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    password:{type:String,required:true},
    token:{type:String},
    referralcode:{type:String}
});
//exporting module
module.exports = mongoose.model('user',userSchema);