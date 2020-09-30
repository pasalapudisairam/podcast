const mongoose=require('mongoose')
const express=require('express');
const router=express.Router()
const Users=mongoose.model('Users')


//user create
router.post('/',(req,res,next)=>{
    try{
        Users.create(req.body,(err,saved)=>{
            if(err){
           return res.status(422).json({
               errors:{
                   message:'Internal Server Error'
               }
           })
        }
        res.status(200).json({message:'User Saved Successfully'})
        })
    }catch(err){
        res.status(422),json({
            errors:{
                message:"Some Error Occured"
            }
        })

    }
})

module.exports=router