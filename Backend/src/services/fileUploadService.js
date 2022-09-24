const { User } = require("../database/models/users");

const uploadFile = async (userId, filePath) => {
  return new Promise((resolve, reject) => {
    User.updateOne(
      { _id: userId },
      {
        $push: {
          featured: {
            url_link: filePath,
            type: "Media",
          },
        },
      }
    )
      .exec()
      .then(() => {
        resolve({ message: "File uploaded successfully" });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  uploadFile,
};
