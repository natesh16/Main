"use strict";

var User = require("../model/userModel");

var catchAsyncerror = require("../middleware/catchAsyncerror");

var ErrorHandler = require("../utils/errorehandeler");

var sendtoken = require('../utils/nst'); //Registed user


exports.registerUser = catchAsyncerror(function _callee(req, res, next) {
  var _req$body, name, email, password, role, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, role = _req$body.role;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.create({
            name: name,
            email: email,
            password: password,
            role: role
          }));

        case 3:
          user = _context.sent;
          sendtoken(user, 200, res);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}); //login user

exports.LoginUser = catchAsyncerror(function _callee2(req, res, next) {
  var _req$body2, email, password, user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", next(new ErrorHandler("Please Enter the Valid Email or Password")));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).select("+password"));

        case 5:
          user = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(!user.isValidpassword(password));

        case 8:
          if (!_context2.sent) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", next(new ErrorHandler("Invalid Email OR Password", 400)));

        case 10:
          sendtoken(user, 200, res);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //logout user

exports.logoutuser = function (req, res, next) {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httponly: true
  }).status(200).json({
    sucess: true,
    message: "Loggedout"
  });
}; //resetpassword request


exports.ressetToken = catchAsyncerror(function _callee3(req, res, next) {
  var email, user, token, transporters, message;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          email = req.body.email;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 3:
          user = _context3.sent;

          if (user) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "User is invalid or Not Found"
          }));

        case 6:
          token = Math.random().toString(36).slice(-8);
          user.resetpasswordToken = token;
          user.resetpasswordTokenExpie = Date() * 3600000;
          _context3.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          console.log(token);
          transporters = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "natesh0917@gmail.com",
              pass: "cips xmsa jikk ejin"
            }
          });
          message = {
            from: "natesh0917@gmail.com",
            to: user.email,
            subject: "password resset requested",
            text: "From your request we are providing a password reset token here..\"".concat(token, "\"\n\n if your not requested just ignore it ")
          };
          transporters.sendMail(message, function (err, info) {
            if (err) {
              res.status(404).json({
                message: "somethink went wrong! try again"
              });
            }

            res.status(200).json({
              message: "mail has been send to the email" + info.response
            });
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.resetpassword = catchAsyncerror(function _callee4(req, res, next) {
  var token, Newpassword, Confirmpassword, user, password;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          token = req.params.token;
          Newpassword = req.body.Newpassword;
          Confirmpassword = req.body.Confirmpassword;
          _context4.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            resetpasswordToken: token,
            resetpasswordExpires: {
              $gt: Date.now()
            }
          }));

        case 5:
          user = _context4.sent;
          password = user.Confirmpassword(Newpassword, Confirmpassword);
          res.status(200).json({
            message: "new password updated to ".concat(password)
          }); // const user=await User.findOne({
          //     resetpasswordToken:token,
          //     resetpasswordExpires:{ $gt : Date.now()}
          // })
          // if(!user){
          //     return res.status(400).json({message:"Invalid user data"})
          // }
          // const hashpassword= await bcrypt.hash(password,10)
          // user.password=hashpassword
          // user.resetpasswordExpires=null,
          // user.resetpasswordToken=null,

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //get user profile

exports.getuserprofile = catchAsyncerror(function _callee5(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 2:
          user = _context5.sent;
          res.status(200).json({
            sucess: true,
            message: "User data obtained",
            user: user
          });

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //change password

exports.changepassword = catchAsyncerror(function _callee6(req, res, next) {
  var _req$body3, currentpassword, Newpassword, user;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body3 = req.body, currentpassword = _req$body3.currentpassword, Newpassword = _req$body3.Newpassword;
          _context6.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select("+password"));

        case 3:
          user = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(user.isValidpassword(req.body.currentpassword));

        case 6:
          if (_context6.sent) {
            _context6.next = 8;
            break;
          }

          return _context6.abrupt("return", next(ErrorHandler("Password is incorrect", 401)));

        case 8:
          //assigning new password
          user.password = req.body.Newpassword;
          _context6.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          res.status(200).json({
            sucess: true,
            message: "password update"
          });

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  });
}); //update Profile

exports.updateProfile = catchAsyncerror(function _callee7(req, res, next) {
  var newUserUpdate, user;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          newUserUpdate = {
            name: req.body.name,
            email: req.body.email
          };
          _context7.next = 3;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, newUserUpdate, {
            "new": true,
            runValidators: true
          }));

        case 3:
          user = _context7.sent;
          res.status(200).json({
            success: true,
            user: user
          });

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
}); //admin route
//Admin:get all the user data 

exports.getuserDatas = catchAsyncerror(function _callee8(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(User.find());

        case 2:
          user = _context8.sent;

          if (user) {
            _context8.next = 5;
            break;
          }

          return _context8.abrupt("return", next(new ErrorHandler("No longer user fonund", 400)));

        case 5:
          res.status(200).json({
            sucess: true,
            message: "All the user date are listed here",
            count: user.length,
            user: user
          });

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  });
}); //Admin:get speciified user data

exports.getuser = catchAsyncerror(function _callee9(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(User.findById(req, params.id));

        case 2:
          user = _context9.sent;

          if (user) {
            _context9.next = 5;
            break;
          }

          return _context9.abrupt("return", next(new ErrorHandler("user not fonund", 400)));

        case 5:
          res.status(200).json({
            sucess: true,
            message: "user data",
            user: user
          });

        case 6:
        case "end":
          return _context9.stop();
      }
    }
  });
}); //Admin:User data updata 

exports.Userupdate = catchAsyncerror(function _callee10(req, res, next) {
  var newUserUpdate, user;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          newUserUpdate = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
          };
          _context10.next = 3;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, newUserUpdate, {
            "new": true,
            runValidators: true
          }));

        case 3:
          user = _context10.sent;
          res.status(200).json({
            success: true,
            user: user
          });

        case 5:
        case "end":
          return _context10.stop();
      }
    }
  });
}); //Admin:Delete user data

exports.deleteuser = catchAsyncerror(function _callee11(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(User.findById(req, params.id));

        case 2:
          user = _context11.sent;

          if (user) {
            _context11.next = 5;
            break;
          }

          return _context11.abrupt("return", next(new ErrorHandler("user not fonund", 400)));

        case 5:
          _context11.next = 7;
          return regeneratorRuntime.awrap(user.remove());

        case 7:
        case "end":
          return _context11.stop();
      }
    }
  });
});