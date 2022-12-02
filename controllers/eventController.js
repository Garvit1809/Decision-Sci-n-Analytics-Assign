const catchAsync = require("../utils/catchAsync");

exports.getAllEvents = catchAsync(async (req,res) => {
    res.send('All events')
})

exports.getAllUserEvents = catchAsync(async (req,res) => {
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