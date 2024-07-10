import mongoose, { Mongoose, Schema } from "mongoose";

const portfolioSchema = new mongoose.Schema({
    userId : {
        type:Schema.ObjectId,
        ref:"User",
    },
    balance:{
        type:Number,
    },
    portfolio:[{
        stockName:{
            type:String,
        },
        stockBuyingPrice:[{
            stockBuyQuantity : {
                type:Number
            },
            stockBuyPrice: {
                type:Number
            },
            stockBuyDate : {
                type:String,
            }
        }],
        stockSell:[{
            stockSellQuantity : {
                type:Number
            },
            stockSellPrice: {
                type:Number
            },
            stockSellDate : {
                type:String,
            }
        }],
        stockRemainigQuantity:{
            type:Number
        }
    }]
    
})
const Portfolio = mongoose.model('Portfolio', portfolioSchema);
  
export default Portfolio;