const { sendResponse, createError } = require("../utils/respones");
const connectionsService = require("../services/connectionsService");
const { ObjectId } = require("mongodb");

const connectRequest = async (req, res) => {
  try {
    const { target_id } = req.params; // target_id of the user to connect to
    const { requester_id } = req.body || req.user.requester_id; // id of the user making the request
    if (target_id == null || target_id == "") {
      sendResponse(res, 400, { error: "Missing target user id" });
    }
    if (requester_id == null || requester_id == "") {
      sendResponse(res, 400, { error: "Missing user id" });
    }

    connectionsService
      .connectRequest(ObjectId(target_id), ObjectId(requester_id))
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

const acceptRequest = async (req, res) => {
  try {
    const { target_id } = req.params; // target_id of the user to connect to
    const { user_id } = req.body || req.user.user_id; // id of the user making the request
    if (target_id == null || target_id == "") {
      sendResponse(res, 400, { error: "Missing target user id" });
    }
    if (user_id == null || user_id == "") {
      sendResponse(res, 400, { error: "Missing user id" });
    }
    connectionsService
      .acceptRequest(ObjectId(user_id), ObjectId(target_id))
      .then((result) => {
        if (result.ok == -1) {
          sendResponse(res, 400, {
            connection_status: result.connection_status,
          });
          return;
        }
        sendResponse(res, 200, result);
      })
      .catch((err) => {
        sendResponse(res, createError(err).status, createError(err).data);
      });
  } catch (err) {
    sendResponse(res, createError(err).status, createError(err).data);
  }
};

const rejectRequest = async (req, res) => {
  try {
    const { target_id } = req.params; // target_id of the user to connect to
    const { requester_id } = req.body || req.user.requester_id; // id of the user making the request
    if (target_id == null || target_id == "") {
      sendResponse(res, 400, { error: "Missing target user id" });
    }
    if (requester_id == null || requester_id == "") {
      sendResponse(res, 400, { error: "Missing user id" });
    }
    connectionsService
      .rejectRequest(ObjectId(requester_id), ObjectId(target_id))
      .then((result) => {
        if (result.ok == -1) {
          sendResponse(res, 400, {
            connection_status: result.connection_status,
          });
          return;
        }
        sendResponse(res, 200, result);
      })
      .catch((err) => {
        sendResponse(res, createError(err).status, createError(err).data);
      });
  } catch (err) {
    sendResponse(res, createError(err).status, createError(err).data);
  }
};

const getConnections = async (req, res) => {
  try {
    const user_id = req.user._id;
    if (user_id == null || user_id == "") {
      sendResponse(res, 400, { error: "Missing user id" });
    }
    connectionsService
      .getConnections(ObjectId(user_id))
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
  connectRequest,
  acceptRequest,
  rejectRequest,
  getConnections,
};
