const express = require("express");
const eventController = require("../controllers/eventController");
const { protect } =  require('../controllers/authController')

const router = express.Router();

router.get("/allevents", eventController.getAllEvents);

router.use(protect)

router
  .route("/")
  .get(eventController.getAllUserEvents)
  .post(eventController.postEvent);

// router.route("/day/:day").get(eventController.getUserEvents);

router
  .route("/:id")
  .patch(eventController.updateEvent)
  .delete(eventController.deleteEvent);

module.exports = router;

//  get all events --> for dev
//  get users all events
//  get events for user for one day
//  update event
//  delete event
