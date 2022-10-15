const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


const registerUser = asyncHandler(async(req, res) => {
    const { fullname, username, email, phoneNumber, password } = req.body
    if(!fullname || !username || !email || !phoneNumber || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    // Check if user exists
    const userExist = await User.findOne({email})
    if (userExist){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt) 
    const user = await User.create({
        fullname,
        username,
        email,
        phoneNumber,
        password: hashedPassword,
        
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async(req, res) => {
    const {username, password} = req.body
    if(!username || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    //Check user username
    const user = await User.findOne({ username})
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getMe = asyncHandler(async(req, res) => {
    const { _id, fullname, username,email, phoneNumber } = await User.findById(req.user.id)
    res.status(200).json({
        _id,
        fullname,
        username,
        email
    }) 
})


module.exports = { registerUser, loginUser, getMe}