const { sendResponse, createError } = require("../utils/respones");
const commentsService = require("../services/commentsService");
const { ObjectId } = require("mongodb");

const commentPost = async (req, res) => {
  try {
    const { post_id } = req.params;
    const user_id = req.user._id; // id of the user making the request
    const { comment } = req.body;
    if (user_id == null) {
      sendResponse(res, 400, "User id is required");
    }
    commentsService
      .commentPost({
        user_id: ObjectId(user_id),
        post_id: post_id,
        comment: comment,
        date_commented: new Date(),
      })
      .then((result) => {
        sendResponse(res, 200, result);
      })
      .catch((err) => {
        sendResponse(res, createError(err).status, createError(err).data);
      });
  } catch (err) {
    sendResponse(res, createError(err).status, createError(err).data);
  }
};

const removeCommentPost = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const user_id = req.user._id; // id of the user making the request
    if (user_id == null) {
      sendResponse(res, 400, "User id is required");
    }
    commentsService
      .removeCommentPost(comment_id, ObjectId(user_id))
      .then((result) => {
        sendResponse(res, 200, result);
      })
      .catch((err) => {
        sendResponse(res, createError(err).status, createError(err).data);
      });
  } catch (err) {
    sendResponse(res, createError(err).status, createError(err).data);
  }
};

const reactToComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const user_id = req.user._id; // id of the user making the request
    const { reaction } = req.body;
    if (user_id == null) {
      sendResponse(res, 400, "User id is required");
    }
    commentsService
      .reactToComment(ObjectId(comment_id), {
        user_id: ObjectId(user_id),
        reaction: reaction,
      })
      .then((result) => {
        sendResponse(res, 200, result);
      })
      .catch((err) => {
        sendResponse(res, createError(err).status, createError(err).data);
      });
  } catch (err) {
    sendResponse(res, createError(err).status, createError(err).data);
  }
};

const unreactToComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const user_id = req.user._id; // id of the user making the request
    if (user_id == null) {
      sendResponse(res, 400, "User id is required");
    }
    commentsService
      .unreactToComment(ObjectId(comment_id), ObjectId(user_id))
      .then((result) => {
        sendResponse(res, 200, result);
      })
      .catch((err) => {
        sendResponse(res, createError(err).status, createError(err).data);
      });
  } catch (err) {
    sendResponse(res, createError(err).status, createError(err).data);
  }
};

const getPostComments = async (req, res) => {
  try {
    const { post_id } = req.params;
    commentsService
      .getPostComments(post_id)
      .then((result) => {
        sendResponse(res, 200, result);
      })
      .catch((err) => {
        sendResponse(res, createError(err).status, createError(err).data);
      });
  } catch (err) {
    sendResponse(res, createError(err).status, createError(err).data);
  }
};

const getCommentReactions = async (req, res) => {
  try {
    const { comment_id } = req.params;
    commentsService
      .getCommentReactions(ObjectId(comment_id))
      .then((result) => {
        sendResponse(res, 200, result);
      })
      .catch((err) => {
        sendResponse(res, createError(err).status, createError(err).data);
      });
  } catch (err) {
    sendResponse(res, createError(err).status, createError(err).data);
  }
};

module.exports = {
  commentPost,
  removeCommentPost,
  reactToComment,
  unreactToComment,
  getPostComments,
  getCommentReactions,
};
