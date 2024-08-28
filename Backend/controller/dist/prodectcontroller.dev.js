"use strict";

var Product = require('../model/productmodles');

var ErrorHandler = require('../utils/errorehandeler');

var catchAsyncError = require('../middleware/catchAsyncerror');

var APIfeature = require('../utils/APIfeature'); //GET REQUEST FOR GETTING ALL THE PRODUCTS {{BASE_URL}}/api/v1/products 


exports.getProduct = catchAsyncError(function _callee(req, res, next) {
  var resPerPage, apifeature, product;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          resPerPage = 2;
          apifeature = new APIfeature(Product.find(), req.query).search().filter().paginate(resPerPage);
          _context.next = 4;
          return regeneratorRuntime.awrap(apifeature.query);

        case 4:
          product = _context.sent;
          res.status(200).json({
            succes: true,
            count: product.length,
            product: product
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}); // POST REQUEST TO CERATE NEW PRODUCT  {{BASE_URL}}/api/v1/products/newproduct

exports.newproduct = catchAsyncError(function _callee2(req, res, next) {
  var product;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          req.body.user = req.user.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.create(req.body));

        case 3:
          product = _context2.sent;
          res.status(201).json({
            succes: true,
            product: product
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //GET SINGLE PRODUCT 

exports.getSingleProduct = catchAsyncError(function _callee3(req, res, next) {
  var product;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Product.findById(req.params.id));

        case 2:
          product = _context3.sent;

          if (product) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", next(new ErrorHandler('Product has been not found', 404)));

        case 5:
          res.status(201).json({
            succes: true,
            product: product
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //UPDATE PRODUCT 

exports.updateproduct = catchAsyncError(function _callee4(req, res, next) {
  var product;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Product.findById(req.params.id));

        case 2:
          product = _context4.sent;

          if (product) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            succes: false,
            message: "Product not Found"
          }));

        case 5:
          _context4.next = 7;
          return regeneratorRuntime.awrap(Product.findByIdAndUpdate(req.params.id, req.body, {
            "new": true,
            runValidators: true
          }));

        case 7:
          product = _context4.sent;
          res.status(200).json({
            succes: true,
            product: product
          });

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //Product delect api:

exports.deleteproduct = catchAsyncError(function _callee5(req, res, next) {
  var product;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Product.findById(req.params.id));

        case 2:
          product = _context5.sent;

          if (product) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            sucess: false,
            message: "product not fonund"
          }));

        case 5:
          _context5.next = 7;
          return regeneratorRuntime.awrap(product.deleteOne());

        case 7:
          res.status(200).json({
            sucess: true,
            message: "product delected sucessfully"
          });

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //Product Reviews

exports.CreateProductreview = catchAsyncError(function _callee6(req, res, next) {
  var _req$body, productId, rating, comment, review, product, isreview;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body = req.body, productId = _req$body.productId, rating = _req$body.rating, comment = _req$body.comment;
          review = {
            user: req.params.id,
            rating: rating,
            comment: comment
          };
          _context6.next = 4;
          return regeneratorRuntime.awrap(Product.findById(productId));

        case 4:
          product = _context6.sent;
          isreview = product.reviews.find(function (review) {
            review.user.toString() == req.user.id.toString();
          }); //finding the user and revies details 

          if (isreview) {
            //updateing the review details
            product.reviews.forEach(function (review) {
              if (review.user.id.toString() == req.user.id.toString()) {
                review.comment = comment, review.rating = rating;
              }
            });
          } else {
            //creating the review details
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length();
          } //find the average of product 


          product.ratings = product.reviews.reduce(function (acc, review) {
            return review.rating + acc;
          }, 0) / product.reviews.length;
          product.ratings = isNaN(product.rating) ? 0 : product.ratings;
          _context6.next = 11;
          return regeneratorRuntime.awrap(product.save({
            ValidateBeforeSave: false
          }));

        case 11:
          res.status(200).json({
            sucess: true,
            message: "review Added or may updated"
          });

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  });
}); //get Reviews -api/v1/reviews ?id={productId}

exports.getproductreviews = catchAsyncError(function _callee7(req, res, next) {
  var product;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Product.findById(req, query, id));

        case 2:
          product = _context7.sent;
          res.status(200).json({
            sucess: true,
            message: "product review",
            product: product
          });

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
}); //delete review

exports.deletereview = catchAsyncError(function _callee9(req, res, next) {
  var product;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          product = catchAsyncError(function _callee8(req, res, next) {
            var review, numOfReviews, ratings;
            return regeneratorRuntime.async(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    //filiter the reviews which does match the deleting review id
                    review = product.reviews.filer(function (review) {
                      return review._id.toString() !== req.query.id.toString();
                    }); //number of reviews 

                    numOfReviews = review.length; //finding the average of review

                    ratings = review.reduce(function (acc, review) {
                      return review.rating + acc;
                    }, 0) / review.length;
                    ratings = isNaN(ratings) ? 0 : ratings;
                    _context8.next = 6;
                    return regeneratorRuntime.awrap(product.findByIdAndUpdate(req.query.productId, {
                      review: review,
                      numOfReviews: numOfReviews,
                      ratings: ratings
                    }));

                  case 6:
                    res.status(200).json({
                      success: true,
                      message: "success",
                      review: review
                    });

                  case 7:
                  case "end":
                    return _context8.stop();
                }
              }
            });
          });

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
});