const asyncHandler = require("express-async-handler"); 
const ErrandStatus = require("../enums/errandStatusEnum");
const Errands = require("../models/errandsModel")
const User = require("../models/userModel")

const getErrands = asyncHandler(async (req, res) => {
    const errands = await Errands.find({ user: req.user.id})
    res.status(200).json(errands)
});

const getErrandById = asyncHandler(async (req, res) => {
    const errand = await Errands.findById(req.params.id)

    if (!errand) {
        res.status(400)
        throw new Error("Errand doesn't exist")
    }

    res.status(200).json(errand)
})

const getAllErrands = asyncHandler(async (req, res) => {
    const errands = await Errands.find()
    res.status(200).json(errands.sort((e1, e2) => e1.createdAt > e2.createdAt ? -1 : 1))
})

const setErrands = asyncHandler(async (req, res) => {
    const { title, description, location, reward } = req.body

    if (!title || !description || !location || !reward) {
        res.status(400);
        throw new Error("Please add all fields")
    }

    const errands = await Errands.create({
        user: req.user.id,
        title,
        description,
        location: location.toLowerCase(),
        reward,
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

   // Make sure the logged in user matches the errand user
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

    await errands.remove()
    res.status(200).json({ id: req.params.id })
});

module.exports = {
    getErrands,
    getErrandById,
    getAllErrands,
    setErrands,
    updateErrands,
    deleteErrands
}