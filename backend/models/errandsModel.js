const mongoose = require('mongoose');
const ErrandStatus = require('../enums/errandStatusEnum');

const errandsSchema = mongoose.Schema({     

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    title: {
        type: String,
        require: [true, 'Please add a title value']
    },

    description: {
        type: String,
        require: [true, 'Please add a description value']
    },

    location: {
        type: String,
        require: [true, 'Please add a location value']
    },

    reward: {
        type: Number,
        require: [true, "Please add a reward value"]
    },

    status: {
        type: Number,
        enum: ErrandStatus,
        require: [true, "PLease add a status value"]
    },

    solver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Errands', errandsSchema)