//global declaration section
const FoodItem = require('../Models/fooditem.model');
const mongoose = require('mongoose');
exports.additem =  (req,res,next)=>{
    console.log(req.body);
    const foodItem = new FoodItem({
        _id: new mongoose.Types.ObjectId(),
        restaurentId: req.body.restaurentId,
        name: req.body.name,
        price: req.body.price,
        cuisine: req.body.cuisine,
        detail: req.body.detail,
        images:req.body.images,
        rating:req.body.rating,
        saleprice:req.body.saleprice,
        offer:req.body.offer
    });
    foodItem.save()
    .then(result => {
        res.status(201).json({
            message: "fooditem Created",
            contact: '#IAm_developer'
        })
     
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err,
            contact: '#IAm_developer'
        });
    });

    
}
exports.getitembyId = (req,res,next)=>{
    const id = req.params.fooditemId;
    FoodItem.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(200).json(doc);
                console.log('resof1');
                
            } else {
                 res.status(404).json({
                     message:'No valid Entry for id',
                     contact:'#IAm_developer'
                 })
            }
         
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        });
}
exports.getAllItems = (req,res,next)=>{
    const id = req.params.restaurentId;
    FoodItem
    .find({restaurentId:id})
    .exec()
    .then(docs => {
       const response = {
           count:docs.length,
           docs:docs
 
       }
        res.status(200).json(response)
        
         })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message:'500 eror',
            contact:'#IAm_developer'
        })
        
    })
}
exports.editItem = (req,res,next)=>{
    const id = req.params.fooditemId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
       }
   FoodItem.updateOne({_id:id},{$set: updateOps })
   .exec()
   .then(result=>{
       res.status(200).json(result);
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json({
           error:err
       })
   })
}
exports.deleteItem = (req,res,next)=>{
    const id = req.params.fooditemId;
    FoodItem.remove({_id:id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message:'500 error',
            contact:'#IAm_developer'
        })
        
    })
}