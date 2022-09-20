const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentsController");
const { verifyToken } = require("../middlewares/auth");

router.get("/:post_id", verifyToken, commentController.getPostComments);

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

router.get(
  "/:comment_id/reactions",
  verifyToken,
  commentController.getCommentReactions
);

module.exports = router;
