const express = require('express')
const { query, validationResult,body, checkSchema } = require('express-validator');
const router = express.Router()
const User = require("../models/User")
const validator = require("../validator/validation");
const { NavLink } = require('react-router-dom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const jwtSecretkey ="Gofood"



router.post( "/createuser",checkSchema(validator),async(req,res)=>
{
    let email = req.body.email
    let response  = await User.findOne({email});
    
    if(response)
    {
       res.json({success:true, message: "Already exists!"});
    }
    else
    {
    const result = validationResult(req);
    if(!result.isEmpty())
    {
       console.log({ errors: result.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);

    try {
       await User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location,
        })

     res.json({success:true});
    } catch (error) {
        console.log("error");
        res.json({success:false});
    }
}
});

router.post("/loginuser",checkSchema(validator), async (req,res)=>
{
    const result = validationResult(req);
    if(!result.isEmpty())
    {
       console.log({ errors: result.array() });
    }

    try{
     let email = req.body.email
     
     let response =  await User.findOne({email})

     if( !response)
     {
        return res.status(400).json({ error:"error"})
     }
     
     const pata = bcrypt.compare(req.body.password,response.password)
     if(!pata)
     {
       return res.status(400).json({ error:"error"})
     }
     const data ={
        user:{
            id: response.id
        }
     }

     const authToken =jwt.sign(data,jwtSecretkey)
     res.json({success:true,authToken:authToken})

    }

    catch(e)
    {
        console.log(e)
        res.json({success:false})
    }


})


module.exports = router;