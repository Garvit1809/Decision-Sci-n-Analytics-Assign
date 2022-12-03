const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: [true, 'Event should have a name lol'],
        trim: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Event must belong to a user"],
    },
    eventDescription: {
        type: String,
    },
    startTime: {
        type: Date,
        default: Date.now(),
    },
    endTime: {
        type: Date,
        default: Date(Date.now() + 3600000),
    },
},{
    timestamps: true
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;





// user, eventName, eventDesc, startDate, endDate