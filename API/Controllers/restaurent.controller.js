const Restaurent = require('../Models/restaurent.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verify_token = require('../Middlewares/token-verify');
const key = require('../../nodemon.json');
// const nodemailer = require('nodemailer');
// const hbs = require('nodemailer-express-handlebars');
var path = require('path');
var viewPath = path.join(__dirname, '/views');


//routes handler middlewares

exports.restaurent_signUp = (req, res, next) => {
    Restaurent.find({ email: req.body.email })
        .exec()
        .then(restaurent => {
            if (restaurent.length >= 1) {
                return res.status(409).json({
                    mesage: "mail exists",
                    contact: '#IAm_developer'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Auth Fail",
                            contact: '#IAm_developer'
                        })
                    } else {
                        const restaurent = new Restaurent({
                            _id: new mongoose.Types.ObjectId(),
                            phone: req.body.phone,
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            address: req.body.address,
                            closingtime: req.body.closingtime,
                            openingtime: req.body.openingtime,
                            isOpen:req.body.isOpen,
                            difficultweather:req.body.difficultweather
                        });
                        restaurent.save()
                            .then(result => {
                                console.log(result);

                                res.status(201).json({
                                    message: "restaurent Created",
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
                });
            }
        })



}
exports.restaurent_login = (req, res, next) => {
    const logdecider = req.body.email.length !== 0;
    if (logdecider) {
        Restaurent.find({ email: req.body.email },'name phone email token password isOpen difficultweather')
            .exec()
            .then(restaurent => {

                if (restaurent.length < 1) {
                    return res.status(401).json({
                        message: 'Auth failed but true',
                        contact: '#IAm_developer',


                    });
                }
                bcrypt.compare(req.body.password, restaurent[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "auth fail",
                            contact: '#IAm_developer'
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: restaurent[0].email,
                            restaurentId: restaurent[0]._id
                        }, key.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            });
                        restaurent[0].token = token;
                    
                        return res.status(200).json({
                            restaurent: {
                                _id:restaurent[0]._id,
                                name: restaurent[0].name,
                                email: restaurent[0].email,
                                phone: restaurent[0].phone,
                                token: restaurent[0].token,
                                isOpen:restaurent[0].isOpen,
                                difficultweather:restaurent[0].difficultweather
                            }

                        })
                    }
                    res.status(401).json({
                        message: "auth failed",
                        contact: '#IAm_developer'
                    });
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: '500 error',
                    contact: '#IAm_developer'
                })

            })
    } else {
        Restaurent.find({ phone: req.body.phone }, '_id name phone email token password isOpen difficultweather')
            .exec()
            .then(restaurent => {

                if (restaurent.length < 1) {
                    return res.status(401).json({
                        message: 'Auth failed but true',
                        contact: '#IAm_developer',


                    });
                }
                bcrypt.compare(req.body.password, restaurent[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "auth fail",
                            contact: '#IAm_developer'
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: restaurent[0].email,
                            restaurentId: restaurent[0]._id
                        }, key.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            });
                        restaurent[0].token = token;
                        return res.status(200).json({
                            restaurent: {
                                _id:restaurent[0]._id,
                                name: restaurent[0].name,
                                email: restaurent[0].email,
                                phone: restaurent[0].phone,
                                token: restaurent[0].token,
                                isOpen:restaurent[0].isOpen,
                                difficultweather:restaurent[0].difficultweather
                            }

                        })
                    }
                    res.status(401).json({
                        message: "auth failed",
                        contact: '#IAm_developer'
                    });
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: '500 error',
                    contact: '#IAm_developer'
                })

            })
    }

}
exports.restaurent_delete = (req, res, next) => {
    const id = req.params.restaurentId
    Restaurent.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: '500 error',
                contact: '#IAm_developer'
            })

        })
}
exports.get_allrestaurents = (req, res, next) => {
    Restaurent
        .find({},'_id name openingtime closingtime isOpen difficultweather startsFrom currentOffer rating')
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: '500 eror',
                contact: '#IAm_developer'
            })
        })
}
exports.get_restaurentbyId = (req, res, next) => {
    const id = req.params.restaurentId;
    Restaurent.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
                console.log('resof1');

            } else {
                res.status(404).json({
                    message: 'No valid Entry for id',
                    contact: '#IAm_developer'
                })
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        });
}
exports.update_restaurentbyId = (req, res, next) => {
    const id = req.params.restaurentId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Restaurent.updateOne({ _id: id }, { $set: updateOps })
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
exports.verify_tokenrestaurent = verify_token;
exports.mail = (req, res, next) => {
    try {
        const to = req.body.to;
        const subject = req.body.subject;
        const text = req.body.text;
        const html = req.body.html;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                'restaurent': 'patanyusufkhan222@gmail.com',
                'pass': '@likh@n@123$'
            }
        });

        transporter.use('compile', hbs({
            viewPath: viewPath,
            viewEngine: 'express-handlebars'
        }));
        //send mail with options
        var mail = {
            from: 'from@domain.com',
            to: 'to@domain.com',
            subject: 'Test',
            template: 'home',
            context: {
                name: 'Name'
            }
        }
        transporter.sendMail(mail);

    } catch (error) {
        return res.status(401).json({
            message: "Mail Fail",
            error: error
        })
    }

};
exports.rendertemplate = (req, res, next) => {
    res.render("home");
}
exports.getRefferalOfrestaurent = async (req, res, next) => {
    const id = req.params.referralid;
    try {
        const count = await restaurent.find({ refferal: id }).count();
        res.status(200).json(count);
    } catch (error) {
        res.status(404)
        res.send({ error: error });
    }




}
exports.setOnline = (req,res,next)=>{
    const restaurentId = req.body.id;
    const value = req.body.value;
    Restaurent.updateOne({ _id: restaurentId }, { $set: {isOpen:value} })
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
exports.setWeather = (req,res,next)=>{
    const restaurentId = req.body.id;
    const value = req.body.value;
    Restaurent.updateOne({ _id: restaurentId }, { $set: {difficultweather:value} })
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