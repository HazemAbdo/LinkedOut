let express = require("express");
let router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/auth");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);

router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/logout", verifyToken, userController.logout);

module.exports = router;
