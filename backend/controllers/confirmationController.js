const asyncHandler = require("express-async-handler");
const Errands = require("../models/errandsModel")
const Confirmation = require("../models/confirmationModel")
const User = require("../models/userModel");
const ConfirmationStatus = require("../enums/confirmationStatusEnum");

const getConfirmationByErrand = asyncHandler(async (req, res) => {
    const errandById = await Errands.findById(req.params.id)

    if (errandById === null) {
        res.status(400)
        throw new Error("Errand doesn't exist")
    }

    
    if (errandById.user.toString() !== req.user.id) {
        res.status(400)
        throw new Error("This is not your errand")
    }

    const confirmationsByErrand = await Confirmation.find({ errand: errandById.id })
    res.status(200).json(confirmationsByErrand)
});

const setConfirmation = asyncHandler(async(req, res) => {
    // verify errand is not mine
    // verify this is my first confirmation for this errand

    if(!req.body.errandId){
        res.status(400);
        throw new Error("Please add a text field")
    }

    const confirmation = await Confirmation.create({
        errand: req.body.errandId,
        solver: req.user.id,
        confirmation: ConfirmationStatus.Pending
    })
    res.status(200).json(confirmation);
});


const updateConfirmation = asyncHandler(async(req,res) => {
    const confirmation = await Confirmation.findById(req.params.id)
    if(!confirmation) {
        res.status(400)
        throw new Error("Confirmation not found")
    }

    const errand = await Errands.findById(confirmation.errand)
    if(errand === null){
        res.status(400);
        throw new Error("Errand not found");
    }

    const user = await User.findById(errand.user);
    if(user === null){
        res.status(400);
        throw new Error("User not found");
    }

    if(req.user.id !== user.id){
        res.status(400);
        throw new Error("This is not your confirmation");
    }

    const updateConfirmation = await Confirmation.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    })
    res.status(200).json(updateConfirmation)
})

const deleteConfirmation = asyncHandler(async(req,res) => {
    const confirmation = await Confirmation.findById(req.params.id);
    if(confirmation.solver.toString() !== req.user.id){
        res.status(400);
        throw new Error("This is not your confirmation");
    }

    await confirmation.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getConfirmationByErrand,
    setConfirmation,
    updateConfirmation,
    deleteConfirmation
}