const mongoose = require('mongoose');
//creating the address schema
const addressSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   userId:{type:String,required:true},
  addressline1:{type:String,required:true},
  addressline2:{type:String,required:true},
  phone:{type:String,required:true},
  name:{type:String,required:true},
  pin:{type:String,required:true},
  city:{type:String,required:true},
  state:{type:String,required:true},


});
//exporting module
module.exports = mongoose.model('address',addressSchema);