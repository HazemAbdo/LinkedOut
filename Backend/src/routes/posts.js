let express = require("express");
let router = express.Router();
const postsController = require("../controllers/postsController");
const { verifyToken } = require("../middlewares/auth");

router.get("/", verifyToken, postsController.getPostsInfiniteScroll);

router.get("/:id", verifyToken, postsController.getPostsById);

router.post("/", verifyToken, postsController.createPost);
router.put("/:id/react", verifyToken, postsController.reactPost);
router.put("/:id/unreact", verifyToken, postsController.unreactPost);

module.exports = router;
