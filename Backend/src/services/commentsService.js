const { ObjectId } = require("mongodb");
const { client } = require("../database/database_connection");
const { Comment } = require("../database/models/comments");
const { User } = require("../database/models/users");

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

const getPostComments = async (post_id) => {
  return new Promise((resolve, reject) => {
    Comment.aggregate([
      {
        $match: {
          post_id: post_id,
        },
      },
      {
        $addFields: {
          user_id_string: {
            $toObjectId: "$user_id",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id_string",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          user_id: 0,
          user_id_string: 0,
          __v: 0,
          user: {
            _id: 0,
            password: 0,
            __v: 0,
            email: 0,
            country: 0,
            city: 0,
            current_position: 0,
            websites: 0,
            skills: 0,
            education: 0,
            connections: 0,
            languages: 0,
            projects: 0,
            certificates: 0,
            experience: {
              _id: 0,
              __v: 0,
              media: 0,
              title: 0,
              company_name: 0,
              skills: 0,
              location: 0,
              start_date: 0,
              employment_type: 0,
              industry: 0,
            },
          },
        },
      },
    ])
      .then((comments) => {
        client.close();
        resolve(comments);
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

const getCommentReactions = async (comment_id) => {
  return new Promise((resolve, reject) => {
    Comment.find({
      _id: comment_id,
    })
      .then(async (comment) => {
        let reactions = comment[0].reactions;
        reactions = await Promise.all(
          reactions.map(async (reaction) => {
            let user = await User.findOne({
              _id: ObjectId(reaction.user_id),
            });
            reaction.user = user;
            return {
              reaction: reaction.reaction,
              user: {
                _id: reaction.user._id,
                username: reaction.user.username,
                profile_picture: reaction.user.profile_picture,
              },
            };
          })
        );
        client.close();
        resolve(reactions);
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
};

module.exports = {
  commentPost,
  removeCommentPost,
  reactToComment,
  unreactToComment,
  getPostComments,
  getCommentReactions,
};
