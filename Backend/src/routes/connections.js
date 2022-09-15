let express = require("express");
let router = express.Router();
const connectionsController = require("../controllers/connectionController");
const { verifyToken } = require("../middlewares/auth");

router.get("/", verifyToken, connectionsController.getConnections);

router.post("/:target_id", verifyToken, connectionsController.connectRequest);
router.put("/:target_id", verifyToken, connectionsController.acceptRequest);
router.delete("/:target_id", verifyToken, connectionsController.rejectRequest);

module.exports = router;
