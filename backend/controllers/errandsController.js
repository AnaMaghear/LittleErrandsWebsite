const asyncHandler = require("express-async-handler");

const getErrands = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Get goal"});
});

const setErrands = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error("Please add a text field")
    }
    res.status(200).json({message: "Set goal"});
});

const updateErrands = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update goal ${req.params.id}`});
});

const deleteErrands = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete goal ${req.params.id}`});
});

module.exports = {
    getErrands,
    setErrands,
    updateErrands,
    deleteErrands
}