const { sendResponse, createError } = require("../utils/respones");
const postsService = require("../services/postsService");
const { ObjectId } = require("mongodb");

const createPost = async (req, res) => {
  try {
    const { body } = req;
    const user_id = req.user._id; // id of the user making the request
    if (user_id == null) {
      sendResponse(res, 400, "User id is required");
    }
    body.user_id = ObjectId(user_id);
    body.date_posted = new Date();
    postsService
      .createPost(body)
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

const getPostsById = async (req, res) => {
  try {
    const { id } = req.params;
    postsService
      .getPostsById(id)
      .then((data) => {
        sendResponse(res, 200, data);
      })
      .catch((err) => {
        console.log(err);
        sendResponse(res, createError(err).status, createError(err).data);
      });
  } catch (err) {
    sendResponse(res, createError(err).status, createError(err).data);
  }
};

const getPostsInfiniteScroll = async (req, res) => {
  try {
    const { page } = req.query;
    postsService
      .getPosts(page)
      .then((data) => {
        sendResponse(res, 200, data);
      })
      .catch((err) => {
        sendResponse(res, createError(err).status, createError(err).data);
      });
  } catch (err) {
    sendResponse(res, createError(err).status, createError(err).data);
  }
};

const reactPost = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id; // id of the user making the request
    const { reaction } = req.body;
    if (user_id == null) {
      sendResponse(res, 400, "User id is required");
    }
    postsService
      .reactPost(id, { user_id, reaction })
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

const unreactPost = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id; // id of the user making the request
    if (user_id == null) {
      sendResponse(res, 400, "User id is required");
    }
    postsService
      .unreactPost(id, user_id)
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
  getPostsById,
  createPost,
  getPostsInfiniteScroll,
  reactPost,
  unreactPost,
};

