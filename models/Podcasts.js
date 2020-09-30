const mongoose=require('mongoose')
const Schema=mongoose.Schema

const PodcastSchema=new Schema({
    name:String,
    image:String,
    description:String,
    file:String,
    like:{type:Boolean,default:false},
    view:{type:Boolean,default:false},
    genreId:{ type: Schema.Types.ObjectId,ref:'Genres'},
    languageId:{ type: Schema.Types.ObjectId,ref:'Languages'},
likeCount:{type:Number,default:0},
shareCount:{type:Number,default:0},
viewCount:{type:Number,default:0},
createdDate:{type:Date,default:new Date()},
expiryDate:{type:Date,default:null}
})
mongoose.model('Podcasts',PodcastSchema)