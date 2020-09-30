const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const Queues = mongoose.model('Queues')


//user create
router.post('/', (req, res, next) => {
    try {
        const data = req.body
        if (!data.podcastId) {
           return res.status(422).json({ message: 'PodcastId is required' })
        }
        if (!data.episodeId) {
           return res.status(422).json({ message: 'EpisodeId is required' })
        }
        Queues.find({ podcastId: data.podcastId, userId: data.userId ,episodeId:data.episodeId}, (err, queueList) => {
            if (err) {
                return res.status(422).json({
                    errors: {
                        message: 'Internal Server Error'
                    }
                })
            }
            if (queueList == 0) {
                Queues.create(data, (err, saved) => {
                    if (err) {
                        return res.status(422).json({
                            errors: {
                                message: 'Internal Server Error'
                            }
                        })
                    } 
                    return res.status(200).json({ message: 'Queue Added Successfully' })
                })
            } else {
               return res.status(200).json({ message: 'Already Queue Added' })
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