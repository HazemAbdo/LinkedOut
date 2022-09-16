const { Post } = require("../database/models/posts");
const { client } = require("../database/database_connection");
const { User } = require("../database/models/users");
const config = require("dotenv");

config.config();

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
        let user = await User.findOne({ _id: id }).select(
          "username experience.profile_headline profile_picture"
        );
        ret.user = user;
        let created_from = ret.posts.map((post) => {
          let dateDiff = new Date() - post.date_posted;
          return {
            seconds: Math.floor(dateDiff / 1000),
            minutes: Math.floor(dateDiff / 60000),
            hours: Math.floor(dateDiff / 3600000),
            days: Math.floor(dateDiff / 86400000),
            weeks: Math.floor(dateDiff / 604800000),
            months: Math.floor(dateDiff / 2592000000),
            years: Math.floor(dateDiff / 31536000000),
          };
        });

        ret.posts.forEach((post, index) => {
          post.created_from = created_from[index];
        });

        resolve(ret);
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

const getPostsInfiniteScroll = async (page, PAGE_SIZE = 2) => {
  return new Promise((resolve, reject) => {
    Post.find()
      .sort({ date_posted: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .transform(async (doc, ret) => {
        ret = {
          posts: doc,
        };
        let created_from = ret.posts.map((post) => {
          let dateDiff = new Date() - post.date_posted;

          return {
            seconds: Math.floor(dateDiff / 1000),
            minutes: Math.floor(dateDiff / 60000),
            hours: Math.floor(dateDiff / 3600000),
            days: Math.floor(dateDiff / 86400000),
            weeks: Math.floor(dateDiff / 604800000),
            months: Math.floor(dateDiff / 2592000000),
            years: Math.floor(dateDiff / 31536000000),
          };
        });

        ret.posts.forEach((post, index) => {
          post.created_from = created_from[index];
        });

        ret.current_page = page;

        if (ret.posts.length < PAGE_SIZE) {
          ret.next_url = null;
        } else {
          ret.next_url = `${process.env.URL}/posts?page=${+page + 1}`;
        }

        resolve(ret);
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

const getPosts = async (page) => {
  return new Promise((resolve, reject) => {
    getPostsInfiniteScroll(page)
      .then(async (data) => {
        // ADD USER DATA TO EACH POST
        let posts = data.posts;
        User.find({ _id: { $in: posts.map((post) => post.user_id) } })
          .select("username experience.profile_headline profile_picture")
          .then((users) => {
            posts.forEach((post) => {
              let user = users.find((user) => user._id == post.user_id);
              post.user = user;
            });
            data.posts = posts;
            resolve(data);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const reactPost = async (id, update) => {
  return new Promise((resolve, reject) => {
    Post.findOne({ _id: id, "reactions.user_id": update.user_id })
      .then((post) => {
        client.close();
        if (post?.reactions.length > 0) {
          Post.updateOne(
            { _id: id, "reactions.user_id": update.user_id },
            {
              $set: {
                "reactions.$.reaction": update.reaction,
              },
            }
          )
            .then(() => {
              resolve({
                message: "React to post successfully",
              });
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          Post.updateOne({ _id: id }, { $push: { reactions: update } })
            .then(() => {
              resolve({
                message: "React to post successfully",
              });
            })
            .catch((err) => {
              reject(err);
            });
        }
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

const unreactPost = async (id, user_id) => {
  return new Promise((resolve, reject) => {
    Post.updateOne({ _id: id }, { $pull: { reactions: { user_id: user_id } } })
      .then(() => {
        resolve({
          message: "Unreact to post successfully",
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  getPostsById,
  createPost,
  getPosts,
  reactPost,
  unreactPost,
};
