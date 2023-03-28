const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ProductSchema=new Schema({
    Scrim_name:{
       type:String,
       required:true
    },
    Scrim_details:{
       type:String,
       required:true
    },
    time:{
        type:String,
        required:true
    },
       
})
const Product= mongoose.model('scrim',ProductSchema);

module.exports=Product;