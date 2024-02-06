const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config()
const app = express()

const startDatabase = async () => {
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('Connected To MongoDB')
    })
    .catch((err)=>{
        console.log('Connection Interuupted Due To Error',err.message)
    })
}

startDatabase()

const isConnected = () => {
    return mongoose.connection.readyState === 1;
  }

app.get('/',(req,res)=>{
    res.json({
        database: 'MongoDB',
        status: isConnected() ? 'connected' : 'disconnected'
      })
})

app.listen(3000, () => {
    console.log('Running')
})