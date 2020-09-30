const mongoose=require('mongoose')
const Schema=mongoose.Schema

const GenreSchema=new Schema({
    genrename:String,
    createdDate:{type:Date,default:new Date()}
})

mongoose.model('Genres',GenreSchema)