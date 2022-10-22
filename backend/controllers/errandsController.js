const asyncHandler = require("express-async-handler"); 
const Errnads = require("../models/errandsModel")
const User = require("../models/userModel")
const getErrands = asyncHandler(async (req, res) => {
    const errands = await Errnads.find({ user: req.user.id})
    res.status(200).json(errands)
});

const setErrands = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error("Please add a text field")
    }

    const errands = await Errnads.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(errands);
});

const updateErrands = asyncHandler(async (req, res) => {
   const errands = await Errnads.findById(req.params.id)

   if(!errands){
    res.status(400)
    throw new Error("Goal not found")
   }

   //Check for user
   if(!req.user){
    res.status(401)
    throw new Error('User not found')
   }

   // Make sure the logged in user matches the goal user
   if(errands.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized')
   }
   const updateErrand = await Errnads.findById(req.params.id, req.body,{
    new: true,
   })
});

const deleteErrands = asyncHandler(async (req, res) => {
    const errands = await Errnads.findById(req.params.id)
    if(!errands){
        res.status(400)
        throw new Error('Errands not found')
    }

   //Check for user
   if(!req.user){
    res.status(401)
    throw new Error('User not found')
   }

   // Make sure the logged in user matches the goal user
   if(errands.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized')
   }

    await errands.remove()
    res.status(200).json({ id: req.params.id })
});

module.exports = {
    getErrands,
    setErrands,
    updateErrands,
    deleteErrands
}