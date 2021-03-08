const Order = require('../Models/order.model');
const mongoose = require('mongoose');
exports.newOrder = (req,res,next)=>{
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
      userid:req.body.userid,
      address:req.body.address,
      ordertotal:req.body.ordertotal,
      order:req.body.order,
      status:req.body.status,
      modeofpayment:req.body.modeofpayment,
      remarks:req.body.remarks
    });
    order.save()
    .then(result => {
        console.log(result);

        res.status(201).json({
            message: "orderplaced ",
            contact: '#IAm_developer'
        })
        next();
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err,
            contact: '#IAm_developer'
        });
    });
}
exports.updateStatus = (req,res,next) =>{
    const id = req.params.orderId;
   const status = req.body.status;
    Restaurent.updateOne({ _id: id }, { $set: {status:status} })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}