const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const Views = mongoose.model('Views')
const Podcasts = mongoose.model('Podcasts')


//user create
router.post('/', (req, res, next) => {
    try {
        const data = req.body
        if (!data.podcastId) {
           return res.status(422).json({ message: 'PodcastId is required' })
        }
        Views.find({ podcastId: data.podcastId, userId: data.userId }, (err, viewList) => {
            if (err) {
                return res.status(422).json({
                    errors: {
                        message: 'Internal Server Error'
                    }
                })
            }
            if (viewList == 0) {
                Views.create(data, (err, saved) => {
                    if (err) {
                        return res.status(422).json({
                            errors: {
                                message: 'Internal Server Error'
                            }
                        })
                    } 
                    Podcasts.updateOne({_id:data.podcastId},{$inc:{viewCount:1}},(err,updated)=>{
                        if (err) {
                            return res.status(422).json({
                                errors: {
                                    message: 'Internal Server Error'
                                }
                            })
                        }
                    })
                    return res.status(200).json({ message: 'You Viewd Successfully' })
                })
            } else {
                res.status(200).json({ message: 'Already You Viewd' })
            }
        })
    } catch (err) {
        return res.status(422), json({
            errors: {
                message: "Some Error Occured"
            }
        })

    }

})

module.exports = router