const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Podcasts = mongoose.model('Podcasts')



//post podcast
router.post('/', (req, res, next) => {
    try {
        if (req.files.length > 0) {
            if (!req.query.name) {
                return res.status(422).json({ message: 'Podcast Name is required' })
            }
            if (!req.query.description) {
                return res.status(422).json({ message: 'Podcast description is required' })
            } if (!req.query.image) {
                return res.status(422).json({ message: 'Podcast image is required' })
            }
            const newPodcasts = new Podcasts({
                name: req.query.name,
                description: req.query.description,
                file: req.files[0].location,
                image: req.query.image,
                genreId: req.query.genreId,
                languageId: req.query.languageId
            })
            newPodcasts.save((err, saved) => {
                if (err) {
                    res.status(422).json({
                        errors: {
                            message: "Internal Server Error"
                        }
                    })
                }
                return res.status(200).json({ message: 'Podcast Saved Successfully' })
            })
        } else {
            return res.status(422).json({ errors: { message: 'Some Error Occured,Pls Try Again' } })
        }
    } catch (err) {
        return res.status(422).json({
            errors: {
                message: "Some Error Occured"
            }
        })
    }
})

//get userprefernce podcasts
router.post('/userPrefrence', (req, res, next) => {
    try {
        const data = req.query
        if (!data.genreId) {
            return res.status(422).json({ message: 'GenreId is required' })
        }
        if (!data.languageId) {
            return res.status(422).json({ message: 'LanguageId is required' })
        }
        Podcasts.find({ genreId: data.genreId, languageId: data.languageId }, (err, podcastList) => {
            if (err) {
                return res.status(422).json({
                    errors: {
                        message: 'Internal server Error'
                    }
                })
            }
            return res.status(200).json(podcastList)
        })
    } catch (err) {
        return res.status(422).json({
            errors: {
                message: "Some Error Occured"
            }
        })
    }
})




// get popularty podcasts and episodes
router.get('/popularty', (req, res, next) => {
    try {
        const query = {}
        query.likeCount = { $gte: 2 }
        query.viewCount = { $gte: 2 }
        Podcasts.aggregate([
            {
                $match: query
            },
            {
                $graphLookup: {
                    from: 'episodes',
                    startWith: '$_id',
                    connectFromField: '_id',
                    connectToField: 'podcastId',
                    as: 'id'
                }
            }
        ]).exec((err, data) => {
            if (err) {
                return res.status(422).json({
                    errors: {
                        message: 'Internal server Error'
                    }
                })
            }
            return res.status(200).json(data)
        })
    } catch (err) {
        return res.status(422).json({
            errors: {
                message: "Some Error Occured"
            }
        })
    }
})

module.exports = router