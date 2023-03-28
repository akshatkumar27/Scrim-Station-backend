const express=require("express");

const route= express.Router();

const Product=require('../../models/Product.model');

route.get('/',async(req,res,next)=>{

    // next(new Error('Can not get the list of all scrims '))
    // res.status(200).json({
    //     message:"get request "
    // });
    try{
          const result=await Product.find()
          res.send(result); 
    } catch(err){
        console.log(err.message)
    }
});

route.post('/',async(req,res,next)=>{
    console.log(req.body);

    // one way of adding req data into data base 

    // const product=new Product({
    //     Scrim_name:req.body.Scrim_name,
    //     Scrim_details:req.body.Scrim_details,
    //     time:req.body.time,
    // })
    // product.save()
    // .then(res=>{
    //     console.log(res);
    //     res.send(res);
    // })
    // .catch(err=>{
    //     console.log(err.message);
    // })

// 2nd way of adding data 

try{
    const product=new Product(req.body)
     const result=await product.save();
      res.send(result);
    }
catch(err){
    console.log(err.message);
}


    
});


route.get('/:productId',async(req,res,next)=>{
    const id=req.params.productId;
    if(id==='specials') 
    {
        res.status(200).json({  
            message:"special product id ",
            id:id
        })
       
    }
    else {
        // res.status(200).json({
        //     message:"Product id",
        //     id:id, 
        // }) 

        try{
            // const product=await Product.findById(id);
            const product=await Product.findOne({_id:id});
  res.send(product)
        }
        catch(err){
console.log(err)
        }
    }
});
route.patch('/:productId',async(req,res,next)=>{
    try{
        const id=req.params.productId;
        const update=req.body;
        const result=await Product.findByIdAndUpdate(id,update);
        res.send(result);

    }
    catch(err){
        console.log(err.message);
    }
    
});
route.delete('/:productId',async(req,res,next)=>{
    const id=req.params.productId; 
    try{
        const result=await Product.findByIdAndDelete(id);
        res.send(result);
    }
    catch(error){
       console.log(error.message); 
    }
});

module.exports=route;