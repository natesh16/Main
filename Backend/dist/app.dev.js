"use strict";

var express = require("express");

var cookiePraser = require('cookie-parser');

var midelware = require("./middleware/error"); //Router 


var products = require("./Routes/product");

var auth = require('./Routes/auth');

var order = require('./Routes/order');

var app = express();
app.use(express.json());
app.use(cookiePraser());
app.use('/nscart', products);
app.use('/nscart/auth', auth);
app.use('/nscart/auth/order', order);
app.use(midelware);
module.exports = app;