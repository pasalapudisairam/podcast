const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Languages = mongoose.model('Languages')


//post Languages
router.post("/", (req, res, next) => {
    try {
        Languages.create(req.body, (err, saved) => {
            if (err) {
                return  res.status(422).json({
                    errors: {
                        message: res._("Internal Server Error")
                    }
                })
            }
            res.status(200).json({message:'Language Saved Successfully'})

        })
    } catch (err) {
        return res.status(422).json({
            errors: {
                message: res._("Some Error Occured")
            }
        })
    }
})



//get Languages
router.get("/", (req, res, next) => {
    try {
        Languages.find({}, (err, Languageslist) => {
            if (err) {
                res.status(422).json({
                    errors: {
                        message: res._("Internal Server Error")
                    }
                })
            }
           return res.status(200).json(Languageslist)

        })
    } catch (err) {
        return res.status(422).json({
            errors: {
                message: res._("Some Error Occured")
            }
        })
    }
})

module.exports=router