"use strict";

var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    Doornumber: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    }
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "user"
  },
  ordeItems: {
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    },
    image: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    product: {
      type: mongoose.SchemaType.ObjectId,
      required: true,
      ref: "product"
    }
  },
  itemsPrices: {
    type: Number,
    required: true,
    "default": 0.0
  },
  taxPrice: {
    tyep: Number,
    required: true,
    "default": 0.0
  },
  shipping: {
    type: Number,
    required: true,
    "default": 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    "default": 0.0
  },
  paidAt: {
    type: Date
  },
  deliveredAt: {
    type: Date
  },
  Orderstatus: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now()
  }
});
var orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;