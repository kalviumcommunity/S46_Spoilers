const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const app = express();
const { User, Spoiler } = require('./schemas'); // Importing models
const { joiUser, joiSpoiler } = require('./joiSchemas');

app.use(cors())
app.use(express.json())

// GET endpoint to fetch all users

app.get('/users',async(req,res) => {
    try{
        const users = await User.find()
        res.json(users) 
    } catch(err){
        res.status(500).json({message : err.message})
    }
})

// POST endpoint for user sign up

app.post('/users',async(req,res) => {
    const {error , value} = joiUser.validate(req.body);
    if (error){
        console.log(error);
        return res.send("Invalid Request")
    }
    const newUser = await User.create(req.body);
    res.send("Success")
})

// GET endpoint for user sign-in 

app.post('/users/signin',async(req,res) => {
    const {name , password} = req.body;
    const user = await User.findOne({name});
    if (!user){
        return res.status(401).send("Wrong Username")
    }
    const passwordValid = await user.comparePassword(password);
    if (!passwordValid){
        return res.status(401).send("Wrong Password")
    }
    res.send("Success")
})

// GET endpoint to fetch all spoilers

app.get('/spoilers',async(req,res) => {
    try{
        const spoilers = await Spoiler.find()
        res.json(spoilers)
    } catch(err){
        res.status(500).json({message : err.message})
    }
})

app.get('/spoilers/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const spoiler = await Spoiler.findById(id)
        if (!spoiler){return res.status(404).json({message : "Spoiler not found"})}
        res.json(spoiler)
    } catch(err){
        res.status(500).json({message : err.message})
    }
})

// POST endpoint to create a new spoiler

app.post('/spoilers', async (req, res) => {
    const {error , value} = joiSpoiler.validate(req.body);
    if (error){
        console.log(error);
        return res.status(400).send("Invalid Request")
    }
    const newSpoiler = await Spoiler.create(req.body);
    res.status(201).send("Success")
});

// DELETE endpoint to delete a user by userid

app.delete('/users/:userid',async(req,res) => {
    const {userid} = req.params
    try{
        const deletedUser = await User.findOneAndDelete({userid});
        if(!deletedUser){
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message : 'User Deleted'})
    } catch(err){
        res.status(500).json({message : err.message})
    }
})

// DELETE endpoint to delete a spoiler by _id

app.delete('/spoilers/:id',async(req,res) => {
    const {id} = req.params
    try{
        const deletedSpoiler = await Spoiler.findByIdAndDelete(id);
        if(!deletedSpoiler){
            return res.status(404).json({message: 'Spoiler not found'});
        }
        res.json({message : 'Spoiler Deleted'})
    } catch(err){
        res.status(500).json({message : err.message})
    }
})

// PUT endpoint to update a user by userid

app.put('/users/:userid',async(req,res) => {
    const {userid} = req.params
    try{
        const {error , value} = joiUser.validate(req.body);
        if (error){
            console.log(error);
            return res.status(400).send("Invalid Request")
        }
        const updatedUser = await User.findOneAndUpdate({userid}, req.body, {new:true});
        if(!updatedUser){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(201).send("Success")
    } catch(err){
        res.status(400).json({message : err.message})
    }
})

// PUT endpoint to update a spoiler by _id

app.put('/spoilers/:id',async(req,res) => {
    const {id} = req.params
    try{
        const {error , value} = joiSpoiler.validate(req.body);
        if (error){
            console.log(error);
            return res.status(400).send("Invalid Request")
        }
        const updatedSpoiler = await Spoiler.findByIdAndUpdate(id, req.body);
        if(!updatedSpoiler){
            return res.status(404).json({message: 'Spoiler not found'});
        }
        res.status(201).send("Success")
    } catch(err){
        res.status(400).json({message : err.message})
    }
});

module.exports = app;