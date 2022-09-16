const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const { sendResponse, createError } = require("../utils/respones");
const { validateBody, validatePassword } = require("../utils/validations");
const { sendEmail } = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const config = require("dotenv");

const userService = require("../services/userService");
const { InvalidToken } = require("../database/models/invalidTokens");

config.config();

const getUsers = async (req, res) => {
  userService
    .getUsers(req, res)
    .then((users) => {
      sendResponse(res, 200, users);
    })
    .catch((err) => {
      sendResponse(res, createError(err).status, createError(err).data);
    });
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id == null || id == "") {
      sendResponse(res, 400, { error: "Missing user id" });
    }

    userService
      .getUser(ObjectId(id))
      .then((user) => {
        if (user == null) {
          sendResponse(res, 404, { error: "User not found" });
          return;
        }
        sendResponse(res, 200, user);
      })
      .catch((err) => {
        sendResponse(res, createError(err).status, createError(err).data);
      });
  } catch (err) {
    sendResponse(res, createError(err).status, createError(err).data);
  }
};

const createUser = async (req, res) => {
  try {
    const { body } = req;

    const { ok, message } = validateBody(body);
    if (!ok) {
      sendResponse(res, 400, { error: message });
      return;
    }

    body.password = await bcrypt.hash(body.password, 10);
    const token = jwt.sign(
      { _id: body._id, email: body.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    userService
      .createUser(body)
      .then((data) => {
        if (data.error) {
          sendResponse(res, 400, data);
          return;
        }
        data.token = token;
        sendResponse(res, 201, { _id: data._id, token: token });
      })
      .catch((err) => {
        if (err.code == 11000) {
          sendResponse(res, 400, { error: "Email already exists" });
          return;
        }
        sendResponse(res, createError(err).status, createError(err).data);
      });
  } catch (err) {
    sendResponse(res, createError(err).status, createError(err).data);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    userService
      .getUserByEmail({ email })
      .then((user) => {
        if (!bcrypt.compareSync(password, user.password)) {
          sendResponse(res, 400, { error: "Wrong password" });
          return;
        }
        const token = jwt.sign(
          { _id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        sendResponse(res, 200, { _id: user._id, token: token });
      })
      .catch((err) => {
        sendResponse(res, createError(err).status, createError(err).data);
      });
  } catch (err) {
    sendResponse(res, createError(err).status, createError(err).data);
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    userService
      .logout(token)
      .then((data) => {
        sendResponse(res, 200, data);
        return;
      })
      .catch((err) => {
        sendResponse(res, createError(err).status, createError(err).data);
        return;
      });
  } catch (err) {
    sendResponse(res, createError(err).status, createError(err).data);
  }
};

const sendPasswordResetEmail = async (req, res) => {
  try {
    const { email } = req.body;
    userService
      .sendPasswordResetEmail(email)
      .then((url) => {
        sendEmail(
          email,
          "Password reset",
          "Hello From LinkedOut, Here your password reset link,This link will expire in 10 minutes.Available only for one time use.",
          url
        )
          .then((info) => {
            sendResponse(res, 200, info);
          })
          .catch((err) => {
            sendResponse(res, createError(err).status, createError(err).data);
          });
      })
      .catch((err) => {
        sendResponse(res, createError(err).status, createError(err).data);
      });
  } catch (err) {
    sendResponse(res, createError(err).status, createError(err).data);
  }
};

const passwordReset = async (req, res) => {
  try {
    const { userId, token } = req.params;
    const { password } = req.body;

    InvalidToken.findOne({ token: token }).then(async (invalidToken) => {
      if (invalidToken) {
        sendResponse(res, 400, { error: "Expired token" });
      } else {
        if (!validatePassword(password)) {
          sendResponse(res, 400, {
            error:
              "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number",
          });
          return;
        }

        let hash = await bcrypt.hash(password, 10);

        userService
          .passwordReset(userId, token, hash)
          .then(async (data) => {
            console.log(data);
            await sendEmail(
              data.email,
              "Password reset",
              "Hello From LinkedOut",
              "Password reset successful"
            );
            InvalidToken.create({ token: token })

              .then(() => {
                sendResponse(res, 200, {
                  message: "Password reset successful",
                });
              })
              .catch((err) => {
                sendResponse(
                  res,
                  createError(err).status,
                  createError(err).data
                );
              });
          })
          .catch((err) => {
            sendResponse(res, createError(err).status, createError(err).data);
          });
      }
    });
  } catch (err) {
    sendResponse(res, createError(err).status, createError(err).data);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  loginUser,
  logout,
  sendPasswordResetEmail,
  passwordReset,
};
