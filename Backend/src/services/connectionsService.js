const { client } = require("../database/database_connection");
const { User } = require("../database/models/users");
const { sendResponse } = require("../utils/respones");
const userService = require("../services/userService");
const { ObjectId } = require("mongodb");

const checkIfConnected = async (requester_id, target_id) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      _id: requester_id,
      connections: { $elemMatch: { user_id: target_id } },
    })
      .exec()
      .then((user) => {
        client.close();
        if (user == null) {
          resolve(false);
        } else {
          resolve(user.connections[0].connection_status);
        }
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

const connectRequest = async (target_id, requester_id) => {
  return new Promise((resolve, reject) => {
    checkIfConnected(target_id, requester_id).then((data) => {
      if (data === false) {
        userService
          .updateUser(ObjectId(target_id), {
            $push: {
              connections: {
                user_id: requester_id,
                connection_status: "PENDING",
              },
            },
          })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        resolve({ connection_status: data });
      }
    });
  });
};

const acceptRequest = async (requester_id, target_id) => {
  return new Promise((resolve, reject) => {
    checkIfConnected(requester_id, target_id).then((data) => {
      if (data === "PENDING") {
        User.updateOne(
          { _id: ObjectId(requester_id) },
          {
            $set: {
              "connections.$[elem].connection_status": "ACCEPTED",
            },
          },
          {
            arrayFilters: [{ "elem.user_id": target_id }],
          }
        )
          .exec()
          .then((data) => {
            if (data.matchedCount == 1) {
              User.updateOne(
                { _id: ObjectId(target_id) },
                {
                  $push: {
                    connections: {
                      user_id: requester_id,
                      connection_status: "ACCEPTED",
                    },
                  },
                }
              )
                .exec()
                .then((data) => {
                  client.close();
                  resolve(data);
                })
                .catch((err) => {
                  client.close();
                  reject(err);
                });
            } else {
              sendResponse(res, 500, {
                error: "An Error Occured While Accepting Connection Request",
              });
            }
          })
          .catch((err) => {
            client.close();
            reject(err);
          });
      } else {
        resolve({ ok: -1, connection_status: data });
      }
    });
  });
};

const rejectRequest = async (requester_id, target_id) => {
  return new Promise((resolve, reject) => {
    checkIfConnected(requester_id, target_id).then((data) => {
      if (data === "PENDING") {
        rejectConnection(requester_id, target_id)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } else if (data === "ACCEPTED") {
        removeConnection(requester_id, target_id)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        resolve({ ok: -1, connection_status: data });
      }
    });
  });
};

const rejectConnection = async (requester_id, target_id) => {
  return new Promise((resolve, reject) => {
    User.updateOne(
      { _id: ObjectId(requester_id) },
      {
        $pull: {
          connections: {
            user_id: target_id,
          },
        },
      }
    )
      .exec()
      .then((data) => {
        client.close();
        resolve(data);
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

const removeConnection = async (requester_id, target_id) => {
  return new Promise((resolve, reject) => {
    User.updateOne(
      { _id: ObjectId(requester_id) },
      {
        $pull: {
          connections: {
            user_id: target_id,
          },
        },
      }
    )
      .exec()
      .then((data) => {
        User.updateOne(
          { _id: ObjectId(target_id) },
          {
            $pull: {
              connections: {
                user_id: requester_id,
              },
            },
          }
        )
          .exec()
          .then((data) => {
            client.close();
            resolve(data);
          })
          .catch((err) => {
            client.close();
            reject(err);
          });
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

const getConnectionsIds = async (user_id) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      _id: user_id,
      connections: { $elemMatch: { connection_status: "ACCEPTED" } },
    })
      .populate("connections.user_id")
      .exec()
      .then((data) => {
        client.close();
        resolve(data.connections.map((connection) => connection.user_id));
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

const getConnections = async (user_id) => {
  return new Promise((resolve, reject) => {
    getConnectionsIds(user_id)
      .then((connectionIds) => {
        User.find({
          _id: { $in: connectionIds },
        })
          .select("-_id username")
          .exec()
          .then((data) => {
            client.close();
            resolve(data);
          })
          .catch((err) => {
            client.close();
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  connectRequest,
  acceptRequest,
  rejectRequest,
  getConnections,
};
