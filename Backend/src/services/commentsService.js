const { Post } = require("../database/models/posts");

const commentPost = async (id, update) => {
  return new Promise((resolve, reject) => {
    Post.updateOne({ _id: id }, { $push: { comments: update } })
      .then(() => {
        resolve({
          message: "Comment to post successfully",
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const removeCommentPost = async (id, comment_id, user_id) => {
  return new Promise((resolve, reject) => {
    Post.updateOne(
      { _id: id },
      { $pull: { comments: { _id: comment_id, user_id: user_id } } }
    )
      .then(() => {
        resolve({
          message: "Remove comment from post successfully",
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const reactToComment = async (id, comment_id, update) => {
  return new Promise((resolve, reject) => {
    Post.findOne({
      _id: id,
      "comments._id": comment_id,
      "comments.reactions.user_id": update.user_id,
    })
      .then(async (post) => {
        if (post == null) {
          Post.updateOne(
            { _id: id, "comments._id": comment_id },
            { $push: { "comments.$.reactions": update } }
          )
            .then(async () => {
              resolve({
                message: "React to comment successfully",
              });
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          let comment = post.comments.find(
            (comment) => comment._id.toString() == comment_id.toString()
          );
          let reaction = comment.reactions.find(
            (reaction) => reaction.user_id == update.user_id
          );
          reaction.reaction = update.reaction;

          await post.save();
          resolve({
            message: "Update React to comment successfully",
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const unreactToComment = async (id, comment_id, user_id) => {
  return new Promise((resolve, reject) => {
    Post.updateOne(
      { _id: id, "comments._id": comment_id },
      { $pull: { "comments.$.reactions": { user_id: user_id } } }
    )
      .then(() => {
        resolve({
          message: "Unreact to comment successfully",
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  commentPost,
  removeCommentPost,
  reactToComment,
  unreactToComment,
};
