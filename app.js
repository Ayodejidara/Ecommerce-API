require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const categoryRouter = require('./routes/categoryRouter');
const colorRouter = require('./routes/colorRouter');
const favoriteRouter = require('./routes/favoriteRouter');
const productRouter = require('./routes/productRouter');
const reviewRouter = require('./routes/reviewRouter');
const sizeRouter = require('./routes/sizeRouter');
const userRouter = require('./routes/userRouter');
const globalErrorHandler = require('./controller/errorController');

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/color', colorRouter);
app.use('/api/v1/size', sizeRouter);
app.use('/api/v1/favorite', favoriteRouter);

app.all('*',(req,res,next) =>{
    res.status(404).send('Route not defined');
    next();
})

app.use(globalErrorHandler);

module.exports = app;