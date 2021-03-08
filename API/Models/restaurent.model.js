const mongoose = require('mongoose');
//creating the restaurent schema
const restaurentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    phone:{type:String, unique:true,required:true},
    email:{type:String,
         required:true,
         unique:true,
    match:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    password:{type:String,required:true},
    name:{type:String,required:true},
    address:{
            addressline1:{type:String,required:true},
            addressline2:{type:String,required:true},
            name:{type:String,required:true},
            phone:{type:String,required:true},
            city:{type:String,required:true},
            state:{type:String,required:true},
            pin:{type:String,required:true},
             },
    rating:{type:String},
    isOpen:{type:Boolean,value:false},
    difficultweather:{type:Boolean,value:false},
    closingtime:{type:String},
    openingtime:{type:String},
    token:{type:String},
    startsFrom:{type:Number},
    currentOffer:{type:Number}
});
//exporting module
module.exports = mongoose.model('restaurent',restaurentSchema);