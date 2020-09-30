const mongoose=require('mongoose')
const Schema=mongoose.Schema


const LanguageSchema=new Schema({
    language:String,
    createdDate:{type:Date,default:new Date()}
})

mongoose.model('Languages',LanguageSchema)