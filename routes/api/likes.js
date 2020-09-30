const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const Likes = mongoose.model('Likes')
const Podcasts = mongoose.model('Podcasts')


//user create
router.post('/', (req, res, next) => {
    try {
        const data = req.body
        if (!data.podcastId) {
           return res.status(422).json({ message: 'PodcastId is required' })
        }
        Likes.find({ podcastId: data.podcastId, userId: data.userId }, (err, likeList) => {
            if (err) {
                return res.status(422).json({
                    errors: {
                        message: 'Internal Server Error'
                    }
                })
            }
            if (likeList == 0) {
                Likes.create(data, (err, saved) => {
                    if (err) {
                        return res.status(422).json({
                            errors: {
                                message: 'Internal Server Error'
                            }
                        })
                    } 
                    Podcasts.updateOne({_id:data.podcastId},{$inc:{likeCount:1}},(err,updated)=>{
                        if (err) {
                            return res.status(422).json({
                                errors: {
                                    message: 'Internal Server Error'
                                }
                            })
                        }
                    })
                    return  res.status(200).json({ message: 'You Liked Successfully' })
                })
            } else {
                return res.status(200).json({ message: 'Already You Liked' })
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