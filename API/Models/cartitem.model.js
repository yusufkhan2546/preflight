const mongoose = require('mongoose');
//creating the fooditem schema
const cartitemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    restaurentId:{type:String,required:true},
    name:{type:String,required:true},
    saleprice:{type:String,required:true},
    itemimage:{type:String,required:true},
    CartItemPrice:{type:Number},
    quantity:{type:Number},
    price:{type:Number},
    userId:{type:String},
    FoodItemId:{type:String}
});
//exporting module
module.exports = mongoose.model('cartitem',cartitemSchema);