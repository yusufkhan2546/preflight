const CartItem = require('../Models/cartitem.model');
const mongoose = require('mongoose');
exports.additem = async (req,res,next)=>{
 const id = req.body.FoodItemId;
 try {
        const count = await CartItem.find({FoodItemId:id});
        if(count.length>0){
console.log('i found same in cart');
 
const itemid = count[0]._id;
const newquantity = count[0].quantity + req.body.quantity;
const newCartItemPrice = count[0].CartItemPrice + req.body.CartItemPrice;

 CartItem.updateOne({_id:itemid},{$set:{quantity:newquantity,CartItemPrice:newCartItemPrice}})
 .exec()
 .then(result =>{
     res.status(200).json({status:200,quantity:newquantity,CartItemPrice:newCartItemPrice});})
.catch(err => {
    console.log(err)
    res.status(500).json({
        error: err,
        contact: '#IAm_developer'
    });
});
        } else {
            const cartItem = new CartItem({
                _id: new mongoose.Types.ObjectId(),
                restaurentId: req.body.restaurentId,
                name: req.body.name,
                price: req.body.price,
                itemimage:req.body.itemimage,
                saleprice:req.body.saleprice,
                userId:req.body.userId,
                quantity:req.body.quantity,
                CartItemPrice:req.body.CartItemPrice,
                FoodItemId:req.body.FoodItemId
            });
            cartItem.save()
            .then(result => {
                res.status(201).json({
                    message: "cartItem Created",
                    contact: '#IAm_developer',
                    status:201,
                    result:result._id
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
 }catch (error){
    res.status(404)
    res.send({ error:error });
 }    
}
exports.getitembyId = (req,res,next)=>{
    const id = req.params.cartitemId;
    CartItem.findById(id)
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
    const id = req.params.userId;
    CartItem
    .find({userId:id})
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
    const id = req.params.cartitemId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
       }
   CartItem.updateOne({_id:id},{$set: updateOps })
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
    const id = req.params.cartitemId;
    CartItem.remove({_id:id})
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
exports.deletemany = (req,res,next) =>{
    const ids = req.body.ids;
    CartItem.deleteMany({_id: { $in: objects}}).exec().then(result => {
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