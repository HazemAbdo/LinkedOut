const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/", userController.sendPasswordResetEmail);
router.post("/:userId/:token", userController.passwordReset);

module.exports = router;
