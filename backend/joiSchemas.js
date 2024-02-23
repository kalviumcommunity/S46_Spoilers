const joi = require('joi');

const joiUser = joi.object({
    name : joi.string().min(3).max(25).required(),
    email : joi.string().email().required(),
    password : joi.string().min(6).max(16).required()
})

const joiSpoiler = joi.object({
    activity : joi.string().required(),
    consequences : joi.string().required(),
    spoilRate : joi.number().min(1).max(10).required(),
    author : joi.string().required()
})

module.exports = { joiUser, joiSpoiler };