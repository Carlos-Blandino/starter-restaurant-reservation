const router = require("express").Router();
const controller = require("./tables.controller");

router.route("/:tableId/seat").put(controller.seatReservation).delete(controller.resetTable);
router.route("/").get(controller.list).post(controller.create);

module.exports = router;




