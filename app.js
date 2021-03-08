const express = require('express');

const app = express();

const userRoutes = require('./API/Routes/users.routes')


app.use('/users',userRoutes);
app.use((req,res,next)=>{
res.status(200).json({message:'listening'});
});

module.exports = app;