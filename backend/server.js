const express = require('express')
const app = express()

app.get('/ping',(req,res)=>{
    res.send({'message' : 'PONG'})
})

app.listen(3000, () => {
    console.log('Running')
})