const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Episodes = mongoose.model('Episodes')
const Podcasts=mongoose.model('Podcasts')


//post episode
router.post('/', (req, res, next) => {
    try {
        if (!req.query.name) {
            res.status(422).json({ message: 'Episode Name is required' })
        }
        if (!req.query.description) {
            res.status(422).json({ message: 'Episode description is required' })
        } if (!req.query.file) {
            res.status(422).json({ message: 'Episode file is required' })
        } if (!req.query.image) {
            res.status(422).json({ message: 'Episode image is required' })
        }
        const newEpisode = new Episodes({
            name: req.query.name,
            description: req.query.description,
            file: req.query.file,
            image: req.query.image,
            podcastId: req.query.podcastId,
        })
        newEpisode.save((err, saved) => {
            if (err) {
                res.status(422).json({
                    errors: {
                        message: "Internal Server Error"
                    }
                })
            }
            res.status(200).json({ message: 'Episode Saved Successfully' })
        })
    } catch (err) {
        res.status(422).json({
            errors: {
                message: "Some Error Occured"
            }
        })
    }
})

//get podcast Based Episodes
router.post('/podcastBasedEpisodes', (req, res, next) => {
    try {
        const data = req.query
        if (!data.podcastId) {
            res.status(422).json({ message: 'Podcast Id is required' })
        }
        Episodes.find({ podcastId: data.podcastId}).sort({'createdDate':-1}).exec( (err, episodeList) => {
            if (err) {
                res.status(422).json({
                    errors: {
                        message: 'Internal server Error'
                    }
                })
            }
            res.status(200).json(episodeList)
        })
    } catch (err) {
        res.status(422).json({
            errors: {
                message: "Some Error Occured"
            }
        })
    }
})


router.get('/getdata',(req,res,next)=>{
    Podcasts.aggregate([
        {
        $graphLookup:{
            from:'episodes',
            startWith:'$_id',
            connectFromField:'_id',
            connectToField:'podcastId',
            as:'id'
          }
        },
        {
            $graphLookup:{
                from:'podcasts',
                startWith:'$id.podcastId',
                connectFromField:'id.podcastId',
                connectToField:'_id',
                as:'podcastid'

            }
        },
{$project:{
    'name':1,
    'id._id':1,
    'id.name':1,
    'id.podcastid':'$podcastid'
}}
    ]).exec((err,data)=>{
        res.send(data)

    })
})

module.exports = router