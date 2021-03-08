const express = require('express');

const app = express();
 const morgan = require('morgan');
 const mongoose = require('mongoose');


 const userRoutes = require('./API/Routes/user.routes');
//  const restaurentRoutes = require('./API/Routes/restaurent.routes');
//  const foodItemRoutes = require('./API/Routes/fooditem.routes');
//  const locationRoutes = require('./API/Routes/location.routes');
//  const cartRoutes = require('./API/routes/cartitem.routes');




mongoose.connect('mongodb+srv://yusufkhan2546:@likh@n@123$@nodetestcluster.qigkd.mongodb.net/NodeTestCluster?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));
app.use((req,res,next)=> {
res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Headers','*');
if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','PUT,PATCH,POST,GET,DELETE');
    return res.status(200).json({});
}
next();
});

app.use('/users',userRoutes);
//  app.use('/restaurents',restaurentRoutes);
//  app.use('/fooditems',foodItemRoutes);
//  app.use('/location',locationRoutes);
//  app.use('/cart',cartRoutes);

app.use((req,res,next)=>{
res.status(200).json({message:'listening'});
});

module.exports = app;