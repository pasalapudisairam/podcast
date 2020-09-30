const mongoose=require('mongoose')
const Schema=mongoose.Schema

const LikeSchema=new Schema({
    userId:{ type: Schema.Types.ObjectId,ref:'Users'},
    podcastId:{ type: Schema.Types.ObjectId,ref:'Podcasts'},
    createdDate:{type:Date,default:new Date()},
    expiryDate:{type:Date,default:new Date()}

})

mongoose.model('Likes',LikeSchema)

