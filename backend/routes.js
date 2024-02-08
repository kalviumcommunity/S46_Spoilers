const mongoose = require('mongoose');
const express = require('express');
const app = express();
const { User, Spoiler } = require('./schemas'); // Importing models

// GET endpoint to fetch all users
app.use(express.json());

app.get('/users',async(req,res) => {
    try{
        const users = await User.find()
        res.json(users)
    } catch(err){
        res.status(500).json({message : err.message})
    }
})

// POST endpoint to create a new user

app.post('/users',async(req,res) => {
    const user = new User(req.body)
    try{
        const newUser = await user.save();
        res.status(201).json(newUser)
    } catch(err){
        res.status(400).json({message : err.message})
    }
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

// POST endpoint to create a new spoiler

app.post('/spoilers',async(req,res) => {
    const spoiler = new Spoiler(req.body)
    try{
        const newSpoiler = await spoiler.save();
        res.status(201).json(newSpoiler)
    } catch(err){
        res.status(400).json({message : err.message})
    }
})

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
        const updatedUser = await User.findOneAndUpdate({userid}, req.body, {new:true});
        if(!updatedUser){
            return res.status(404).json({message: 'User not found'});
        }
        res.json(updatedUser)
    } catch(err){
        res.status(400).json({message : err.message})
    }
})

// PUT endpoint to update a spoiler by _id

app.put('/spoilers/:id',async(req,res) => {
    const {id} = req.params
    try{
        const updatedSpoiler = await Spoiler.findByIdAndUpdate(id, req.body, {new:true});
        if(!updatedSpoiler){
            return res.status(404).json({message: 'Spoiler not found'});
        }
        res.json(updatedSpoiler)
    } catch(err){
        res.status(400).json({message : err.message})
    }
});

module.exports = app;