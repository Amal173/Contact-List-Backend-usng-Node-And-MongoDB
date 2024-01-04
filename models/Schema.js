const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        required: [true,"please enter a value"],
        type: String
    },
    lastName: {
        required: [true,"please enter a value"],
        type: String
    },
    email: {
        required: [true,"please enter a value"],
        type: String
    },
    phonenumber: {
        required: [true,"please enter a value"],
        type: String
    },
    imagepath: {
        type: String,
        required: [false, "please add the image"],
      },
})

module.exports = mongoose.model('contact', contactSchema)