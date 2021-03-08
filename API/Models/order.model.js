const mongoose = require('mongoose');
//creating the order schema
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: String, required: true },
    address: {
        userId: { type: String, required: true },
        addressline1: { type: String, required: true },
        addressline2: { type: String, required: true },
        phone: { type: String, required: true },
        name: { type: String, required: true },
        pin: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
    },
    ordertotal: { type: String, required: true },
    order: [{
        restaurentId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: String, required: true },
        cuisine: { type: String, required: true },
        type: { type: String, required: true },
        image: { type: String, required: true }
    }],
    status: { type: String, required: true },
    remarks: [{ type: String }],
    modeofpayment: { type: String, required: true },

});
//exporting module
module.exports = mongoose.model('order', orderSchema);