const express = require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json()); 

app.use(bodyParser.json());


const uri='mongodb+srv://master:vTfyPe1VvfMeAIxu@cluster0.aqhpoqp.mongodb.net/'
mongoose.set('strictQuery', false);
mongoose.connect(uri,
    {
        useNewUrlParser:true, 
        useUnifiedTopology:true, 
    })
.then(()=>{
    console.log("mongoose connected")
})
.catch((err)=>{
    console.log(err);
})

const productRoutes=require('./api/routes/srims');

const registerRoutes=require('./api/routes/register')
// app.all('/test',(req,res)=>{
//     console.log(req.body);
//     console.log("req.body");
//     res.send(req.body);
// }) 

app.use('/products',productRoutes)
app.use('/api/user',registerRoutes)

app.use((req,res,next)=>{
 const err=new Error("Not Found")
 err.status=404

})

// express error 
app.use(()=>{
res.status(err.status||500)
res.send({
    status:err.status || 500,
    message:'Not found'
})
})

module.exports=app;