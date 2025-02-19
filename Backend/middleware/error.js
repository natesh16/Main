const ErrorHandler=require('../utils/errorehandeler')
module.exports = (err, req, res, next) =>{
    err.statusCode  = err.statusCode || 500;
    if(process.env.NODE_ENV == 'development'){
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack,
            error: err,
            statuscode:400
        })
    }
    if(process.env.NODE_ENV == 'production'){
        let message = err.message;
        let error = new ErrorHandler(message);

        //Validation Error
        if(err.name=="ValidationError") {
            message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message)
        }

        //Cast Error
        if(err.name=="CastError"){
            message=`Resource is not found: ${err.path}` ,
            error = new ErrorHandler(message)
        }

    res.status(err.statusCode).json({
        success: false,
        message:error.message||"Internal server error",
        statuscode:400
        // message
    })
    }
}