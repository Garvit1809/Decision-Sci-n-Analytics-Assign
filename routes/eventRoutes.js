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

router.route("/day/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})").get(eventController.getUserEvents);

router
  .route("/:id")
  .patch(eventController.updateEvent)
  .delete(eventController.deleteEvent);

module.exports = router;