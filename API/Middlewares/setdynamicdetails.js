const FoodItem = require('../Models/fooditem.model');
const mongoose = require('mongoose');
const Restaurent = require('../Models/restaurent.model');

module.exports = async (req, res, next) => {
    const id = req.body.restaurentId;
    const saleprice = req.body.saleprice;
    const offer = req.body.offer;
    try {

        const maxOffer = await FoodItem.find({ restaurentId: id }, 'offer').sort({ offer: -1 }).limit(1);
        const minSalePrice = await FoodItem.find({ restaurentId: id }, 'saleprice').sort({ saleprice: 1 }).limit(1);


        if (maxOffer.length > 0 && minSalePrice.length > 0) {
            console.log(maxOffer, minSalePrice);
            if (maxOffer[0].offer < offer) {
                try {
                    const result1 = await Restaurent.findOneAndUpdate({ _id: id }, { $set: { currentOffer: offer } });
                 
                } catch (error) {
                    res.status(403).json(error);
                }

            }
            if (minSalePrice[0].saleprice > saleprice) {
                try {
                    const result2 = await Restaurent.findOneAndUpdate({ _id: id }, { $set: { startsFrom: saleprice } });
                      console.log(result2);
                } catch (error) {
                    res.status(404).json(error);
                }

            }
            next();
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json(error);
    }

}