const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userplanSchema = new Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tripName: {
        type: String,
        required: true,
    },
    numberOfPeople: {
        type: Number,
        required: true,
    },
    cityToVisit: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    hotels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hotel'
        }
    ],
    restaurants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant'
        }
    ],
    flights: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Flight'
        }
    ],
})

const userPlan = mongoose.model('userplan', userplanSchema);

module.exports = userPlan;