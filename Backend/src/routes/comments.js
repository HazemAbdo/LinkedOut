const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentsController");
const { verifyToken } = require("../middlewares/auth");

router.post("/:post_id", verifyToken, commentController.commentPost);

router.delete("/:comment_id", verifyToken, commentController.removeCommentPost);

router.post(
  "/:comment_id/react",
  verifyToken,
  commentController.reactToComment
);

router.delete(
  "/:comment_id/unreact",
  verifyToken,
  commentController.unreactToComment
);

module.exports = router;
