let config = require("dotenv");
config.config();
const { MongoClient } = require("mongodb");

const MONGO_URI = process.env.DB_URI;

const client = new MongoClient(MONGO_URI, () => {
  console.log("Connected to database");
});

const db = client.db("linkedout");

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    client
      .connect()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function disconnectFromDatabase() {
  return new Promise((resolve, reject) => {
    client.close((err) => {
      if (err) {
        reject(err);
      }
      console.log("Disconnected from database");
      resolve();
    });
  });
}

module.exports = {
  connectToDatabase,
  client,
  db,
  disconnectFromDatabase,
};
