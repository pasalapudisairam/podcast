const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Genres = mongoose.model('Genres')


//post Genres
router.post("/", (req, res, next) => {
    try {
        Genres.create(req.body, (err, saved) => {
            if (err) {
                res.status(422).json({
                    errors: {
                        message: res._("Internal Server Error")
                    }
                })
            }
            res.status(200).json({message:'Genre Saved Successfully'})
        })
    } catch (err) {
        res.status(422).json({
            errors: {
                message: res._("Some Error Occured")
            }
        })
    }
})



//get Genres
router.get("/", (req, res, next) => {
    try {
        Genres.find({}, (err, Genreslist) => {
            if (err) {
                res.status(422).json({
                    errors: {
                        message: res._("Internal Server Error")
                    }
                })
            }
            res.status(200).json(Genreslist)

        })
    } catch (err) {
        res.status(422).json({
            errors: {
                message: res._("Some Error Occured")
            }
        })
    }
})

module.exports=router