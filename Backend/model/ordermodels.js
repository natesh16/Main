const mongoose=require('mongoose')
const orderSchema=new mongoose.Schema({
    shippingInfo:{
        address:{
            type:String,
            required:[true,"error"]
        },
        city:{
            type:String,
            required:[true,"error"]
        },
        country:{
            type:String,
            required:[true,"error"]
        },
        Doornumber:{
            type:String,
            required:[true,"error"]
        },
        pincode:{
            type:String,
            required:[true,"error"]
        }
    },
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:[true,"error"],
        ref:"user"
    },
    orderItems:{
        name:{
            type:String,
            required:[true,"error"]
        },
        quantity:{
            type:Number,
            required:[true,"error"]
        },
        image:{
            type:Number,
            required:[true,"error"]
        },
        price:{
            type:Number,
            required:[true,"error"]
        },
        product:{
            type:mongoose.Schema.ObjectId,
            required:[true,"error"],
            ref:"product"
        },
    },
    itemsPrices:{
        type:Number,
        required: [true,"error"],
        default: 0.0
    },
    taxPrice:{
        tyep:Number,
      
    },
    shippingprice:{
        type:Number,
        required: [true,"error"],
        default: 0.0
    },
    totalPrice:{
        type:Number,
        required: true,
        default: 0.0
    },
    paidAt:{
        type:Date
    },
    deliveredAt:{
        type:Date
    },
    orderStatus:{
        type:String,
        required:[true,"error"],
        default: "processing"
    }, 
    createdAt:{
        type:Date,
        default: Date.now()
    }
})
let orderModel=mongoose.model("order",orderSchema);
module.exports=orderModel