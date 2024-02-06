const mongoose = require('mongoose');
const express = require('express');
const app = express()

const startDatabase = async () => {
    mongoose.connect('mongodb+srv://dbUser:dbUser@cluster0.ihuv6fv.mongodb.net/Spoilers?retryWrites=true&w=majority')
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