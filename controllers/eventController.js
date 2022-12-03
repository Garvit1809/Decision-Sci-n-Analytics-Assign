const Event = require("../models/eventModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllEvents = catchAsync(async (req, res) => {
  const events = await Event.find();

  res.status(200).json({
    status: "success",
    events,
  });
});

exports.getAllUserEvents = catchAsync(async (req, res) => {
//   console.log(req.user._id);

  const userEvents = await Event.find({
    user: req.user._id,
  });

  res.status(200).json({
    status: "success",
    events: userEvents,
  });
});

exports.postEvent = catchAsync(async (req, res) => {
  const { eventName, eventDescription, startTime, endTime } = req.body;
  const userId = req.user._id;

  const event = await Event.create({
    eventName,
    user: userId,
    eventDescription,
    startTime,
    endTime
  })

  res.status(201).json({
    status: "success",
    event
  })
});

exports.getUserEvents = catchAsync(async (req, res) => {
  let queryDate = new Date(
    +req.params.year,
    +req.params.month - 1,
    +req.params.day
  )

  let EndDate = new Date(
    +req.params.year,
    +req.params.month - 1,
    +req.params.day + 1
  )

  const events = await Event.find({
    "startTime": {
        "$gte": new Date(queryDate),
        "$lte": new Date(EndDate)
    }
  })

  res.status(200).json({
    status: 'success',
    queryDate,
    EndDate,
    events
  })
});

exports.updateEvent = catchAsync(async (req, res) => {
  const eventId = req.params.id;

  const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body,  {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    status: 'success',
    updatedEvent
  })
});

exports.deleteEvent = catchAsync(async (req, res) => {
    const eventId = req.params.id;

    const deleteEvent = await Event.findByIdAndDelete(eventId);

    if (!deleteEvent) {
        res.status(404).json({
            status: 'fail',
            message: 'No Event found with that ID'
        })
    }

    res.status(204).json({
        status: "success",
        event: null,
      });
});
