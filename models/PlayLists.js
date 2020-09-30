const mongoose=require('mongoose')
const Schema=mongoose.Schema

const PlayListSchema=new Schema({
    userId:{ type: Schema.Types.ObjectId,ref:'Users'},
    podcastId:{ type: Schema.Types.ObjectId,ref:'Podcasts'},
    episodeId:{ type: Schema.Types.ObjectId,ref:'Episodes'},
    createdDate:{type:Date,default:new Date()},
    expiryDate:{type:Date,default:new Date()}
})

mongoose.model('PlayLists',PlayListSchema)

