"use strict";

var catchAsyncerror = require('../middleware/catchAsyncerror');

var Order = require("../model/ordermodels");

var product = require("../model/productmodels");

var ErrorHandler = require('../utils/errorehandeler'); //Create new order =/oder/createneworder 


exports.neworder = catchAsyncerro(function _callee(req, res, next) {
  var _req$body, shippingInfo, ordeItems, itemsPrices, taxPrice, shippingprice, totalPrice, paymentInfo, order;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, shippingInfo = _req$body.shippingInfo, ordeItems = _req$body.ordeItems, itemsPrices = _req$body.itemsPrices, taxPrice = _req$body.taxPrice, shippingprice = _req$body.shippingprice, totalPrice = _req$body.totalPrice, paymentInfo = _req$body.paymentInfo;
          _context.next = 3;
          return regeneratorRuntime.awrap(Order.create({
            shippingInfo: shippingInfo,
            ordeItems: ordeItems,
            itemsPrices: itemsPrices,
            taxPrice: taxPrice,
            shippingprice: shippingprice,
            totalPrice: totalPrice,
            paymentInfo: paymentInfo,
            paidAt: Date.now(),
            user: req.user.id
          }));

        case 3:
          order = _context.sent;
          res.status(200).json({
            sucess: true,
            message: "Order Created",
            order: order
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}); //get Single Order 

exports.getSingleorder = catchAsyncerror(function _callee2(req, res, next) {
  var order;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Order.findById(req.params.id).populate('user', 'name email'));

        case 2:
          order = _context2.sent;

          if (order) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", next(new ErrorHandler("Order not found for this id : ".concat(req.params.id))));

        case 5:
          res.statuscode(200).json({
            sucess: true,
            message: "Order Deatils given below",
            order: order
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //get loggedin user order 

exports.myOrder = catchAsyncerror(function _callee3(req, res, next) {
  var order;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Order.find({
            user: req.user.id
          }));

        case 2:
          order = _context3.sent;

          if (order) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", next(new ErrorHandler("Order not found for this id : ".concat(req.params.id))));

        case 5:
          res.statuscode(200).json({
            sucess: true,
            message: "Order Deatils given below",
            order: order
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //Admin:Order controller
//Admin Get all the orders

exports.Adminorder = catchAsyncerror(function _callee4(req, res, next) {
  var order, totalAmount;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Order.find());

        case 2:
          order = _context4.sent;
          totalAmount = 0;
          order.foreach(function (order) {
            totalAmount += order.totalPrice;
          });

          if (order) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", next(new ErrorHandler("Order not found for this id : ".concat(req.params.id))));

        case 7:
          res.status(200).json({
            sucess: true,
            message: "Order Deatils given below",
            order: order
          });

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //Admin:update order / order Status -api/v1/order:id

exports.updateOrder = catchAsyncerror(function _callee6(req, res, next) {
  var order;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Order.findById(req.params.id));

        case 2:
          order = _context6.sent;

          if (!(order == "delivered")) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", next(new (ErrorHandler("Order has been delivered", 400))()));

        case 5:
          //updateing the product quantity
          order.orderItems = foreach(function _callee5(orderItems) {
            return regeneratorRuntime.async(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    updateStock(orderItems.product, orderItems.Quantity);

                  case 1:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          });
          order.Orderstatus = req.body.orderStatus();
          order.deliveredAt = Date.now();
          _context6.next = 10;
          return regeneratorRuntime.awrap(order.save());

        case 10:
          res.status(200).json({
            sucess: true,
            message: "order updated",
            order: order
          });

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  });
});

function updateStock(productId, Quantity) {
  var product;
  return regeneratorRuntime.async(function updateStock$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(product.findById(productId));

        case 2:
          product = _context7.sent;
          product.stock = product.stock - Quantity;
          product.save({
            validateBeforSave: false
          });

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
} //Admin:Order Delete router


exports.orderDelete = catchAsyncerror(function _callee7(req, res, next) {
  var order;
  return regeneratorRuntime.async(function _callee7$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(Order.findById(req.params.id));

        case 2:
          order = _context8.sent;

          if (order) {
            _context8.next = 5;
            break;
          }

          return _context8.abrupt("return", next(new ErrorHandler("Order has not found on this id ".concat(req.params.id), 400)));

        case 5:
          _context8.next = 7;
          return regeneratorRuntime.awrap(order.remove());

        case 7:
          res.status(200).json({
            sucess: true,
            message: "order has deleted"
          });

        case 8:
        case "end":
          return _context8.stop();
      }
    }
  });
});