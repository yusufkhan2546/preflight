const express = require('express');

const app = express();

const userRoutes = require('./API/Routes/users.routes')

app.use((req,res,next)=> {
res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Headers','*');

if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','PUT,PATCH,POST,GET,DELETE');
    return res.status(200).json({});
}
});

app.use('/users',userRoutes);


module.exports = app;