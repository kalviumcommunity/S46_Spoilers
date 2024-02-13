const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config()
const app = require('./routes')

const startDatabase = async () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected To MongoDB')
    })
    .catch((err)=>{
        console.log('Connection Interrupted Due To Error',err.message)
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