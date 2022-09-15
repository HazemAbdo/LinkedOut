const { Post } = require("../database/models/posts");
const { ObjectId } = require("mongodb");
const { client } = require("../database/database_connection");
const { User } = require("../database/models/users");

const createPost = async (data) => {
  return new Promise((resolve, reject) => {
    Post.create(data)
      .then((post) => {
        client.close();
        resolve(post);
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

const getPostsById = async (id) => {
  return new Promise((resolve, reject) => {
    Post.find({ user_id: id })
      .transform(async (doc, ret) => {
        ret = {
          posts: doc,
        };
        delete ret.user_id;
        let user = await User.findOne({ _id: id }).select(
          "name experience.profile_headline"
        );
        ret.user = user;
        resolve(ret);
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

module.exports = {
  getPostsById,
  createPost,
};
