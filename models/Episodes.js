const mongoose=require('mongoose')
const Schema=mongoose.Schema

const EpisodeSchema=new Schema({
    name:String,
    episode:String,
    image:String,
    description:String,
    file:String,
    like:{type:Boolean,default:false},
    view:{type:Boolean,default:false},
    podcastId:{ type: Schema.Types.ObjectId,ref:'Podcasts'},
likecount:{type:Number,default:0},
sharecount:{type:Number,default:0},
viewcount:{type:Number,default:0},
createdDate:{type:Date,default:new Date()},
expiryDate:{type:Date,default:new Date()}
})
mongoose.model('Episodes',EpisodeSchema)