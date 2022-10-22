const mongoose = require('mongoose');
const errandsSchema = mongoose.Schema({     

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    text: {
        type: String,
        require: [true, 'Please add a text value']
    }
},
{

}
)

module.exports = mongoose.model('errands', errandsSchema)