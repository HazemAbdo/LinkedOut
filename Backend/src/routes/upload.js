const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth");
const fileUploadController = require("../controllers/fileUploadController");

router.post("/", verifyToken, fileUploadController.uploadFile);

module.exports = router;