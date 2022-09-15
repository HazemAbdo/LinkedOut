const jwt = require("jsonwebtoken");
const config = require("dotenv");
const { InvalidToken } = require("../database/models/invalidTokens");
const { sendResponse, createError } = require("../utils/respones");
config.config();

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader?.split(" ")[1] || null;

  if (!token) {
    sendResponse(res, 401, { error: "Access denied. No token provided." });
    return;
  }
  InvalidToken.findOne({ token: token })
    .exec()
    .then((invalidToken) => {
      if (invalidToken) {
        sendResponse(res, 401, { error: "Access denied. Logged out token." });
        return;
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          sendResponse(res, 401, { error: "Access denied. Invalid token." });
          return;
        }
        req.user = decoded;
        next();
      });
    })
    .catch((err) => {
      sendResponse(res, createError(err).status, createError(err).data);
      return;
    });
};

module.exports = {
  verifyToken,
};
