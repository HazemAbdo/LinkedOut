let express = require("express");
let router = express.Router();
const postsController = require("../controllers/postsController");
const { verifyToken } = require("../middlewares/auth");

/**
 * @api {get} /posts/ Get posts Infinite Scroll
 * @apiName GetPosts
 * @apiGroup Posts
 * @apiVersion 1.0.0
 * @apiQuery {Number} page Page number
 * @apiSuccess {Number} status_code Status code of the response
 * @apiSuccess {Object} data Posts object
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
    "status_code": 200,
    "data": {
        "posts": [
            {
                "_id": "6323820542454a7776584078",
                "user_id": "6320f80e4f2090aa8f72a32a",
                "date_posted": "2022-09-15T19:50:29.769Z",
                "body": "Hello First Post",
                "comments": [],
                "shares": [],
                "__v": 0,
                "reactions": [
                    {
                        "user_id": "6320f8124f2090aa8f72a32c",
                        "reaction": "like",
                        "_id": "6323ba155f10110c4884305a"
                    }
                ],
                "created_from": {
                    "seconds": 15084,
                    "minutes": 251,
                    "hours": 4,
                    "days": 0,
                    "weeks": 0,
                    "months": 0,
                    "years": 0
                },
                "user": {
                    "_id": "6320f80e4f2090aa8f72a32a",
                    "username": "Ahmed Khaled",
                    "experience": [
                        {
                            "profile_headline": "Computer Engineering Student"
                        }
                    ]
                }
            }
        ],
        "current_page": "1",
        "next_url": "http://localhost:3000/api/v1/posts?page=2"
    }
}
 */
router.get("/", verifyToken, postsController.getPostsInfiniteScroll);

/**
 * @api {get} /posts/:id Get user posts
 * @apiName GetUserPosts
 * @apiGroup Posts
 * @apiVersion 1.0.0
 * @apiParam {String} id Logged User id as url parameter
 * @apiSuccess {Number} status_code Status code of the response
 * @apiSuccess {Object} data Posts object
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
    "status_code": 200,
    "data": {
        "posts": [
            {
                "_id": "63224c2ba26fa045249fb862",
                "user_id": "6320f80e4f2090aa8f72a32a",
                "date_posted": "2022-09-14T21:48:27.696Z",
                "body": "Hello First Post",
                "comments": [],
                "shares": [],
                "__v": 0,
                "reactions": [],
                "created_from": {
                    "seconds": 96665,
                    "minutes": 1611,
                    "hours": 26,
                    "days": 1,
                    "weeks": 0,
                    "months": 0,
                    "years": 0
                }
            },
            {
                "_id": "6323810f702d9183ffdfa8e3",
                "user_id": "6320f80e4f2090aa8f72a32a",
                "date_posted": "2022-09-15T19:46:23.068Z",
                "body": "Hello First Post",
                "comments": [],
                "shares": [],
                "__v": 0,
                "reactions": [
                    {
                        "user_id": "6320f8124f2090aa8f72a32c",
                        "reaction": "love",
                        "_id": "6323ba835f10110c48843076"
                    },
                    {
                        "user_id": "632239eef0473a60e78a300a",
                        "reaction": "love",
                        "_id": "6323bb73cf6d65dfbd6382d0"
                    }
                ],
                "created_from": {
                    "seconds": 17589,
                    "minutes": 293,
                    "hours": 4,
                    "days": 0,
                    "weeks": 0,
                    "months": 0,
                    "years": 0
                }
            },
            {
                "_id": "6323820542454a7776584078",
                "user_id": "6320f80e4f2090aa8f72a32a",
                "date_posted": "2022-09-15T19:50:29.769Z",
                "body": "Hello First Post",
                "comments": [],
                "shares": [],
                "__v": 0,
                "reactions": [
                    {
                        "user_id": "6320f8124f2090aa8f72a32c",
                        "reaction": "like",
                        "_id": "6323ba155f10110c4884305a"
                    }
                ],
                "created_from": {
                    "seconds": 17343,
                    "minutes": 289,
                    "hours": 4,
                    "days": 0,
                    "weeks": 0,
                    "months": 0,
                    "years": 0
                }
            }
        ],
        "user": {
            "_id": "6320f80e4f2090aa8f72a32a",
            "username": "Ahmed Khaled",
            "experience": [
                {
                    "profile_headline": "Computer Engineering Student"
                }
            ]
        }
    }
}
 */
router.get("/:id", verifyToken, postsController.getPostsById);

/**
 * @api {post} /posts/ Create post
 * @apiName CreatePost
 * @apiGroup Posts
 * @apiVersion 1.0.0
 * @apiBody {String} body Post body
 * @apiSuccess {Number} status_code Status code of the response
 * @apiSuccess {Object} data Posts object
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
        "status_code": 200,
        "data": {
            "user_id": "632239eef0473a60e78a300a",
            "date_posted": "2022-09-16T00:40:44.230Z",
            "body": "Hello First Post",
            "_id": "6323c60c608850990d186a68",
            "reactions": [],
            "comments": [],
            "shares": [],
            "__v": 0
        }
    }
 */
router.post("/", verifyToken, postsController.createPost);

/**
 * @api {put} /posts/:id/react React to post
 * @apiName ReactToPost
 * @apiGroup Posts
 * @apiVersion 1.0.0
 * @apiParam {String} id Post id as url parameter
 * @apiBody {String} reaction Reaction type
 * @apiSuccess {Number} status_code Status code of the response
 * @apiSuccess {Object} data Posts object
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
        "status_code": 200,
        "data": {
            "message": "Post updated successfully"
        }
    }
 */
router.post("/:id/react", verifyToken, postsController.reactPost);

/**
 * @api {put} /posts/:id/unreact Unreact to post
 * @apiName UnreactToPost
 * @apiGroup Posts
 * @apiVersion 1.0.0
 * @apiParam {String} id Post id as url parameter
 * @apiSuccess {Number} status_code Status code of the response
 * @apiSuccess {Object} data Posts object
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
        "status_code": 200,
        "data": {
            "message": "Unreact to post successfully"
        }
    }
 */

router.post("/:id/unreact", verifyToken, postsController.unreactPost);

module.exports = router;
