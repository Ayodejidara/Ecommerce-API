require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const userRouter = require('./routes/userRouter');
const globalErrorHandler = require('./controller/errorController');

app.use(express.json());

app.use('/api/v1/user',userRouter);

app.all('*',(req,res,next) =>{
    res.status(404).send('Route not defined');
    next();
})

app.use(globalErrorHandler);

module.exports = app;