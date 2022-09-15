let express = require("express");
let router = express.Router();
const postsController = require("../controllers/postsController");
const { verifyToken } = require("../middlewares/auth");
router.get("/:id", verifyToken, postsController.getPostsById);

router.post("/", verifyToken, postsController.createPost);

module.exports = router;
