const { Comment } = require("../database/models/comments");

const commentPost = async (comment) => {
  return new Promise((resolve, reject) => {
    Comment.create({
      user_id: comment.user_id,
      post_id: comment.post_id,
      date_commented: comment.date_commented,
      comment: comment.comment,
    })
      .then((comment) => {
        resolve(comment);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const removeCommentPost = async (comment_id, user_id) => {
  return new Promise((resolve, reject) => {
    Comment.deleteOne({
      _id: comment_id,
      user_id: user_id,
    })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const reactToComment = async (comment_id, update) => {
  return new Promise((resolve, reject) => {
    Comment.findOne({
      _id: comment_id,
      "reactions.user_id": update.user_id,
    }).then((result) => {
      if (result) {
        Comment.updateOne(
          {
            _id: comment_id,
            "reactions.user_id": update.user_id,
          },
          {
            $set: {
              "reactions.$.reaction": update.reaction,
            },
          }
        )
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        Comment.updateOne(
          {
            _id: comment_id,
          },
          {
            $push: {
              reactions: {
                user_id: update.user_id,
                reaction: update.reaction,
              },
            },
          }
        )
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });
};

const unreactToComment = async (comment_id, user_id) => {
  return new Promise((resolve, reject) => {
    Comment.updateOne(
      {
        _id: comment_id,
      },
      {
        $pull: {
          reactions: {
            user_id: user_id,
          },
        },
      }
    )
      .then((result) => {
        resolve(result);
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
