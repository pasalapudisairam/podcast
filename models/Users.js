const mongoose=require('mongoose')
const Schema=mongoose.Schema

const UsersSchema=new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    userName:String,
    hash:{type:String,required:true},
    salt:String,
    email:{type:String,unique:true,required:true,sparse:true},
    dob:{type:Date},
    mobile:{type:Number,unique:true,required:true,sparse:true},
    profile:String,
    country:String,
    city:String,
    address:String
})

module.exports=mongoose.model('Users',UsersSchema)