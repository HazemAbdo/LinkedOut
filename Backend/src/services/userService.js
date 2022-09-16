const { client } = require("../database/database_connection");
const { InvalidToken } = require("../database/models/invalidTokens");
const { User } = require("../database/models/users");
const jwt = require("jsonwebtoken");

const getUsers = async () => {
  return new Promise((resolve, reject) => {
    User.find()
      .select("-password")
      .exec()
      .then((users) => {
        client.close();
        resolve(users);
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

const getUser = async (id) => {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: id })
      .select("-password")
      .exec()
      .then((user) => {
        client.close();
        resolve(user);
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

const createUser = async (user) => {
  return new Promise((resolve, reject) => {
    User.create(user)
      .then((user) => {
        client.close();
        resolve(user);
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

const getUserByEmail = async (user) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: user.email })
      .exec()
      .then((_user) => {
        client.close();
        if (_user == null) {
          throw new Error("Invalid Email");
        }
        resolve(_user);
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

const updateUser = async (id, update) => {
  return new Promise((resolve, reject) => {
    User.updateOne({ _id: id }, update)
      .exec()
      .then((user) => {
        client.close();
        resolve(user);
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

const logout = async (token) => {
  return new Promise((resolve, reject) => {
    InvalidToken.create({ token })
      .then(() => {
        client.close();
        resolve({ message: "Logged out successfully" });
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

const sendPasswordResetEmail = async (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email })
      .exec()
      .then((user) => {
        client.close();
        if (user == null) {
          throw new Error("Invalid Email");
        }
        const token = jwt.sign(
          { email: user.email, task: "resetPassword" },
          process.env.JWT_SECRET,
          { expiresIn: 10 * 60 }
        );
        const url = `${process.env.URL}/reset-password/${user._id}/${token}`;
        resolve(url);
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

const passwordReset = async (id, token, password) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        client.close();
        throw {
          status: 400,
          message: "Expired Token",
        };
      }
      if (decoded.task != "resetPassword") {
        client.close();
        throw {
          status: 400,
          message: "Invalid Token",
        };
      }
      User.updateOne({ _id: id }, { password })
        .exec()
        .then(() => {
          client.close();
          resolve({
            email: decoded.email,
          });
        })
        .catch((err) => {
          client.close();
          reject(err);
        });
    });
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  getUserByEmail,
  updateUser,
  logout,
  sendPasswordResetEmail,
  passwordReset,
};
