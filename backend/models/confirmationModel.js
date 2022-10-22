const mongoose = require('mongoose');
const ConfirmationStatus = require('../enums/confirmationStatusEnum');

const confirmationSchema = mongoose.Schema({

    errand: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Errands'
    },

    solver: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },

    confirmation: {
        type: Number,
        enum: ConfirmationStatus,
        require: true
    }
})

module.exports = mongoose.model('Confirmation', confirmationSchema)