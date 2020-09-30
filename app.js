const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http=require('http')
const app=express()
const cors=require('cors')
const dotenv=require('dotenv');
dotenv.config()


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())


//Mongodb connection
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology: true }).then(()=>{}).catch(err=>console.log(err))

//create server
server =http.createServer(app)

//models and rotes
require('./models/Genres')
require('./models/Languages')
require('./models/Podcasts')
require('./models/Queues')
require('./models/Episodes')
require('./models/Users')
require('./models/Likes')
require('./models/Views')
require('./models/PlayLists')


mongoose.set('useCreateIndex', true);

app.use(require('./routes'))


//setup server
server.listen(process.env.PORT,()=>console.log(`server listen port number ${process.env.PORT}`))

