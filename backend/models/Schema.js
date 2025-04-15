const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    passion: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    charge: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
});

const Doctor = mongoose.model('doctor',doctorSchema)

module.exports = Doctor;
