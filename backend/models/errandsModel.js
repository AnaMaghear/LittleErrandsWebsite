const mongoose = require('mongoose');
const errandsSchema = mongoose.Schema({
    text: {
        type: String,
        require: [true, 'Please add a text value']
    }
},
{

}
)

module.exports = mongoose.model('errands', errandsSchema)