const express=require('express')
const router=express.Router()


router.use('/languages',require('./languages'))
router.use('/genres',require('./genres'))
router.use('/podcasts',require('./podcasts'))
router.use('/episodes',require('./episodes'))
router.use('/likes',require('./likes'))
router.use('/views',require('./views'))
router.use('/playLists',require('./playLists'))
router.use('/queues',require('./queues'))
router.use('/users',require('./users'))


module.exports=router