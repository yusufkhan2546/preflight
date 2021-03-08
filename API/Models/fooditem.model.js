const mongoose = require('mongoose');
//creating the fooditem schema
const fooditemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    restaurentId:{type:String,required:true},
    name:{type:String,required:true},
    price:{type:String,required:true},
    cuisine:[{type:String,required:true}],
    detail:{type:String,required:true},
    images:[{type:String,required:true}],
    rating:{type:Number},
    offer:{type:Number},
    saleprice:{type:Number}
});
//exporting module
module.exports = mongoose.model('fooditem',fooditemSchema);