const { sendResponse, createError } = require("../utils/respones");
const postsService = require("../services/postsService");
const { ObjectId } = require("mongodb");

const createPost = async (req, res) => {
  try {
    const { body } = req;
    const user_id = req.user._id; // id of the user making the request
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

module.exports = {
  getPostsById,
  createPost,
};
