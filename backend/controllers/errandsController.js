const asyncHandler = require("express-async-handler"); 
const ErrandStatus = require("../enums/errandStatusEnum");
const Errands = require("../models/errandsModel")
const User = require("../models/userModel")

const getErrands = asyncHandler(async (req, res) => {
    const errands = await Errands.find({ user: req.user.id})
    res.status(200).json(errands)
});

const setErrands = asyncHandler(async(req, res) => {
    if(!req.body.title){
        res.status(400);
        throw new Error("Please add a title field")
    }

    if(!req.body.description){
        res.status(400);
        throw new Error("Please add a description field")
    }

    if(!req.body.reward){
        res.status(400);
        throw new Error("Please add a reward field")
    }

    const errands = await Errands.create({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        reward: req.body.reward,
        status: ErrandStatus.New
    })
    res.status(200).json(errands);
});

const updateErrands = asyncHandler(async (req, res) => {
   const errands = await Errands.findById(req.params.id)

   if(!errands){
    res.status(400)
    throw new Error("Errand not found")
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

   const updateErrand = await Errands.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
   })

   res.status(200).json(updateErrand)
});

const deleteErrands = asyncHandler(async (req, res) => {
    const errands = await Errands.findById(req.params.id)

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

    await errands.remove()
    res.status(200).json({ id: req.params.id })
});

module.exports = {
    getErrands,
    setErrands,
    updateErrands,
    deleteErrands
}