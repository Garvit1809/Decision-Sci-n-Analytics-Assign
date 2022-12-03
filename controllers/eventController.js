const Event = require("../models/eventModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllEvents = catchAsync(async (req,res) => {
    
    const events = await Event.find()

    res.status(200).json({
        status: 'success',
        events
    })
})

exports.getAllUserEvents = catchAsync(async (req,res) => {
    res.send('User events')
})

exports.postEvent = catchAsync(async (req,res) => {
    res.send('User events')
})

exports.getUserEvents = catchAsync(async (req,res) => {
    res.send('Todays Events')
})

exports.updateEvent = catchAsync(async (req,res) => {
    res,send('Event Updated')
})

exports.deleteEvent = catchAsync(async (req,res) => {
    res,send('Event Deleted')
})