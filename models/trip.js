const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tripSchema = new Schema({
    location: {
        type: String
    },
    description: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('Trip', tripSchema);